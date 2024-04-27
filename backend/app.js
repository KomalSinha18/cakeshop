const express = require("express")
const app = express()
const path = require('path')
const cookieParser = require("cookie-parser")
const cors = require("cors")

if(process.env.NODE_ENV !== "production"){
require("dotenv").config({path:"backend/config/.env"})
}

// using middlewares
app.use(cors({credentials: true, origin:true}))
app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({limit:"50mb",extended:true}))
app.use(cookieParser())

// importing routes
const user = require("./routes/user")
const product = require("./routes/product")
const order = require("./routes/order")

// Using routes

app.use("/api/v1",user)
app.use("/api/v1",product)
app.use("/api/v1",order)

app.use(express.static(path.join(__dirname,"../frontend/dist")))

app.get("*", (req,res)=>{
    res.sendFile(path.resolve(__dirname,"../frontend/dist/index.html"))
})

module.exports = app