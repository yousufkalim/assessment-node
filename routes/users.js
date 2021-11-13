// Init
const router = require("express").Router();
const user = require("../controllers/users");
const { validateUser, isValidated } = require("../middleware/validator");

// User Registration
router.post("/", validateUser, isValidated, user.create);

// Export
module.exports = router;
