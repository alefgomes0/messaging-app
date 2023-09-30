const verifyRoles = (userInfo) => {
  return (req, res, next) => {
    if (!userInfo.isAdmin) return res.sendStatus(401)
    next()
  }
}

module.exports = verifyRoles