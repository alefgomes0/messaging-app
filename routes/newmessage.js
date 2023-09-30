const express = require("express");
const router = express.Router();
const newMessage = require("../controllers/newMessageController");

router.get("/:contactId", newMessage.get);


module.exports = router;
