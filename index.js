const express = require("express");
const morgan = require("morgan");
const app = express();
const users = require("./routes/users");
const auth = require("./routes/auth");

app.use(express.json());
app.use(morgan("tiny"));
app.use("/v1/users/profile", users);
app.use("/v1/auth/", auth);

app.listen(3000, () => console.log("Port started at 3000"));
