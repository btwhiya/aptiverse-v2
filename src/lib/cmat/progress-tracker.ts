import { CMATProgressMetrics, CMATQuestion } from "./types";

const CMAT_STORAGE_KEY = "aptiverse_cmat_progress_v1";

export const INITIAL_CMAT_PROGRESS: CMATProgressMetrics = {
  exam: "CMAT",
  overallAccuracy: 0,
  questionsAttempted: 0,
  totalCorrect: 0,
  totalIncorrect: 0,
  questionsCorrect: 0,
  avgTimeSeconds: 0,
  currentAffairsAccuracy: 0,
  staticGKAccuracy: 0,
  economyAccuracy: 0,
  innovationAccuracy: 0,
  generalAwareness: {
    currentAffairs: { attempted: 0, correct: 0, accuracy: 0 },
    staticGk: { attempted: 0, correct: 0, accuracy: 0 },
    economy: { attempted: 0, correct: 0, accuracy: 0 },
  },
  innovationEntrepreneurship: {
    fundamentals: { attempted: 0, correct: 0, accuracy: 0 },
    governmentInitiatives: { attempted: 0, correct: 0, accuracy: 0 },
    businessAcumen: { attempted: 0, correct: 0, accuracy: 0 },
  },
  topicPerformance: {},
  strongTopics: [],
  weakTopics: [],
  recentAttempts: [],
};

function ensureAccuracies(metrics: any): CMATProgressMetrics {
  const ga = metrics.generalAwareness || INITIAL_CMAT_PROGRESS.generalAwareness;
  const ie = metrics.innovationEntrepreneurship || INITIAL_CMAT_PROGRESS.innovationEntrepreneurship;

  const caAcc = ga.currentAffairs?.accuracy ?? 0;
  const sgkAcc = ga.staticGk?.accuracy ?? 0;
  const econAcc = ga.economy?.accuracy ?? 0;

  const fundAcc = ie.fundamentals?.accuracy ?? 0;
  const govAcc = ie.governmentInitiatives?.accuracy ?? 0;
  const bizAcc = ie.businessAcumen?.accuracy ?? 0;

  const innoAcc = Math.round((fundAcc + govAcc + bizAcc) / 3);

  return {
    ...INITIAL_CMAT_PROGRESS,
    ...metrics,
    currentAffairsAccuracy: caAcc,
    staticGKAccuracy: sgkAcc,
    economyAccuracy: econAcc,
    innovationAccuracy: innoAcc,
    questionsCorrect: metrics.totalCorrect ?? 0,
  };
}

export function getCMATProgress(): CMATProgressMetrics {
  if (typeof window === "undefined") {
    return ensureAccuracies(INITIAL_CMAT_PROGRESS);
  }
  try {
    const raw = localStorage.getItem(CMAT_STORAGE_KEY);
    if (!raw) return ensureAccuracies(INITIAL_CMAT_PROGRESS);
    const parsed = JSON.parse(raw);
    if (parsed.exam !== "CMAT") return ensureAccuracies(INITIAL_CMAT_PROGRESS);
    return ensureAccuracies(parsed);
  } catch {
    return ensureAccuracies(INITIAL_CMAT_PROGRESS);
  }
}

export function saveCMATProgress(metrics: CMATProgressMetrics): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CMAT_STORAGE_KEY, JSON.stringify(metrics));
  } catch (err) {
    console.error("Failed to save CMAT progress:", err);
  }
}

