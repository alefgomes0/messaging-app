const express = require("express");
const router = express.Router();
const interesse = require("../controllers/interesseController");

router.get("/", interesse.get);
router.post("/", interesse.post);
router.delete("/", interesse.delete);

module.exports = router;
