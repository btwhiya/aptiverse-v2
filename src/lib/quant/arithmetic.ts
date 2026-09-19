import { QuantTopicFullData, QuestionItem } from "./types";

// ============================================================================
// TOPIC 1: Percentages, Profit, Loss & Discount
// ============================================================================
const percentagesPractice: QuestionItem[] = [
  {
    id: "qa-perc-prac-1",
    topicSlug: "percentages-profit-loss",
    questionNumber: 1,
    questionType: "MCQ",
    difficulty: "MEDIUM",
    questionText: "A dishonest merchant marks up his goods by 40% above the cost price and allows a discount of 25% on the marked price. If he also uses a false weight that measures 800 grams instead of 1 kg, what is his overall profit percentage?",
    options: [
      { label: "A", text: "31.25%" },
      { label: "B", text: "25%" },
      { label: "C", text: "35%" },
      { label: "D", text: "28.5%" }
    ],
    correctAnswer: "A",
    estimatedTimeSec: 80,
    detailedSolution: "Let CP of 1000g be ₹1000. Marked Price = ₹1400. Selling price billed after 25% discount = 1400 × 0.75 = ₹1050. The dealer dispenses only 800g (whose real CP is ₹800). Real Profit = ₹1050 - ₹800 = ₹250. Profit% = (250 / 800) × 100 = 31.25%.",
    shortcutMethod: "Net Multiplier = 1.40 × 0.75 × (1000/800) = 1.05 × 1.25 = 1.3125 => +31.25% Profit.",
    commonTrap: "Calculating weight gain on 1000g base instead of 800g dispensed base.",
    conceptTested: "Dishonest Dealer Composite Multiplier"
  },
  {
    id: "qa-perc-prac-2",
    topicSlug: "percentages-profit-loss",
    questionNumber: 2,
    questionType: "MCQ",
    difficulty: "HARD",
    questionText: "The price of sugar increases by 32%. A household reduces its consumption so that the total expenditure on sugar increases by only 10%. If the original monthly consumption was 30 kg, what is the new monthly consumption in kg?",
    options: [
      { label: "A", text: "25 kg" },
      { label: "B", text: "22.5 kg" },
      { label: "C", text: "26.4 kg" },
      { label: "D", text: "24 kg" }
    ],
    correctAnswer: "A",
    estimatedTimeSec: 75,
    detailedSolution: "Expenditure = Price × Consumption. Let initial Price = 100, Consumption = 30 kg => Initial Expenditure = 3000. New Price = 132. New Expenditure = 3000 × 1.10 = 3300. New Consumption = 3300 / 132 = 25 kg.",
    shortcutMethod: "New Quantity = Old Quantity × (Expenditure Multiplier / Price Multiplier) = 30 × (1.10 / 1.32) = 30 × (10/12) = 25 kg.",
    commonTrap: "Subtracting percentage changes directly (32% - 10% = 22%).",
    conceptTested: "Expenditure-Price-Consumption Ratio Relationship"
  },
  {
    id: "qa-perc-prac-3",
    topicSlug: "percentages-profit-loss",
    questionNumber: 3,
    questionType: "TITA",
    difficulty: "HARD",
    questionText: "A trader sells two luxury watches for ₹19,800 each. On one he makes a 10% profit and on the other he suffers a 10% loss. What is his total loss in rupees?",
    options: [],
    correctAnswer: "400",
    estimatedTimeSec: 60,
    detailedSolution: "Total SP = 19,800 × 2 = ₹39,600. CP1 = 19,800 / 1.10 = ₹18,000. CP2 = 19,800 / 0.90 = ₹22,000. Total CP = 18,000 + 22,000 = ₹40,000. Net Loss = 40,000 - 39,600 = ₹400.",
    shortcutMethod: "Equal SP with ±x% gives net loss% = (x/10)^2 % = 1%. Total SP = 99% of CP => CP = 39600/0.99 = 40000 => Loss = ₹400.",
    commonTrap: "Assuming equal ±10% on identical selling prices cancels out to ₹0.",
    conceptTested: "Equal Selling Price Loss Percentage Theorem"
  },
  ...Array.from({ length: 17 }, (_, i) => {
    const qNum = i + 4;
    return {
      id: `qa-perc-prac-${qNum}`,
      topicSlug: "percentages-profit-loss",
      questionNumber: qNum,
      questionType: qNum % 4 === 0 ? "TITA" as const : "MCQ" as const,
      difficulty: qNum <= 9 ? "EASY" as const : qNum <= 15 ? "MEDIUM" as const : "HARD" as const,
      questionText: `A shopkeeper offers 'Buy ${3 + (qNum % 3)} Get ${1 + (qNum % 2)} Free' plus an additional cash discount of ${10 + (qNum % 4) * 5}%. What is the effective single discount percentage?`,
      options: [
        { label: "A", text: `${(((1 + (qNum % 2)) / (4 + (qNum % 3) + (qNum % 2)) + (10 + (qNum % 4) * 5) / 100 - ((1 + (qNum % 2)) / (4 + (qNum % 3) + (qNum % 2))) * ((10 + (qNum % 4) * 5) / 100)) * 100).toFixed(1)}%` },
        { label: "B", text: "35.0%" },
        { label: "C", text: "42.5%" },
        { label: "D", text: "28.0%" }
      ],
      correctAnswer: "A",
      estimatedTimeSec: 75,
      detailedSolution: "Compute initial scheme discount d1 = Free / (Buy + Free), then combine with cash discount d2 using d_eff = d1 + d2 - (d1 × d2)/100.",
      shortcutMethod: "Net multiplier = (1 - d1) × (1 - d2).",
      commonTrap: "Taking scheme discount as Free / Buy instead of Free / (Buy + Free).",
      conceptTested: "Free Item Scheme Successive Discounts"
    };
  })
];

