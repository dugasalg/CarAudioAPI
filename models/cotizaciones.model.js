const mongoose = require('mongoose');

const quotationSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true,
  },
  product: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String,
    required: false,
  },
});

const quotation = mongoose.model('cotizaciones', quotationSchema);

module.exports = {
  quotation,
};
