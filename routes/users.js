// Init
const router = require("express").Router();
const user = require("../controllers/users");
const { validateUser, isValidated } = require("../middleware/validator");

// User Registration
router.post("/", user.create);
router.put("/", validateUser, isValidated, user.update);

// GET - Test route to send dummy answers to evaluate the result
router.get("/test", user.test);

//get Allusers
router.get("/", user.getUsers);

//get userbyid
router.get("/:id", user.getUserById);
// Export
module.exports = router;
