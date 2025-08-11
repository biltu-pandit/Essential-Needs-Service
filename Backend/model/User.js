const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    email: {
        required: true,
        type: String,
        unique: true // Added to ensure email uniqueness
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
    address: {
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
    isVerified: {
        type: Boolean,
        default: false // New field for OTP verification status
    },
    createdAt: {
        type: Date,
        default: Date.now // Optional: useful for tracking registration time
    }
});

module.exports = mongoose.model('User', dataSchema);