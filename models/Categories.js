const mongoose = require("mongoose");

const CategoriesSchema = new mongoose.Schema(
  {
    staffId: {
      type: String,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      path: {
        type: String,
      },
      publicId: {
        type: String,
      },
    },
    path: {
      type: String,
      required: true,
    },
    hot: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Categories", CategoriesSchema);
