const { query } = require("express-validator");
const User = require("../models/user");

exports.post = [
  query("q").escape().trim(),

  async (req, res, next) => {
    if (!req.query.q)
      return res.status(204).json({
        success: true,
        message: "No users searched",
      });

    try {
      const users = await User.find(
        {
          $or: [
            { name: { $regex: req.query.q, $options: "i" } },
            { email: { $regex: req.query.q, $options: "i" } },
          ],
        },
        "name email profilePicture"
      ).find({ _id: { $ne: req.body.userId } });

      return res.status(200).json({
        success: true,
        message: "Found users",
        users,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },
];
