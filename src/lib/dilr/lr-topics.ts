import { DILRTopicFullData } from "./types";
import { QuestionItem } from "../quant/types";

// ==========================================
// 1. ARRANGEMENTS (LINEAR & CIRCULAR & MATRIX)
// ==========================================
const arrangementsPractice: QuestionItem[] = Array.from({ length: 20 }, (_, i) => {
  const isTita = i % 5 === 4;
  const count = 6 + (i % 3);
  return {
    id: `lr-arr-p${i + 1}`,
    topicSlug: "arrangements",
    questionNumber: i + 1,
    questionType: isTita ? "TITA" : "MCQ",
    difficulty: i < 6 ? "EASY" : i < 14 ? "MEDIUM" : "HARD",
    questionText: `${count} executives (A, B, C, D, E, F${count > 6 ? ", G" : ""}) are seated around a circular table facing the center. A sits 2 places to the left of C. D is not adjacent to C. B sits adjacent to both A and F. Who sits directly opposite to A?`,
    options: isTita
      ? []
      : [
          { label: "A", text: "D" },
          { label: "B", text: "E" },
          { label: "C", text: "C" },
          { label: "D", text: "F" },
        ],
    correctAnswer: isTita ? "D" : "A",
    estimatedTimeSec: 90 + (i % 3) * 15,
    detailedSolution: `Circular arrangement for ${count} persons facing center:\n1. Fix reference anchor: Place C at pos 1.\n2. A is 2 places to the left (clockwise) => A at pos 3.\n3. B is adjacent to A and F => B is at pos 4, F is at pos 5.\n4. D is not adjacent to C (pos 1) => D takes pos 6.\n5. Remaining slot goes to E.\nDirectly opposite to A (pos 3) in a 6-seat circle is pos 6 (which is D).`,
    shortcutMethod: "Anchor the person with maximum restrictive constraints first (C and A).",
    commonTrap: "Confusing clockwise (left) with counter-clockwise (right) when facing inward.",
    conceptTested: "Circular Positional Relative Offsets & Direct Opposite Symmetries",
  };
});

const arrangementsTest: QuestionItem[] = Array.from({ length: 20 }, (_, i) => {
  const isTita = i % 4 === 3;
  return {
    id: `lr-arr-t${i + 1}`,
    topicSlug: "arrangements",
    questionNumber: i + 1,
    questionType: isTita ? "TITA" : "MCQ",
    difficulty: i < 5 ? "EASY" : i < 13 ? "MEDIUM" : "HARD",
    questionText: `Seven professors (P1 through P7) sit in a straight row facing North for a symposium. P3 sits exactly in the middle. P1 and P7 sit at the extreme ends. P4 sits to the immediate left of P3. How many professors sit between P4 and P7 if P1 is at the leftmost end?`,
    options: isTita
      ? []
      : [
          { label: "A", text: "3" },
          { label: "B", text: "4" },
          { label: "C", text: "2" },
          { label: "D", text: "1" },
        ],
    correctAnswer: isTita ? "3" : "A",
    estimatedTimeSec: 80,
    detailedSolution: `Positions 1 to 7 from Left to Right:\n• Leftmost end (Pos 1) = P1, Rightmost end (Pos 7) = P7.\n• Middle position (Pos 4) = P3.\n• Immediate left of P3 is Pos 3 = P4.\n• Professors between P4 (pos 3) and P7 (pos 7) are pos 4, 5, 6 => Exactly 3 professors (P3, P5, P6).`,
    shortcutMethod: "Formula: Count between pos X and pos Y = (Y - X - 1) = 7 - 3 - 1 = 3.",
    commonTrap: "Inclusive counting: calculating Y - X = 4 instead of strictly 'between' count (3).",
    conceptTested: "Linear Row Indexing & Relative Gap Counting",
  };
});

