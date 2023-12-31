const router = require("express").Router();
const InfoUsers = require("../models/InfoUsers");
const { verifyTokenUser } = require("../jwt/verifyTokenUser");
const { verifyTokenAndAdminStaff } = require("../jwt/verifyTokenStaff");

//CREATE
router.post("/", async (req, res) => {
  const newInfoUser = new InfoUsers(req.body);
  try {
    const saveInfoUser = await newInfoUser.save();
    res.status(200).json(saveInfoUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET
router.get("/:userId", async (req, res) => {
  try {
    const infoUser = await InfoUsers.findOne({ userId: req.params.userId });
    res.status(200).json(infoUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

//UPDATE
router.put("/:id", verifyTokenUser, async (req, res) => {
  try {
    const updateInfoUser = await InfoUsers.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateInfoUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE
router.delete("/:userId", verifyTokenAndAdminStaff, async (req, res) => {
  try {
    await InfoUsers.findOneAndDelete({ userId: req.params.userId });
    res.status(200).json("Info User has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/", verifyTokenAndAdminStaff, async (req, res) => {
  try {
    await InfoUsers.deleteMany();
    res.status(200).json("Info User has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
