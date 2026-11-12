require('dotenv').config()
const express = require('express')
const connectdb = require('./config/dbConnection')
const errorHandler =require('./middleware/errorHandler')
const app = express()
const port = process.env.PORT || 5001
connectdb()


const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);


app.use(express.json())

app.use('/register',require('./routes/Regrouter'))

app.use(errorHandler)

app.listen(port,()=>{
console.log("server is connected")
})
