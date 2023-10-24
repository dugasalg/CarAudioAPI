const { favorite } = require('../models/favoritos.model');

// Create - Agregar un nuevo favorito
exports.createFavorite = async (req, res) => {
  try {
    const newFavorite = await favorite.create(req.body);
    res.status(201).json(newFavorite);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el favorito' });
  }
};

// Read - Obtener todos los favoritos
exports.getAllFavorites = async (req, res) => {
  try {
    const favorites = await favorite.find();
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los favoritos' });
  }
};

// Update - Actualizar un favorito por ID
exports.updateFavoriteById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedFavorite = await favorite.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedFavorite);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el favorito' });
  }
};

// Delete - Eliminar un favorito por ID
exports.deleteFavoriteById = async (req, res) => {
  const { id } = req.params;
  try {
    await favorite.findByIdAndRemove(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el favorito' });
  }
};
