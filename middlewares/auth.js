require('dotenv').config()
const jwt = require('jsonwebtoken')
const Admin = require('../models/admins')

module.exports = function auth (req, res, next) {
    const autHeader = req.headers['authorization']
    const token = autHeader && autHeader.split(' ')[1]
  
    if(token == null){
        return res.sendStatus(403)
    }
  
    const code = jwt.verify(token, process.env.ADMIN_ACCESS_TOKEN)
    const admin = Admin.findById(code.id)

    if(!admin){
        return res.sendStatus(404)
    }
    req.admin = admin
    next()
}
