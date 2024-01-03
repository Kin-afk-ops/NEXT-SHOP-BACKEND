const mongoose = require("mongoose");

const PostContentSchema = new mongoose.Schema(
  {
    postId: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PostContent", PostContentSchema);
