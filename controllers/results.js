// init
const mongoose = require("mongoose");
const Users = require("../models/Users");
const Answers = require("../models/Answers");
const Result = require("../models/Results");

// POST - Result evaluation
exports.create = async (req, res) => {
  try {
    // Getting user id and all answers id's from body
    let { userId, answerIds } = req.body;
    answerIds = answerIds.map((id) => mongoose.Types.ObjectId(id)); // Converting string id to objectId in order to find by aggregation

    const user = await Users.findById(userId); // Finding the user

    // Finding all answers by answers id's we got from user
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

    // Initializing some blank variables to update later
    let result_by_tech = new Array();
    let technologies = new Array();
    let total = 0;
    let total_correct = 0;
    let total_wrong = 0;

    // Mapping through all the technologies to evaluate each tech's result
    answers.map((technology) => {
      // Initializing local result object to store this particular tech's result
      let result = new Object();

      // Updating technologies in our local and global object
      result.technology = technology._id; // Local
      technologies.push(technology._id); // Global

      // Updating total questions length in our local and global object
      result.total = technology.data.length; // Local
      total += technology.data.length; // Global

      // Filtering correct and wrong answers
      const correctAnswers = technology.data.filter((a) => a.correct === true);
      const wrongAnswers = technology.data.filter((a) => a.correct === false);

      // Updating correct and wrong answer's length in our local and global object
      result.correct = correctAnswers.length; // Local
      total_correct += correctAnswers.length; // Global
      result.wrong = wrongAnswers.length; // Local
      total_wrong += wrongAnswers.length; // Global

      // Finding percentage and rank for this particular technology
      result.percentage = parseInt((result.correct / result.total) * 100); // Percentage
      result.rank = parseFloat(
        String(result.percentage).substring(0, 2).split("").join(".") // Rank
      );

      // Pushing the result for this particular technology
      result_by_tech.push(result);
    });

    // Finding percentage and rank for all technologies
    let overall_percentage = parseInt((total_correct / total) * 100);
    let overall_rank = parseFloat(
      String(overall_percentage).substring(0, 2).split("").join(".")
    );

    // Aggregation to combine question and user answer in order to show question and it's answer in admin panel
    const questionnaire = await Answers.aggregate([
      // Finding answers by answer id's provided by user
      {
        $match: {
          _id: {
            $in: answerIds,
          },
        },
      },
      // Finding questions against the answers we found
      // We will find question by matching question_number and technology
      {
        $lookup: {
          from: "questions",
          let: {
            number: "$question",
            technology: "$technology",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ["$question_number", "$$number"],
                    },
                    {
                      $eq: ["$technology", "$$technology"],
                    },
                  ],
                },
              },
            },
          ],
          as: "result",
        },
      },
      // Deleting all the other fields expect question id, answer id and technology
      {
        $project: {
          _id: 0,
          question: { $arrayElemAt: ["$result._id", 0] },
          answer: "$_id",
          technology: 1,
        },
      },
    ]);

    // Posting result in DB
    const result = await Result.create({
      user: user._id,
      technologies: technologies.join(", "),
      total,
      total_correct,
      total_wrong,
      overall_percentage,
      overall_rank,
      result_by_tech,
      questionnaire,
    });

    // All done
    res.json({
      success: true,
      message: "Result evaluated successfully",
      result,
    });
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
exports.checkresults = async (req, res) => {
  try {
    const user = await Users.findOne();
    res.json({
      email: user.email,
      success: true,
      message: "APIIIIII BEING USED successfully",
      result,
    });
  } catch (err) {
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
