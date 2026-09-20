import { QuestionItem } from "../quant/types";

export type DILRDomain = "Data Interpretation" | "Logical Reasoning";

export interface DILRTopicExplanation {
  title: string;
  slug: string;
  domain: DILRDomain;
  catWeightage: string;
  typicalQuestions: string;
  recommendedTime: string;
  overview: string;
  coreTheorems: {
    heading: string;
    details: string;
  }[];
  keyFormulas: string[];
  catTricks: string[];
  commonTraps: string[];
}

export interface DILRTopicFullData {
  slug: string;
  name: string;
  domain: DILRDomain;
  explanation: DILRTopicExplanation;
  practiceQuestions: QuestionItem[]; // 20 Systematic Practice Questions
  testQuestions: QuestionItem[];     // 20 Systematic Chapter Test Questions
}

export type DILRDifficulty = "FOUNDATION" | "MODERATE" | "CAT" | "CAT_HARD";
export type DILRSection = "DI" | "LR";

export type VisualizationType =
  | "bar"
  | "line"
  | "pie"
  | "mixed"
  | "table"
  | "venn"
  | "network"
  | "arrangement"
  | "tournament"
  | "none"
  | string;

export interface DILRTopicMeta {
  id: string;
  title: string;
  section: DILRSection;
  description: string;
  icon: string;
  catWeightage: string;
  questionStyle: string;
  visualizationType: string;
}

export interface QuestionOption {
  label: string;
  text: string;
}

export interface DILRQuestion {
  id: string;
  questionNumber: number;
  questionText: string;
  questionType: "MCQ" | "TITA";
  options?: QuestionOption[];
  correctAnswer: string;
  explanation: {
    detailed: string;
    steps?: string[];
    shortcut?: string;
    commonMistake?: string;
    observation?: string;
  };
  estimatedTimeSec?: number;
  skillTested?: string;
}

export interface DILRSet {
  id: string;
  section: DILRSection;
  topic: string;
  topicTitle: string;
  difficulty: DILRDifficulty;
  title: string;
  description: string;
  dataset?: any;
  visualizationType?: VisualizationType | string;
  visualizationData?: any;
  conditions?: string[];
  estimatedTimeMin: number;
  questions: DILRQuestion[];
  tags: string[];
}

export interface ValidationResult {
  isValid: boolean;
  valid?: boolean;
  errors: string[];
}

