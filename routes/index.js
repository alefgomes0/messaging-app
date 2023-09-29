const express = require("express");
const router = express.Router();
const passport = require("passport")
const user = require("../controllers/userController");
const message = require("../controllers/messageController");
const newMessage = require("../controllers/newMessageController");
const conversation = require("../controllers/conversationController");
const profilePicture = require("../controllers/profilePictureController");
const login = require("../controllers/logInController")
const register = require("../controllers/registerController")
const verifyJWT = require("../middleware/verifyJWT")

router.post("/login", login.post)
router.post("/register", register.post)
router.get("/protected", /* passport.authenticate("jwt", { session: false }) */ verifyJWT, (req, res, next) => {
  res.status(200).json({ success: true, message: "You are authorized" })
})

router.put("/user", user.update);
router.post("/new/user", user.post);

router.post("/new/message", conversation.post);
router.get("/conversation/:userId", conversation.get);

router.get("/:contactId/messages", message.get);
router.post("/:contactId/messages", message.post, conversation.post);

router.get("/:contactId/messages/new", newMessage.get);

router.get("/profilepicture/:userId", profilePicture.get)
router.post("/upload/:userId", profilePicture.post);

module.exports = router;
