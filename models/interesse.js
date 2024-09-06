const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InteresseSchema = new Schema({
  nomeCompleto: { type: String, required: true },
  cpf: { type: String, required: true },
  nascimento: { type: String, required: true },
  email: { type: String, required: true },
  telefone: { type: String, required: true },
  endereço: { type: String, required: true },
  cidade: { type: String, required: true },
  estado: { type: String, required: true },
  cep: { type: String, required: true },
  pagamento: { type: String, required: true },
  preferencia: { type: String, required: true },
  nomeContato: { type: String, required: true },
  vinculoContato: { type: String, required: true },
  telefoneContato: { type: String, required: true },
  medicamento: { type: String },
  acompanhamento: { type: String },
  experiencia: { type: String },
});

module.exports = mongoose.model("Interesse", InteresseSchema);
