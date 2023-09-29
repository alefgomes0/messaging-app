const express = require("express");
const router = express.Router();
const conversation = require("../controllers/conversationController");

router.get("/conversation/:userId", conversation.get);
router.post("/converation/new/message", conversation.post);

module.exports = router;
