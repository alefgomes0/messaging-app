const { body } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.post = [
  body("email").escape().trim(),
  body("name").escape().trim(),
  body("password").escape().trim(),

  async (req, res, next) => {
    const userAlreadyRegistered = await User.findOne({
      email: req.body.email,
    }).exec();

    if (userAlreadyRegistered) {
      res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    } else {
      try {
        const encryptedPwd = await bcrypt.hash(req.body.password, 10);
        await User.create({
          email: req.body.email,
          name: req.body.name,
          password: encryptedPwd,
        });
        res.status(201).json({
          success: true,
          message: "New user created",
        });
      } catch (err) {
        res.status(500).json({
          success: false,
          message: err.message,
        });
      }
    }
  },
];
