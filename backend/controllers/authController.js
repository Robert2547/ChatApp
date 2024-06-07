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

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ username });
    const isPasswordCorrect =
      user && (await bcrypt.compare(password, user.password)); //Check if password is correct and user exists
    if (!user || !isPasswordCorrect) {
      return res.status(400).json({
        status: "error",
        message: "Invalid username or password",
      });
    }

    // Generate JWT token
    jwt.generateTokenAndSetCookie(user._id, res);

    // Send response of successful login
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login route", error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
      httpOnly: true,
    }); // Clear cookie

    res.status(200).json({
      status: "success",
      message: "User logged out",
    });
  } catch (error) {
    console.log("Error in logout route", error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
