const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  let token = req.header("Authorization");
  if (!token) res.status(400).send("Unauthorized");
  token = token.substring(7);

  try {
    const decoded = jwt.verify(token, process.env.JWTKEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
}

module.exports = auth;
