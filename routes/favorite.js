const express = require('express');
const router = express.Router();
const {
    addFavorite,
    getUserFavorites,
    removeFavorite
} = require('../controllers/favorite.controller');

router.post('/', addFavorite);
router.get('/user/:userId', getUserFavorites);
router.delete('/:userId/:productId', removeFavorite); // Aquí esperamos que UserId y ProductId sean enviados en el cuerpo de la solicitud

module.exports = router;