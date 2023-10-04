const asyncHandler = require("express-async-handler");
const { body } = require("express-validator");
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

  await newUser.save();
  res.json("saved");
});

exports.update = [
  body("userId").trim().escape(),
  body("newName").trim().escape(),

  async (req, res, next) => {
    console.log(req.body.userId, req.body.newId)
    try {
      const user = await User.findByIdAndUpdate(req.body.userId, {
        $set: {
          name: req.body.newName,
        },
      }).exec();

      console.log(user);
      return res.status(200).json({
        success: true,
        message: "User name updated",
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
]
