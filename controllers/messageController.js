const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Message = require("../models/message");
const User = require("../models/user");
const Conversation = require("../models/conversations");
const message = require("../models/message");

exports.get = asyncHandler(async (req, res, next) => {
  const userId = req.params.contactId;

  const allMessages = await Conversation.find({
    participants: {
      $elemMatch: { $eq: userId },
      $elemMatch: { $eq: req.params.contactId },
    },
  })
    .populate({
      path: "messages",
      select: "message participants.sender date time",
    })
    .populate("participants", "profilePicture")
    .select({ participants: { $elemMatch: { $eq: req.params.contactId } } })
    .exec();

  res.json(allMessages);
});

exports.post = [
  body("message").escape(),

  asyncHandler(async (req, res, next) => {
    console.log(req.body.message);
    const message = new Message({
      participants: {
        sender: req.body.userId,
        receiver: req.params.contactId,
      },
      message: req.body.message,
      date: new Date(),
    });
    await message.save();

    req.body.contactId = req.params.contactId;
    req.body.messageId = message._id;
    next();
  }),
];
