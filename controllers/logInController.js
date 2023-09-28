const utils = require("../lib/passwordUtils");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");

exports.post = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        res
          .status(401)
          .json({ success: false, message: "Could not find user" });
      }

      const isValid = utils.validPassword(
        req.body.password,
        user.hash,
        user.salt
      );
      if (isValid) {
        const tokenObject = utils.issueJWT(user);
        console.log(user )
        res.status(200).json({
          success: true,
          user: user,
          token: tokenObject.token,
          expiresIn: tokenObject.expires,
        });
      } else {
        res
          .status(401)
          .json({ success: false, message: "You entered the wrong password" });
      }
    })
    .catch((err) => {
      next(err);
    });
};
