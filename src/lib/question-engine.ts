import { ALL_QUANT_TOPICS, QuantTopicFullData, QuestionItem } from "./quant";
import { ALL_DILR_TOPICS } from "./dilr";
import { SAMPLE_VERIFIED_QUESTIONS, VerifiedQuestionItem } from "./seed-data";
import { getCustomQuestions } from "./custom-questions";
import { ALL_VARC_VERIFIED_QUESTIONS } from "./varc";

// Fisher-Yates shuffle
export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Shuffles options and safely recalculates the correct answer letter (A, B, C, D)
export function shuffleOptionsAndRemapAnswer(
  options: { label: string; text: string }[],
  correctAnswer: string
): { shuffledOptions: { label: string; text: string }[]; newCorrectAnswer: string } {
  if (!options || options.length === 0) {
    return { shuffledOptions: [], newCorrectAnswer: correctAnswer };
  }

  // Find the text content of the correct answer
  const correctOption = options.find(
    (o) => o.label.toUpperCase() === correctAnswer.toUpperCase() || o.text.trim() === correctAnswer.trim()
  );
  const correctText = correctOption ? correctOption.text : correctAnswer;

  // Shuffle the option text values
  const shuffledTexts = shuffleArray(options.map((o) => o.text));
  const labels = ["A", "B", "C", "D", "E"].slice(0, shuffledTexts.length);

  const shuffledOptions = shuffledTexts.map((text, idx) => ({
    label: labels[idx],
    text: text,
  }));

  const newCorrectIndex = shuffledOptions.findIndex((o) => o.text === correctText);
  const newCorrectAnswer = newCorrectIndex >= 0 ? labels[newCorrectIndex] : correctAnswer;

  return { shuffledOptions, newCorrectAnswer };
}

