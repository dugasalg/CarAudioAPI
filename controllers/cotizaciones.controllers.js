const { quotation } = require('../models/cotizaciones.model');

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
