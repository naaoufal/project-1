const express = require("express")
const router = express.Router()
const placeController = require("../controllers/places")
const multer = require("multer")
const access = require("../middlewares/auth")

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

router.post("/addPlace", access, upload.single('images'), placeController.addPlace)

router.patch("/editPlace/:id", access, placeController.editPlace)

router.delete("/deletePlace", access, placeController.deletePlace)

module.exports = router