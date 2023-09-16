const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");

exports.post = asyncHandler(async (req, res, next) => {
  const newUser = new User({
    email: "teste@email.com",
    password: 123,
    name: "Teste",
  });

  const newUser2 = new User({
    email: "testando@email.com",
    password: 321,
    name: "Testando",
    contacts: []
  });

  await Promise.all([newUser.save(), newUser2.save()]);
  res.json("saved");
});