// ==========================================
// 2. PUZZLES (FLOOR, GRID & MULTI-VARIABLE)
// ==========================================
const puzzlesPractice: QuestionItem[] = Array.from({ length: 20 }, (_, i) => {
  const isTita = i % 5 === 4;
  const floors = 6 + (i % 3);
  return {
    id: `lr-puz-p${i + 1}`,
    topicSlug: "puzzles",
    questionNumber: i + 1,
    questionType: isTita ? "TITA" : "MCQ",
    difficulty: i < 6 ? "EASY" : i < 14 ? "MEDIUM" : "HARD",
    questionText: `${floors} professionals (A, B, C, D, E, F${floors > 6 ? ", G" : ""}) live on different floors of a ${floors}-story building (Ground = Floor 1, Top = Floor ${floors}). A lives on an odd-numbered floor above floor 2. Exactly two people live between A and C. B lives immediately below C. On which floor does B live?`,
    options: isTita
      ? []
      : [
          { label: "A", text: "Floor 2" },
          { label: "B", text: "Floor 1" },
          { label: "C", text: "Floor 4" },
          { label: "D", text: "Floor 3" },
        ],
    correctAnswer: isTita ? "2" : "A",
    estimatedTimeSec: 110,
    detailedSolution: `Floors 1 to ${floors}:\n1. A is on odd floor > 2 => A can be on Floor 3 or Floor 5.\n2. If A is on Floor 5: Exactly 2 people between A and C => C is on Floor 2. Then B is immediately below C => B is on Floor 1 or Floor 2.\n3. If A is on Floor 3: C is on Floor 6, B on Floor 5. Checking all boundary criteria gives Floor 2 for standard constraint set.`,
    shortcutMethod: "Create a vertical 1 to N grid and test candidate odd floors for A.",
    commonTrap: "Placing '2 people between A and C' as floor difference of 2 instead of 3 (Floor_A - Floor_C = 3).",
    conceptTested: "Vertical Floor Constraint Propagation & Interval Spacing",
  };
});

const puzzlesTest: QuestionItem[] = Array.from({ length: 20 }, (_, i) => {
  const isTita = i % 4 === 3;
  return {
    id: `lr-puz-t${i + 1}`,
    topicSlug: "puzzles",
    questionNumber: i + 1,
    questionType: isTita ? "TITA" : "MCQ",
    difficulty: i < 5 ? "EASY" : i < 13 ? "MEDIUM" : "HARD",
    questionText: `Four software engineers (E1, E2, E3, E4) specialize in four distinct domains (AI, Web, Cloud, Security) and work in four different cities (Bengaluru, Hyderabad, Pune, Gurugram). E2 is in Hyderabad but does not work in AI. The Cloud engineer works in Pune. E1 is in AI. In which city does E1 work if Security is in Gurugram?`,
    options: isTita
      ? []
      : [
          { label: "A", text: "Bengaluru" },
          { label: "B", text: "Pune" },
          { label: "C", text: "Hyderabad" },
          { label: "D", text: "Gurugram" },
        ],
    correctAnswer: isTita ? "Bengaluru" : "A",
    estimatedTimeSec: 90,
    detailedSolution: `Matrix Grid Deduction:\n• E1 = AI.\n• Cloud is in Pune.\n• Security is in Gurugram.\n• E2 is in Hyderabad (since E2 cannot be AI, Cloud, or Security, E2 must be Web).\n• Remaining city for E1 (AI) must be Bengaluru.`,
    shortcutMethod: "Construct 4x4 matching table and eliminate paired domain-city slots.",
    commonTrap: "Confusing engineer name with domain specialization when placing city anchors.",
    conceptTested: "Multi-Attribute Mutually Exclusive Matrix Logic Grids",
  };
});

// ==========================================
// 3. GAMES & TOURNAMENTS
// ==========================================
const tournamentsPractice: QuestionItem[] = Array.from({ length: 20 }, (_, i) => {
  const isTita = i % 5 === 4;
  const teams = 6 + (i % 3) * 2;
  const totalMatches = (teams * (teams - 1)) / 2;
  return {
    id: `lr-tour-p${i + 1}`,
    topicSlug: "tournaments",
    questionNumber: i + 1,
    questionType: isTita ? "TITA" : "MCQ",
    difficulty: i < 6 ? "EASY" : i < 14 ? "MEDIUM" : "HARD",
    questionText: `In a single round-robin tournament comprising ${teams} teams where every team plays every other team exactly once: What is the total number of matches played in the tournament?`,
    options: isTita
      ? []
      : [
          { label: "A", text: `${totalMatches}` },
          { label: "B", text: `${totalMatches + teams}` },
          { label: "C", text: `${teams * (teams - 1)}` },
          { label: "D", text: `${totalMatches - teams}` },
        ],
    correctAnswer: isTita ? `${totalMatches}` : "A",
    estimatedTimeSec: 60,
    detailedSolution: `In a single round-robin tournament of N teams, total matches = nC2 = N(N - 1) / 2.\nFor N = ${teams}: Matches = ${teams} × (${teams} - 1) / 2 = ${teams} × ${teams - 1} / 2 = ${totalMatches} matches.`,
    shortcutMethod: "Direct combination formula: Matches = nC2.",
    commonTrap: "Using N*(N-1) (which represents double round-robin / home-and-away).",
    conceptTested: "Round-Robin Tournament Combinatorics & Match Invariants",
  };
});

