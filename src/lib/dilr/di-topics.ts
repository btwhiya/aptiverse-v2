import { DILRTopicFullData } from "./types";
import { QuestionItem } from "../quant/types";

// ==========================================
// 1. TABLES & CASELETS
// ==========================================
const tablesCaseletsPractice: QuestionItem[] = Array.from({ length: 20 }, (_, i) => {
  const baseDefects = 20 + (i % 5) * 5;
  const totalItems = 1000 + i * 250;
  const isTita = i % 5 === 4;
  return {
    id: `di-tc-p${i + 1}`,
    topicSlug: "tables-caselets",
    questionNumber: i + 1,
    questionType: isTita ? "TITA" : "MCQ",
    difficulty: i < 6 ? "EASY" : i < 14 ? "MEDIUM" : "HARD",
    questionText: `A manufacturing firm operates three production lines A, B, and C producing ${totalItems} units in the ratio 3 : 4 : 5 with defect rates of 2%, ${3 + (i % 3)}%, and ${4 + (i % 4)}% respectively. What is the total number of non-defective units produced by line ${i % 2 === 0 ? "B" : "C"}?`,
    options: isTita
      ? []
      : [
          { label: "A", text: `${Math.round(totalItems * 0.33 * 0.96)} units` },
          { label: "B", text: `${Math.round(totalItems * 0.35 * 0.95)} units` },
          { label: "C", text: `${Math.round(totalItems * (i % 2 === 0 ? 4/12 : 5/12) * (1 - (i % 2 === 0 ? (3 + (i % 3))/100 : (4 + (i % 4))/100)))} units` },
          { label: "D", text: `${Math.round(totalItems * 0.40 * 0.92)} units` },
        ],
    correctAnswer: isTita
      ? `${Math.round(totalItems * (i % 2 === 0 ? 4/12 : 5/12) * (1 - (i % 2 === 0 ? (3 + (i % 3))/100 : (4 + (i % 4))/100)))}`
      : "C",
    estimatedTimeSec: 90 + (i % 4) * 15,
    detailedSolution: `Total units = ${totalItems}. Ratio parts = 3 + 4 + 5 = 12 parts.\nLine ${i % 2 === 0 ? "B" : "C"} volume = ${totalItems} × (${i % 2 === 0 ? 4 : 5}/12) units.\nDefect rate = ${i % 2 === 0 ? 3 + (i % 3) : 4 + (i % 4)}% => Non-defective percentage = ${100 - (i % 2 === 0 ? 3 + (i % 3) : 4 + (i % 4))}%\nNon-defective units = ${totalItems} × (${i % 2 === 0 ? 4 : 5}/12) × (${(100 - (i % 2 === 0 ? 3 + (i % 3) : 4 + (i % 4))) / 100}) = ${Math.round(totalItems * (i % 2 === 0 ? 4/12 : 5/12) * (1 - (i % 2 === 0 ? (3 + (i % 3))/100 : (4 + (i % 4))/100)))}.`,
    shortcutMethod: "Calculate unit value per ratio part first, then apply (1 - defect fraction) multiplier.",
    commonTrap: "Calculating defective units instead of non-defective units or misreading ratio denominator.",
    conceptTested: "Ratio Distribution & Complementary Yield in Data Tables",
  };
});

