import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { redisClient } from "../config/redis.js";

/**
 * @name registerUserController
 * @description register a new user, expects username, email and password in the request body
 * @access Public
 */
export const registerUserController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provided username, email and password" });
    }

    const isUserAlreadyExists = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isUserAlreadyExists) {
      return res.status(400).json({
        message: "Account already exists with this email address or username",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: passwordHash,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * @name loginUserController
 * @description login a user, expects email and password in the request body
 * @access Public
 */
 export const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    const user = await userModel.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * @name logoutUserController
 * @description clear token from user cookie and add the token in blacklist
 * @access public
 */
export const logoutUserController = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // decode the token to get expiry time for Redis TTL
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const ttl = decoded.exp - Math.floor(Date.now() / 1000);

    // blacklist the token in Redis with TTL matching remaining expiry
    if (ttl > 0) {
      await redisClient.setex(`blacklist:${token}`, ttl, "true");
    }

    // clear the cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Logout error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * @name getMeController
 * @description get the current logged in user details.
 * @access private
 */
export const getMeController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("-password");
    return res.status(200).json({
      message: "User details fetched successfully",
      user,
    });
  } catch (error) {
    console.log("Error fetching user details:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
