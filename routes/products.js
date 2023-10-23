const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  updateProductById,
  deleteProductById,
} = require('../controllers/product.controllers');

// Ruta para crear un nuevo producto
router.post('/productos', createProduct);

// Ruta para obtener todos los productos
router.get('/productos', getAllProducts);

// Ruta para actualizar un producto por ID
router.put('/productos/:id', updateProductById);

// Ruta para eliminar un producto por ID
router.delete('/productos/:id', deleteProductById);

module.exports = router;
