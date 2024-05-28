const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

//Router
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const infoUserRoute = require("./routes/infoUser");
const staffRoute = require("./routes/staff");
const infoStaffRoute = require("./routes/infoStaff");
const bookRoute = require("./routes/book");
const infoBookRoute = require("./routes/infoBook");
const orderRoute = require("./routes/order");
const orderSaveRoute = require("./routes/orderSave");
const notificationRoute = require("./routes/notification");
const categoryRoute = require("./routes/category");
const voucherRoute = require("./routes/voucher");
const cartRoute = require("./routes/cart");
const requestRoute = require("./routes/request");
const bossRoute = require("./routes/boss");
const voucherUserRoute = require("./routes/voucherUser");
const postRoute = require("./routes/post");
const postContentRoute = require("./routes/postContent");
const homeRoute = require("./routes/home");
const searchRoute = require("./routes/search");
const commentBook = require("./routes/commentBook");
const imageRouter = require("./routes/image");

const app = express();
app.use(
  cors({ credentials: true, origin: true, exposedHeaders: ["set-cookies"] })
);
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

//connect database
mongoose
  .connect(MONGO_URL)
  .then(console.log("connect to Mongoose"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log("connect to port " + PORT);
});

app.all("/", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/staff", staffRoute);
app.use("/api/book", bookRoute);
app.use("/api/order", orderRoute);
app.use("/api/orderSave", orderSaveRoute);
app.use("/api/infoUser", infoUserRoute);
app.use("/api/infoStaff", infoStaffRoute);
app.use("/api/infoBook", infoBookRoute);
app.use("/api/notification", notificationRoute);
app.use("/api/category", categoryRoute);
app.use("/api/voucher", voucherRoute);
app.use("/api/cart", cartRoute);
app.use("/api/request", requestRoute);
app.use("/api/boss", bossRoute);
app.use("/api/voucherUser", voucherUserRoute);
app.use("/api/post", postRoute);
app.use("/api/postContent", postContentRoute);
app.use("/api/search", searchRoute);
app.use("/api/home", homeRoute);
app.use("/api/commentBook", commentBook);

app.use("/api/image", imageRouter);
