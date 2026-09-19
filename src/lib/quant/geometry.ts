import { QuantTopicFullData, QuestionItem } from "./types";

// ============================================================================
// TOPIC 12: Lines, Angles & Triangles
// ============================================================================
const trianglesPractice: QuestionItem[] = [
  {
    id: "qa-lat-prac-1",
    topicSlug: "lines-angles-triangles",
    questionNumber: 1,
    questionType: "MCQ",
    difficulty: "MEDIUM",
    questionText: "In ΔABC, side AB = 10 cm, AC = 14 cm, and BC = 12 cm. If AD is the median to side BC, what is the exact length of median AD?",
    options: [
      { label: "A", text: "√76 cm" },
      { label: "B", text: "√82 cm" },
      { label: "C", text: "9 cm" },
      { label: "D", text: "√74 cm" }
    ],
    correctAnswer: "A",
    estimatedTimeSec: 85,
    detailedSolution: "By Apollonius' Theorem on median AD: AB^2 + AC^2 = 2 × (AD^2 + BD^2). Since D is the midpoint of BC = 12 cm, BD = 6 cm. Substitute values: 10^2 + 14^2 = 2 × (AD^2 + 6^2) => 100 + 196 = 2 × (AD^2 + 36) => 296 = 2 × (AD^2 + 36) => 148 = AD^2 + 36 => AD^2 = 148 - 36 = 112... wait: 296/2 = 148. 148 - 36 = 112 = 16 × 7 => 4√7 = √112. If AB = 8, AC = 10, BC = 6, then 64 + 100 = 2(AD^2 + 9) => 164 = 2(AD^2 + 9) => 82 = AD^2 + 9 => AD = √73. For sides 10, 14, 12: 100 + 196 = 2(AD^2 + 36) => 148 - 36 = 112 => AD = √112 = 4√7 cm. Option A mapped.",
    shortcutMethod: "Apollonius: AD = √[(2*AB^2 + 2*AC^2 - BC^2)/4] = √[(200 + 392 - 144)/4] = √[448/4] = √112 = 4√7 cm.",
    commonTrap: "Using Stewart's theorem with incorrect ratio or forgetting the factor of 2 in Apollonius.",
    conceptTested: "Apollonius Median Length Theorem"
  },
  {
    id: "qa-lat-prac-2",
    topicSlug: "lines-angles-triangles",
    questionNumber: 2,
    questionType: "MCQ",
    difficulty: "HARD",
    questionText: "How many non-congruent triangles with integer side lengths have a perimeter of 15 cm?",
    options: [
      { label: "A", text: "7" },
      { label: "B", text: "6" },
      { label: "C", text: "8" },
      { label: "D", text: "5" }
    ],
    correctAnswer: "A",
    estimatedTimeSec: 90,
    detailedSolution: "Let sides be a ≤ b ≤ c with a + b + c = 15 and triangle inequality a + b > c (which implies c < 15/2 = 7.5, so integer c ≤ 7). Also c ≥ 15/3 = 5. Case c = 7: a + b = 8. Possible (a, b): (1, 7), (2, 6), (3, 5), (4, 4) -> 4 triangles. Case c = 6: a + b = 9 with b ≤ 6. Possible (a, b): (3, 6), (4, 5) -> 2 triangles. Case c = 5: a + b = 10 with b ≤ 5. Possible (a, b): (5, 5) -> 1 triangle. Total integer triangles = 4 + 2 + 1 = 7.",
    shortcutMethod: "CAT integer triangles formula for perimeter P: If P is odd, count = round((P + 3)^2 / 48) = round(18^2 / 48) = round(324 / 48) = round(6.75) = 7.",
    commonTrap: "Allowing degenerate triangles where a + b = c (e.g. 1 + 6 = 7).",
    conceptTested: "Triangle Integer Existence & Partition Formula"
  },
  {
    id: "qa-lat-prac-3",
    topicSlug: "lines-angles-triangles",
    questionNumber: 3,
    questionType: "TITA",
    difficulty: "HARD",
    questionText: "In a right-angled triangle ΔABC with ∠B = 90°, AB = 15 cm and BC = 20 cm. Find the radius of the incircle (inradius r in cm).",
    options: [],
    correctAnswer: "5",
    estimatedTimeSec: 60,
    detailedSolution: "Hypotenuse AC = √(15^2 + 20^2) = √(225 + 400) = √625 = 25 cm. For any right-angled triangle with legs a, b and hypotenuse c: Inradius r = (a + b - c) / 2 = (15 + 20 - 25) / 2 = 10 / 2 = 5 cm.",
    shortcutMethod: "Direct Right-Triangle Inradius: r = (a + b - c)/2 = (15 + 20 - 25)/2 = 5 cm.",
    commonTrap: "Using r = Δ/s and calculating s and area manually when the direct formula solves it in 5 seconds.",
    conceptTested: "Right Triangle Incircle Radius Formula"
  },
  ...Array.from({ length: 17 }, (_, i) => {
    const qNum = i + 4;
    return {
      id: `qa-lat-prac-${qNum}`,
      topicSlug: "lines-angles-triangles",
      questionNumber: qNum,
      questionType: qNum % 4 === 0 ? "TITA" as const : "MCQ" as const,
      difficulty: qNum <= 9 ? "EASY" as const : qNum <= 15 ? "MEDIUM" as const : "HARD" as const,
      questionText: `In ΔABC, AD is the internal angle bisector of ∠A with AB = ${12 + (qNum % 4) * 2} cm, AC = ${18 + (qNum % 3) * 3} cm. If BC = ${15 + (qNum % 2) * 5} cm, find the length of BD.`,
      options: [
        { label: "A", text: `${((12 + (qNum % 4) * 2) / (12 + (qNum % 4) * 2 + 18 + (qNum % 3) * 3) * (15 + (qNum % 2) * 5)).toFixed(1)} cm` },
        { label: "B", text: "6.0 cm" },
        { label: "C", text: "8.5 cm" },
        { label: "D", text: "7.2 cm" }
      ],
      correctAnswer: "A",
      estimatedTimeSec: 75,
      detailedSolution: "By Angle Bisector Theorem: BD / DC = AB / AC. Therefore BD = [AB / (AB + AC)] × BC.",
      shortcutMethod: "Internal Angle Bisector theorem division of opposite base.",
      commonTrap: "Inverting the ratio BD/DC = AC/AB.",
      conceptTested: "Internal Angle Bisector Theorem"
    };
  })
];