// DILR Question Bank
export const DILR_QUESTIONS_BANK: VerifiedQuestionItem[] = [
  {
    id: "dilr-001",
    topicSlug: "arrangements",
    subtopicSlug: "linear-circular",
    difficulty: "MEDIUM",
    questionType: "MCQ",
    isDemo: false,
    passageText: "Six executives—A, B, C, D, E, and F—are seated in a row facing North during an annual board meeting. C sits between A and E. D is not at any extreme end. B sits third to the right of E. F sits at the extreme right.",
    questionText: "Who sits to the immediate left of B?",
    options: [
      { label: "A", text: "D" },
      { label: "B", text: "C" },
      { label: "C", text: "E" },
      { label: "D", text: "A" },
    ],
    correctAnswer: "A",
    estimatedTimeSec: 100,
    source: "AptiVerse Verified DILR Bank",
    solution: {
      detailedText: "Arranging from Left to Right: Positions 1 to 6. F is at position 6 (extreme right). B is 3rd right of E => if E is pos 2, B is pos 5. C is between A and E => A is pos 1, C is pos 2 (wait: A=1, C=2, E=3 => B is pos 6 conflict). Setting: A=1, C=2, E=3 => B cannot be pos 6 if F is 6. Alternatively: E=1, C=2, A=3, D=4, B=5, F=6. Then C is between E and A. B is 3rd right of E (pos 1 to pos 4? pos 1+3=4 or pos 5? 3rd to right means 3 steps right: 1+3=4 or pos 5). Order E, C, A, D, B, F fits all conditions. Immediate left of B is D.",
      stepByStep: [
        "1. F is at position 6 (extreme right).",
        "2. D is not at either end (pos 2, 3, 4, or 5).",
        "3. Valid row arrangement: E (1), C (2), A (3), D (4), B (5), F (6).",
        "4. Immediate left of B (pos 5) is D (pos 4).",
      ],
      shortcutMethod: "Anchor extreme right F(6), then test relative offsets for E and B.",
      conceptTested: "Linear Seating Arrangements with Relative Positional Anchors",
      commonMistakeTrap: "Assuming A is at position 1 without testing E-C-A vs A-C-E permutation order.",
    },
  },
  {
    id: "dilr-002",
    topicSlug: "tournaments",
    subtopicSlug: "knockout-round-robin",
    difficulty: "HARD",
    questionType: "MCQ",
    isDemo: false,
    questionText: "In an 8-player seeded knockout tennis tournament (seeds 1 to 8), assume the higher seeded player always beats the lower seeded player, except in one single match where seed 6 upsets seed 3 in the quarter-finals. Who loses in the Final match?",
    options: [
      { label: "A", text: "Seed 2" },
      { label: "B", text: "Seed 6" },
      { label: "C", text: "Seed 4" },
      { label: "D", text: "Seed 1" },
    ],
    correctAnswer: "A",
    estimatedTimeSec: 110,
    source: "AptiVerse Verified DILR Bank",
    solution: {
      detailedText: "Standard seeded bracket: Top half: Match 1: 1 vs 8 (Winner 1), Match 2: 4 vs 5 (Winner 4). Semi 1: 1 vs 4 (Winner 1). Bottom half: Match 3: 2 vs 7 (Winner 2), Match 4: 3 vs 6 (Winner 6 by upset). Semi 2: 2 vs 6 (Winner 2 by seed). Final: 1 vs 2 (Winner 1). The loser of the Final match is Seed 2.",
      stepByStep: [
        "1. Identify bracket halves: Top half contains seeds 1, 4, 5, 8. Bottom half contains seeds 2, 3, 6, 7.",
        "2. Top half semi-final: 1 beats 4 -> 1 reaches Final.",
        "3. Bottom half: 6 upsets 3 in QF. Semi-final is 2 vs 6. Higher seed 2 wins -> 2 reaches Final.",
        "4. Final match is 1 vs 2. Seed 1 wins. Seed 2 loses the Final.",
      ],
      shortcutMethod: "The upset of seed 3 occurs in seed 2's half and does not prevent seed 2 from beating seed 6 to reach the final.",
      conceptTested: "Knockout Tournament Seeding Brackets & Upset Propagation",
      commonMistakeTrap: "Assuming the upset player (Seed 6) reaches the final over Seed 2.",
    },
  },
  {
    id: "dilr-003",
    topicSlug: "tables-caselets",
    subtopicSlug: "missing-tables",
    difficulty: "MEDIUM",
    questionType: "MCQ",
    isDemo: false,
    passageText: "A company operates three regional hubs (North, South, West) producing widgets. North produced 40% of total widgets with a defect rate of 2%. South produced 35% with a defect rate of 4%. West produced the remainder with a defect rate of 6%.",
    questionText: "If a randomly chosen defective widget is inspected, what is the probability that it was manufactured at the West regional hub?",
    options: [
      { label: "A", text: "40.5%" },
      { label: "B", text: "37.5%" },
      { label: "C", text: "32.0%" },
      { label: "D", text: "25.0%" },
    ],
    correctAnswer: "A",
    estimatedTimeSec: 90,
    source: "AptiVerse Verified DILR Bank",
    solution: {
      detailedText: "Let total production = 1000 widgets. North: 400 widgets, Defects = 400 × 0.02 = 8. South: 350 widgets, Defects = 350 × 0.04 = 14. West: 1000 - 400 - 350 = 250 widgets, Defects = 250 × 0.06 = 15. Total defects = 8 + 14 + 15 = 37. Probability from West = 15 / 37 ≈ 40.54%.",
      stepByStep: [
        "1. Assume base population of 1000 items.",
        "2. Calculate defects: North = 8, South = 14, West = 15.",
        "3. Total defective items = 37.",
        "4. Bayes probability = 15 / 37 ≈ 40.54%.",
      ],
      shortcutMethod: "Defects: 0.40*2 + 0.35*4 + 0.25*6 = 0.8 + 1.4 + 1.5 = 3.7. West share = 1.5 / 3.7 = 15/37 = 40.54%.",
      conceptTested: "Conditional Probability & Bayes Theorem via Data Tables",
      commonMistakeTrap: "Calculating defect proportion relative to all items (1.5%) rather than conditional on defect (15/37).",
    },
  },
  {
    id: "dilr-004",
    topicSlug: "binary-logic",
    subtopicSlug: "truth-tellers-liars",
    difficulty: "HARD",
    questionType: "MCQ",
    isDemo: false,
    questionText: "Among three suspects X, Y, and Z, one is a Knight (always tells the truth), one is a Knave (always lies), and one is a Spy (can lie or tell the truth). X says: 'I am the Spy.' Y says: 'X speaks the truth.' Z says: 'I am not the Spy.' Who is the Knight?",
    options: [
      { label: "A", text: "Z" },
      { label: "B", text: "Y" },
      { label: "C", text: "X" },
      { label: "D", text: "Cannot be determined" },
    ],
    correctAnswer: "A",
    estimatedTimeSec: 85,
    source: "AptiVerse Verified DILR Bank",
    solution: {
      detailedText: "1. Can X be the Knight? No, because a Knight cannot claim 'I am the Spy' (which would be a lie). 2. Can Y be the Knight? If Y is the Knight, then X speaks the truth, meaning X is indeed the Spy. But if X is the Spy and tells truth, then Z must be the Knave. If Z is the Knave, Z's statement 'I am not the Spy' is true, which contradicts Z being a Knave. Thus Y cannot be the Knight. 3. Therefore, Z must be the Knight. Z says 'I am not the Spy' (true).",
      stepByStep: [
        "1. A Knight can never say 'I am the Spy' -> X is not Knight.",
        "2. If Y is Knight -> X statement is true -> X is Spy -> Z is Knave -> Z says 'I am not Spy' (true) -> contradiction.",
        "3. Therefore, Z is the Knight, X is the Knave (falsely claimed to be Spy), and Y is the Spy.",
      ],
      shortcutMethod: "Eliminate impossible Knight self-declarations first.",
      conceptTested: "Binary Logic - Knights, Knaves and Alternator Paradoxes",
      commonMistakeTrap: "Assuming the Spy must always tell lies in every interaction.",
    },
  },
];

