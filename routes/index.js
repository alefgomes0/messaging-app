const express = require("express");
const router = express.Router();
const user = require("../controllers/userController");
const message = require("../controllers/messageController");
const contact = require("../controllers/contactController");

router.put("/user", user.update);
router.post("/new/user", user.post);

router.post("/new/message", message.post);
router.get("/contacts/:userId", contact.get)

module.exports = router;
