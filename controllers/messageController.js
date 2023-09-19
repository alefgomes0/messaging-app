const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Message = require("../models/message");
const User = require("../models/user");

exports.post = asyncHandler(async (req, res, next) => {
  req.body.firstId = "6508695537fe843f89aa8444";
  req.body.secondId = "6508695537fe843f89aa8443";

  const message = new Message({
    participants: {
      sender: "6508695537fe843f89aa8444",
      receiver: "6508695537fe843f89aa8443",
    },
    message: "Oieeeeee",
    date: new Date(),
  });

  const message2 = new Message({
    participants: {
      sender: "6508695537fe843f89aa8443",
      receiver: "6508695537fe843f89aa8444",
    },
    message: "Mama fdp",
    date: new Date(),
  });

  try {
    const [firstMessage, secondMessage] = await Promise.all([
      message.save(),
      message2.save(),
    ]);
    req.body.firstMessageId = firstMessage._id;
    req.body.secondMessageId = secondMessage._id;
    next();
  } catch (err) {
    // Handle error here
    console.error(err);
    res.status(500).json({ error: err });
  }
});
