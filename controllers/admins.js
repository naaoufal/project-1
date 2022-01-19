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
    bcrypt.hash(req.body.password, salt, async function (err, hash) {
        const admin = new Admin({
            email : req.body.email,
            password : hash
        })
        try {
            const newAdmin = await admin.save()
            res.json(newAdmin)
        } catch (error) {
            res.json({ message : error.message })
        }
    })
}

module.exports = {
    getAllAdmins,
    addAdmin
}