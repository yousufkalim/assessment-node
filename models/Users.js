const mongoose = require("mongoose");

// Schema
const user_schema = new mongoose.Schema(
  {
    name: String,
    dob: String,
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    contact_no: {
      type: String,
      minlength: 8,
    },
    marital_status: {
      type: String,
      enum: ["single", "married", "divorced", "widower"],
    },
    department: {
      type: String,
      enum: ["MERN", "RN", "dotNET"],
    },
    post: String,
    address: String,
    skills: {
      type: Array,
      required: true,
    },
    sect: String,
    total_experience: String,
    post_experience: String,
    joining_time: String,
    test_conducted: {
      type: Boolean,
      default: false,
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
