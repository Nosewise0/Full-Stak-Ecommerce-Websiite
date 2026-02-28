const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductDetail);

module.exports = router;
