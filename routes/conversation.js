const express = require("express");
const router = express.Router();
const conversation = require("../controllers/conversationController");

router.get("/:userId", conversation.get);
router.post("/new/message", conversation.post);

module.exports = router;
