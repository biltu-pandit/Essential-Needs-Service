const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    email: {
        required: true,
        type: String
    },
    name: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    contact: {
        required: true,
        type: String
    },
    address:{
        required: true,
        type: String
    },
    city: {
        required: true,
        type: String
    },
    district: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('User', dataSchema)