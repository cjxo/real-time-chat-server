const jsonwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJwtToken = (token) => {  
  try {
    return jwt.verify(token, process.env.JWT_TOKEN_ACCESS_SECRET);
  } catch (err) {
    return null;
  }
};

const jwt = {
  set: (payload, res) => {
    const duration = process.env.NODE_ENV === "production" ? "7d" : "5m";
    const token = jsonwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: duration });

    res.cookie("remember_me_token", token, {
      httpOnly: true,
      maxAge: process.env.NODE_ENV === "production" ? 7 * 24 * 60 * 60 * 1000 : 5 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    return res;
  },

  verify: (req, res, next) => {
    const token = req.cookies.remember_me_token;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    jsonwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "Invalid token" });
      } else {
        req.userId = decoded.userId;
        req.remainingTime = decoded.exp - Math.floor(Date.now() / 1000);
        next();
      }
    });
  },
}

module.exports = {
  jwt,
};
