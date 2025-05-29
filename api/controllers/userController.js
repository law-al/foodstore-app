const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const CustomError = require("../utils/customError");

exports.register = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) throw new CustomError("user email already exist", 401);

  user = new User({ firstname, lastname, email, password });
  await user.save();

  const payload = { user: { _id: user._id, role: user.role } };

  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: "40h" },
    (err, token) => {
      if (err) throw new CustomError(err.message, 500); // goes to the next function in the async handler

      res.status(201).json({
        success: true,
        user: {
          _id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          avatar: user.avatar,
          role: user.role,
          location: user.location,
          phone: user.phone,
        },
        token,
      });
    }
  );
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user) throw new CustomError("User does not exist", 401);

  const isMatch = await user.matchPassword(password);

  if (!isMatch) throw new CustomError("Invalid Credentials", 401);

  const payload = { user: { _id: user._id, role: user.role } };

  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: "40h" },
    (err, token) => {
      if (err) throw new CustomError(err.message, 500); // goes to the next function in the async handler

      res.status(201).json({
        success: true,
        user: {
          _id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          avatar: user.avatar,
          role: user.role,
          location: user.location,
          phone: user.phone,
        },
        token,
      });
    }
  );
});

exports.updateUser = asyncHandler(async (req, res) => {
  const { avatar, email, phone, location, postal } = req.body;
  let user;

  user = await User.findOne({ email });
  if (user) throw new CustomError("User email already exist", 404);

  user = await User.findById(req.user._id).select("-password");
  if (!user) throw new CustomError("No user found", 404);

  user.email = email || user.email;
  user.phone = phone || user.phone;
  user.location = location || user.location;
  user.avatar = avatar || user.avatar;
  user.postal = postal || user.postal;

  const updatedUser = await user.save();
  res.json({ success: true, user: updatedUser });
});
