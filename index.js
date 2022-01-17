const express = require("express");
const cors = require('cors');
const path = require('path')
require("dotenv").config();
const connectDB = require("./config/mongodb");
const app = express();
const http = require('http');
const server = http.createServer(app)

// connect to database with mongodb:
connectDB()

app.use(express.json())
app.use(cors())

// use static route to create new repository to save photos :
app.use('/uploads', express.static(__dirname +'/uploads'));

// declaring url to be used in our endpoints :
app.use("/api/places", require("./routes/places"))

// start the server
server.listen(3001, () => {console.log("the server is started")});