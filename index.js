
const express = require('express');
const route = require('./src/routes/route.js');

const multer = require("multer");
const app = express();
require("dotenv").config();

const cors = require('cors');
const { dbConnection } = require('./src/database/db.js');
const cookieParser = require('cookie-parser');
const PORT = 5001
const url = "mongodb+srv://Ashish:WeUTlaZDDXnrAyKM@test.ghtltbu.mongodb.net/taskManagement"
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(multer().any())

dbConnection(url)



app.use('/', route)


app.listen(PORT,()=>{
    console.log("server start");
})