const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    specialities: {
        type: String,
        required: true
    }
});

module.exports = Doctor = mongoose.model('doctors', doctorSchema);