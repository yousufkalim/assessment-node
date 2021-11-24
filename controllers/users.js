// Init
const Users = require("../models/Users.js");
const Questions = require("../models/Questions");
const Answers = require("../models/Answers");

// POST - User
exports.create = async (req, res) => {
  try {
    let skills = req.body.skills.split(", "); //converting into array of skills obtained from form

    // Creating user in db
    let user = await Users.create({ ...req.body, skills });

    // Aggregation to find questions by skill
    const questions = await Questions.aggregate([
      // Finding all the questions according to the skills
      {
        $match: {
          technology: {
            $in: skills,
          },
        },
      },
      // Grouping questions by technology
      {
        $group: {
          _id: "$technology",
          data: {
            $push: "$$ROOT",
          },
        },
      },
      // Creating an order key to custom sort
      {
        $project: {
          _id: 1,
          data: 1,
          order: {
            $cond: {
              if: { $eq: ["$_id", "HTML"] },
              then: 1,
              else: {
                $cond: {
                  if: { $eq: ["$_id", "CSS"] },
                  then: 2,
                  else: {
                    $cond: {
                      if: { $eq: ["$_id", "JavaScript"] },
                      then: 3,
                      else: {
                        $cond: {
                          if: { $eq: ["$_id", "React"] },
                          then: 4,
                          else: {
                            $cond: {
                              if: { $eq: ["$_id", "Native"] },
                              then: 5,
                              else: {
                                $cond: {
                                  if: { $eq: ["$_id", "Node"] },
                                  then: 6,
                                  else: {
                                    $cond: {
                                      if: { $eq: ["$_id", "Express"] },
                                      then: 7,
                                      else: 8,
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      // Sorting questions by order
      { $sort: { order: 1 } },
      // Removing the order key because now we don't need
      { $project: { _id: 1, data: 1 } },
    ]);

    // Aggregation to find answers by skill
    const answers = await Answers.aggregate([
      // Finding all the answers according to the skills
      {
        $match: {
          technology: {
            $in: skills,
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
      // Creating an order key to custom sort
      {
        $project: {
          _id: 1,
          data: 1,
          order: {
            $cond: {
              if: { $eq: ["$_id", "HTML"] },
              then: 1,
              else: {
                $cond: {
                  if: { $eq: ["$_id", "CSS"] },
                  then: 2,
                  else: {
                    $cond: {
                      if: { $eq: ["$_id", "JavaScript"] },
                      then: 3,
                      else: {
                        $cond: {
                          if: { $eq: ["$_id", "React"] },
                          then: 4,
                          else: {
                            $cond: {
                              if: { $eq: ["$_id", "Native"] },
                              then: 5,
                              else: {
                                $cond: {
                                  if: { $eq: ["$_id", "Node"] },
                                  then: 6,
                                  else: {
                                    $cond: {
                                      if: { $eq: ["$_id", "Express"] },
                                      then: 7,
                                      else: 8,
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      // Sorting answers by order
      { $sort: { order: 1 } },
      // Removing the order key because now we don't need
      { $project: { _id: 1, data: 1 } },
    ]);

    // All done :)
    res.json({
      success: true,
      message: "User added successfully",
      user,
      questions,
      answers,
    });
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// GET - Test controller to send dummy answers to evaluate the result
exports.test = async (req, res) => {
  try {
    // Finding one user
    const user = await Users.findOne();

    // Finding answers from HTML and grouping by it's question
    const answers = await Answers.aggregate([
      {
        $match: {
          technology: "HTML",
        },
      },
      // Grouping answers by question
      {
        $group: {
          _id: "$question",
          data: {
            $push: "$$ROOT",
          },
        },
      },
    ]);

    let answerIds = new Array(); // Initializing array to store ids

    // Mapping through all the answers to pick only one answer id from one group
    answers.map((answerSet) => {
      answerIds.push(answerSet.data[Math.round(Math.random())]._id);
    });

    // All done
    res.json({
      success: true,
      message: "Test completed successfully",
      userId: user._id,
      answerIds,
    });
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
