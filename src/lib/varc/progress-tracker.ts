import { ConceptUserProgress, VARCConceptId, VARCOverallStats } from "./types";
import { VARC_CONCEPTS } from "./concepts-data";

const STORAGE_KEY = "aptiverse_varc_progress";

const DEFAULT_PROGRESS: Record<VARCConceptId, ConceptUserProgress> = {
  "main-idea": { attempts: 18, correct: 15, accuracy: 83, status: "MASTERED" },
  inference: { attempts: 24, correct: 13, accuracy: 54, status: "PRACTICING" },
  tone: { attempts: 14, correct: 10, accuracy: 71, status: "PRACTICING" },
  purpose: { attempts: 16, correct: 12, accuracy: 75, status: "PRACTICING" },
  strengthen: { attempts: 18, correct: 13, accuracy: 72, status: "PRACTICING" },
  weaken: { attempts: 20, correct: 12, accuracy: 60, status: "PRACTICING" },
  "contextual-vocab": { attempts: 10, correct: 8, accuracy: 80, status: "MASTERED" },
  "logical-conclusions": { attempts: 12, correct: 7, accuracy: 58, status: "LEARNING" },
  "para-jumbles": { attempts: 18, correct: 11, accuracy: 61, status: "PRACTICING" },
  "para-summary": { attempts: 22, correct: 17, accuracy: 77, status: "MASTERED" },
  "odd-one-out": { attempts: 15, correct: 7, accuracy: 47, status: "LEARNING" },
  "sentence-completion": { attempts: 14, correct: 11, accuracy: 79, status: "MASTERED" },
};

/**
 * Retrieve user's concept-by-concept VARC progress from localStorage
 */
export function getStoredVARCProgress(): Record<VARCConceptId, ConceptUserProgress> {
  if (typeof window === "undefined") {
    return DEFAULT_PROGRESS;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROGRESS));
      return DEFAULT_PROGRESS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to read VARC progress:", err);
    return DEFAULT_PROGRESS;
  }
}

/**
 * Update progress after answering a question
 */
export function recordVARCAttempt(conceptId: VARCConceptId, isCorrect: boolean): void {
  if (typeof window === "undefined") return;

  try {
    const current = getStoredVARCProgress();
    const prev = current[conceptId] || {
      attempts: 0,
      correct: 0,
      accuracy: 0,
      status: "NOT_STARTED",
    };

    const newAttempts = prev.attempts + 1;
    const newCorrect = prev.correct + (isCorrect ? 1 : 0);
    const newAccuracy = Math.round((newCorrect / newAttempts) * 100);

    let newStatus: ConceptUserProgress["status"] = "LEARNING";
    if (newAttempts >= 15 && newAccuracy >= 75) {
      newStatus = "MASTERED";
    } else if (newAttempts >= 5) {
      newStatus = "PRACTICING";
    }

    current[conceptId] = {
      attempts: newAttempts,
      correct: newCorrect,
      accuracy: newAccuracy,
      lastAttemptedAt: new Date().toISOString(),
      status: newStatus,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));

    // Dispatch custom event for real-time reactivity
    window.dispatchEvent(
      new CustomEvent("aptiverse_varc_progress_updated", {
        detail: current,
      })
    );
  } catch (err) {
    console.error("Failed to save VARC attempt:", err);
  }
}

/**
 * Calculate holistic VARC performance statistics and weak areas
 */
export function calculateVARCOverallStats(): VARCOverallStats {
  const progress = getStoredVARCProgress();

  let rcAttempts = 0;
  let rcCorrect = 0;
  let vaAttempts = 0;
  let vaCorrect = 0;

  const conceptAccuracies: { id: VARCConceptId; title: string; accuracy: number; attempts: number }[] = [];

  VARC_CONCEPTS.forEach((c) => {
    const p = progress[c.id];
    if (p && p.attempts > 0) {
      if (c.section === "RC") {
        rcAttempts += p.attempts;
        rcCorrect += p.correct;
      } else {
        vaAttempts += p.attempts;
        vaCorrect += p.correct;
      }
      conceptAccuracies.push({
        id: c.id,
        title: c.title,
        accuracy: p.accuracy,
        attempts: p.attempts,
      });
    }
  });

  const rcAccuracy = rcAttempts > 0 ? Math.round((rcCorrect / rcAttempts) * 100) : 0;
  const vaAccuracy = vaAttempts > 0 ? Math.round((vaCorrect / vaAttempts) * 100) : 0;

  // Sort by accuracy ascending to find weakest
  conceptAccuracies.sort((a, b) => a.accuracy - b.accuracy);

  const weakest = conceptAccuracies.length > 0 ? conceptAccuracies[0] : null;
  const strongest = conceptAccuracies.length > 0 ? conceptAccuracies[conceptAccuracies.length - 1] : null;

  // Default recommendation logic based on accuracy & high CAT weightage
  let recommendedFocus = {
    conceptId: (weakest ? weakest.id : "inference") as VARCConceptId,
    title: weakest ? weakest.title : "Inference & Implied Meaning",
    reason: weakest
      ? `Accuracy is currently ${weakest.accuracy}% across ${weakest.attempts} attempts. Prioritizing this will provide the highest percentile jump.`
      : "Inference carries the highest frequency in CAT RC (6-8 questions).",
  };

  return {
    rcAccuracy,
    vaAccuracy,
    totalAttempted: rcAttempts + vaAttempts,
    totalCorrect: rcCorrect + vaCorrect,
    strongestConcept: strongest ? `${strongest.title} (${strongest.accuracy}%)` : "Paragraph Summary",
    weakestConcept: weakest ? `${weakest.title} (${weakest.accuracy}%)` : "Inference",
    recommendedFocus,
  };
}
