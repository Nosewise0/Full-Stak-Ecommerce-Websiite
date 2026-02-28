const Cart = require("../data/models/cart");

const setLocals = async (req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");

  // Cart badge count
  res.locals.cartCount = 0;
  if (req.isAuthenticated()) {
    try {
      const cart = await Cart.findOne({ user: req.user._id });
      res.locals.cartCount = cart ? cart.items.length : 0;
    } catch (e) {
      res.locals.cartCount = 0;
    }
  }

  next();
};

module.exports = setLocals;
