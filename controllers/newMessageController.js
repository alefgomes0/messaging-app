const asyncHandler = require("express-async-handler");
const Conversation = require("../models/conversations");

exports.put = asyncHandler(async (req, res, next) => {
  const allMessages = await Conversation.findOneAndUpdate(
    {
      participants: {
        $elemMatch: { $eq: req.body.userId },
        $elemMatch: { $eq: req.params.contactId },
      },
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

  res.json(allMessages);
});
