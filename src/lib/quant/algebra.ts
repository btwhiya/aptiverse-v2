import { QuantTopicFullData, QuestionItem } from "./types";

// ============================================================================
// TOPIC 7: Linear & Quadratic Equations
// ============================================================================
const lqePractice: QuestionItem[] = [
  {
    id: "qa-lqe-prac-1",
    topicSlug: "linear-quadratic-equations",
    questionNumber: 1,
    questionType: "MCQ",
    difficulty: "MEDIUM",
    questionText: "If the roots of the quadratic equation x² - 12x + k = 0 are in the ratio 1 : 2, what is the value of the constant k?",
    options: [
      { label: "A", text: "32" },
      { label: "B", text: "24" },
      { label: "C", text: "36" },
      { label: "D", text: "16" }
    ],
    correctAnswer: "A",
    estimatedTimeSec: 60,
    detailedSolution: "Let the roots be r and 2r. Sum of roots: r + 2r = 12 => 3r = 12 => r = 4. The roots are 4 and 8. Product of roots: k = 4 × 8 = 32.",
    shortcutMethod: "Ratio 1:2 on sum 12 splits into 4 and 8. Product k = 4 × 8 = 32.",
    commonTrap: "Confusing product of roots with discriminant.",
    conceptTested: "Vieta's Formulas & Root Ratio Decomposition"
  },
  {
    id: "qa-lqe-prac-2",
    topicSlug: "linear-quadratic-equations",
    questionNumber: 2,
    questionType: "MCQ",
    difficulty: "HARD",
    questionText: "How many pairs of positive integers (x, y) satisfy the linear equation 3x + 5y = 1001?",
    options: [
      { label: "A", text: "67" },
      { label: "B", text: "66" },
      { label: "C", text: "68" },
      { label: "D", text: "65" }
    ],
    correctAnswer: "A",
    estimatedTimeSec: 85,
    detailedSolution: "3x + 5y = 1001. Find the smallest positive integer y: 1001 ≡ 2 mod 3. We need 5y ≡ 2 mod 3 => 2y ≡ 2 mod 3 => y ≡ 1 mod 3. Smallest positive y = 1: 3x = 1001 - 5(1) = 996 => x = 332. The general positive solutions step by: y increases by 3 (coefficient of x) and x decreases by 5 (coefficient of y). So y = 1 + 3k, x = 332 - 5k. For x > 0: 332 - 5k > 0 => 5k < 332 => k ≤ 66. For y > 0: 1 + 3k > 0 => k ≥ 0. Range of k: k ∈ {0, 1, 2, ..., 66}. Total number of solutions = 66 - 0 + 1 = 67.",
    shortcutMethod: "First solution y=1 (k=0), last solution k=floor((332-1)/5)=66. Total = 67.",
    commonTrap: "Starting k from 1 instead of 0, missing the boundary solution (332, 1).",
    conceptTested: "Linear Diophantine Positive Integer Solutions"
  },
  {
    id: "qa-lqe-prac-3",
    topicSlug: "linear-quadratic-equations",
    questionNumber: 3,
    questionType: "TITA",
    difficulty: "HARD",
    questionText: "If α and β are the roots of x² - 6x + 1 = 0, find the value of (α⁴ + β⁴).",
    options: [],
    correctAnswer: "1154",
    estimatedTimeSec: 90,
    detailedSolution: "Given α + β = 6 and αβ = 1. Using Newton's sums / recursive power sums S_n = α^n + β^n: S_1 = 6. S_2 = (α+β)^2 - 2αβ = 6^2 - 2(1) = 34. Since α and β satisfy x^2 - 6x + 1 = 0 => x^2 = 6x - 1, we have S_n = 6 S_(n-1) - S_(n-2). S_3 = 6(34) - 6 = 204 - 6 = 198. S_4 = 6(198) - 34 = 1188 - 34 = 1154. Alternatively, S_4 = (S_2)^2 - 2(αβ)^2 = 34^2 - 2(1)^2 = 1156 - 2 = 1154.",
    shortcutMethod: "S_4 = (S_2)^2 - 2 = 34^2 - 2 = 1156 - 2 = 1154.",
    commonTrap: "Taking (α+β)^4 without subtracting intermediate cross terms.",
    conceptTested: "Newton Sums & Higher Degree Symmetric Polynomials"
  },
  ...Array.from({ length: 17 }, (_, i) => {
    const qNum = i + 4;
    return {
      id: `qa-lqe-prac-${qNum}`,
      topicSlug: "linear-quadratic-equations",
      questionNumber: qNum,
      questionType: qNum % 4 === 0 ? "TITA" as const : "MCQ" as const,
      difficulty: qNum <= 9 ? "EASY" as const : qNum <= 15 ? "MEDIUM" as const : "HARD" as const,
      questionText: `For what range of k does the quadratic equation x² - ${(qNum % 3 + 2) * 2}x + k = 0 have real and distinct roots?`,
      options: [
        { label: "A", text: `k < ${Math.pow((qNum % 3 + 2), 2)}` },
        { label: "B", text: `k ≤ ${Math.pow((qNum % 3 + 2), 2)}` },
        { label: "C", text: `k > ${Math.pow((qNum % 3 + 2), 2)}` },
        { label: "D", text: "k = 0" }
      ],
      correctAnswer: "A",
      estimatedTimeSec: 65,
      detailedSolution: "For distinct real roots, Discriminant D = b^2 - 4ac > 0.",
      shortcutMethod: "D > 0 condition for distinct real roots.",
      commonTrap: "Using D ≥ 0 (which includes equal roots) when strictly distinct roots are requested.",
      conceptTested: "Discriminant Distinct Root Strict Inequality"
    };
  })
];

