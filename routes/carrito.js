// Rutas (routes.js)
const express = require('express');
const router = express.Router();
const {
    agregarProductoAlCarrito,
    crearCarrito,
    getCarritobyId
     } = require('../controllers/carrito.controller');

// Ruta para crear un carrito vacío y obtener su ID
router.post('/crear-carrito', crearCarrito);

// Ruta para agregar un producto al carrito
router.post('/agregar-producto-al-carrito', agregarProductoAlCarrito);

//Ruta para obtener un carrito por medio de Id
router.get('/obtener-carrito/:id', getCarritobyId)



module.exports = router;
