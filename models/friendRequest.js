const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FriendRequestSchema = new Schema({
  fromUser: { type: Schema.Types.ObjectId, required: true },
  toUser: { type: Schema.Types.ObjectId, required: true },
  state: { type: Boolean, required: true },
  alreadyRefused: { type: Boolean },
});

module.exports = mongoose.model("FriendRequest", FriendRequestSchema);
