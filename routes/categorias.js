const express = require('express');
const router = express.Router();
const {
  createCategory,
  getAllCategories,
  updateCategoryById,
  deleteCategoryById,
} = require('../controllers/categorias.controllers');

// Ruta para crear una nueva categoría
router.post('/categorias', createCategory);

// Ruta para obtener todas las categorías
router.get('/categorias', getAllCategories);

// Ruta para actualizar una categoría por ID
router.put('/categorias/:id', updateCategoryById);

// Ruta para eliminar una categoría por ID
router.delete('/categorias/:id', deleteCategoryById);

module.exports = router;
