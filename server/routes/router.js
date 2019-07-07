const express = require("express");
const app = express.Router();
const verifyToken = require("../middlewares/check-token");
const registerUser = require("../controller/user/register");
const loginUser = require("../controller/user/login");
const createPost = require("../controller/post/create");
const deletePost = require("../controller/post/delete");

app
  .post("/user/register", registerUser)
  .post("/user/login", loginUser)

  .use(verifyToken)

  .get("/", (req, res) => {
    res.send("Hello world");
  })
  .post("/posts", createPost)
  .delete("/posts/:id", deletePost);
// .put("/posts/:id", updatePost);

module.exports = app;
