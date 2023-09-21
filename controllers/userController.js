const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");

exports.post = asyncHandler(async (req, res, next) => {
  const newUser = new User({
    email: "hterfewd@email.com",
    password: 123,
    name: "Ayhrterw Roeiw",
    contacts: ["6508695537fe843f89aa8444"],
    friendRequests: [],
    conversations: [],
  });

  await newUser.save()
  res.json("saved");
});

exports.update = asyncHandler(async (req, res, next) => {
  await User.findOneAndUpdate(
    { _id: "6508695537fe843f89aa8444" },
    { $addToSet: { conversations: { $each: ["6509f893fd862da958dd067e"] } }, }
  ).exec();

  res.json("updated");
});
