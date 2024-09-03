import { body } from "express-validator";
import Mensagem from "../models/mensagem";

async function mensagemGet(req, res, next) {
  try {
    const mensagens = await Mensagem.find({});
    return res.status(200).json({
      sucesso: true,
      mensagens: mensagens,
    });
  } catch (err) {
    return res.status(500).json({
      sucesso: false,
      mensagem: "Não foi possível acessar suas mensagens.",
      erro: err.message,
    });
  }
}

const mensagemPost = [
  body("mensagem").escape().trim(),
  async (req, res, next) => {
    const novaMensagem = new Mensagem({
      iniciais_nome: req.body.nome,
      mensagem: req.body.mensagem,
      data: req.body.data,
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

export { mensagemGet, mensagemPost };
