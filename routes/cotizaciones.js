const express = require('express');
const router = express.Router();
const {
  createQuotation,
  getAllQuotations,
  updateQuotationById,
  deleteQuotationById,
  getCotizacionesPorUsuario,
  getTotalQuotationsByUser
} = require('../controllers/cotizaciones.controllers');

// Ruta para crear una nueva cotización
router.post('/cotizaciones', createQuotation);

// Ruta para obtener todas las cotizaciones
router.get('/cotizaciones', getAllQuotations);

// Ruta para actualizar una cotización por ID
router.put('/cotizaciones/:id', updateQuotationById);

// Ruta para eliminar una cotización por ID
router.delete('/cotizaciones/:id', deleteQuotationById);

//Ruta para la cotizacion de un suario
router.get('/cotizaciones/user/:userId', getCotizacionesPorUsuario);

// Ruta para obtener el total de cotizaciones de un usuario
router.get('/cotizaciones/total/user/:userId', getTotalQuotationsByUser);

module.exports = router;