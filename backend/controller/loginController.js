
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userModel = require("../models/userModel");
const employeeModel = require("../models/govEmployeeModel");
const Session = require("../models/sessionModel");

const loginPostData = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("Email and password are required");
      error.statusCode = 400;
      throw error;
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Find account
    let account = await userModel.findOne({
      email: normalizedEmail
    });

    if (!account) {
      account = await employeeModel.findOne({
        email: normalizedEmail
      });
    }

    if (!account || !account.password) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }

    // Verify password
    const isMatch = await bcrypt.compare(
      password,
      account.password
    );

    if (!isMatch) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }

    // Check employee approval
    // if (
    //   account.role === "GOVERNMENT_EMPLOYEE" &&
    //   account.verificationStatus !== "APPROVED"
    // ) {
    //   const error = new Error(
    //     "Your account is not approved yet"
    //   );
    //   error.statusCode = 403;
    //   throw error;
    // }

    // Generate session ID
    const sessionId = crypto.randomUUID();

    // Access token
    const accessToken = jwt.sign(
      {
        userId: account._id,
        role: account.role
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    // Refresh token
    const refreshToken = jwt.sign(
      {
        userId: account._id,
        role: account.role,
        sessionId,
        tokenType: "refresh"
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    // Hash refresh token
    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    // Store session
    await Session.create({
      userId: account._id,
      role: account.role,
      sessionId,
      refreshTokenHash,
      expiresAt: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      )
    });

    // Store cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/"
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
      user: {
        id: account._id,
        name: account.name,
        email: account.email,
        role: account.role
      }
    });

  } catch (error) {
    next(error);
  }
};

module.exports = { loginPostData };
