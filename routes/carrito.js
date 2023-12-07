// Rutas (routes.js)
const express = require('express');
const router = express.Router();
const {
    agregarProductoAlCarrito,
    crearCarrito
     } = require('../controllers/carrito.controller');

// Ruta para crear un carrito vacío y obtener su ID
router.post('/crear-carrito', crearCarrito);

// Ruta para agregar un producto al carrito
router.post('/agregar-producto-al-carrito', agregarProductoAlCarrito);



module.exports = router;
