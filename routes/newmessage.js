const express = require("express");
const router = express.Router();
const newMessage = require("../controllers/newMessageController");

router.get("/newmessage/:contactId", newMessage.get);


module.exports = router;
