const { user } = require("../../domain");

const sendSuccess = (res, { _id }) => {
  res.send({
    status: "success",
    user: _id
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
