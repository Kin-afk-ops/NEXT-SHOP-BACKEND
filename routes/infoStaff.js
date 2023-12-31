const router = require("express").Router();
const InfoStaffs = require("../models/InfoStaffs");
const {
  verifyTokenAnhAuthorizationStaff,
  verifyTokenBossAndStaff,
  verifyTokenAndBoss,
} = require("../jwt/verifyTokenStaff");

//CREATE
router.post("/", verifyTokenBossAndStaff, async (req, res) => {
  const newInfoStaff = new InfoStaffs(req.body);
  try {
    const saveInfoStaff = await newInfoStaff.save();
    res.status(200).json(saveInfoStaff);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET
router.get("/:staffId", verifyTokenBossAndStaff, async (req, res) => {
  try {
    const infoStaff = await InfoStaffs.findOne({ staffId: req.params.staffId });
    res.status(200).json(infoStaff);
  } catch (error) {
    res.status(500).json(error);
  }
});

//UPDATE
router.put("/:id", verifyTokenBossAndStaff, async (req, res) => {
  try {
    const updateInfoStaff = await InfoStaffs.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateInfoStaff);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE
router.delete("/:staffId", verifyTokenAndBoss, async (req, res) => {
  try {
    await InfoStaffs.findOneAndDelete({ staffId: req.params.staffId });
    res.status(200).json("Info Staff has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/", verifyTokenAndBoss, async (req, res) => {
  try {
    await InfoStaffs.findByIdAndDelete();
    res.status(200).json("Info Staff has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
