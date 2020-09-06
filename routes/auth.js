const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  validate,
  loginSchema,
  signupSchema,
} = require("../validation/validator");
const User = require("../models/User");

router.post("/signup", async (req, res) => {
  const result = validate(req.body, signupSchema);
  let data = await User.findOne({ email: req.body.email });
  if (data) result.error = "User email already exists";

  if (result.error === "") {
    const user = new User(result.data);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const data = await user.save();
    delete result.data.password;
    const token = jwt.sign(data.toJSON(), process.env.JWTKEY);
    result.token = token;
    result.data = data;
  }

  return res.send(result);
});

router.post("/login", async (req, res) => {
  const result = validate(req.body, loginSchema);
  let data = await User.findOne({ email: req.body.email });
  if (!data) {
    result.error = "User doesnt exists";
  } else {
    const validPassword = await bcrypt.compare(
      req.body.password,
      data.password
    );
    if (!validPassword) result.error = "Invalid password";
    delete result.data.password;
  }

  if (result.error === "") {
    const token = jwt.sign(data.toJSON(), process.env.JWTKEY);
    result.token = token;
  }

  return res.send(result);
});

module.exports = router;
