const utils = require("../lib/passwordUtils");
const { body } = require("express-validator");
const User = require("../models/user");

exports.post = [
  body("email").escape().trim(),
  body("password").escape().trim(),

  async (req, res, next) => {
    const userAlreadyRegistered =
      (await User.find({ email: req.body.email })).length > 0;

    if (userAlreadyRegistered) {
      res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    } else {
      const saltHash = utils.genPassword(req.body.password);
      const salt = saltHash.salt;
      const hash = saltHash.hash;

      const newUser = new User({
        email: req.body.email,
        name: req.body.name,
        hash,
        salt,
      });

      newUser
        .save()
        .then((user) => {
          const jwt = utils.issueJWT(user);
          console.log("user registered");
          res.json({
            success: true,
            user: user,
            token: jwt.token,
            expiresIn: jwt.expires,
          });
        })
        .catch((err) => res.status(500).json({ message: err.message }));
    }
  },
];
