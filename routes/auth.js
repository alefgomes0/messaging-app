const express = require('express');
const router = express.Router();
const login = require("../controllers/logInController");
const register = require("../controllers/registerController");


router.post("/login", login.post);

module.exports = router;