const tablesCaseletsTest: QuestionItem[] = Array.from({ length: 20 }, (_, i) => {
  const isTita = i % 4 === 3;
  return {
    id: `di-tc-t${i + 1}`,
    topicSlug: "tables-caselets",
    questionNumber: i + 1,
    questionType: isTita ? "TITA" : "MCQ",
    difficulty: i < 5 ? "EASY" : i < 13 ? "MEDIUM" : "HARD",
    questionText: `In an annual performance table across 4 quarters (Q1-Q4), revenue grew by ${10 + i * 2}% from Q1 to Q2 and declined by ${5 + (i % 4) * 2}% from Q2 to Q3. If Q1 revenue was ₹${400 + i * 50} Cr, what was the net change from Q1 to Q3?`,
    options: isTita
      ? []
      : [
          { label: "A", text: `+${((1 + (10 + i * 2)/100) * (1 - (5 + (i % 4) * 2)/100) - 1).toFixed(3).slice(1)}%` },
          { label: "B", text: `+${(((1 + (10 + i * 2)/100) * (1 - (5 + (i % 4) * 2)/100) - 1) * 100).toFixed(2)}%` },
          { label: "C", text: `+${(10 + i * 2 - (5 + (i % 4) * 2)).toFixed(2)}%` },
          { label: "D", text: `-${(((1 + (10 + i * 2)/100) * (1 - (5 + (i % 4) * 2)/100) - 1) * 100).toFixed(2)}%` },
        ],
    correctAnswer: isTita
      ? `${(((1 + (10 + i * 2)/100) * (1 - (5 + (i % 4) * 2)/100) - 1) * 100).toFixed(2)}`
      : "B",
    estimatedTimeSec: 90,
    detailedSolution: `Net multiplier = (1 + a/100)(1 - b/100). For a = ${10 + i * 2}% and b = ${5 + (i % 4) * 2}%, Net Multiplier = ${(1 + (10 + i * 2)/100).toFixed(3)} × ${(1 - (5 + (i % 4) * 2)/100).toFixed(3)} = ${((1 + (10 + i * 2)/100) * (1 - (5 + (i % 4) * 2)/100)).toFixed(4)}. Percentage change = +${(((1 + (10 + i * 2)/100) * (1 - (5 + (i % 4) * 2)/100) - 1) * 100).toFixed(2)}%.`,
    shortcutMethod: "Use Net Change = a - b - (ab/100).",
    commonTrap: "Simply subtracting the two percentages (a - b) without compounding.",
    conceptTested: "Successive Growth Compounding in Quarterly Financial Tables",
  };
});

// ==========================================
// 2. GRAPHS & CHARTS
// ==========================================
const graphsChartsPractice: QuestionItem[] = Array.from({ length: 20 }, (_, i) => {
  const angle = 45 + (i % 6) * 15;
  const totalVal = 1800 + i * 180;
  const isTita = i % 5 === 4;
  return {
    id: `di-gc-p${i + 1}`,
    topicSlug: "graphs-charts",
    questionNumber: i + 1,
    questionType: isTita ? "TITA" : "MCQ",
    difficulty: i < 6 ? "EASY" : i < 14 ? "MEDIUM" : "HARD",
    questionText: `A pie chart represents the annual expenditure of a university totaling ₹${totalVal} Lakhs. If the central angle corresponding to Research & Development is ${angle}°, what is the expenditure allocated to R&D?`,
    options: isTita
      ? []
      : [
          { label: "A", text: `₹${Math.round(totalVal * (angle / 360))} Lakhs` },
          { label: "B", text: `₹${Math.round(totalVal * ((angle + 10) / 360))} Lakhs` },
          { label: "C", text: `₹${Math.round(totalVal * ((angle - 10) / 360))} Lakhs` },
          { label: "D", text: `₹${Math.round(totalVal * 0.25)} Lakhs` },
        ],
    correctAnswer: isTita ? `${Math.round(totalVal * (angle / 360))}` : "A",
    estimatedTimeSec: 75,
    detailedSolution: `Total central angle of pie chart = 360°.\nExpenditure for ${angle}° = (${angle} / 360) × Total Expenditure = (${angle} / 360) × ₹${totalVal} Lakhs = ₹${Math.round(totalVal * (angle / 360))} Lakhs.`,
    shortcutMethod: "Angle to Percentage: % = (Angle / 3.6). Multiply % with Total.",
    commonTrap: "Dividing by 100 instead of 360° for central angle conversions.",
    conceptTested: "Pie Chart Sectoral Angle-to-Absolute Value Conversions",
  };
});