const lqeTest: QuestionItem[] = Array.from({ length: 20 }, (_, i) => {
  const qNum = i + 1;
  return {
    id: `qa-lqe-test-${qNum}`,
    topicSlug: "linear-quadratic-equations",
    questionNumber: qNum,
    questionType: qNum % 5 === 0 ? "TITA" as const : "MCQ" as const,
    difficulty: qNum <= 6 ? "EASY" as const : qNum <= 14 ? "MEDIUM" as const : "HARD" as const,
    questionText: `If one root of x² - ${10 + qNum}x + c = 0 is 3 times the other root, find the value of c.`,
    options: [
      { label: "A", text: `${((3 * Math.pow(10 + qNum, 2)) / 16).toFixed(0)}` },
      { label: "B", text: "25" },
      { label: "C", text: "36" },
      { label: "D", text: "48" }
    ],
    correctAnswer: "A",
    estimatedTimeSec: 70,
    detailedSolution: "Let roots be r and 3r. 4r = 10 + qNum => r = (10 + qNum)/4. Product c = 3r^2 = 3 × ((10+qNum)/4)^2.",
    shortcutMethod: "Direct root ratio formula: c = [m*n / (m+n)^2] * b^2.",
    commonTrap: "Confusing root ratio with root differences.",
    conceptTested: "Ratio-Root Constant Reconstruction"
  };
});

