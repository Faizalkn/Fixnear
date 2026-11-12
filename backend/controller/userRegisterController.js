const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel')


const registerPostData = async(req,res,next)=>{
try {
    const{name,address,state,district,village,city,pincode,profilepic,idproof,phone,email,password}=req.body

//cheking all inputs enterd or not
if (!name || !address || !state || !district || !village || !city || !pincode ||!idproof || !phone || !email || !password) {
  const error = new Error("Please enter all inputs");
  error.statusCode = 400;
  throw error;
  };
  if (!idproof) {
  const error = new Error("Please upload your ID proof");
  error.statusCode = 400;
  throw error;
}
// Name
if (!/^[a-zA-Z\s]+$/.test(name)) {
  const error = new Error("Invalid name");
      error.statusCode = 400;
      throw error;
    }
// Address
if (address.trim().length < 5) {
   const error = new Error("Address must contain at least 5 characters");
      error.statusCode = 400;
      throw error;
    }
 // State, district, village and city
    if (
      !/^[a-zA-Z\s]+$/.test(state) ||
      !/^[a-zA-Z\s]+$/.test(district) ||
      !/^[a-zA-Z\s]+$/.test(village) ||
      !/^[a-zA-Z\s]+$/.test(city)
    ) {
      const error = new Error("Invalid location details");
      error.statusCode = 400;
      throw error;
    }

    // Pincode
    if (!/^[1-9][0-9]{5}$/.test(String(pincode))) {
      const error = new Error("Pincode must be 6 digits");
      error.statusCode = 400;
      throw error;
    }

    // Phone
    if (!/^[6-9][0-9]{9}$/.test(String(phone))) {
      const error = new Error("Invalid 10-digit phone number");
      error.statusCode = 400;
      throw error;
    }
// Pincode (6 digits)
if (!/^[1-9][0-9]{5}$/.test(pincode)) {
   const error = new Error("Pincode must be 6 digits");
      error.statusCode = 400;
      throw error;
    }
// Phone (Indian 10-digit number)
if (!/^[6-9][0-9]{9}$/.test(phone)) {
   const error = new Error("Invalid 10-digit phone number");
      error.statusCode = 400;
      throw error;
    }

// Email
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  const error = new Error("Invalid email address");
      error.statusCode = 400;
      throw error;
    }

// Password
if (password.length < 8) {
  const error = new Error("Password must be at least 8 characters");
      error.statusCode = 400;
      throw error;
    }

const hashedPassword = await bcrypt.hash(password, 10);
const existingUser = await userModel.findOne({ email: email });
if (existingUser) {
  const error = new Error("Email already exists");
      error.statusCode = 409;
      throw error;
    }

await userModel.create({name:name,address:address,state:state,district:district,village:village,city:city,pincode:pincode,profilepic:profilepic,idproof:idproof,phone:phone,email:email,password:hashedPassword})
return res.status(201).json({
      success: true,
      message: "Registration successful"
    });
  } catch (error) {
    next(error);
  }

};


module.exports={registerPostData}