const asyncHandler = require("express-async-handler");
const User = require("../models/user");

exports.get = asyncHandler(async (req, res, next) => {
  const userProfilePicture = await User.findById(
    req.params.userId,
    "profilePicture"
  );
  res.json(userProfilePicture);
});


exports.post = asyncHandler(async (req, res, next) => {
  await User.findByIdAndUpdate(req.params.userId, {
    $set: { profilePicture: req.body.newImage },
  });

  res.json("done");
});