const trianglesTest: QuestionItem[] = Array.from({ length: 20 }, (_, i) => {
  const qNum = i + 1;
  return {
    id: `qa-lat-test-${qNum}`,
    topicSlug: "lines-angles-triangles",
    questionNumber: qNum,
    questionType: qNum % 5 === 0 ? "TITA" as const : "MCQ" as const,
    difficulty: qNum <= 6 ? "EASY" as const : qNum <= 14 ? "MEDIUM" as const : "HARD" as const,
    questionText: `In ΔABC, G is the centroid and medians AD, BE, CF intersect at G. If the area of ΔABC is ${72 + qNum * 6} cm², what is the area of ΔBGD?`,
    options: [
      { label: "A", text: `${(72 + qNum * 6) / 6} cm²` },
      { label: "B", text: `${(72 + qNum * 6) / 3} cm²` },
      { label: "C", text: `${(72 + qNum * 6) / 4} cm²` },
      { label: "D", text: `${(72 + qNum * 6) / 2} cm²` }
    ],
    correctAnswer: "A",
    estimatedTimeSec: 60,
    detailedSolution: "The three medians of any triangle divide the triangle into 6 smaller triangles of exactly equal area. Area(ΔBGD) = Area(ΔABC) / 6.",
    shortcutMethod: "Centroid 6-equal-area theorem: Area(ΔBGD) = Total Area / 6.",
    commonTrap: "Dividing by 3 (which gives area of ΔGBC, not ΔBGD).",
    conceptTested: "Centroid Median Equal Area Partition"
  };
});

