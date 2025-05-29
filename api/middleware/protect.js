const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/userModel");
const CustomError = require("../utils/customError");

exports.protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];

      const payload = jwt.verify(token, process.env.JWT_SECRET);
      if (payload.user._id) {
        req.user = await User.findById(payload.user._id).select("-password");
        // console.log(req.user);
        next();
      } else {
        throw new CustomError("Not Authorized!, token failed", 401);
      }
    } else {
      throw new CustomError("Not Authorized!, no token provided", 401);
    }
  } catch (error) {
    next(error);
  }
};
