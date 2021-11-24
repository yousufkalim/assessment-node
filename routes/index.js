// Init
const router = require("express").Router();

// All the api routes
router.use("/postData", require("./data"));
router.use("/users", require("./users"));
router.use("/results", require("./results"));
router.use("/checkresults", require("./checkresult"));

module.exports = router; //exporting route
