const { user } = require("../../domain");

const sendError = (res, { message, field }) => {
  res.status(400).send({
    status: "fail",
    message,
    field
  });
};

const sendSuccess = (res, { _id }) => {
  res.send({
    status: "success",
    user: _id
  });
};

const registerUser = (req, res) => {
  console.log(req.body);
  user
    .register({ ...req.body })
    .then(data => sendSuccess(res, data))
    .catch(error => sendError(res, error));
};

module.exports = registerUser;
