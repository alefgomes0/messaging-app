const Mensagem = require("../models/mensagem");

exports.get = async function (req, res, next) {
  try {
    const testemunhos = await Mensagem.find({ visivel: true });
    return res.status(200).json({
      sucesso: true,
      testemunhos,
    });
  } catch (err) {
    return res.status(500).json({
      sucesso: false,
      erro: err.message,
    });
  }
};

exports.post = async function (req, res, next) {
  try {
    return res.status(200).json({
      sucesso: true,
    });
  } catch (err) {
    return res.status(500).json({
      sucesso: false,
      erro: err.message,
    });
  }
};
