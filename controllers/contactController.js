const asyncHandler = require("express-async-handler")
const User = require("../models/user")

exports.get = asyncHandler(async (req, res, next) => {
  const userContacts = await User.findById({ _id: req.params.userId })
  console.log(userContacts)
})