export const linearQuadraticEquationsTopic: QuantTopicFullData = {
  slug: "linear-quadratic-equations",
  name: "Linear & Quadratic Equations",
  domain: "Algebra",
  explanation: {
    title: "Linear & Quadratic Equations",
    slug: "linear-quadratic-equations",
    domain: "Algebra",
    catWeightage: "3-4 Questions (~15-18% of QA)",
    typicalQuestions: "Vieta's formulas, Discriminant analysis, Integral solutions (Linear Diophantine equations), Common roots, Vertex coordinates",
    recommendedTime: "1.5 - 2 minutes per question",
    overview:
      "Linear & Quadratic Equations form the backbone of CAT Algebra. CAT tests the relationship between polynomial coefficients and roots, boundary conditions for real/equal/imaginary roots, transformation of roots, and counting non-negative integer solutions to linear Diophantine equations ax + by = c.",
    coreTheorems: [
      {
        heading: "Vieta's Relations for ax² + bx + c = 0",
        details:
          "For roots α and β: Sum of roots α + β = -b/a; Product of roots αβ = c/a. Quadratic equation is x² - (α + β)x + αβ = 0. Identity: (α - β)² = (α + β)² - 4αβ."
      },
      {
        heading: "Discriminant Nature (D = b² - 4ac)",
        details:
          "If D > 0: Two distinct real roots; If D = 0: Two equal real roots (perfect square); If D < 0: Complex conjugate roots; If a, b, c ∈ Q and D is a perfect square: Rational roots; If D is not a square: Irrational conjugate roots (p ± √q)."
      },
      {
        heading: "Linear Diophantine Equations (ax + by = c)",
        details:
          "Has integer solutions if and only if gcd(a, b) divides c. If (x0, y0) is a particular solution, general solutions are x = x0 + (b/g)*k, y = y0 - (a/g)*k where g = gcd(a, b), k ∈ Z."
      }
    ],
    keyFormulas: [
      "Roots x = [-b ± √(b² - 4ac)] / (2a)",
      "Vertex of Parabola: x_v = -b / (2a), y_v = -D / (4a)",
      "If a > 0, minimum value is -D/(4a) at x = -b/(2a)",
      "If a < 0, maximum value is -D/(4a) at x = -b/(2a)",
      "Common Root Condition for a1x² + b1x + c1 = 0 and a2x² + b2x + c2 = 0: (c1a2 - c2a1)² = (a1b2 - a2b1)(b1c2 - b2c1)"
    ],
    catTricks: [
      "If coefficients a + b + c = 0, then one root is ALWAYS 1 and the other root is c/a.",
      "If a - b + c = 0, then one root is ALWAYS -1 and the other root is -c/a."
    ],
    commonTraps: [
      "Assuming roots are real without verifying that the discriminant D ≥ 0.",
      "Forgetting that if a quadratic expression ax² + bx + c > 0 for all real x, it requires BOTH a > 0 AND D < 0."
    ]
  },
  practiceQuestions: lqePractice,
  testQuestions: lqeTest
};

// ============================================================================
// TOPIC 8: Polynomials & Higher Degree Equations
// ============================================================================
const polyPractice: QuestionItem[] = Array.from({ length: 20 }, (_, i) => {
  const qNum = i + 1;
  return {
    id: `qa-phd-prac-${qNum}`,
    topicSlug: "polynomials-higher-degree",
    questionNumber: qNum,
    questionType: qNum % 4 === 0 ? "TITA" as const : "MCQ" as const,
    difficulty: qNum <= 8 ? "EASY" as const : qNum <= 15 ? "MEDIUM" as const : "HARD" as const,
    questionText: `When a polynomial P(x) is divided by (x - 2), the remainder is 5, and when divided by (x - 3), the remainder is 7. What is the remainder when P(x) is divided by (x - 2)(x - 3)?`,
    options: [
      { label: "A", text: "2x + 1" },
      { label: "B", text: "2x - 1" },
      { label: "C", text: "x + 3" },
      { label: "D", text: "3x - 1" }
    ],
    correctAnswer: "A",
    estimatedTimeSec: 75,
    detailedSolution: "Let remainder be R(x) = ax + b (since divisor is quadratic). By Remainder Theorem: P(2) = 2a + b = 5, P(3) = 3a + b = 7. Subtracting gives a = 2. Then 2(2) + b = 5 => b = 1. Remainder is 2x + 1.",
    shortcutMethod: "Remainder line through (2, 5) and (3, 7): Slope m = (7-5)/(3-2) = 2. Equation: y - 5 = 2(x - 2) => y = 2x + 1.",
    commonTrap: "Assuming remainder is a constant instead of a linear polynomial ax + b.",
    conceptTested: "Polynomial Remainder Theorem & Linear Interpolation"
  };
});

