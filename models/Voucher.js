const mongoose = require("mongoose");

const VoucherSchema = new mongoose.Schema(
  {
    staffId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
    },
    discount: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Voucher", VoucherSchema);
