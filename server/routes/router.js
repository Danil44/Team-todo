const express = require("express");
const app = express.Router();
const verifyToken = require("../middlewares/check-token");
const registerUser = require("../controller/user/register");
const loginUser = require("../controller/user/login");

app
  .post("/user/register", registerUser)
  .post("/user/login", loginUser)
  .use(verifyToken)
  .get("/", (req, res) => {
    res.send("Hello world");
  });

module.exports = app;
