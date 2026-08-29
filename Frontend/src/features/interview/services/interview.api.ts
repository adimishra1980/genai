import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

interface GenerateInterviewReportRequest {
  resume: File;
  jobDescription: string;
  selfDescription?: string;
}

/**
 * @description Service to generate interview report based on user self description, resume and job description.
 */
export const generateInterviewReport = async ({
  resume,
  jobDescription,
  selfDescription,
}: GenerateInterviewReportRequest) => {
  const formData = new FormData();
  formData.append("resume", resume);
  formData.append("jobDescription", jobDescription);
  formData.append("selfDescription", selfDescription ? selfDescription : "");

  const response = await api.post("/api/v1/interview/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

interface GetInterviewReportByIdRequest {
  interviewId: string;
}

/**
 * @description Service to get interview report by interviewId.
 */
export const getInterviewReportById = async ({
  interviewId,
}: GetInterviewReportByIdRequest) => {
  const response = await api.get(`/api/v1/interview/report/${interviewId}`);
  return response.data;
};

/**
 * @description Service to get all interview reports of logged in user.
 */
export const getAllInterviewReports = async () => {
  const response = await api.get(`/api/v1/interview/`);
  return response.data;
};