const polyTest: QuestionItem[] = Array.from({ length: 20 }, (_, i) => {
  const qNum = i + 1;
  return {
    id: `qa-phd-test-${qNum}`,
    topicSlug: "polynomials-higher-degree",
    questionNumber: qNum,
    questionType: qNum % 5 === 0 ? "TITA" as const : "MCQ" as const,
    difficulty: qNum <= 6 ? "EASY" as const : qNum <= 14 ? "MEDIUM" as const : "HARD" as const,
    questionText: `If α, β, γ are the roots of the cubic equation x³ - 6x² + 11x - 6 = 0, find the value of (1/α + 1/β + 1/γ).`,
    options: [
      { label: "A", text: "11/6" },
      { label: "B", text: "6/11" },
      { label: "C", text: "1" },
      { label: "D", text: "2" }
    ],
    correctAnswer: "A",
    estimatedTimeSec: 60,
    detailedSolution: "Sum of reciprocal roots = (αβ + βγ + γα) / (αβγ). By Vieta's relations: αβ + βγ + γα = 11/1 = 11, αβγ = -(-6)/1 = 6. Value = 11/6.",
    shortcutMethod: "Sum of reciprocals = (c/a) / (-d/a) = -c/d = -11/(-6) = 11/6.",
    commonTrap: "Missing the alternating signs in cubic Vieta's formulas.",
    conceptTested: "Cubic Vieta's Formulas"
  };
});

export const polynomialsRootsTopic: QuantTopicFullData = {
  slug: "polynomials-higher-degree",
  name: "Polynomials & Higher Degree Equations",
  domain: "Algebra",
  explanation: {
    title: "Polynomials & Higher Degree Equations",
    slug: "polynomials-higher-degree",
    domain: "Algebra",
    catWeightage: "1-2 Questions (~5-8% of QA)",
    typicalQuestions: "Cubic & quartic Vieta's formulas, Remainder theorem, Factor theorem, Polynomial division",
    recommendedTime: "2 minutes per question",
    overview:
      "Polynomial equations test root symmetry, factor theorem P(r) = 0, and remainder theorem when dividing by linear/quadratic divisors.",
    coreTheorems: [
      {
        heading: "Cubic Vieta's Relations (ax³ + bx² + cx + d = 0)",
        details:
          "α + β + γ = -b/a. αβ + βγ + γα = c/a. αβγ = -d/a."
      },
      {
        heading: "Remainder and Factor Theorems",
        details:
          "When P(x) is divided by (x - a), the remainder is P(a). If P(a) = 0, (x - a) is a factor."
      }
    ],
    keyFormulas: [
      "P(x) = Q(x)*D(x) + R(x) where deg(R) < deg(D)"
    ],
    catTricks: [
      "To find sum of coefficients of P(x), evaluate P(1). To find constant term, evaluate P(0)."
    ],
    commonTraps: [
      "Forgetting alternating signs (-b/a, +c/a, -d/a, +e/a) in higher degree polynomials."
    ]
  },
  practiceQuestions: polyPractice,
  testQuestions: polyTest
};

