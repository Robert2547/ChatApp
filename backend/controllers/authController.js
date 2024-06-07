import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import * as jwt from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    // Check if password & confirmPassword match`
    if (password !== confirmPassword) {
      return res.status(400).json({
        status: "error",
        message: "Passwords do not match",
      });
    }

    // Check if user already exists
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({
        status: "error",
        message: "Username already exists",
      });
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    // Create new user
    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender == "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      //Genereate JWT token
      jwt.generateTokenAndSetCookie(newUser._id, res);

      
      await newUser.save(); // Save user to database

      // Send response of successful signup
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid newUser" });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const login = (req, res) => {
  console.log("Login route");
};

export const logout = (req, res) => {
  console.log("Logout route");
};
