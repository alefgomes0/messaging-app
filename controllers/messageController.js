const asyncHandler = require("express-async-handler");
const { body } = require("express-validator");
const Message = require("../models/message");
const Conversation = require("../models/conversations");

exports.get = async (req, res, next) => {
  const userId = req.params.userId;
  const contactId = req.params.contactId;

  try {
    const allMessages = await Conversation.find({
      $and: [{ participants: userId }, { participants: contactId }],
    })
      .populate({
        path: "messages",
        select: "message participants.sender date time",
      })
      .populate("participants", "profilePicture")
      .select({ participants: { $elemMatch: { $eq: contactId } } })
      .exec();
    
    if (allMessages.length === 0) {
      return res.status(204).json({
        success: true,
        allMessages
      });
    }  

    return res.status(200).json({
      success: true,
      allMessages,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.post = [
  body("message").escape(),

  asyncHandler(async (req, res, next) => {
    const userId = req.body.userId;
    const contactId = req.params.contactId;

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
