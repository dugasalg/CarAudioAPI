const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});

const favorite = mongoose.model('favoritos', favoriteSchema);

module.exports = {
  favorite,
};