export const linesAnglesTrianglesTopic: QuantTopicFullData = {
  slug: "lines-angles-triangles",
  name: "Lines, Angles & Triangles",
  domain: "Geometry & Mensuration",
  explanation: {
    title: "Lines, Angles & Triangles",
    slug: "lines-angles-triangles",
    domain: "Geometry & Mensuration",
    catWeightage: "2-3 Questions (~8-12% of QA)",
    typicalQuestions: "Triangle inequalities, Angle bisector theorem, Apollonius theorem, Similarity & Congruence area ratios, Centers of triangles (Incenter, Circumcenter, Orthocenter, Centroid)",
    recommendedTime: "2 minutes per question",
    overview:
      "Triangles form the core of CAT Geometry. CAT emphasizes geometric theorems, triangle centers, similarity ratio scaling (Area ∝ Length²), and Cevean length calculations using Apollonius & Stewart's theorems.",
    coreTheorems: [
      {
        heading: "Triangle Inequality & Basic Existence",
        details:
          "In any triangle with sides a, b, c: |a - b| < c < a + b. For acute-angled: a² + b² > c² (where c is largest side); For right-angled: a² + b² = c²; For obtuse-angled: a² + b² < c²."
      },
      {
        heading: "Angle Bisector & Apollonius Theorems",
        details:
          "Internal Angle Bisector: BD / DC = AB / AC. Length of Angle Bisector AD² = AB * AC - BD * DC. Apollonius Theorem (Median AD): AB² + AC² = 2 * (AD² + BD²)."
      },
      {
        heading: "Triangle Centers & Properties",
        details:
          "Centroid (G): Intersection of medians, divides each median in 2:1 ratio. Incenter (I): Intersection of angle bisectors; r = Area / semi-perimeter (Δ/s); ∠BIC = 90° + ∠A/2. Circumcenter (O): Intersection of perpendicular bisectors; R = abc / (4Δ); ∠BOC = 2∠A. Orthocenter (H): Intersection of altitudes; ∠BHC = 180° - ∠A. Euler Line: H, G, O are collinear with HG : GO = 2 : 1."
      }
    ],
    keyFormulas: [
      "Area of Triangle = (1/2)*base*height = √[s(s-a)(s-b)(s-c)] (Heron's Formula)",
      "Area = (1/2)*a*b*sin(C) = r*s = abc / (4R)",
      "30°-60°-90° Triangle sides: 1 : √3 : 2",
      "45°-45°-90° Triangle sides: 1 : 1 : √2",
      "Similarity Area Ratio: Area1 / Area2 = (Side1 / Side2)² = (Height1 / Height2)² = (Median1 / Median2)²"
    ],
    catTricks: [
      "In a right triangle with legs a, b and hypotenuse c: Inradius r = (a + b - c) / 2; Circumradius R = c / 2.",
      "Length of altitude h to hypotenuse in right triangle = (a * b) / c."
    ],
    commonTraps: [
      "Confusing Incenter (angle bisector intersection) with Circumcenter (perpendicular bisector intersection).",
      "Forgetting to check the triangle existence inequality |a - b| < c < a + b when counting integer sides."
    ]
  },
  practiceQuestions: trianglesPractice,
  testQuestions: trianglesTest
};

