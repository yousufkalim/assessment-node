const mongoose = require("mongoose");
const ques_schema = new mongoose.Schema(
  {
    question: {
      type: String,
    },
    difficulty_level: {
      type: Number,
    },
    category: {
      type: String,
    },
    technology: {
      type: String,

      enums: [
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
    first: {
      type: Boolean,
    },
    facial_expressions: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

//export model module.exports = mongoose.model(-,question_schema);
