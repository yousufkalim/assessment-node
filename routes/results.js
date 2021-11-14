// Init
const router = require("express").Router();
const { create } = require("../controllers/results");

// POST - Result evaluation
router.post("/", create);

// Export
module.exports = router;