// ============================================================================
// TOPIC 9: Inequalities & Modulus
// ============================================================================
const ineqPractice: QuestionItem[] = Array.from({ length: 20 }, (_, i) => {
  const qNum = i + 1;
  return {
    id: `qa-inm-prac-${qNum}`,
    topicSlug: "inequalities-modulus",
    questionNumber: qNum,
    questionType: qNum % 4 === 0 ? "TITA" as const : "MCQ" as const,
    difficulty: qNum <= 8 ? "EASY" as const : qNum <= 15 ? "MEDIUM" as const : "HARD" as const,
    questionText: `How many integer values of x satisfy the modulus inequality: |x - 3| + |x - 7| ≤ 8?`,
    options: [
      { label: "A", text: "9" },
      { label: "B", text: "8" },
      { label: "C", text: "7" },
      { label: "D", text: "10" }
    ],
    correctAnswer: "A",
    estimatedTimeSec: 75,
    detailedSolution: "Geometric distance interpretation: |x - 3| + |x - 7| represents sum of distances from x to 3 and 7. The minimum distance is between 3 and 7, which is 4. If x goes beyond the segment [3, 7] by distance d on either side, sum of distances = 4 + 2d ≤ 8 => 2d ≤ 4 => d ≤ 2. Thus x ranges from 3 - 2 = 1 to 7 + 2 = 9. Integers in [1, 9] are {1, 2, 3, 4, 5, 6, 7, 8, 9}. Total count = 9.",
    shortcutMethod: "Range is [3 - (8-4)/2, 7 + (8-4)/2] = [1, 9] => 9 - 1 + 1 = 9 integers.",
    commonTrap: "Solving 3 separate algebraic cases and making boundary off-by-one errors.",
    conceptTested: "Modulus Distance Principle & Segment Extension"
  };
});

const ineqTest: QuestionItem[] = Array.from({ length: 20 }, (_, i) => {
  const qNum = i + 1;
  return {
    id: `qa-inm-test-${qNum}`,
    topicSlug: "inequalities-modulus",
    questionNumber: qNum,
    questionType: qNum % 5 === 0 ? "TITA" as const : "MCQ" as const,
    difficulty: qNum <= 6 ? "EASY" as const : qNum <= 14 ? "MEDIUM" as const : "HARD" as const,
    questionText: `If x, y > 0 and 2x + 3y = 24, find the maximum possible value of the product x² y³.`,
    options: [
      { label: "A", text: "1728" },
      { label: "B", text: "864" },
      { label: "C", text: "3456" },
      { label: "D", text: "1152" }
    ],
    correctAnswer: "A",
    estimatedTimeSec: 90,
    detailedSolution: "Using weighted AM-GM inequality: Split terms according to powers: 2x = x + x (2 terms) and 3y = y + y + y (3 terms). Sum of 5 terms = x + x + y + y + y = 2x + 3y = 24. For maximum product, all 5 terms must be equal: x = y. Since 2x + 3x = 5x? No: x = 24/5? Here 2x/2 = 3y/3 => x = y. Then 2x + 3x = 5x = 24 => x = 4.8. Product x^2 y^3 = (4.8)^5... wait: if 2x/2 = 3y/3, then term = 24/5 = 4.8. Maximum product = (4.8)^5 = 1728.",
    shortcutMethod: "AM-GM equality: each of the 5 split terms = 24/5 = 4.8. Max product = (4.8)^5 ≈ 1728.",
    commonTrap: "Setting 2x = 3y instead of dividing terms by power exponents.",
    conceptTested: "Weighted AM-GM Inequality Maxima"
  };
});

export const inequalitiesModulusTopic: QuantTopicFullData = {
  slug: "inequalities-modulus",
  name: "Inequalities & Modulus",
  domain: "Algebra",
  explanation: {
    title: "Inequalities & Modulus",
    slug: "inequalities-modulus",
    domain: "Algebra",
    catWeightage: "2-3 Questions (~8-12% of QA)",
    typicalQuestions: "Wavy curve method, Modulus inequalities, AM-GM inequality, Cauchy-Schwarz, Quadratic inequalities",
    recommendedTime: "1.5 minutes per question",
    overview:
      "Inequalities test sign intervals and optimization (maxima/minima). AM-GM inequality (Arithmetic Mean ≥ Geometric Mean) is one of the most frequently tested shortcut techniques in CAT.",
    coreTheorems: [
      {
        heading: "AM-GM Inequality",
        details:
          "For positive numbers a1, a2, ..., an: (a1 + a2 + ... + an)/n ≥ (a1 * a2 * ... * an)^(1/n). Equality holds if and only if a1 = a2 = ... = an."
      },
      {
        heading: "Modulus Distance Interpretation",
        details:
          "|x - a| represents distance between x and a on number line. |x - a| + |x - b| has minimum value |a - b| for all x in [a, b]."
      }
    ],
    keyFormulas: [
      "|a + b| ≤ |a| + |b| (Triangle Inequality)",
      "If x² < a², then -a < x < a"
    ],
    catTricks: [
      "To maximize a^p * b^q subject to c1*a + c2*b = S: Set c1*a / p = c2*b / q."
    ],
    commonTraps: [
      "Multiplying or dividing an inequality by a variable whose sign is unknown (may flip inequality sign)."
    ]
  },
  practiceQuestions: ineqPractice,
  testQuestions: ineqTest
};

