import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { uploadPdf } from "../middlewares/file.middleware.js";
import {
  generateInterviewReportController,
  getAllInterviewReportsController,
  getInterviewReportByIdController,
} from "../controllers/interview.controller.js";

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

/**
 * @route GET /api/v1/interview/report/:interviewId
 * @description get interview report by interviewId.
 * @access private
 */
interviewRouter.get(
  "/report/:interviewId",
  authMiddleware,
  getInterviewReportByIdController,
);

/**
 * @route GET /api/v1/interview
 * @description get all interview reports for the logged in user
 * @access private
 */
interviewRouter.get("/", authMiddleware, getAllInterviewReportsController);

export default interviewRouter;
