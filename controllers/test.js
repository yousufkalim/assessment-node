const Questions = require("../models/Questions.js");
const Answers = require("../models/Answers.js");

exports.getQuestions = async (req, res) => {
  try {
    const quesTech = await Questions.find({
      technology: {
        $in: req.params.skills,
      },
    });
    res.json({ success: true, quesTech }); // Success
  } catch (err) {
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
exports.getAnswers = async (req, res) => {
  try {
    const ansTech = await Answers.find(req.params.technology);
    res.json({ success: true, ansTech }); // Success
  } catch (err) {
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
