const mongoose = require('mongoose')

const placeSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true,
    },
    images : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    }

})

module.exports = mongoose.model('places', placeSchema)