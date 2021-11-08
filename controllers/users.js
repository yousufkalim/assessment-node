const Users = require("../models/Users.js");
exports.create = async (req, res) => {
  try {
    const user = await Users.create(req.body);
    res.json({ success: true, message: "User added successfully", user });
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
