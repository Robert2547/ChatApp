import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Parse JSON bodies (from req.body)
app.use(cookieParser()); // Parse cookies

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// // Routes
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// Server
app.listen(PORT, () => {
  connectToMongoDB();
  console.log("Server is running on port ", PORT);
});
