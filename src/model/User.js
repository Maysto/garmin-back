const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create the User Schema
const UserSchema = new Schema({

    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    relatives: {
        type: Array,
        required: false
    },
    premium: {
        type: Boolean,
        required: false
    },
    premiumDate: {
        type: Date,
        required: false
    }

})

module.exports = User = mongoose.model('users', UserSchema);