const express = require("express");
const router = express.Router();
const profilePicture = require("../controllers/profilePictureController");
const verifyJWT = require("../middleware/verifyJWT");

router.get("/:userId", profilePicture.get);
router.post("/:userId", verifyJWT, profilePicture.post);

module.exports = router;