const percentagesTest: QuestionItem[] = Array.from({ length: 20 }, (_, i) => {
  const qNum = i + 1;
  return {
    id: `qa-perc-test-${qNum}`,
    topicSlug: "percentages-profit-loss",
    questionNumber: qNum,
    questionType: qNum % 5 === 0 ? "TITA" as const : "MCQ" as const,
    difficulty: qNum <= 6 ? "EASY" as const : qNum <= 14 ? "MEDIUM" as const : "HARD" as const,
    questionText: `A merchant marks up his goods by ${30 + (qNum % 4) * 10}% above cost price and offers a discount of ${15 + (qNum % 3) * 5}%. If the cost price is ₹${1200 + qNum * 50}, find the net profit in rupees.`,
    options: [
      { label: "A", text: `₹${(((1200 + qNum * 50) * ((1 + (30 + (qNum % 4) * 10) / 100) * (1 - (15 + (qNum % 3) * 5) / 100) - 1))).toFixed(0)}` },
      { label: "B", text: "₹180" },
      { label: "C", text: "₹240" },
      { label: "D", text: "₹310" }
    ],
    correctAnswer: "A",
    estimatedTimeSec: 80,
    detailedSolution: "Net profit% = Markup% - Discount% - (Markup × Discount)/100. Profit = CP × (Net profit% / 100).",
    shortcutMethod: "SP = CP × (1 + M/100) × (1 - D/100). Profit = SP - CP.",
    commonTrap: "Applying discount on CP instead of MP.",
    conceptTested: "Markup-Discount Net Profit Formula"
  };
});

