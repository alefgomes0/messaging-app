const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const opts = { toJSON: { virtuals: true } };

const MessageSchema = new Schema(
  {
    participants: {
      sender: { type: Schema.Types.ObjectId, required: true },
      receiver: { type: Schema.Types.ObjectId, required: true },
    },
    message: { type: String, required: true },
    date: { type: Date, required: true },
  },
  opts
);

MessageSchema.virtual("time").get(function () {
  const time = `${this.date.getHours()}:${this.date.getMinutes()}`;
  if (time.length === 3) {
    return `${this.date.getHours()}:${this.date.getMinutes()}00`;
  } else if (time.length === 4) {
    return `${this.date.getHours()}:${this.date.getMinutes()}0`;
  }
  return `${this.date.getHours()}:${this.date.getMinutes()}`;
});

module.exports = mongoose.model("Message", MessageSchema);
