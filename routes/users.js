const router = require("express").Router();

const user = require("../controllers/users");

const { validateUser, isValidated } = require("../middlewares/validator");

router.post("/", validateUser, isValidated, user.create);

module.exports = router;
