import { PDFParse } from "pdf-parse";
import { generateInterviewReport } from "../services/ai.service.js";
import interviewReportModel from "../models/interviewReport.model.js";
import type { Request, Response } from "express";

/**
 * @description Controller to generate interview report based on user self description, resume and job description.
 */
export const generateInterviewReportController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { jobDescription, selfDescription } = req.body;
    if (!jobDescription) {
      return res.status(400).json({
        success: false,
        message: "Job Description is required",
      });
    }
    const resume = req.file;
    if (!resume) {
      return res.status(400).json({
        success: false,
        message: "resume is required",
      });
    }

    const parser = new PDFParse(Uint8Array.from(resume.buffer));
    const resumeContent = await parser.getText();

    const interviewReportByAi = await generateInterviewReport({
      resume: resumeContent.text,
      selfDescription,
      jobDescription,
    });

    const interviewReport = await interviewReportModel.create({
      user: req.user.id,
      resume: resumeContent.text,
      selfDescription,
      jobDescription,
      ...interviewReportByAi,
    });

    if (!interviewReport) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong while creating interview report",
      });
    }
    return res.status(201).json({
      success: true,
      message: "Interview report generated successfully",
      interviewReport,
    });
  } catch (error) {
    console.log("error in generate interview report controller: ", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while generating interview report",
    });
  }
};

/**
 * @description Controller to get interview report by interviewId.
 */
export const getInterviewReportByIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { interviewId } = req.params;
    if (!interviewId) {
      return res.status(400).json({
        success: false,
        message: "interviewId is required",
      });
    }

    const interviewReport = await interviewReportModel.findOne({
      _id: interviewId,
      user: req.user.id,
    });

    if (!interviewReport) {
      return res.status(404).json({
        success: false,
        message: "Interview report not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Interview report fetched successfully",
      interviewReport,
    });
  } catch (error) {
    console.log("Error while fetching interview report");
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching interview report",
    });
  }
};

/**
 * @description Controller to get all interview reports for the logged in user.
 */
export const getAllInterviewReportsController = async (
  req: Request,
  res: Response,
) => {
  try {
    const interviewReports = await interviewReportModel
      .find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .select(
        "-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan",
      );

    if (!interviewReports) {
      return res.status(404).json({
        success: false,
        message: "Interview reports not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Interview reports fetched successfully",
      interviewReports,
    });
  } catch (error) {
    console.log("Error while fetching interview reports");
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching interview reports",
    });
  }
};
