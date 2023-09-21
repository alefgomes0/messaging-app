const { DateTime } = require("luxon");
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

  return `${DateTime.fromJSDate(this.date).toLocaleString(DateTime.TIME_24_SIMPLE)}`;
});

module.exports = mongoose.model("Message", MessageSchema);
