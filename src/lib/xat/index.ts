export * from "./types";
export * from "./dm-data";
export * from "./gk-data";
export * from "./progress-tracker";

import { XAT_DM_CASELETS } from "./dm-data";
import { ALL_XAT_GK_QUESTIONS, XAT_STATIC_GK_QUESTIONS, XAT_CURRENT_AFFAIRS_QUESTIONS } from "./gk-data";
import { DMCaselet, DMCaseletQuestion, GKQuestion } from "./types";

// =========================================================================
// STRICT EXAM ENFORCEMENT & QUESTION GENERATORS
// Requirement 15, 16, 17, 18, 20: Cross-Section Isolation
// =========================================================================

export interface GenerateXATQuestionsParams {
  exam: string;
  section: "Decision Making" | "General Knowledge";
  difficulty?: "EASY" | "MEDIUM" | "HARD" | "XAT_LEVEL" | "XAT_HARD" | "ALL";
  count?: number;
  subtopic?: string;
  timeFilterWindow?: "30_DAYS" | "3_MONTHS" | "6_MONTHS" | "12_MONTHS" | "OLDER" | "ALL";
}

/**
 * Generates Decision Making caselet questions.
 * STRICT ENFORCEMENT: ONLY returns results when exam is "XAT" (case-insensitive).
 * If exam is CAT, NMAT, SNAP, CET or missing, returns [] immediately.
 */
export function generateXATDMQuestions(params: {
  exam: string;
  difficulty?: string;
  count?: number;
  category?: string;
}): DMCaselet[] {
  if (!params.exam || params.exam.toUpperCase() !== "XAT") {
    // Strict isolation enforcement
    return [];
  }

  let pool = [...XAT_DM_CASELETS];

  if (params.category && params.category !== "ALL") {
    pool = pool.filter((c) => c.category.toLowerCase().includes(params.category!.toLowerCase()));
  }

  if (params.difficulty && params.difficulty !== "ALL") {
    pool = pool.filter((c) => c.difficulty === params.difficulty);
  }

  const count = params.count ? Math.min(params.count, pool.length) : pool.length;
  return pool.slice(0, count);
}

/**
 * Generates General Knowledge questions.
 * STRICT ENFORCEMENT: ONLY returns results when exam is "XAT" (case-insensitive).
 * If exam is CAT, NMAT, SNAP, CET or missing, returns [] immediately.
 */
export function generateXATGKQuestions(params: {
  exam: string;
  type?: "ALL" | "STATIC" | "CURRENT_AFFAIRS";
  difficulty?: string;
  timeFilterWindow?: string;
  category?: string;
  count?: number;
}): GKQuestion[] {
  if (!params.exam || params.exam.toUpperCase() !== "XAT") {
    // Strict isolation enforcement
    return [];
  }

  let pool: GKQuestion[] = [];
  if (params.type === "STATIC") {
    pool = [...XAT_STATIC_GK_QUESTIONS];
  } else if (params.type === "CURRENT_AFFAIRS") {
    pool = [...XAT_CURRENT_AFFAIRS_QUESTIONS];
  } else {
    pool = [...ALL_XAT_GK_QUESTIONS];
  }

  if (params.category && params.category !== "ALL") {
    pool = pool.filter((q) => q.category.toLowerCase().includes(params.category!.toLowerCase()));
  }

  if (params.timeFilterWindow && params.timeFilterWindow !== "ALL") {
    pool = pool.filter((q) => (q as any).timeFilterWindow === params.timeFilterWindow);
  }

  if (params.difficulty && params.difficulty !== "ALL") {
    pool = pool.filter((q) => q.difficulty === params.difficulty);
  }

  const count = params.count ? Math.min(params.count, pool.length) : pool.length;
  return pool.slice(0, count);
}

/**
 * Generic question query router with strict exam-isolation security.
 * Rejects any attempt to query Decision Making or General Knowledge without exam === "XAT".
 */
export function routeExamQuestions(params: {
  exam: string;
  section: string;
  topic?: string;
  difficulty?: string;
  count?: number;
}): { success: boolean; data: any[]; error?: string } {
  const normExam = (params.exam || "").toUpperCase();
  const normSection = (params.section || "").toLowerCase();

  const isDM = normSection.includes("decision") || normSection.includes("dm");
  const isGK = normSection.includes("knowledge") || normSection.includes("gk") || normSection.includes("current");

  // STRICT RULE: DM and GK can NEVER be fetched under CAT, NMAT, SNAP, CET or non-XAT exam
  if ((isDM || isGK) && normExam !== "XAT") {
    return {
      success: false,
      data: [],
      error: `Access Denied: Section '${params.section}' is strictly exclusive to XAT and cannot be queried under exam context '${params.exam || "GENERIC"}'.`,
    };
  }

  if (normExam === "XAT") {
    if (isDM) {
      return {
        success: true,
        data: generateXATDMQuestions({ exam: "XAT", difficulty: params.difficulty, count: params.count }),
      };
    }
    if (isGK) {
      return {
        success: true,
        data: generateXATGKQuestions({ exam: "XAT", difficulty: params.difficulty, count: params.count }),
      };
    }
  }

  return { success: true, data: [] };
}

/**
 * Exam-aware search function.
 * If searching inside CAT, NMAT, SNAP, CET, strictly strips any DM or GK hits.
 */
export function searchExamAwareQuestions(params: {
  examContext: string;
  query: string;
}): { title: string; section: string; exam: string; snippet: string; link: string }[] {
  const normExam = (params.examContext || "").toUpperCase();
  const q = params.query.toLowerCase().trim();

  // If user is inside CAT, NMAT, SNAP, CET, return 0 XAT DM and 0 XAT GK results
  if (normExam !== "XAT") {
    return [];
  }

  // Inside XAT, search across DM and GK
  const results: { title: string; section: string; exam: string; snippet: string; link: string }[] = [];

  for (const caselet of XAT_DM_CASELETS) {
    if (
      caselet.title.toLowerCase().includes(q) ||
      caselet.scenario.toLowerCase().includes(q) ||
      caselet.category.toLowerCase().includes(q) ||
      q.includes("decision") ||
      q.includes("dm")
    ) {
      results.push({
        title: caselet.title,
        section: "Decision Making",
        exam: "XAT",
        snippet: caselet.scenario.slice(0, 140) + "...",
        link: `/exams/xat/dm?caselet=${caselet.id}`,
      });
    }
  }

  for (const gk of ALL_XAT_GK_QUESTIONS) {
    if (
      gk.question.toLowerCase().includes(q) ||
      gk.category.toLowerCase().includes(q) ||
      gk.explanation.toLowerCase().includes(q) ||
      q.includes("general knowledge") ||
      q.includes("gk")
    ) {
      results.push({
        title: `XAT GK: ${gk.category}`,
        section: "General Knowledge",
        exam: "XAT",
        snippet: gk.question.slice(0, 140) + "...",
        link: `/exams/xat/gk?q=${gk.id}`,
      });
    }
  }

  return results;
}
