export type SNAPExamTag = "SNAP";

export interface SNAPBaseItem {
  exam: "SNAP";
  section: "General English" | "Analytical & Logical Reasoning" | "Quantitative, Data Interpretation & Data Sufficiency" | "Ethics, Morality & Values";
}

// ==========================================
// 1. QUESTION TYPES & TOPICS
// ==========================================

export type SNAPTopic =
  | "Reading Comprehension"
  | "Verbal Ability"
  | "Synonyms"
  | "Antonyms"
  | "Para-Jumbles"
  | "Grammar"
  | "Fill-in-the-Blanks"
  | "Seating Arrangements"
  | "Syllogisms"
  | "Coding-Decoding"
  | "Blood Relations"
  | "Series Completion"
  | "Puzzles"
  | "Analytical & Logical Reasoning"
  | "Quantitative Ability"
  | "Data Interpretation"
  | "Data Sufficiency"
  | "Ethics, Morality & Values";

export type SNAPDifficulty = "FOUNDATION" | "SNAP_LEVEL" | "SNAP_ADVANCED";

export interface SNAPOption {
  label: "A" | "B" | "C" | "D" | "E";
  text: string;
}

export interface SNAPBaseQuestion extends SNAPBaseItem {
  id: string;
  topic: SNAPTopic;
  subtopic: string;
  difficulty: SNAPDifficulty;
  question: string;
  options: SNAPOption[];
  correctAnswer: "A" | "B" | "C" | "D" | "E";
  explanation: string;
  estimatedTimeSec: number;
  tags: string[];
}

// Specific Question Models

export interface SNAPRCQuestion extends SNAPBaseQuestion {
  passageText: string;
  passageTitle: string;
  testedSkill: "Main Idea" | "Inference" | "Author Purpose" | "Vocabulary in Context" | "Tone";
}

export interface SNAPVocabQuestion extends SNAPBaseQuestion {
  targetWord: string;
  wordMeaning: string;
  exampleSentence: string;
  vocabType: "SYNONYM" | "ANTONYM";
}

export interface SNAPParaJumbleQuestion extends SNAPBaseQuestion {
  sentences: { id: string; text: string }[];
  logicalFlowExplanation: string;
}

export interface SNAPGrammarQuestion extends SNAPBaseQuestion {
  grammarRule: string;
  errorCategory: "Subject-Verb Agreement" | "Modifiers" | "Parallelism" | "Tenses" | "Prepositions" | "Pronoun Reference";
}

export interface SNAPLRQuestion extends SNAPBaseQuestion {
  puzzleType: "Linear Seating" | "Circular Seating" | "Family Tree" | "Coding Scheme" | "Number Pattern" | "Syllogistic Logic";
  constraints?: string[];
  visualData?: any;
}

export interface SNAPDIChartData {
  type: "bar" | "line" | "pie" | "table";
  title: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  categories: string[];
  series: {
    name: string;
    data: number[];
    color?: string;
  }[];
  tableData?: {
    headers: string[];
    rows: (string | number)[][];
  };
}

export interface SNAPDIQuestion extends SNAPBaseQuestion {
  chart: SNAPDIChartData;
  calculationType: "Percentage Growth" | "Ratio Comparison" | "Absolute Difference" | "Average Estimation";
  formulaUsed?: string;
}

export interface SNAPDataSufficiencyQuestion extends SNAPBaseQuestion {
  mainQuestion: string;
  statementI: string;
  statementII: string;
  sufficiencyStatus: "STATEMENT_1_ONLY" | "STATEMENT_2_ONLY" | "BOTH_TOGETHER" | "EACH_ALONE" | "NEITHER_SUFFICIENT";
}

export interface SNAPEthicsQuestion extends SNAPBaseQuestion {
  scenarioText: string;
  stakeholders: string[];
  ethicalDilemma: string;
  keyPrinciple: string;
  whyOtherOptionsWeaker: Record<string, string>;
  commonTrap: string;
}

export type SNAPQuestion =
  | SNAPRCQuestion
  | SNAPVocabQuestion
  | SNAPParaJumbleQuestion
  | SNAPGrammarQuestion
  | SNAPLRQuestion
  | SNAPDIQuestion
  | SNAPDataSufficiencyQuestion
  | SNAPEthicsQuestion
  | SNAPBaseQuestion;

// ==========================================
// 2. CONCEPT GUIDE INTERFACE
// ==========================================

export interface SNAPConceptGuide {
  id: string;
  number: number;
  title: string;
  topic: SNAPTopic;
  section: string;
  simpleExplanation: string;
  workedExample: {
    problem: string;
    stepByStepSolution: string[];
    keyTakeaway: string;
  };
  shortcutsAndTips: string[];
  commonMistakes: string[];
  snapPerspective: string;
  basicPracticeQuestion: {
    question: string;
    options: SNAPOption[];
    correctAnswer: "A" | "B" | "C" | "D";
    explanation: string;
  };
  snapLevelChallenge: {
    question: string;
    options: SNAPOption[];
    correctAnswer: "A" | "B" | "C" | "D";
    explanation: string;
  };
}

// ==========================================
// 3. PROGRESS TRACKING METRICS
// ==========================================

export interface SNAPTopicAccuracy {
  topic: SNAPTopic;
  attempted: number;
  correct: number;
  accuracy: number;
  avgTimeSec: number;
}

export interface SNAPProgressMetrics {
  exam: "SNAP";
  overallAccuracy: number;
  questionsAttempted: number;
  totalCorrect: number;
  totalIncorrect: number;
  avgTimeSeconds: number;
  sectionPerformance: {
    verbal: { attempted: number; correct: number; accuracy: number };
    logicalReasoning: { attempted: number; correct: number; accuracy: number };
    quantitativeDI: { attempted: number; correct: number; accuracy: number };
    ethicsValues: { attempted: number; correct: number; accuracy: number };
  };
  topicPerformance: Record<string, SNAPTopicAccuracy>;
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
