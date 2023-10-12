const Conversation = require("../models/conversations");

exports.put = async (req, res, next) => {
  try {
    await Conversation.findByIdAndUpdate(
      req.body.conversationId,
      {
        $set: {
          newMessage: {
            read: true,
          },
        },
      }
    );
    
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAA")
    res.json("end");
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
