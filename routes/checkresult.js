const router = require("express").Router();
const { checkresults } = require("../controllers/results");

// Test post via excel files
router.get("/:checkresult", checkresults);

// Export
module.exports = router;
