const mongoose = require("mongoose");

const BooksSchema = new mongoose.Schema(
  {
    staffId: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
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

    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    categories: {
      type: Array,
    },

    quantity: {
      type: Number,
    },

    star: {
      type: Number,
      default: 0,
    },
    hot: {
      type: Boolean,
      default: false,
    },

    form: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Books", BooksSchema);
