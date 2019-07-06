const User = require("../../domain/db/schemas/user");
const bcrypt = require("bcrypt");
const { userCore } = require("../../core/index");

const getErrorInfo = error => ({
  message: error.details[0].message,
  field: error.details[0].path[0]
});

const registerUser = userParams =>
  new Promise((res, rej) => {
    const { error } = userCore.registerValidation(userParams);
    const isEmailExists = User.findOne({ email: userParams.email });

    if (error) return rej(getErrorInfo(error));

    return isEmailExists.then(response => {
      if (response) {
        return rej({ message: "Email is already exists" });
      }

      const hash = bcrypt.hashSync(userParams.password, 12);
      const user = new User({ ...userParams, hash });

      user
        .save()
        .then(user => User.findOne({ _id: user._id }))
        .then(user => res(user))
        .catch(err => rej(err));
    });
  });

module.exports = registerUser;
