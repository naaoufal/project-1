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

// get one place by ID :
const getPlace = async (req, res) => {
    try {
        const id = req.params.id
        const place = await Place.findById(id)
        // res.json(place)
        if(place) {
            res.json(place)
        } else {
            res.json({ message : "No Data Found !!!" })
        }
    } catch (error) {
        res.json({ message : error.message })
    }
}

// post a new place :
const addPlace = async (req, res) => {
    const place = new Place({
        name : req.body.name,
        images : req.file.filename,
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

// edit on a place :
const editPlace = async (req, res) => {
    if(!req.body) {
        return res.send({ message : "They is no DATA !!!" })
    }
    const id = req.params.id
    Place.findByIdAndUpdate(id, req.body, { userFindAndModify : false }).then(data => {
        if(!data) {
            res.send({ message : "they is no Place !!" })
        } else {
            res.send({ message : "Place Updated !!!" })
        }
    })
}

// delete place by ID :
const deletePlace = async (req, res) => {
    // handle request :
    try {
        Place.findByIdAndDelete(req.params.id).then(() => {
            res.json("Place deleted Successfuly !!!")
        })
    } catch (error) {
        res.json({ message : error.message })
    }
}

module.exports = {
    getAllPlaces,
    getPlace,
    addPlace,
    editPlace,
    deletePlace
}