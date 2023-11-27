const { category } = require('../models/categorias.model');

// Create - Agregar una nueva categoría
exports.createCategory = async (req, res) => {
  try {
    const newCategory = await category.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al crear la categoría' });
  }
};

// Read - Obtener todas las categorías
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las categorías' });
  }
};

// Update - Actualizar una categoría por ID
exports.updateCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedCategory = await category.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la categoría' });
  }
};

// Delete - Eliminar una categoría por ID
exports.deleteCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    await category.findByIdAndRemove(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la categoría' });
  }
};
