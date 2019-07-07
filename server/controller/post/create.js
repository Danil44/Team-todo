const { post } = require("../../domain");

const sendSuccess = (res, data) => {
  res.json({
    status: "success",
    post: data
  });
};

const sendError = (res, error) => {
  res.status(403).json({
    status: "fail",
    error
  });
};

const createPost = (req, res) => {
  post
    .create(req.headers["x-access-token"], { ...req.body })
    .then(data => sendSuccess(res, data))
    .catch(err => sendError(res, err));
};

module.exports = createPost;
