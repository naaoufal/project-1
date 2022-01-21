const express = require("express")
const router = express.Router()
const placeController = require("../controllers/places")
const multer = require("multer")

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads")
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+'-'+file.originalname)
    }
})

const upload = multer({ storage : storage })

// decalring end points :

router.get("/getPlaces", placeController.getAllPlaces)

router.get("/getPlaceById/:id", placeController.getPlace)

router.post("/addPlace", upload.single('images'), placeController.addPlace)

module.exports = router