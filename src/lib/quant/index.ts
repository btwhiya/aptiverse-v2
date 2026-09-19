import { QuantTopicFullData } from "./types";
import { ARITHMETIC_TOPICS } from "./arithmetic";
import { ALGEBRA_TOPICS } from "./algebra";
import { GEOMETRY_TOPICS } from "./geometry";
import { NUMBER_SYSTEM_TOPICS } from "./number-system";
import { MODERN_MATH_TOPICS } from "./modern-math";

export * from "./types";
export * from "./arithmetic";
export * from "./algebra";
export * from "./geometry";
export * from "./number-system";
export * from "./modern-math";

// Master array containing all 21 Quantitative Aptitude topics
export const ALL_QUANT_TOPICS: QuantTopicFullData[] = [
  ...ARITHMETIC_TOPICS,
  ...ALGEBRA_TOPICS,
  ...GEOMETRY_TOPICS,
  ...NUMBER_SYSTEM_TOPICS,
  ...MODERN_MATH_TOPICS
];

// Lookup Map by topic slug
export const QUANT_TOPICS_MAP = new Map<string, QuantTopicFullData>(
  ALL_QUANT_TOPICS.map((topic) => [topic.slug, topic])
);

export function getQuantTopicBySlug(slug: string): QuantTopicFullData | undefined {
  if (QUANT_TOPICS_MAP.has(slug)) {
    return QUANT_TOPICS_MAP.get(slug);
  }
  // Try normalized fallback matches
  const normalized = slug.toLowerCase().replace(/[^a-z0-9]/g, "-");
  for (const [s, topic] of QUANT_TOPICS_MAP.entries()) {
    if (s.includes(normalized) || normalized.includes(s)) {
      return topic;
    }
  }
  // Fallback to first topic
  return ALL_QUANT_TOPICS[0];
}

export function getQuantTopicsByDomain(domain: string): QuantTopicFullData[] {
  return ALL_QUANT_TOPICS.filter((t) => t.domain.toLowerCase().includes(domain.toLowerCase()));
}
