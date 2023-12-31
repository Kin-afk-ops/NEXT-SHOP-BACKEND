const router = require("express").Router();
const InfoBooks = require("../models/InfoBooks");
const {
  verifyTokenAnhAuthorizationStaff,
  verifyTokenAndAdminStaff,
} = require("../jwt/verifyTokenStaff");

//CREATE
router.post("/", verifyTokenAndAdminStaff, async (req, res) => {
  const newInfoBook = new InfoBooks(req.body);
  try {
    const saveInfoBook = await newInfoBook.save();
    res.status(200).json(saveInfoBook);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdminStaff, async (req, res) => {
  try {
    const updateInfoBook = await InfoBooks.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateInfoBook);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET
router.get("/:bookId", async (req, res) => {
  try {
    const infoBook = await InfoBooks.findOne({ bookId: req.params.bookId });
    res.status(200).json(infoBook);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdminStaff, async (req, res) => {
  try {
    await InfoBooks.findByIdAndDelete(req.params.id);
    res.status(200).json("Info books has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE ALL
router.delete("/", verifyTokenAnhAuthorizationStaff, async (req, res) => {
  try {
    await InfoBooks.deleteMany();
    res.status(200).json("Info books has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
