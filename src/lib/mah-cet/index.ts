export * from "./types";
export * from "./figure-renderer";
export * from "./ar-concepts-data";
export * from "./ar-questions-data";
export * from "./progress-tracker";

import { ARQuestion, ARQuestionCategory, ARDifficulty } from "./types";
import { ALL_MAH_CET_AR_QUESTIONS } from "./ar-questions-data";

export interface ARQuestionFilterParams {
  exam: string;
  section?: string;
  category?: ARQuestionCategory;
  difficulty?: ARDifficulty;
  limit?: number;
}

/**
 * ARCHITECTURAL RULE ENFORCEMENT:
 * Abstract Reasoning belongs EXCLUSIVELY to MAH CET.
 * Any request where exam !== "MAH CET" returns an empty array immediately.
 */
export function getMAHCETARQuestions(params: ARQuestionFilterParams): ARQuestion[] {
  // STRICT EXAM-LEVEL RESTRICTION:
  const normalizedExam = (params.exam || "").toUpperCase().replace(/[-_]/g, " ").trim();
  if (normalizedExam !== "MAH CET" && normalizedExam !== "MAHCET") {
    // Zero AR questions for any other exam (CAT, XAT, NMAT, SNAP, etc.)
    return [];
  }

  let results = [...ALL_MAH_CET_AR_QUESTIONS];

  if (params.category) {
    results = results.filter(q => q.category === params.category);
  }
  if (params.difficulty) {
    results = results.filter(q => q.difficulty === params.difficulty);
  }

  if (params.limit && params.limit > 0) {
    results = results.slice(0, params.limit);
  }

  return results;
}

/**
 * Exam-Aware Search Function:
 * If a user searches for Abstract Reasoning while inside CAT, XAT, NMAT, or SNAP,
 * it returns 0 results. It only surfaces AR questions when exam === "MAH CET".
 */
export function searchMAHCETAR(exam: string, query: string): ARQuestion[] {
  const normalizedExam = (exam || "").toUpperCase().replace(/[-_]/g, " ").trim();
  if (normalizedExam !== "MAH CET" && normalizedExam !== "MAHCET") {
    return [];
  }

  const qLower = query.toLowerCase().trim();
  if (!qLower) return [];

  return ALL_MAH_CET_AR_QUESTIONS.filter(q =>
    q.prompt.toLowerCase().includes(qLower) ||
    q.category.toLowerCase().includes(qLower) ||
    q.ruleExplanation.toLowerCase().includes(qLower) ||
    q.transformationType.toLowerCase().includes(qLower) ||
    q.tags.some(t => t.toLowerCase().includes(qLower))
  );
}
