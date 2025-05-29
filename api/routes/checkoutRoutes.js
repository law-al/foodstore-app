const router = require("express").Router();
const {
  createCheckout,
  confirmCheckout,
} = require("../controllers/checkoutController");
const { protect } = require("../middleware/protect");

router.route("/").post(protect, createCheckout);

router.route("/:id").put(protect, confirmCheckout);

module.exports = router;
