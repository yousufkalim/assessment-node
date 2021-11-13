// Init
const express = require("express");
const router = express.Router();

// All the api routes
router.use("/postData", require("./data"));
router.use("/users", require("./users"));

module.exports = router; //exporting route
