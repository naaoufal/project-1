const express = require("express")
const router = express.Router()
const adminController = require("../controllers/admins")

// declaring end points :

router.get("/getAdmins", adminController.getAllAdmins)

router.post("/addAdmin", adminController.addAdmin)

module.exports = router