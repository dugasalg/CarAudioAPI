const mongoose = require('mongoose');
const { productSchema } = require('./products.model'); // Asegúrate de que la ruta sea correcta

const carritoSchema = new mongoose.Schema({
    productos: [productSchema]
});

const Carrito = mongoose.model('Carrito', carritoSchema);

module.exports = {
  Carrito,
  carritoSchema
};
