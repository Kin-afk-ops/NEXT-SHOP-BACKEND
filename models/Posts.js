const mongoose = require("mongoose");

const PostsSchema = new mongoose.Schema(
  {
    image: {
      path: {
        type: String,
        required: true,
      },
      publicId: {
        type: String,
        required: true,
      },
    },

    title: {
      type: String,
      required: true,
      unique: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    desc: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    hot: {
      type: Boolean,
      default: false,
    },

    tag: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Posts", PostsSchema);
