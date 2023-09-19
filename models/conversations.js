const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ConversationsSchema = new Schema({
  participants: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  messages: [{ type: Schema.Types.ObjectId, required: true, ref: "Message" }]
})

module.exports = mongoose.model("Conversations", ConversationsSchema);
