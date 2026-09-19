import { DILRTopicFullData } from "./types";
import { DI_TOPICS } from "./di-topics";
import { LR_TOPICS } from "./lr-topics";

export * from "./types";
export * from "./di-topics";
export * from "./lr-topics";

// Master array of all 10 Data Interpretation and Logical Reasoning topics
export const ALL_DILR_TOPICS: DILRTopicFullData[] = [
  ...DI_TOPICS,
  ...LR_TOPICS,
];

// Lookup Map by topic slug
export const DILR_TOPICS_MAP = new Map<string, DILRTopicFullData>(
  ALL_DILR_TOPICS.map((topic) => [topic.slug, topic])
);

export function getDILRTopicBySlug(slug: string): DILRTopicFullData | undefined {
  if (DILR_TOPICS_MAP.has(slug)) {
    return DILR_TOPICS_MAP.get(slug);
  }
  // Try normalized fallback matching
  const normalized = slug.toLowerCase().replace(/[^a-z0-9]/g, "-");
  for (const [s, topic] of DILR_TOPICS_MAP.entries()) {
    if (s.includes(normalized) || normalized.includes(s)) {
      return topic;
    }
  }
  // Fallback to first topic if missing
  return ALL_DILR_TOPICS[0];
}

export function getDILRTopicsByDomain(domain: string): DILRTopicFullData[] {
  if (!domain || domain === "ALL") return ALL_DILR_TOPICS;
  return ALL_DILR_TOPICS.filter((t) => t.domain.toLowerCase().includes(domain.toLowerCase()));
}
