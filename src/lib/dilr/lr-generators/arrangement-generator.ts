import { DILRDifficulty, DILRQuestion, DILRSet } from "../types";
import { generateCategoricalDistractors, getRandomInt, pickRandom } from "../solver";

export function generateArrangementSet(difficulty: DILRDifficulty): DILRSet {
  // Scenario: 6 Executive Board Members (Ananya, Bhuvan, Chetan, Divya, Eshan, Fatima)
  // Seated in a single linear row facing North, each heading a distinct division:
  // (Finance, Marketing, Technology, Operations, Legal, Strategy).
  const persons = ["Ananya", "Bhuvan", "Chetan", "Divya", "Eshan", "Fatima"];
  const divisions = ["Finance", "Marketing", "Technology", "Operations", "Legal", "Strategy"];

  // Unique canonical solution:
  // Position 1 (Extreme Left) to Position 6 (Extreme Right), all facing North:
  // Pos 1: Fatima (Legal)
  // Pos 2: Chetan (Strategy)
  // Pos 3: Ananya (Technology)
  // Pos 4: Eshan (Finance)
  // Pos 5: Bhuvan (Operations)
  // Pos 6: Divya (Marketing)

  const slots = [
    { pos: 1, name: "Fatima", division: "Legal" },
    { pos: 2, name: "Chetan", division: "Strategy" },
    { pos: 3, name: "Ananya", division: "Technology" },
    { pos: 4, name: "Eshan", division: "Finance" },
    { pos: 5, name: "Bhuvan", division: "Operations" },
    { pos: 6, name: "Divya", division: "Marketing" },
  ];

  const conditions = [
    "Six senior executive board directors—Ananya, Bhuvan, Chetan, Divya, Eshan, and Fatima—are seated in a straight row facing North during the annual strategy conclave. Each director heads a unique division: Finance, Marketing, Technology, Operations, Legal, and Strategy.",
    "1. The director heading Legal is seated at the extreme left end of the row.",
    "2. Ananya sits third to the right of Fatima and directly heads Technology.",
    "3. Bhuvan is seated immediately to the left of the director heading Marketing, who sits at the extreme right end.",
    "4. Eshan sits between Ananya and Bhuvan and heads Finance.",
    "5. Chetan does not head Legal, and the Strategy director sits immediately to the left of Ananya.",
  ];

  const questions: DILRQuestion[] = [];

  // Question 1: Who heads the Strategy division?
  const q1Distractors = generateCategoricalDistractors("Chetan", persons);
  questions.push({
    id: `arr-q1-${Date.now()}`,
    questionNumber: 1,
    questionText: `Which executive director heads the Strategy division?`,
    questionType: "MCQ",
    options: q1Distractors.options,
    correctAnswer: q1Distractors.correctLabel,
    explanation: {
      detailed: `From Clue 1: Legal is at Pos 1 (extreme left). From Clue 2: Ananya sits 3rd to right of Fatima (so Fatima is Pos 1, Ananya is Pos 3). From Clue 5: The Strategy director sits immediately to the left of Ananya (Pos 2). Since Chetan is seated between Fatima and Ananya, Chetan is at Pos 2 and heads Strategy.`,
      steps: [
        `Pos 1: Fatima (Legal) [Clues 1 & 2]`,
        `Pos 3: Ananya (Technology) [Clue 2]`,
        `Pos 2: Since Strategy is immediately left of Ananya (Pos 3), Pos 2 = Strategy.`,
        `Remaining director for Pos 2 is Chetan, hence Chetan heads Strategy.`,
      ],
      shortcut: `Immediately link 'immediately to the left of Ananya' (Pos 3) to Pos 2.`,
    },
    estimatedTimeSec: 90,
    skillTested: "Direct Positional Cross-Referencing",
  });

  // Question 2: Who sits at the extreme right end?
  const q2Distractors = generateCategoricalDistractors("Divya", persons);
  questions.push({
    id: `arr-q2-${Date.now()}`,
    questionNumber: 2,
    questionText: `Who is seated at the extreme right end of the executive row?`,
    questionType: "MCQ",
    options: q2Distractors.options,
    correctAnswer: q2Distractors.correctLabel,
    explanation: {
      detailed: `Clue 3 states: 'Bhuvan is seated immediately to the left of the director heading Marketing, who sits at the extreme right end.'`,
      steps: [
        `Extreme right end is Pos 6.`,
        `Pos 6 heads Marketing.`,
        `Bhuvan is at Pos 5 (immediately left of Pos 6).`,
        `The only unassigned person for Pos 6 is Divya. Therefore, Divya sits at Pos 6.`,
      ],
      shortcut: `Identify the only person not mentioned in early clues (Divya) filling the Marketing slot at Pos 6.`,
    },
    estimatedTimeSec: 60,
    skillTested: "Extreme Slot Deductive Elimination",
  });

  // Question 3: TITA - How many persons sit between Fatima and Bhuvan?
  // Fatima is at Pos 1, Bhuvan is at Pos 5. Between them are Pos 2, 3, 4 -> 3 persons.
  questions.push({
    id: `arr-q3-${Date.now()}`,
    questionNumber: 3,
    questionText: `How many directors are seated strictly between Fatima and Bhuvan? (Enter integer value only)`,
    questionType: "TITA",
    options: [],
    correctAnswer: "3",
    explanation: {
      detailed: `Identify the positions of Fatima and Bhuvan:`,
      steps: [
        `Fatima is seated at Position 1.`,
        `Bhuvan is seated at Position 5.`,
        `Directors seated between Position 1 and Position 5 are at Positions 2, 3, and 4 (Chetan, Ananya, Eshan).`,
        `Strict count = 5 - 1 - 1 = 3 directors.`,
      ],
      observation: `Ensure you do not count Fatima or Bhuvan in 'between' questions.`,
    },
    estimatedTimeSec: 45,
    skillTested: "Interval Cardinality in Linear Rows",
  });

  // Question 4: Which division does Bhuvan head?
  const q4Distractors = generateCategoricalDistractors("Operations", divisions);
  questions.push({
    id: `arr-q4-${Date.now()}`,
    questionNumber: 4,
    questionText: `Which division is headed by Bhuvan?`,
    questionType: "MCQ",
    options: q4Distractors.options,
    correctAnswer: q4Distractors.correctLabel,
    explanation: {
      detailed: `Deduce divisions by elimination:`,
      steps: [
        `Fatima = Legal`,
        `Chetan = Strategy`,
        `Ananya = Technology`,
        `Eshan = Finance`,
        `Divya = Marketing`,
        `The single remaining unassigned division is Operations, which belongs to Bhuvan (Pos 5).`,
      ],
      shortcut: `All 5 other divisions are explicitly named or tied to other slots in clues 1, 2, 3, 4, 5.`,
    },
    estimatedTimeSec: 60,
    skillTested: "Bijective Attribute Mapping",
  });

  return {
    id: `lr-arr-${Date.now()}-${getRandomInt(100, 999)}`,
    section: "LR",
    topic: "linear-arrangement",
    topicTitle: "Linear Arrangements & Attribute Matching",
    difficulty,
    title: "Executive Boardroom Strategic Alignment",
    description: `Read the following contextual rules regarding the seating arrangement and functional responsibilities of the senior leadership team at Apex Global Corporation:`,
    conditions,
    dataset: { slots },
    visualizationType: "arrangement",
    visualizationData: {
      layoutType: "linear",
      facing: "North",
      totalSlots: 6,
      slots: slots.map((s) => ({
        position: s.pos,
        label: `Seat ${s.pos}`,
        revealedName: difficulty === "MODERATE" ? s.name : undefined,
        revealedDivision: difficulty === "MODERATE" ? s.division : undefined,
      })),
      clues: conditions,
    },
    estimatedTimeMin: difficulty === "CAT_HARD" ? 14 : 10,
    questions,
    tags: ["Linear Arrangement", "Facing North", "Attribute Matching", "Deductive Logic", "CAT DILR"],
  };
}
