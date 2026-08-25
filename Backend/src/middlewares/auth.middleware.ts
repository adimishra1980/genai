import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import { redisClient } from "../config/redis.js";
import { AuthPayload } from "../types/auth.types.js";

/**
 * @name authMiddleware
 * @description Verifies JWT token from cookies and checks if it has been blacklisted in Redis
 * @access Private routes
 */
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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

    if (process.env.JWT_SECRET === undefined) {
      return res
        .status(500)
        .json({ message: "env vars not configured properly" });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as AuthPayload;
    req.user = decoded;
    next();
  } catch (error: unknown) {
    console.log("Auth middleware error:", error);

    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Token expired" });
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Invalid token" });
    }

    return res.status(401).json({ message: "Unauthorized - invalid token" });
  }
};
