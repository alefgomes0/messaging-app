const express = require("express");
const router = express.Router();
const message = require("../controllers/messageController");
const conversation = require("../controllers/conversationController");


router.get("/:contactId", message.get);
router.post("/:contactId", message.post, conversation.post);

module.exports = router;
