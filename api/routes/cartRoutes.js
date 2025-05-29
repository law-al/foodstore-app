const {
  addToCart,
  updateCart,
  deleteCart,
  getCart,
  mergeCart,
} = require("../controllers/cartController");
const { protect } = require("../middleware/protect");
const router = require("express").Router();

router
  .route("/")
  .post(addToCart)
  .put(updateCart)
  .delete(deleteCart)
  .get(getCart);

router.route("/merge").post(protect, mergeCart);

module.exports = router;
