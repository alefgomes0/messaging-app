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

exports.post = async (req, res, next) => {
  try {
    const conversation = await Conversation.find({
      $and: [
        { participants: req.body.userId },
        { participants: req.body.contactId },
      ],
    }).exec();

    if (conversation.length === 0) {
      const newConversation = await Conversation.create({
        participants: [req.body.userId, req.body.contactId],
      });

      return res.json(newConversation._id);
    }

    return res.json(conversation._id);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.put = async (req, res, next) => {
  const senderId = req.body.userId;
  const receiverId = req.body.contactId;

  try {
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
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
