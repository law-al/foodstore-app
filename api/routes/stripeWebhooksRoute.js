require("dotenv").config();
const express = require("express");
const Stripe = require("stripe");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel"); // Add this missing import

const stripe = Stripe(process.env.STRIPE_KEY);
const webhookRouter = express.Router();

// Get endpoint secret from environment variables
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

async function createOrder(customer, data) {
  const orderItems = JSON.parse(customer.metadata.cart);
  const cartId = customer.metadata.cartId;

  // subtract orderItem quantity from stocks
  for (const item of orderItems) {
    const product = await Product.findById(item.productId);
    if (!product) {
      console.error(`❌ Product with ID ${item.productId} not found.`);
      continue; // Skip this item instead of breaking everything
    }

    // Check if there's enough stock
    if (product.stocks < item.quantity) {
      console.error(`❌ Not enough stock for product ${item.productId}`);
      continue;
    }

    product.stocks -= item.quantity;
    await product.save();
  }

  // clear the logged in user cart
  try {
    const userCart = await Cart.findById(cartId);
    if (userCart) {
      userCart.guestId = null;
      userCart.products = [];
      userCart.totalPrice = 0;
      await userCart.save(); // Add await here
    }
  } catch (error) {
    console.error(`Error clearing cart: ${error.message}`);
  }

  const { address } = data.customer_details;
  const paymentIntent = await stripe.paymentIntents.retrieve(
    data.payment_intent
  );

  // Retrieve the payment method details
  const paymentMethod = await stripe.paymentMethods.retrieve(
    paymentIntent.payment_method
  );

  const newOrder = new Order({
    user: customer.metadata.userId,
    customerId: data.customer,
    paymentIntent: data.payment_intent,
    orderItems,
    shippingAddress: {
      address: address.line1 || address.line2,
      city: address.city,
      postalCode: address.postal_code,
      country: address.country,
    },
    paymentMethod: paymentMethod.type,
    subTotalPrice: data.amount_subtotal,
    totalPrice: data.amount_total,
    isPaid: data.payment_status === "paid",
    paymentStatus: data.payment_status,
  });

  try {
    return await newOrder.save();
  } catch (error) {
    console.error(`Error saving order: ${error.message}`);
    throw error; // Re-throw to handle in the calling function
  }
}

// Important: this middleware needs to come before the routes that need raw body
webhookRouter.post(
  "/webhook",
  express.raw({ type: "application/json" }), // Required for Stripe
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      console.log("Webhook verified");
    } catch (err) {
      console.error(`Webhook Error: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    const data = event.data.object;
    const eventType = event.type;

    if (eventType === "checkout.session.completed") {
      try {
        const customer = await stripe.customers.retrieve(data.customer);

        const savedOrder = await createOrder(customer, data);
        console.log("Processed order:", savedOrder);
      } catch (error) {
        console.error(`Error processing order: ${error.message}`);
        // We still return 200 to Stripe so they don't retry
      }
    }

    res.status(200).end(); // Ensure a proper response
  }
);

module.exports = webhookRouter;
