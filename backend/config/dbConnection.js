const mongoose=require("mongoose")

const connectdb= async()=>{

try{
    if(!process.env.CONNECTION_STRING){
        throw new Error("CONNECTION_STRING environment variable is not set")
        
    }
    await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Database connected");

}
catch(error){
    console.error("Database connection failed:", error.message)
}
}

module.exports = connectdb;