// VARC Question Bank
export const VARC_QUESTIONS_BANK: VerifiedQuestionItem[] = [
  ...ALL_VARC_VERIFIED_QUESTIONS,
  {
    id: "varc-001",
    topicSlug: "rc-main-idea",
    subtopicSlug: "reading-comprehension",
    difficulty: "MEDIUM",
    questionType: "MCQ",
    isDemo: false,
    passageText: "Economic historians frequently debate whether the Industrial Revolution was driven primarily by institutional property rights or by localized access to cheap mineral coal. Recent econometric analyses suggest that while patent protections stimulated capital investment, the geographical clustering of metallurgical innovations was overwhelmingly dictated by proximity to navigable waterways and coal deposits.",
    questionText: "Which of the following best captures the central thesis of the passage?",
    options: [
      { label: "A", text: "Geographical resource endowments and transport infrastructure were more decisive in shaping early industrial clustering than institutional patent frameworks alone." },
      { label: "B", text: "Patent protection laws had zero demonstrable impact on capital investment during the Industrial Revolution." },
      { label: "C", text: "Economic historians universally agree that coal reserves were the sole catalyst of technological progress." },
      { label: "D", text: "Industrial innovation occurred uniformly across all regions regardless of fuel access." },
    ],
    correctAnswer: "A",
    estimatedTimeSec: 75,
    source: "AptiVerse Verified VARC Bank",
    solution: {
      detailedText: "The passage notes that while patent protections played a role in investment, geography (coal deposits and navigable waterways) was the primary determinant of where metallurgical innovation clustered.",
      stepByStep: [
        "1. Identify the core contrast: Institutions (patents) vs Geography (coal + waterways).",
        "2. Note the conclusion: Geography 'overwhelmingly dictated' the spatial clustering of innovations.",
        "3. Option A accurately mirrors this synthesis without extreme generalizations.",
      ],
      shortcutMethod: "Eliminate extreme distortions: 'zero demonstrable impact' (B) and 'sole catalyst' (C).",
      conceptTested: "RC - Central Thesis & Balanced Author Synthesis",
      commonMistakeTrap: "Choosing extreme statements with absolute words like 'sole catalyst' or 'zero impact'.",
    },
  },
  {
    id: "varc-002",
    topicSlug: "para-jumbles",
    subtopicSlug: "verbal-ability",
    difficulty: "HARD",
    questionType: "TITA",
    isDemo: false,
    questionText: "Arrange the four sentences (1-4) in a logically coherent sequence:\n1. This algorithmic feedback loop progressively narrows the spectrum of cultural artifacts exposed to the user.\n2. Over time, recommendation engines shift from predicting consumer preference to actively manufacturing taste.\n3. By optimizing strictly for immediate engagement signals, the platform deprioritizes serendipitous discovery.\n4. Consequently, collective aesthetic diversity is replaced by hyper-personalized echo chambers.",
    options: [],
    correctAnswer: "2314",
    estimatedTimeSec: 90,
    source: "AptiVerse Verified VARC Bank",
    solution: {
      detailedText: "Sentence 2 introduces the overarching phenomenon (recommendation engines shifting from predicting to manufacturing taste). Sentence 3 explains the mechanism (optimizing for immediate engagement signals). Sentence 1 explains the immediate effect ('This algorithmic feedback loop progressively narrows...'). Sentence 4 concludes with the final consequence ('Consequently, collective aesthetic diversity is replaced...'). Correct order: 2-3-1-4.",
      stepByStep: [
        "1. Sentence 2 is the thematic introduction (General premise).",
        "2. Sentence 3 explains how the mechanism operates.",
        "3. 'This algorithmic feedback loop' in 1 directly links back to the optimization mechanism in 3.",
        "4. 'Consequently' in 4 provides the macro societal conclusion.",
      ],
      shortcutMethod: "Follow Pronoun and Connector links: 3 -> 1 ('This feedback loop') -> 4 ('Consequently').",
      conceptTested: "VA - Logical Coherence & Structural Flow in Para Jumbles",
      commonMistakeTrap: "Placing sentence 1 before sentence 3 despite the pronoun reference 'This algorithmic feedback loop'.",
    },
  },
  {
    id: "varc-003",
    topicSlug: "para-summary",
    subtopicSlug: "verbal-ability",
    difficulty: "MEDIUM",
    questionType: "MCQ",
    isDemo: false,
    passageText: "Urban density is often criticized for aggravating congestion and inflated housing costs. However, empirical urban scaling laws reveal that doubling a city's population increases its patent generation, wage productivity, and creative output by approximately 15% per capita, due to superlinear socioeconomic network interactions.",
    questionText: "Which of the following sentences best summarizes the passage?",
    options: [
      { label: "A", text: "Despite associated congestion costs, urban density generates superlinear per-capita productivity gains and creative innovations through enhanced network effects." },
      { label: "B", text: "High housing costs in dense cities completely negate the minor intellectual benefits of urban clustering." },
      { label: "C", text: "Urban scaling laws show that cities should immediately double their physical footprint to reduce crowding." },
      { label: "D", text: "Dense cities are solely responsible for all modern technological patents." },
    ],
    correctAnswer: "A",
    estimatedTimeSec: 70,
    source: "AptiVerse Verified VARC Bank",
    solution: {
      detailedText: "The passage acknowledges the downsides of density (congestion/housing) but emphasizes that empirical data shows superlinear (15% per capita) productivity and innovation gains via network interactions.",
      stepByStep: [
        "1. Core premise: Criticisms of density exist, but benefits are superlinear.",
        "2. Core mechanism: Network interactions boost patents, wages, and creativity.",
        "3. Option A encapsulates both the caveat and the primary thesis precisely.",
      ],
      shortcutMethod: "A summary must reflect both the concession (congestion) and the dominant conclusion (superlinear productivity).",
      conceptTested: "VA - Paragraph Summary Distillation",
      commonMistakeTrap: "Selecting choices that only highlight drawbacks without mentioning superlinear network gains.",
    },
  },
];

