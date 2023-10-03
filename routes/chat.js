const express = require("express");
const router = express.Router();
const chat = require("../controllers/chatController");

router.get("/:userId", chat.get);
router.post("/new/message", chat.post);

module.exports = router;
