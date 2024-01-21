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
router.put("/:bookId", verifyTokenAndAdminStaff, async (req, res) => {
  const bookId = req.params.bookId;

  try {
    const updateInfoBook = await InfoBooks.findOneAndUpdate(
      { bookId: bookId },
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

//Book comment

router.put("/comment/:bookId", async (req, res) => {
  const bookId = req.params.bookId;
  const newComment = req.body;

  try {
    const updateInfoBook = await InfoBooks.findOneAndUpdate(
      { bookId: bookId },
      {
        $push: { comments: newComment },
      },
      { new: true }
    );

    res.status(200).json(updateInfoBook);
  } catch (error) {
    res.status(500).json(error);
  }
});

//put like
router.put("/comment/like/:commentId", async (req, res) => {
  const commentId = req.params.bookId;

  try {
    const updateComment = await InfoBooks.comments.findByIdAndUpdate(
      commentId,
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

//DELETE COMMENT

router.delete("/delete/:bookId/:commentId", async (req, res) => {
  const { bookId, commentId } = req.params;

  try {
    const infoBook = await InfoBooks.findOne({ bookId: bookId });

    if (!infoBook) {
      return res.status(404).json({ message: "infoBook not found" });
    }

    // Xoá phần tử trong mảng notify với _id tương ứng
    infoBook.comments.pull(commentId);

    // Lưu lại thông tin người dùng
    await infoBook.save();

    res.status(200).json({ message: "Đã xoá giỏ hàng" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi" });
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
router.delete("/:bookId", verifyTokenAndAdminStaff, async (req, res) => {
  const bookId = req.params.bookId;

  try {
    await InfoBooks.findOneAndDelete({ bookId: bookId });
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
