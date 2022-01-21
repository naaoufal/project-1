const Admin = require('../models/admins')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
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
const login = async (req, res, next) => {
    // handle request :
    try {
        const admin = await Admin.findOne({ email : req.body.email })
        // res.json(admin)
        if(admin) {
            const encrypted = await bcrypt.compare(req.body.password, admin.password)
            if(encrypted) {
                // res.json(admin)
                const accessToken = jwt.sign({ admin }, process.env.ADMIN_ACCESS_TOKEN)
                res.json({ 
                    accessToken : accessToken,
                    payload : admin
                })
                res.admin = admin
                next()
            } else {
                res.json("password or email are wrong !!!")
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server error Occured");
    }
}

// decode token :
const decodedToken = async (req, res) => {
    try {
        const decodedToken = req.body.token
        let result = jwt.decode(decodedToken)
        // res.json(result)
        if(result) {
            res.json(result)
        } else {
            res.json("No Data Found !!!")
        }
    } catch (error) {
        res.json({ message : error.message })
    }
}

module.exports = {
    getAllAdmins,
    addAdmin,
    login,
    decodedToken
}