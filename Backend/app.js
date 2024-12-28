const express = require('express')
const app = express()
const path = require("path")
const dotenv = require('dotenv')
const cors = require("cors")
const dotenv1 = require("dotenv").config()
// const connectDB = require("./src/config/db")
const port = process.env.port
// connectDB()


app.use(cors())
app.use(express.json())

app.listen(port,()=>{

    console.log("server started"+"running on "+port)
    
    })