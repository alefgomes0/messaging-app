const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConversationsSchema = new Schema({
  participants: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
  newMessage: {
    receiver: { type: Schema.Types.ObjectId },
    sender: { type: Schema.Types.ObjectId },
    read: { type: Boolean },
  },
});

module.exports = mongoose.model("Conversations", ConversationsSchema);
