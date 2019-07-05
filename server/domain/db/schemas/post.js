const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    desc: String,
    completed: { type: Boolean, required: true },
    created_by: { type: Schema.Types.ObjectId, ref: "User" },
    comments: [{ type: Object }]
  },
  { timestamps: true }
);
