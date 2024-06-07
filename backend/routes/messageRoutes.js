import express from "express";
import { sendMessage } from "../controllers/messageController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/send/:id", protectRoute, sendMessage); // protectRoute is a middleware, check if the user is logged in

export default router;
