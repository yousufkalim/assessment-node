const mongoose = require("mongoose");

//making schema
const ans_schema = new mongoose.Schema(
  {
    question: Number,
    answer: String,
    correct: Boolean,
    next_question: Number,
    technology: {
      type: String,
      enum: [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Node",
        "dotNET",
        "RN",
        "Express",
      ],
    },
  },
  {
    timestamps: true,
  }
);

//export model
module.exports = mongoose.model("answers", ans_schema);
