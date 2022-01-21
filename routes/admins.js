const express = require("express")
const router = express.Router()
const adminController = require("../controllers/admins")
const access = require("../middlewares/auth")

// declaring end points :

router.get("/getAdmins", access, adminController.getAllAdmins)

router.post("/addAdmin", access, adminController.addAdmin)

router.post("/login", adminController.login)

// decode our token to get data :

router.post("/decode", access, adminController.decodedToken)

module.exports = router