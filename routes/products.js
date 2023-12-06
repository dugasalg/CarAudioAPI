const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  updateProductById,
  deleteProductById,
  getProductsByCategory,
  getProductsById
} = require('../controllers/product.controllers');

// Ruta para obtener productos por categoría
router.get('/productos/:categoria', getProductsByCategory);

// Ruta para crear un nuevo producto
router.post('/productos', createProduct);

// Ruta para obtener todos los productos
router.get('/productos', getAllProducts);

// Ruta para actualizar un producto por ID
router.put('/productos/:id', updateProductById);

// Ruta para eliminar un producto por ID
router.delete('/productos/:id', deleteProductById);

router.get('/productos/id/:id', getProductsById);

module.exports = router;
