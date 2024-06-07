import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      // If there is no token, the user is not logged in
      return res
        .status(401)
        .json({ message: "You need to be logged in to access this route" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res
        .status(401)
        .json({ message: "You need to be logged in to access this route" });
    }
    const user = await User.findById(decoded.userId).select("-password"); // Get the user from the database, excluding the password
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; // Attach the user to the request object
    next(); // next() is a function that moves the request to the next middleware in the stack, which is the sendMessage function in this case
  } catch (error) {
    console.log("Error in protectRoute: ", error.message);
    res.status(500).error({ message: error.message });
  }
};

export default protectRoute;
