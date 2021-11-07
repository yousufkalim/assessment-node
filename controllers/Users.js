const users = require("../models/Users.js");
exports.create = async (req, res) => {
  try {
    const user = await users.create(req.body);
    console.log(user);
    res.json({ success: true, message: "USER------->", user });
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
