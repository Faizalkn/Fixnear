require('dotenv').config()
const express = require('express')
const connectdb = require('./config/dbConnection')
const errorHandler =require('./middleware/errorHandler')
const cors = require("cors")
const app = express()
const port = process.env.PORT || 5001
connectdb()


const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);



app.use(cors({
        origin:"http://localhost:5173" // allowd port
    }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/api',require('./routes/Regrouter'))

app.use(errorHandler)

app.listen(port,()=>{
console.log("server is connected",port)
})
