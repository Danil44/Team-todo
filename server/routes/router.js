const express = require("express");
const app = express.Router();
const verifyToken = require("../middlewares/check-token");
const registerUser = require("../controller/user/register");

app
  .post("/register", registerUser)
  .use(verifyToken)
  .get("/", (req, res) => {
    res.send("Hello world");
  });

module.exports = app;
