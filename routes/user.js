const express = require("express");
const router = express.Router();
const user = require("../controllers/userController");

router.put("/user", user.update);
router.post("/user/new", user.post);

module.exports = router;