const graphsChartsTest: QuestionItem[] = Array.from({ length: 20 }, (_, i) => {
  const isTita = i % 4 === 3;
  const val1 = 120 + i * 10;
  const val2 = 180 + i * 15;
  const pct = (((val2 - val1) / val1) * 100).toFixed(1);
  return {
    id: `di-gc-t${i + 1}`,
    topicSlug: "graphs-charts",
    questionNumber: i + 1,
    questionType: isTita ? "TITA" : "MCQ",
    difficulty: i < 5 ? "EASY" : i < 13 ? "MEDIUM" : "HARD",
    questionText: `In a multi-line export graph, Country X exported ${val1} thousand metric tonnes in 2024 and ${val2} thousand metric tonnes in 2025. What was the year-on-year percentage increase in exports?`,
    options: isTita
      ? []
      : [
          { label: "A", text: `${pct}%` },
          { label: "B", text: `${(parseFloat(pct) + 5).toFixed(1)}%` },
          { label: "C", text: `${(parseFloat(pct) - 5).toFixed(1)}%` },
          { label: "D", text: `${(parseFloat(pct) * 0.9).toFixed(1)}%` },
        ],
    correctAnswer: isTita ? `${pct}` : "A",
    estimatedTimeSec: 80,
    detailedSolution: `Percentage increase = [(Final - Initial) / Initial] × 100 = [(${val2} - ${val1}) / ${val1}] × 100 = [${val2 - val1} / ${val1}] × 100 = ${pct}%.`,
    shortcutMethod: "Fraction delta / base value: simplify ratio before multiplying by 100.",
    commonTrap: "Using the final year (2025) as the denominator instead of the base year (2024).",
    conceptTested: "Line Graph Trend Extraction & YoY Rate of Growth",
  };
});

// ==========================================
// 3. MIXED GRAPHS
// ==========================================
const mixedGraphsPractice: QuestionItem[] = Array.from({ length: 20 }, (_, i) => {
  const totalSales = 5000 + i * 500;
  const sharePct = 20 + (i % 5) * 5;
  const marginPct = 12 + (i % 4) * 2;
  const profit = Math.round(totalSales * (sharePct / 100) * (marginPct / 100));
  const isTita = i % 5 === 4;
  return {
    id: `di-mg-p${i + 1}`,
    topicSlug: "mixed-graphs",
    questionNumber: i + 1,
    questionType: isTita ? "TITA" : "MCQ",
    difficulty: i < 6 ? "EASY" : i < 14 ? "MEDIUM" : "HARD",
    questionText: `A set combines a pie chart of Total Sales (₹${totalSales} Cr across 5 divisions) with a bar chart of Operating Profit Margins. If Division D accounts for ${sharePct}% of total sales and operates at a ${marginPct}% operating margin, what is the operating profit of Division D?`,
    options: isTita
      ? []
      : [
          { label: "A", text: `₹${profit} Cr` },
          { label: "B", text: `₹${Math.round(profit * 1.15)} Cr` },
          { label: "C", text: `₹${Math.round(profit * 0.85)} Cr` },
          { label: "D", text: `₹${Math.round(profit * 1.25)} Cr` },
        ],
    correctAnswer: isTita ? `${profit}` : "A",
    estimatedTimeSec: 100,
    detailedSolution: `Step 1 (From Pie Chart): Sales of Division D = ${sharePct}% of ₹${totalSales} Cr = ₹${totalSales * (sharePct / 100)} Cr.\nStep 2 (From Bar Chart): Operating Profit = ${marginPct}% of Sales = ₹${totalSales * (sharePct / 100)} × ${marginPct / 100} = ₹${profit} Cr.`,
    shortcutMethod: "Combined percentage multiplier = (Share% × Margin%) / 100 × Total Sales.",
    commonTrap: "Applying the margin on the entire company total sales instead of Division D's slice.",
    conceptTested: "Dual-Source Cross-Referencing (Pie Chart + Bar Graph Interlock)",
  };
});

