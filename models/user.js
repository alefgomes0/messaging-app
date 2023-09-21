const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true, },
  nickname: { type: String },
  contacts: [{ type: Schema.Types.ObjectId, ref: "Contacts" }],
  friendRequests: [{ type: Schema.Types.ObjectId }],
  conversations: [{ type: Schema.Types.ObjectId }],
  profilePicture: { type: Buffer },
});

module.exports = mongoose.model("User", UserSchema);
