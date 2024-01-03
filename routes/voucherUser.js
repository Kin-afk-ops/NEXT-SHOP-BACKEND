const router = require("express").Router();
const VoucherUser = require("../models/VoucherUser");
const {
  verifyTokenAnhAuthorizationStaff,
  verifyTokenStaff,
} = require("../jwt/verifyTokenStaff");
const {
  verifyTokenUser,
  verifyTokenAnhAuthorizationUser,
} = require("../jwt/verifyTokenUser");

//CREATE
router.post("/:userId", verifyTokenAnhAuthorizationUser, async (req, res) => {
  const newVoucherUser = new VoucherUser({
    userId: req.params.userId,
    ...req.body,
  });

  try {
    const saveVoucherUser = await newVoucherUser.save();
    res.status(200).json(saveVoucherUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET
router.get("/", async (req, res) => {
  try {
    const voucher = await VoucherUser.find().sort({ createdAt: -1 });

    res.status(200).json(voucher);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET FROM USER
router.get(
  "/user/:userId",
  verifyTokenAnhAuthorizationUser,
  async (req, res) => {
    try {
      const voucher = await VoucherUser.find({
        userId: req.params.userId,
      }).sort({
        createdAt: -1,
      });

      res.status(200).json(voucher);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

// GET ONE
router.get("/:id", async (req, res) => {
  try {
    const voucher = await VoucherUser.findById(req.params.id).sort({
      createdAt: -1,
    });

    res.status(200).json(voucher);
  } catch (error) {
    res.status(500).json(error);
  }
});

//UPDATE
router.put("/:id", verifyTokenUser, async (req, res) => {
  try {
    const updateVoucher = await VoucherUser.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateVoucher);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE ONE
router.delete("/:id", verifyTokenStaff, async (req, res) => {
  try {
    await VoucherUser.findByIdAndDelete(req.params.id);
    res.status(200).json("Voucher has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE User
router.delete("/user/:userId", verifyTokenStaff, async (req, res) => {
  try {
    await VoucherUser.deleteMany({ userId: req.params.userId });
    res.status(200).json("Voucher has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE All
router.delete("/deleteAll", verifyTokenStaff, async (req, res) => {
  try {
    await VoucherUser.deleteMany({});
    res.status(200).json("Voucher has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
