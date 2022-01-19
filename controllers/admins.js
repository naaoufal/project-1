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

// login using email and password :
const login = async (req, res) => {
    // handle request :
    try {
        const admin = await Admin.findOne({ email : req.body.email })
        // res.json(admin)
        if(admin) {
            const encrypted = await bcrypt.compare(req.body.password, admin.password)
            if(encrypted) {
                res.json(admin)
            } else {
                res.json("password or email are wrong !!!")
            }
        }
    } catch (error) {
        res.json({ message : error.message })
    }
}

module.exports = {
    getAllAdmins,
    addAdmin,
    login
}