const mixedGraphsTest: QuestionItem[] = Array.from({ length: 20 }, (_, i) => {
  const isTita = i % 4 === 3;
  const baseUnits = 300 + i * 20;
  const price = 40 + i * 2;
  const rev = baseUnits * price;
  return {
    id: `di-mg-t${i + 1}`,
    topicSlug: "mixed-graphs",
    questionNumber: i + 1,
    questionType: isTita ? "TITA" : "MCQ",
    difficulty: i < 5 ? "EASY" : i < 13 ? "MEDIUM" : "HARD",
    questionText: `In a combination of a line chart (Price per unit in ₹) and a stacked bar chart (Quantity sold in '000 units), Product P has a price of ₹${price} and quantity sold of ${baseUnits} thousand units. What is the total gross revenue generated?`,
    options: isTita
      ? []
      : [
          { label: "A", text: `₹${(rev / 100).toFixed(2)} Lakhs` },
          { label: "B", text: `₹${(rev / 10).toFixed(1)} Lakhs` },
          { label: "C", text: `₹${rev} Thousands` },
          { label: "D", text: `₹${(rev * 1000).toLocaleString()}` },
        ],
    correctAnswer: isTita ? `${rev * 1000}` : "D",
    estimatedTimeSec: 85,
    detailedSolution: `Total Gross Revenue = Price per Unit × Quantity Sold = ₹${price} × (${baseUnits} × 1,000) = ₹${(rev * 1000).toLocaleString()}.`,
    shortcutMethod: "Watch magnitude units ('000 units × ₹ = ₹'000).",
    commonTrap: "Unit mismatch error: forgetting that quantity was plotted in thousands.",
    conceptTested: "Volume × Unit Realization Dimensional Multiplication",
  };
});

// ==========================================
// 4. CALCULATION BASICS (SPEED MATH)
// ==========================================
const calculationBasicsPractice: QuestionItem[] = Array.from({ length: 20 }, (_, i) => {
  const n1 = 37 + (i % 7) * 3;
  const n2 = 83 + (i % 5) * 4;
  const isTita = i % 5 === 4;
  const prod = n1 * n2;
  return {
    id: `di-cb-p${i + 1}`,
    topicSlug: "calculation-basics",
    questionNumber: i + 1,
    questionType: isTita ? "TITA" : "MCQ",
    difficulty: i < 6 ? "EASY" : i < 14 ? "MEDIUM" : "HARD",
    questionText: `Using Vedic duplex multiplication / base method, quickly compute the exact product: ${n1} × ${n2}.`,
    options: isTita
      ? []
      : [
          { label: "A", text: `${prod}` },
          { label: "B", text: `${prod + 10}` },
          { label: "C", text: `${prod - 10}` },
          { label: "D", text: `${prod + 20}` },
        ],
    correctAnswer: isTita ? `${prod}` : "A",
    estimatedTimeSec: 45,
    detailedSolution: `Vertical & Crosswise Multiplication: (${n1}) × (${n2}) = ${n1 * n2}.\nStep 1: Units = ${n1 % 10} × ${n2 % 10}.\nStep 2: Cross = (${Math.floor(n1 / 10)} × ${n2 % 10}) + (${Math.floor(n2 / 10)} × ${n1 % 10}).\nStep 3: Tens = ${Math.floor(n1 / 10)} × ${Math.floor(n2 / 10)}.\nResult = ${prod}.`,
    shortcutMethod: "Units digit filter + nearest decade estimation: ~40 × ~80 = 3200.",
    commonTrap: "Carrying forward addition errors under timed mental pressure.",
    conceptTested: "Vedic Crosswise Mental Arithmetic for Fast DI Approximations",
  };
});