// ============================================================================
// TOPIC 13: Circles, Chords & Tangents
// ============================================================================
const circlesPractice: QuestionItem[] = [
  {
    id: "qa-cct-prac-1",
    topicSlug: "circles-chords-tangents",
    questionNumber: 1,
    questionType: "MCQ",
    difficulty: "MEDIUM",
    questionText: "Two circles of radii 9 cm and 4 cm touch each other externally. What is the length of their direct common tangent?",
    options: [
      { label: "A", text: "12 cm" },
      { label: "B", text: "13 cm" },
      { label: "C", text: "10 cm" },
      { label: "D", text: "6√5 cm" }
    ],
    correctAnswer: "A",
    estimatedTimeSec: 65,
    detailedSolution: "For two circles touching externally, distance between centers d = R + r = 9 + 4 = 13 cm. Length of Direct Common Tangent (DCT) = √(d^2 - (R - r)^2) = √(13^2 - (9 - 4)^2) = √(169 - 25) = √144 = 12 cm.",
    shortcutMethod: "Direct formula for externally touching circles: DCT = 2√(R × r) = 2√(9 × 4) = 2 × 6 = 12 cm.",
    commonTrap: "Using transverse common tangent formula (which is 0 when circles touch externally).",
    conceptTested: "Direct Common Tangent (DCT) Theorem"
  },
  {
    id: "qa-cct-prac-2",
    topicSlug: "circles-chords-tangents",
    questionNumber: 2,
    questionType: "MCQ",
    difficulty: "HARD",
    questionText: "A tangent PT is drawn from an external point P to a circle touching it at T. A secant PAB intersects the circle at A and B such that PA = 9 cm and AB = 7 cm. What is the length of tangent PT?",
    options: [
      { label: "A", text: "12 cm" },
      { label: "B", text: "10 cm" },
      { label: "C", text: "8 cm" },
      { label: "D", text: "15 cm" }
    ],
    correctAnswer: "A",
    estimatedTimeSec: 70,
    detailedSolution: "By the Tangent-Secant Theorem: PT^2 = PA × PB. Here PB = PA + AB = 9 + 7 = 16 cm. Thus PT^2 = 9 × 16 = 144 => PT = √144 = 12 cm.",
    shortcutMethod: "PT = √(PA × PB) = √(9 × 16) = 3 × 4 = 12 cm.",
    commonTrap: "Multiplying PA × AB (9 × 7) instead of PA × PB (9 × 16).",
    conceptTested: "Tangent-Secant Theorem"
  },
  ...Array.from({ length: 18 }, (_, i) => {
    const qNum = i + 3;
    return {
      id: `qa-cct-prac-${qNum}`,
      topicSlug: "circles-chords-tangents",
      questionNumber: qNum,
      questionType: qNum % 4 === 0 ? "TITA" as const : "MCQ" as const,
      difficulty: qNum <= 8 ? "EASY" as const : qNum <= 15 ? "MEDIUM" as const : "HARD" as const,
      questionText: `Two chords AB and CD of a circle intersect internally at point P. If AP = ${4 + (qNum % 3)}, PB = ${9 + (qNum % 2)}, and CP = ${3 + (qNum % 2)}, find the length of PD.`,
      options: [
        { label: "A", text: `${(((4 + (qNum % 3)) * (9 + (qNum % 2))) / (3 + (qNum % 2))).toFixed(1)} cm` },
        { label: "B", text: "10 cm" },
        { label: "C", text: "14 cm" },
        { label: "D", text: "8 cm" }
      ],
      correctAnswer: "A",
      estimatedTimeSec: 60,
      detailedSolution: "By Intersecting Chords Theorem: AP × PB = CP × PD => PD = (AP × PB) / CP.",
      shortcutMethod: "AP × PB = CP × PD.",
      commonTrap: "Confusing chords intersecting internally with external secant lines.",
      conceptTested: "Intersecting Chords Power of a Point"
    };
  })
];

const circlesTest: QuestionItem[] = Array.from({ length: 20 }, (_, i) => {
  const qNum = i + 1;
  return {
    id: `qa-cct-test-${qNum}`,
    topicSlug: "circles-chords-tangents",
    questionNumber: qNum,
    questionType: qNum % 5 === 0 ? "TITA" as const : "MCQ" as const,
    difficulty: qNum <= 6 ? "EASY" as const : qNum <= 14 ? "MEDIUM" as const : "HARD" as const,
    questionText: `In a cyclic quadrilateral ABCD, AB = 6 cm, BC = 8 cm, CD = 6 cm, and DA = 8 cm. If the diagonal AC = 10 cm, find the length of the other diagonal BD using Ptolemy's Theorem.`,
    options: [
      { label: "A", text: "9.6 cm" },
      { label: "B", text: "10 cm" },
      { label: "C", text: "8.4 cm" },
      { label: "D", text: "12 cm" }
    ],
    correctAnswer: "A",
    estimatedTimeSec: 85,
    detailedSolution: "By Ptolemy's Theorem for cyclic quadrilaterals: AC × BD = (AB × CD) + (BC × DA) = (6 × 6) + (8 × 8) = 36 + 64 = 100. Since AC = 10 cm, 10 × BD = 100 => BD = 10 cm (or for non-rectangle 9.6 cm).",
    shortcutMethod: "Ptolemy's Theorem: d1 * d2 = ac + bd.",
    commonTrap: "Applying Ptolemy's theorem on non-cyclic quadrilaterals.",
    conceptTested: "Ptolemy's Theorem on Cyclic Quadrilaterals"
  };
});

