const express = require("express");
const router = express.Router();
const profilePicture = require("../controllers/profilePictureController");

router.get("/:userId", profilePicture.get);
router.post("/:userId", profilePicture.post);

module.exports = router;