const calculationBasicsTest: QuestionItem[] = Array.from({ length: 20 }, (_, i) => {
  const isTita = i % 4 === 3;
  const num = 450 + i * 35;
  const den = 1800 + i * 50;
  const pct = ((num / den) * 100).toFixed(2);
  return {
    id: `di-cb-t${i + 1}`,
    topicSlug: "calculation-basics",
    questionNumber: i + 1,
    questionType: isTita ? "TITA" : "MCQ",
    difficulty: i < 5 ? "EASY" : i < 13 ? "MEDIUM" : "HARD",
    questionText: `What is the exact percentage representation of the fraction ${num} / ${den}?`,
    options: isTita
      ? []
      : [
          { label: "A", text: `${pct}%` },
          { label: "B", text: `${(parseFloat(pct) + 2.5).toFixed(2)}%` },
          { label: "C", text: `${(parseFloat(pct) - 2.5).toFixed(2)}%` },
          { label: "D", text: `${(parseFloat(pct) * 1.1).toFixed(2)}%` },
        ],
    correctAnswer: isTita ? `${pct}` : "A",
    estimatedTimeSec: 60,
    detailedSolution: `Percentage = (${num} / ${den}) × 100 = ${pct}%.`,
    shortcutMethod: "10% and 1% base breakdown: 10% of den = ${den*0.1}, find multiplier.",
    commonTrap: "Rounding off denominator too aggressively leading to wrong close option.",
    conceptTested: "Fraction to Percentage Rapid Conversion and Incremental Slicing",
  };
});

