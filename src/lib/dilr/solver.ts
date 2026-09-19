import { DILRQuestion, DILRSet, QuestionOption, ValidationResult } from "./types";

/**
 * Validates a DILR set for logical and structural consistency before presenting to user
 */
export function validateDILRSet(set: DILRSet): ValidationResult {
  const errors: string[] = [];

  if (!set.id || !set.title || !set.description) {
    errors.push("Missing core set metadata (id, title, or description).");
  }

  if (!set.questions || set.questions.length < 3) {
    errors.push(`Set must have at least 3 questions (found ${set.questions?.length || 0}).`);
  }

  set.questions.forEach((q, idx) => {
    if (!q.questionText || q.questionText.trim().length < 10) {
      errors.push(`Question #${idx + 1} has empty or trivial question text.`);
    }

    if (!q.correctAnswer || q.correctAnswer.trim() === "") {
      errors.push(`Question #${idx + 1} is missing a correctAnswer.`);
    }

    if (q.questionType === "MCQ") {
      if (!q.options || q.options.length !== 4) {
        errors.push(`Question #${idx + 1} (MCQ) must have exactly 4 options.`);
      } else {
        const labels = q.options.map((o) => o.label);
        const expectedLabels = ["A", "B", "C", "D"];
        const hasAllLabels = expectedLabels.every((l) => labels.includes(l));
        if (!hasAllLabels) {
          errors.push(`Question #${idx + 1} options must be labeled A, B, C, D.`);
        }

        const optionTexts = q.options.map((o) => o.text.trim().toLowerCase());
        const uniqueTexts = new Set(optionTexts);
        if (uniqueTexts.size !== q.options.length) {
          errors.push(`Question #${idx + 1} has duplicate option texts: ${JSON.stringify(q.options)}`);
        }

        if (!expectedLabels.includes(q.correctAnswer)) {
          errors.push(
            `Question #${idx + 1} MCQ correctAnswer '${q.correctAnswer}' is not one of A, B, C, D.`
          );
        }
      }
    } else if (q.questionType === "TITA") {
      // TITA must have numeric or short alpha-numeric answer
      if (q.options && q.options.length > 0) {
        errors.push(`Question #${idx + 1} (TITA) should not have options.`);
      }
      if (Number.isNaN(Number(q.correctAnswer)) && !/^[A-Za-z0-9]+$/.test(q.correctAnswer)) {
        errors.push(`Question #${idx + 1} (TITA) answer must be numeric or valid string.`);
      }
    }

    // Explanation checks
    if (!q.explanation || !q.explanation.detailed) {
      errors.push(`Question #${idx + 1} lacks detailed explanation.`);
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Helper to generate 4 MCQ options with plausible distractors given a numeric or textual answer
 */
export function generateDistractors(
  correctVal: number,
  formatFn: (val: number) => string = (v) => Math.round(v).toString(),
  distractorHints?: {
    inverted?: number;
    offByOne?: number;
    commonTraps?: number[];
  }
): { options: QuestionOption[]; correctLabel: string } {
  const correctText = formatFn(correctVal);
  const candidates: string[] = [];

  // Traps provided by question logic
  if (distractorHints?.commonTraps) {
    distractorHints.commonTraps.forEach((t) => {
      const text = formatFn(t);
      if (text !== correctText && !candidates.includes(text)) {
        candidates.push(text);
      }
    });
  }

  // Common cognitive error patterns in CAT calculations
  const numericTraps = [
    distractorHints?.inverted ?? correctVal * 0.8,
    distractorHints?.offByOne ?? correctVal * 1.15,
    correctVal * 1.25,
    correctVal * 0.75,
    correctVal + (correctVal > 10 ? 5 : 1),
    correctVal - (correctVal > 10 ? 5 : 1),
    correctVal * 0.9,
    correctVal * 1.1,
    correctVal + 10,
    correctVal - 10,
  ];

  for (const trap of numericTraps) {
    if (candidates.length >= 3) break;
    const text = formatFn(trap);
    if (text !== correctText && !candidates.includes(text)) {
      candidates.push(text);
    }
  }

  // Fallback if needed
  let offset = 2;
  while (candidates.length < 3) {
    const text = formatFn(correctVal + offset);
    if (text !== correctText && !candidates.includes(text)) {
      candidates.push(text);
    }
    offset += offset > 0 ? -offset * 2 : Math.abs(offset) + 3;
  }

  // Pick top 3 distractors
  const chosenDistractors = candidates.slice(0, 3);
  const allTexts = [correctText, ...chosenDistractors];

  // Shuffle deterministic or pseudo-random
  shuffleArray(allTexts);

  const labels = ["A", "B", "C", "D"];
  const options: QuestionOption[] = allTexts.map((text, i) => ({
    label: labels[i],
    text,
  }));

  const correctIndex = allTexts.indexOf(correctText);
  const correctLabel = labels[correctIndex];

  return { options, correctLabel };
}

/**
 * Helper to generate string/choice based MCQ options
 */
export function generateCategoricalDistractors(
  correctAnswer: string,
  plausibleAlternatives: string[]
): { options: QuestionOption[]; correctLabel: string } {
  const filtered = plausibleAlternatives.filter((alt) => alt.trim() !== correctAnswer.trim());
  shuffleArray(filtered);
  const chosenDistractors = filtered.slice(0, 3);

  // If not enough alternatives provided, add standard placeholders
  const fallback = ["Cannot be determined", "None of these", "Either A or B", "Both A and C"];
  for (const fb of fallback) {
    if (chosenDistractors.length >= 3) break;
    if (fb !== correctAnswer && !chosenDistractors.includes(fb)) {
      chosenDistractors.push(fb);
    }
  }

  const allItems = [correctAnswer, ...chosenDistractors.slice(0, 3)];
  shuffleArray(allItems);

  const labels = ["A", "B", "C", "D"];
  const options: QuestionOption[] = allItems.map((text, i) => ({
    label: labels[i],
    text,
  }));

  const correctIndex = allItems.indexOf(correctAnswer);
  return {
    options,
    correctLabel: labels[correctIndex],
  };
}

/**
 * In-place Fisher-Yates shuffle
 */
export function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * Random integer within range [min, max] inclusive
 */
export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Pick random item from array
 */
export function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

/**
 * Format currency in Indian format or standard
 */
export function formatINR(val: number): string {
  if (val >= 10000000) {
    return `₹${(val / 10000000).toFixed(2)} Cr`;
  }
  if (val >= 100000) {
    return `₹${(val / 100000).toFixed(2)} Lakh`;
  }
  return `₹${val.toLocaleString("en-IN")}`;
}