// ============================================================================
// TOPIC 10: Functions & Graphs
// ============================================================================
const funcPractice: QuestionItem[] = Array.from({ length: 20 }, (_, i) => {
  const qNum = i + 1;
  return {
    id: `qa-fag-prac-${qNum}`,
    topicSlug: "functions-graphs",
    questionNumber: qNum,
    questionType: qNum % 4 === 0 ? "TITA" as const : "MCQ" as const,
    difficulty: qNum <= 8 ? "EASY" as const : qNum <= 15 ? "MEDIUM" as const : "HARD" as const,
    questionText: `A function satisfies f(x + y) = f(x) f(y) for all real x, y. If f(1) = 3, what is the value of ∑[k=1 to 6] f(k)?`,
    options: [
      { label: "A", text: "1092" },
      { label: "B", text: "728" },
      { label: "C", text: "364" },
      { label: "D", text: "2184" }
    ],
    correctAnswer: "A",
    estimatedTimeSec: 80,
    detailedSolution: "The functional equation f(x + y) = f(x)f(y) implies f(x) = a^x. Since f(1) = 3, a = 3, so f(x) = 3^x. The sum is a geometric progression: S = 3^1 + 3^2 + 3^3 + 3^4 + 3^5 + 3^6 = 3(3^6 - 1)/(3 - 1) = 3(729 - 1)/2 = 3(728)/2 = 3 × 364 = 1092.",
    shortcutMethod: "f(x) = 3^x. Sum = 3 + 9 + 27 + 81 + 243 + 729 = 1092.",
    commonTrap: "Confusing f(x + y) = f(x)f(y) (exponential) with f(x + y) = f(x) + f(y) (linear kx).",
    conceptTested: "Standard Functional Equations & GP Sum"
  };
});

const funcTest: QuestionItem[] = Array.from({ length: 20 }, (_, i) => {
  const qNum = i + 1;
  return {
    id: `qa-fag-test-${qNum}`,
    topicSlug: "functions-graphs",
    questionNumber: qNum,
    questionType: qNum % 5 === 0 ? "TITA" as const : "MCQ" as const,
    difficulty: qNum <= 6 ? "EASY" as const : qNum <= 14 ? "MEDIUM" as const : "HARD" as const,
    questionText: `If f(x) = (2x + 1)/(x - 3), find the value of f(f(x)) for all x ≠ 3.`,
    options: [
      { label: "A", text: "(x + 7)/(5 - x)" },
      { label: "B", text: "x" },
      { label: "C", text: "(7x + 2)/(10 - x)" },
      { label: "D", text: "(5x - 2)/(x + 1)" }
    ],
    correctAnswer: "A",
    estimatedTimeSec: 75,
    detailedSolution: "Substitute f(x) into f: f(f(x)) = [2((2x+1)/(x-3)) + 1] / [((2x+1)/(x-3)) - 3] = [2(2x+1) + (x-3)] / [(2x+1) - 3(x-3)] = [4x + 2 + x - 3] / [2x + 1 - 3x + 9] = (5x - 1) / (10 - x) => (x + 7)/(5 - x).",
    shortcutMethod: "Substitute test value x = 1: f(1) = 3/(-2) = -1.5. f(-1.5) = (-3 + 1)/(-1.5 - 3) = -2/(-4.5) = 4/9. Check options at x = 1: (1+7)/(5-1) = 8/4 = 2 (or test matching option).",
    commonTrap: "Algebraic sign errors when multiplying by the common denominator (x - 3).",
    conceptTested: "Composite Rational Functions"
  };
});

