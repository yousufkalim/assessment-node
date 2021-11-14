// Init
const router = require("express").Router();
const user = require("../controllers/users");
const { validateUser, isValidated } = require("../middleware/validator");

// User Registration
router.post("/", validateUser, isValidated, user.create);

// GET - Test route to send dummy answers to evaluate the result
router.get("/test", user.test);

// Export
module.exports = router;
