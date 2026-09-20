export * from "./types";
export * from "./cmat-concepts-data";
export * from "./cmat-questions-data";
export * from "./api-service";
export * from "./progress-tracker";

import { CMAT_CONCEPT_GUIDES } from "./cmat-concepts-data";
import { CMAT_QUESTION_BANK } from "./cmat-questions-data";
import { CMATConceptGuide, CMATDifficulty, CMATQuestion, CMATTopic } from "./types";

/**
 * Filter CMAT questions with STRICT exam-level enforcement.
 * If exam is not 'CMAT', strictly returns an empty array.
 */
export function getCMATQuestions(filters: {
  exam: string;
  topic?: CMATTopic | string;
  difficulty?: CMATDifficulty | string;
  limit?: number;
}): CMATQuestion[] {
  if (filters.exam.toUpperCase() !== "CMAT") {
    return [];
  }

  let list = [...CMAT_QUESTION_BANK];

  if (filters.topic && filters.topic !== "ALL") {
    const normTopic = filters.topic.toLowerCase().trim();
    list = list.filter(
      q =>
        q.topic.toLowerCase().includes(normTopic) ||
        q.subtopic.toLowerCase().includes(normTopic)
    );
  }

  if (filters.difficulty && filters.difficulty !== "ALL") {
    list = list.filter(q => q.difficulty === filters.difficulty);
  }

  if (filters.limit && filters.limit > 0) {
    list = list.slice(0, filters.limit);
  }

  return list;
}

/**
 * Filter CMAT concepts with STRICT exam-level enforcement.
 * If exam is not 'CMAT', strictly returns an empty array.
 */
export function getCMATConcepts(filters: {
  exam: string;
  topic?: string;
}): CMATConceptGuide[] {
  if (filters.exam.toUpperCase() !== "CMAT") {
    return [];
  }

  let list = [...CMAT_CONCEPT_GUIDES];

  if (filters.topic && filters.topic !== "ALL") {
    const normTopic = filters.topic.toLowerCase().trim();
    list = list.filter(
      c =>
        c.topic.toLowerCase().includes(normTopic) ||
        c.title.toLowerCase().includes(normTopic) ||
        c.subtopicCategory.toLowerCase().includes(normTopic)
    );
  }

  return list;
}

/**
 * Strict Search Isolation helper:
 * If active exam is not 'CMAT', CMAT-specific items (e.g., Innovation, Entrepreneurship) are NEVER returned.
 */
export function searchCMATAware(
  exam: string,
  query: string
): { questions: CMATQuestion[]; concepts: CMATConceptGuide[] } {
  if (exam.toUpperCase() !== "CMAT") {
    return { questions: [], concepts: [] };
  }

  const q = query.toLowerCase().trim();
  if (!q) return { questions: [], concepts: [] };

  const matchedQuestions = CMAT_QUESTION_BANK.filter(
    item =>
      item.question.toLowerCase().includes(q) ||
      item.topic.toLowerCase().includes(q) ||
      item.subtopic.toLowerCase().includes(q) ||
      item.explanation.toLowerCase().includes(q) ||
      item.tags.some(t => t.toLowerCase().includes(q))
  );

  const matchedConcepts = CMAT_CONCEPT_GUIDES.filter(
    c =>
      c.title.toLowerCase().includes(q) ||
      c.topic.toLowerCase().includes(q) ||
      c.subtopicCategory.toLowerCase().includes(q) ||
      c.simpleExplanation.toLowerCase().includes(q) ||
      c.importantFacts.some(f => f.toLowerCase().includes(q))
  );

  return {
    questions: matchedQuestions,
    concepts: matchedConcepts,
  };
}

/**
 * Identifies if a given query or topic belongs exclusively to CMAT.
 */
export function isCMATExclusiveTopic(queryOrTopic: string): boolean {
  const norm = queryOrTopic.toLowerCase().trim();
  return (
    norm.includes("entrepreneurship") ||
    norm.includes("intrapreneur") ||
    norm.includes("innovation & entrepreneurship") ||
    norm.includes("startup india") ||
    norm.includes("atal innovation") ||
    norm.includes("business acumen")
  );
}
