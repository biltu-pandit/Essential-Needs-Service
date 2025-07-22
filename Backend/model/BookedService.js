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
    serviceid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Service',
        required: true,
    },
    apply_date: {
        required: true,
        type: String
    },
    status: {
        default: "Pending",
        type: String

    }
})

module.exports = mongoose.model('BookedService', dataSchema)