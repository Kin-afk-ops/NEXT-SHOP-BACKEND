const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    staffId: {
      type: String,
      required: true,
    },

    userId: {
      type: String,
      required: true,
    },

    notify: {
      title: {
        type: String,
        required: true,
      },
      path: {
        type: String,
      },
      content: {
        type: String,
        required: true,
      },
    },
    read: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", NotificationSchema);
