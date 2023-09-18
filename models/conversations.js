const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ConversationsSchema = new Schema({
  user: { type: Schema.Types.ObjectId, required: true },
  messages: [{ type: Schema.Types.ObjectId, required: true }]
})

module.exports = mongoose.model("Conversations", ConversationsSchema);