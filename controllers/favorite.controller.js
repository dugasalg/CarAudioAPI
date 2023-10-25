const Favorite = require('../models/favorite.model');

exports.addFavorite = async (req, res) => {
    const favorite = new Favorite(req.body);
    try {
        await favorite.save();
        res.status(201).send(favorite);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.getUserFavorites = async (req, res) => {
    try {
        const favorites = await Favorite.find({ UserId: req.params.userId });
        res.status(200).send(favorites);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.removeFavorite = async (req, res) => {
    try {
        const favorite = await Favorite.findOneAndDelete({ UserId: req.body.UserId, ProductId: req.body.ProductId });
        if (!favorite) {
            return res.status(404).send();
        }
        res.status(200).send(favorite);
    } catch (err) {
        res.status(500).send(err);
    }
};