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
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },

    email: {
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("InfoUser", InfoUsersSchema);
