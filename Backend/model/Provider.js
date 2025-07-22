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
    description: {
        required: true,
        type: String
    },
    image: {
        default:"https://www.shutterstock.com/image-vector/image-icon-trendy-flat-style-600nw-643080895.jpg",
        type: String
    },
    imageid: {
        default:"",
        type: String
    }
})

module.exports = mongoose.model('Provider', dataSchema)