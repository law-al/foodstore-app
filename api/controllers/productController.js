const Product = require("../models/productModel");
const asyncHandler = require("../utils/asyncHandler");
const CustomError = require("../utils/customError");

exports.addProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    images,
    category,
    tags,
    stocks,
    reviews,
    sku,
  } = req.body;

  const products = new Product({
    user: req.user._id,
    name,
    price,
    description,
    images,
    category,
    tags,
    stocks,
    isAvailable: stocks === 0 ? false : true,
    reviews: reviews.length === 0 ? [] : reviews,
    sku,
  });

  const createdProduct = await products.save();
  res.status(201).json({ success: true, product: createdProduct });
});

exports.updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    images,
    category,
    tags,
    stocks,
    reviews,
    sku,
  } = req.body;

  const { id } = req.params;
  const product = await Product.findById(id);

  if (product) {
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.images = images || product.images;
    product.category = category || product.category;
    product.tags = tags || product.tags;
    product.stocks = stocks || product.stocks;
    product.isAvailable = stocks > 0; // Simplified boolean check
    product.reviews = reviews || product.reviews;
    product.sku = sku || product.sku;

    const updatedProduct = await product.save(); // Save changes to the database

    res.json({
      success: true,
      product: updatedProduct,
    });
  } else {
    throw new CustomError("Product not found", 404);
  }
});

exports.deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (product) {
    await product.deleteOne();
    res.json({ success: true, message: "Product removed" });
  } else {
    throw new CustomError("Product not found", 404);
  }
});

exports.getAllProducts = asyncHandler(async (req, res) => {
  const { category, page, search, sort } = req.query;

  // // Filters
  let query = {};

  if (category && category.toLocaleLowerCase() !== "all") {
    query.category = category;
  }

  if (search) {
    query.$text = { $search: search };
  }

  let result = Product.find(query);

  // // Sorting
  if (sort) {
    const sortOptions = {
      popularity: { averageRating: -1 },
      rating: { averageRating: -1 },
      latest: { createdAt: -1 },
      priceAsc: { price: 1 },
      priceDesc: { price: -1 },
    };

    result = result.sort(sortOptions[sort] || { createdAt: 1 });
  }

  // // Pagination
  // PAGE
  // page 1: skip 0, limit 8
  // page 2: skip 8, limit 8
  // page 3: skip 16, limit 8
  const pageNum = +page || 1;
  const skip = (pageNum - 1) * 8;

  result.skip(skip).limit(8);

  const products = await result.exec();
  const totalItems = await Product.countDocuments(query);
  res.status(200).json({ success: true, products, totalItems });
});

exports.bestSeller = asyncHandler(async (req, res) => {
  const bestSellerProduct = await Product.find({ averageRating: { $ne: null } })
    .sort({ rating: -1 })
    .limit(6);

  if (bestSellerProduct) {
    res.json({ success: true, products: bestSellerProduct });
  } else {
    throw new CustomError("No best seller found", 404);
  }
});

exports.trending = asyncHandler(async (req, res) => {
  const trendingProducts = await Product.find()
    .sort({ createdAt: -1 })
    .limit(6);

  if (trendingProducts) {
    res.json({ success: true, products: trendingProducts });
  } else {
    throw new CustomError("No trending products found", 404);
  }
});

exports.getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);
  if (product) {
    res.status(200).json({ success: true, products: product });
  } else {
    throw new CustomError("Product not found", 404);
  }
});