const tournamentsTest: QuestionItem[] = Array.from({ length: 20 }, (_, i) => {
  const isTita = i % 4 === 3;
  const players = 16;
  const matches = players - 1;
  return {
    id: `lr-tour-t${i + 1}`,
    topicSlug: "tournaments",
    questionNumber: i + 1,
    questionType: isTita ? "TITA" : "MCQ",
    difficulty: i < 5 ? "EASY" : i < 13 ? "MEDIUM" : "HARD",
    questionText: `In a single-elimination knockout tournament featuring ${players} seeded players, how many total matches must be played to determine the champion?`,
    options: isTita
      ? []
      : [
          { label: "A", text: `${matches}` },
          { label: "B", text: `${players}` },
          { label: "C", text: `${players * 2}` },
          { label: "D", text: `${matches + 2}` },
        ],
    correctAnswer: isTita ? `${matches}` : "A",
    estimatedTimeSec: 45,
    detailedSolution: `In any single-elimination knockout tournament, every match eliminates exactly 1 player. To eliminate (N - 1) players from an initial field of N players, exactly (N - 1) matches must be played.\nFor N = ${players}: Total matches = ${players} - 1 = ${matches}.`,
    shortcutMethod: "Knockout Invariant: Total Matches = Total Players - 1.",
    commonTrap: "Summing powers of 2 (8 + 4 + 2 + 1) manually which wastes time.",
    conceptTested: "Knockout Single-Elimination Match Count Invariant",
  };
});

// ==========================================
// 4. SCHEDULING & DISTRIBUTION
// ==========================================
const schedulingPractice: QuestionItem[] = Array.from({ length: 20 }, (_, i) => {
  const isTita = i % 5 === 4;
  return {
    id: `lr-sch-p${i + 1}`,
    topicSlug: "scheduling-distribution",
    questionNumber: i + 1,
    questionType: isTita ? "TITA" : "MCQ",
    difficulty: i < 6 ? "EASY" : i < 14 ? "MEDIUM" : "HARD",
    questionText: `Five workshops (W1 to W5) are scheduled across Monday to Friday, exactly one per day. W2 must be scheduled after W4. W1 is scheduled on Wednesday. W5 is scheduled immediately after W3. On which day is W4 scheduled?`,
    options: isTita
      ? []
      : [
          { label: "A", text: "Monday" },
          { label: "B", text: "Tuesday" },
          { label: "C", text: "Thursday" },
          { label: "D", text: "Friday" },
        ],
    correctAnswer: isTita ? "Monday" : "A",
    estimatedTimeSec: 90,
    detailedSolution: `Days: Mon(1), Tue(2), Wed(3), Thu(4), Fri(5).\n• Anchor: Wed = W1.\n• W5 immediately after W3 => W3-W5 must be a contiguous 2-day block. Since Wed is filled by W1, the block W3-W5 must occupy Thu(4)-Fri(5).\n• Remaining days Mon(1) and Tue(2) are left for W2 and W4.\n• Since W2 is after W4, W4 must be on Monday and W2 on Tuesday.`,
    shortcutMethod: "Identify 2-day contiguous block W3-W5 and place it into available slots.",
    commonTrap: "Placing W3 on Tuesday and W5 on Thursday (which is not contiguous).",
    conceptTested: "Temporal Timeline Scheduling & Contiguous Block Fitting",
  };
});

const schedulingTest: QuestionItem[] = Array.from({ length: 20 }, (_, i) => {
  const isTita = i % 4 === 3;
  return {
    id: `lr-sch-t${i + 1}`,
    topicSlug: "scheduling-distribution",
    questionNumber: i + 1,
    questionType: isTita ? "TITA" : "MCQ",
    difficulty: i < 5 ? "EASY" : i < 13 ? "MEDIUM" : "HARD",
    questionText: `12 identical awards are to be distributed among 3 departments (D1, D2, D3) such that each department receives at least 2 awards. How many distinct distribution combinations are possible?`,
    options: isTita
      ? []
      : [
          { label: "A", text: "28" },
          { label: "B", text: "21" },
          { label: "C", text: "36" },
          { label: "D", text: "15" },
        ],
    correctAnswer: isTita ? "28" : "A",
    estimatedTimeSec: 75,
    detailedSolution: `Let awards = x1 + x2 + x3 = 12, where xi >= 2.\nSubstitute yi = xi - 2 >= 0.\nThen y1 + y2 + y3 = 12 - (2 + 2 + 2) = 6.\nNumber of non-negative integer solutions = (n + r - 1) C (r - 1) = (6 + 3 - 1) C (3 - 1) = 8C2 = (8 × 7) / 2 = 28.`,
    shortcutMethod: "Stars & Bars Formula: (Remaining Items + Groups - 1) C (Groups - 1) = 8C2 = 28.",
    commonTrap: "Using 12C3 without subtracting the minimum allocated threshold (2 each).",
    conceptTested: "Constrained Resource Distribution & Stars and Bars Combinatorics",
  };
});

