const express = require('express');
const router = express.Router();
const {
  createQuotation,
  getAllQuotations,
  updateQuotationById,
  deleteQuotationById,
} = require('../controllers/cotizaciones.controllers');

// Ruta para crear una nueva cotización
router.post('/cotizaciones', createQuotation);

// Ruta para obtener todas las cotizaciones
router.get('/cotizaciones', getAllQuotations);

// Ruta para actualizar una cotización por ID
router.put('/cotizaciones/:id', updateQuotationById);

// Ruta para eliminar una cotización por ID
router.delete('/cotizaciones/:id', deleteQuotationById);

module.exports = router;
