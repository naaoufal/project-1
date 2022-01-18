const Admin = require('../models/admins')
const bcrypt = require('bcrypt');
require('dotenv').config()

// get all admins :
const getAllAdmins = async (req, res) => {
    // handle request :
    try {
        const admin = await Admin.find()
        res.json(admin)
    } catch (error) {
        res.json({ message : error.message })
    }
}

// post a new admin :
const addAdmin = async (req, res) => {
    // handle request :
    const salt = await bcrypt.genSalt(10)
    const admin = new Admin({
        email : req.body.email,
        password : bcrypt.hash(req.body.password, salt, function (err, hash) {
            return err
        })
    })
    // admin.password = await bcrypt.hash(admin.password, salt)
    try {
        const newAdmin = await admin.save()
        res.json(newAdmin)
    } catch (error) {
        res.json({ message : error.message })
    }
}

module.exports = {
    getAllAdmins,
    addAdmin
}