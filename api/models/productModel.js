const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    rating: {
      type: Number,
      min: 1,
      maxx: 5,
      default: 1,
    },

    comment: {
      type: String,
      required: false,
      maxlength: 500,
    },

    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    _id: false,
  }
);

const productSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  name: {
    type: String,
    required: true,
    trim: true,
  },

  price: {
    type: Number,
    required: true,
    min: 0,
  },

  description: {
    type: String,
    maxlength: 1000,
    trim: true,
  },

  images: [
    {
      type: String,
      required: true,
    },
  ],

  category: {
    type: String,
    index: true,
  },

  tags: [
    {
      type: String,
      index: true,
    },
  ],

  stocks: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },

  isAvailable: {
    type: Boolean,
    default: true,
  },

  reviews: [reviewSchema],

  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },

  reviewsCount: {
    type: Number,
    default: 0,
  },

  sku: {
    type: String,
    unique: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

productSchema.pre("save", (next) => {
  this.updatedAt = Date.now();
  next();
});

productSchema.index({ name: "text", description: "text" });

module.exports = mongoose.model("product", productSchema);
