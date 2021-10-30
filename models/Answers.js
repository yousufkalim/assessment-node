const mongoose = require("mongoose");

//making schema
const ans_schema = new mongoose.Schema({
  question: {
    type: Number,
  },
  answer: {
    type: String,
  },
  correct: {
    type: Boolean,
  },
  next_question: {
    type: Number,
  },
});

//export model module.exports = mongoose.model(-,ans_schema);
