const mongoose = require("mongoose");

const InfoUsersSchema = new mongoose.Schema(
  {
    userId: {
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
    },
    firstName: {
      type: String,
    },

    email: {
      type: String,
    },
    gender: {
      type: String,
    },
    birthday: {
      type: String,
    },
    address: {
      province: {
        type: String,
      },
      district: {
        type: String,
      },
      ward: {
        type: String,
      },
      address: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("InfoUser", InfoUsersSchema);
