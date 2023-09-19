const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");

exports.post = asyncHandler(async (req, res, next) => {
  const newUser = new User({
    email: "eu@email.com",
    password: 123,
    name: "Eu",
    contacts: [],
    friendRequests: [],
    conversations: [],
  });



  await newUser.save()
  res.json("saved");
});

exports.update = asyncHandler(async (req, res, next) => {
  await User.findOneAndUpdate(
    { _id: "6508695537fe843f89aa8444" },
    { $set: { contacts: "6508695537fe843f89aa8443" } }
  ).exec();

  res.json("updated");
});
