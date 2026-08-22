import jwt from "jsonwebtoken";
import { redisClient } from "../config/redis.js";

/**
 * @name authMiddleware
 * @description Verifies JWT token from cookies and checks if it has been blacklisted in Redis
 * @access Private routes
 */
export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - no token provided" });
    }

    // check if token is blacklisted in Redis
    const isBlacklisted = await redisClient.get(`blacklist:${token}`);

    if (isBlacklisted) {
      return res
        .status(401)
        .json({ message: "Unauthorized - token has been invalidated" });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Auth middleware error:", error.message);
    return res.status(401).json({ message: "Unauthorized - invalid token" });
  }
};
