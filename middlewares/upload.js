const util = require("util")
const multer = require("multer")
const { GridFsStorage } = require("multer-gridfs-storage")
const connectDB = require("../config/mongodb")

var storage = new GridFsStorage({
    url : connectDB.url + connectDB.database,
    options : { useNewUrlParser : true, useUnifiedTopology : true },
    file : (req, file) => {
        const match = ["image/png", "image/jpeg"]
        if(match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-project-1-${file.originalname}`
            return filename
        }

        // return filename :
        return {
            bucket : connectDB.imgBucket,
            file : `${Date.now()}-project-1-${file.originalname}`
        }
    }
})

var uploadFiles = multer({ storage : storage }).single("file")
var uploadFilesMiddleware = util.promisify(uploadFiles)

module.exports = {
    uploadFilesMiddleware
}