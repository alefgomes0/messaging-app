const express = require("express");
const router = express.Router();
const markMessage = require("../controllers/markMessageController");

router.put("/", markMessage.put);


module.exports = router;