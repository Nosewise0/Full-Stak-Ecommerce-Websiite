require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const passport = require("passport");

// Import config and middleware
const connectDB = require("./config/database");
const configurePassport = require("./config/passport");
const sessionConfig = require("./config/session");
const setLocals = require("./middleware/locals");

// Import routes
const pageRoutes = require("./routes/pages");
const productRoutes = require("./routes/products");
const authRoutes = require("./routes/auth");
const cartRoutes = require("./routes/cart");

// Connect to database
connectDB();

// Configure passport
configurePassport();

// View engine setup
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// Session and authentication
app.use(session(sessionConfig));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Set template locals (flash messages, currentUser, cartCount)
app.use(setLocals);

// Routes
app.use("/", pageRoutes);
app.use("/products", productRoutes);
app.use("/auth", authRoutes);
app.use("/cart", cartRoutes);

// 404 handler — no route matched
app.use((req, res) => {
  res.status(404).render("error", { error: "Page not found" });
});

// Real error handler — must have 4 params so Express treats it as error middleware
// This catches any error passed via next(err) from catchAsync
app.use((err, req, res, next) => {
  console.error("APP ERROR:", err.stack || err.message || err);
  const statusCode = err.status || err.statusCode || 500;
  res.status(statusCode).render("error", {
    error: err.message || "Something went wrong",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
