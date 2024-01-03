const router = require("express").Router();
const PostContent = require("../models/PostContent");
const {
  verifyTokenAnhAuthorizationStaff,
  verifyTokenAndAdminStaff,
  verifyTokenStaff,
} = require("../jwt/verifyTokenStaff");

//CREATE
router.post(
  "/:staffId/:postId",
  verifyTokenAnhAuthorizationStaff,
  async (req, res) => {
    const newPostContent = new PostContent({
      postId: req.params.postId,
      ...req.body,
    });

    try {
      const savePostContent = await newPostContent.save();
      res.status(200).json(savePostContent);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

//UPDATE
router.put("/:postId", verifyTokenAndAdminStaff, async (req, res) => {
  try {
    const updateBook = await PostContent.findOneAndUpdate(
      { postId: req.params.postId },
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateBook);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE

router.delete("/:postId", verifyTokenAndAdminStaff, async (req, res) => {
  try {
    await PostContent.findOneAndDelete({ postId: req.params.postId });
    res.status(200).json("PostContent has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE ALL
router.delete("/", verifyTokenAndAdminStaff, async (req, res) => {
  try {
    await PostContent.deleteMany({});
    res.status(200).json("PostContent has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET CLIENT
router.get("/:postId", async (req, res) => {
  try {
    const postContent = await PostContent.findOne({
      postId: req.params.postId,
    });

    res.status(200).json(postContent);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
