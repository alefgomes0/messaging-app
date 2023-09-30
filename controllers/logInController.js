const utils = require("../lib/passwordUtils");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.post = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (user.length === 0) {
    res.status(401).json({ success: false, message: "Could not find user" });
  }

  try {
    const isValid = utils.validPassword(
      req.body.password,
      user.hash,
      user.salt
    );
    if (isValid) {
      //const tokenObject = utils.issueJWT(user);

      const accessToken = jwt.sign(
        { id: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "900s" }
      );
      const refreshToken = jwt.sign(
        { id: user._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      user.refreshToken = refreshToken;
      await user.save();

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000, //Inicialmente em milisegundos, convertendo pra 1 dia
      });

      res.status(200).json({
        success: true,
        accessToken: accessToken,
      });
    } else {
      res
        .status(401)
        .json({ success: false, message: "You entered the wrong password" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
