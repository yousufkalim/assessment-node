const Users = require("../models/Users.js");
const Questions = require("../models/Questions");
const Answers = require("../models/Answers");

exports.create = async (req, res) => {
  try {
    const user = await Users.create(req.body);

    let skills = req.body.skills.split(","); //converting into array of skills obtained from form

    const getData = () => {
      return new Promise((resolve, reject) => {
        const lastIndex = skills.length - 1;

        skills.map(async (skill, index) => {
          try {
            const questions = await Questions.find({
              technology: {
                $in: skill,
              },
            });
            const answers = await Answers.find({
              technology: {
                $in: skill,
              },
            });

            if (index === lastIndex) {
              resolve({ questions, answers });
            }
          } catch (err) {
            reject(err);
          }
        });
      });
    };

    const data = await getData();

    res.json({
      //returning user and test in response
      success: true,
      message: "User added successfully",
      data,
    });
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
