// Import Mongoose for MongoDB connection
const mongoose = require("mongoose");

// Connect to MongoDB database
const connectDB = async () => {
  // Check if connection string is provided
  if (!process.env.MONGO_URI) {
    console.warn("MONGO_URI not set");
    return;
  }

  try {
    // Connect to MongoDB using environment variable
    const mongoUri = process.env.MONGO_URI.trim();
    await mongoose.connect(mongoUri);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

// Export function for use in server.js
module.exports = connectDB;
