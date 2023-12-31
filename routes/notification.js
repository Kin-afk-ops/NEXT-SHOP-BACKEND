const router = require("express").Router();
const Notification = require("../models/Notification");
const { verifyTokenAndAdminStaff } = require("../jwt/verifyTokenStaff");
const { verifyTokenUser } = require("../jwt/verifyTokenUser");

//CREATE
router.post("/:userId", async (req, res) => {
  const newNotification = new Notification({
    userId: req.params.userId,
    notify: [
      {
        title:
          "Chào mừng bạn đến với Tôi đọc sách - Trang web mua bán sách trực tuyến",
        path: "/customer/edit",
        content: "Hãy cập nhật thông tin cá nhân để nhận ngay ưu đãi!",
      },
    ],
  });

  try {
    const saveNotification = await newNotification.save();
    res.status(200).json(saveNotification);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET
router.get("/:userId", async (req, res) => {
  try {
    const notification = await Notification.findOne({
      userId: req.params.userId,
    });

    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ALL
router.get("/", verifyTokenAndAdminStaff, async (req, res) => {
  try {
    const notification = await Notification.find();

    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json(error);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdminStaff, async (req, res) => {
  try {
    const newNotify = req.body;
    const updateNotification = await Notification.findByIdAndUpdate(
      req.params.id,
      {
        $push: { notify: newNotify },
      },
      { new: true }
    );
    res.status(200).json(updateNotification);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE
router.delete("/delete/:id/:notificationId", async (req, res) => {
  const { id, notificationId } = req.params;

  try {
    const notification = await Notification.findById(id);

    if (!notification) {
      return res.status(404).json({ message: "notification not found" });
    }

    // Xoá phần tử trong mảng notify với _id tương ứng
    notification.notify.pull(notificationId);

    // Lưu lại thông tin người dùng
    await notification.save();

    res.status(200).json({ message: "Đã xoá thông báo" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi" });
  }
});

//DELETE ALL
router.put("/deleteAll/:id", verifyTokenAndAdminStaff, async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(
      req.params.id,
      {
        notify: [],
      },
      { new: true }
    );
    res.status(200).json("Đã xoá toàn bộ thông báo!");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
