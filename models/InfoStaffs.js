const mongoose = require("mongoose");

const InfoStaffsSchema = new mongoose.Schema(
  {
    staffId: {
      type: String,
      required: true,
    },

    avatar: {
      path: {
        type: String,
      },
      publicId: {
        type: String,
      },
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
    gender: {
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
