// server.js

const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json());

const connectDatabase = require("./database");

// Connect to MongoDB
connectDatabase();

// Import routes
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const welcomeRoutes = require("./routes/welcomeRoutes");

// Middleware
app.use(express.json());

// Routes
app.use("/api", userRoutes);
app.use("/api", authRoutes);
app.use("/api", testRoutes);
app.use("/api", welcomeRoutes);

// Start the server
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled rejection 💥 shutting down");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
