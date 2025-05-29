require("dotenv").config();

const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const Product = require("../models/productModel");
const CustomError = require("../utils/customError");
const stripe = Stripe(process.env.STRIPE_KEY);

router.post("/create-checkout-session", async (req, res) => {
  console.log(req.body);
  const cartItems = req.body.cart.products;
  const userId = req.body.cart.user;
  const customer = await stripe.customers.create({
    metadata: {
      userId,
      cart: JSON.stringify(cartItems),
      cartId: req.body.cart._id,
    },
  });

  if (!cartItems || cartItems.length === 0)
    throw new CustomError("No product in cart", 404);

  for (const item of cartItems) {
    const product = await Product.findById(item.productId);

    if (!product) throw new CustomError("Product does not exist");

    if (item.quantity > product.stocks)
      throw new CustomError(
        `Only ${product.stocks} units of ${product.name} available.`,
        404
      );
  }

  const line_items = req.body.cart.products.map((product) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
          images: [product.image],
          metadata: {
            id: product.productId,
          },
        },
        unit_amount: product.price * 100,
      },
      quantity: product.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    shipping_address_collection: {
      allowed_countries: ["US", "CA"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 0,
            currency: "usd",
          },
          display_name: "Free shipping",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 1500,
            currency: "usd",
          },
          display_name: "Next day air",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 1,
            },
          },
        },
      },
    ],
    line_items,
    phone_number_collection: {
      enabled: true,
    },
    customer: customer.id,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_URL}/shop`,
  });

  res.send({ url: session.url });
});

module.exports = router;