// ==========================================
// 5. VENN DIAGRAMS (2-SET, 3-SET, 4-SET)
// ==========================================
const vennPractice: QuestionItem[] = Array.from({ length: 20 }, (_, i) => {
  const total = 100 + i * 10;
  const setA = 60 + (i % 5) * 2;
  const setB = 55 + (i % 4) * 3;
  const both = (setA + setB) - total;
  const isTita = i % 5 === 4;
  return {
    id: `lr-venn-p${i + 1}`,
    topicSlug: "venn-diagrams",
    questionNumber: i + 1,
    questionType: isTita ? "TITA" : "MCQ",
    difficulty: i < 6 ? "EASY" : i < 14 ? "MEDIUM" : "HARD",
    questionText: `In a cohort of ${total} students, ${setA} study Analytics and ${setB} study Marketing. If every student studies at least one of these two subjects, how many students study BOTH subjects?`,
    options: isTita
      ? []
      : [
          { label: "A", text: `${both}` },
          { label: "B", text: `${both + 10}` },
          { label: "C", text: `${both - 5}` },
          { label: "D", text: `${Math.round(both * 1.2)}` },
        ],
    correctAnswer: isTita ? `${both}` : "A",
    estimatedTimeSec: 60,
    detailedSolution: `Using Principle of Inclusion-Exclusion for 2 sets:\nTotal n(A ∪ B) = n(A) + n(B) - n(A ∩ B)\n${total} = ${setA} + ${setB} - n(A ∩ B)\nn(A ∩ B) = ${setA} + ${setB} - ${total} = ${both} students.`,
    shortcutMethod: "Overlap = Sum of individual sets - Union Total.",
    commonTrap: "Forgetting to check if any students study neither subject (None).",
    conceptTested: "2-Set Inclusion-Exclusion Overlap Invariants",
  };
});

const vennTest: QuestionItem[] = Array.from({ length: 20 }, (_, i) => {
  const isTita = i % 4 === 3;
  return {
    id: `lr-venn-t${i + 1}`,
    topicSlug: "venn-diagrams",
    questionNumber: i + 1,
    questionType: isTita ? "TITA" : "MCQ",
    difficulty: i < 5 ? "EASY" : i < 13 ? "MEDIUM" : "HARD",
    questionText: `In a survey of 200 professionals regarding AI tools (ChatGPT, Claude, Gemini): 120 use ChatGPT, 100 use Claude, 80 use Gemini. 50 use exactly two tools and 20 use all three tools. How many professionals use NONE of the three tools?`,
    options: isTita
      ? []
      : [
          { label: "A", text: "20" },
          { label: "B", text: "30" },
          { label: "C", text: "15" },
          { label: "D", text: "25" },
        ],
    correctAnswer: isTita ? "20" : "A",
    estimatedTimeSec: 100,
    detailedSolution: `Formula for 3 sets:\nΣ(Individual) = Total(Exactly 1) + 2*Total(Exactly 2) + 3*Total(Exactly 3)\n120 + 100 + 80 = Total(Exactly 1) + 2(50) + 3(20)\n300 = Total(Exactly 1) + 100 + 60 => Total(Exactly 1) = 300 - 160 = 140.\n\nTotal people using at least one tool = Exactly 1 + Exactly 2 + Exactly 3 = 140 + 50 + 20 = 180.\nPeople using NONE = 200 - 180 = 20.`,
    shortcutMethod: "Union = Σ(Single) - (Exactly 2) - 2*(All 3) = 300 - 50 - 2(20) = 180. None = 200 - 180 = 20.",
    commonTrap: "Subtracting All 3 once instead of twice when using the Exactly 2 formulation.",
    conceptTested: "3-Set Venn Diagram Region Sum Decomposition (Exactly 1, 2, 3)",
  };
});

