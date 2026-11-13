const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const governmentEmployeeModel = require('../models/govEmployeeModel');

const empRegPostData = async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone,
      employeeId,
      department,
      designation,
      office,
      serviceArea,
      idproof,
      password,
    } = req.body;

    // Required fields
    if (
      !name ||
      !email ||
      !phone ||
      !employeeId ||
      !department ||
      !designation ||
      !office ||
      !serviceArea ||
      !idproof ||
      !password
    ) {
      const error = new Error("Please enter all required fields");
      error.statusCode = 400;
      throw error;
    }

    // Name
    if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
      const error = new Error("Invalid employee name");
      error.statusCode = 400;
      throw error;
    }

    // Email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      const error = new Error("Invalid email address");
      error.statusCode = 400;
      throw error;
    }

    // Phone
    if (!/^[6-9][0-9]{9}$/.test(String(phone))) {
      const error = new Error("Invalid 10-digit phone number");
      error.statusCode = 400;
      throw error;
    }

    // Employee ID
    if (String(employeeId).trim().length < 3) {
      const error = new Error("Employee ID must contain at least 3 characters");
      error.statusCode = 400;
      throw error;
    }

    // Department
    if (department.trim().length < 2) {
      const error = new Error("Invalid department");
      error.statusCode = 400;
      throw error;
    }

    // Designation
    if (designation.trim().length < 2) {
      const error = new Error("Invalid designation");
      error.statusCode = 400;
      throw error;
    }

    // Office
    if (office.trim().length < 3) {
      const error = new Error("Office name must contain at least 3 characters");
      error.statusCode = 400;
      throw error;
    }

    // Service Area
    if (serviceArea.trim().length < 2) {
      const error = new Error("Invalid service area");
      error.statusCode = 400;
      throw error;
    }

    // ID Proof
    if (!idproof) {
      const error = new Error("Please upload your government ID proof");
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
      const existingUser = await governmentEmployeeModel.findOne({ email: email });
      if (existingUser) {
        const error = new Error("Email already exists");
        error.statusCode = 409;
        throw error;
      }
      await governmentEmployeeModel.create({
    name: name,
    email: email,
    phone: phone,
    employeeId: employeeId,
    department: department,
    designation: designation,
    office: office,
    serviceArea: serviceArea,
    idproof:idproof,
    password: hashedPassword
});

return res.status(201).json({
    success: true,
    message: "Government employee registered successfully. Awaiting admin verification."
});


    }
  catch (error) {
    next(error);
  }
};

module.exports = { empRegPostData };
