const mongoose = require("mongoose");

const InfoStaffsSchema = new mongoose.Schema(
  {
    staffId: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    sex: {
      type: String,
      required: true,
    },
    birthday: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },

    wage: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("InfoStaffs", InfoStaffsSchema);
