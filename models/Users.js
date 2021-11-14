const mongoose = require("mongoose");

// Schema
const user_schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
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
      enum: ["single", "married", "divorced", "widowed"],
    },
    role: {
      type: String,
      required: true,
    },
    skills: {
      type: Array,
      required: true,
    },
    sect: {
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
      required: true,
    },
    vacancy_source: String,
    current_employer: String,
    current_salary: Number,
    expected_salary: Number,
    leaving_reason: String,
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
