export type DifficultyLevel = "EASY" | "MEDIUM" | "HARD";
export type QuestionType = "MCQ" | "TITA";

export interface QuestionOption {
  label: string;
  text: string;
}

export interface QuestionItem {
  id: string;
  topicSlug: string;
  questionNumber: number;
  questionType: QuestionType;
  difficulty: DifficultyLevel;
  questionText: string;
  options: QuestionOption[];
  correctAnswer: string;
  estimatedTimeSec: number;
  detailedSolution: string;
  shortcutMethod?: string;
  commonTrap?: string;
  conceptTested: string;
}

export interface TopicExplanation {
  title: string;
  slug: string;
  domain: "Arithmetic" | "Algebra" | "Geometry & Mensuration" | "Number System" | "Modern Math";
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

export interface QuantTopicFullData {
  slug: string;
  name: string;
  domain: "Arithmetic" | "Algebra" | "Geometry & Mensuration" | "Number System" | "Modern Math";
  explanation: TopicExplanation;
  practiceQuestions: QuestionItem[]; // 20 Curated Practice Questions
  testQuestions: QuestionItem[];     // 20 Timed Chapter Test Questions
}
