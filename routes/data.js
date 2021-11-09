const router = require("express").Router();

const excel_reader = require("../utils/excelReader");

const test = require("../controllers/test");

router.post("/:technology", excel_reader.readData);
router.get("/:technology", test.getQuestions);
router.get("/:technology", test.getAnswers);

module.exports = router;
