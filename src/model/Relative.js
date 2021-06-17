const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const relativeSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    stress: {
        type: Array,
        required: false
    },
    sleep: {
        type: Array,
        required: false
    },
    activities: {
        type: Array,
        required: false
    },
    dailies: {
        type: Array,
        required: false
    },
    doctors: {
        type: Array,
        required: false,
    },
    events: {
        type: Array,
        required: false
    }
});

module.exports = Relative = mongoose.model('relatives', relativeSchema);