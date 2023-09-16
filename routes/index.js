const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const messageController = require("../controllers/messageController")

router.post("/new/user", userController.post)

router.post("/new/message", messageController.post)


module.exports = router;
