const router = require("express").Router();
const {
  verifyTokenStaff,
  verifyTokenAnhAuthorizationStaff,
  verifyTokenAndAdminStaff,
  verifyTokenAndBoss,
  verifyTokenBossAndStaff,
} = require("../jwt/verifyTokenStaff");

const {
  verifyTokenUser,
  verifyTokenAnhAuthorizationUser,
} = require("../jwt/verifyTokenUser");
const Order = require("../models/Order");
const Notification = require("../models/Notification");

//CREATE
router.post(
  "/create/:id",
  verifyTokenAnhAuthorizationUser,
  async (req, res) => {
    const newOrder = await Order({
      userId: req.params.id,
      ...req.body,
    });
    try {
      const saveOrder = await newOrder.save();
      res.status(200).json(saveOrder);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

router.post("/noti/createNotification", verifyTokenUser, async (req, res) => {
  const newNotification = new Notification({
    staffId: "auto",
    userId: req.body.userId,
    notify: {
      title: "Bạn vừa tạo đơn hàng",
      path: "/khach-hang/don-hang",
      content: "Hãy vào khu vực đơn hàng để kiểm tra ngay",
    },
  });

  try {
    const saveNotification = await newNotification.save();
    res.status(200).json(saveNotification);
  } catch (error) {
    res.status(500).json(error);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdminStaff, async (req, res) => {
  try {
    const updateOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateOrder);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE

router.delete("/:id", verifyTokenAndAdminStaff, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});
//DELETE FROM USER
router.delete(
  "/deleteAll/:userId",
  verifyTokenAndAdminStaff,
  async (req, res) => {
    try {
      await Order.deleteMany({ userId: req.params.userId });
      res.status(200).json("Order has been deleted...");
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

router.delete("/", verifyTokenAndAdminStaff, async (req, res) => {
  try {
    await Order.deleteMany();
    res.status(200).json("Order has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET USER ORDER
router.get(
  "/find/:userId",
  verifyTokenAnhAuthorizationUser,
  async (req, res) => {
    try {
      const order = await Order.find({
        $and: [{ userId: req.params.userId }, { requestDelete: false }],
      }).sort({ createdAt: -1 });

      res.status(200).json(order);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

router.get(
  "/find/delete/:userId",
  verifyTokenAnhAuthorizationUser,
  async (req, res) => {
    try {
      const order = await Order.find({
        $and: [{ userId: req.params.userId }, { requestDelete: true }],
      }).sort({ createdAt: -1 });

      res.status(200).json(order);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

//GET USER STAFF
router.get(
  "/staff/:staffId",
  verifyTokenAnhAuthorizationStaff,
  async (req, res) => {
    const qPage = parseInt(req.query.qPage);
    const firstIndex = (qPage - 1) * 30;
    const lastIndex = qPage * 30;

    let totalPage = 0;
    let orders = [];
    let ordersPage = [];

    try {
      orders = await Order.find({ staffId: req.params.staffId });

      if (qPage) {
        totalPage = Math.ceil(orders.length / 30);
        ordersPage = orders?.slice(firstIndex, lastIndex);
        res.status(200).json({ orders: ordersPage, totalPage: totalPage });
      } else {
        res.status(200).json(orders);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

//GET ONE ORDER

router.get("/find/product/:id", verifyTokenUser, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ALL
router.get("/", verifyTokenAndAdminStaff, async (req, res) => {
  const qPage = parseInt(req.query.qPage);
  const firstIndex = (qPage - 1) * 10;
  const lastIndex = qPage * 10;

  let totalPage = 0;
  let orders = [];
  let ordersPage = [];

  try {
    orders = await Order.find().sort({ createdAt: -1 });

    if (qPage) {
      totalPage = Math.ceil(orders.length / 10);
      ordersPage = orders?.slice(firstIndex, lastIndex);
      res.status(200).json({ orders: ordersPage, totalPage: totalPage });
    } else {
      res.status(200).json(orders);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET MONTHLY INCOME
router.get("/income", verifyTokenBossAndStaff, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
