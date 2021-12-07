// init
const router = require("express").Router();
const auth = require("../controllers/auth");

// Test post via excel files
router.post("/signUp", auth.signUp);
router.post("/login", auth.login);

// Export
module.exports = router;
