const mongoose = require('mongoose')
const { Schema } = mongoose;
const productsSchema = new Schema({
    timestamp: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String
    },
    codigo: {
        type: String,
        required: true
    },
    foto: {
        type: String,
        required: true
    },
    precio: {
        type: Number
    },
    stock: {
        type: Number
    }
})
module.exports = productsSchema