const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "Please log in first");
    return res.redirect("/auth/login");
  }
  next();
};

const isNotLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/products");
  }
  next();
};

module.exports = { isLoggedIn, isNotLoggedIn };
