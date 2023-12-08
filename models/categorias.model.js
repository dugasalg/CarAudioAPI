const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    index:true
  },
  description: {
    type: String,
    required: false,
  },
});

const category = mongoose.model('categorias', categorySchema);

module.exports = {
  category,
};