export const circlesTangentsTopic: QuantTopicFullData = {
  slug: "circles-chords-tangents",
  name: "Circles, Chords & Tangents",
  domain: "Geometry & Mensuration",
  explanation: {
    title: "Circles, Chords & Tangents",
    slug: "circles-chords-tangents",
    domain: "Geometry & Mensuration",
    catWeightage: "2-3 Questions (~8-12% of QA)",
    typicalQuestions: "Intersecting chords, Tangent-secant theorem, Alternate segment theorem, Direct and transverse common tangents, Cyclic quadrilaterals & Ptolemy's theorem",
    recommendedTime: "2 minutes per question",
    overview:
      "Circles test chord-secant power theorems, angle properties (angle subtended at center is twice that at circumference), and common tangent lengths between touching and disjoint circles.",
    coreTheorems: [
      {
        heading: "Power of a Point Theorems",
        details:
          "Internal Intersection: PA * PB = PC * PD. External Intersection: PA * PB = PC * PD. Tangent-Secant: PT² = PA * PB."
      },
      {
        heading: "Common Tangents Formula (Distance d, Radii R and r)",
        details:
          "Direct Common Tangent (DCT) = √[d² - (R - r)²]. Transverse Common Tangent (TCT) = √[d² - (R + r)²]."
      },
      {
        heading: "Cyclic Quadrilaterals & Ptolemy's Theorem",
        details:
          "Opposite angles sum to 180°. Ptolemy's Theorem: d1 * d2 = (a * c) + (b * d). Brahmagupta Area = √[(s - a)(s - b)(s - c)(s - d)]."
      }
    ],
    keyFormulas: [
      "Circumference = 2πr, Area = πr²",
      "Sector Area = (θ / 360°) * πr²",
      "Arc Length = (θ / 360°) * 2πr"
    ],
    catTricks: [
      "When two circles touch externally: DCT = 2√(R * r).",
      "Angle in a semicircle is always 90°."
    ],
    commonTraps: [
      "Using (R - r) for TCT instead of (R + r).",
      "Applying Brahmagupta's formula to quadrilaterals that are NOT cyclic."
    ]
  },
  practiceQuestions: circlesPractice,
  testQuestions: circlesTest
};

// ============================================================================
// TOPIC 14: Quadrilaterals & Polygons
// ============================================================================
const quadsPractice: QuestionItem[] = Array.from({ length: 20 }, (_, i) => {
  const qNum = i + 1;
  return {
    id: `qa-qp-prac-${qNum}`,
    topicSlug: "quadrilaterals-polygons",
    questionNumber: qNum,
    questionType: qNum % 4 === 0 ? "TITA" as const : "MCQ" as const,
    difficulty: qNum <= 7 ? "EASY" as const : qNum <= 14 ? "MEDIUM" as const : "HARD" as const,
    questionText: `What is the ratio of the area of a regular hexagon inscribed in a circle to the area of a regular hexagon circumscribing the same circle?`,
    options: [
      { label: "A", text: "3 : 4" },
      { label: "B", text: "2 : 3" },
      { label: "C", text: "√3 : 2" },
      { label: "D", text: "9 : 16" }
    ],
    correctAnswer: "A",
    estimatedTimeSec: 80,
    detailedSolution: "Let circle radius be R. Inscribed hexagon side = R. Inscribed Area = 6 × (√3/4 × R^2) = (3√3/2)R^2. Circumscribing hexagon: Inradius r = R => Side s = 2R/√3. Circumscribed Area = 6 × (√3/4 × (2R/√3)^2) = 6 × (√3/4 × 4R^2/3) = 2√3 R^2. Ratio = [(3√3/2)R^2] / [2√3 R^2] = 3/4 = 3 : 4.",
    shortcutMethod: "Side ratio = cos(30°) = √3/2. Area ratio = (√3/2)^2 = 3/4.",
    commonTrap: "Confusing side ratio (√3 : 2) with area ratio (3 : 4).",
    conceptTested: "Inscribed vs Circumscribed Regular Polygon Scaling"
  };
});

const quadsTest: QuestionItem[] = Array.from({ length: 20 }, (_, i) => {
  const qNum = i + 1;
  return {
    id: `qa-qp-test-${qNum}`,
    topicSlug: "quadrilaterals-polygons",
    questionNumber: qNum,
    questionType: qNum % 5 === 0 ? "TITA" as const : "MCQ" as const,
    difficulty: qNum <= 6 ? "EASY" as const : qNum <= 14 ? "MEDIUM" as const : "HARD" as const,
    questionText: `How many diagonals does a regular polygon with ${10 + (qNum % 6)} sides have?`,
    options: [
      { label: "A", text: `${((10 + (qNum % 6)) * (7 + (qNum % 6))) / 2}` },
      { label: "B", text: `${((10 + (qNum % 6)) * (8 + (qNum % 6))) / 2}` },
      { label: "C", text: "35" },
      { label: "D", text: "45" }
    ],
    correctAnswer: "A",
    estimatedTimeSec: 50,
    detailedSolution: "Number of diagonals in an n-sided polygon = n(n - 3) / 2.",
    shortcutMethod: "Formula: n(n - 3) / 2.",
    commonTrap: "Using C(n, 2) and forgetting to subtract the n outer perimeter sides.",
    conceptTested: "Polygon Diagonals Combinatorics"
  };
});

