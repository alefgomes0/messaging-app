const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization
  console.log(req.headers)
  console.log(authHeader)
  if (!authHeader?.startsWith("Bearer ")) {
    console.log("fidojpdasdjspsdfjoppdjosjofdspjopfs")
    return res.sendStatus(401);
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ success: false, message: err });
    req.user = decoded.id;
    next();
  });
};

module.exports = verifyJWT;
