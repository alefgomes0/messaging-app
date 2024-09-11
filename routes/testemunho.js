const express = require("express");
const router = express.Router();
const  testemunho  = require("../controllers/testemunhoController");

router.get("/", testemunho.get);

module.exports = router;
