const mongoose = require("mongoose")

const logsSchema = new mongoose.Schema({
    time : {
        type : Date,
        required : true
    },
    file : {
        type : String,
        required : true
    },
    line : {
        type : String,
        required : true
    },
    information : {
        type : String,
        required : true
    },
    type : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('logs', logsSchema)