const { quotation } = require('../models/cotizaciones.model');
const User = require('../models/user.models');
const mongoose = require('mongoose');


// Create - Agregar una nueva cotización
exports.createQuotation = async (req, res) => {
  try {
    const newQuotation = await quotation.create(req.body);
    res.status(201).json(newQuotation);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la cotización' });
  }
};

// Read - Obtener todas las cotizaciones
exports.getAllQuotations = async (req, res) => {
  try {
    const quotations = await quotation.find();
    res.status(200).json(quotations);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las cotizaciones' });
  }
};

// Update - Actualizar una cotización por ID
exports.updateQuotationById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedQuotation = await quotation.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedQuotation);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la cotización' });
  }
};

// Delete - Eliminar una cotización por ID
exports.deleteQuotationById = async (req, res) => {
  const { id } = req.params;
  try {
    await quotation.findByIdAndRemove(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la cotización' });
  }
};

exports.getCotizacionesPorUsuario = async (req, res) => {
  const { userId } = req.params;

  try {
    const quotations = await Quotation.find({ userId }).populate('productIds');
    res.status(200).json(quotations);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las cotizaciones del usuario' });
  }
};

// Sumar las cotizaciones de un usuario
exports.getTotalQuotationsByUser = async (req, res) => {
  const { userId } = req.params.userId;

  // Validación de userId
  if (!userId || typeof userId !== 'string') {
    return res.status(400).json({ error: 'userId inválido' });
  }

  // Si usas Mongoose y los IDs son de tipo ObjectId, puedes hacer una validación adicional
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: 'userId no es un ObjectId válido' });
  }

  try {
    // Verificar si el usuario existe en la base de datos
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Consulta para obtener las cotizaciones del usuario
    // Asume que el identificador del usuario está asociado a las cotizaciones de alguna manera
    const quotations = await quotation.find({ userId: userId });
    const total = quotations.reduce((sum, quotation) => sum + quotation.totalPrice, 0);
    
    res.status(200).json({ total });
  } catch (error) {
    res.status(500).json({ error: 'Error al calcular el total de las cotizaciones' });
  }
};