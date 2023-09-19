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
    select: "message date",
    options: { sort: { date: -1 }, limit: 1 }
  })
  .populate("participants", "name")
  .select({ participants: { $elemMatch: { $ne: req.params.userId }}, messages: 1})

  console.log(contact);
  res.json(contact);
});

exports.post = asyncHandler(async (req, res, next) => {
  const firstUserId = "6508695537fe843f89aa8444";
  const secondUserId = "6508695537fe843f89aa8443";
  const firstMessageId = "650a03fc9bf46c622488bcac";

  await Conversation.findOneAndUpdate(
    {
      participants: {
        $elemMatch: { $eq: firstUserId },
        $elemMatch: { $eq: secondUserId },
      },
    },
    {
      $addToSet: { messages: { $each: [firstMessageId] } },
      $setOnInsert: { participants: [secondUserId, firstUserId] },
    },
    {
      upsert: true,
    }
  ).exec();
  res.json("end");
});
