const express = require('express');
const router = express.Router();
const login = require("../controllers/logInController");
const register = require("../controllers/registerController");


router.post("/", register.post);

module.exports = router;