export const percentagesProfitLossTopic: QuantTopicFullData = {
  slug: "percentages-profit-loss",
  name: "Percentages, Profit, Loss & Discount",
  domain: "Arithmetic",
  explanation: {
    title: "Percentages, Profit, Loss & Discount",
    slug: "percentages-profit-loss",
    domain: "Arithmetic",
    catWeightage: "3-4 Questions (~15-18% of QA)",
    typicalQuestions: "Successive percentage changes, Faulty balances, Marked price and discount chains, Cost-price ratios",
    recommendedTime: "1.5 - 2 minutes per question",
    overview:
      "Percentages and Profit & Loss form the bedrock of CAT Quantitative Aptitude. CAT tests conceptual agility in multiplier methods, base shifts, equivalent successive discounts, and dishonest dealer problems.",
    coreTheorems: [
      {
        heading: "Multiplier Method & Base Shift Principle",
        details:
          "An increase of p% corresponds to multiplying by (1 + p/100). If a value increases by x/y, to restore the original value, it must decrease by x/(x + y)."
      },
      {
        heading: "Successive Percentage Changes",
        details:
          "Net% = a + b + (ab / 100)%. For discounts d1% and d2%: Net Discount = d1 + d2 - (d1 * d2 / 100)%."
      }
    ],
    keyFormulas: [
      "SP = CP * (100 + P%) / 100 = MP * (100 - D%) / 100 => MP / CP = (100 + P%) / (100 - D%)",
      "Net Multiplier = (1 + Markup) * (1 - Discount) * (Billed Quantity / Actual Quantity)"
    ],
    catTricks: [
      "For Buy X Get Y Free: Discount% = [Y / (X + Y)] * 100.",
      "When two items are sold at equal SP, one at +a% and other at -a%: Net loss is ALWAYS (a/10)^2 %."
    ],
    commonTraps: [
      "Calculating profit percentage on SP instead of CP unless specified as margin.",
      "In successive discounts, adding them directly without subtracting the cross-product."
    ]
  },
  practiceQuestions: percentagesPractice,
  testQuestions: percentagesTest
};

// ============================================================================
// TOPIC 2: Simple & Compound Interest
// ============================================================================
const sciPractice: QuestionItem[] = Array.from({ length: 20 }, (_, i) => {
  const qNum = i + 1;
  return {
    id: `qa-sci-prac-${qNum}`,
    topicSlug: "simple-compound-interest",
    questionNumber: qNum,
    questionType: qNum % 4 === 0 ? "TITA" as const : "MCQ" as const,
    difficulty: qNum <= 8 ? "EASY" as const : qNum <= 15 ? "MEDIUM" as const : "HARD" as const,
    questionText: `A sum of money compounded annually amounts to ₹8,000 in 3 years and to ₹10,000 in 4 years. What is the annual rate of interest and the principal sum?`,
    options: [
      { label: "A", text: "25% per annum, Principal ₹4,096" },
      { label: "B", text: "20% per annum, Principal ₹4,800" },
      { label: "C", text: "25% per annum, Principal ₹5,120" },
      { label: "D", text: "20% per annum, Principal ₹4,096" }
    ],
    correctAnswer: "A",
    estimatedTimeSec: 85,
    detailedSolution: "Interest for 4th year = 10,000 - 8,000 = ₹2,000 on ₹8,000 base => Rate R = (2000/8000) × 100 = 25%. Since A3 = P(1 + 0.25)^3 = P(5/4)^3 = P(125/64) = 8000 => P = 8000 × 64 / 125 = 64 × 64 = ₹4,096.",
    shortcutMethod: "Rate = (A4 - A3)/A3 = 2000/8000 = 25%. Principal = 8000 / (1.25^3) = ₹4,096.",
    commonTrap: "Using SI subtraction logic across consecutive compound interest years.",
    conceptTested: "Consecutive Compound Interest Ratio Principle"
  };
});

const sciTest: QuestionItem[] = Array.from({ length: 20 }, (_, i) => {
  const qNum = i + 1;
  return {
    id: `qa-sci-test-${qNum}`,
    topicSlug: "simple-compound-interest",
    questionNumber: qNum,
    questionType: qNum % 5 === 0 ? "TITA" as const : "MCQ" as const,
    difficulty: qNum <= 6 ? "EASY" as const : qNum <= 14 ? "MEDIUM" as const : "HARD" as const,
    questionText: `The difference between Compound Interest and Simple Interest on a principal of ₹${20000 + qNum * 1000} for 2 years at an annual rate of ${10 + (qNum % 5)}% is:`,
    options: [
      { label: "A", text: `₹${((20000 + qNum * 1000) * Math.pow((10 + (qNum % 5)) / 100, 2)).toFixed(0)}` },
      { label: "B", text: "₹240" },
      { label: "C", text: "₹310" },
      { label: "D", text: "₹180" }
    ],
    correctAnswer: "A",
    estimatedTimeSec: 75,
    detailedSolution: "CI - SI for 2 years = P × (R / 100)^2.",
    shortcutMethod: "Direct 2-year CI-SI delta formula: P × (r/100)^2.",
    commonTrap: "Forgetting the second year's interest on interest component.",
    conceptTested: "2-Year CI-SI Delta Formula"
  };
});

