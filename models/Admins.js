const mongoose = require("mongoose");

//making schema
const admin_schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

//export model
module.exports = mongoose.model("admins", admin_schema);
