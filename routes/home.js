const router = require("express").Router();
const Books = require("../models/Books");
const Notification = require("../models/Notification");
const Cart = require("../models/Cart");
const Categories = require("../models/Categories");

const {
  verifyTokenUser,
  verifyTokenAnhAuthorizationUser,
} = require("../jwt/verifyTokenUser");

//GET ALL BOOK
router.get("/book", async (req, res) => {
  const qHot = req.query.qHot;
  const qSale = req.query.qSale;

  let books = [];
  try {
    if (qHot) {
      books = await Books.find({ hot: true }).sort({ createdAt: -1 });
    } else if (qSale) {
      books = await Books.find({
        discount: {
          $gte: 20,
        },
      }).sort({ createdAt: -1 });
    } else {
      books = await Books.find().sort({ createdAt: -1 });
    }

    res.status(200).json(books);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/book/cate", async (req, res) => {
  const qCategories = req.query.qCategories;

  try {
    const books = await Books.find({
      categories: {
        $in: [qCategories],
      },
    }).sort({ createdAt: -1 });

    res.status(200).json(books);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get(
  "/notification/:userId",
  verifyTokenAnhAuthorizationUser,
  async (req, res) => {
    try {
      const notification = await Notification.find({
        userId: req.params.userId,
        read: false,
      })
        .sort({ createdAt: -1 })
        .limit(5);

      res.status(200).json(notification);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

router.get(
  "/cart/:userId",
  verifyTokenAnhAuthorizationUser,
  async (req, res) => {
    try {
      const cart = await Cart.find({ userId: req.params.userId });

      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

router.get("/categories", async (req, res) => {
  try {
    const cate = await Categories.find().sort({ createdAt: -1 }).limit(5);

    res.status(200).json(cate);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
