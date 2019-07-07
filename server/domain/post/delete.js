const Post = require("../db/schemas/post");
const User = require("../db/schemas/user");
const jwt = require("jsonwebtoken");

const deletePost = (token, id) =>
  new Promise((res, rej) => {
    const userId = jwt.decode(token)._id;

    User.findOne({ _id: userId }, (err, user) => {
      if (err) rej(err);

      //remove post from User posts
      const clearedPosts = user.posts.filter(post => post.toString() !== id);

      user.posts = clearedPosts;

      user.save();
    });

    Post.deleteOne({ _id: id })
      .then(post => res(post))
      .catch(err => rej(err));
  });

module.exports = deletePost;
