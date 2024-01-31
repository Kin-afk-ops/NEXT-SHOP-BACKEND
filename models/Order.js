const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    staffId: {
      type: String,
    },

    userId: {
      type: String,
      required: true,
    },

    name: {
      type: String,
    },

    clientName: {
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
    phone: {
      type: String,
      require: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    address: {
      type: Object,
      require: true,
    },
    status: {
      type: String,
      default: "Đang chuẩn bị hàng",
    },
    note: {
      type: String,
    },

    received: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
