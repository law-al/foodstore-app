const router = require("express").Router();
const {
  getAllProducts,
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  bestSeller,
  trending,
} = require("../controllers/productController");
const { protect } = require("../middleware/protect");

router.route("/").get(getAllProducts).post(protect, addProduct);
router.route("/best-seller").get(bestSeller);
router.route("/trending").get(trending);
router
  .route("/:id")
  .get(getProduct)
  .put(protect, updateProduct)
  .delete(protect, deleteProduct);
module.exports = router;
