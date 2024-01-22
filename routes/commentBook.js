const router = require("express").Router();
const { verifyTokenUser } = require("../jwt/verifyTokenUser");
const { verifyTokenAndAdminStaff } = require("../jwt/verifyTokenStaff");
const CommentBook = require("../models/CommentBook");

//CREATE
router.post("/:bookId", verifyTokenUser, async (req, res) => {
  const newComment = await CommentBook({
    bookId: req.params.bookId,
    ...req.body,
  });
  try {
    const saveComment = await newComment.save();
    res.status(200).json(saveComment);
  } catch (error) {
    res.status(500).json(error);
  }
});

//UPDATE
router.put("/:id", verifyTokenUser, async (req, res) => {
  try {
    const updateComment = await CommentBook.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateComment);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE

router.delete("/:id", async (req, res) => {
  try {
    await CommentBook.findByIdAndDelete(req.params.id);
    res.status(200).json("CommentBook has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE ALL
router.delete("/", verifyTokenAndAdminStaff, async (req, res) => {
  try {
    await CommentBook.deleteMany({});
    res.status(200).json("CommentBook has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ALL BOOK
router.get("/find/:bookId", async (req, res) => {
  const q = req.query.q;

  const qPage = parseInt(req.query.qPage);

  const firstIndex = (qPage - 1) * 10;
  const lastIndex = qPage * 10;

  let totalPage = 0;
  let comments = [];
  let commentsPage = [];
  try {
    if (q) {
      if (q === "like") {
        comments = await CommentBook.find({ bookId: req.params.bookId }).sort({
          like: -1,
        });
      } else if (q === "new") {
        comments = await CommentBook.find({ bookId: req.params.bookId }).sort({
          createdAt: -1,
        });
      } else {
        comments = await CommentBook.find().sort({ createdAt: -1 });
      }

      totalPage = Math.ceil(comments.length / 10);
      commentsPage = comments?.slice(firstIndex, lastIndex);
      res.status(200).json({ comments: comments, totalPage: totalPage });
    } else {
      comments = await CommentBook.find().sort({ createdAt: -1 });
      res.status(200).json(comments);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
