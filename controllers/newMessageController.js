const asyncHandler = require("express-async-handler");
const Conversation = require("../models/conversations");

exports.get = asyncHandler(async (req, res, next) => {
  const userId = "6508695537fe843f89aa8444";

  const allMessages = await Conversation.find({
    participants: {
      $elemMatch: { $eq: userId },
      $elemMatch: { $eq: req.params.contactId },
    },
  })
    .populate({
      path: "messages",
      options: { sort: { date: -1 }, limit: 1 },
      select: "message participants.sender date time",
    })
    .exec();

  res.json(allMessages);
});