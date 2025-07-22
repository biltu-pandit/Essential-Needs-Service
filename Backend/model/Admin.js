const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    providerid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Provider',
        required: true,
        },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true,
        },
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
    }
})

module.exports = mongoose.model('Admin', dataSchema)