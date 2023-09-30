const getUserId = require("../utils/getUserId");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.get = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();
    if (foundUser.length === 0) return res.sendStatus(403);

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || getUserId(foundUser[0]._id) !== decoded.id) {
          return res.sendStatus(403);
        }
        const accessToken = jwt.sign(
          { id: decoded.id },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "900s" }
        );
        res.json({ success: true, accessToken });
      }
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
