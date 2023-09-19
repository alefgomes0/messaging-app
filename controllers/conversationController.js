const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const Message = require("../models/message");
const Conversation = require("../models/conversations");

exports.get = asyncHandler(async (req, res, next) => {
  const contact = await Conversation.find({
    participants: { $elemMatch: { $eq: req.params.userId } }
  }, { participants: { $elemMatch: { $ne: req.params.userId }}})

  console.log(contact);
  res.json("finish");
});

exports.post = asyncHandler(async (req, res, next) => {
  const firstUserId = "6508695537fe843f89aa8444";
  const secondUserId = "6508695537fe843f89aa8443";
  const firstMessageId = "6509c27bd787515e8ed5fcc8";
  const secondMessageId = "6509c27bd787515e8ed5fcc9";

  await Conversation.findOneAndUpdate(
    {
      participants: {
        $elemMatch: { $eq: firstUserId },
        $elemMatch: { $eq: secondUserId },
      },
    },
    {
      $addToSet: { messages: { $each: [firstMessageId, secondMessageId] } },
      $setOnInsert: { participants: [secondUserId, firstUserId] },
    },
    {
      upsert: true,
    }
  ).exec();
  res.json("end");
});
