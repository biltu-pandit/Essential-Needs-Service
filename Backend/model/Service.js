const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    providerid:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Provider',
        required: true,
    },
    service_name:{
        required: true,
        type: String,
        enum: {
        values: ['electrician','Electrician','ELECTRICIAN', 'doctor','Doctor','DOCTOR', 'plumber','Plumber','PLUMBER', 'ac','Ac','AC', 'carpenter','Carpenter','CARPENTER', 'interior designer','Interior Designer','INTERIOR DESIGNER'],
        message: '{VALUE} is not a valid service type'
    },
    trim: true       // Removes whitespace
    },
    description: {
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
    },
    opening_time: {
        required: true,
        type: String
    },
    closing_time: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('Service', dataSchema)