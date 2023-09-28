const utils = require("../lib/passwordUtils");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");

exports.post = asyncHandler(async (req, res, next) => {
  const saltHash = utils.genPassword(req.body.password);
  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new User({
    email: req.body.email,
    name: req.body.name,
    hash,
    salt,
  });

  const jwt = utils.issueJWT(newUser);
  await newUser.save();

  console.log("user registered")
  res.json({
    success: true,
    user: newUser,
    token: jwt.token,
    expiresIn: jwt.expires,
  });
});
