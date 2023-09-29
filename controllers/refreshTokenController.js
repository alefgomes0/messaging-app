const utils = require("../lib/passwordUtils");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.get = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;

    const foundUser = await User.find({ refreshToken: refreshToken });
    if (foundUser.length === 0) return res.sendStatus(403);

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || foundUser._id !== decoded.id) return res.sendStatus(403);
        const accessToken = jwt.sign(
          { id: decoded.id },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "30s" }
        );
        res.json({ success: true, accessToken });
      }
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
