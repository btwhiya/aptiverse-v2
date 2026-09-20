import { SNAPProgressMetrics, SNAPQuestion, SNAPTopic } from "./types";

const SNAP_STORAGE_KEY = "aptiverse_snap_progress_v1";

export const INITIAL_SNAP_PROGRESS: SNAPProgressMetrics = {
  exam: "SNAP",
  overallAccuracy: 0,
  questionsAttempted: 0,
  totalCorrect: 0,
  totalIncorrect: 0,
  avgTimeSeconds: 0,
  sectionPerformance: {
    verbal: { attempted: 0, correct: 0, accuracy: 0 },
    logicalReasoning: { attempted: 0, correct: 0, accuracy: 0 },
    quantitativeDI: { attempted: 0, correct: 0, accuracy: 0 },
    ethicsValues: { attempted: 0, correct: 0, accuracy: 0 }
  },
  topicPerformance: {},
  strongTopics: [],
  weakTopics: [],
  recentAttempts: []
};

export function getSNAPProgress(): SNAPProgressMetrics {
  if (typeof window === "undefined") {
    return INITIAL_SNAP_PROGRESS;
  }
  try {
    const raw = localStorage.getItem(SNAP_STORAGE_KEY);
    if (!raw) return INITIAL_SNAP_PROGRESS;
    const parsed = JSON.parse(raw);
    if (parsed.exam !== "SNAP") return INITIAL_SNAP_PROGRESS;
    return parsed;
  } catch {
    return INITIAL_SNAP_PROGRESS;
  }
}

export function saveSNAPProgress(metrics: SNAPProgressMetrics): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SNAP_STORAGE_KEY, JSON.stringify(metrics));
  } catch (err) {
    console.error("Failed to save SNAP progress:", err);
  }
}

export function recordSNAPAttempt(
  question: SNAPQuestion,
  isCorrect: boolean,
  timeSpentSec: number
): SNAPProgressMetrics {
  const current = getSNAPProgress();

  const newAttempted = current.questionsAttempted + 1;
  const newCorrect = current.totalCorrect + (isCorrect ? 1 : 0);
  const newIncorrect = current.totalIncorrect + (isCorrect ? 0 : 1);
  const newOverallAcc = Math.round((newCorrect / newAttempted) * 100);

  const prevTotalTime = current.avgTimeSeconds * current.questionsAttempted;
  const newAvgTime = Math.round((prevTotalTime + timeSpentSec) / newAttempted);

  // Section categorizer
  const sectionKey = getSectionKey(question.topic);
  const currentSec = current.sectionPerformance[sectionKey];
  const secAttempted = currentSec.attempted + 1;
  const secCorrect = currentSec.correct + (isCorrect ? 1 : 0);
  const secAcc = Math.round((secCorrect / secAttempted) * 100);

  // Topic metrics
  const topicMap = { ...current.topicPerformance };
  const topicStats = topicMap[question.topic] || {
    topic: question.topic,
    attempted: 0,
    correct: 0,
    accuracy: 0,
    avgTimeSec: 0
  };
  const tAttempted = topicStats.attempted + 1;
  const tCorrect = topicStats.correct + (isCorrect ? 1 : 0);
  const tAcc = Math.round((tCorrect / tAttempted) * 100);
  const tAvgTime = Math.round(
    (topicStats.avgTimeSec * topicStats.attempted + timeSpentSec) / tAttempted
  );

  topicMap[question.topic] = {
    topic: question.topic,
    attempted: tAttempted,
    correct: tCorrect,
    accuracy: tAcc,
    avgTimeSec: tAvgTime
  };

  // Strong / Weak topics
  const strong: string[] = [];
  const weak: string[] = [];
  Object.values(topicMap).forEach(stat => {
    if (stat.attempted >= 2) {
      if (stat.accuracy >= 70) strong.push(stat.topic);
      else if (stat.accuracy < 50) weak.push(stat.topic);
    }
  });

  const updatedRecent = [
    {
      id: `snap-att-${Date.now()}`,
      questionId: question.id,
      topic: question.topic,
      isCorrect,
      timeSpentSec,
      timestamp: new Date().toISOString()
    },
    ...current.recentAttempts.slice(0, 19)
  ];

  const updatedMetrics: SNAPProgressMetrics = {
    exam: "SNAP",
    overallAccuracy: newOverallAcc,
    questionsAttempted: newAttempted,
    totalCorrect: newCorrect,
    totalIncorrect: newIncorrect,
    avgTimeSeconds: newAvgTime,
    sectionPerformance: {
      ...current.sectionPerformance,
      [sectionKey]: {
        attempted: secAttempted,
        correct: secCorrect,
        accuracy: secAcc
      }
    },
    topicPerformance: topicMap,
    strongTopics: strong,
    weakTopics: weak,
    recentAttempts: updatedRecent
  };

  saveSNAPProgress(updatedMetrics);
  return updatedMetrics;
}

export function resetSNAPProgress(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SNAP_STORAGE_KEY);
}

function getSectionKey(
  topic: SNAPTopic
): "verbal" | "logicalReasoning" | "quantitativeDI" | "ethicsValues" {
  switch (topic) {
    case "Reading Comprehension":
    case "Verbal Ability":
    case "Synonyms":
    case "Antonyms":
    case "Para-Jumbles":
    case "Grammar":
    case "Fill-in-the-Blanks":
      return "verbal";

    case "Seating Arrangements":
    case "Syllogisms":
    case "Coding-Decoding":
    case "Blood Relations":
    case "Series Completion":
    case "Puzzles":
      return "logicalReasoning";

    case "Quantitative Ability":
    case "Data Interpretation":
    case "Data Sufficiency":
      return "quantitativeDI";

    case "Ethics, Morality & Values":
      return "ethicsValues";

    default:
      return "logicalReasoning";
  }
}
