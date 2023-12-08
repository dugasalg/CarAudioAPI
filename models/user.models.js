const mongoose = require('mongoose');
const {carritoSchema} = require('./carrito.model');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    birthDate: {                                                        
        type: String,
        required: false
    },
    address: {
        type: String,
        required: true
    },
    carritos: [carritoSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = {
    User
};