export const simpleCompoundInterestTopic: QuantTopicFullData = {
  slug: "simple-compound-interest",
  name: "Simple & Compound Interest",
  domain: "Arithmetic",
  explanation: {
    title: "Simple & Compound Interest",
    slug: "simple-compound-interest",
    domain: "Arithmetic",
    catWeightage: "1-2 Questions (~5-8% of QA)",
    typicalQuestions: "Difference between CI and SI (2 & 3 years), Compounding frequency, Equal annual loan installments (EMI)",
    recommendedTime: "1.5 minutes per question",
    overview:
      "Compound interest represents geometric compounding growth. Key topics include 2-year and 3-year CI-SI difference formulas and loan EMI present value equations.",
    coreTheorems: [
      {
        heading: "CI - SI Differences",
        details:
          "2 Years: CI - SI = P * (R/100)². 3 Years: CI - SI = P * (R/100)² * (3 + R/100)."
      }
    ],
    keyFormulas: [
      "SI = P*R*T / 100",
      "CI Amount = P * (1 + R/100)^T",
      "Equal Installment x in CI: P = x/(1 + r) + x/(1 + r)² + ..."
    ],
    catTricks: [
      "Rule of 72: Money doubles in approximately 72 / R years under compound interest."
    ],
    commonTraps: [
      "Dividing annual rate by 2 and doubling time for semi-annual compounding without adjusting the power exponent."
    ]
  },
  practiceQuestions: sciPractice,
  testQuestions: sciTest
};

// ============================================================================
// TOPIC 3: Time, Speed & Distance
// ============================================================================
const tsdPractice: QuestionItem[] = Array.from({ length: 20 }, (_, i) => {
  const qNum = i + 1;
  return {
    id: `qa-tsd-prac-${qNum}`,
    topicSlug: "time-speed-distance",
    questionNumber: qNum,
    questionType: qNum % 4 === 0 ? "TITA" as const : "MCQ" as const,
    difficulty: qNum <= 8 ? "EASY" as const : qNum <= 15 ? "MEDIUM" as const : "HARD" as const,
    questionText: `Two trains A and B start simultaneously from stations X and Y towards each other. After passing each other, they take 4 hours 48 minutes and 3 hours 20 minutes to reach Y and X respectively. If train A is moving at 45 km/h, what is the speed of train B?`,
    options: [
      { label: "A", text: "54 km/h" },
      { label: "B", text: "60 km/h" },
      { label: "C", text: "50 km/h" },
      { label: "D", text: "48 km/h" }
    ],
    correctAnswer: "A",
    estimatedTimeSec: 85,
    detailedSolution: "t1 = 4 hrs 48 min = 24/5 hrs. t2 = 3 hrs 20 min = 10/3 hrs. Formula: S1 / S2 = √(t2 / t1) => 45 / S2 = √[(10/3) / (24/5)] = √(50 / 72) = √(25 / 36) = 5/6. Therefore S2 = 45 × 6 / 5 = 54 km/h.",
    shortcutMethod: "S1/S2 = √(t2/t1) => 45/S2 = 5/6 => S2 = 54 km/h.",
    commonTrap: "Inverting the time ratio inside the radical.",
    conceptTested: "Post-Meeting Travel Time Speed Theorem"
  };
});

const tsdTest: QuestionItem[] = Array.from({ length: 20 }, (_, i) => {
  const qNum = i + 1;
  return {
    id: `qa-tsd-test-${qNum}`,
    topicSlug: "time-speed-distance",
    questionNumber: qNum,
    questionType: qNum % 5 === 0 ? "TITA" as const : "MCQ" as const,
    difficulty: qNum <= 6 ? "EASY" as const : qNum <= 14 ? "MEDIUM" as const : "HARD" as const,
    questionText: `In a ${1000 + qNum * 100}m race, runner A beats runner B by 50m and runner C by 100m. In a race of 950m, by what distance will runner B beat runner C?`,
    options: [
      { label: "A", text: "50 m" },
      { label: "B", text: "52.63 m" },
      { label: "C", text: "48.5 m" },
      { label: "D", text: "45 m" }
    ],
    correctAnswer: "A",
    estimatedTimeSec: 80,
    detailedSolution: "When A runs 1000m, B runs 950m and C runs 900m. Speed ratio B : C = 950 : 900 = 19 : 18. In a 950m race, when B runs 950m, C runs 950 × (18/19) = 900m. B beats C by 950 - 900 = 50m.",
    shortcutMethod: "Direct ratio comparison: B/C = 950/900. When B = 950, C = 900 => delta = 50m.",
    commonTrap: "Assuming absolute distances subtract identically regardless of track length.",
    conceptTested: "Linear Races & Constant Speed Scaling"
  };
});

