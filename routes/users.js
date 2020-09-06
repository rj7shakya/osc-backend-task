const express = require("express");
const router = express.Router();
const { validate, updateSchema } = require("../validation/validator");

router.get("/", (req, res) => {
  return res.send("this is profile");
});

router.patch("/", (req, res) => {
  const result = validate(req.body, updateSchema);
  return res.send(result);
});

module.exports = router;
