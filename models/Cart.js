const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    books: {
      bookId: {
        type: String,
      },

      name: {
        type: String,
      },

      image: {
        type: String,
      },
      price: {
        type: Number,
      },

      discountPrice: {
        type: Number,
      },
      quantity: {
        type: Number,
        default: 1,
      },
      maxQuantity: {
        type: Number,
      },
    },

    check: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
