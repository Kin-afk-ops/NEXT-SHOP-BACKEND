const router = require("express").Router();
const {
  verifyTokenUser,
  verifyTokenAnhAuthorizationUser,
} = require("../jwt/verifyTokenUser");

const { verifyTokenAndAdminStaff } = require("../jwt/verifyTokenStaff");
const Cart = require("../models/Cart");

//CREATE
router.post("/", async (req, res) => {
  const newCart = await Cart(req.body);
  try {
    const saveCart = await newCart.save();
    res.status(200).json(saveCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

//UPDATE

// DELETE CART

router.delete("/:id", verifyTokenUser, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET USER CART
router.get("/find/:id", verifyTokenAnhAuthorizationUser, async (req, res) => {
  try {
    const cart = await Cart.find({ userId: req.params.id });

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET CART CHECK

router.get(
  "/find/check/:id",
  verifyTokenAnhAuthorizationUser,
  async (req, res) => {
    try {
      const cart = await Cart.find({
        $and: [{ userId: req.params.id }, { check: true }],
      });

      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

//GET USER CART
router.get("/find/oneCart/:id", verifyTokenUser, async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
});

//UPDATE CART
router.put("/:id", verifyTokenUser, async (req, res) => {
  try {
    // const newCart = req.body;
    const updateCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE
// router.delete("/delete/:id/:cartId", async (req, res) => {
//   const { id, cartId } = req.params;

//   try {
//     const cart = await Cart.findById(id);

//     if (!cart) {
//       return res.status(404).json({ message: "cart not found" });
//     }

//     // Xoá phần tử trong mảng notify với _id tương ứng
//     await cart.products.pull({ productId: cartId });

//     // Lưu lại thông tin cart
//     await cart.save();

//     res.status(200).json({ message: "Đã xoá giỏ hàng" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Lỗi" });
//   }
// });

router.delete("/:id", verifyTokenUser, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ALL
router.get("/", verifyTokenAndAdminStaff, async (req, res) => {
  const qPage = parseInt(req.query.qPage);
  const firstIndex = (qPage - 1) * 30;
  const lastIndex = qPage * 30;

  let totalPage = 0;
  let carts = [];
  let cartsPage = [];

  try {
    carts = await Cart.find().sort({ createdAt: -1 });
    if (qPage) {
      totalPage = Math.ceil(carts.length / 30);
      cartsPage = carts?.slice(firstIndex, lastIndex);
      res.status(200).json({ carts: cartsPage, totalPage: totalPage });
    } else {
      res.status(200).json(carts);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
