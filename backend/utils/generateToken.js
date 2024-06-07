import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  }); // Generate JWT token

  // Set cookie in response
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days, format of milliseconds
    httpOnly: true, // Cookie cannot be accessed by client side scripts, prevnting XSS attacks (Cross Site Scripting)
    sameSite: "strict", // Prevent CSRF attacks (Cross Site Request Forgery)
    secure: process.env.NODE_ENV !== "development", // Cookie will only be set in https in production
  });
};
