const mongoose = require("mongoose");

// questionnaire schema
const questionnaireSchema = new mongoose.Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "questions",
  },
  answer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "answers",
  },
  technology: String,
});

// Result by technology schema
const resultByTechSchema = new mongoose.Schema({
  technology: String,
  total: Number,
  correct: Number,
  wrong: Number,
  percentage: Number,
  rank: Number,
});

// Result Schema
const result_schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    questionnaire: [questionnaireSchema],
    technologies: String,
    total: Number,
    total_correct: Number,
    total_wrong: Number,
    overall_percentage: Number,
    overall_rank: Number,
    result_by_tech: [resultByTechSchema],
  },
  {
    timestamps: true,
  }
);

//export model
module.exports = mongoose.model("results", result_schema);
