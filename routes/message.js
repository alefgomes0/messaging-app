const express = require("express");
const router = express.Router();
const message = require("../controllers/messageController");

router.get("/messages/:contactId", message.get);
router.post("/messages/:contactId", message.post, conversation.post);

module.exports = router;
