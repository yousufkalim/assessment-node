const router = require("express").Router();

const excel_reader = require("../utils/excelReader");

router.post("/:technology", excel_reader.readData);

module.exports = router;
