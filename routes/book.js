const router = require("express").Router();
const { verifyTokenAndAdminStaff } = require("../jwt/verifyTokenStaff");
const Books = require("../models/Books");

//CREATE
router.post("/", verifyTokenAndAdminStaff, async (req, res) => {
  const newBook = await Books(req.body);
  try {
    const saveBook = await newBook.save();
    res.status(200).json(saveBook);
  } catch (error) {
    res.status(500).json(error);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdminStaff, async (req, res) => {
  try {
    const updateBook = await Books.findByIdAndUpdate(
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
    await Books.findByIdAndDelete(req.params.id);
    res.status(200).json("Books has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE ALL
router.delete("/", verifyTokenAndAdminStaff, async (req, res) => {
  try {
    await Books.deleteMany({});
    res.status(200).json("Books has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET BOOK
router.get("/find/:id", async (req, res) => {
  try {
    const book = await Books.findById(req.params.id);

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET BOOK
router.get("/slug/:slug", async (req, res) => {
  try {
    const book = await Books.findOne({ slug: req.params.slug });

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ALL BOOK
router.get("/", async (req, res) => {
  const qCategory = req.query.qCategory;
  const qNew = req.query.qNew;
  const qHot = req.query.qHot;
  const qPage = parseInt(req.query.qPage);
  const qSale = req.query.qSale;
  const qStaff = req.query.qStaff;

  const qFrom = parseInt(req.query.qFrom);
  const qTo = parseInt(req.query.qTo);
  const firstIndex = (qPage - 1) * 10;
  const lastIndex = qPage * 10;

  let totalPage = 0;
  let books = [];
  let booksPage = [];
  try {
    if (qCategory) {
      books = await Books.find({
        categories: {
          $in: [qCategory],
        },
      }).sort({ createdAt: -1 });
    } else if (qHot) {
      books = await Books.find({ hot: true }).sort({ createdAt: -1 });
    } else if (qNew) {
      if (qCategory) {
        books = await Books.find({
          categories: {
            $in: [qCategory],
          },
        }).sort({ createdAt: -1 }.limit(120));
      } else {
        books = await Books.find().sort({ createdAt: -1 }).limit(120);
      }
    } else if (qSale) {
      books = await Books.find({
        discount: {
          $gte: 20,
        },
      }).sort({ createdAt: -1 });
    } else if (qFrom && qTo) {
      books = await Books.find({
        price: {
          $or: [{ $gte: qFrom, $lt: qTo }],
        },
      }).sort({ createdAt: -1 });
    } else if (qStaff) {
      books = await Books.find({
        staffId: qStaff,
      }).sort({ createdAt: -1 });
    } else {
      books = await Books.find().sort({ createdAt: -1 });
    }

    totalPage = Math.ceil(books.length / 10);
    booksPage = books?.slice(firstIndex, lastIndex);
    res.status(200).json({ books: booksPage, totalPage: totalPage });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
