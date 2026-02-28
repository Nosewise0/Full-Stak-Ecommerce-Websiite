const express = require("express");
const router = express.Router();
const cartController = require("../controller/cartController");
const { isLoggedIn } = require("../middleware/auth");

// Add item to cart
router.post("/add/:productId", isLoggedIn, cartController.addToCart);

// Remove item from cart
router.post("/remove/:productId", isLoggedIn, cartController.removeFromCart);

// Update quantity of a cart item
router.post("/update/:productId", isLoggedIn, cartController.updateQuantity);

// Process checkout
router.post("/checkout", isLoggedIn, cartController.processCheckout);

module.exports = router;
