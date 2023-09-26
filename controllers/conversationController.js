const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const Message = require("../models/message");
const Conversation = require("../models/conversations");

exports.get = asyncHandler(async (req, res, next) => {
  const contact = await Conversation.find({
    participants: { $elemMatch: { $eq: req.params.userId } },
  })
    .populate({
      path: "messages",
      select: "message date time",
      // Limite de 2 mensagens pra garantir que o Mongoose retorne pelo menos 2 por contato
      options: { sort: { date: -1 }},
    })
    .populate("participants", "name profilePicture")
    .select({ participants: { $elemMatch: { $ne: req.params.userId } } })
    .exec();

  res.json(contact);
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
