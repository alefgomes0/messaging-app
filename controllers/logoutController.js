const User = require("../models/user");
exports.get = async (req, res, next) => {
  // On client, also delete the accessToken

  try {
    console.log(req.cookies)
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();
    if (foundUser.length === 0) {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      return res.sendStatus(204);
    }

    await User.findOneAndUpdate(
      { refreshToken: refreshToken },
      {
        $set: { refreshToken: "" },
      }
    ).exec();

    res.clearCookie("jwt", {
      httpOnly: true,
      httpOnly: true,
      sameSite: "None",
      secure: true,
    }); // secure: true - only servers on https
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
