const mongoose = require("mongoose");

// Schema
const user_schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    contact_no: {
      type: String,
      required: true,
      minlength: 8,
    },
    marital_status: {
      type: String,
      required: true,
    },
    post: {
      type: String,
      required: true,
    },
    skill: {
      type: String,
      required: true,
    },

    sect: {
      type: String,
      required: true,
    },
    vacancy_source: {
      type: String,
      required: true,
    },
    total_experience: {
      type: String,
      required: true,
    },
    post_experience: {
      type: String,
      required: true,
    },
    joining_time: {
      type: String,
    },
    current_employer: {
      type: String,
      required: true,
    },
    current_salary: {
      type: Number,
      required: true,
    },
    expected_salary: {
      type: Number,
      required: true,
    },
    leaving_reason: {
      type: String,
    },
    result: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "results",
    },
  },
  {
    timestamps: true,
  }
);

//export model
module.exports = mongoose.model("users", user_schema);
