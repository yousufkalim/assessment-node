// Init
const router = require("express").Router();
const user = require("../controllers/users");
const {
  validateInitialUser,
  validateUser,
  isValidated,
} = require("../middleware/validator");
const { checkAdminAuth } = require("../middleware/adminAuth");

// User Registration
router.post("/", checkAdminAuth, validateInitialUser, isValidated, user.create);
router.put("/", validateUser, isValidated, user.update);

// GET - Test route to send dummy answers to evaluate the result
router.get("/test", user.test);

//get Allusers
router.get("/", checkAdminAuth, user.getUsers);

//get userbyid
router.get("/:id", user.getUserById);

// DELETE - User
router.delete("/:id", checkAdminAuth, user.delete);

// Export
module.exports = router;
