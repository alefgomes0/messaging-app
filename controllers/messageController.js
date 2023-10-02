const asyncHandler = require("express-async-handler");
const { body } = require("express-validator");
const Message = require("../models/message");
const Conversation = require("../models/conversations");

exports.get = asyncHandler(async (req, res, next) => {
  const userId = req.body.userId;
  const contactId = req.params.contactId

  const allMessages = await Conversation.find({
    participants: {
      $elemMatch: { $eq: userId },
      $elemMatch: { $eq:contactId },
    },
  })
    .populate({
      path: "messages",
      select: "message participants.sender date time",
    })
    .populate("participants", "profilePicture")
    .select({ participants: { $elemMatch: { $eq: contactId } } })
    .exec();

  res.json(allMessages);
});

exports.post = [
  body("message").escape(),

  asyncHandler(async (req, res, next) => {
    const userId = req.body.userId;
    const contactId = req.params.contactId

    const message = new Message({
      participants: {
        sender: userId,
        receiver: contactId,
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
