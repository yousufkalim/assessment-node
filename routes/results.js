// Init
const router = require("express").Router();
const { create, getResults } = require("../controllers/results");

// POST - Result evaluation
router.post("/", create);

// Test post via excel files
router.get("/:userId", getResults);
// Export
module.exports = router;
