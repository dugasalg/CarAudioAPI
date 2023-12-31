const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true,
    index: true 
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  brand: {
    type: String,
    required: false,
  },
  rating: {
    type: Number,
    required: false
  }
});

const product = mongoose.model('products', productSchema);

module.exports = {
  product,
  productSchema, // Agregando la exportación del esquema
};
