import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Middleware
app.use("/api/auth", authRoutes);

// Server
app.listen(PORT, () => {
  connectToMongoDB();
  console.log("Server is running on port ${PORT}");
});
