const router = require("express").Router();
const CryptoJS = require("crypto-js");
const Users = require("../models/Users");
const Books = require("../models/Books");
const {
  verifyTokenAndAdminStaff,
  verifyTokenBossAndStaff,
} = require("../jwt/verifyTokenStaff");
const {
  verifyTokenAnhAuthorizationUser,
  verifyTokenUser,
} = require("../jwt/verifyTokenUser");

//UPDATE
router.put("/:id", verifyTokenAnhAuthorizationUser, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }
  try {
    const updateUser = await Users.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    const { password, ...others } = updateUser._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE

router.delete("/:id", verifyTokenAndAdminStaff, async (req, res) => {
  try {
    await Users.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/", verifyTokenAndAdminStaff, async (req, res) => {
  try {
    await Users.deleteMany();
    res.status(200).json("User has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET USER
router.get("/find/:id", async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    const { password, ...others } = user._doc;

    res.status(200).json({ ...others });
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ALL USERS
router.get("/", verifyTokenAndAdminStaff, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await Users.find().sort({ createdAt: -1 }).limit(5)
      : await Users.find().sort({ createdAt: -1 });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET USERS STATS
router.get("/stats", verifyTokenBossAndStaff, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await Users.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL BOOK USER
router.get("/book", verifyTokenUser, async (req, res) => {
  const qNew = req.query.qNew;
  const qCategory = req.query.qCategory;
  try {
    let books;
    if (qNew) {
      books = await Books.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCategory) {
      books = await Books.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      books = await Books.find().sort({ createdAt: -1 });
    }

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET CATEGORIES USER
router.get("/categories", verifyTokenUser, async (req, res) => {
  try {
    const cats = await Categories.find().sort({ createdAt: -1 });
    res.status(200).json(cats);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
