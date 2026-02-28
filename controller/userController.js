const User = require("../data/models/user");
const catchAsync = require("../utils/catchAsync");

exports.renderRegister = (req, res) => {
  res.render("register");
};

exports.register = catchAsync(async (req, res) => {
  const { email, username, password } = req.body;
  
  if (!email || !username || !password) {
    req.flash("error", "All fields are required");
    return res.redirect("/auth/register");
  }
  
  try {
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    console.log("Registered user:", registeredUser);
    req.flash("success", "Registration successful! Please log in.");
    res.redirect("/auth/login");
  } catch (error) {
    console.error("Registration error:", error);
    req.flash("error", error.message || "Registration failed");
    res.redirect("/auth/register");
  }
});

exports.renderLogin = (req, res) => {
  res.render("login");
};

exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success", "Logged out successfully");
    res.redirect("/");
  });
};
