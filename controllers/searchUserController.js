const User = require("../models/user");

exports.get = async (req, res, next) => {
  const userId = req.body.userId;
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  try {
    const foundUsers = await User.find(keyword, "name email").find({ _id: { $ne: userId } });
    res.status(200).json({
      success: true,
      foundUsers,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
