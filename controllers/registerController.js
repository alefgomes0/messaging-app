const utils = require("../lib/passwordUtils");
const User = require("../models/user");

exports.post = async (req, res, next) => {
  const saltHash = utils.genPassword(req.body.password);
  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new User({
    email: req.body.email,
    name: req.body.name,
    hash,
    salt,
  });

  newUser.save()
    .then((user) => {
      const jwt = utils.issueJWT(user)
      console.log("user registered")
      res.json({ success: true, user: user, token: jwt.token, expiresIn: jwt.expires })
    })
    .catch(err => next(err))


};
