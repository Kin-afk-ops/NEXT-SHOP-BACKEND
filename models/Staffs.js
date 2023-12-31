const mongoose = require("mongoose");

const StaffsSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    position: {
      type: String,
      required: true,
      default: "admin",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Staffs", StaffsSchema);
