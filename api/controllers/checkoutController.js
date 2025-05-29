const Checkout = require("../models/checkoutModel");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const asyncHandler = require("../utils/asyncHandler");

exports.createCheckout = asyncHandler(async (req, res) => {
  const { cartId, shippingAddress, paymentMethod } = req.body;

  // Fetch the specific cart associated with this checkout
  const cart = await Cart.findById(cartId);
  if (!cart || !cart.products || cart.products.length === 0) {
    throw new CustomError("Products not present in cart", 404);
  }

  // Update stock for each product in the cart
  for (const cartItem of cart.products) {
    // Use findById for each product and update its stock
    const product = await Product.findById(cartItem.productId);
    if (product) {
      if (cartItem.quantity > product.stocks) {
        throw new CustomError("Product stock exceeded", 404);
      }
      product.stocks = product.stocks - cartItem.quantity;
      await product.save(); // Save each product individually
    } else {
      throw new CustomError("Products now found in cart", 404);
    }
  }

  const checkoutItems = cart.products;
  const totalPrice = cart.totalPrice;

  const newCheckout = new Checkout({
    user: req.user._id,
    checkoutItems,
    shippingAddress,
    paymentMethod,
    totalPrice,
    paymentStatus: "Pending",
    isPaid: false,
  });

  await newCheckout.save();
  res.status(200).json({ success: true, checkout: newCheckout });
});

// for payment confirmation
exports.confirmCheckout = asyncHandler(async (req, res) => {
  const { paymentStatus, paymentDetails } = req.body;

  const checkout = await Checkout.findById(req.params.id);
  if (!checkout) throw new CustomError("Checkout not found", 404);

  if (paymentStatus === "paid") {
    checkout.isPaid = true;
    checkout.paymentStatus = paymentStatus;
    checkout.paymentDetails = paymentDetails;
    checkout.paidAt = Date.now();
  }

  await checkout.save();
  res.status(200).json({ success: true, checkout });
});

// finalize payment (probably)
exports.finalizeCheckout = asyncHandler(async (req, res) => {
  const { paymentStatus, paymentDetails } = req.body;

  const checkout = await Checkout.findById(req.params.id);
});