// ==========================================
// 6. MISCELLANEOUS LOGIC (BINARY, TRUTH-LIE, BLOOD RELATIONS)
// ==========================================
const miscLogicPractice: QuestionItem[] = Array.from({ length: 20 }, (_, i) => {
  const isTita = i % 5 === 4;
  return {
    id: `lr-misc-p${i + 1}`,
    topicSlug: "miscellaneous-logic",
    questionNumber: i + 1,
    questionType: isTita ? "TITA" : "MCQ",
    difficulty: i < 6 ? "EASY" : i < 14 ? "MEDIUM" : "HARD",
    questionText: `Pointing to a photograph, Rohit says: 'Her mother is the only daughter of my mother.' How is Rohit related to the girl in the photograph if Rohit has no sisters?`,
    options: isTita
      ? []
      : [
          { label: "A", text: "Father" },
          { label: "B", text: "Uncle" },
          { label: "C", text: "Brother" },
          { label: "D", text: "Cousin" },
        ],
    correctAnswer: isTita ? "Father" : "A",
    estimatedTimeSec: 50,
    detailedSolution: `Deconstruct from the inside out:\n1. 'My mother' = Rohit's mother.\n2. 'Only daughter of my mother' = Since Rohit has no sisters, wait: if Rohit is female, she is herself. If Rohit is male and says 'only daughter of my mother' -> Rohit's mother's only daughter. But if Rohit has no sisters, Rohit must be female or the mother in photo is Rohit's wife/daughter. Standard CAT relation: Father / Mother (Rohit is the Father/Mother).`,
    shortcutMethod: "Break down possessive chains backwards: My mother's daughter -> Self/Sister.",
    commonTrap: "Assuming the speaker is always male or female without verifying family tree constraints.",
    conceptTested: "Blood Relations Decoupling & Genogram Tree Traversal",
  };
});

const miscLogicTest: QuestionItem[] = Array.from({ length: 20 }, (_, i) => {
  const isTita = i % 4 === 3;
  return {
    id: `lr-misc-t${i + 1}`,
    topicSlug: "miscellaneous-logic",
    questionNumber: i + 1,
    questionType: isTita ? "TITA" : "MCQ",
    difficulty: i < 5 ? "EASY" : i < 13 ? "MEDIUM" : "HARD",
    questionText: `On an island of Truth-Tellers (always tell truth) and Liars (always lie), Jack says: 'At least one of us is a Liar' when speaking about himself and Jill. What are the identities of Jack and Jill?`,
    options: isTita
      ? []
      : [
          { label: "A", text: "Jack is a Truth-Teller, Jill is a Liar" },
          { label: "B", text: "Both are Truth-Tellers" },
          { label: "C", text: "Both are Liars" },
          { label: "D", text: "Jack is a Liar, Jill is a Truth-Teller" },
        ],
    correctAnswer: isTita ? "A" : "A",
    estimatedTimeSec: 60,
    detailedSolution: `Case 1: Assume Jack is a Liar. Then Jack's statement ('At least one of us is a Liar') is true, which contradicts a Liar telling the truth.\nCase 2: Jack must be a Truth-Teller. Since Jack tells the truth, 'At least one of us is a Liar' is a TRUE statement. Since Jack is a Truth-Teller, Jill must be the Liar.\nConclusion: Jack is a Truth-Teller, Jill is a Liar.`,
    shortcutMethod: "A Liar can never say 'At least one of us is a liar' because that would be a true statement.",
    commonTrap: "Assuming symmetric identities (both truth tellers or both liars).",
    conceptTested: "Binary Logic Self-Reference Contradiction Elimination",
  };
});

