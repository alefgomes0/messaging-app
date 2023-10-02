const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const Message = require("../models/message");
const Conversation = require("../models/conversations");

exports.get = asyncHandler(async (req, res, next) => {
  console.log(req.params.userId);

  const contacts = await Conversation.find({
    participants: { $elemMatch: { $eq: req.params.userId } },
  }).exec();
  if (contacts.length === 0) {
    return res.status(204).json({ message: "No contacts found" });
  }

  const populatedContacts = contacts
    .populate({
      path: "messages",
      select: "message date time",
      options: { sort: { date: -1 }, limit: 30 },
    })
    .populate("participants", "name profilePicture")
    .select({ participants: { $elemMatch: { $ne: req.params.userId } } })
    .exec();

  res.json(populatedContacts);
});

exports.post = asyncHandler(async (req, res, next) => {
  const firstUserId = req.body.userId;
  const secondUserId = req.body.contactId;

  await Conversation.findOneAndUpdate(
    {
      participants: {
        $elemMatch: { $eq: firstUserId },
        $elemMatch: { $eq: secondUserId },
      },
    },
    {
      $addToSet: { messages: { $each: [req.body.messageId] } },
      $setOnInsert: { participants: [secondUserId, firstUserId] },
    },
    {
      upsert: true,
    }
  ).exec();
  res.json("end");
});
