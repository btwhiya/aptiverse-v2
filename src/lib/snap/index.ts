export * from "./types";
export * from "./snap-concepts-data";
export * from "./snap-questions-data";
export * from "./api-service";
export * from "./progress-tracker";

import { SNAP_CONCEPT_GUIDES } from "./snap-concepts-data";
import { SNAP_QUESTION_BANK } from "./snap-questions-data";
import { SNAPConceptGuide, SNAPDifficulty, SNAPQuestion, SNAPTopic } from "./types";

/**
 * Filter questions with STRICT exam-level enforcement.
 * If exam is not 'SNAP', strictly returns an empty array.
 */
export function getSNAPQuestions(filters: {
  exam: string;
  topic?: SNAPTopic | string;
  difficulty?: SNAPDifficulty | string;
  limit?: number;
}): SNAPQuestion[] {
  if (filters.exam.toUpperCase() !== "SNAP") {
    return [];
  }

  let list = [...SNAP_QUESTION_BANK];

  if (filters.topic) {
    const normTopic = filters.topic.toLowerCase().trim();
    list = list.filter(q => q.topic.toLowerCase().includes(normTopic) || q.subtopic.toLowerCase().includes(normTopic));
  }

  if (filters.difficulty) {
    list = list.filter(q => q.difficulty === filters.difficulty);
  }

  if (filters.limit && filters.limit > 0) {
    list = list.slice(0, filters.limit);
  }

  return list;
}

/**
 * Filter concepts with STRICT exam-level enforcement.
 * If exam is not 'SNAP', strictly returns an empty array.
 */
export function getSNAPConcepts(filters: {
  exam: string;
  topic?: string;
}): SNAPConceptGuide[] {
  if (filters.exam.toUpperCase() !== "SNAP") {
    return [];
  }

  let list = [...SNAP_CONCEPT_GUIDES];

  if (filters.topic) {
    const normTopic = filters.topic.toLowerCase().trim();
    list = list.filter(
      c => c.topic.toLowerCase().includes(normTopic) || c.title.toLowerCase().includes(normTopic)
    );
  }

  return list;
}

/**
 * Strict Search Isolation helper:
 * If active exam is not 'SNAP', SNAP-specific items (e.g., Ethics, Morality, Values) are NEVER returned.
 */
export function searchSNAPAware(
  exam: string,
  query: string
): { questions: SNAPQuestion[]; concepts: SNAPConceptGuide[] } {
  if (exam.toUpperCase() !== "SNAP") {
    return { questions: [], concepts: [] };
  }

  const q = query.toLowerCase().trim();
  if (!q) return { questions: [], concepts: [] };

  const matchedQuestions = SNAP_QUESTION_BANK.filter(
    item =>
      item.question.toLowerCase().includes(q) ||
      item.topic.toLowerCase().includes(q) ||
      item.subtopic.toLowerCase().includes(q) ||
      item.explanation.toLowerCase().includes(q) ||
      item.tags.some(t => t.toLowerCase().includes(q))
  );

  const matchedConcepts = SNAP_CONCEPT_GUIDES.filter(
    c =>
      c.title.toLowerCase().includes(q) ||
      c.topic.toLowerCase().includes(q) ||
      c.simpleExplanation.toLowerCase().includes(q) ||
      c.shortcutsAndTips.some(s => s.toLowerCase().includes(q))
  );

  return {
    questions: matchedQuestions,
    concepts: matchedConcepts
  };
}

/**
 * Identifies if a given topic string belongs exclusively to SNAP (like Ethics, Morality, Values).
 */
export function isSNAPExclusiveTopic(topicOrQuery: string): boolean {
  const norm = topicOrQuery.toLowerCase().trim();
  return (
    norm.includes("ethics") ||
    norm.includes("morality") ||
    norm.includes("values") ||
    norm.includes("behavioral ethics")
  );
}
