const router = require("express").Router();
const Notification = require("../models/Notification");
const { verifyTokenAndAdminStaff } = require("../jwt/verifyTokenStaff");
const { verifyTokenUser } = require("../jwt/verifyTokenUser");

//CREATE
router.post("/:id/:staffId", verifyTokenAndAdminStaff, async (req, res) => {
  const newNotification = new Notification({
    staffId: req.params.staffId,
    userId: req.params.id,
    ...req.body,
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
    const notification = await Notification.find({
      userId: req.params.userId,
    });

    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/notify/:id", async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ALL
router.get("/", verifyTokenAndAdminStaff, async (req, res) => {
  try {
    const notification = await Notification.find().sort({ createdAt: -1 });

    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json(error);
  }
});

//UPDATE
router.put("/staff/:id", verifyTokenAndAdminStaff, async (req, res) => {
  try {
    const updateNotification = await Notification.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateNotification);
  } catch (error) {
    res.status(500).json(error);
  }
});

//UPDATE
router.put("/user/:id", verifyTokenUser, async (req, res) => {
  try {
    const updateNotification = await Notification.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateNotification);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE
router.delete("/:notificationId", async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.notificationId);

    res.status(200).json({ message: "Đã xoá thông báo" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi" });
  }
});

//DELETE ALL
router.delete(
  "/deleteAll/:userId",
  verifyTokenAndAdminStaff,
  async (req, res) => {
    try {
      await Notification.deleteMany({ userId: req.params.userId });
      res.status(200).json("Đã xoá toàn bộ thông báo!");
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

module.exports = router;
