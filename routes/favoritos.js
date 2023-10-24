const express = require('express');
const router = express.Router();
const {
  createFavorite,
  getAllFavorites,
  updateFavoriteById,
  deleteFavoriteById,
} = require('../controllers/favoritos.controllers');

// Ruta para crear un nuevo favorito
router.post('/favoritos', createFavorite);

// Ruta para obtener todos los favoritos
router.get('/favoritos', getAllFavorites);

// Ruta para actualizar un favorito por ID
router.put('/favoritos/:id', updateFavoriteById);

// Ruta para eliminar un favorito por ID
router.delete('/favoritos/:id', deleteFavoriteById);

module.exports = router;
