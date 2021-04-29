const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const relativeSchema = new Schema ({
    fristname: {
        type: String,
        required: true        
    },
    lastname:{
        type: String,
        required: true
    },
    age:{
        type: Int32,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    height:{
        type: Int32,
        required: true
    },
    weight:{
        type: Int32,
        required: true
    },
    garminData:{
        type: Array,
        required: false
    }
});

module.exports = Relative = mongoose.model('relatives', relativeSchema);