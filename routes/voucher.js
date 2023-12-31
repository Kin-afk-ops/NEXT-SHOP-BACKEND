const router = require("express").Router();
const Voucher = require("../models/Voucher");
const { verifyTokenAnhAuthorizationStaff } = require("../jwt/verifyTokenStaff");
const { verifyTokenUser } = require("../jwt/verifyTokenUser");

//CREATE
router.post("/", async (req, res) => {
  const newVoucher = new Notification(req.body);

  try {
    const saveVoucher = await newVoucher.save();
    res.status(200).json(saveVoucher);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET
router.get("/:userId", verifyTokenUser, async (req, res) => {
  try {
    const voucher = await Voucher.findOne({
      userId: req.params.userId,
    });

    res.status(200).json(voucher.vouch);
  } catch (error) {
    res.status(500).json(error);
  }
});

//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const newVouch = req.body;
    const updateVoucher = await Notification.findByIdAndUpdate(
      req.params.id,
      {
        $push: { vouch: newVouch },
      },
      { new: true }
    );
    res.status(200).json(updateVoucher);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE
router.put("/delete/:id", async (req, res) => {
  try {
    await Voucher.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { vouch: { _id: req.body.id } },
      },
      { new: true }
    );
    res.status(200).json("Voucher đã được xoá!");
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE ALL
router.put(
  "/deleteAll/:id",
  verifyTokenAnhAuthorizationStaff,
  async (req, res) => {
    try {
      await Voucher.findByIdAndUpdate(
        req.params.id,
        {
          vouch: [],
        },
        { new: true }
      );
      res.status(200).json("Đã xoá toàn bộ Voucher!");
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

//DELETE USER
router.delete("/:id", verifyTokenAnhAuthorizationStaff, async (req, res) => {
  try {
    await Voucher.delete(req.params.id);
    res.status(200).json("Đã xoá toàn bộ Voucher");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
