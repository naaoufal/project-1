const Place = require('../models/places')
require('dotenv').config()

// get All places :
const getAllPlaces = async (req, res) => {
    // handle request :
    try {
        const places = await Place.find()
        res.json(places)
    } catch (error) {
        res.json({ message : error.message })
    }
}

// post a new place :
const addPlace = async (req, res) => {
    const place = new Place({
        name : req.body.name,
        images : req.body.file,
        description : req.body.description
    })

    // handle request :
    try {
        const newPlace = await place.save()
        res.json(newPlace)
    } catch (error) {
        res.json({ message : error.message })
    }
}

module.exports = {
    getAllPlaces,
    addPlace
}