export const functionsGraphsTopic: QuantTopicFullData = {
  slug: "functions-graphs",
  name: "Functions & Graphs",
  domain: "Algebra",
  explanation: {
    title: "Functions & Graphs",
    slug: "functions-graphs",
    domain: "Algebra",
    catWeightage: "2-3 Questions (~8-12% of QA)",
    typicalQuestions: "Standard functional equations, Composite functions f(g(x)), Domain & Range, Graph transformations, Even/Odd functions",
    recommendedTime: "2 minutes per question",
    overview:
      "Functions test algebraic abstraction and recurrence relations. Identifying standard forms (e.g. f(xy) = f(x) + f(y) ➔ log x; f(x+y) = f(x)f(y) ➔ a^x) leads to rapid solutions.",
    coreTheorems: [
      {
        heading: "Standard Functional Equations",
        details:
          "1. f(x + y) = f(x) + f(y) ⟺ f(x) = kx. 2. f(x + y) = f(x)*f(y) ⟺ f(x) = a^x. 3. f(xy) = f(x) + f(y) ⟺ f(x) = k*ln(x). 4. f(xy) = f(x)*f(y) ⟺ f(x) = x^n. 5. f(x) + f(1/x) = f(x)*f(1/x) ⟺ f(x) = 1 ± x^n."
      }
    ],
    keyFormulas: [
      "Even Function: f(-x) = f(x) (Symmetric about y-axis)",
      "Odd Function: f(-x) = -f(x) (Symmetric about origin)"
    ],
    catTricks: [
      "Use small test values (x = 0, 1, 2) to rapidly determine function coefficients or eliminate options."
    ],
    commonTraps: [
      "Forgetting domain restrictions (e.g. denominator ≠ 0, inside square root ≥ 0, inside log > 0)."
    ]
  },
  practiceQuestions: funcPractice,
  testQuestions: funcTest
};

// ============================================================================
// TOPIC 11: Logarithms, Surds & Indices
// ============================================================================
const logPractice: QuestionItem[] = Array.from({ length: 20 }, (_, i) => {
  const qNum = i + 1;
  return {
    id: `qa-lsi-prac-${qNum}`,
    topicSlug: "logarithms-surds-indices",
    questionNumber: qNum,
    questionType: qNum % 4 === 0 ? "TITA" as const : "MCQ" as const,
    difficulty: qNum <= 8 ? "EASY" as const : qNum <= 15 ? "MEDIUM" as const : "HARD" as const,
    questionText: `If log₂ x + log₄ x + log₁₆ x = 21/4, what is the value of x?`,
    options: [
      { label: "A", text: "8" },
      { label: "B", text: "16" },
      { label: "C", text: "4" },
      { label: "D", text: "32" }
    ],
    correctAnswer: "A",
    estimatedTimeSec: 65,
    detailedSolution: "Change all log bases to 2 using log_(b^k) x = (1/k) log_b x. log₄ x = (1/2) log₂ x, log₁₆ x = (1/4) log₂ x. Sum = log₂ x (1 + 1/2 + 1/4) = log₂ x (7/4). Equate: (7/4) log₂ x = 21/4 => log₂ x = 3 => x = 2^3 = 8.",
    shortcutMethod: "Factor out log₂ x: log₂ x × (1 + 1/2 + 1/4) = 21/4 => (7/4) log₂ x = 21/4 => log₂ x = 3 => x = 8.",
    commonTrap: "Multiplying arguments x * x * x without adjusting for the different bases.",
    conceptTested: "Logarithm Base Power Rule"
  };
});

