const express = require("express");
const router = express.Router();
const user = require("../controllers/userController");
const message = require("../controllers/messageController");
const conversation = require("../controllers/conversationController");
const teste = require("../controllers/testeController")

router.put("/user", user.update);
router.post("/new/user", user.post);

router.post("/new/message", conversation.post);
router.get("/conversation/:userId", conversation.get)

router.get("/:contactId/messages", teste.get)

module.exports = router;
