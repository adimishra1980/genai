import express from "express";
import {
  loginUserController,
  registerUserController,
} from "../controllers/user.controller.js";

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

export default authRouter;
