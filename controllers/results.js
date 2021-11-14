// init
const Users = require("../models/Users");
const Questions = require("../models/Questions");
const Answers = require("../models/Answers");
const Result = require("../models/Results");

// POST - Result evaluation
exports.create = async (req, res) => {
  try {
    let { userId, answerIds } = req.body;
    const user = await Users.findById(userId);
    const answers = await Answers.aggregate([
      {
        $match: {
          _id: {
            $in: answerIds,
          },
        },
      },
      // Grouping answers by technology
      {
        $group: {
          _id: "$technology",
          data: {
            $push: "$$ROOT",
          },
        },
      },
    ]);

    // All done
    res.json({
      success: true,
      message: "Result evaluated successfully",
      user,
      answers,
    });
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
