const { user } = require("../../domain");

const registerUser = (req, res) => {
  user
    .register({ ...req.body })
    .then(data => res.send(data))
    .catch(err => console.log(err));
};

module.exports = registerUser;
