const catchAsync = require("../utils/catchAsync");
const Cart = require("../data/models/cart");
const Order = require("../data/models/order");

exports.getHome = catchAsync(async (req, res) => {
  res.render("index");
});

exports.getCart = catchAsync(async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.render("cart", { cart: null });
  }

  const cart = await Cart.findOne({ user: req.user._id }).populate(
    "items.product"
  );

  res.render("cart", { cart: cart || null });
});

exports.getCheckout = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const cart = await Cart.findOne({ user: userId }).populate("items.product");

  if (!cart || cart.items.length === 0) {
    req.flash("error", "Your cart is empty.");
    return res.redirect("/cart");
  }

  res.render("checkout", { cart });
});

exports.getOrders = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const orders = await Order.find({ user: userId }).populate("items.product").sort({ createdAt: -1 });

  res.render("orders", { orders });
});

exports.getOrderDetail = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const order = await Order.findOne({ _id: id, user: userId }).populate("items.product");

  if (!order) {
    req.flash("error", "Order not found.");
    return res.redirect("/orders");
  }

  res.render("orderDetail", { order });
});
