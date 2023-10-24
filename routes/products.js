const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  updateProductById,
  deleteProductById,
  getProductsByCategory,
} = require('../controllers/product.controllers');

// Ruta para crear un nuevo producto
router.post('/productos', createProduct);

// Ruta para obtener todos los productos
router.get('/productos', getAllProducts);

// Ruta para actualizar un producto por ID
router.put('/productos/:id', updateProductById);

// Ruta para eliminar un producto por ID
router.delete('/productos/:id', deleteProductById);

// Ruta para obtener todos los productos de una categoría específica
router.get('/productos/categoria/:category', getProductsByCategory);

module.exports = router;