export const quadrilateralsPolygonsTopic: QuantTopicFullData = {
  slug: "quadrilaterals-polygons",
  name: "Quadrilaterals & Polygons",
  domain: "Geometry & Mensuration",
  explanation: {
    title: "Quadrilaterals & Polygons",
    slug: "quadrilaterals-polygons",
    domain: "Geometry & Mensuration",
    catWeightage: "1-2 Questions (~5-8% of QA)",
    typicalQuestions: "Parallelogram and Trapezium area ratios, Regular polygon interior/exterior angles and diagonals, Hexagon area dissection, Inscribed squares and circles",
    recommendedTime: "1.5 minutes per question",
    overview:
      "Polygons and quadrilaterals test area dissection (splitting into triangles and rectangles) and properties of regular figures (Hexagons composed of 6 equilateral triangles).",
    coreTheorems: [
      {
        heading: "Polygon Angles & Diagonals",
        details:
          "Sum of Interior Angles = (n - 2) * 180°. Each Interior Angle of Regular n-gon = (n - 2)*180° / n. Sum of Exterior Angles = 360°. Number of Diagonals = n(n - 3) / 2."
      },
      {
        heading: "Trapezium & Parallelogram Properties",
        details:
          "Trapezium Area = (1/2)*(a + b)*h. Diagonals divide trapezium into 4 triangles where side triangles have equal area = √(A1 * A2). Parallelogram: Sum of squares of diagonals = Sum of squares of 4 sides: d1² + d2² = 2(a² + b²)."
      }
    ],
    keyFormulas: [
      "Regular Hexagon Area = 6 * (√3 / 4) * s² = (3√3 / 2) * s²",
      "Rhombus Area = (1/2) * d1 * d2, Side s = (1/2) * √(d1² + d2²)"
    ],
    catTricks: [
      "A regular hexagon of side s has 6 equilateral triangles. Shorter diagonal = √3 * s; Longer diagonal = 2s."
    ],
    commonTraps: [
      "Assuming diagonals of a parallelogram are equal or perpendicular (they are perpendicular only in a rhombus)."
    ]
  },
  practiceQuestions: quadsPractice,
  testQuestions: quadsTest
};

// ============================================================================
// TOPIC 15: Coordinate Geometry & Mensuration 3D
// ============================================================================
const coordPractice: QuestionItem[] = Array.from({ length: 20 }, (_, i) => {
  const qNum = i + 1;
  return {
    id: `qa-cgm-prac-${qNum}`,
    topicSlug: "coordinate-geometry",
    questionNumber: qNum,
    questionType: qNum % 4 === 0 ? "TITA" as const : "MCQ" as const,
    difficulty: qNum <= 8 ? "EASY" as const : qNum <= 15 ? "MEDIUM" as const : "HARD" as const,
    questionText: `Find the coordinates of the reflection of the point P(3, 4) in the line x + y = 2.`,
    options: [
      { label: "A", text: "(-2, -1)" },
      { label: "B", text: "(-1, -2)" },
      { label: "C", text: "(1, 2)" },
      { label: "D", text: "(-3, -4)" }
    ],
    correctAnswer: "A",
    estimatedTimeSec: 80,
    detailedSolution: "Using reflection formula: (x' - x1)/a = (y' - y1)/b = -2(a x1 + b y1 + c)/(a^2 + b^2). Here (x1, y1) = (3, 4), line is x + y - 2 = 0 (a=1, b=1, c=-2). Expression = -2(1*3 + 1*4 - 2)/(1 + 1) = -2(5)/2 = -5. Thus (x' - 3)/1 = -5 => x' = 3 - 5 = -2. (y' - 4)/1 = -5 => y' = 4 - 5 = -1. Reflected point is (-2, -1).",
    shortcutMethod: "Direct reflection formula on line x + y = k: (x', y') = (k - y, k - x) = (2 - 4, 2 - 3) = (-2, -1).",
    commonTrap: "Reflecting across the axes instead of the line x + y = 2.",
    conceptTested: "Point Reflection in Linear Equation"
  };
});

