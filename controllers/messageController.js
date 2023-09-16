const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Message = require("../models/message");
const User = require("../models/user");

exports.post = asyncHandler(async (req, res, next) => {
  const message = new Message({
    participants: {
      sender: "6505e2b44f2497c800be3d76",
      receiver: "6505e2b44f2497c800be3d77",
    },
    message: "Oieeeeee",
  });

  const message2 = new Message({
    participants: {
      sender: "6505e2b44f2497c800be3d77",
      receiver: "6505e2b44f2497c800be3d76",
    },
    message: "Mama fdp",
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

/* exports.post = asyncHandler(async (req, res, next) => {
  const newMessage1 = new Message({
    participants: ["6505e2b44f2497c800be3d76", "6505e2b44f2497c800be3d77"],
    sender: "6505e2b44f2497c800be3d76",
    message: "Oláaaaaaa",
  });

  const newMessage2 = new Message({
    participants: ["6505e2b44f2497c800be3d76", "6505e2b44f2497c800be3d77"],
    sender: "6505e2b44f2497c800be3d77",
    message: "Mama filho da puta",
  });

  try {
    await Promise.all([newMessage1.save(), newMessage2.save()]);
    res.json("sent");
  } catch (error) {
    // Handle error here
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}); */