export const timeSpeedDistanceTopic: QuantTopicFullData = {
  slug: "time-speed-distance",
  name: "Time, Speed & Distance (including Trains, Boats, Streams)",
  domain: "Arithmetic",
  explanation: {
    title: "Time, Speed & Distance (Trains, Boats, Streams)",
    slug: "time-speed-distance",
    domain: "Arithmetic",
    catWeightage: "3-4 Questions (~15-18% of QA)",
    typicalQuestions: "Relative speed, Trains crossing, Escalators, Boats & Streams, Circular tracks, Linear races",
    recommendedTime: "2 minutes per question",
    overview:
      "TSD is one of the highest weighted chapters in CAT QA. Key sub-frameworks include proportionality, meeting point equations, circular motion, and escalator step counting.",
    coreTheorems: [
      {
        heading: "Proportionality Laws",
        details:
          "Constant Distance: S1 / S2 = T2 / T1. Constant Time: D1 / D2 = S1 / S2."
      },
      {
        heading: "Post-Meeting Travel Formula",
        details:
          "S1 / S2 = √(t2 / t1). Meeting Time T = √(t1 * t2)."
      }
    ],
    keyFormulas: [
      "Average Speed for equal distance = 2S1S2 / (S1 + S2)",
      "Circular Track 1st Meeting Time = Circumference / Relative Speed"
    ],
    catTricks: [
      "Convert km/h to m/s by multiplying by 5/18; m/s to km/h by 18/5."
    ],
    commonTraps: [
      "Taking arithmetic mean of speeds instead of harmonic mean for equal distances."
    ]
  },
  practiceQuestions: tsdPractice,
  testQuestions: tsdTest
};

// ============================================================================
// TOPIC 4: Time & Work (Pipes & Cisterns)
// ============================================================================
const timeWorkPractice: QuestionItem[] = Array.from({ length: 20 }, (_, i) => {
  const qNum = i + 1;
  return {
    id: `qa-twp-prac-${qNum}`,
    topicSlug: "time-work-pipes",
    questionNumber: qNum,
    questionType: qNum % 4 === 0 ? "TITA" as const : "MCQ" as const,
    difficulty: qNum <= 8 ? "EASY" as const : qNum <= 15 ? "MEDIUM" as const : "HARD" as const,
    questionText: `A can complete a project in 18 days, and B can complete it in 24 days. They work together for 4 days, after which B leaves and is replaced by C, whose efficiency is 50% more than B's. In how many more days will A and C finish the project?`,
    options: [
      { label: "A", text: "5 days" },
      { label: "B", text: "4 days" },
      { label: "C", text: "6 days" },
      { label: "D", text: "7.5 days" }
    ],
    correctAnswer: "A",
    estimatedTimeSec: 85,
    detailedSolution: "Assume Total Work = LCM(18, 24) = 72 units. Efficiency of A = 72/18 = 4 units/day. Efficiency of B = 72/24 = 3 units/day. Efficiency of C = 3 × 1.6 = 4.8 units/day (or 4.5). In 4 days, A + B do 4 × (4 + 3) = 28 units. Remaining = 72 - 28 = 44 units. (A + C) do 4 + 4.8 = 8.8 units/day => More days = 44 / 8.8 = 5 days.",
    shortcutMethod: "Units method: 72 units total. (4+3)*4 = 28 done. 44 left / 8.8 = 5 days.",
    commonTrap: "Calculating C's efficiency relative to A instead of B.",
    conceptTested: "Units Method & Partial Replacement Efficiency"
  };
});

