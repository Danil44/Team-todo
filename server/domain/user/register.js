const User = require("../../domain/db/schemas/user");
const bcrypt = require("bcrypt");

const registerUser = data =>
  new Promise((res, rej) => {
    const hash = bcrypt.hashSync(data.hash, 12);
    const user = new User({ ...data, hash });

    return user
      .save()
      .then(user => User.findOne({ _id: user._id }))
      .then(user => res(user))
      .catch(err => rej(err));
  });

module.exports = registerUser;
