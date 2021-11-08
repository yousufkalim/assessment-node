const excel = require("read-excel-file/node");
const Questions = require("../models/Questions.js");
const Answers = require("../models/Answers.js");

exports.readData = async (req, res) => {
  try {
    const rows = await excel(`./uploads/${req.params.technology}.xlsx`);
    const last_index = rows.length - 1;
    let questions = [];
    let answers = [];
    rows.map(async (row, index) => {
      const question = {
        question: row[0],
        question_number: index + 1,
        difficulty_level: 1,
        technology: req.params.technology,
        first: index == 0,
        facial_expressions: 1,
      };
      questions.push(question);
      const answer = [
        {
          question: index + 1,
          answer: row[1],
          correct: true,
          technology: req.params.technology,
          next_question: index == last_index ? null : index + 2,
        },
        {
          question: index + 1,
          answer: row[2],
          correct: false,
          technology: req.params.technology,
          next_question: index == last_index ? null : index + 2,
        },
      ];
      if (row[3] && row[4]) {
        answer.push(
          {
            question: index + 1,
            answer: row[3],
            correct: false,
            technology: req.params.technology,
            next_question: index == last_index ? null : index + 2,
          },
          {
            question: index + 1,
            answer: row[4],
            correct: false,
            technology: req.params.technology,
            next_question: index == last_index ? null : index + 2,
          }
        );
      }
      answers.push(...answer);
    });
    const quez = await Questions.insertMany(questions);
    const ans = await Answers.insertMany(answers);
    res.json({ success: true, quez, ans });
  } catch (err) {
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
