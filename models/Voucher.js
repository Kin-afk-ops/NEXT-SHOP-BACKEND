const mongoose = require("mongoose");

const VoucherSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    vouch: [
      {
        percent: {
          type: Number,
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        script: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Voucher", VoucherSchema);
