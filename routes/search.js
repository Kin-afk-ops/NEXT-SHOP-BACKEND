const router = require("express").Router();
const Books = require("../models/Books");

router.get("/book", async (req, res) => {
  const search = req.query.search;
  const qPage = parseInt(req.query.qPage);

  const firstIndex = (qPage - 1) * 30;
  const lastIndex = qPage * 30;

  let totalPage = 0;
  let bookSearch = [];
  let bookPage = [];
  try {
    bookSearch = await Movies.find({
      name: { $regex: search, $options: "i" },
    }).sort({ createdAt: -1 });

    totalPage = Math.ceil(bookSearch.length / 30);
    bookPage = bookSearch?.slice(firstIndex, lastIndex);
    res.status(200).json({ books: bookPage, totalPage: totalPage });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/categories", async (req, res) => {
  const search = req.query.search;
  const qPage = parseInt(req.query.qPage);

  const firstIndex = (qPage - 1) * 10;
  const lastIndex = qPage * 10;

  let totalPage = 0;
  let categoriesSearch = [];
  let categoriesPage = [];
  try {
    categoriesSearch = await Categories.find({
      name: { $regex: search, $options: "i" },
    }).sort({ createdAt: -1 });

    totalPage = Math.ceil(categoriesSearch.length / 10);
    categoriesPage = categoriesSearch?.slice(firstIndex, lastIndex);
    res.status(200).json({ categories: categoriesPage, totalPage: totalPage });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/country", async (req, res) => {
  const search = req.query.search;
  const qPage = parseInt(req.query.qPage);

  const firstIndex = (qPage - 1) * 10;
  const lastIndex = qPage * 10;

  let totalPage = 0;
  let countriesSearch = [];
  let countriesPage = [];
  try {
    countriesSearch = await Country.find({
      name: { $regex: search, $options: "i" },
    }).sort({ createdAt: -1 });

    totalPage = Math.ceil(countriesSearch.length / 10);
    countriesPage = countriesSearch?.slice(firstIndex, lastIndex);
    res.status(200).json({ countries: countriesPage, totalPage: totalPage });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
