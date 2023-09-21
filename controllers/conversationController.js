const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const Message = require("../models/message");
const Conversation = require("../models/conversations");

exports.get = asyncHandler(async (req, res, next) => {
  const contact = await Conversation.find({
    participants: { $elemMatch: { $eq: req.params.userId } }
  })
  .populate({
    path: "messages",
    select: "message date time",
    options: { sort: { date: -1 }, limit: 1 }
  })
  .populate("participants", "name")
  .select({ participants: { $elemMatch: { $ne: req.params.userId }}, messages: 1})
  .exec();
  
  res.json([contact[0]]);
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
