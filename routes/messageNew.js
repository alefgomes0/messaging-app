const express = require("express");
const router = express.Router();
const newMessage = require("../controllers/newMessageController");

router.put("/:contactId", newMessage.put);

module.exports = router;
