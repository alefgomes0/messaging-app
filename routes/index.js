const express = require("express");
const router = express.Router();
const user = require("../controllers/userController");
const message = require("../controllers/messageController");
const conversation = require("../controllers/conversationController");

router.put("/user", user.update);
router.post("/new/user", user.post);

router.post("/new/message", conversation.post);
router.get("/conversation/:userId", conversation.get);

router.get("/:contactId/messages", message.get);
router.post("/:contactId/messages", message.post, conversation.post);

module.exports = router;
