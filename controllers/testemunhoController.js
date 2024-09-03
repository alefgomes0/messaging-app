const Mensagem = require("../models/mensagem")

export async function testemunhoGet(req, res, next) {
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
}