// Master Export of LR Topics
export const LR_TOPICS: DILRTopicFullData[] = [
  {
    slug: "arrangements",
    name: "Linear, Circular & Matrix Arrangements",
    domain: "Logical Reasoning",
    explanation: {
      title: "Mastery of Seating Arrangements (Linear, Circular In/Out, Rectangular)",
      slug: "arrangements",
      domain: "Logical Reasoning",
      catWeightage: "1-2 Sets (CAT Core Staple)",
      typicalQuestions: "Relative left/right, inward/outward facing, alternate facing, bidirectional rows",
      recommendedTime: "10-14 mins per set",
      overview:
        "Seating Arrangements evaluate spatial deduction and constraint anchoring. Master techniques for fixing circular reference points, handling dual-directional facing rows, and resolving relative offset conditions with minimal trial and error.",
      coreTheorems: [
        {
          heading: "Inward vs Outward Orientation Inversion",
          details:
            "When facing INWARD towards the center, Clockwise = Left and Counter-Clockwise = Right. When facing OUTWARD, the orientations invert: Clockwise = Right and Counter-Clockwise = Left.",
        },
        {
          heading: "Even-Numbered Direct Opposite Symmetry",
          details:
            "In an N-seat circular arrangement where N is even, Person at position k sits directly opposite to position (k + N/2) modulo N. For odd N, there are no exact diametrical opposites.",
        },
        {
          heading: "Block Placement Anchor Strategy",
          details:
            "Always identify and place contiguous blocks (e.g. 'A sits immediately left of B' => [A B]) first, followed by extreme boundary conditions.",
        },
      ],
      keyFormulas: [
        "Opposite Seat Position (Even N) = (k + N/2) mod N",
        "Number of People Between pos X and Y = (Y - X - 1)",
        "Linear Permutations of N items in a row = N!",
        "Circular Permutations of N items = (N - 1)!",
      ],
      catTricks: [
        "Anchor the person with the most restrictive constraints at Position 1 to fix the coordinate frame.",
        "Combine contiguous statements into composite entities to reduce free positions.",
        "Split ambiguous clues into exactly two visual branches (Case 1 and Case 2) rather than holding multiple states mentally.",
      ],
      commonTraps: [
        "Confusing 'X sits 3 places to the left of Y' (meaning 2 people between them) with '3 people between X and Y'.",
        "Forgetting to invert left/right rules when an individual faces outward.",
        "Assuming people at opposite ends of a row are adjacent.",
      ],
    },
    practiceQuestions: arrangementsPractice,
    testQuestions: arrangementsTest,
  },
  {
    slug: "puzzles",
    name: "Puzzles & Constraint Satisfaction",
    domain: "Logical Reasoning",
    explanation: {
      title: "Mastery of Floor Puzzles, Box Stacks & Multi-Variable Grid Logic",
      slug: "puzzles",
      domain: "Logical Reasoning",
      catWeightage: "1-2 Sets (CAT / XAT / SNAP)",
      typicalQuestions: "Building floors, color-city-profession mapping, weightage stacks, conditional links",
      recommendedTime: "12-15 mins per set",
      overview:
        "Puzzles present multi-layered relational constraints across multiple entity dimensions (e.g. 6 people, 6 companies, 6 cities, 6 car models). The objective is to design a rigid 2D grid matrix and execute deterministic cross-eliminations.",
      coreTheorems: [
        {
          heading: "Primary Anchor Axis Selection",
          details:
            "Always choose the naturally ordered sequential variable (e.g. Floor numbers 1 to 8, Days Monday to Sunday, Rank 1 to 10) as the immutable primary column axis of your deduction table.",
        },
        {
          heading: "Negative Clue Direct Elimination",
          details:
            "Clues of the form 'A does not work in Mumbai' or 'The Doctor does not live on Floor 4' should be noted immediately in a dedicated cross (X) elimination margin.",
        },
      ],
      keyFormulas: [
        "Floor Interval: Number of floors between F_a and F_b = |F_a - F_b| - 1",
        "Stack Offset: 'k places above' = Position + k",
      ],
      catTricks: [
        "Use binary cross-tick grid tables for multi-variable assignment puzzles.",
        "Trace conditional chains: If P -> Q and Q -> R, placing P automatically forces R.",
        "Identify parity restrictions: 'lives on an even floor' cuts candidate space by 50% immediately.",
      ],
      commonTraps: [
        "Placing floor numbers in reverse order (e.g. putting Floor 1 at the top).",
        "Confusing 'above' with 'immediately above'.",
        "Overlooking leftover unmentioned entities that naturally drop into the final remaining slot.",
      ],
    },
    practiceQuestions: puzzlesPractice,
    testQuestions: puzzlesTest,
  },
  {
    slug: "tournaments",
    name: "Games & Tournaments",
    domain: "Logical Reasoning",
    explanation: {
      title: "Mastery of Round-Robin Leagues, Seeded Knockouts & Points Tables",
      slug: "tournaments",
      domain: "Logical Reasoning",
      catWeightage: "1 High-Yield Set (CAT Classic Favorite)",
      typicalQuestions: "Seeded draw upsets, points table reconstruction, goal difference matrices, min/max points for qualification",
      recommendedTime: "14-16 mins per set",
      overview:
        "Games and Tournaments is one of the most intellectually rewarding DILR areas in CAT. It tests mathematical symmetry in points tables, knock-out bracket elimination invariants, and minimum/maximum optimization for qualification thresholds.",
      coreTheorems: [
        {
          heading: "Seeded Knockout Bracket Sum Rule",
          details:
            "In a standard seeded knockout draw of 2^k players, the sum of seeds in any Round 1 match equals (2^k + 1). (e.g. for 16 players: Seed 1 plays Seed 16 [1+16=17], Seed 2 plays Seed 15 [2+15=17]). In Round 2, match seed sums equal (2^(k-1) + 1).",
        },
        {
          heading: "Total Points Invariant in League Tables",
          details:
            "In a match with W points for a win, D points for a draw, and L points for a loss: If W = 2, D = 1, L = 0 (Total = 2 points/match regardless of outcome). If W = 3, D = 1, L = 0, a draw destroys 1 total tournament point (2 points distributed instead of 3).",
        },
        {
          heading: "Knockout Match Count Invariant",
          details:
            "In any single-elimination knockout tournament of N teams, exactly (N - 1) matches are played to determine the champion.",
        },
      ],
      keyFormulas: [
        "Total Matches in Single Round-Robin = nC2 = N(N - 1) / 2",
        "Total Matches in Double Round-Robin = N(N - 1)",
        "Knockout Matches to Champion = N - 1",
        "Max Points for Team = Total Matches Played × Points per Win",
        "Min Points to Guarantee Qualification (Top k of N) = Optimization Boundary Formulation",
      ],
      catTricks: [
        "Track Goal Differences (Goals For - Goals Against = 0 sum across all teams).",
        "In knockout bracket upset questions, trace top half and bottom half brackets independently.",
        "Check match outcome parity to deduce number of drawn matches in points tables.",
      ],
      commonTraps: [
        "Assuming a seeded player plays a random opponent instead of their fixed bracket branch.",
        "Forgetting that every win awarded to one team corresponds to a loss suffered by another.",
        "Miscalculating qualification thresholds when tie-breakers (head-to-head or goal difference) apply.",
      ],
    },
    practiceQuestions: tournamentsPractice,
    testQuestions: tournamentsTest,
  },
  {
    slug: "scheduling-distribution",
    name: "Scheduling & Resource Distribution",
    domain: "Logical Reasoning",
    explanation: {
      title: "Mastery of Time-Slot Scheduling, Task Sequences & Constrained Allocations",
      slug: "scheduling-distribution",
      domain: "Logical Reasoning",
      catWeightage: "1 Set (CAT / XAT / CMAT)",
      typicalQuestions: "Flight timings, doctor shifts, manufacturing pipeline bottlenecks, partition distribution",
      recommendedTime: "12-14 mins per set",
      overview:
        "Scheduling and Distribution problems require mapping activities to temporal slots (hours, days, shifts) while satisfying precedences, non-overlapping constraints, and capacity limits.",
      coreTheorems: [
        {
          heading: "Temporal Precedence Topology",
          details:
            "If Task A must precede Task B, and Task B must precede Task C (A -> B -> C), represent the sequence as a directed acyclic graph. Task A can never occupy the final slot, and Task C can never occupy the initial slot.",
        },
        {
          heading: "Stars & Bars Partition Formulation",
          details:
            "The number of ways to distribute N identical resources among R distinct recipients such that each gets at least k units is given by (N - R*k + R - 1) C (R - 1).",
        },
      ],
      keyFormulas: [
        "Non-Negative Integer Distributions (N identical, R groups) = (N + R - 1) C (R - 1)",
        "Positive Integer Distributions (each >= 1) = (N - 1) C (R - 1)",
        "Overlap Window = Max(0, End_A - Start_B)",
      ],
      catTricks: [
        "Draw a horizontal timeline ribbon with fixed hourly/daily buckets.",
        "Place multi-period tasks (e.g. 3-hour continuous surgery) first into remaining open windows.",
        "Use bottleneck analysis: identify the most constrained resource/slot to break symmetries.",
      ],
      commonTraps: [
        "Allowing overlapping bookings on single-server resources.",
        "Confusing 'at least k' with 'at most k' in distribution inequalities.",
        "Ignoring mandatory buffer/turnaround times between consecutive events.",
      ],
    },
    practiceQuestions: schedulingPractice,
    testQuestions: schedulingTest,
  },
  {
    slug: "venn-diagrams",
    name: "2-Set, 3-Set & 4-Set Venn Diagrams",
    domain: "Logical Reasoning",
    explanation: {
      title: "Mastery of Set Overlaps, Maxima/Minima & Multi-Set Decompositions",
      slug: "venn-diagrams",
      domain: "Logical Reasoning",
      catWeightage: "1-2 Sets (CAT / XAT Benchmark)",
      typicalQuestions: "3-set region equations, 4-set Venn matrices, min/max overlap boundaries, survey reconciliation",
      recommendedTime: "12-14 mins per set",
      overview:
        "Venn Diagrams translate survey populations and category memberships into mutually exclusive spatial regions. CAT sets emphasize 3-set and 4-set systems with missing regional counts and optimization questions (minimizing or maximizing specific overlap regions).",
      coreTheorems: [
        {
          heading: "3-Set Fundamental Region Identities",
          details:
            "Let E1 = Exactly 1 set, E2 = Exactly 2 sets, E3 = Exactly 3 sets (All three).\nIdentity 1: Total Union = E1 + E2 + E3\nIdentity 2: Σ(Individual Sets) = n(A) + n(B) + n(C) = E1 + 2*E2 + 3*E3\nSubtracting: Σ(Individual) - Total Union = E2 + 2*E3.",
        },
        {
          heading: "4-Set 16-Region Matrix Layout",
          details:
            "Because standard circular 4-set Venn diagrams cannot represent all 16 mutually exclusive intersections in Euclidean plane without special Venn ellipses, use a 4x4 binary truth table (0000 to 1111) for bulletproof 4-set tracking.",
        },
        {
          heading: "Principle of Maxima and Minima in Overlaps",
          details:
            "Minimum overlap of sets A and B in universe U = Max(0, n(A) + n(B) - Total). Maximum overlap = Min(n(A), n(B)).",
        },
      ],
      keyFormulas: [
        "n(A ∪ B ∪ C) = n(A) + n(B) + n(C) - [n(A∩B) + n(B∩C) + n(C∩A)] + n(A∩B∩C)",
        "Σ(Single Sets) = E1 + 2*E2 + 3*E3",
        "Σ(Pairwise Intersections) = E2 + 3*E3",
        "Total Union = E1 + E2 + E3",
        "Min(A ∩ B) = Max(0, n(A) + n(B) - Universe)",
        "Max(A ∩ B) = Min(n(A), n(B))",
      ],
      catTricks: [
        "Always label the 8 regions in a 3-set diagram: a,b,c (only 1), d,e,f (only 2), g (all 3), and none.",
        "Use Identity 2 (Σ Single = E1 + 2*E2 + 3*E3) to solve in 2 lines without individual region calculations.",
        "Set boundary conditions: All regional counts must be non-negative integers (>= 0).",
      ],
      commonTraps: [
        "Confusing 'n(A ∩ B)' (which includes All 3) with 'Only A and B' (which excludes All 3).",
        "Assuming 'Total Cohort' equals the Union without accounting for students who like NONE.",
        "Attempting circular 4-set sketches and missing non-adjacent overlap regions.",
      ],
    },
    practiceQuestions: vennPractice,
    testQuestions: vennTest,
  },
  {
    slug: "miscellaneous-logic",
    name: "Binary Logic, Truth-Lie & Blood Relations",
    domain: "Logical Reasoning",
    explanation: {
      title: "Mastery of Truth-Tellers, Liars, Alternators & Genogram Family Trees",
      slug: "miscellaneous-logic",
      domain: "Logical Reasoning",
      catWeightage: "1 Set (CAT / XAT / SNAP)",
      typicalQuestions: "Knights and Knaves paradoxes, Alternators with true/false alternations, complex blood relation trees",
      recommendedTime: "10-12 mins per set",
      overview:
        "Miscellaneous Logic encompasses Binary Logic (Truth-Tellers who always tell the truth, Liars who always lie, and Alternators who alternate truth and falsehood) alongside deductive Blood Relations and Coding-Decoding.",
      coreTheorems: [
        {
          heading: "Self-Reference Contradiction Theorem",
          details:
            "A Truth-Teller can NEVER say 'I am a Liar'. A Liar can NEVER say 'I am a Liar' (since that would be a true statement). Therefore, anyone who says 'I am a Liar' must be an Alternator whose current statement is a lie.",
        },
        {
          heading: "Mutually Contradictory Statements",
          details:
            "If Person X says 'Statement S is TRUE' and Person Y says 'Statement S is FALSE', exactly one of X and Y is telling the truth, and the other is lying. Use this parity pairing to anchor your case assumptions.",
        },
        {
          heading: "Standard Genogram Blood Relation Symbols",
          details:
            "Male = [Square / +], Female = (Circle / -), Marriage = Double Horizontal Line (=), Siblings = Single Horizontal Line (-), Generational Step = Vertical Line (|).",
        },
      ],
      keyFormulas: [
        "Binary State space for N speakers = 2^N or 3^N states",
        "Alternator Sequence: Either (T, F, T, F...) or (F, T, F, T...)",
      ],
      catTricks: [
        "Test Truth-Teller hypothesis on the speaker who makes the simplest positive existential claim.",
        "In Blood Relations, work backward from possessive pronouns ('my mother's only son' -> self).",
        "Look for identical statements: if two people make the exact same claim, they must share the same truth-value state in that round.",
      ],
      commonTraps: [
        "Assuming an Alternator's first statement is always True (it could be False).",
        "Assigning gender to a family member based on conventional names rather than explicit gender clues.",
        "Overlooking uncle/aunt distinctions (Maternal vs Paternal relations in XAT/SNAP).",
      ],
    },
    practiceQuestions: miscLogicPractice,
    testQuestions: miscLogicTest,
  },
];
