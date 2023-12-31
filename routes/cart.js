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

// DELETE

router.delete("/:id", verifyTokenAnhAuthorizationUser, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET USER CART
router.get("/find/:userId", verifyTokenUser, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
});

//UPDATE
router.put("/:id", verifyTokenUser, async (req, res) => {
  try {
    const newCart = req.body;
    const updateCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $push: { products: newCart },
      },
      { new: true }
    );
    res.status(200).json(updateCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE
router.delete("/delete/:id/:cartId", async (req, res) => {
  const { id, cartId } = req.params;

  try {
    const cart = await Cart.findById(id);

    if (!cart) {
      return res.status(404).json({ message: "cart not found" });
    }

    // Xoá phần tử trong mảng notify với _id tương ứng
    cart.product.pull(cartId);

    // Lưu lại thông tin người dùng
    await cart.save();

    res.status(200).json({ message: "Đã xoá giỏ hàng" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi" });
  }
});

//GET ALL
router.get("/", verifyTokenAndAdminStaff, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
