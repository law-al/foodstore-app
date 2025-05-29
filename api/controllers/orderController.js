const Order = require("../models/orderModel");
const asyncHandler = require("../utils/asyncHandler");
const CustomError = require("../utils/customError");

exports.getOrder = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  if (!userId) throw new CustomError("user not logged in");

  const userOrder = await Order.find({ user: userId });
  if (!userOrder) throw new CustomError("User have no order", 404);

  res.status(200).json({ success: true, order: userOrder });
});

exports.getOrderDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const userOrderDetails = await Order.findById(id);
  if (!userOrderDetails) throw new CustomError("Order does not exist", 404);

  res.status(200).json({ success: true, order: userOrderDetails });
});
