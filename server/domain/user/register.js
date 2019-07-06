const User = require("../../domain/db/schemas/user");
const bcrypt = require("bcrypt");
const { userCore } = require("../../core/index");

const getErrorInfo = error => ({
  message: error.details[0].message,
  field: error.details[0].path[0]
});

const registerUser = data =>
  new Promise((res, rej) => {
    const { error } = userCore.registerValidation(data);
    const isEmailExists = User.findOne({ email: data.email });

    if (error) return rej(getErrorInfo(error));

    return isEmailExists.then(data => {
      if (data) {
        return rej({ message: "Email is already exists" });
      }

      const hash = bcrypt.hashSync(data.password, 12);
      const user = new User({ ...data, hash });

      user
        .save()
        .then(user => User.findOne({ _id: user._id }))
        .then(user => res(user))
        .catch(err => rej(err));
    });
  });

module.exports = registerUser;