// Master Export of DI Topics
export const DI_TOPICS: DILRTopicFullData[] = [
  {
    slug: "tables-caselets",
    name: "Tables and Caselets",
    domain: "Data Interpretation",
    explanation: {
      title: "Mastery of Tabular Data & Paragraph-Based Caselets",
      slug: "tables-caselets",
      domain: "Data Interpretation",
      catWeightage: "1-2 Sets (CAT / XAT / IIFT)",
      typicalQuestions: "Missing table values, weighted averages, multi-row condition checks",
      recommendedTime: "12-14 mins per 4-Q set",
      overview:
        "Tables and Caselets present dense relational data in structured rows/columns or unstructured qualitative paragraphs. The primary objective is to decode hidden algebraic invariants, eliminate empty cells using column/row sum constraints, and execute precise comparative calculations without getting overwhelmed by numerical density.",
      coreTheorems: [
        {
          heading: "Row & Column Invariant Balances",
          details:
            "Every 2D contingency table satisfies the property that the sum of all row totals strictly equals the sum of all column totals (Grand Total). Use this identity to set up simultaneous linear equations for missing table values.",
        },
        {
          heading: "Paragraph Caselet De-structuring Protocol",
          details:
            "Convert prose narratives into a standard Matrix/Grid table with rows as entities and columns as attributes before attempting any questions. Never solve caselet questions directly from raw paragraph text.",
        },
        {
          heading: "Weighted Average Deviation Invariant",
          details:
            "When combining sub-groups with different averages, the net group average satisfies Σ w_i * (x_i - X_avg) = 0. Use deviations to calculate missing group metrics in seconds.",
        },
      ],
      keyFormulas: [
        "Grand Total = Σ(Row Totals) = Σ(Column Totals)",
        "Missing Cell = Row Total - Σ(Known Row Entries)",
        "Weighted Average X_w = (w1*x1 + w2*x2 + ... + wn*xn) / (w1 + w2 + ... + wn)",
        "Compound Growth Factor = (1 + g1) * (1 + g2) * ... * (1 + gn)",
      ],
      catTricks: [
        "Eliminate options by checking the last digit / units place of row summations.",
        "Use 10% and 1% slicing to estimate complex fractions without full long division.",
        "Check for mutually exclusive constraints in caselets to eliminate impossible scenarios early.",
      ],
      commonTraps: [
        "Confusing percentage of a row with percentage of the grand total.",
        "Assuming values are zero when a table cell is left blank (blank means unknown/unspecified).",
        "Failing to verify that row and column constraints remain non-negative integers.",
      ],
    },
    practiceQuestions: tablesCaseletsPractice,
    testQuestions: tablesCaseletsTest,
  },
  {
    slug: "graphs-charts",
    name: "Graphs and Charts",
    domain: "Data Interpretation",
    explanation: {
      title: "Mastery of Bar Graphs, Line Charts, Pie Charts & Radar Charts",
      slug: "graphs-charts",
      domain: "Data Interpretation",
      catWeightage: "1-2 Sets (CAT / SNAP / NMAT)",
      typicalQuestions: "Sectoral angles, trend slope analysis, radar area comparisons, YoY growth",
      recommendedTime: "10-12 mins per set",
      overview:
        "Graphs and Charts visually represent temporal trends, proportional shares, and multi-axial performances. Mastery requires swift conversion between angles and percentages in pie charts, rapid slope evaluation in line graphs, and axis scaling verification in bar and radar charts.",
      coreTheorems: [
        {
          heading: "Pie Chart Sectoral Angle Identity",
          details:
            "A full circle encompasses 360° representing 100% of the total dataset. Therefore, 1% = 3.6° and 1° = (100/360)% = (5/18)%. Sector Value = (θ / 360) * Total Dataset Value.",
        },
        {
          heading: "Slope Rate of Change Invariant",
          details:
            "In line graphs, the steepness (slope Δy/Δx) directly reflects the absolute rate of change per time unit. A steeper slope indicates faster absolute growth, while percentage growth depends inversely on the initial base value.",
        },
        {
          heading: "Radar Chart Multi-Dimensional Profiling",
          details:
            "Radar/spider charts display multiple variables radiating from a central zero-point. The further a data point is from the center along an axis, the higher its score on that metric.",
        },
      ],
      keyFormulas: [
        "Percentage Share % = (Central Angle θ / 360°) × 100%",
        "Central Angle θ = (% Share / 100%) × 360° = % Share × 3.6°",
        "Compounded Annual Growth Rate (CAGR) = (Final Value / Initial Value)^(1/n) - 1",
        "YoY Absolute Growth = Value(Year t) - Value(Year t-1)",
      ],
      catTricks: [
        "Visual Angle Shortcuts: 90° = 25%, 60° = 16.67%, 45° = 12.5%, 36° = 10%, 18° = 5%.",
        "Comparing fractions: If N1 > N2 and D1 < D2, then N1/D1 is strictly greater than N2/D2.",
        "Use ratio of slopes when comparing two lines plotted on identical axes.",
      ],
      commonTraps: [
        "Comparing slice sizes across two different pie charts without adjusting for differing total values.",
        "Ignoring discontinuous or non-zero baseline origins on vertical bar chart axes.",
        "Confusing highest absolute growth with highest percentage growth.",
      ],
    },
    practiceQuestions: graphsChartsPractice,
    testQuestions: graphsChartsTest,
  },
  {
    slug: "mixed-graphs",
    name: "Mixed Graphs & Combined Sets",
    domain: "Data Interpretation",
    explanation: {
      title: "Mastery of Combination Charts (Bar + Line, Table + Pie, Dual Axes)",
      slug: "mixed-graphs",
      domain: "Data Interpretation",
      catWeightage: "1 Set (CAT / XAT Benchmark)",
      typicalQuestions: "Volume-Margin cross product, dual y-axis scales, multi-source constraints",
      recommendedTime: "12-15 mins per set",
      overview:
        "Mixed graphs combine two or more distinct visualization formats—such as a pie chart showing market volume shares coupled with a line chart showing unit profit margins. Success depends on disciplined cross-referencing between charts while rigorously tracking distinct units of measurement.",
      coreTheorems: [
        {
          heading: "Dual Y-Axis Alignment Protocol",
          details:
            "In charts with dual vertical axes (e.g. Left Axis = Production Volume in metric tonnes, Right Axis = Sales Price in USD), always trace each plotted series to its designated axis before performing any arithmetic.",
        },
        {
          heading: "Dimensional Composite Multipliers",
          details:
            "Gross Metric = Quantity (from Chart 1) × Rate/Margin (from Chart 2). Never sum percentages across separate charts; always convert to intermediate absolute figures.",
        },
      ],
      keyFormulas: [
        "Segment Revenue = Total Market Sales × Segment Share% (Chart 1)",
        "Segment Operating Profit = Segment Revenue × Segment Margin% (Chart 2)",
        "Overall Profit Margin = Σ(Segment Profits) / Σ(Segment Revenues)",
      ],
      catTricks: [
        "Find bounding boxes: test extreme max and min possibilities to eliminate multi-choice options.",
        "Identify shared bridging variables that link Chart 1 and Chart 2 together.",
        "Calculate ratios before scaling with large constant base numbers.",
      ],
      commonTraps: [
        "Reading the left-hand axis for a line series calibrated on the right-hand axis.",
        "Failing to observe unit changes (e.g. Millions in Chart 1 vs Thousands in Chart 2).",
        "Applying percentage discounts sequentially across independent charts.",
      ],
    },
    practiceQuestions: mixedGraphsPractice,
    testQuestions: mixedGraphsTest,
  },
  {
    slug: "calculation-basics",
    name: "Calculation Basics & Speed Math",
    domain: "Data Interpretation",
    explanation: {
      title: "Rapid Mental Math, Percentage Approximations & Fractional Equivalents",
      slug: "calculation-basics",
      domain: "Data Interpretation",
      catWeightage: "Underpins All DILR & QA Sets",
      typicalQuestions: "Fast fraction comparison, reciprocal mastery, 10% slicing, Vedic cross-multiplication",
      recommendedTime: "Sub-30 seconds per mental calculation",
      overview:
        "Speed in Data Interpretation is built upon instantaneous fractional recognition and incremental estimation. Mastering fractional reciprocals up to 1/20, percentage base slicing, and Vedic duplex cross-multiplication eliminates tedious scratchpad scratchwork and saves 4-5 minutes per test section.",
      coreTheorems: [
        {
          heading: "Fractional Reciprocal Benchmark Table",
          details:
            "1/2=50%, 1/3=33.33%, 1/4=25%, 1/5=20%, 1/6=16.67%, 1/7=14.28%, 1/8=12.5%, 1/9=11.11%, 1/11=9.09%, 1/12=8.33%, 1/13=7.69%, 1/14=7.14%, 1/15=6.67%, 1/16=6.25%, 1/17=5.88%, 1/19=5.26%.",
        },
        {
          heading: "Percentage Slicing Principle",
          details:
            "Any percentage calculation X% of Y can be resolved into additive blocks: 10% (shift decimal 1 left), 1% (shift decimal 2 left), 5% (half of 10%), 0.5% (half of 1%), and 50% (half of total).",
        },
      ],
      keyFormulas: [
        "Percentage Change % = (Δ / Base) × 100%",
        "A% of B = B% of A",
        "Successive % Change = a + b + (ab / 100)",
        "Percentage Point Difference = Absolute difference between two percentage values",
      ],
      catTricks: [
        "A% of B = B% of A: 16% of 50 = 50% of 16 = 8.",
        "Fraction comparison: If a/b and c/d, cross multiply a*d vs b*c to determine larger fraction.",
        "Denominator increment trick: (N + ΔN) / (D + ΔD) ≈ N/D if ΔN/N = ΔD/D.",
      ],
      commonTraps: [
        "Confusing 'Percentage Change' with 'Percentage Point Change' (e.g. from 20% to 25% is +5 percentage points, but a +25% increase).",
        "Dividing by the new/final value when computing percentage increase.",
        "Over-approximating when multiple choice options are separated by less than 1%.",
      ],
    },
    practiceQuestions: calculationBasicsPractice,
    testQuestions: calculationBasicsTest,
  },
];
