const db = require("../db/db");
const mongoose = require("mongoose");

const User = db.model(
  "User",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  })
);

module.exports = User;
