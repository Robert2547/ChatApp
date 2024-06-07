import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Parse JSON bodies (from req.body)

app.use("/api/auth", authRoutes);

// // Routes
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// Server
app.listen(PORT, () => {
  connectToMongoDB();
  console.log("Server is running on port ", PORT);
});
