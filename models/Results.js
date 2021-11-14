const mongoose = require("mongoose");

// Schema
const result_schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    answers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "answers",
      },
    ],
    rank: String,
  },
  {
    timestamps: true,
  }
);

//export model
module.exports = mongoose.model("results", result_schema);
