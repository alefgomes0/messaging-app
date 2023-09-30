const express = require("express");
const router = express.Router();
const user = require("../controllers/userController");

router.put("/", user.update);
router.post("/new", user.post);

module.exports = router;
