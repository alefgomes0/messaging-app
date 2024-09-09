const express = require("express");
const router = express.Router();
const mensagem = require("../controllers/mensagemController");

router.get("/", mensagem.todos);
router.get("/visivel", mensagem.visivel);
router.post("/", mensagem.post);
router.put("/", mensagem.put);
router.delete("/", mensagem.delete);

module.exports = router;
