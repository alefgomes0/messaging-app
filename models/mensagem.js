//import { DateTime } from "luxon"
const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const opts = { toJSON: { virtuals: true } };

const MensagemSchema = new Schema(
  {
    iniciais_nome: { type: String, required: true },
    mensagem: { type: String, required: true },
    data: { type: String, required: true },
    visivel: { type: Boolean, required: true },
  },
  { collection: "mensagens", opts }
);

// MensagemSchema.virtual("data_formatada").get(function () {
//   return `${DateTime.fromJSDate(this.date).toLocaleString(
//     DateTime.TIME_24_SIMPLE
//   )}`;
// });

module.exports = mongoose.model("Mensagem", MensagemSchema);
