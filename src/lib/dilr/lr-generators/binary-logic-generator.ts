import { DILRDifficulty, DILRQuestion, DILRSet } from "../types";
import { generateCategoricalDistractors, getRandomInt, pickRandom } from "../solver";

export function generateBinaryLogicSet(difficulty: DILRDifficulty): DILRSet {
  // 3 suspects: Aditya, Bhavesh, Chirag.
  // Exactly one is a Truth-teller (always tells the truth).
  // Exactly one is a Liar (always lies).
  // Exactly one is an Alternator (makes one true statement and one false statement in either order: T-F or F-T).
  //
  // Ground Truth:
  // - Aditya is the Liar (L) -> Statement 1 is False, Statement 2 is False
  // - Bhavesh is the Truth-teller (TT) -> Statement 1 is True, Statement 2 is True
  // - Chirag is the Alternator (ALT) -> Statement 1 is True, Statement 2 is False
  //
  // Statements:
  // Aditya:
  // Statement 1: "Bhavesh is a Liar." (False, because Bhavesh is TT)
  // Statement 2: "I am an Alternator." (False, because Aditya is L)
  //
  // Bhavesh:
  // Statement 1: "Aditya is a Liar." (True, because Aditya is L)
  // Statement 2: "Chirag is an Alternator." (True, because Chirag is ALT)
  //
  // Chirag:
  // Statement 1: "I am an Alternator." (True, because Chirag is ALT)
  // Statement 2: "Bhavesh is an Alternator." (False, because Bhavesh is TT)

  const suspects = ["Aditya", "Bhavesh", "Chirag"];
  const roles = {
    Aditya: "Liar",
    Bhavesh: "Truth-teller",
    Chirag: "Alternator",
  };

  const statements = [
    {
      person: "Aditya",
      stmt1: "Bhavesh is a Liar.",
      stmt2: "I am an Alternator.",
    },
    {
      person: "Bhavesh",
      stmt1: "Aditya is a Liar.",
      stmt2: "Chirag is an Alternator.",
    },
    {
      person: "Chirag",
      stmt1: "I am an Alternator.",
      stmt2: "Bhavesh is an Alternator.",
    },
  ];

  const conditions = [
    "Three individuals—Aditya, Bhavesh, and Chirag—are interrogated by a forensic behavioral panel. It is known that among the three:",
    "• One is a Truth-teller (always speaks the truth).",
    "• One is a Liar (always speaks falsehoods).",
    "• One is an Alternator (speaks one true statement and one false statement in either order).",
    "Each individual makes exactly two consecutive statements as recorded below:",
    "Aditya:",
    "  1. 'Bhavesh is a Liar.'",
    "  2. 'I am an Alternator.'",
    "Bhavesh:",
    "  1. 'Aditya is a Liar.'",
    "  2. 'Chirag is an Alternator.'",
    "Chirag:",
    "  1. 'I am an Alternator.'",
    "  2. 'Bhavesh is an Alternator.'",
  ];

  const questions: DILRQuestion[] = [];

  // Question 1: Who is the Truth-teller?
  const q1Distractors = generateCategoricalDistractors("Bhavesh", suspects);
  questions.push({
    id: `bin-q1-${Date.now()}`,
    questionNumber: 1,
    questionText: `Who among the three individuals is the Truth-teller?`,
    questionType: "MCQ",
    options: q1Distractors.options,
    correctAnswer: q1Distractors.correctLabel,
    explanation: {
      detailed: `Test hypotheses for Truth-teller:`,
      steps: [
        `Case 1: Assume Aditya is TT. Then Aditya's statement 2 ('I am an Alternator') must be true, which contradicts him being TT. Hence Aditya cannot be the Truth-teller.`,
        `Case 2: Assume Chirag is TT. Then statement 2 ('Bhavesh is an Alternator') must be true. But if Chirag is TT and Bhavesh is ALT, then Aditya must be Liar. But Chirag saying 'I am an Alternator' would be a lie, contradicting Chirag being TT!`,
        `Case 3: Assume Bhavesh is TT. Both his statements are true: Aditya is a Liar, and Chirag is an Alternator.`,
        `Checking Aditya: Statement 1 ('Bhavesh is a Liar') is False. Statement 2 ('I am an Alternator') is False. Both false → consistent with Liar!`,
        `Checking Chirag: Statement 1 ('I am an Alternator') is True. Statement 2 ('Bhavesh is an Alternator') is False. One True, One False → consistent with Alternator!`,
        `All conditions hold seamlessly. Bhavesh is the Truth-teller.`,
      ],
      shortcut: `A Truth-teller can NEVER say 'I am an Alternator' or 'I am a Liar'. Since both Aditya and Chirag claim to be Alternators, neither can be the Truth-teller! Hence Bhavesh must be the Truth-teller!`,
    },
    estimatedTimeSec: 80,
    skillTested: "Epistemic Paradox & Self-Identity Refutation",
  });

  // Question 2: Who is the Liar?
  const q2Distractors = generateCategoricalDistractors("Aditya", suspects);
  questions.push({
    id: `bin-q2-${Date.now()}`,
    questionNumber: 2,
    questionText: `Who among the three individuals is the Liar?`,
    questionType: "MCQ",
    options: q2Distractors.options,
    correctAnswer: q2Distractors.correctLabel,
    explanation: {
      detailed: `Having proven that Bhavesh is the Truth-teller:`,
      steps: [
        `Bhavesh's first statement is: 'Aditya is a Liar.'`,
        `Since Bhavesh is the verified Truth-teller, his statements are 100% true.`,
        `Therefore, Aditya is the Liar.`,
      ],
      shortcut: `Direct deduction from the Truth-teller's validated statement.`,
    },
    estimatedTimeSec: 40,
    skillTested: "Validated Statement Projection",
  });

  // Question 3: Chirag's truth pattern
  const q3Distractors = generateCategoricalDistractors("First statement True, Second statement False", [
    "First statement False, Second statement True",
    "Both statements True",
    "Both statements False",
  ]);
  questions.push({
    id: `bin-q3-${Date.now()}`,
    questionNumber: 3,
    questionText: `What is the truth value sequence of the two statements made by Chirag?`,
    questionType: "MCQ",
    options: q3Distractors.options,
    correctAnswer: q3Distractors.correctLabel,
    explanation: {
      detailed: `Analyze Chirag's statements with the established identities (Bhavesh = TT, Aditya = L, Chirag = ALT):`,
      steps: [
        `Statement 1: 'I am an Alternator.' Since Chirag is indeed the Alternator, this statement is TRUE.`,
        `Statement 2: 'Bhavesh is an Alternator.' Since Bhavesh is the Truth-teller, this statement is FALSE.`,
        `Hence the sequence is: First statement True, Second statement False.`,
      ],
      shortcut: `Check the veracity of each statement individually once ground truth is solved.`,
    },
    estimatedTimeSec: 60,
    skillTested: "Truth-Sequence Verification for Alternator",
  });

  // Question 4: TITA - How many of the 6 total statements made were TRUE?
  // Aditya: 0 true
  // Bhavesh: 2 true
  // Chirag: 1 true
  // Total true statements = 0 + 2 + 1 = 3
  questions.push({
    id: `bin-q4-${Date.now()}`,
    questionNumber: 4,
    questionText: `Across all 6 statements uttered during the interrogation, exactly how many statements were factually TRUE? (Enter integer only)`,
    questionType: "TITA",
    options: [],
    correctAnswer: "3",
    explanation: {
      detailed: `Count true statements from each person's role:`,
      steps: [
        `Aditya is Liar: 0 true statements.`,
        `Bhavesh is Truth-teller: 2 true statements.`,
        `Chirag is Alternator: 1 true statement.`,
        `Total true statements = 0 + 2 + 1 = 3 statements.`,
      ],
      observation: `By definition, TT gives 2, ALT gives 1, and L gives 0, always summing to 3!`,
    },
    estimatedTimeSec: 30,
    skillTested: "Statement True-False Sum Invariant",
  });

  return {
    id: `lr-bin-${Date.now()}-${getRandomInt(100, 999)}`,
    section: "LR",
    topic: "binary-logic",
    topicTitle: "Binary Logic: Truth-Tellers, Liars & Alternators",
    difficulty,
    title: "Forensic Investigation: Truth-Tellers & Alternators",
    description: `Read the interrogation transcripts and behavioral definitions below:`,
    conditions,
    dataset: { statements, roles },
    visualizationType: "none",
    visualizationData: {},
    estimatedTimeMin: difficulty === "CAT_HARD" ? 12 : 8,
    questions,
    tags: ["Binary Logic", "Truth Tellers", "Liars", "Alternators", "CAT DILR"],
  };
}
