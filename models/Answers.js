const mongoose = require("mongoose");

//making schema
const ans_schema = new mongoose.Schema(
  {
    question: {
      type: Number,
    },
    answer: {
      type: String,
    },
    correct: {
      type: Boolean,
    },
    technology: String,
    next_question: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

//export model
module.exports = mongoose.model("answer", ans_schema);
