const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { validate, updateSchema } = require("../validation/validator");
const User = require("../models/User");

router.get("/", auth, async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).select(
    "-password"
  );
  return res.send(user);
});

router.patch("/", auth, async (req, res) => {
  const result = validate(req.body, updateSchema);
  if (result.error === "") {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        ...req.body,
      },
      { new: true }
    );
    result.data = user;
  }

  return res.send(result);
});

module.exports = router;
