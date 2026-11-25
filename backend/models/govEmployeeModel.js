const mongoose = require("mongoose");

const governmentEmployeeSchema = new mongoose.Schema(
  {
    role: {
    type: String,
    enum: ["GOVERNMENT_EMPLOYEE"],
    default: "GOVERNMENT_EMPLOYEE"
},
    // Personal Information
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    // Employee Information
    employeeId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    department: {
      type: String,
      required: true,
      trim: true,
    },

    designation: {
      type: String,
      required: true,
      trim: true,
    },

    office: {
      type: String,
      required: true,
      trim: true,
    },

    serviceArea: {
      type: String,
      required: true,
      trim: true,
    },

    idproof: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const GovernmentEmployee = mongoose.model(
  "GovernmentEmployee",
  governmentEmployeeSchema
);

module.exports = GovernmentEmployee;