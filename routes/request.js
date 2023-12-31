const router = require("express").Router();
const { verifyTokenAndAdminStaff } = require("../jwt/verifyTokenStaff");
const { verifyTokenUser } = require("../jwt/verifyTokenUser");
const Request = require("../models/Request");

//CREATE
router.post("/", verifyTokenUser, async (req, res) => {
  const newRequest = await Request(req.body);
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

module.exports = router;
