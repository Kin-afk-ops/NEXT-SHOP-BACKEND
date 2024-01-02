const mongoose = require("mongoose");

const VoucherSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    voucherId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Voucher", VoucherSchema);
