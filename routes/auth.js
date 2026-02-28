const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../controller/userController");
const { isNotLoggedIn } = require("../middleware/auth");

router.get("/register", isNotLoggedIn, userController.renderRegister);
router.post("/register", isNotLoggedIn, userController.register);

router.get("/login", isNotLoggedIn, userController.renderLogin);
router.post(
  "/login",
  isNotLoggedIn,
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/auth/login",
  }),
  (req, res) => {
    req.flash("success", "Welcome back!");
    res.redirect("/products");
  }
);

router.get("/logout", userController.logout);

module.exports = router;
