import { ARProgressMetrics, ARCategoryAccuracy, ARQuestionCategory } from "./types";

const STORAGE_KEY = "aptiverse_mah_cet_ar_progress_v1";

const INITIAL_CATEGORIES: ARQuestionCategory[] = [
  "Figure Series",
  "Figure Analogies",
  "Matching Image Pairs",
  "Figure Classification",
  "Missing Figure",
  "Rotation & Reflection"
];

function getInitialMetrics(): ARProgressMetrics {
  const categoryPerformance: Record<string, ARCategoryAccuracy> = {};
  INITIAL_CATEGORIES.forEach(cat => {
    categoryPerformance[cat] = {
      category: cat,
      attempted: 0,
      correct: 0,
      accuracy: 0,
      avgTimeSec: 0
    };
  });

  return {
    exam: "MAH CET",
    overallAccuracy: 0,
    questionsAttempted: 0,
    totalCorrect: 0,
    totalIncorrect: 0,
    avgTimeSeconds: 0,
    categoryPerformance,
    strongConcepts: [],
    needsPracticeConcepts: [],
    recentAttempts: []
  };
}

export function loadMAHCETARProgress(): ARProgressMetrics {
  if (typeof window === "undefined") {
    return getInitialMetrics();
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getInitialMetrics();
    const parsed = JSON.parse(raw);
    if (parsed.exam !== "MAH CET") return getInitialMetrics();
    return parsed;
  } catch {
    return getInitialMetrics();
  }
}

export function recordARQuestionAttempt(
  questionId: string,
  category: ARQuestionCategory,
  isCorrect: boolean,
  timeSpentSec: number
): ARProgressMetrics {
  const current = loadMAHCETARProgress();

  current.questionsAttempted += 1;
  if (isCorrect) {
    current.totalCorrect += 1;
  } else {
    current.totalIncorrect += 1;
  }

  // Running average solving time
  current.avgTimeSeconds = Math.round(
    (current.avgTimeSeconds * (current.questionsAttempted - 1) + timeSpentSec) / current.questionsAttempted
  );
  current.overallAccuracy = Math.round((current.totalCorrect / current.questionsAttempted) * 100);

  // Category update
  if (!current.categoryPerformance[category]) {
    current.categoryPerformance[category] = {
      category,
      attempted: 0,
      correct: 0,
      accuracy: 0,
      avgTimeSec: 0
    };
  }

  const cat = current.categoryPerformance[category];
  cat.attempted += 1;
  if (isCorrect) cat.correct += 1;
  cat.accuracy = Math.round((cat.correct / cat.attempted) * 100);
  cat.avgTimeSec = Math.round((cat.avgTimeSec * (cat.attempted - 1) + timeSpentSec) / cat.attempted);

  // Update strong concepts (>= 75% accuracy and >= 2 attempts) and needs practice (< 60% with attempts)
  const strong: string[] = [];
  const needsPractice: string[] = [];

  Object.values(current.categoryPerformance).forEach(c => {
    if (c.attempted >= 2 && c.accuracy >= 75) {
      strong.push(c.category);
    } else if (c.attempted >= 1 && c.accuracy < 60) {
      needsPractice.push(c.category);
    }
  });

  current.strongConcepts = strong;
  current.needsPracticeConcepts = needsPractice;

  // Add to recent attempts (keep last 20)
  current.recentAttempts.unshift({
    id: `attempt_${Date.now()}`,
    questionId,
    category,
    isCorrect,
    timeSpentSec,
    timestamp: new Date().toISOString()
  });
  if (current.recentAttempts.length > 20) {
    current.recentAttempts = current.recentAttempts.slice(0, 20);
  }

  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
      window.dispatchEvent(new Event("mah-cet-ar-progress-updated"));
    } catch (e) {
      console.error("Failed to save MAH CET AR progress:", e);
    }
  }

  return current;
}
