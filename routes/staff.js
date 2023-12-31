const router = require("express").Router();
const CryptoJS = require("crypto-js");
const Staffs = require("../models/Staffs");
const Users = require("../models/Users");
const Cart = require("../models/Cart");
const Notification = require("../models/Notification");
const {
  verifyTokenStaff,
  verifyTokenAndAdminStaff,
  verifyTokenAndBoss,
  verifyTokenBossAndStaff,
} = require("../jwt/verifyTokenStaff");

//UPDATE
router.put("/updateStaff/:id", verifyTokenBossAndStaff, async (req, res) => {
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

//UPDATE STAFF
router.put("/updateUser/:id", verifyTokenAndAdminStaff, async (req, res) => {
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

router.get("/find/:id", verifyTokenBossAndStaff, async (req, res) => {
  try {
    let staff = await Staffs.findById(req.params.id);
    const hashedPassword = CryptoJS.AES.decrypt(
      staff.password,
      process.env.PASS_SEC
    );
    staff.password = hashedPassword.toString(CryptoJS.enc.Utf8);

    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json(error);
  }
});

//CART

router.get("/cartUser", verifyTokenAndAdminStaff, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get notification
//GET
router.get(
  "/notification/:userId",
  verifyTokenAndAdminStaff,
  async (req, res) => {
    try {
      const notification = await Notification.findOne({
        userId: req.params.userId,
      });

      res.status(200).json(notification);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

module.exports = router;
