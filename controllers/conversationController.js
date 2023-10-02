const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const Message = require("../models/message");
const Conversation = require("../models/conversations");

exports.get = asyncHandler(async (req, res, next) => {
  const [contacts, populatedContacts] = await Promise.all([
    Conversation.find({
      participants: { $elemMatch: { $eq: req.params.userId } },
    }).exec(),
    Conversation.find({
      participants: { $elemMatch: { $eq: req.params.userId } },
    })
      .populate({
        path: "messages",
        select: "message date time",
        options: { sort: { date: -1 }, limit: 30 },
      })
      .populate("participants", "name profilePicture")
      .select({ participants: { $elemMatch: { $ne: req.params.userId } } })
      .exec(),
  ]);
  
  if (contacts.length === 0) {
    return res.status(204).json({ message: "No contacts found" });
  }

  res.json(populatedContacts);
});

exports.post = asyncHandler(async (req, res, next) => {
  const senderId = req.body.userId;
  const receiverId = req.body.contactId;

  await Conversation.findOneAndUpdate(
    {
      participants: {
        $elemMatch: { $eq: senderId },
        $elemMatch: { $eq: receiverId },
      },
    },
    {
      $addToSet: { messages: { $each: [req.body.messageId] } },
      $setOnInsert: { participants: [receiverId, senderId] },
    },
    {
      upsert: true,
    }
  ).exec();
  res.json("end");
});
