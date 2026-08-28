import { PDFParse } from 'pdf-parse';
import { generateInterviewReport } from "../services/ai.service.js";
import interviewReportModel from "../models/interviewReport.model.js";
import type { Request, Response } from 'express';

export const generateInterviewReportController = async (req: Request, res: Response) => {
  try {
    const { selfDescription, jobDescription } = req.body;
    if (!selfDescription || !jobDescription) {
      return res.status(400).json({
        success: false,
        message: "selfDescription and jobDescription is required",
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
