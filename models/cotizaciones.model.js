const mongoose = require('mongoose');

const quotationSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true,
    index:true
  },
  product: {
    type: String,
    required: true,
    index:true
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
  }
});

const quotation = mongoose.model('cotizaciones', quotationSchema);

module.exports = {
  quotation,
};
