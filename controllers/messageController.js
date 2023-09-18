const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Message = require("../models/message");
const User = require("../models/user");

exports.post = asyncHandler(async (req, res, next) => {
  const message = new Message({
    participants: {
      sender: "6508695537fe843f89aa8444",
      receiver: "6508695537fe843f89aa8443",
    },
    message: "Oieeeeee",
    date: new Date()
  });

  const message2 = new Message({
    participants: {
      sender: "6508695537fe843f89aa8443",
      receiver: "6508695537fe843f89aa8444",
    },
    message: "Mama fdp",
    date: new Date()
  });

  try {
    await Promise.all([message.save(), message2.save()]);
    res.json("sent");
  } catch (error) {
    // Handle error here
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
