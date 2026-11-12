const mongoose = require("mongoose");
const userschema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["USER"],
      default: "USER",
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
    },
    state: {
      type: String,
      default: "Kerala",
    },
    district: {
      type: String,
    },
    village: {
      type: String,
    },
    city: {
      type: String,
    },
    pincode: {
      type: Number,
    },
    profilepic: {
      type: String,
    },
    idproof: {
      type: String,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);
 module.exports = mongoose.model("User", userschema);