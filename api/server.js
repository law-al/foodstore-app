require("dotenv").config();
const express = require("express");
const cors = require("cors");
const CustomError = require("./utils/customError");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./db/connectDb");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const orderRoute = require("./routes/orderRoutes");
const stripe = require("./routes/stripe");
const stripeWebhooks = require("./routes/stripeWebhooksRoute");

process.on("unhandledRejection", (err) => {
  console.log(`Unhandled Rejection occured! Shutting down...`);
  console.error(err.message);

  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.log(`Uncaught Exception occured! Shutting down...`);

  process.exit(1);
});

const app = express();
app.use(cors());
app.use("/api/stripe", stripeWebhooks); //stripe webhooks
app.use(express.json());

app.get("/api/", (req, res) => {
  res.send(" WELCOME TO RABBIT");
});

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/stripe", stripe); //stripe webhooks
app.use("/api/orders", orderRoute); //stripe webhooks

// not found routes
app.all("*", (req, res, next) => {
  const err = new CustomError(`Can't find ${req.originalUrl} on the server`);
  next(err);
});

// global error catcher
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`DB CONNECTED`);
    });
  } catch (error) {
    console.error("Database connection failed!", error);
    process.exit(1); // Exit the process to prevent a broken server
  }
}

start();
