const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const asyncHandler = require("../utils/asyncHandler");
const CustomError = require("../utils/customError");

async function getCart(userId, guestId) {
  if (userId) {
    return await Cart.findOne({ user: userId });
  } else if (guestId) {
    return await Cart.findOne({ guestId });
  } else {
    return null;
  }
}

exports.addToCart = asyncHandler(async (req, res) => {
  const { productId, userId, guestId, quantity } = req.body;

  // Find the product
  const product = await Product.findById(productId);
  if (!product) throw new CustomError("Product does not exist", 404);

  // Check product availability
  if (product.stocks <= 0) {
    product.isAvailable = false;
    await product.save();
    throw new CustomError("Product is out of stock", 400);
  }

  // Validate quantity
  if (!quantity || +quantity <= 0) {
    throw new CustomError("Invalid quantity requested", 400);
  }

  // Find or create cart
  let cart = await getCart(userId, guestId);

  if (!cart) {
    if (quantity > product.stocks)
      throw new CustomError("Product stock exceeded", 400);
    // Create new cart
    cart = new Cart({
      user: userId || null,
      guestId: guestId || "guest_" + Date.now(), // More reliable timestamp
      products: [
        {
          productId,
          name: product.name,
          image: product.images[0],
          price: product.price,
          quantity,
        },
      ],
      totalPrice: product.price * quantity,
    });

    const newCart = await cart.save();
    return res.status(201).json({ success: true, cart: newCart });
  }

  if (quantity > product.stocks)
    throw new CustomError("Product stock exceeded", 400);
  // Find existing product in cart
  const productIndex = cart.products.findIndex(
    (cartProduct) => cartProduct.productId.toString() === productId.toString()
  );

  // Update existing product or add new product
  if (productIndex > -1) {
    const previousQuantity = cart.products[productIndex]?.quantity || 0;
    const currentQuantity = quantity + previousQuantity;
    // Check stock availability
    if (currentQuantity > product.stocks) {
      throw new CustomError("Product stock exceeded", 400);
    }
    cart.products[productIndex].quantity = quantity;
  } else {
    cart.products.push({
      productId,
      name: product.name,
      image: product.images[0],
      price: product.price,
      quantity,
    });
  }

  // Recalculate total price
  cart.totalPrice = cart.products.reduce(
    (acc, cartProduct) => acc + cartProduct.quantity * cartProduct.price,
    0
  );

  const newCart = await cart.save();
  res.status(200).json({ success: true, cart: newCart, stock: product.stocks });
});

exports.updateCart = asyncHandler(async (req, res) => {
  const { productId, userId, guestId, name, quantity } = req.body;

  // Find the product
  const product = await Product.findById(productId);
  if (!product) throw new CustomError("Product not found", 404);

  // Check product availability
  if (product.stocks <= 0) {
    product.isAvailable = false;
    await product.save();
    throw new CustomError("Product is out of stock", 400);
  }

  // Retrieve
  let cart = await getCart(userId, guestId);
  if (!cart) throw new CustomError("Cart not found", 404);

  // Find existing product in cart
  const productIndex = cart.products.findIndex(
    (cartProduct) => cartProduct.productId.toString() === productId.toString()
  );

  if (productIndex > -1) {
    if (quantity > product.stocks) {
      throw new CustomError("Product stock exceeded", 400);
    }
    // Update or remove product from cart
    if (quantity > 0) {
      cart.products[productIndex].quantity = quantity;
    } else {
      cart.products.splice(productIndex, 1);
    }

    // Recalculate total price
    cart.totalPrice = cart.products.reduce(
      (acc, cartProduct) => acc + cartProduct.quantity * cartProduct.price,
      0
    );

    // Save product and cart
    await cart.save();

    res.status(200).json({
      success: true,
      cart,
    });
  } else {
    throw new CustomError("Product not in cart", 404);
  }
});

exports.deleteCart = asyncHandler(async (req, res, quantity) => {
  const { productId, userId, guestId } = req.body;

  const product = await Product.findById(productId);
  if (!product) throw new CustomError("Product not found", 404);

  let cart = await getCart(userId, guestId);
  if (!cart) throw new CustomError("Cart not found", 404);

  const productIndex = cart.products.findIndex(
    (product) => product.productId.toString() === productId.toString()
  );

  if (productIndex > -1) {
    cart.products.splice(productIndex, 1);
  } else {
    throw new CustomError("Product not found in cart", 404);
  }

  cart.totalPrice = cart.products.reduce(
    (acc, cartProduct) => acc + cartProduct.quantity * cartProduct.price,
    0
  );

  await cart.save();
  res.status(200).json({ success: true, cart });
});

exports.getCart = asyncHandler(async (req, res) => {
  const { guestId, userId } = req.query;

  const cart = await getCart(userId, guestId);

  if (!cart) throw new CustomError("Cart not found", 404);

  res.status(200).json({ success: true, cart });
});

exports.mergeCart = asyncHandler(async (req, res) => {
  // 1. Get the guest cart ID from the request
  const { guestId } = req.body;
  // console.log(req.user._id);

  // 2. Find guest cart and user cart
  const guestCart = await Cart.findOne({ guestId });
  const userCart = await Cart.findOne({ user: req.user._id });

  // 3. If guest cart doesn't exist
  if (!guestCart) {
    // Return user's cart if it exists, otherwise throw an error
    if (userCart) {
      return res.status(200).json({ success: true, cart: userCart });
    }
    throw new CustomError("Guest cart not found", 404);
  }

  // 4. Check if guest cart is empty
  if (guestCart.products.length === 0) {
    throw new CustomError("Guest cart is empty", 400);
  }

  // 5. If user already has a cart - MERGE SCENARIO
  if (userCart) {
    // Merge each item from guest cart to user cart
    guestCart.products.forEach((guestItem) => {
      // Find if the item already exists in user's cart
      const existingProductIndex = userCart.products.findIndex(
        (userItem) =>
          userItem.productId.toString() === guestItem.productId.toString() &&
          userItem.name === guestItem.name
      );

      // If product exists, update quantity
      if (existingProductIndex > -1) {
        userCart.products[existingProductIndex].quantity += guestItem.quantity;
      } else {
        // If product doesn't exist, add to user cart
        userCart.products.push(guestItem);
      }
    });

    // Recalculate total price
    userCart.totalPrice = userCart.products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    // Save updated user cart
    await userCart.save();

    // Delete guest cart
    await Cart.findOneAndDelete({ guestId });

    // Return merged cart
    return res.status(200).json({ success: true, cart: userCart });
  }

  // 6. If user doesn't have a cart - SIMPLE TRANSFER SCENARIO
  // Convert guest cart to user cart
  guestCart.user = req.user._id;
  guestCart.guestId = null;
  await guestCart.save();

  // Return transferred cart
  res.status(200).json({ success: true, cart: guestCart });
});