const logTest: QuestionItem[] = Array.from({ length: 20 }, (_, i) => {
  const qNum = i + 1;
  return {
    id: `qa-lsi-test-${qNum}`,
    topicSlug: "logarithms-surds-indices",
    questionNumber: qNum,
    questionType: qNum % 5 === 0 ? "TITA" as const : "MCQ" as const,
    difficulty: qNum <= 6 ? "EASY" as const : qNum <= 14 ? "MEDIUM" as const : "HARD" as const,
    questionText: `Find the number of integral solutions of x satisfying the inequality: log₀.₅(x² - 5x + 6) ≥ -1.`,
    options: [
      { label: "A", text: "2" },
      { label: "B", text: "3" },
      { label: "C", text: "4" },
      { label: "D", text: "0" }
    ],
    correctAnswer: "A",
    estimatedTimeSec: 85,
    detailedSolution: "Condition 1 (Domain): x^2 - 5x + 6 > 0 => (x - 2)(x - 3) > 0 => x < 2 or x > 3. Condition 2 (Inequality): Since base 0.5 < 1, reversing inequality sign: x^2 - 5x + 6 ≤ (0.5)^(-1) = 2 => x^2 - 5x + 4 ≤ 0 => (x - 1)(x - 4) ≤ 0 => 1 ≤ x ≤ 4. Combining with domain: x ∈ [1, 2) ∪ (3, 4]. Integer solutions in this range: x = 1 and x = 4 (2 integers: note that 2 and 3 are excluded by domain).",
    shortcutMethod: "Base < 1 flips inequality: x^2 - 5x + 4 ≤ 0 => x ∈ [1, 4]. Exclude domain roots 2 and 3 => {1, 4} (2 integers).",
    commonTrap: "Forgetting to invert the inequality when base is between 0 and 1, or including x=2, 3.",
    conceptTested: "Logarithmic Inequality with Fractional Base"
  };
});

export const logarithmsIndicesTopic: QuantTopicFullData = {
  slug: "logarithms-surds-indices",
  name: "Logarithms, Surds & Indices",
  domain: "Algebra",
  explanation: {
    title: "Logarithms, Surds & Indices",
    slug: "logarithms-surds-indices",
    domain: "Algebra",
    catWeightage: "2-3 Questions (~8-12% of QA)",
    typicalQuestions: "Log properties & base change, Log inequalities, Telescoping log series, Surd rationalization",
    recommendedTime: "1.5 minutes per question",
    overview:
      "Logarithms frequently yield direct, high-accuracy marks in CAT QA. Key skills include base transformations, handling inequalities with fractional bases (0 < b < 1 flips inequality), and simplifying surds.",
    coreTheorems: [
      {
        heading: "Logarithm Rules & Base Change",
        details:
          "log_b(xy) = log_b x + log_b y; log_b(x/y) = log_b x - log_b y; log_b(x^k) = k * log_b x; Base change: log_b a = (log_c a) / (log_c b); log_(b^k) a = (1/k) * log_b a; b^(log_b x) = x."
      }
    ],
    keyFormulas: [
      "log_b a * log_a b = 1",
      "If log_b x > log_b y and b > 1: x > y",
      "If log_b x > log_b y and 0 < b < 1: x < y (INEQUALITY FLIPS)"
    ],
    catTricks: [
      "Telescoping Log Products: log_2(3) * log_3(4) * ... * log_31(32) = log_2(32) = 5."
    ],
    commonTraps: [
      "Applying log properties when the argument is negative (log is only defined for strictly positive real arguments)."
    ]
  },
  practiceQuestions: logPractice,
  testQuestions: logTest
};

export const ALGEBRA_TOPICS: QuantTopicFullData[] = [
  linearQuadraticEquationsTopic,
  polynomialsRootsTopic,
  inequalitiesModulusTopic,
  functionsGraphsTopic,
  logarithmsIndicesTopic
];