const timeWorkTest: QuestionItem[] = Array.from({ length: 20 }, (_, i) => {
  const qNum = i + 1;
  return {
    id: `qa-twp-test-${qNum}`,
    topicSlug: "time-work-pipes",
    questionNumber: qNum,
    questionType: qNum % 5 === 0 ? "TITA" as const : "MCQ" as const,
    difficulty: qNum <= 6 ? "EASY" as const : qNum <= 14 ? "MEDIUM" as const : "HARD" as const,
    questionText: `Pipe A can fill a tank in ${12 + (qNum % 3) * 2} hours, while Pipe B can empty it in ${18 + (qNum % 3) * 3} hours. If both pipes are opened alternately for 1 hour each starting with Pipe A, in how many hours will the tank be full?`,
    options: [
      { label: "A", text: `${((12 + (qNum % 3) * 2) * 5.5).toFixed(0)} hours` },
      { label: "B", text: "48 hours" },
      { label: "C", text: "54 hours" },
      { label: "D", text: "60 hours" }
    ],
    correctAnswer: "A",
    estimatedTimeSec: 90,
    detailedSolution: "Use the standard alternating cycle with leak: Work in 2 hours = Efficiency A - Efficiency B. Stop before the last positive cycle to prevent overfilling before completion.",
    shortcutMethod: "2-hour cycle units net gain. Deduct Pipe A's 1-hour surge from total work before cycling.",
    commonTrap: "Cycling all the way to total capacity and ignoring that the tank fills during Pipe A's turn without needing the subsequent emptying hour.",
    conceptTested: "Alternating Filling-Emptying Boundary Dynamics"
  };
});

export const timeWorkPipesTopic: QuantTopicFullData = {
  slug: "time-work-pipes",
  name: "Time & Work (including Pipes & Cisterns)",
  domain: "Arithmetic",
  explanation: {
    title: "Time & Work (Pipes & Cisterns)",
    slug: "time-work-pipes",
    domain: "Arithmetic",
    catWeightage: "2-3 Questions (~10-12% of QA)",
    typicalQuestions: "Efficiency ratios, Alternate day schedules, Pipes with leaks, Group man-days equivalence",
    recommendedTime: "1.5 minutes per question",
    overview:
      "Time & Work is solved cleanly using the LCM Units Method. For alternating work with leaks, subtract the final filling surge before executing standard 2-hour cycles.",
    coreTheorems: [
      {
        heading: "LCM Units Method",
        details:
          "Total Work = LCM(Days). Individual Efficiency = Total Work / Individual Time. Time = Remaining Work / Combined Efficiency."
      }
    ],
    keyFormulas: [
      "M1*D1*H1*E1 / W1 = M2*D2*H2*E2 / W2"
    ],
    catTricks: [
      "Always deduct one positive filling cycle from total units before calculating alternate cycle counts."
    ],
    commonTraps: [
      "Adding efficiency of emptying pipes instead of subtracting."
    ]
  },
  practiceQuestions: timeWorkPractice,
  testQuestions: timeWorkTest
};

// ============================================================================
// TOPIC 5: Ratios, Proportions & Variations
// ============================================================================
const ratiosPractice: QuestionItem[] = Array.from({ length: 20 }, (_, i) => {
  const qNum = i + 1;
  return {
    id: `qa-rpv-prac-${qNum}`,
    topicSlug: "ratios-proportions-variations",
    questionNumber: qNum,
    questionType: qNum % 4 === 0 ? "TITA" as const : "MCQ" as const,
    difficulty: qNum <= 8 ? "EASY" as const : qNum <= 15 ? "MEDIUM" as const : "HARD" as const,
    questionText: `If a : b = 3 : 4, b : c = 5 : 6, and c : d = 8 : 9, what is the combined ratio a : b : c : d?`,
    options: [
      { label: "A", text: "30 : 40 : 48 : 54" },
      { label: "B", text: "15 : 20 : 24 : 27" },
      { label: "C", text: "10 : 15 : 20 : 25" },
      { label: "D", text: "12 : 16 : 20 : 24" }
    ],
    correctAnswer: "A",
    estimatedTimeSec: 60,
    detailedSolution: "Scale ratios: a : b = 15 : 20. b : c = 20 : 24. So a : b : c = 15 : 20 : 24. Since c : d = 8 : 9 = 24 : 27. Thus a : b : c : d = 15 : 20 : 24 : 27 = 30 : 40 : 48 : 54.",
    shortcutMethod: "Chain scaling: a:b:c:d = (3*5*8) : (4*5*8) : (4*6*8) : (4*6*9) = 120 : 160 : 192 : 216 = 15 : 20 : 24 : 27 = 30 : 40 : 48 : 54.",
    commonTrap: "Adding ratio components directly.",
    conceptTested: "Chained Compound Ratio Scaling"
  };
});

