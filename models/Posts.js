const mongoose = require("mongoose");

const PostsSchema = new mongoose.Schema(
  {
    staffId: {
      type: String,
      required: true,
    },
    auth: {
      type: String,
    },
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

    hot: {
      type: Boolean,
      default: false,
    },

    tag: {
      type: Array,
    },

    date: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Posts", PostsSchema);
