const { body } = require("express-validator");
const Interesse = require("../models/interesse");

exports.get = async function (req, res, next) {
  try {
    const interesses = await Interesse.find({});
    return res.status(200).json({
      sucesso: true,
      interesses,
    });
  } catch (err) {
    return res.status(500).json({
      sucesso: false,
    });
  }
};

exports.post = [
  body("interesse").escape().trim(),
  async (req, res, next) => {
    const novoInteresse = new Interesse({
      nomeCompleto: req.body.nomeCompleto,
      cpf: req.body.cpf,
      nascimento: req.body.nascimento,
      email: req.body.email,
      telefone: req.body.email,
      endereço: req.body.endereço,
      cidade: req.body.cidade,
      estado: req.body.estado,
      cep: req.body.cep,
      pagamento: req.body.pagamento,
      preferencia: req.body.preferencia,
      nomeContato: req.body.nomeContato,
      vinculoContato: req.body.vinculoContato,
      telefoneContato: req.body.telefoneContato,
      medicamento: req.body.medicamento,
      acompanhamento: req.body.acompanhamento,
      experiencia: req.body.experiencia,
    });

    try {
      await novoInteresse.save();
      return res.status(200).json({
        sucesso: true,
        novoInteresse,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        sucesso: false,
        mensamge: err.message,
      });
    }
  },

  (exports.delete = async function (req, res, next) {
    try {
      const messageId = req.body.messageId;
      await Interesse.findByIdAndDelete(messageId);
      res.status(200).json({
        successo: true,
      });
    } catch (err) {
      res.status(500).json({
        successo: false,
      });
    }
  }),
];
