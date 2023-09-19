const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Message = require("../models/message");
const User = require("../models/user");

exports.post = asyncHandler(async (req, res, next) => {
/*   req.body.firstId = "6508695537fe843f89aa8444";
  req.body.secondId = "6508695537fe843f89aa8443"; */

  const message = new Message({
    participants: {
      sender: "6508695537fe843f89aa8443",
      receiver: "6508695537fe843f89aa8444",
    },
    message:
      "tdb??",
    date: new Date(),
  });

  await message.save()
});
