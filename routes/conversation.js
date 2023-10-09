const express = require("express");
const router = express.Router();
const conversation = require("../controllers/conversationController");

router.get("/:userId", conversation.get);
router.post("/", conversation.post)
router.put("/new/message", conversation.put);

module.exports = router;
