const multer=require("multer")
const fs = require("fs")
const path = require("path")

const uploadDirectory = path.resolve(__dirname, "../uploads/users")
fs.mkdirSync(uploadDirectory, { recursive: true })

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, uploadDirectory)
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+"-"+file.originalname)
    }
})

const user=multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
})

module.exports=user;
