// Import Express and create router
const express = require("express");
const router = express.Router();

// Import controller functions
const { signup, verifyEmail, login, getMe } = require("../controllers/authController");

// Import auth middleware for protected routes
const authMiddleware = require("../middleware/authMiddleware");

// Import validation middleware
const {
  signupValidation,
  loginValidation,
  handleValidationErrors
} = require("../middleware/validationMiddleware");

// POST /api/signup - Register new user with validation
router.post("/signup", signupValidation, handleValidationErrors, signup);

// GET /api/verify/:token - Verify email with token from link
router.get("/verify/:token", verifyEmail);

// POST /api/login - Login user and return JWT token with validation
router.post("/login", loginValidation, handleValidationErrors, login);

// GET /api/me - Get logged-in user's profile (protected route)
router.get("/me", authMiddleware, getMe);

// Export router
module.exports = router;
