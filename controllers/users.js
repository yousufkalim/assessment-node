// Init
const Users = require("../models/Users.js");
const Questions = require("../models/Questions");
const Answers = require("../models/Answers");
const Results = require("../models/Results");

// POST - Create user by HR
exports.create = async (req, res) => {
  try {
    let { email } = req.body;

    // Checking for existing user
    let existingUser = await Users.findOne({ email });

    if (existingUser) {
      // If we found a user then we have to set its test_conducted to false
      existingUser.test_conducted = false;
      await Users.findByIdAndUpdate(existingUser._id, {
        ...req.body,
        test_conducted: false,
      });

      // Done
      return res.json({
        success: true,
        message: "Candidate added successfully!",
      });
    }

    // Creating a user with email
    await Users.create(req.body);

    // Done
    res.json({ success: true, message: "Candidate added successfully!" });
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Update - User
exports.update = async (req, res) => {
  try {
    delete req.body.skills;

    // Updating the user in db
    let user = await Users.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found with this email!" });
    } else if (user.test_conducted) {
      return res
        .status(403)
        .json({ success: false, message: "You cannot perform the test again" });
    }

    await Users.findByIdAndUpdate(user._id, req.body);

    // Aggregation to find questions by skill
    const questions = await Questions.aggregate([
      // Finding all the questions according to the skills
      {
        $match: {
          technology: {
            $in: user.skills,
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
                              if: { $eq: ["$_id", "RN"] },
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
            $in: user.skills,
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
                              if: { $eq: ["$_id", "RN"] },
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

//GET- All users
exports.getUsers = async (req, res) => {
  try {
    const users = await Users.find().sort({ updatedAt: -1 });
    res.json({
      success: true,
      message: "Users getting successfully",
      users,
    });
  } catch (err) {
    console.log("ERROR------>", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//GET- User by ID
exports.getUserById = async (req, res) => {
  try {
    let user = await Users.findOne({ _id: req.params.id });

    res.json({
      success: true,
      message: "APIIIIII BEING USED successfully",
      user,
    });
  } catch (err) {
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

// DELETE - USER
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    await Users.findByIdAndDelete(id);
    await Results.findOneAndDelete({ user: id });

    res.json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
