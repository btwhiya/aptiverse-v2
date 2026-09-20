export type VARCSection = "RC" | "VA";
export type VARCDifficulty = "FOUNDATION" | "CAT" | "CAT_HARD";

export type RCConceptId =
  | "main-idea"
  | "inference"
  | "tone"
  | "purpose"
  | "strengthen"
  | "weaken"
  | "contextual-vocab"
  | "logical-conclusions";

export type VAConceptId =
  | "para-jumbles"
  | "para-summary"
  | "odd-one-out"
  | "sentence-completion";

export type VARCConceptId = RCConceptId | VAConceptId;

export type RCGenre =
  | "Philosophy"
  | "Psychology & Sociology"
  | "Business & Economics"
  | "Science & Technology"
  | "Literature, Culture & History";

export interface QuestionOption {
  label: "A" | "B" | "C" | "D";
  text: string;
  distractorReason?: string; // Why this option is wrong (for distractors)
}

export interface QuestionExplanation {
  detailed: string;
  correctReason: string;
  optionsBreakdown: {
    label: "A" | "B" | "C" | "D";
    isCorrect: boolean;
    analysis: string;
  }[];
  catTip: string;
  commonTrap: string;
}

export interface RCQuestion {
  id: string;
  conceptId: RCConceptId;
  questionType: "MCQ";
  prompt: string;
  options: QuestionOption[];
  correctAnswer: "A" | "B" | "C" | "D";
  explanation: QuestionExplanation;
  difficulty: VARCDifficulty;
  skillTested: string;
}

export interface RCPassage {
  id: string;
  title: string;
  genre: RCGenre;
  wordCount: number;
  difficulty: VARCDifficulty;
  keyThemes: string[];
  passageText: string; // Structured into 3-5 distinct paragraphs
  questions: RCQuestion[]; // 4-5 varied questions
}

export interface VAParaJumbleQuestion {
  id: string;
  conceptId: "para-jumbles";
  questionType: "TITA" | "MCQ";
  prompt: string;
  sentences: {
    id: number; // 1, 2, 3, 4, 5
    text: string;
  }[];
  correctSequence: string; // e.g. "3142" or "24135"
  options?: QuestionOption[]; // if MCQ
  explanation: {
    detailed: string;
    structuralPairs: string[]; // e.g. ["3-1: Noun-pronoun pair", "1-4: Cause and effect"]
    openingSentenceReason: string;
    catTip: string;
    commonTrap: string;
    optionsBreakdown?: {
      label: "A" | "B" | "C" | "D";
      isCorrect: boolean;
      analysis: string;
    }[];
  };
  difficulty: VARCDifficulty;
}

export interface VAParaSummaryQuestion {
  id: string;
  conceptId: "para-summary";
  questionType: "MCQ";
  prompt: string;
  paragraph: string;
  options: QuestionOption[];
  correctAnswer: "A" | "B" | "C" | "D";
  explanation: QuestionExplanation;
  difficulty: VARCDifficulty;
}

export interface VAOddOneOutQuestion {
  id: string;
  conceptId: "odd-one-out";
  questionType: "TITA" | "MCQ";
  prompt: string;
  sentences: {
    id: number; // 1, 2, 3, 4, 5
    text: string;
  }[];
  oddSentenceId: number; // The sentence that does not fit
  coherentSequence: string; // The coherent flow of the remaining 4 sentences, e.g. "1352"
  explanation: {
    detailed: string;
    whyOddFails: string;
    coherentNarrativeFlow: string;
    catTip: string;
    commonTrap: string;
  };
  difficulty: VARCDifficulty;
}

export interface VASentenceCompletionQuestion {
  id: string;
  conceptId: "sentence-completion";
  questionType: "MCQ";
  prompt: string;
  paragraphWithBlank: string; // Contains [___] or ends with [___]
  options: QuestionOption[];
  correctAnswer: "A" | "B" | "C" | "D";
  explanation: QuestionExplanation;
  difficulty: VARCDifficulty;
}

export type VAQuestion =
  | VAParaJumbleQuestion
  | VAParaSummaryQuestion
  | VAOddOneOutQuestion
  | VASentenceCompletionQuestion;

export interface ConceptWorkedExample {
  paragraph: string;
  questionPrompt: string;
  options: QuestionOption[];
  correctAnswer: "A" | "B" | "C" | "D" | string;
  explanation: QuestionExplanation;
}

export interface VARCConceptMeta {
  id: VARCConceptId;
  section: VARCSection;
  title: string;
  shortDesc: string;
  catWeightage: "Very High" | "High" | "Medium";
  averageQuestionsInCAT: string;
  whatIsIt: string;
  whyCatTests: string;
  howToIdentify: string[];
  stepByStepMethod: {
    step: number;
    title: string;
    instruction: string;
  }[];
  commonTraps: {
    trapName: string;
    description: string;
    howToAvoid: string;
  }[];
  workedExample: ConceptWorkedExample;
  practiceCount: number;
}

export interface ConceptUserProgress {
  attempts: number;
  correct: number;
  accuracy: number; // 0 - 100
  lastAttemptedAt?: string;
  status: "NOT_STARTED" | "LEARNING" | "PRACTICING" | "MASTERED";
}

export interface VARCOverallStats {
  rcAccuracy: number;
  vaAccuracy: number;
  totalAttempted: number;
  totalCorrect: number;
  strongestConcept: string;
  weakestConcept: string;
  recommendedFocus: {
    conceptId: VARCConceptId;
    title: string;
    reason: string;
  };
}
