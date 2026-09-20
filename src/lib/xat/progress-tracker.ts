import { XATProgressMetrics, RevisionCardStatus } from "./types";

const XAT_PROGRESS_KEY = "aptiverse_xat_progress_v2";

const DEFAULT_XAT_PROGRESS: XATProgressMetrics = {
  exam: "XAT",
  overallAccuracy: 64,
  varcAccuracy: 68,
  dmAccuracy: 61,
  qadiAccuracy: 72,
  gkAccuracy: 54,
  staticGkAccuracy: 64,
  currentAffairsAccuracy: 51,
  dmSetsCompleted: 3,
  gkQuestionsAttempted: 18,
  categoryPerformance: {
    "Economy": { category: "Economy", attempted: 10, correct: 5, accuracy: 50 },
    "International Affairs": { category: "International Affairs", attempted: 8, correct: 4, accuracy: 50 },
    "Business & Corporate": { category: "Business & Corporate", attempted: 12, correct: 8, accuracy: 67 },
    "Polity & Constitution": { category: "Polity & Constitution", attempted: 10, correct: 7, accuracy: 70 },
    "Science & Technology": { category: "Science & Technology", attempted: 9, correct: 6, accuracy: 67 },
    "Sports": { category: "Sports", attempted: 6, correct: 5, accuracy: 83 },
    "Awards & Honors": { category: "Awards & Honors", attempted: 5, correct: 4, accuracy: 80 },
    "History & Geography": { category: "History & Geography", attempted: 8, correct: 5, accuracy: 63 },
  },
  revisionStatusMap: {
    "rev-01": "KNOW",
    "rev-02": "REVIEW",
    "rev-03": "NEED_PRACTICE",
    "rev-04": "KNOW",
    "rev-05": "KNOW",
    "rev-06": "REVIEW",
  },
  weakCategories: ["Economy", "International Affairs"],
  recentPractices: [
    {
      id: "rp-01",
      title: "DM Caselet: GreenPulse Chemical Effluent",
      type: "DM_CASELET",
      score: "3/4 (75%)",
      timestamp: "Today, 09:40 AM",
      link: "/exams/xat/dm",
    },
    {
      id: "rp-02",
      title: "GK: 2025–2026 Current Affairs Sprint",
      type: "GK_CURRENT",
      score: "6/8 (75%)",
      timestamp: "Yesterday, 04:15 PM",
      link: "/exams/xat/gk",
    },
    {
      id: "rp-03",
      title: "QA & DI: Advanced Tables & Caselets",
      type: "QA_DI_SET",
      score: "4/5 (80%)",
      timestamp: "2 days ago",
      link: "/exams/xat#syllabus",
    },
    {
      id: "rp-04",
      title: "VARC: Philosophical RC Inference Set",
      type: "VARC_RC",
      score: "3/4 (75%)",
      timestamp: "3 days ago",
      link: "/learn/varc",
    },
  ],
};

export function getXATProgress(): XATProgressMetrics {
  if (typeof window === "undefined") {
    return DEFAULT_XAT_PROGRESS;
  }
  try {
    const raw = localStorage.getItem(XAT_PROGRESS_KEY);
    if (!raw) {
      localStorage.setItem(XAT_PROGRESS_KEY, JSON.stringify(DEFAULT_XAT_PROGRESS));
      return DEFAULT_XAT_PROGRESS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_XAT_PROGRESS;
  }
}

export function saveXATProgress(metrics: XATProgressMetrics): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(XAT_PROGRESS_KEY, JSON.stringify(metrics));
    window.dispatchEvent(new CustomEvent("xat_progress_updated", { detail: metrics }));
  } catch (err) {
    console.error("Failed to persist XAT progress:", err);
  }
}

export function updateRevisionCardStatus(cardId: string, status: RevisionCardStatus): XATProgressMetrics {
  const current = getXATProgress();
  current.revisionStatusMap[cardId] = status;
  saveXATProgress(current);
  return current;
}

export function recordGKAttempt(params: {
  category: string;
  isCurrentAffairs: boolean;
  isCorrect: boolean;
}): XATProgressMetrics {
  const current = getXATProgress();
  current.gkQuestionsAttempted += 1;

  // Category tracking
  const cat = current.categoryPerformance[params.category] || {
    category: params.category,
    attempted: 0,
    correct: 0,
    accuracy: 0,
  };
  cat.attempted += 1;
  if (params.isCorrect) cat.correct += 1;
  cat.accuracy = Math.round((cat.correct / cat.attempted) * 100);
  current.categoryPerformance[params.category] = cat;

  // Update static vs current affairs
  if (params.isCurrentAffairs) {
    const totalCAAttempts = Object.values(current.categoryPerformance)
      .reduce((acc, c) => acc + c.attempted, 0);
    const totalCACorrect = Object.values(current.categoryPerformance)
      .reduce((acc, c) => acc + c.correct, 0);
    current.currentAffairsAccuracy = Math.round((totalCACorrect / (totalCAAttempts || 1)) * 100);
  } else {
    // Recalculate static accuracy
    const catKeys = Object.keys(current.categoryPerformance);
    const sumAcc = catKeys.reduce((acc, k) => acc + current.categoryPerformance[k].accuracy, 0);
    current.staticGkAccuracy = Math.round(sumAcc / (catKeys.length || 1));
  }

  // Recalculate weak categories (< 60% accuracy)
  current.weakCategories = Object.values(current.categoryPerformance)
    .filter((c) => c.attempted >= 3 && c.accuracy < 60)
    .map((c) => c.category);

  current.gkAccuracy = Math.round((current.staticGkAccuracy + current.currentAffairsAccuracy) / 2);
  saveXATProgress(current);
  return current;
}

export function recordDMAttempt(params: {
  caseletTitle: string;
  scoreFraction: string;
  accuracyPct: number;
}): XATProgressMetrics {
  const current = getXATProgress();
  current.dmSetsCompleted += 1;
  current.dmAccuracy = Math.round((current.dmAccuracy + params.accuracyPct) / 2);
  current.recentPractices.unshift({
    id: `rp-${Date.now()}`,
    title: `DM: ${params.caseletTitle}`,
    type: "DM_CASELET",
    score: params.scoreFraction,
    timestamp: "Just now",
    link: "/exams/xat/dm",
  });
  if (current.recentPractices.length > 6) {
    current.recentPractices.pop();
  }
  saveXATProgress(current);
  return current;
}
