const Mensagem = require("../models/mensagem");

exports.get = async function (req, res, next) {
  try {
    const testemunhos = await Mensagem.find({ visivel: true });
    return res.status(200).json({
      sucesso: true,
      mensagens: testemunhos,
    });
  } catch (err) {
    return res.status(500).json({
      sucesso: false,
      erro: err.message,
    });
  }
};

exports.post = [
  body("mensagem").escape().trim(),
  async (req, res, next) => {
    const novaMensagem = new Mensagem({
      iniciais_nome: req.body.nome,
      mensagem: req.body.mensagem,
      data: req.body.data,
      visivel: false,
    });

    try {
      await novaMensagem.save();
    } catch (err) {
      return res.status(500).json({
        sucesso: false,
        mensagem: "Não foi possível enviar sua mensagem.",
        erro: err.message,
      });
    }
    return res.status(200).json({
      sucesso: true,
      mensagem: "Mensagem enviada com sucesso!",
    });
  },
];
