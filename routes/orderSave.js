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
const OrderSave = require("../models/OrderSave");

//CREATE
router.post("/", verifyTokenBossAndStaff, async (req, res) => {
  const newOrder = await OrderSave(req.body);
  try {
    const saveOrder = await newOrder.save();
    res.status(200).json(saveOrder);
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
      const order = await OrderSave.find({ userId: req.params.userId });

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
      orders = await OrderSave.find({ staffId: req.params.staffId });

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
    const order = await OrderSave.findById(req.params.id);

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ALL
router.get("/", verifyTokenAndAdminStaff, async (req, res) => {
  const qPage = parseInt(req.query.qPage);
  const firstIndex = (qPage - 1) * 30;
  const lastIndex = qPage * 30;

  let totalPage = 0;
  let orders = [];
  let ordersPage = [];

  try {
    orders = await OrderSave.find().sort({ createdAt: -1 });

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
});

//GET MONTHLY INCOME
router.get("/income", verifyTokenBossAndStaff, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await OrderSave.aggregate([
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
