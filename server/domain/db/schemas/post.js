const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    desc: String,
    group: { type: Schema.Types.ObjectId, ref: "Group" },
    completed: { type: Boolean, required: true, default: false },
    created_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
    comments: [{ type: Object }]
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
