const { user } = require("../../domain");

const sendSuccess = (res, { token }) => {
  res.header("x-access-token", token).send({
    status: "success",
    user: token
  });
};

const sendError = (res, { message, field }) => {
  res.status(400).send({
    status: "fail",
    message,
    field
  });
};

const loginUser = (req, res) => {
  user
    .login({ ...req.body })
    .then(data => sendSuccess(res, data))
    .catch(error => sendError(res, error));
};

module.exports = loginUser;
