const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.post = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email }).exec();

  if (!user) {
    res.status(401).json({ success: false, message: "Could not find user" });
  } else {
    const match = await bcrypt.compare(req.body.password, user.password);
    if (match) {
      // Cria o JWT
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
  }
};
