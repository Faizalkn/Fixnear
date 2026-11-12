const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');


const loginPostData = async(req,res)=>{
const {email,pass}=req.body
const user = await userModel.findOne({email})
if(!user){
    const error = new Error("User not found");
    error.statusCode = 400;
    throw error;}
if(!await bcrypt.compare(pass,user.password)){
    const error = new Error("Invalid credentials");
    error.statusCode = 400;
    throw error;
}

const sessionId = crypto.randomUUID();
    // Generate access token
const accessToken = jwt.sign(
    { userId: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
);

// Generate refresh tokenconst bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userModel = require('../models/user');
const Session = require('../models/session');

const loginPostData = async (req, res, next) => {
  try {
    const { email, pass } = req.body;

    // Find user
    const user = await userModel.findOne({ email });

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 400;
      throw error;
    }

    // Compare password
    const isMatch = await bcrypt.compare(pass, user.password);

    if (!isMatch) {
      const error = new Error("Invalid credentials");
      error.statusCode = 400;
      throw error;
    }

    // Generate session ID
    const sessionId = crypto.randomUUID();

    // Generate access token
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    // Generate refresh token
    const refreshToken = jwt.sign(
      {
        userId: user._id,
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

    // Store session in MongoDB
    await Session.create({
      userId: user._id,
      sessionId,
      refreshTokenHash,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    // Store refresh token in cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    // Send access token
    return res.status(200).json({
      message: "Login successful",
      accessToken
    });

  } catch (error) {
    next(error);
  }
};

module.exports = { loginPostData };
const refreshToken = jwt.sign(
    { userId: user._id ,
        sessionId: sessionId,
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
  
// Store session in MongoDB
await Session.create({
    userId: user._id,
     sessionId: sessionId,
    refreshTokenHash: refreshTokenHash,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
});

// Send refresh token as HttpOnly cookie
res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000
});

// Send access token to React
res.status(200).json({
    message: "Login successful",
    accessToken
});
}

res.status(200).json({token})














module.exports={loginPostData}






