// init
const { check, validationResult } = require("express-validator");

// Schema to validate user
exports.validateUser = [
  check("name", "Name is required.").notEmpty().trim(),
  check("dob", "Date of birth is required").notEmpty(),
  check("email", "A valid email is required")
    .notEmpty()
    .isEmail()
    .trim()
    .toLowerCase(),
  check("contact_no", "Contact number is required")
    .notEmpty()
    .isNumeric()
    .trim(),
  check("marital_status", "Marital status is required").notEmpty().trim(),
  check("post", "Mention your post").notEmpty().trim(),
  // check("skills", "Mention your skills").notEmpty().trim(),
  check("sect", "Mention your sect").notEmpty().trim(),
  check("total_experience", "Your total experience is required")
    .notEmpty()
    .trim(),
  check("post_experience", "Your post experience is required")
    .notEmpty()
    .trim(),
  check("joining_time").notEmpty().trim(),
  check("vacancy_source").trim(),
  check("current_employer").trim(),
  check("current_salary").trim(),
  check("expected_salary").trim(),
  check("leaving_reason").trim(),
];

// Checking if req is validated or not
exports.isValidated = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors.array());
  if (!errors.isEmpty()) {
    res.status(400).send({ success: false, message: errors.array()[0] });
  } else {
    next();
  }
};
