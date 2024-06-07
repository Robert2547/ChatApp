import express from "express";
import * as message from "../controllers/messageController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/send/:id", protectRoute, message.sendMessage); // protectRoute is a middleware, check if the user is logged in
router.get("/:id", protectRoute, message.getMessages);

export default router;
