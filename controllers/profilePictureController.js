const asyncHandler = require("express-async-handler");
const User = require("../models/user");

exports.post = asyncHandler(async (req, res, next) => {
  await User.findByIdAndUpdate(req.params.userId, {
    $set: { profilePicture: req.body.newImage },
  });

  res.json("done");
});
