const express = require("express");
const router = express.Router();
const {
  validate,
  loginSchema,
  signupSchema,
} = require("../validation/validator");

router.post("/signup", (req, res) => {
  const result = validate(req.body, signupSchema);
  return res.send(result);
});

router.post("/login", (req, res) => {
  const result = validate(req.body, loginSchema);
  return res.send(result);
});

module.exports = router;
