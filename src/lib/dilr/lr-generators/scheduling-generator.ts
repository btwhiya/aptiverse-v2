import { DILRDifficulty, DILRQuestion, DILRSet } from "../types";
import { generateCategoricalDistractors, getRandomInt, pickRandom } from "../solver";

export function generateSchedulingSet(difficulty: DILRDifficulty): DILRSet {
  // 5 Days: Monday, Tuesday, Wednesday, Thursday, Friday
  // 5 Experts: Dr. Rao, Dr. Sen, Dr. Iyer, Dr. Verma, Dr. Menon
  // 5 Topics: GenAI, Quantum Computing, Cybersecurity, Nanotech, Robotics
  //
  // Unique Schedule:
  // Mon: Dr. Sen - Robotics
  // Tue: Dr. Rao - Nanotech
  // Wed: Dr. Iyer - Quantum Computing
  // Thu: Dr. Menon - Cybersecurity
  // Fri: Dr. Verma - GenAI

  const schedule = [
    { day: "Monday", expert: "Dr. Sen", topic: "Robotics" },
    { day: "Tuesday", expert: "Dr. Rao", topic: "Nanotech" },
    { day: "Wednesday", expert: "Dr. Iyer", topic: "Quantum Computing" },
    { day: "Thursday", expert: "Dr. Menon", topic: "Cybersecurity" },
    { day: "Friday", expert: "Dr. Verma", topic: "GenAI" },
  ];

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const experts = ["Dr. Rao", "Dr. Sen", "Dr. Iyer", "Dr. Verma", "Dr. Menon"];
  const topics = ["GenAI", "Quantum Computing", "Cybersecurity", "Nanotech", "Robotics"];

  const conditions = [
    "A prestigious National Science & Technology Symposium is organized across 5 consecutive days from Monday to Friday. Exactly one guest expert presents on exactly one specialized topic each day.",
    "1. Dr. Sen delivers the keynote on Robotics exactly two days before Dr. Iyer's presentation.",
    "2. The presentation on Quantum Computing is scheduled on Wednesday.",
    "3. Dr. Verma presents on Friday, but his talk is not on Cybersecurity.",
    "4. Dr. Rao delivers his presentation on Nanotech, but neither on Monday nor on Thursday.",
    "5. Dr. Menon presents on Cybersecurity.",
  ];

  const headers = ["Day of Week", "Guest Expert", "Specialized Frontier Domain"];
  const displayRows = schedule.map((s) => [s.day, s.expert, s.topic]);

  const questions: DILRQuestion[] = [];

  // Question 1: Who presents on Tuesday?
  const q1Distractors = generateCategoricalDistractors("Dr. Rao", experts);
  questions.push({
    id: `sched-q1-${Date.now()}`,
    questionNumber: 1,
    questionText: `Which expert is scheduled to deliver the presentation on Tuesday?`,
    questionType: "MCQ",
    options: q1Distractors.options,
    correctAnswer: q1Distractors.correctLabel,
    explanation: {
      detailed: `Use clues to map out the days:`,
      steps: [
        `Clue 2: Wednesday = Quantum Computing.`,
        `Clue 1: Dr. Sen (Robotics) is exactly 2 days before Dr. Iyer. The only 2-day gap available where the second day has Quantum (or is open) is Mon -> Wed. So Dr. Sen is Monday (Robotics) and Dr. Iyer is Wednesday (Quantum Computing).`,
        `Clue 3: Dr. Verma is Friday.`,
        `Clue 4: Dr. Rao presents Nanotech, and cannot be Monday or Thursday (and Wednesday & Friday are taken). Thus, Dr. Rao must be on Tuesday!`,
      ],
      shortcut: `Dr. Rao cannot be Mon, Thu, Wed (taken by Iyer), or Fri (taken by Verma). Hence Tuesday is the only possible day for Dr. Rao.`,
    },
    estimatedTimeSec: 80,
    skillTested: "Chronological Slot Elimination",
  });

  // Question 2: What topic is presented on Friday?
  const q2Distractors = generateCategoricalDistractors("GenAI", topics);
  questions.push({
    id: `sched-q2-${Date.now()}`,
    questionNumber: 2,
    questionText: `What is the specialized topic presented by Dr. Verma on Friday?`,
    questionType: "MCQ",
    options: q2Distractors.options,
    correctAnswer: q2Distractors.correctLabel,
    explanation: {
      detailed: `Eliminate assigned topics:`,
      steps: [
        `Monday: Robotics`,
        `Tuesday: Nanotech`,
        `Wednesday: Quantum Computing`,
        `Thursday: Dr. Menon is assigned Cybersecurity (Clue 5).`,
        `The only remaining topic for Friday (Dr. Verma) is GenAI.`,
      ],
      shortcut: `Topics Robotics, Nanotech, Quantum, and Cybersecurity are all claimed by other experts, leaving GenAI.`,
    },
    estimatedTimeSec: 60,
    skillTested: "Bijective Topic Elimination",
  });

  // Question 3: TITA - How many days elapse between Dr. Sen and Dr. Menon?
  // Dr. Sen is Mon (Day 1), Dr. Menon is Thu (Day 4). Days strictly between are Tue and Wed -> 2 days.
  questions.push({
    id: `sched-q3-${Date.now()}`,
    questionNumber: 3,
    questionText: `How many presentation days are strictly between the day Dr. Sen presents and the day Dr. Menon presents? (Enter integer only)`,
    questionType: "TITA",
    options: [],
    correctAnswer: "2",
    explanation: {
      detailed: `Dr. Sen presents on Monday (Day 1). Dr. Menon presents on Thursday (Day 4).`,
      steps: [
        `Days strictly between Monday and Thursday are Tuesday and Wednesday.`,
        `Count = 2 days.`,
      ],
      observation: `Strictly between does not include the boundary days.`,
    },
    estimatedTimeSec: 40,
    skillTested: "Calendar Offset Cardinality",
  });

  // Question 4: On which day does Dr. Menon present?
  const q4Distractors = generateCategoricalDistractors("Thursday", days);
  questions.push({
    id: `sched-q4-${Date.now()}`,
    questionNumber: 4,
    questionText: `On which day of the week is Dr. Menon scheduled to present?`,
    questionType: "MCQ",
    options: q4Distractors.options,
    correctAnswer: q4Distractors.correctLabel,
    explanation: {
      detailed: `Check assigned days: Mon = Dr. Sen, Tue = Dr. Rao, Wed = Dr. Iyer, Fri = Dr. Verma. Only Thursday remains unassigned, which goes to Dr. Menon.`,
      steps: [
        `Dr. Sen = Monday`,
        `Dr. Rao = Tuesday`,
        `Dr. Iyer = Wednesday`,
        `Dr. Verma = Friday`,
        `Hence Dr. Menon presents on Thursday.`,
      ],
      shortcut: `Thursday is the single unoccupied day slot.`,
    },
    estimatedTimeSec: 40,
    skillTested: "Residual Calendar Slot Assignment",
  });

  return {
    id: `lr-sched-${Date.now()}-${getRandomInt(100, 999)}`,
    section: "LR",
    topic: "scheduling",
    topicTitle: "Constraint-Based Scheduling & Day-Wise Timetables",
    difficulty,
    title: "National Frontier Tech Symposium Scheduling",
    description: `Analyze the symposium planning guidelines and logistical constraints below:`,
    conditions,
    dataset: { schedule },
    visualizationType: "table",
    visualizationData: {
      title: "Symposium Master Grid (Deduce Empty Slots)",
      headers,
      rows: difficulty === "MODERATE" ? displayRows : displayRows.map((r, i) => (i === 1 || i === 3 ? [r[0], "?", "?"] : r)),
    },
    estimatedTimeMin: difficulty === "CAT_HARD" ? 12 : 8,
    questions,
    tags: ["Scheduling", "Calendar Constraints", "Attribute Matching", "Deductive Logic", "CAT DILR"],
  };
}
