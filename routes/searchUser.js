const express = require("express");
const router = express.Router();
const searchUser = require("../controllers/searchUserController")

router.post("/?", searchUser.post);

module.exports = router;
