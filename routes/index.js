const express = require("express");
const router = express.Router();

//add parent route
router.use("/postData", require("./data"));
router.use("/users", require("./users"));

module.exports = router; //exporting route
