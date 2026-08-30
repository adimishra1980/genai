import axios from "axios";
import { InterviewReport } from "../types/interview.types";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export interface GenerateInterviewReportRequest {
  resume: File;
  jobDescription: string;
  selfDescription?: string;
}

export interface GenerateInterviewReportResponse {
  success: boolean;
  message: string;
  interviewReport: InterviewReport;
}

/**
 * @description Service to generate interview report based on user self description, resume and job description.
 */
export const generateInterviewReport = async ({
  resume,
  jobDescription,
  selfDescription,
}: GenerateInterviewReportRequest): Promise<GenerateInterviewReportResponse> => {
  const formData = new FormData();
  formData.append("resume", resume);
  formData.append("jobDescription", jobDescription);
  formData.append("selfDescription", selfDescription ? selfDescription : "");

  const response = await api.post<GenerateInterviewReportResponse>(
    "/api/v1/interview",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
};

export interface GetInterviewReportByIdRequest {
  interviewId: string;
}

export interface GetInterviewReportByIdResponse {
  success: boolean;
  message: string;
  interviewReport: InterviewReport;
}

/**
 * @description Service to get interview report by interviewId.
 */
export const getInterviewReportById = async ({
  interviewId,
}: GetInterviewReportByIdRequest): Promise<GetInterviewReportByIdResponse> => {
  const response = await api.get<GetInterviewReportByIdResponse>(
    `/api/v1/interview/report/${interviewId}`,
  );
  return response.data;
};

export interface GetAllInterviewReportsResponse {
  success: boolean;
  message: string;
  interviewReports: InterviewReport[];
}
/**
 * @description Service to get all interview reports of logged in user.
 */
export const getAllInterviewReports =
  async (): Promise<GetAllInterviewReportsResponse> => {
    const response =
      await api.get<GetAllInterviewReportsResponse>(`/api/v1/interview/`);
    return response.data;
  };
