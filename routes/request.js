const router = require("express").Router();
const { verifyTokenAndAdminStaff } = require("../jwt/verifyTokenStaff");
const {
  verifyTokenUser,
  verifyTokenAnhAuthorizationUser,
} = require("../jwt/verifyTokenUser");
const Request = require("../models/Request");

//CREATE
router.post("/:userId", verifyTokenAnhAuthorizationUser, async (req, res) => {
  const newRequest = await Request({
    userId: req.params.userId,
    ...req.body,
  });
  try {
    const saveRequest = await newRequest.save();
    res.status(200).json(saveRequest);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE

router.delete("/:id", verifyTokenAndAdminStaff, async (req, res) => {
  try {
    await Request.findByIdAndDelete(req.params.id);
    res.status(200).json("Request has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE FROM USER

router.delete(
  "/deleteAll/:userId",
  verifyTokenAndAdminStaff,
  async (req, res) => {
    try {
      await Request.deleteMany({ userId: req.params.userId });
      res.status(200).json("Request has been deleted...");
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

router.delete("/", verifyTokenAndAdminStaff, async (req, res) => {
  try {
    await Request.findByIdAndDelete();
    res.status(200).json("Request has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ALL
router.get("/", verifyTokenAndAdminStaff, async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ONE
router.get("/find/:id", verifyTokenAndAdminStaff, async (req, res) => {
  try {
    const requests = await Request.findById(req.params.id);

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ONE USER

router.get("/find/user/:userId", verifyTokenAndAdminStaff, async (req, res) => {
  try {
    const requests = await Request.find({ userId: req.params.userId });

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
