const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema({
  productId: {
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
  quantity: {
    type: Number,
    default: 1,
  },
});

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
    products: [ProductsSchema],
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
