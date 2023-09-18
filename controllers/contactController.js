const asyncHandler = require("express-async-handler")
const User = require("../models/user")

exports.get = asyncHandler(async (req, res, next) => {
  console.log(req.params.userId)
})