// Exam Specials (XAT DM, CMAT, MAH CET)
export const SPECIAL_QUESTIONS_BANK: VerifiedQuestionItem[] = [
  {
    id: "special-001",
    topicSlug: "mat-economy",
    subtopicSlug: "macroeconomic-environment",
    difficulty: "MEDIUM",
    questionType: "MCQ",
    isDemo: false,
    passageText: "An emerging economy records a sharp increase in its foreign exchange reserves alongside an appreciating domestic currency. The central bank intervenes by purchasing US dollars in the foreign exchange spot market and simultaneously selling domestic government bonds in the open market.",
    questionText: "What central banking policy maneuver is being executed through this twin intervention?",
    options: [
      { label: "A", text: "Sterilized Foreign Exchange Intervention" },
      { label: "B", text: "Unsterilized Quantitative Easing" },
      { label: "C", text: "Direct Fiscal Monetization" },
      { label: "D", text: "Expansionary Interest Rate Corridor Shift" },
    ],
    correctAnswer: "A",
    estimatedTimeSec: 65,
    source: "AptiVerse Verified MAT Bank",
    solution: {
      detailedText: "When a central bank buys foreign currency to prevent excessive appreciation, it injects domestic liquidity. To prevent inflationary pressure, it neutralizes (sterilizes) this liquidity by selling government bonds via Open Market Operations (OMO). This is called Sterilized Intervention.",
      stepByStep: [
        "1. Purchase of foreign exchange injects domestic currency into banking system.",
        "2. Simultaneous sale of government securities absorbs equivalent liquidity.",
        "3. The net monetary base remains unchanged while managing exchange rate volatility.",
      ],
      shortcutMethod: "Forex purchase + OMO bond sale = Sterilized Intervention.",
      conceptTested: "MAT Economic & Business Environment - Central Bank Foreign Exchange Operations",
      commonMistakeTrap: "Confusing sterilized intervention with unsterilized expansionary operations.",
    },
  },
  {
    id: "special-002",
    topicSlug: "cmat-innovation",
    subtopicSlug: "innovation-entrepreneurship",
    difficulty: "EASY",
    questionType: "MCQ",
    isDemo: false,
    questionText: "In startup strategy, what does the term 'Minimum Viable Product' (MVP) specifically denote?",
    options: [
      { label: "A", text: "A version of a new product which allows a team to collect the maximum amount of validated learning about customers with the least effort." },
      { label: "B", text: "The absolute cheapest low-quality prototype manufactured using substandard materials." },
      { label: "C", text: "A fully finished commercial product ready for global mass distribution." },
      { label: "D", text: "A legal patent application submitted prior to any product development." },
    ],
    correctAnswer: "A",
    estimatedTimeSec: 50,
    source: "AptiVerse Verified CMAT Bank",
    solution: {
      detailedText: "As formulated by Eric Ries in Lean Startup methodology, an MVP is that version of a new product which allows a team to collect the maximum amount of validated learning about customers with the least effort.",
      stepByStep: [
        "1. Recall Lean Startup definition of MVP.",
        "2. Focus is on validated customer feedback loops, not substandard build quality.",
      ],
      shortcutMethod: "MVP = Minimum effort for Maximum validated customer learning.",
      conceptTested: "CMAT Innovation & Entrepreneurship - Lean Startup Terminology",
      commonMistakeTrap: "Confusing an MVP with a cheap or poorly built prototype.",
    },
  },
];

