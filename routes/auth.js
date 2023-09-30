const express = require('express');
const router = express.Router();
const login = require("../controllers/logInController");


router.post("/", login.post);

module.exports = router;