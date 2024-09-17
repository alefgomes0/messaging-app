const express = require("express");
const router = express.Router();
const interesse = require("../controllers/interesseController");

router.post("/", interesse.post);

module.exports = router;
