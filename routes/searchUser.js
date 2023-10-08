const express = require("express");
const router = express.Router();
const searchUser = require("../controllers/searchUserController")

router.get("/?", searchUser.get);

module.exports = router;
