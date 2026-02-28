const { fetchProductsFromAPI } = require("../services/productService");
const catchAsync = require("../utils/catchAsync");

exports.getAllProducts = catchAsync(async (req, res) => {
  let products = await fetchProductsFromAPI();
  const { category, price } = req.query;

  // Apply Category Filter
  if (category) {
    const categories = Array.isArray(category) ? category : [category];
    products = products.filter(p => categories.includes(p.category));
  }

  // Apply Price Filter
  if (price) {
    products = products.filter(p => p.price <= parseFloat(price));
  }

  res.render("products", {
    products,
    filters: { category, price }
  });
});

exports.getProductDetail = catchAsync(async (req, res) => {
  const products = await fetchProductsFromAPI();
  const product = products.find(p => p.id === parseInt(req.params.id));

  if (!product) {
    return res.status(404).render("error", { error: "Product not found" });
  }

  res.render("productDetail", { product });
});
