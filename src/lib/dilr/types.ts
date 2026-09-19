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
