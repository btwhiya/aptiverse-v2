import { DILRDifficulty, DILRQuestion, DILRSet } from "../types";
import { generateCategoricalDistractors, generateDistractors, getRandomInt, pickRandom } from "../solver";

interface MixedDataPoint {
  period: string;
  revenue: number; // ₹ Cr (Bar)
  marginPct: number; // % (Line)
  actualProfit: number; // ₹ Cr
}

export function generateMixedGraphSet(difficulty: DILRDifficulty): DILRSet {
  const periods = ["Q1 FY24", "Q2 FY24", "Q3 FY24", "Q4 FY24", "Q1 FY25"];
  const companies = [
    { name: "SiliconWave Microelectronics", sector: "Semiconductor Fab & Design" },
    { name: "Orbital Aerospace Dynamics", sector: "Defense & Avionics" },
    { name: "BioGenex Therapeutics", sector: "Biopharmaceuticals" },
  ];

  const comp = pickRandom(companies);
  const data: MixedDataPoint[] = [];

  let baseRev = getRandomInt(450, 750);
  periods.forEach((p) => {
    baseRev = Math.round(baseRev * (1 + getRandomInt(-10, 25) / 100));
    const margin = getRandomInt(12, 26);
    const profit = Math.round((baseRev * margin) / 100);

    data.push({
      period: p,
      revenue: baseRev,
      marginPct: margin,
      actualProfit: profit,
    });
  });

  const questions: DILRQuestion[] = [];

  // Question 1: Quarter with highest ABSOLUTE profit (classic CAT trap where highest margin % is NOT highest profit)
  const maxProfitItem = [...data].sort((a, b) => b.actualProfit - a.actualProfit)[0];
  const maxMarginItem = [...data].sort((a, b) => b.marginPct - a.marginPct)[0];

  const q1Distractors = generateCategoricalDistractors(
    maxProfitItem.period,
    periods
  );

  questions.push({
    id: `mix-q1-${Date.now()}`,
    questionNumber: 1,
    questionText: `In which quarter did ${comp.name} record the highest absolute Net Profit (in ₹ Crores)?`,
    questionType: "MCQ",
    options: q1Distractors.options,
    correctAnswer: q1Distractors.correctLabel,
    explanation: {
      detailed: `Absolute Net Profit = Revenue × (Net Profit Margin % / 100). Do not confuse the highest margin percentage with the highest absolute profit.`,
      steps: data.map(
        (d) =>
          `${d.period}: ₹${d.revenue} Cr × ${d.marginPct}% = ₹${d.actualProfit} Cr ${
            d.period === maxProfitItem.period ? "(Highest Absolute Profit)" : ""
          }`
      ),
      shortcut: `Compare products of (Revenue × Margin) rather than looking only at the line peak! In ${maxProfitItem.period}, Profit = ₹${maxProfitItem.actualProfit} Cr.`,
      commonMistake: `Choosing ${maxMarginItem.period} solely because the margin line peaked at ${maxMarginItem.marginPct}%, without checking whether lower revenue resulted in lower absolute profit!`,
    },
    estimatedTimeSec: 90,
    skillTested: "Dual-Axis Synthesis & Scale Traps",
  });

  // Question 2: Percentage growth in Net Profit between Q1 FY24 and Q1 FY25
  const first = data[0];
  const last = data[data.length - 1];
  const profitGrowth = Number((((last.actualProfit - first.actualProfit) / first.actualProfit) * 100).toFixed(1));

  const q2Distractors = generateDistractors(
    profitGrowth,
    (v) => `${v.toFixed(1)}%`,
    {
      inverted: Number((((last.actualProfit - first.actualProfit) / last.actualProfit) * 100).toFixed(1)),
      offByOne: Number((profitGrowth + 5.8).toFixed(1)),
    }
  );

  questions.push({
    id: `mix-q2-${Date.now()}`,
    questionNumber: 2,
    questionText: `What was the percentage increase in absolute Net Profit from ${first.period} to ${last.period}?`,
    questionType: "MCQ",
    options: q2Distractors.options,
    correctAnswer: q2Distractors.correctLabel,
    explanation: {
      detailed: `First compute the net profit in both quarters, then compute percentage change:`,
      steps: [
        `Net Profit in ${first.period} = ₹${first.revenue} Cr × ${first.marginPct}% = ₹${first.actualProfit} Cr.`,
        `Net Profit in ${last.period} = ₹${last.revenue} Cr × ${last.marginPct}% = ₹${last.actualProfit} Cr.`,
        `Absolute Profit Increase = ₹${last.actualProfit} - ₹${first.actualProfit} = ₹${last.actualProfit - first.actualProfit} Cr.`,
        `Percentage Increase = (${last.actualProfit - first.actualProfit} / ${first.actualProfit}) × 100 = ${profitGrowth}%.`,
      ],
      shortcut: `Calculate absolute profit first before percentage change.`,
    },
    estimatedTimeSec: 100,
    skillTested: "Derived Variable Percentage Change",
  });

  // Question 3: TITA - Total cumulative Net Profit across all 5 quarters
  const totalProfit = data.reduce((s, d) => s + d.actualProfit, 0);

  questions.push({
    id: `mix-q3-${Date.now()}`,
    questionNumber: 3,
    questionText: `What is the total cumulative Net Profit earned by ${comp.name} across all the five quarters shown (in ₹ Crores)? (Enter integer answer only)`,
    questionType: "TITA",
    options: [],
    correctAnswer: totalProfit.toString(),
    explanation: {
      detailed: `Calculate Net Profit for each quarter and sum them up:`,
      steps: [
        ...data.map((d) => `${d.period}: ₹${d.revenue} × ${d.marginPct}% = ₹${d.actualProfit} Cr.`),
        `Total Cumulative Profit = ${data.map((d) => d.actualProfit).join(" + ")} = ₹${totalProfit} Cr.`,
      ],
      observation: `CAT often tests multi-step summation from composite visuals in TITA format.`,
    },
    estimatedTimeSec: 110,
    skillTested: "Multi-Period Derived Metric Summation",
  });

  // Question 4: Overall Weighted Average Margin % across all 5 quarters
  const totalRev = data.reduce((s, d) => s + d.revenue, 0);
  const weightedMargin = Number(((totalProfit / totalRev) * 100).toFixed(1));
  const simpleAvgMargin = Number((data.reduce((s, d) => s + d.marginPct, 0) / data.length).toFixed(1));

  const q4Distractors = generateDistractors(
    weightedMargin,
    (v) => `${v.toFixed(1)}%`,
    {
      inverted: simpleAvgMargin, // trap: simple arithmetic mean of margins!
      offByOne: Number((weightedMargin + 2.3).toFixed(1)),
    }
  );

  questions.push({
    id: `mix-q4-${Date.now()}`,
    questionNumber: 4,
    questionText: `What was the overall effective Net Profit Margin (%) for ${comp.name} across the combined 5-quarter duration?`,
    questionType: "MCQ",
    options: q4Distractors.options,
    correctAnswer: q4Distractors.correctLabel,
    explanation: {
      detailed: `Overall Effective Margin = (Total Cumulative Profit / Total Cumulative Revenue) × 100. It is a weighted average, NOT the simple arithmetic average of the individual margins!`,
      steps: [
        `Total Cumulative Profit = ₹${totalProfit} Cr.`,
        `Total Cumulative Revenue = ${data.map((d) => d.revenue).join(" + ")} = ₹${totalRev} Cr.`,
        `Overall Effective Margin = (${totalProfit} / ${totalRev}) × 100 = ${weightedMargin}%.`,
      ],
      shortcut: `Recognize that quarters with massive revenues pull the weighted margin closer to their individual margin values.`,
      commonMistake: `Taking the unweighted arithmetic mean of the five margin percentages (${data.map((d) => d.marginPct).join(" + ")})/5 = ${simpleAvgMargin}%. This is a classic CAT distractor!`,
    },
    estimatedTimeSec: 105,
    skillTested: "Weighted Average vs Arithmetic Mean in Ratio Metrics",
  });

  return {
    id: `di-mixed-${Date.now()}-${getRandomInt(100, 999)}`,
    section: "DI",
    topic: "mixed-graph",
    topicTitle: "Dual-Axis Composed Graphs (Bar + Line)",
    difficulty,
    title: `${comp.name} — Revenue Scale & Profitability Trajectory`,
    description: `The composite chart below presents quarterly operational metrics for ${comp.name} (${comp.sector}). The vertical bars (primary left axis) represent quarterly Revenue in ₹ Crores, while the continuous line with data markers (secondary right axis) denotes the Net Profit Margin expressed as a percentage of quarterly revenue.`,
    dataset: { company: comp, data },
    visualizationType: "mixed",
    visualizationData: {
      title: `${comp.name} — Revenue (₹ Cr) & Margin (%)`,
      xAxisKey: "period",
      barKey: "revenue",
      barName: "Revenue (₹ Cr)",
      barColor: "#6366f1", // Indigo
      lineKey: "marginPct",
      lineName: "Net Profit Margin (%)",
      lineColor: "#10b981", // Emerald
      data: data.map((d) => ({
        period: d.period,
        revenue: d.revenue,
        marginPct: d.marginPct,
      })),
    },
    estimatedTimeMin: difficulty === "CAT_HARD" ? 14 : 10,
    questions,
    tags: ["Composed Chart", "Dual Axis", "Weighted Average", "Scale Traps", "CAT DILR"],
  };
}
