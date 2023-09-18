const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FriendRequestSchema = new Schema({
  fromUser: { type: Schema.Types.ObjectId, required: true },
  toUser: { type: Schema.Types.ObjectId, required: true },
  state: { type: "Accepted" || "Rejected" || "Pending", required: true },
});

module.exports = mongoose.model("FriendRequest", FriendRequestSchema);