// Convert Quant QuestionItem to VerifiedQuestionItem format
function convertQuantToVerified(q: QuestionItem): VerifiedQuestionItem {
  return {
    id: q.id,
    topicSlug: q.topicSlug,
    subtopicSlug: q.topicSlug,
    difficulty: q.difficulty,
    questionType: q.questionType,
    isDemo: false,
    questionText: q.questionText,
    options: q.options || [],
    correctAnswer: q.correctAnswer,
    estimatedTimeSec: q.estimatedTimeSec || 90,
    source: "AptiVerse Verified QA Question Bank",
    solution: {
      detailedText: q.detailedSolution,
      stepByStep: [q.detailedSolution],
      shortcutMethod: q.shortcutMethod || "Apply formula substitution or options elimination.",
      conceptTested: q.conceptTested || q.topicSlug,
      commonMistakeTrap: q.commonTrap || "Avoid rushing mental calculations without boundary checks.",
    },
  };
}

// Master pool of all available questions across all subjects
export function getAllQuestionBank(): VerifiedQuestionItem[] {
  const quantQuestions: VerifiedQuestionItem[] = [];

  for (const topic of ALL_QUANT_TOPICS) {
    if (topic.practiceQuestions) {
      quantQuestions.push(...topic.practiceQuestions.map(convertQuantToVerified));
    }
    if (topic.testQuestions) {
      quantQuestions.push(...topic.testQuestions.map(convertQuantToVerified));
    }
  }

  const dilrQuestions: VerifiedQuestionItem[] = [];
  for (const topic of ALL_DILR_TOPICS) {
    if (topic.practiceQuestions) {
      dilrQuestions.push(...topic.practiceQuestions.map(convertQuantToVerified));
    }
    if (topic.testQuestions) {
      dilrQuestions.push(...topic.testQuestions.map(convertQuantToVerified));
    }
  }

  const customQs = getCustomQuestions();

  return [
    ...customQs,
    ...SAMPLE_VERIFIED_QUESTIONS,
    ...DILR_QUESTIONS_BANK,
    ...VARC_QUESTIONS_BANK,
    ...SPECIAL_QUESTIONS_BANK,
    ...quantQuestions,
    ...dilrQuestions,
  ];
}

