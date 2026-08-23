import express from "express";
import {
  getMeController,
  loginUserController,
  logoutUserController,
  registerUserController,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

/**
 * @route POST /api/v1/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post("/register", registerUserController);

/**
 * @route POST /api/v1/auth/login
 * @description Login a user with email and password
 * @access Public
 */
authRouter.post("/login", loginUserController);

/**
 * @route GET /api/v1/auth/logout
 * @description clear token from user cookie and add the token in blacklist
 * @access Private
 */
authRouter.get("/logout", authMiddleware, logoutUserController);

/**
 * @route GET /api/auth/get-me
 * @description get the current logged in user details
 * @access private
 */
authRouter.get("/get-me", authMiddleware, getMeController);

export default authRouter;
