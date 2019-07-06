const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "username can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, "username is invalid"],
      lowercase: true,
      trim: true
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, "email is invalid"]
    },
    hash: { type: String, required: true, select: false },
    image: String
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
