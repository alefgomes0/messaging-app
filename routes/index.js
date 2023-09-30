const express = require("express");
const router = express.Router();
const passport = require("passport");

const verifyJWT = require("../middleware/verifyJWT");

router.get(
  "/protected",
  /* passport.authenticate("jwt", { session: false }) */ verifyJWT,
  (req, res, next) => {
    res.status(200).json({ success: true, message: "You are authorized" });
  }
);

module.exports = router;
