const router = require("express").Router();
const Categories = require("../models/Categories");
const { verifyTokenAndAdminStaff } = require("../jwt/verifyTokenStaff");

//POST
router.post("/", verifyTokenAndAdminStaff, async (req, res) => {
  const newCat = new Categories(req.body);
  try {
    const savedCat = await newCat.save();
    res.status(200).json(savedCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET
router.get("/", async (req, res) => {
  try {
    const cats = await Categories.find();
    res.status(200).json(cats);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/find/:id", async (req, res) => {
  try {
    const cats = await Categories.findById(req.params.id);
    res.status(200).json(cats);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE
router.put("/:id", verifyTokenAndAdminStaff, async (req, res) => {
  try {
    const updateCat = await Categories.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateCat);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdminStaff, async (req, res) => {
  try {
    await Categories.findByIdAndDelete(req.params.id);
    res.status(200).json("Category has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE
router.delete("/", verifyTokenAndAdminStaff, async (req, res) => {
  try {
    await Categories.deleteMany();
    res.status(200).json("Category has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE
module.exports = router;
