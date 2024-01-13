const router = require("express").Router();
const Posts = require("../models/Posts");
const {
  verifyTokenAnhAuthorizationStaff,
  verifyTokenAndAdminStaff,
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

//UPDATE
router.put("/:id", verifyTokenAndAdminStaff, async (req, res) => {
  try {
    const updateBook = await Posts.findByIdAndUpdate(
      req.params.id,
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

router.delete("/:id", verifyTokenAndAdminStaff, async (req, res) => {
  try {
    await Posts.findByIdAndDelete(req.params.id);
    res.status(200).json("Posts has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE ALL
router.delete("/", verifyTokenAndAdminStaff, async (req, res) => {
  try {
    await Posts.deleteMany({});
    res.status(200).json("Posts has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE ALL STAFF
router.delete(
  "/staff/:staffId",
  verifyTokenAnhAuthorizationStaff,
  async (req, res) => {
    try {
      await Posts.deleteMany({ staffId: req.params.staffId });
      res.status(200).json("Posts has been deleted...");
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

//GET CLIENT
router.get("/", async (req, res) => {
  const qHot = req.query.qHot;
  const qTag = req.query.qTag;
  const qPage = parseInt(req.query.qPage);

  const firstIndex = (qPage - 1) * 30;
  const lastIndex = qPage * 30;

  let totalPage = 0;
  let posts = [];
  let postsPage = [];
  try {
    if (qHot) {
      posts = await Posts.find({ hot: true }).sort({ createdAt: -1 });
    } else if (qTag) {
      posts = await Posts.find({
        tag: {
          $in: [qTag],
        },
      });
    } else {
      posts = await Posts.find().sort({ createdAt: -1 });
    }

    totalPage = Math.ceil(posts.length / 30);
    postsPage = posts?.slice(firstIndex, lastIndex);
    res.status(200).json({ posts: postsPage, totalPage: totalPage });
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ONE
router.get("/:slug", async (req, res) => {
  try {
    const post = await Posts.find({ slug: req.params.slug });

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/find/:id", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ADMIN

router.get(
  "/staff/:staffId",
  verifyTokenAnhAuthorizationStaff,
  async (req, res) => {
    const qPage = parseInt(req.query.qPage);

    const firstIndex = (qPage - 1) * 30;
    const lastIndex = qPage * 30;

    let totalPage = 0;
    let posts = [];
    let postsPage = [];
    try {
      posts = await Posts.find({ staffId: req.params.staffId }).sort({
        createdAt: -1,
      });

      totalPage = Math.ceil(posts.length / 30);
      postsPage = posts?.slice(firstIndex, lastIndex);
      res.status(200).json({ posts: postsPage, totalPage: totalPage });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

module.exports = router;
