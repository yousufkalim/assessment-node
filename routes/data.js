// init
const router = require("express").Router();
const excel_reader = require("../utils/excelReader");

// Test post via excel files
router.post("/:technology", excel_reader.readData);

// Export
module.exports = router;