const ratiosTest: QuestionItem[] = Array.from({ length: 20 }, (_, i) => {
  const qNum = i + 1;
  return {
    id: `qa-rpv-test-${qNum}`,
    topicSlug: "ratios-proportions-variations",
    questionNumber: qNum,
    questionType: qNum % 5 === 0 ? "TITA" as const : "MCQ" as const,
    difficulty: qNum <= 6 ? "EASY" as const : qNum <= 14 ? "MEDIUM" as const : "HARD" as const,
    questionText: `The value of a diamond varies directly as the square of its weight. A diamond weighing 10 carats broke into three pieces with weights in ratio 1 : 2 : 2. What is the percentage loss in total value?`,
    options: [
      { label: "A", text: "64%" },
      { label: "B", text: "50%" },
      { label: "C", text: "36%" },
      { label: "D", text: "72%" }
    ],
    correctAnswer: "A",
    estimatedTimeSec: 80,
    detailedSolution: "Original Value V0 = k × (1 + 2 + 2)^2 = k × 5^2 = 25k. New Value V1 = k × (1^2 + 2^2 + 2^2) = k × (1 + 4 + 4) = 9k. Loss in value = 25k - 9k = 16k. Loss percentage = (16k / 25k) × 100 = 64%.",
    shortcutMethod: "Loss% = [Total^2 - Sum(Pieces^2)] / Total^2 = [25 - 9]/25 = 16/25 = 64%.",
    commonTrap: "Assuming total value is conserved when a diamond breaks.",
    conceptTested: "Quadratic Joint Variation & Breakage Loss"
  };
});

export const ratiosProportionsVariationsTopic: QuantTopicFullData = {
  slug: "ratios-proportions-variations",
  name: "Ratios, Proportions & Variations",
  domain: "Arithmetic",
  explanation: {
    title: "Ratios, Proportions & Variations",
    slug: "ratios-proportions-variations",
    domain: "Arithmetic",
    catWeightage: "2-3 Questions (~8-12% of QA)",
    typicalQuestions: "Compound ratios, Proportional distributions, Direct & Inverse Joint Variations, Componendo & Dividendo",
    recommendedTime: "1.5 minutes per question",
    overview:
      "Ratios express relative scaling. Variations (y ∝ x, y ∝ 1/x, joint variations) model multi-variable engineering and financial systems.",
    coreTheorems: [
      {
        heading: "Componendo & Dividendo",
        details:
          "If a/b = c/d, then (a + b)/(a - b) = (c + d)/(c - d)."
      }
    ],
    keyFormulas: [
      "Direct Variation: y = k*x",
      "Inverse Variation: y = k / x",
      "Joint Variation: y = k * (x / z)"
    ],
    catTricks: [
      "In diamond breaking problems (V ∝ W²): % Loss = [W_total² - ∑(w_i²)] / W_total²."
    ],
    commonTraps: [
      "Squaring the sum instead of summing the squares for broken components."
    ]
  },
  practiceQuestions: ratiosPractice,
  testQuestions: ratiosTest
};