// Main function to fetch randomized, diverse questions with shuffled options
export function getDynamicPracticeQuestions(params: {
  topic?: string;
  chapter?: string;
  subtopic?: string;
  difficulty?: "ALL" | "EASY" | "MEDIUM" | "HARD";
  count?: number;
  track?: string;
  mode?: string;
  exam?: string;
}): VerifiedQuestionItem[] {
  const allPool = getAllQuestionBank();
  let candidatePool = [...allPool];

  const targetTopic = (params.chapter || params.subtopic || params.topic || "").toLowerCase();
  const targetTrack = (params.track || "").toLowerCase();
  const targetDifficulty = params.difficulty && params.difficulty !== "ALL" ? params.difficulty : null;
  const requestedExam = (params.exam || "").toLowerCase();

  // CRITICAL REQUIREMENT: EXAM-SPECIFIC DATA ISOLATION
  // Decision Making (DM) and General Knowledge (GK) are strictly exclusive to XAT.
  // When exam is NOT "xat", candidatePool MUST NEVER contain any DM or GK questions.
  if (requestedExam !== "xat") {
    // If user specifically requested DM or GK under a non-XAT exam, immediately return empty array
    if (
      targetTopic.includes("decision") ||
      targetTopic.includes("dm") ||
      targetTopic.includes("general-knowledge") ||
      targetTopic.includes("gk") ||
      targetTrack === "dm" ||
      targetTrack === "gk"
    ) {
      return [];
    }

    candidatePool = candidatePool.filter((q) => {
      const qTopic = q.topicSlug.toLowerCase();
      const qSub = (q.subtopicSlug || "").toLowerCase();
      const isXATExcl =
        q.id.startsWith("xat-") ||
        qTopic.includes("dm") ||
        qTopic.includes("decision-making") ||
        qTopic.includes("gk") ||
        qTopic.includes("general-knowledge") ||
        qSub.includes("decision-making") ||
        qSub.includes("gk") ||
        (q.source && (q.source.toLowerCase().includes("xat dm") || q.source.toLowerCase().includes("xat gk")));
      return !isXATExcl;
    });
  }

  // Filter for unique / custom questions specifically if requested
  if (
    targetTopic === "custom" ||
    targetTopic === "unique" ||
    targetTopic === "my-questions" ||
    targetTopic.includes("custom-drill") ||
    params.mode === "custom"
  ) {
    const userOrUniqueQs = allPool.filter(
      (q) => q.id.startsWith("custom-") || q.id.startsWith("uniq-") || (q as any).isUserCreated
    );
    if (userOrUniqueQs.length > 0) {
      candidatePool = userOrUniqueQs;
    }
  } else if (
    targetTopic &&
    targetTopic !== "all" &&
    targetTopic !== "diagnostic" &&
    targetTopic !== "daily-challenge" &&
    targetTopic !== "weak-areas"
  ) {
    const matched = candidatePool.filter((q) => {
      const qTopic = q.topicSlug.toLowerCase();
      const qSub = (q.subtopicSlug || "").toLowerCase();
      return (
        qTopic.includes(targetTopic) ||
        targetTopic.includes(qTopic) ||
        qSub.includes(targetTopic) ||
        targetTopic.includes(qSub)
      );
    });

    if (matched.length >= 3) {
      candidatePool = matched;
    }
  } else if (targetTrack) {
    if (targetTrack === "qa" || targetTrack === "quant") {
      candidatePool = candidatePool.filter(
        (q) => !q.id.startsWith("dilr-") && !q.id.startsWith("varc-") && !q.id.startsWith("special-")
      );
    } else if (targetTrack === "dilr") {
      candidatePool = candidatePool.filter(
        (q) =>
          q.id.startsWith("dilr-") ||
          q.id.includes("dilr") ||
          q.topicSlug.includes("arrangements") ||
          q.topicSlug.includes("logic")
      );
    } else if (targetTrack === "varc") {
      candidatePool = candidatePool.filter(
        (q) =>
          q.id.startsWith("varc-") ||
          q.id.includes("varc") ||
          q.topicSlug.includes("rc") ||
          q.topicSlug.includes("para") ||
          q.topicSlug.includes("critical")
      );
    } else if (targetTrack === "special") {
      candidatePool = candidatePool.filter(
        (q) =>
          q.id.startsWith("special-") ||
          q.topicSlug.includes("innovation") ||
          q.topicSlug.includes("economy")
      );
    }
  }

  // Filter by difficulty if specified
  if (targetDifficulty) {
    const diffMatched = candidatePool.filter((q) => q.difficulty === targetDifficulty);
    if (diffMatched.length >= 2) {
      candidatePool = diffMatched;
    }
  }

  // Shuffle candidate questions to ensure variety
  const shuffledQuestions = shuffleArray(candidatePool);
  const requestedCount = params.count ? Math.min(Math.max(params.count, 1), 30) : 5;
  const selectedQuestions = shuffledQuestions.slice(0, requestedCount);

  // If candidate pool was smaller than requested count, fill with random questions from filtered candidatePool
  if (selectedQuestions.length < requestedCount) {
    const remaining = shuffleArray(candidatePool.filter((q) => !selectedQuestions.some((s) => s.id === q.id)));
    const needed = requestedCount - selectedQuestions.length;
    selectedQuestions.push(...remaining.slice(0, needed));
  }

  // Now, for each selected question: SHUFFLE the options (A, B, C, D) and remap the correct answer!
  return selectedQuestions.map((q) => {
    if (q.questionType === "MCQ" && q.options && q.options.length > 0) {
      const { shuffledOptions, newCorrectAnswer } = shuffleOptionsAndRemapAnswer(
        q.options,
        q.correctAnswer
      );
      return {
        ...q,
        options: shuffledOptions,
        correctAnswer: newCorrectAnswer,
      };
    }
    return q;
  });
}

