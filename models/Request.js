const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    staffId: {
      type: String,
    },
    type: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      require: true,
    },

    done: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Request", RequestSchema);
