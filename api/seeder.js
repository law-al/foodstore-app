require("dotenv").config();

const mongoose = require("mongoose");
const User = require("./models/userModel");
const Product = require("./models/productModel");
const productsData = require("./productData.json");
const Cart = require("./models/cartModel");
const Order = require("./models/orderModel");

mongoose.connect(process.env.MONGO_URI);

async function seedData() {
  try {
    // Clear existing data
    await User.deleteMany();
    await Product.deleteMany();
    await Cart.deleteMany();
    await Order.deleteMany();

    // Create a default admin user
    const createdUser = await User.create({
      firstname: "Admin",
      lastname: "Lawal",
      email: "admin@example.com",
      password: "123456",
      role: "admin",
    });

    // Get created user ID
    const userId = createdUser._id;

    // assign userId to products
    const sampleProducts = productsData.map((product) => ({
      ...product,
      user: userId,
    }));

    await Product.insertMany(sampleProducts);
    console.log("Product data seeded successfully");
    process.exit();
  } catch (error) {
    console.log("Error seeding the data: ", error);
    process.exit(1);
  }
}

seedData();
