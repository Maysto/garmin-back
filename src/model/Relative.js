const { Int32 } = require("bson");
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
    Stress: {
        type: Map,
        required: false
    },
});

module.exports = Relative = mongoose.model('relatives', relativeSchema);