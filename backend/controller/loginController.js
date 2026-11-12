
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userModel = require('../models/userModel');

const Session = require('../models/sessionModel');

const loginPostData = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Find user
    const user = await userModel.findOne({ email });
       if (!user) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }

    // 2. Verify password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }

    // 3. Generate session ID
    const sessionId = crypto.randomUUID();

    // 4. Generate access token
    const accessToken = jwt.sign(
      {
        userId: user._id,
        role: user.role
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    // 5. Generate refresh token
    const refreshToken = jwt.sign(
      {
        userId: user._id,
        sessionId,
        tokenType: "refresh"
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    // 6. Hash refresh token
    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    // 7. Store session in MongoDB
    await Session.create({
      userId: user._id,
      sessionId,
      refreshTokenHash,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    // 8. Store refresh token in HttpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/"
    });

    // 9. Send access token to React
    return res.status(200).json({
      message: "Login successful",
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    next(error);
  }
};

module.exports = { loginPostData };
