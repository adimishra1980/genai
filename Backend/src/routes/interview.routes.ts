import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { uploadPdf } from "../middlewares/file.middleware.js";
import { generateInterviewReportController } from "../controllers/interview.controller.js";


const interviewRouter = express.Router();

/**
 * @route POST /api/v1/interview/
 * @description generate new interview report on the basis of user self description,resume pdf and job description.
 * @access private
 */
interviewRouter.post(
  "/",
  authMiddleware,
  uploadPdf,
  generateInterviewReportController,
);

export default interviewRouter;