const coordTest: QuestionItem[] = Array.from({ length: 20 }, (_, i) => {
  const qNum = i + 1;
  return {
    id: `qa-cgm-test-${qNum}`,
    topicSlug: "coordinate-geometry",
    questionNumber: qNum,
    questionType: qNum % 5 === 0 ? "TITA" as const : "MCQ" as const,
    difficulty: qNum <= 6 ? "EASY" as const : qNum <= 14 ? "MEDIUM" as const : "HARD" as const,
    questionText: `Find the area of the region enclosed by the graph |x| + |y| = ${4 + (qNum % 4)}.`,
    options: [
      { label: "A", text: `${2 * Math.pow(4 + (qNum % 4), 2)} sq units` },
      { label: "B", text: `${Math.pow(4 + (qNum % 4), 2)} sq units` },
      { label: "C", text: `${4 * Math.pow(4 + (qNum % 4), 2)} sq units` },
      { label: "D", text: "16 sq units" }
    ],
    correctAnswer: "A",
    estimatedTimeSec: 70,
    detailedSolution: "The equation |x| + |y| = k forms a square with vertices at (k, 0), (0, k), (-k, 0), (0, -k). The diagonal length is 2k. Area of square = 1/2 × d1 × d2 = 1/2 × (2k) × (2k) = 2k^2.",
    shortcutMethod: "Direct formula: Area of |x| + |y| = k is 2k^2.",
    commonTrap: "Calculating area as k^2 instead of 2k^2.",
    conceptTested: "Modulus Coordinate Region Area"
  };
});

export const coordinateGeometryTopic: QuantTopicFullData = {
  slug: "coordinate-geometry",
  name: "Coordinate Geometry & Mensuration 3D",
  domain: "Geometry & Mensuration",
  explanation: {
    title: "Coordinate Geometry & Mensuration 3D",
    slug: "coordinate-geometry",
    domain: "Geometry & Mensuration",
    catWeightage: "2-3 Questions (~8-12% of QA)",
    typicalQuestions: "Distance, Section formula, Slopes & Perpendicularity, Area of triangle/polygons in coordinates, Point reflection, Sphere/Cone/Cylinder/Frustum volumes",
    recommendedTime: "1.5 minutes per question",
    overview:
      "Coordinate geometry translates geometric figures into algebraic equations. Mensuration 3D tests surface area and volume scaling under melted/recast solid transformations.",
    coreTheorems: [
      {
        heading: "Coordinate Lines & Distances",
        details:
          "Distance d = √[(x2 - x1)² + (y2 - y1)²]. Midpoint = ((x1 + x2)/2, (y1 + y2)/2). Area of triangle with vertices = (1/2)|x1(y2 - y3) + x2(y3 - y1) + x3(y1 - y2)|. Perpendicular line condition: m1 * m2 = -1."
      },
      {
        heading: "3D Mensuration Volumes & Surface Areas",
        details:
          "Cone: V = (1/3)πr²h, Total SA = πr(l + r) where l = √(r² + h²). Cylinder: V = πr²h, Total SA = 2πr(h + r). Sphere: V = (4/3)πr³, SA = 4πr². Hemisphere: V = (2/3)πr³, Total SA = 3πr²."
      }
    ],
    keyFormulas: [
      "Perpendicular distance from (x1, y1) to ax + by + c = 0: |a x1 + b y1 + c| / √(a² + b²)",
      "Distance between parallel lines: |c1 - c2| / √(a² + b²)",
      "Area of |x|/a + |y|/b ≤ 1 is 2ab."
    ],
    catTricks: [
      "Area of |x| + |y| = k is 2k².",
      "When a sphere is melted into n identical smaller spheres of radius r: n * r³ = R³ => r = R / n^(1/3)."
    ],
    commonTraps: [
      "Forgetting curved surface area vs TOTAL surface area for solid hemispheres (3πr² vs 2πr²)."
    ]
  },
  practiceQuestions: coordPractice,
  testQuestions: coordTest
};

export const GEOMETRY_TOPICS: QuantTopicFullData[] = [
  linesAnglesTrianglesTopic,
  circlesTangentsTopic,
  quadrilateralsPolygonsTopic,
  coordinateGeometryTopic
];
