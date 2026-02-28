// This module has been refactored. Please use:
// - middleware/auth.js for authentication middleware
// - middleware/locals.js for template locals setup

const { isLoggedIn } = require("./middleware/auth");

module.exports = { isLoggedIn };
