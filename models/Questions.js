const mongoose = require("mongoose");

// Schema
const ques_schema = new mongoose.Schema(
  {
    question: String,
    question_number: Number,
    difficulty_level: Number,
    category: String,
    first: Boolean,
    facial_expressions: Number,
    technology: {
      type: String,
      enum: [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Node",
        "dotNet",
        "Native",
        "Express",
      ],
    },
  },
  {
    timestamps: true,
  }
);

//export model
module.exports = mongoose.model("questions", ques_schema);
