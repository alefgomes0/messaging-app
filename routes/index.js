const express = require("express");
const router = express.Router();
const passport = require("passport");
const newMessage = require("../controllers/newMessageController");
const profilePicture = require("../controllers/profilePictureController");

const verifyJWT = require("../middleware/verifyJWT");

router.get(
  "/protected",
  /* passport.authenticate("jwt", { session: false }) */ verifyJWT,
  (req, res, next) => {
    res.status(200).json({ success: true, message: "You are authorized" });
  }
);

router.get("/:contactId/messages/new", newMessage.get);

router.get("/profilepicture/:userId", profilePicture.get);
router.post("/upload/:userId", profilePicture.post);

module.exports = router;
