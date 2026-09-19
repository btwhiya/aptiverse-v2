import { DILRDifficulty, DILRQuestion, DILRSet } from "../types";
import { generateCategoricalDistractors, generateDistractors, getRandomInt, pickRandom } from "../solver";

export function generateVennDiagramSet(difficulty: DILRDifficulty): DILRSet {
  // 3 Electives in an MBA Cohort:
  // A: Algorithmic Trading (Algo)
  // B: Behavioral Economics (Behav)
  // C: Cloud Architecture & Big Data (Cloud)
  // Total students = 200

  // Ground truth regions:
  // only A (Algo): 40
  // only B (Behav): 30
  // only C (Cloud): 35
  // only A & B: 18
  // only B & C: 12
  // only A & C: 20
  // all three: 15
  // none: 30
  // Sum = 40 + 30 + 35 + 18 + 12 + 20 + 15 + 30 = 200

  const multiplier = getRandomInt(1, 2);
  const a = 40 * multiplier;
  const b = 30 * multiplier;
  const c = 35 * multiplier;
  const ab = 18 * multiplier;
  const bc = 12 * multiplier;
  const ac = 20 * multiplier;
  const abc = 15 * multiplier;
  const none = 30 * multiplier;
  const totalStudents = 200 * multiplier;

  // Set totals
  const totalA = a + ab + ac + abc; // Algo
  const totalB = b + ab + bc + abc; // Behav
  const totalC = c + ac + bc + abc; // Cloud

  const exactlyOne = a + b + c;
  const exactlyTwo = ab + bc + ac;
  const atLeastTwo = exactlyTwo + abc;

  const conditions = [
    `A comprehensive survey was administered across the graduating batch of ${totalStudents} MBA scholars at a premier business school regarding their enrollment in three advanced specialized electives: Algorithmic Trading (A), Behavioral Economics (B), and Cloud Architecture (C).`,
    `1. Exactly ${abc} students enrolled in all three specialized electives.`,
    `2. A total of ${totalA} students enrolled in Algorithmic Trading, while ${totalB} students opted for Behavioral Economics.`,
    `3. The number of students who took both Algorithmic Trading and Cloud Architecture but not Behavioral Economics is ${ac}.`,
    `4. The number of students who enrolled in both Behavioral Economics and Cloud Architecture but not Algorithmic Trading is ${bc}.`,
    `5. The number of students who enrolled in both Algorithmic Trading and Behavioral Economics but not Cloud Architecture is ${ab}.`,
    `6. Exactly ${none} students did not enroll in any of the three electives.`,
    `7. The total number of students enrolled in Cloud Architecture is ${totalC}.`,
  ];

  const questions: DILRQuestion[] = [];

  // Question 1: How many students enrolled in ONLY Cloud Architecture?
  const q1Distractors = generateDistractors(
    c,
    (v) => Math.round(v).toString(),
    {
      offByOne: c + 10 * multiplier,
      commonTraps: [totalC - abc, c + bc],
    }
  );

  questions.push({
    id: `venn-q1-${Date.now()}`,
    questionNumber: 1,
    questionText: `How many students enrolled ONLY in Cloud Architecture (and neither of the other two electives)?`,
    questionType: "MCQ",
    options: q1Distractors.options,
    correctAnswer: q1Distractors.correctLabel,
    explanation: {
      detailed: `Use the set total for Cloud Architecture: Total C = (Only C) + (Only A & C) + (Only B & C) + (All Three).`,
      steps: [
        `Total Cloud Architecture (C) = ${totalC}.`,
        `Intersection A & C (only) = ${ac}.`,
        `Intersection B & C (only) = ${bc}.`,
        `All three = ${abc}.`,
        `Only Cloud Architecture = ${totalC} - (${ac} + ${bc} + ${abc}) = ${totalC} - ${ac + bc + abc} = ${c}.`,
      ],
      shortcut: `Direct subtraction from Cloud total: ${totalC} - (${ac} + ${bc} + ${abc}) = ${c}.`,
    },
    estimatedTimeSec: 60,
    skillTested: "Inclusion-Exclusion Set Decomposition",
  });

  // Question 2: How many students enrolled in EXACTLY ONE elective?
  const q2Distractors = generateDistractors(
    exactlyOne,
    (v) => Math.round(v).toString(),
    {
      offByOne: exactlyOne + 15 * multiplier,
      commonTraps: [exactlyTwo, totalStudents - atLeastTwo],
    }
  );

  questions.push({
    id: `venn-q2-${Date.now()}`,
    questionNumber: 2,
    questionText: `How many students in the batch enrolled in exactly one of the three electives?`,
    questionType: "MCQ",
    options: q2Distractors.options,
    correctAnswer: q2Distractors.correctLabel,
    explanation: {
      detailed: `Sum the 'only' regions for A, B, and C:`,
      steps: [
        `Only Algo (A) = ${totalA} - (${ab} + ${ac} + ${abc}) = ${a}.`,
        `Only Behav (B) = ${totalB} - (${ab} + ${bc} + ${abc}) = ${b}.`,
        `Only Cloud (C) = ${c}.`,
        `Total in Exactly One = ${a} + ${b} + ${c} = ${exactlyOne}.`,
      ],
      shortcut: `Total in at least one = ${totalStudents} - ${none} = ${totalStudents - none}. Subtract (Exactly Two + All Three) = ${totalStudents - none} - (${exactlyTwo} + ${abc}) = ${exactlyOne}.`,
    },
    estimatedTimeSec: 80,
    skillTested: "Partition Cardinality Aggregation",
  });

  // Question 3: TITA - Students taking at least two electives
  questions.push({
    id: `venn-q3-${Date.now()}`,
    questionNumber: 3,
    questionText: `How many students in the batch were enrolled in at least two of the three electives? (Enter integer only)`,
    questionType: "TITA",
    options: [],
    correctAnswer: atLeastTwo.toString(),
    explanation: {
      detailed: `'At least two' includes students in exactly two electives plus students in all three electives:`,
      steps: [
        `Only A & B = ${ab}.`,
        `Only B & C = ${bc}.`,
        `Only A & C = ${ac}.`,
        `All three = ${abc}.`,
        `At least two = ${ab} + ${bc} + ${ac} + ${abc} = ${atLeastTwo}.`,
      ],
      observation: `Ensure you remember to add the central region (all three = ${abc}) when 'at least two' is specified!`,
    },
    estimatedTimeSec: 50,
    skillTested: "Venn Intersection Poly-Region Summation",
  });

  // Question 4: Percentage of students taking Behavioral Economics who also take Algo
  const bAndA = ab + abc;
  const pctBtakingA = Number(((bAndA / totalB) * 100).toFixed(1));
  const q4Distractors = generateDistractors(
    pctBtakingA,
    (v) => `${v.toFixed(1)}%`,
    {
      inverted: Number(((ab / totalB) * 100).toFixed(1)), // trap: forgetting all 3
      offByOne: Number((pctBtakingA + 4.2).toFixed(1)),
    }
  );

  questions.push({
    id: `venn-q4-${Date.now()}`,
    questionNumber: 4,
    questionText: `Among all students who enrolled in Behavioral Economics, what percentage also enrolled in Algorithmic Trading?`,
    questionType: "MCQ",
    options: q4Distractors.options,
    correctAnswer: q4Distractors.correctLabel,
    explanation: {
      detailed: `This is a conditional proportion: [Number of students in (Behav ∩ Algo) / Total in Behav] × 100.`,
      steps: [
        `Total in Behavioral Economics = ${totalB}.`,
        `Students in both Behav and Algo = (Only A & B) + (All Three) = ${ab} + ${abc} = ${bAndA}.`,
        `Percentage = (${bAndA} / ${totalB}) × 100 = ${pctBtakingA}%.`,
      ],
      shortcut: `Make sure the denominator is Total B (${totalB}), not the entire cohort of ${totalStudents}.`,
      commonMistake: `Omitting the central 'all three' region (${abc}), which gives only ${ab}/${totalB} = ${((ab / totalB) * 100).toFixed(1)}%.`,
    },
    estimatedTimeSec: 90,
    skillTested: "Conditional Proportion in Venn Intersections",
  });

  return {
    id: `lr-venn-${Date.now()}-${getRandomInt(100, 999)}`,
    section: "LR",
    topic: "venn-diagram",
    topicTitle: "3-Set Venn Diagrams & Inclusion-Exclusion",
    difficulty,
    title: "Specialized Elective Choices in MBA Cohort",
    description: `Read the survey data and institutional records regarding enrollment in the 3 electives:`,
    conditions,
    dataset: { a, b, c, ab, bc, ac, abc, none, totalStudents },
    visualizationType: "venn",
    visualizationData: {
      title: "3-Set Venn Diagram: Elective Enrolment Breakdown",
      setA: { name: "Algorithmic Trading", total: totalA, color: "#6366f1" },
      setB: { name: "Behavioral Economics", total: totalB, color: "#10b981" },
      setC: { name: "Cloud Architecture", total: totalC, color: "#f59e0b" },
      regions: {
        onlyA: a,
        onlyB: b,
        onlyC: c,
        onlyAB: ab,
        onlyBC: bc,
        onlyAC: ac,
        allThree: abc,
        none,
      },
      totalUniverse: totalStudents,
    },
    estimatedTimeMin: difficulty === "CAT_HARD" ? 13 : 9,
    questions,
    tags: ["3-Set Venn", "Inclusion-Exclusion", "Conditional Probability", "Set Partitions", "CAT DILR"],
  };
}
