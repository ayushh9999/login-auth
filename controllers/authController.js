const User = require("../models/user");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

// Handle user signup and send verification email
exports.signup = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email is already registered" });
    }

    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    await User.create({
      name,
      email,
      phone,
      password,
      verificationToken
    });

    await sendEmail(email, verificationToken);
    return res.status(201).json({ message: "User registered. Check email to verify." });
  } catch (error) {
    return res.status(500).json({ message: "Signup failed" });
  }
};

// Verify email and mark user as verified
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res.status(404).send("User not found");
    }

    if (!user.verificationToken || user.verificationToken !== token) {
      return res.status(400).send("Invalid verification link");
    }

    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    return res.send("Email Verified Successfully");
  } catch (error) {
    return res.status(400).send("Verification link is invalid or expired");
  }
};

// Authenticate user and return JWT token
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    if (password !== user.password)
      return res.status(400).json({ message: "Invalid credentials" });

    if (!user.isVerified)
      return res.status(403).json({ message: "Please verify your email first." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    return res.json({ message: "Login successful", token });
  } catch (error) {
    return res.status(500).json({ message: "Login failed" });
  }
};

// Get current user's profile (protected route)
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("name email phone isVerified");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch user" });
  }
};
