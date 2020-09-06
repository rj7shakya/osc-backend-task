const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/opensource", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

module.exports = mongoose;
