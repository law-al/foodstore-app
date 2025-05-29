const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
    },

    lastname: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please enter a valid email"],
    },

    password: {
      type: String,
      trim: true,
      required: true,
      minLength: [6, "Password must be more than 6 characters"],
    },

    role: {
      type: String,
      enum: ["admin", "customer"],
      default: "customer",
    },

    avatar: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk_mJF3anBtSdxvJK2vh70H2Jf0zOtBcF3ip2sPWu-o4yLQ7oeSm6g02fHlhKu1YX6Z-g&usqp=CAU",
    },

    location: {
      type: String,
      default: "USA",
      trim: true,
    },

    phone: {
      type: String,
      validate: {
        validator: function (value) {
          return /^\+?[0-9]{7,15}$/.test(value);
        },
        message: "Please enter a valid phone number",
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
