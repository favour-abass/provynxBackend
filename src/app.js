const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Backend is running successfully!",
  });
});

// Example API route
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
  });
});

module.exports = app;
