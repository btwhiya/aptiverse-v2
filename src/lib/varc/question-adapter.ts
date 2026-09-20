import { VerifiedQuestionItem } from "../seed-data";
import { RC_PASSAGES } from "./rc-passages-data";
import {
  VA_PARAJUMBLES,
  VA_SUMMARIES,
  VA_ODD_ONE_OUT,
  VA_SENTENCE_COMPLETIONS,
} from "./va-questions-data";
import { VARCDifficulty } from "./types";

function mapDifficulty(diff: VARCDifficulty): "EASY" | "MEDIUM" | "HARD" {
  switch (diff) {
    case "FOUNDATION":
      return "EASY";
    case "CAT_HARD":
      return "HARD";
    case "CAT":
    default:
      return "MEDIUM";
  }
}

/**
 * Adapter converting all 10 RC passages (40 questions) into universal VerifiedQuestionItem format
 */
export function getRCVerifiedQuestions(): VerifiedQuestionItem[] {
  const items: VerifiedQuestionItem[] = [];

  for (const passage of RC_PASSAGES) {
    for (const q of passage.questions) {
      const stepByStep = [
        q.explanation.correctReason,
        ...(q.explanation.optionsBreakdown || []).map(
          (ob) => `${ob.label}: ${ob.analysis}`
        ),
      ];

      items.push({
        id: q.id,
        topicSlug: "reading-comprehension",
        subtopicSlug: q.conceptId,
        difficulty: mapDifficulty(q.difficulty),
        questionType: "MCQ",
        passageText: `### ${passage.title} (${passage.genre})\n\n${passage.passageText}`,
        questionText: q.prompt,
        options: q.options.map((opt) => ({
          label: opt.label,
          text: opt.text,
        })),
        correctAnswer: q.correctAnswer,
        estimatedTimeSec: 90,
        isDemo: false,
        source: `AptiVerse Verified RC (${passage.genre})`,
        solution: {
          detailedText: q.explanation.detailed,
          stepByStep,
          shortcutMethod: q.explanation.catTip,
          conceptTested: q.skillTested,
          commonMistakeTrap: q.explanation.commonTrap,
        },
      });
    }
  }

  return items;
}

/**
 * Adapter converting all 40 Verbal Ability questions into universal VerifiedQuestionItem format
 */
export function getVAVerifiedQuestions(): VerifiedQuestionItem[] {
  const items: VerifiedQuestionItem[] = [];

  // 1. Para Jumbles (10 questions)
  for (const pj of VA_PARAJUMBLES) {
    const formattedPrompt = `${pj.prompt}\n\n${pj.sentences
      .map((s) => `${s.id}. ${s.text}`)
      .join("\n")}`;

    items.push({
      id: pj.id,
      topicSlug: "para-jumbles",
      subtopicSlug: "verbal-ability",
      difficulty: mapDifficulty(pj.difficulty),
      questionType: pj.questionType,
      questionText: formattedPrompt,
      options: pj.options
        ? pj.options.map((o) => ({ label: o.label, text: o.text }))
        : [],
      correctAnswer: pj.correctSequence,
      estimatedTimeSec: 90,
      isDemo: false,
      source: "AptiVerse Verified Verbal Ability (Para-Jumbles)",
      solution: {
        detailedText: pj.explanation.detailed,
        stepByStep: [
          pj.explanation.openingSentenceReason,
          ...pj.explanation.structuralPairs,
        ],
        shortcutMethod: pj.explanation.catTip,
        conceptTested: "VA - Logical Flow & Structural Permutations",
        commonMistakeTrap: pj.explanation.commonTrap,
      },
    });
  }

  // 2. Para Summaries (10 questions)
  for (const s of VA_SUMMARIES) {
    items.push({
      id: s.id,
      topicSlug: "para-summary",
      subtopicSlug: "verbal-ability",
      difficulty: mapDifficulty(s.difficulty),
      questionType: "MCQ",
      passageText: s.paragraph,
      questionText: s.prompt,
      options: s.options.map((o) => ({ label: o.label, text: o.text })),
      correctAnswer: s.correctAnswer,
      estimatedTimeSec: 80,
      isDemo: false,
      source: "AptiVerse Verified Verbal Ability (Para-Summary)",
      solution: {
        detailedText: s.explanation.detailed,
        stepByStep: [
          s.explanation.correctReason,
          ...(s.explanation.optionsBreakdown || []).map(
            (ob) => `${ob.label}: ${ob.analysis}`
          ),
        ],
        shortcutMethod: s.explanation.catTip,
        conceptTested: "VA - Paragraph Core Distillation & Scope Filter",
        commonMistakeTrap: s.explanation.commonTrap,
      },
    });
  }

  // 3. Odd One Out (10 questions)
  for (const ooo of VA_ODD_ONE_OUT) {
    const formattedPrompt = `${ooo.prompt}\n\n${ooo.sentences
      .map((s) => `${s.id}. ${s.text}`)
      .join("\n")}`;

    items.push({
      id: ooo.id,
      topicSlug: "odd-one-out",
      subtopicSlug: "verbal-ability",
      difficulty: mapDifficulty(ooo.difficulty),
      questionType: ooo.questionType,
      questionText: formattedPrompt,
      options: [],
      correctAnswer: ooo.oddSentenceId.toString(),
      estimatedTimeSec: 85,
      isDemo: false,
      source: "AptiVerse Verified Verbal Ability (Odd-One-Out)",
      solution: {
        detailedText: ooo.explanation.detailed,
        stepByStep: [
          ooo.explanation.whyOddFails,
          `Coherent order of remaining 4 sentences: ${ooo.coherentSequence}`,
          ooo.explanation.coherentNarrativeFlow,
        ],
        shortcutMethod: ooo.explanation.catTip,
        conceptTested: "VA - Argument Boundaries & Scope Disparity",
        commonMistakeTrap: ooo.explanation.commonTrap,
      },
    });
  }

  // 4. Sentence Completion (10 questions)
  for (const sc of VA_SENTENCE_COMPLETIONS) {
    items.push({
      id: sc.id,
      topicSlug: "sentence-completion",
      subtopicSlug: "verbal-ability",
      difficulty: mapDifficulty(sc.difficulty),
      questionType: "MCQ",
      passageText: sc.paragraphWithBlank,
      questionText: sc.prompt,
      options: sc.options.map((o) => ({ label: o.label, text: o.text })),
      correctAnswer: sc.correctAnswer,
      estimatedTimeSec: 75,
      isDemo: false,
      source: "AptiVerse Verified Verbal Ability (Sentence Completion)",
      solution: {
        detailedText: sc.explanation.detailed,
        stepByStep: [
          sc.explanation.correctReason,
          ...(sc.explanation.optionsBreakdown || []).map(
            (ob) => `${ob.label}: ${ob.analysis}`
          ),
        ],
        shortcutMethod: sc.explanation.catTip,
        conceptTested: "VA - Contextual Coherence & Transitional Fit",
        commonMistakeTrap: sc.explanation.commonTrap,
      },
    });
  }

  return items;
}

/**
 * All 80 curated, verified VARC questions (40 RC + 40 VA)
 */
export const ALL_VARC_VERIFIED_QUESTIONS: VerifiedQuestionItem[] = [
  ...getRCVerifiedQuestions(),
  ...getVAVerifiedQuestions(),
];
