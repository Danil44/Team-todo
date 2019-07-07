const Post = require("../db/schemas/post");
const User = require("../db/schemas/user");
const jwt = require("jsonwebtoken");

const createPost = (token, data) =>
  new Promise((res, rej) => {
    const userId = jwt.decode(token)._id;

    User.findById(userId, (err, user) => {
      if (err) rej(err);
      const post = {
        ...data,
        created_by: userId
      };

      Post.create(post, (err, post) => {
        if (err) rej(err);

        user.posts.push(post);

        user.save();

        Post.findById(post._id)
          .populate("created_by")
          .exec((err, post) => {
            if (err) rej(err);

            res(post);
          });
      });
    });
  });

module.exports = createPost;
