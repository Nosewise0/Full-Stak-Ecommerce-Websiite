const express = require("express");
const router = express.Router();
const pageController = require("../controller/pageController");
const { isLoggedIn } = require("../middleware/auth");

router.get("/", pageController.getHome);
router.get("/cart", pageController.getCart);
router.get("/checkout", isLoggedIn, pageController.getCheckout);
router.get("/orders", isLoggedIn, pageController.getOrders);
router.get("/orders/:id", isLoggedIn, pageController.getOrderDetail);

module.exports = router;