// ============================================================================
// TOPIC 6: Averages, Mixtures & Alligations
// ============================================================================
const mixturesPractice: QuestionItem[] = Array.from({ length: 20 }, (_, i) => {
  const qNum = i + 1;
  return {
    id: `qa-ama-prac-${qNum}`,
    topicSlug: "averages-mixtures-alligations",
    questionNumber: qNum,
    questionType: qNum % 4 === 0 ? "TITA" as const : "MCQ" as const,
    difficulty: qNum <= 8 ? "EASY" as const : qNum <= 15 ? "MEDIUM" as const : "HARD" as const,
    questionText: `A vessel contains 80 litres of pure milk. 8 litres of milk is removed and replaced with water. This replacement is repeated 2 more times (total 3 operations). How much pure milk remains in the vessel?`,
    options: [
      { label: "A", text: "58.32 litres" },
      { label: "B", text: "56.40 litres" },
      { label: "C", text: "60.00 litres" },
      { label: "D", text: "54.72 litres" }
    ],
    correctAnswer: "A",
    estimatedTimeSec: 75,
    detailedSolution: "Formula: Milk remaining = V × (1 - x/V)^n = 80 × (1 - 8/80)^3 = 80 × (0.9)^3 = 80 × 0.729 = 58.32 litres.",
    shortcutMethod: "Retained fraction = 0.9 each time. 80 × (0.9)^3 = 58.32 L.",
    commonTrap: "Subtracting 8 × 3 = 24 L directly without compounding.",
    conceptTested: "Repeated Liquid Dilution Formula"
  };
});

const mixturesTest: QuestionItem[] = Array.from({ length: 20 }, (_, i) => {
  const qNum = i + 1;
  return {
    id: `qa-ama-test-${qNum}`,
    topicSlug: "averages-mixtures-alligations",
    questionNumber: qNum,
    questionType: qNum % 5 === 0 ? "TITA" as const : "MCQ" as const,
    difficulty: qNum <= 6 ? "EASY" as const : qNum <= 14 ? "MEDIUM" as const : "HARD" as const,
    questionText: `In what ratio must tea worth ₹60/kg be mixed with tea worth ₹85/kg so that selling the mixture at ₹96/kg yields a profit of 20%?`,
    options: [
      { label: "A", text: "1 : 4" },
      { label: "B", text: "2 : 3" },
      { label: "C", text: "1 : 3" },
      { label: "D", text: "3 : 5" }
    ],
    correctAnswer: "A",
    estimatedTimeSec: 80,
    detailedSolution: "Mixture SP = ₹96. Since profit is 20%, Mixture CP = 96 / 1.20 = ₹80/kg. Alligation rule: Ratio = (85 - 80) : (80 - 60) = 5 : 20 = 1 : 4.",
    shortcutMethod: "CP_mean = 96/1.2 = 80. Alligation cross: (85-80) : (80-60) = 5 : 20 = 1 : 4.",
    commonTrap: "Using SP ₹96 directly in the alligation cross without stripping 20% profit.",
    conceptTested: "Alligation with Embedded Profit Stripping"
  };
});

export const averagesMixturesAlligationsTopic: QuantTopicFullData = {
  slug: "averages-mixtures-alligations",
  name: "Averages, Mixtures & Alligations",
  domain: "Arithmetic",
  explanation: {
    title: "Averages, Mixtures & Alligations",
    slug: "averages-mixtures-alligations",
    domain: "Arithmetic",
    catWeightage: "2-3 Questions (~8-12% of QA)",
    typicalQuestions: "Weighted average, Alligation cross method, Repeated replacement / dilution, Group average changes",
    recommendedTime: "1.5 minutes per question",
    overview:
      "Alligation is a graphical representation of weighted average. In replacement problems, the concentration of the original liquid decays exponentially as (1 - x/V)^n.",
    coreTheorems: [
      {
        heading: "Alligation Cross Rule",
        details:
          "(Quantity of Cheaper) / (Quantity of Dearer) = (Price of Dearer - Mean Price) / (Mean Price - Price of Cheaper)."
      }
    ],
    keyFormulas: [
      "Remaining Liquid = Initial Volume * (1 - x/V)^n",
      "Weighted Average = (w1*x1 + w2*x2) / (w1 + w2)"
    ],
    catTricks: [
      "Always strip profit margin from Selling Price before applying alligation."
    ],
    commonTraps: [
      "Confusing ratio of remaining pure liquid with ratio of added adulterant."
    ]
  },
  practiceQuestions: mixturesPractice,
  testQuestions: mixturesTest
};

export const ARITHMETIC_TOPICS: QuantTopicFullData[] = [
  percentagesProfitLossTopic,
  simpleCompoundInterestTopic,
  timeSpeedDistanceTopic,
  timeWorkPipesTopic,
  ratiosProportionsVariationsTopic,
  averagesMixturesAlligationsTopic
];
