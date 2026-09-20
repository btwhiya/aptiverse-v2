export type CMATExamTag = "CMAT";

export interface CMATBaseItem {
  exam: "CMAT";
  section: "General Awareness" | "Innovation & Entrepreneurship" | "Quantitative Techniques & DI" | "Logical Reasoning" | "Language Comprehension";
}

// ==========================================
// 1. TOPICS & TAXONOMY
// ==========================================

export type CMATTopic =
  | "Current Affairs"
  | "Static GK"
  | "Economy"
  | "Innovation & Entrepreneurship";

export type CMATDifficulty = "FOUNDATION" | "CMAT_LEVEL" | "CMAT_ADVANCED" | "EASY" | "MEDIUM" | "HARD";

export type CMATCurrentAffairsArticle = {
  id: string;
  title: string;
  summary: string;
  category: string;
  eventDate: string;
  source: string;
  sourceDate?: string;
  lastVerified?: string;
  importance?: string;
  tags: string[];
};

export interface CMATOption {
  label: "A" | "B" | "C" | "D";
  text: string;
}

export interface CMATBaseQuestion extends CMATBaseItem {
  id: string;
  topic: CMATTopic;
  subtopic: string;
  difficulty: CMATDifficulty;
  question: string;
  options: CMATOption[];
  correctAnswer: "A" | "B" | "C" | "D";
  explanation: string;
  estimatedTimeSec: number;
  tags: string[];
  source?: string;
  eventDate?: string;
  sourceDate?: string;
  lastVerified?: string;
  category?: string;
}

export interface CMATCurrentAffairsQuestion extends CMATBaseQuestion {
  topic: "Current Affairs";
  category: "National" | "International" | "Business" | "Sports" | "Science & Tech" | "Appointments" | "Awards" | "Govt Policy";
  eventDate: string;
  source: string;
  lastVerified: string;
}

export interface CMATStaticGKQuestion extends CMATBaseQuestion {
  topic: "Static GK";
  gkDomain: "History" | "Geography" | "Polity & Constitution" | "Important Institutions" | "National Symbols" | "Culture & Heritage" | "Personalities";
}

export interface CMATEconomyQuestion extends CMATBaseQuestion {
  topic: "Economy";
  economyType: "CONCEPTUAL" | "CURRENT_AFFAIRS";
  domain: "Banking & RBI" | "Fiscal Policy & Budget" | "Inflation & GDP" | "Taxation" | "Financial Markets & Terms";
}

export interface CMATInnovationQuestion extends CMATBaseQuestion {
  topic: "Innovation & Entrepreneurship";
  category: "Fundamentals" | "Government Initiatives" | "Business Acumen";
  keyConcept: string;
  schemeDetails?: {
    schemeName: string;
    launchDate: string;
    purpose: string;
    implementingBody: string;
    currentStatus: string;
    source: string;
    lastVerified: string;
  };
}

export type CMATQuestion =
  | CMATCurrentAffairsQuestion
  | CMATStaticGKQuestion
  | CMATEconomyQuestion
  | CMATInnovationQuestion
  | CMATBaseQuestion;

// ==========================================
// 2. CONCEPT GUIDE INTERFACE
// ==========================================

export interface CMATConceptGuide {
  id: string;
  number: number;
  title: string;
  section: "General Awareness" | "Innovation & Entrepreneurship";
  topic: CMATTopic;
  subtopicCategory: string;
  whatIsIt: string;
  simpleExplanation: string;
  example: string;
  importantFacts: string[];
  schemeDetails?: {
    schemeName: string;
    launchDate: string;
    purpose: string;
    implementingBody: string;
    currentStatus: string;
    lastVerified: string;
  };
  quickCheckQuestion: {
    question: string;
    options: CMATOption[];
    correctAnswer: "A" | "B" | "C" | "D";
    explanation: string;
  };
  cmatLevelPractice: {
    question: string;
    options: CMATOption[];
    correctAnswer: "A" | "B" | "C" | "D";
    explanation: string;
  };
  cmatPerspective: string;
  commonMistakes: string[];
  revisionTips: string[];
  cmatChallenge?: string;
  lastVerified?: string;
}

// ==========================================
// 3. PROGRESS TRACKING METRICS
// ==========================================

export interface CMATTopicAccuracy {
  topic: string;
  attempted: number;
  correct: number;
  accuracy: number;
  avgTimeSec: number;
}

export interface CMATProgressMetrics {
  exam: "CMAT";
  overallAccuracy: number;
  questionsAttempted: number;
  totalCorrect: number;
  totalIncorrect: number;
  avgTimeSeconds: number;
  generalAwareness: {
    currentAffairs: { attempted: number; correct: number; accuracy: number };
    staticGk: { attempted: number; correct: number; accuracy: number };
    economy: { attempted: number; correct: number; accuracy: number };
  };
  innovationEntrepreneurship: {
    fundamentals: { attempted: number; correct: number; accuracy: number };
    governmentInitiatives: { attempted: number; correct: number; accuracy: number };
    businessAcumen: { attempted: number; correct: number; accuracy: number };
  };
  currentAffairsAccuracy: number;
  staticGKAccuracy: number;
  economyAccuracy: number;
  innovationAccuracy: number;
  questionsCorrect: number;
  topicPerformance: Record<string, CMATTopicAccuracy>;
  strongTopics: string[];
  weakTopics: string[];
  recentAttempts: {
    id: string;
    questionId: string;
    topic: string;
    isCorrect: boolean;
    timeSpentSec: number;
    timestamp: string;
  }[];
}
