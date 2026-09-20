import { RC_PASSAGES } from "./rc-passages-data";
import {
  VA_PARAJUMBLES,
  VA_SUMMARIES,
  VA_ODD_ONE_OUT,
  VA_SENTENCE_COMPLETIONS,
} from "./va-questions-data";
import { VARC_CONCEPTS } from "./concepts-data";

export interface VARCValidationReport {
  isValid: boolean;
  totalPassages: number;
  totalRCQuestions: number;
  totalVAQuestions: number;
  totalConcepts: number;
  errors: string[];
  warnings: string[];
}

/**
 * Programmatic Validation Engine for CAT VARC
 * Verifies mathematical uniqueness of sequences, valid options, complete explanations,
 * and academic distractor standards.
 */
export function runFullVARCValidation(): VARCValidationReport {
  const errors: string[] = [];
  const warnings: string[] = [];

  // 1. Validate Concepts
  if (VARC_CONCEPTS.length !== 12) {
    errors.push(`Expected 12 concepts (8 RC + 4 VA), found ${VARC_CONCEPTS.length}`);
  }

  VARC_CONCEPTS.forEach((c) => {
    if (!c.id || !c.title || !c.whatIsIt || !c.whyCatTests) {
      errors.push(`Concept ${c.id || "unknown"} is missing mandatory pedagogical fields.`);
    }
    if (!c.stepByStepMethod || c.stepByStepMethod.length < 4) {
      errors.push(`Concept ${c.id} must have at least 4 step-by-step method instructions.`);
    }
    if (!c.commonTraps || c.commonTraps.length < 2) {
      errors.push(`Concept ${c.id} must have at least 2 common traps.`);
    }
    if (!c.workedExample || !c.workedExample.explanation) {
      errors.push(`Concept ${c.id} is missing a worked example with full explanation.`);
    }
  });

  // 2. Validate RC Passages
  let totalRCQuestions = 0;
  if (RC_PASSAGES.length < 10) {
    errors.push(`Expected at least 10 RC passages, found ${RC_PASSAGES.length}`);
  }

  const genreCounts: Record<string, number> = {};

  RC_PASSAGES.forEach((p, pIdx) => {
    genreCounts[p.genre] = (genreCounts[p.genre] || 0) + 1;

    if (!p.id || !p.title || !p.passageText) {
      errors.push(`Passage #${pIdx + 1} is missing metadata or text.`);
    }

    // Word count check
    const words = p.passageText.trim().split(/\s+/).length;
    if (words < 400 || words > 700) {
      warnings.push(`Passage '${p.title}' has ${words} words (expected ~500-600).`);
    }

    if (!p.questions || p.questions.length < 4) {
      errors.push(`Passage '${p.title}' must contain at least 4 questions (found ${p.questions?.length || 0}).`);
    }

    p.questions.forEach((q, qIdx) => {
      totalRCQuestions++;

      if (!q.prompt || q.prompt.trim().length < 10) {
        errors.push(`Passage '${p.title}', Q#${qIdx + 1}: empty or trivial prompt.`);
      }

      if (!q.options || q.options.length !== 4) {
        errors.push(`Passage '${p.title}', Q#${qIdx + 1}: must have exactly 4 options.`);
      } else {
        const labels = q.options.map((o) => o.label);
        const expectedLabels = ["A", "B", "C", "D"];
        if (!expectedLabels.every((l) => labels.includes(l as any))) {
          errors.push(`Passage '${p.title}', Q#${qIdx + 1}: options must be labeled A, B, C, D.`);
        }

        const texts = q.options.map((o) => o.text.trim().toLowerCase());
        const uniqueTexts = new Set(texts);
        if (uniqueTexts.size !== 4) {
          errors.push(`Passage '${p.title}', Q#${qIdx + 1}: duplicate options detected.`);
        }
      }

      if (!["A", "B", "C", "D"].includes(q.correctAnswer)) {
        errors.push(`Passage '${p.title}', Q#${qIdx + 1}: invalid correctAnswer '${q.correctAnswer}'.`);
      }

      if (!q.explanation || !q.explanation.detailed || !q.explanation.correctReason) {
        errors.push(`Passage '${p.title}', Q#${qIdx + 1}: missing explanation or correct reason.`);
      }

      if (!q.explanation?.optionsBreakdown || q.explanation.optionsBreakdown.length !== 4) {
        errors.push(`Passage '${p.title}', Q#${qIdx + 1}: missing 4-option breakdown analysis.`);
      }
    });
  });

  // Check genre variety (at least 2 in each major category)
  const requiredGenres = [
    "Philosophy",
    "Psychology & Sociology",
    "Business & Economics",
    "Science & Technology",
    "Literature, Culture & History",
  ];
  requiredGenres.forEach((g) => {
    const count = genreCounts[g] || 0;
    if (count < 2) {
      errors.push(`Genre '${g}' has only ${count} passages (minimum required: 2).`);
    }
  });

  // 3. Validate VA Para-Jumbles
  if (VA_PARAJUMBLES.length < 10) {
    errors.push(`Expected at least 10 Para-Jumbles, found ${VA_PARAJUMBLES.length}`);
  }

  VA_PARAJUMBLES.forEach((pj, idx) => {
    const len = pj.sentences.length;
    if (len < 4 || len > 5) {
      errors.push(`Para-Jumble #${idx + 1} must have 4 or 5 sentences.`);
    }

    const sentenceIds = pj.sentences.map((s) => s.id.toString());
    const seq = pj.correctSequence.trim();

    if (seq.length !== len) {
      errors.push(`Para-Jumble #${idx + 1} sequence length (${seq.length}) does not match sentence count (${len}).`);
    }

    const seqDigits = seq.split("");
    const hasAllDigits = sentenceIds.every((id) => seqDigits.includes(id));
    if (!hasAllDigits) {
      errors.push(`Para-Jumble #${idx + 1} correctSequence '${seq}' is not a valid permutation of ${sentenceIds.join(",")}.`);
    }

    if (!pj.explanation || !pj.explanation.structuralPairs || pj.explanation.structuralPairs.length === 0) {
      errors.push(`Para-Jumble #${idx + 1} missing structural pairs explanation.`);
    }
  });

  // 4. Validate VA Summaries
  if (VA_SUMMARIES.length < 10) {
    errors.push(`Expected at least 10 Summaries, found ${VA_SUMMARIES.length}`);
  }

  VA_SUMMARIES.forEach((s, idx) => {
    if (!s.paragraph || s.paragraph.trim().length < 50) {
      errors.push(`Summary #${idx + 1} has empty or trivial paragraph.`);
    }
    if (s.options.length !== 4) {
      errors.push(`Summary #${idx + 1} must have 4 options.`);
    }
    if (!["A", "B", "C", "D"].includes(s.correctAnswer)) {
      errors.push(`Summary #${idx + 1} has invalid correctAnswer '${s.correctAnswer}'.`);
    }
  });

  // 5. Validate VA Odd One Out
  if (VA_ODD_ONE_OUT.length < 10) {
    errors.push(`Expected at least 10 Odd One Out questions, found ${VA_ODD_ONE_OUT.length}`);
  }

  VA_ODD_ONE_OUT.forEach((ooo, idx) => {
    if (ooo.sentences.length !== 5) {
      errors.push(`Odd One Out #${idx + 1} must have exactly 5 sentences.`);
    }
    if (ooo.oddSentenceId < 1 || ooo.oddSentenceId > 5) {
      errors.push(`Odd One Out #${idx + 1} has invalid oddSentenceId '${ooo.oddSentenceId}'.`);
    }
    if (ooo.coherentSequence.length !== 4) {
      errors.push(`Odd One Out #${idx + 1} coherentSequence must have 4 digits (remaining sentences).`);
    }
  });

  // 6. Validate VA Sentence Completion
  if (VA_SENTENCE_COMPLETIONS.length < 10) {
    errors.push(`Expected at least 10 Sentence Completion questions, found ${VA_SENTENCE_COMPLETIONS.length}`);
  }

  VA_SENTENCE_COMPLETIONS.forEach((sc, idx) => {
    if (!sc.paragraphWithBlank || !sc.paragraphWithBlank.includes("[ _____ ]")) {
      errors.push(`Sentence Completion #${idx + 1} must contain '[ _____ ]' blank.`);
    }
    if (sc.options.length !== 4) {
      errors.push(`Sentence Completion #${idx + 1} must have 4 options.`);
    }
  });

  const totalVAQuestions =
    VA_PARAJUMBLES.length +
    VA_SUMMARIES.length +
    VA_ODD_ONE_OUT.length +
    VA_SENTENCE_COMPLETIONS.length;

  return {
    isValid: errors.length === 0,
    totalPassages: RC_PASSAGES.length,
    totalRCQuestions,
    totalVAQuestions,
    totalConcepts: VARC_CONCEPTS.length,
    errors,
    warnings,
  };
}
