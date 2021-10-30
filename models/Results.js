const mongoose = require("mongoose");
const result_schema = new mongoose.schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
    answers: [
      {
        type: Schema.Types.ObjectId,
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
module.exports = mongoose.model("results", result_schema);
