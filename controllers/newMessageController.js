const asyncHandler = require("express-async-handler");
const Conversation = require("../models/conversations");

exports.put = async (req, res, next) => {
  try {
    const allMessages = await Conversation.findOneAndUpdate(
      {
        $and: [
          { participants: req.body.userId },
          { participants: req.body.contactId },
        ],
      },
      {
        $set: {
          newMessage: {
            receiver: req.params.contactId,
            sender: req.body.userId,
            read: false,
          },
        },
      },
      {
        returnDocument: "after",
      }
    )
      .slice("messages", -1)
      .populate({
        path: "messages",
        select: "message participants date time",
      })
      .exec();

    res.json({
      success: true,
      allMessages,
    });
  } catch (err) {
    res.json({
      success: false,
    });
  }
};
