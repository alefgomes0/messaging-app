const express = require("express");
const router = express.Router();
const  mensagem  = require("../controllers/mensagemController");

router.get("/", mensagem.get);
router.post("/", mensagem.post);
router.delete("/", mensagem.delete)

module.exports = router;

