const mongoose = require("mongoose");

const CommentBookSchema = new mongoose.Schema(
  {
    bookId: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },
    star: {
      type: Number,
      default: 0,
    },

    like: {
      value: {
        type: Number,
        default: 0,
      },
      userId: {
        type: Array,
      },
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CommentBook", CommentBookSchema);
