import { createContext, useState } from "react";
import type { InterviewReport } from "./types/interview.types";

interface InterviewContextType {
  loading: boolean;
  error: string | null;
  report: InterviewReport | null;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setReport: React.Dispatch<React.SetStateAction<InterviewReport | null>>;
  reports: InterviewReport[];
  setReports: React.Dispatch<React.SetStateAction<InterviewReport[]>>;
}

export const InterviewContext = createContext<InterviewContextType | undefined>(
  undefined,
);

export const InterviewProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<InterviewReport | null>(null);
  const [reports, setReports] = useState<InterviewReport[]>([]);

  return (
    <InterviewContext.Provider
      value={{ loading, setLoading, error, setError, report, setReport, reports, setReports }}
    >
      {children}
    </InterviewContext.Provider>
  );
};
