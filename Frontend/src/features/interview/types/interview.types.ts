export interface TechnicalQuestion {
  question: string;
  intention: string;
  answer: string;
}

export interface BehavioralQuestion {
  question: string;
  intention: string;
  answer: string;
}

export interface SkillGap {
  skill: string;
  severity: "low" | "medium" | "high" | string;
}

export interface PreparationPlanItem {
  day: string;
  focus: string;
  tasks: string[];
  _id: string;
}

export interface InterviewReport {
  _id: string;
  jobDescription: string;
  resume: string;
  selfDescription: string;
  matchScore: number;
  technicalQuestions: TechnicalQuestion[];
  behavioralQuestions: BehavioralQuestion[];
  skillGaps: SkillGap[];
  preparationPlan: PreparationPlanItem[];
  title: string;
  user: string;
  createdAt: string;
  updatedAt: string;
}

