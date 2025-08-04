const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
  },
  body: {
    type: String,
    required: [true, "Please provide a body"],
  },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
