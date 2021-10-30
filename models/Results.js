const mongoose = require("mongoose");

// Schema
const result_schema = new mongoose.schema(
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
    rank: {
      type: string,
    },
  },
  {
    timestamps: true,
  }
);

//export model
module.exports = mongoose.model("results", result_schema);
