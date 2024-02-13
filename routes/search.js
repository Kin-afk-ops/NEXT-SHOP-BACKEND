const router = require("express").Router();
const Books = require("../models/Books");
const Categories = require("../models/Categories");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Posts = require("../models/Posts");

router.get("/book", async (req, res) => {
  const search = req.query.search;
  const qPage = parseInt(req.query.qPage);

  const firstIndex = (qPage - 1) * 20;
  const lastIndex = qPage * 20;

  let totalPage = 0;
  let bookSearch = [];
  let bookPage = [];
  try {
    bookSearch = await Books.find({
      name: { $regex: search, $options: "i" },
    }).sort({ createdAt: -1 });

    totalPage = Math.ceil(bookSearch.length / 20);
    bookPage = bookSearch?.slice(firstIndex, lastIndex);
    res.status(200).json({ books: bookPage, totalPage: totalPage });
  } catch (err) {
    res.status(500).json(err);
  }
});

//SEARCH FILTER
router.get("/book/filter", async (req, res) => {
  const search = req.query.search;
  const qSale = req.query.qSale;

  const qPage = parseInt(req.query.qPage);

  const qFrom = parseInt(req.query.qFrom);
  let qTo;

  req.query.qTo === "trở lên"
    ? (qTo = req.query.qTo)
    : (qTo = parseInt(req.query.qTo));

  const firstIndex = (qPage - 1) * 20;
  const lastIndex = qPage * 20;

  let totalPage = 0;
  let books = [];
  let booksPage = [];
  try {
    if (qTo !== "trở lên") {
      books = await Books.find({
        $and: [
          {
            name: { $regex: search, $options: "i" },
          },

          { price: { $gte: qFrom } },
          { price: { $lt: qTo } },
        ],
      }).sort({ createdAt: -1 });
    } else {
      books = await Books.find({
        $and: [
          {
            name: { $regex: search, $options: "i" },
          },
          { price: { $gte: qFrom } },
        ],
      }).sort({ createdAt: -1 });
    }

    totalPage = Math.ceil(books.length / 20);
    booksPage = books?.slice(firstIndex, lastIndex);
    res.status(200).json({ books: booksPage, totalPage: totalPage });
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.get("/category", async (req, res) => {
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

//Cart
router.get("/cart", async (req, res) => {
  const search = req.query.search;
  const qPage = parseInt(req.query.qPage);

  const firstIndex = (qPage - 1) * 10;
  const lastIndex = qPage * 10;

  let totalPage = 0;
  let cartsSearch = [];
  let cartsPage = [];
  try {
    cartsSearch = await Cart.find({
      userId: { $regex: search, $options: "i" },
    }).sort({ createdAt: -1 });

    totalPage = Math.ceil(cartsSearch.length / 10);
    cartsPage = cartsSearch?.slice(firstIndex, lastIndex);
    res.status(200).json({ carts: cartsPage, totalPage: totalPage });
  } catch (err) {
    res.status(500).json(err);
  }
});

//order
router.get("/order", async (req, res) => {
  const search = req.query.search;
  const qPage = parseInt(req.query.qPage);

  const firstIndex = (qPage - 1) * 10;
  const lastIndex = qPage * 10;

  let totalPage = 0;
  let ordersSearch = [];
  let ordersPage = [];
  try {
    ordersSearch = await Order.find({
      $or: [
        { userId: { $regex: search, $options: "i" } },
        { staffId: { $regex: search, $options: "i" } },
      ],
    }).sort({ createdAt: -1 });

    totalPage = Math.ceil(ordersSearch.length / 10);
    ordersPage = ordersSearch?.slice(firstIndex, lastIndex);
    res.status(200).json({ orders: ordersPage, totalPage: totalPage });
  } catch (err) {
    res.status(500).json(err);
  }
});

//post
router.get("/post", async (req, res) => {
  const search = req.query.search;
  const qPage = parseInt(req.query.qPage);

  const firstIndex = (qPage - 1) * 10;
  const lastIndex = qPage * 10;

  let totalPage = 0;
  let postsSearch = [];
  let postsPage = [];
  try {
    postsSearch = await Posts.find({
      title: { $regex: search, $options: "i" },
    }).sort({ createdAt: -1 });

    totalPage = Math.ceil(postsSearch.length / 10);
    postsPage = postsSearch?.slice(firstIndex, lastIndex);
    res.status(200).json({ posts: postsPage, totalPage: totalPage });
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
