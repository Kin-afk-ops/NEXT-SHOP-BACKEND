const router = require("express").Router();
const Voucher = require("../models/Voucher");
const {
  verifyTokenAnhAuthorizationStaff,
  verifyTokenStaff,
} = require("../jwt/verifyTokenStaff");

//CREATE
router.post("/:staffId", verifyTokenAnhAuthorizationStaff, async (req, res) => {
  const newVoucher = new Voucher({
    staffId: req.params.staffId,
    ...req.body,
  });

  try {
    const saveVoucher = await newVoucher.save();
    res.status(200).json(saveVoucher);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET
router.get("/", async (req, res) => {
  const qPage = parseInt(req.query.qPage);

  const firstIndex = (qPage - 1) * 30;
  const lastIndex = qPage * 30;

  let totalPage = 0;
  let voucher = [];
  let voucherPage = [];

  try {
    voucher = await Voucher.find().sort({ createdAt: -1 });

    if (qPage) {
      totalPage = Math.ceil(voucher.length / 30);
      voucherPage = voucher?.slice(firstIndex, lastIndex);

      res.status(200).json({ voucher: voucherPage, totalPage: totalPage });
    } else {
      res.status(200).json(voucher);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET FROM STAFF
router.get("/staff/:staffId", async (req, res) => {
  try {
    const voucher = await Voucher.find({ staffId: req.params.staffId }).sort({
      createdAt: -1,
    });

    res.status(200).json(voucher);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET ONE
router.get("/:id", async (req, res) => {
  try {
    const voucher = await Voucher.findById(req.params.id).sort({
      createdAt: -1,
    });

    res.status(200).json(voucher);
  } catch (error) {
    res.status(500).json(error);
  }
});

//UPDATE
router.put("/:id", verifyTokenStaff, async (req, res) => {
  try {
    const updateVoucher = await Voucher.findByIdAndUpdate(
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
    await Voucher.findByIdAndDelete(req.params.id);
    res.status(200).json("Voucher has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE STAFF
router.delete("/staff/:staffId", verifyTokenStaff, async (req, res) => {
  try {
    await Voucher.deleteMany({ staffId: req.params.staffId });
    res.status(200).json("Voucher has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE All
router.delete("/deleteAll", verifyTokenStaff, async (req, res) => {
  try {
    await Voucher.deleteMany({});
    res.status(200).json("Voucher has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
