import { useContext } from "react";
import { InterviewContext } from "../interview.context";
import {
  generateInterviewReport,
  getInterviewReportById,
  getAllInterviewReports,
  GenerateInterviewReportRequest,
  GetInterviewReportByIdRequest,
} from "../services/interview.api.ts";
import { AxiosError } from "axios";
import type { InterviewReport } from "../types/interview.types.ts";

export const useInterview = () => {
  const context = useContext(InterviewContext);
  if (!context) {
    throw new Error("useInterview must be used within InterviewProvider");
  }

  const {
    loading,
    setLoading,
    error,
    setError,
    report,
    setReport,
    reports,
    setReports,
  } = context;

  const generateReport = async ({
    jobDescription,
    selfDescription,
    resume,
  }: GenerateInterviewReportRequest): Promise<InterviewReport | undefined> => {
    setLoading(true);
    setError(null);
    try {
      const response = await generateInterviewReport({
        resume,
        jobDescription,
        selfDescription,
      });

      if (response.success) {
        setReport(response.interviewReport);
        return response.interviewReport;
      }
    } catch (error: unknown) {
      console.log(error);

      if (error instanceof AxiosError) {
        setError(error.response?.data?.message || "Failed to generate report");
      } else {
        setError("Failed to generate report");
      }
    } finally {
      setLoading(false);
    }
  };

  const getReportById = async ({
    interviewId,
  }: GetInterviewReportByIdRequest): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await getInterviewReportById({ interviewId });
      if (response.success) {
        setReport(response.interviewReport);
      }
    } catch (error: unknown) {
      console.log(error);

      if (error instanceof AxiosError) {
        setError(error.response?.data?.message || "Failed to get report");
      } else {
        setError("Failed to get report");
      }
    } finally {
      setLoading(false);
    }
  };

  const getAllReports = async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await getAllInterviewReports();
      if (response.success) {
        setReports(response.interviewReports);
      }
    } catch (error: unknown) {
      console.log(error);

      if (error instanceof AxiosError) {
        setError(error.response?.data?.message || "Failed to get reports");
      } else {
        setError("Failed to get reports");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    report,
    reports,
    generateReport,
    getReportById,
    getAllReports,
  };
};
