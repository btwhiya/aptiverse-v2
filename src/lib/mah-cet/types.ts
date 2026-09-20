export type MAHCETExamTag = "MAH CET";

export interface MAHCETBaseItem {
  exam: "MAH CET";
  section: "Abstract Reasoning" | "Logical Reasoning" | "Quantitative Aptitude" | "Verbal Ability";
}

// ==========================================
// 1. STRUCTURED FIGURE DATA MODEL (VISUAL-FIRST)
// ==========================================

export type ShapeType =
  | "circle"
  | "square"
  | "triangle"
  | "pentagon"
  | "hexagon"
  | "diamond"
  | "star"
  | "cross"
  | "arrow"
  | "line"
  | "dot"
  | "plus"
  | "crescent"
  | "heart"
  | "l-shape"
  | "t-shape";

export type PositionType =
  | "center"
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export type FillType = "empty" | "filled" | "striped" | "dots" | "half-filled";

export interface FigureElement {
  id: string;
  shape: ShapeType;
  position: PositionType;
  rotation: number; // 0, 45, 90, 135, 180, 225, 270, 315
  fill: FillType;
  size?: "small" | "medium" | "large";
  color?: string; // default white / slate-200
  strokeWidth?: number;
  offsetX?: number; // relative pixel offset
  offsetY?: number;
}

export interface FigureData {
  id: string;
  elements: FigureElement[];
  outerFrame?: "square" | "circle" | "diamond" | "none";
  gridLines?: boolean;
  diagonalLines?: boolean;
  title?: string;
  label?: string; // "1", "2", "3", "A", "B", etc.
}

// ==========================================
// 2. ABSTRACT REASONING QUESTION TYPES
// ==========================================

export type ARQuestionCategory =
  | "Figure Series"
  | "Figure Analogies"
  | "Matching Image Pairs"
  | "Figure Classification"
  | "Missing Figure"
  | "Rotation & Reflection"
  | "Pattern Sequences"
  | "Embedded Figures"
  | "Paper Folding & Cutting";

export type ARDifficulty = "FOUNDATION" | "MAH_CET_LEVEL" | "MAH_CET_HARD";

export interface AROption {
  label: "A" | "B" | "C" | "D" | "E";
  figure: FigureData;
  figurePair?: [FigureData, FigureData]; // for matching image pairs
}

export interface ARBaseQuestion extends MAHCETBaseItem {
  id: string;
  category: ARQuestionCategory;
  difficulty: ARDifficulty;
  prompt: string;
  ruleExplanation: string;
  transformationType: string;
  stepByStepRule: string[];
  options: AROption[];
  correctAnswer: "A" | "B" | "C" | "D" | "E";
  tags: string[];
}

export interface FigureSeriesQuestion extends ARBaseQuestion {
  questionType: "FIGURE_SERIES";
  sequenceFigures: FigureData[]; // Figure 1 -> 2 -> 3 -> 4 -> ?
}

export interface FigureAnalogyQuestion extends ARBaseQuestion {
  questionType: "FIGURE_ANALOGY";
  pairA: [FigureData, FigureData]; // A : B
  figureC: FigureData;             // :: C : ?
}

export interface MatchingPairsQuestion extends ARBaseQuestion {
  questionType: "MATCHING_PAIRS";
  referencePair: [FigureData, FigureData]; // Reference Transformation
}

export interface FigureClassificationQuestion extends ARBaseQuestion {
  questionType: "FIGURE_CLASSIFICATION";
  // 5 figures where 4 share a property and 1 violates it
  classificationFigures: {
    label: "A" | "B" | "C" | "D" | "E";
    figure: FigureData;
  }[];
  commonProperty: string;
  oddProperty: string;
}

export interface MissingFigureQuestion extends ARBaseQuestion {
  questionType: "MISSING_FIGURE";
  matrix3x3: (FigureData | null)[][]; // 3 rows of 3 columns, exactly one cell is null (marked by '?')
  missingRow: number; // 0, 1, 2
  missingCol: number; // 0, 1, 2
  horizontalRule: string;
  verticalRule: string;
}

export interface RotationReflectionQuestion extends ARBaseQuestion {
  questionType: "ROTATION_REFLECTION";
  sourceFigure: FigureData;
  operationType:
    | "90_CW"
    | "90_ACW"
    | "180"
    | "270_CW"
    | "MIRROR_HORIZONTAL"
    | "WATER_VERTICAL";
}

export type ARQuestion =
  | FigureSeriesQuestion
  | FigureAnalogyQuestion
  | MatchingPairsQuestion
  | FigureClassificationQuestion
  | MissingFigureQuestion
  | RotationReflectionQuestion;

// ==========================================
// 3. ABSTRACT REASONING CURRICULUM CONCEPTS
// ==========================================

export interface ARConceptGuide {
  id: string;
  number: number;
  title: string;
  category: ARQuestionCategory;
  whatIsThis: string;
  howToSolve: string[];
  thinkingMethod: string;
  commonTraps: string[];
  mahCetPerspective: string;
  visualExample: {
    title: string;
    beforeFigure: FigureData;
    transformationRule: string;
    afterFigure: FigureData;
    whyOptimal: string;
  };
}

// ==========================================
// 4. PROGRESS & METRICS TYPES
// ==========================================

export interface ARCategoryAccuracy {
  category: ARQuestionCategory;
  attempted: number;
  correct: number;
  accuracy: number;
  avgTimeSec: number;
}

export interface ARProgressMetrics {
  exam: "MAH CET";
  overallAccuracy: number;
  questionsAttempted: number;
  totalCorrect: number;
  totalIncorrect: number;
  avgTimeSeconds: number;
  categoryPerformance: Record<string, ARCategoryAccuracy>;
  strongConcepts: string[];
  needsPracticeConcepts: string[];
  recentAttempts: {
    id: string;
    questionId: string;
    category: string;
    isCorrect: boolean;
    timeSpentSec: number;
    timestamp: string;
  }[];
}
