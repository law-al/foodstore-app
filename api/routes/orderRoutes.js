const express = require("express");
const { protect } = require("../middleware/protect");
const { getOrder, getOrderDetails } = require("../controllers/orderController");
const router = express.Router();

router.route("/").get(protect, getOrder);
router.route("/:id").get(protect, getOrderDetails);

module.exports = router;
