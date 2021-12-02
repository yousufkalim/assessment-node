const Admins = require("./models/Admins.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//signUp
exports.signUp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = Admins.findOne({ email });
    if (user) {
      res.status(400).json({ message: "User already exist" });
    }
    const admin = new Admins({
      name,
      email,
      password,
    });
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(password, salt);
    await admin.save();
    res.json({ message: "Admin registered successfully" });
  } catch (err) {
    console.log("error------>", err);
    res.status(500).send("Something went wrong");
  }
};
// login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = Admins.findOne({ emai });
    if (!user) {
      res.json({ message: "Admin not found" });
    }
    const matchPassword = bcrypt.compare(password, user.password);
    if (!matchPassword) {
      res.status(400).send({ message: "Password is incorrect" });
    }
    jwt.sign(
      user,
      process.env.JSONSECRET,
      { expiresIn: 360000 },
      (err, tokken) => {
        if (err) throw err;
        res.json({ user, tokken });
      }
    );
  } catch (err) {
    console.log("error=======>", err);
    res.status(500).send("Something went wrong");
  }
};
//logout
exports.logout = async (req, res) => {
  res.cookies("tokken", "");
  res.status(200).send({ success: true, message: "logged out successfully" });
};

//successful authentication
exports.confirmAuth = async (req, res) => {
  res.status(200).send({ message: "User Authenticated", user: req.user });
};
