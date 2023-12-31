const router = require("express").Router();
const CryptoJS = require("crypto-js");
const Staffs = require("../models/Staffs");
const Users = require("../models/Users");
const InfoStaffs = require("../models/InfoStaffs");
const { verifyTokenAndBoss } = require("../jwt/verifyTokenStaff");

//UPDATE
router.put("/:id", verifyTokenAndBoss, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }
  try {
    const updateStaff = await Staffs.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateStaff);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE

router.delete("/:id", verifyTokenAndBoss, async (req, res) => {
  try {
    await Staffs.findByIdAndDelete(req.params.id);
    res.status(200).json("Staff has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/", verifyTokenAndBoss, async (req, res) => {
  try {
    await Staffs.deleteMany();
    res.status(200).json("Staff has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ALL STAFF
router.get("/", verifyTokenAndBoss, async (req, res) => {
  const search = req.query.search;

  try {
    let staffs = [];
    if (search) {
      staffs = await Staffs.find({
        position: "admin",
        username: /search/,
      }).sort({
        createdAt: -1,
      });
    } else {
      staffs = await Staffs.find({ position: "admin" }).sort({ createdAt: -1 });
    }

    res.status(200).json(staffs);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET INFO STAFF

//GET USERS STATS
router.get("/stats", verifyTokenAndBoss, async (req, res) => {
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

module.exports = router;
