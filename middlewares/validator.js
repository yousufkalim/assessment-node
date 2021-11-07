const { check, validationResult } = require("express-validator");

exports.validateUser = [
  check("name", "name is required.").notEmpty().trim(),
  check("email", "email is required").notEmpty().isEmail().trim(),
  check("date of birth", "date of birth is required").notEmpty().isDate(),
  check("contact no", "contact number is required")
    .notEmpty()
    .isNumeric()
    .trim(),
  check("marital status", "Show you marrital status").notEmpty().trim(),
  check("post", "mention your post").notEmpty().trim(),
  check("skills", "mention your skills").notEmpty().trim(),
  check("sect", "mention your sect").notEmpty().trim(),
  check("vacancy_source", "How did you haer about this job?").notEmpty().trim(),
  check("total_experience", "your total experience is required")
    .notEmpty()
    .trim(),
  check("post_experience", "your post experience is required")
    .notEmpty()
    .trim(),
  check("joining_time", "Mention your expected time to join").notEmpty().trim(),
  check("current_employer", "Mention your current employer").notEmpty().trim(),
  check("current_salary", "Mention your current salary").notEmpty().trim(),
  check("expected_salary", "Mention your salary expectations")
    .notEmpty()
    .trim(),
  // check("leaving_reason","Mention the reason to leave your current job").notEmpty.trim(),
];
exports.isValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({ success: false, message: errors.array()[0] });
  } else {
    next();
  }
};
