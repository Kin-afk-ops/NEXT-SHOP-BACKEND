const mongoose = require("mongoose");

const VoucherUserSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    voucherId: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VoucherUser", VoucherUserSchema);
