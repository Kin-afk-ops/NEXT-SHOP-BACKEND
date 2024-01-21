const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema(
  {
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

const InfoBooksSchema = new mongoose.Schema(
  {
    bookId: {
      type: String,
      required: true,
    },

    infoBook: {
      type: Object,
      auth: {
        type: String,
      },
      publisher: {
        type: String,
        required: true,
      },
      supplier: {
        type: String,
        required: true,
      },
      nameSeries: {
        type: String,
      },
      desc: {
        type: String,
        required: true,
      },
      publishingYear: {
        type: Number,
      },
      weight: {
        type: Number,
      },
      size: {
        type: String,
        required: true,
      },
      form: {
        type: String,
      },
      numberPage: {
        type: Number,
        required: true,
      },
    },
    comments: [CommentsSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("InfoBooks", InfoBooksSchema);
