const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../db/schemas/user");
const { userCore } = require("../../core");

const getErrorInfo = error => ({
  message: error.details[0].message,
  field: error.details[0].path[0]
});

const loginUser = data =>
  new Promise((res, rej) => {
    const { error } = userCore.loginValidation(data);

    if (error) return rej(getErrorInfo(error));

    return User.findOne({ email: data.email })
      .select("hash")
      .then(user => {
        if (!user) return rej({ message: "Email or password is incorrect" });

        const isPassValid = bcrypt.compareSync(data.password, user.hash);

        if (!isPassValid) {
          return rej({ message: "Email or password is incorrect" });
        }

        const token = jwt.sign({ _id: user._id }, app.get("superSecret"), {
          expiresIn: "24h"
        });

        res({ token });
      });
  });

module.exports = loginUser;
