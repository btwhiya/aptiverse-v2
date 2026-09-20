export type XATExamTag = "XAT";

export interface XATBaseItem {
  exam: "XAT";
  section: "Decision Making" | "General Knowledge" | "Verbal Ability & Reading Comprehension" | "Quantitative Ability & Data Interpretation";
}

// ==========================================
// 1. DECISION MAKING (DM) TYPES
// ==========================================

export interface DMOption {
  label: "A" | "B" | "C" | "D" | "E";
  text: string;
}

export interface DMQuestionValidation {
  feasibility: string;
  stakeholderImpact: string;
  fairness: string;
  ethicalConsistency: string;
  organizationalObjective: string;
  riskAssessment: string;
  longTermConsequences: string;
}

export interface DMCaseletQuestion extends XATBaseItem {
  id: string;
  caseletId: string;
  questionNumber: number;
  questionText: string;
  options: DMOption[];
  correctAnswer: "A" | "B" | "C" | "D" | "E";
  explanation: string;
  keyReasoning: string;
  validation: DMQuestionValidation;
  conceptTested: string;
  difficulty: "MODERATE" | "XAT_LEVEL" | "XAT_HARD";
}

export interface DMCaselet extends XATBaseItem {
  id: string;
  title: string;
  category: 
    | "Managerial Caselets"
    | "Business Scenarios"
    | "Workplace Dilemmas"
    | "Ethical Dilemmas"
    | "Resource Allocation"
    | "Fairness & Equity"
    | "Stakeholder Conflicts"
    | "Prioritization & Strategy"
    | "Organizational Decisions"
    | "Personal & Social Decisions";
  difficulty: "MODERATE" | "XAT_LEVEL" | "XAT_HARD";
  scenario: string;
  background: string;
  relevantFacts: string[];
  stakeholders: {
    name: string;
    role: string;
    interest: string;
  }[];
  constraints: string[];
  competingInterests: string[];
  decisionObjective: string;
  questions: DMCaseletQuestion[];
}

export interface DMConceptGuide {
  id: string;
  number: number;
  title: string;
  corePrinciple: string;
  overview: string;
  frameworkSteps: string[];
  decisionRules: string[];
  commonTraps: string[];
  xlriPerspective: string;
  caseletExample: {
    situation: string;
    trapOption: string;
    whyTrap: string;
    optimalOption: string;
    whyOptimal: string;
  };
}

// ==========================================
// 2. GENERAL KNOWLEDGE (GK) TYPES
// ==========================================

export type StaticGKCategory =
  | "Indian History"
  | "World History"
  | "Indian Geography"
  | "World Geography"
  | "Indian Polity"
  | "Constitution"
  | "Economics"
  | "Business & Corporate Knowledge"
  | "Science"
  | "Technology"
  | "Environment"
  | "Awards"
  | "Books & Authors"
  | "Important Organizations"
  | "International Institutions"
  | "Sports"
  | "Culture & Art"
  | "Important Dates"
  | "Government Schemes"
  | "Major Events";

export type CurrentAffairsCategory =
  | "Business"
  | "Economy"
  | "Banking & Finance"
  | "Technology"
  | "Science"
  | "International Affairs"
  | "National Affairs"
  | "Government & Policies"
  | "Corporate Developments"
  | "Awards & Honors"
  | "Sports"
  | "Important Appointments"
  | "Major Summits & Events";

export interface GKOption {
  label: "A" | "B" | "C" | "D" | "E";
  text: string;
}

export interface GKBaseQuestion extends XATBaseItem {
  id: string;
  isCurrentAffairs: boolean;
  question: string;
  options: GKOption[];
  correctAnswer: "A" | "B" | "C" | "D" | "E";
  explanation: string;
  importantFact: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  tags: string[];
}

export interface StaticGKQuestion extends GKBaseQuestion {
  isCurrentAffairs: false;
  category: StaticGKCategory;
  subcategory?: string;
}

export interface CurrentAffairsQuestion extends GKBaseQuestion {
  isCurrentAffairs: true;
  category: CurrentAffairsCategory;
  subcategory?: string;
  eventDate: string; // ISO format: YYYY-MM-DD
  source: string;
  sourceDate: string;
  timeFilterWindow: "30_DAYS" | "3_MONTHS" | "6_MONTHS" | "12_MONTHS" | "OLDER";
  year: number;
}

export type GKQuestion = StaticGKQuestion | CurrentAffairsQuestion;

export interface GKRevisionCard {
  id: string;
  title: string;
  category: string;
  isCurrentAffairs: boolean;
  oneLineFact: string;
  context: string;
  examRelevance: string;
  dateOrEra?: string;
  frequentlyTestedArea: string;
}

export type RevisionCardStatus = "KNOW" | "REVIEW" | "NEED_PRACTICE";

// ==========================================
// 3. PROGRESS & METRICS TYPES
// ==========================

export interface CategoryAccuracy {
  category: string;
  attempted: number;
  correct: number;
  accuracy: number;
}

export interface XATProgressMetrics {
  exam: "XAT";
  overallAccuracy: number;
  varcAccuracy: number;
  dmAccuracy: number;
  qadiAccuracy: number;
  gkAccuracy: number;
  staticGkAccuracy: number;
  currentAffairsAccuracy: number;
  dmSetsCompleted: number;
  gkQuestionsAttempted: number;
  categoryPerformance: Record<string, CategoryAccuracy>;
  revisionStatusMap: Record<string, RevisionCardStatus>;
  weakCategories: string[];
  recentPractices: {
    id: string;
    title: string;
    type: "DM_CASELET" | "GK_CURRENT" | "GK_STATIC" | "QA_DI_SET" | "VARC_RC";
    score: string;
    timestamp: string;
    link: string;
  }[];
}
