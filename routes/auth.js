const router = require("express").Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const Users = require("../models/Users");
const { verifyTokenAndBoss } = require("../jwt/verifyTokenStaff");
const Staffs = require("../models/Staffs");
const Notification = require("../models/Notification");

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new Users({
    phone: req.body.phone,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const saveUser = await newUser.save();
    const { password, ...others } = saveUser._doc;

    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/createNotification", async (req, res) => {
  const newNotification = new Notification({
    staffId: "auto",
    userId: req.body.userId,
    notify: {
      title: "Chào mừng bạn đến với tôi đọc sách",
      path: "/khach-hang/ho-so",
      content:
        "Hãy cập nhật thông tin để tận hưởng những quyển sách thú vị nhé!",
    },
  });

  try {
    const saveNotification = await newNotification.save();
    res.status(200).json(saveNotification);
  } catch (error) {
    res.status(500).json(error);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await Users.findOne({ phone: req.body.phone });
    !user && res.status(401).json("Wrong credential");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const OriginPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    OriginPassword !== req.body.password &&
      res.status(401).json("Wrong credential");

    const accessToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );
    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Create staff
router.post("/staff/create", verifyTokenAndBoss, async (req, res) => {
  const newStaff = new Staffs({
    username: req.body.username,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });
  try {
    const saveStaff = await newStaff.save();
    const { password, ...others } = saveStaff._doc;
    res.status(200).json({ ...others });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Login staff
router.post("/staff/login", async (req, res) => {
  try {
    const staff = await Staffs.findOne({ username: req.body.username });
    !staff && res.status(401).json("Wrong credential");

    const hashedPassword = CryptoJS.AES.decrypt(
      staff.password,
      process.env.PASS_SEC
    );
    const OriginPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    OriginPassword !== req.body.password &&
      res.status(401).json("Wrong credential");

    const accessToken = jwt.sign(
      {
        id: staff._id,
        position: staff.position,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );
    const { password, ...others } = staff._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