export function recordCMATAttempt(
  param1: CMATQuestion | { questionId: string; topic: string; isCorrect: boolean; timeSpentSeconds: number; category?: string },
  param2?: boolean,
  param3?: number
): CMATProgressMetrics {
  let questionId: string;
  let topic: string;
  let isCorrect: boolean;
  let timeSpentSec: number;
  let category: string = "Fundamentals";

  if (typeof param2 === "boolean") {
    const q = param1 as CMATQuestion;
    questionId = q.id;
    topic = q.topic;
    isCorrect = param2;
    timeSpentSec = param3 || 60;
    category = (q as any).category || "Fundamentals";
  } else {
    const p = param1 as { questionId: string; topic: string; isCorrect: boolean; timeSpentSeconds: number; category?: string };
    questionId = p.questionId;
    topic = p.topic;
    isCorrect = p.isCorrect;
    timeSpentSec = p.timeSpentSeconds;
    category = p.category || "Fundamentals";
  }

  const current = getCMATProgress();

  const newAttempted = current.questionsAttempted + 1;
  const newCorrect = current.totalCorrect + (isCorrect ? 1 : 0);
  const newIncorrect = current.totalIncorrect + (isCorrect ? 0 : 1);
  const newOverallAcc = Math.round((newCorrect / newAttempted) * 100);

  const prevTotalTime = current.avgTimeSeconds * current.questionsAttempted;
  const newAvgTime = Math.round((prevTotalTime + timeSpentSec) / newAttempted);

  // Deep category update
  const updatedGA = { ...current.generalAwareness };
  const updatedIE = { ...current.innovationEntrepreneurship };

  const normTopic = topic.toLowerCase();
  if (normTopic.includes("current")) {
    const ca = updatedGA.currentAffairs;
    const att = ca.attempted + 1;
    const cor = ca.correct + (isCorrect ? 1 : 0);
    updatedGA.currentAffairs = { attempted: att, correct: cor, accuracy: Math.round((cor / att) * 100) };
  } else if (normTopic.includes("static") || normTopic.includes("gk")) {
    const gk = updatedGA.staticGk;
    const att = gk.attempted + 1;
    const cor = gk.correct + (isCorrect ? 1 : 0);
    updatedGA.staticGk = { attempted: att, correct: cor, accuracy: Math.round((cor / att) * 100) };
  } else if (normTopic.includes("economy")) {
    const econ = updatedGA.economy;
    const att = econ.attempted + 1;
    const cor = econ.correct + (isCorrect ? 1 : 0);
    updatedGA.economy = { attempted: att, correct: cor, accuracy: Math.round((cor / att) * 100) };
  } else if (normTopic.includes("innovation") || normTopic.includes("entrepreneurship") || normTopic.includes("fund") || normTopic.includes("govt") || normTopic.includes("acumen")) {
    if (category.toLowerCase().includes("fund") || normTopic.includes("fund")) {
      const fund = updatedIE.fundamentals;
      const att = fund.attempted + 1;
      const cor = fund.correct + (isCorrect ? 1 : 0);
      updatedIE.fundamentals = { attempted: att, correct: cor, accuracy: Math.round((cor / att) * 100) };
    } else if (category.toLowerCase().includes("govt") || normTopic.includes("govt")) {
      const gov = updatedIE.governmentInitiatives;
      const att = gov.attempted + 1;
      const cor = gov.correct + (isCorrect ? 1 : 0);
      updatedIE.governmentInitiatives = { attempted: att, correct: cor, accuracy: Math.round((cor / att) * 100) };
    } else {
      const biz = updatedIE.businessAcumen;
      const att = biz.attempted + 1;
      const cor = biz.correct + (isCorrect ? 1 : 0);
      updatedIE.businessAcumen = { attempted: att, correct: cor, accuracy: Math.round((cor / att) * 100) };
    }
  }

  // Topic-level map
  const topicKey = topic;
  const topicMap = { ...current.topicPerformance };
  const prevStat = topicMap[topicKey] || {
    topic: topicKey,
    attempted: 0,
    correct: 0,
    accuracy: 0,
    avgTimeSec: 0,
  };
  const tAtt = prevStat.attempted + 1;
  const tCor = prevStat.correct + (isCorrect ? 1 : 0);
  const tAcc = Math.round((tCor / tAtt) * 100);
  const tAvgTime = Math.round((prevStat.avgTimeSec * prevStat.attempted + timeSpentSec) / tAtt);

  topicMap[topicKey] = {
    topic: topicKey,
    attempted: tAtt,
    correct: tCor,
    accuracy: tAcc,
    avgTimeSec: tAvgTime,
  };

  // Strong & Weak classifications
  const strong: string[] = [];
  const weak: string[] = [];
  Object.values(topicMap).forEach((stat) => {
    if (stat.attempted >= 2) {
      if (stat.accuracy >= 70) strong.push(stat.topic);
      else if (stat.accuracy < 50) weak.push(stat.topic);
    }
  });

  const updatedRecent = [
    {
      id: `cmat-att-${Date.now()}`,
      questionId,
      topic,
      isCorrect,
      timeSpentSec,
      timestamp: new Date().toISOString(),
    },
    ...current.recentAttempts.slice(0, 19),
  ];

  const updatedBase: CMATProgressMetrics = {
    exam: "CMAT",
    overallAccuracy: newOverallAcc,
    questionsAttempted: newAttempted,
    totalCorrect: newCorrect,
    totalIncorrect: newIncorrect,
    questionsCorrect: newCorrect,
    avgTimeSeconds: newAvgTime,
    currentAffairsAccuracy: updatedGA.currentAffairs.accuracy,
    staticGKAccuracy: updatedGA.staticGk.accuracy,
    economyAccuracy: updatedGA.economy.accuracy,
    innovationAccuracy: Math.round(
      (updatedIE.fundamentals.accuracy +
        updatedIE.governmentInitiatives.accuracy +
        updatedIE.businessAcumen.accuracy) /
        3
    ),
    generalAwareness: updatedGA,
    innovationEntrepreneurship: updatedIE,
    topicPerformance: topicMap,
    strongTopics: strong,
    weakTopics: weak,
    recentAttempts: updatedRecent,
  };

  saveCMATProgress(updatedBase);
  return updatedBase;
}

export function resetCMATProgress(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CMAT_STORAGE_KEY);
}
