const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    nameEvent: {
        type: String,
        required: true
    },
    startEvent: {
        type: Date,
        required: true
    },
    endEvent: {
        type: Date,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    timed: {
        type: Boolean,
        required: true
    }
});

module.exports = Event = mongoose.model('events', eventSchema);