const router = require("express").Router();
const Posts = require("../models/Posts");
const {
  verifyTokenAnhAuthorizationStaff,
  verifyTokenStaff,
} = require("../jwt/verifyTokenStaff");

//CREATE
router.post("/:staffId", verifyTokenAnhAuthorizationStaff, async (req, res) => {
  const newPost = new Posts({
    staffId: req.params.staffId,
    ...req.body,
  });

  try {
    const savePost = await newPost.save();
    res.status(200).json(savePost);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
