const router = require("express").Router();

const user = require("../controllers/Users");

const { validateUser, isValidated } = require("../middlewares/validator");

router.post("/", validateUser, isValidated, user.create);

module.exports = router;
