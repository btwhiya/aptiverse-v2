import { DILRDifficulty, DILRQuestion, DILRSet } from "../types";
import { generateCategoricalDistractors, generateDistractors, getRandomInt, pickRandom } from "../solver";

interface BarDataPoint {
  period: string;
  EV: number; // in thousands
  Hybrid: number;
  ICE: number;
  total: number;
}

export function generateBarGraphSet(difficulty: DILRDifficulty): DILRSet {
  const regions = [
    { name: "National Capital Region (NCR)", code: "NCR" },
    { name: "Mumbai Metropolitan Region (MMR)", code: "MMR" },
    { name: "Bengaluru Urban Corridor", code: "BLR" },
    { name: "Hyderabad-Cyberabad Belt", code: "HYD" },
  ];

  const region = pickRandom(regions);
  const years = difficulty === "CAT_HARD" ? ["2020", "2021", "2022", "2023", "2024"] : ["2021", "2022", "2023", "2024"];

  const data: BarDataPoint[] = [];
  let baseICE = getRandomInt(180, 240);
  let baseHybrid = getRandomInt(25, 45);
  let baseEV = getRandomInt(12, 22);

  years.forEach((yr) => {
    // Realistic trend: ICE declining slowly or stagnant, Hybrid expanding, EV growing aggressively
    baseICE = Math.round(baseICE * (1 - getRandomInt(4, 10) / 100));
    baseHybrid = Math.round(baseHybrid * (1 + getRandomInt(15, 28) / 100));
    baseEV = Math.round(baseEV * (1 + getRandomInt(35, 55) / 100));

    const total = baseICE + baseHybrid + baseEV;
    data.push({
      period: yr,
      EV: baseEV,
      Hybrid: baseHybrid,
      ICE: baseICE,
      total,
    });
  });

  const questions: DILRQuestion[] = [];

  // Question 1: Share of EV in total sales in the final year
  const lastPeriod = data[data.length - 1];
  const evShare = Number(((lastPeriod.EV / lastPeriod.total) * 100).toFixed(1));
  const q1Distractors = generateDistractors(
    evShare,
    (v) => `${v.toFixed(1)}%`,
    {
      inverted: Number(((lastPeriod.EV / (lastPeriod.ICE + lastPeriod.Hybrid)) * 100).toFixed(1)),
      offByOne: Number((evShare + 3.8).toFixed(1)),
    }
  );

  questions.push({
    id: `bar-q1-${Date.now()}`,
    questionNumber: 1,
    questionText: `In ${lastPeriod.period}, what percentage of the total passenger vehicle registrations in ${region.name} was accounted for by Electric Vehicles (EVs)? (Round off to one decimal place)`,
    questionType: "MCQ",
    options: q1Distractors.options,
    correctAnswer: q1Distractors.correctLabel,
    explanation: {
      detailed: `EV Share = [EV Registrations / Total Registrations] × 100.`,
      steps: [
        `Registrations in ${lastPeriod.period}: EV = ${lastPeriod.EV}k, Hybrid = ${lastPeriod.Hybrid}k, ICE = ${lastPeriod.ICE}k.`,
        `Total Registrations = ${lastPeriod.EV} + ${lastPeriod.Hybrid} + ${lastPeriod.ICE} = ${lastPeriod.total}k.`,
        `EV Share = (${lastPeriod.EV} / ${lastPeriod.total}) × 100 = ${evShare}%.`,
      ],
      shortcut: `Approximate: ${lastPeriod.EV} divided by ~${Math.round(lastPeriod.total / 10) * 10} gives an immediate range near ${Math.round(evShare)}%.`,
      commonMistake: `Dividing by non-EV registrations (${lastPeriod.Hybrid + lastPeriod.ICE}k) instead of total registrations, which incorrectly yields ${(((lastPeriod.EV / (lastPeriod.ICE + lastPeriod.Hybrid)) * 100)).toFixed(1)}%.`,
    },
    estimatedTimeSec: 80,
    skillTested: "Component Share in Grouped Distribution",
  });

  // Question 2: Year with highest absolute annual growth in Hybrid registrations
  let maxHybridGrowth = -Infinity;
  let maxGrowthYear = "";
  for (let i = 1; i < data.length; i++) {
    const diff = data[i].Hybrid - data[i - 1].Hybrid;
    if (diff > maxHybridGrowth) {
      maxHybridGrowth = diff;
      maxGrowthYear = data[i].period;
    }
  }

  const growthOptions = data.slice(1).map((d) => d.period);
  const q2Distractors = generateCategoricalDistractors(maxGrowthYear, growthOptions);

  questions.push({
    id: `bar-q2-${Date.now()}`,
    questionNumber: 2,
    questionText: `In which year did Hybrid vehicle registrations register the highest absolute year-on-year increase (in thousands)?`,
    questionType: "MCQ",
    options: q2Distractors.options,
    correctAnswer: q2Distractors.correctLabel,
    explanation: {
      detailed: `Compute YoY increase = Hybrid(Year t) - Hybrid(Year t-1) for each consecutive year.`,
      steps: data.slice(1).map((d, idx) => {
        const prev = data[idx];
        const diff = d.Hybrid - prev.Hybrid;
        return `${d.period}: ${d.Hybrid}k - ${prev.Hybrid}k = ${diff}k ${d.period === maxGrowthYear ? "(Highest Absolute Growth)" : ""}`;
      }),
      shortcut: `Compare visual bar height jumps for the Hybrid series on the graph to immediately spot the steepest increment.`,
    },
    estimatedTimeSec: 60,
    skillTested: "YoY Absolute Growth Analysis",
  });

  // Question 3: TITA - Combined Clean Energy (EV + Hybrid) registration count in a middle year
  const midIdx = Math.floor(data.length / 2);
  const midYearData = data[midIdx];
  const cleanTotal = midYearData.EV + midYearData.Hybrid;

  questions.push({
    id: `bar-q3-${Date.now()}`,
    questionNumber: 3,
    questionText: `What was the total combined volume of 'Green Mobility' (Electric Vehicles + Hybrid Vehicles) registered in ${region.name} during the year ${midYearData.period} (in thousands)? (Enter numeric value only)`,
    questionType: "TITA",
    options: [],
    correctAnswer: cleanTotal.toString(),
    explanation: {
      detailed: `Sum the EV and Hybrid registrations for ${midYearData.period}.`,
      steps: [
        `EV Registrations in ${midYearData.period} = ${midYearData.EV} thousand.`,
        `Hybrid Registrations in ${midYearData.period} = ${midYearData.Hybrid} thousand.`,
        `Total Green Mobility Registrations = ${midYearData.EV} + ${midYearData.Hybrid} = ${cleanTotal} thousand.`,
      ],
      observation: `Ensure you read the height of both EV and Hybrid bars accurately for ${midYearData.period}.`,
    },
    estimatedTimeSec: 45,
    skillTested: "Composite Metric Aggregation",
  });

  // Question 4: Ratio of Total ICE vehicles to Total EV vehicles over all years
  const totalICE = data.reduce((s, d) => s + d.ICE, 0);
  const totalEV = data.reduce((s, d) => s + d.EV, 0);
  const ratioICEtoEV = Number((totalICE / totalEV).toFixed(2));

  const q4Distractors = generateDistractors(
    ratioICEtoEV,
    (v) => `${v.toFixed(2)} : 1`,
    {
      inverted: Number((totalEV / totalICE).toFixed(2)),
    }
  );

  questions.push({
    id: `bar-q4-${Date.now()}`,
    questionNumber: 4,
    questionText: `Across all ${years.length} years combined, what is the ratio of total ICE vehicles registered to total Electric Vehicles (EV) registered in ${region.name}?`,
    questionType: "MCQ",
    options: q4Distractors.options,
    correctAnswer: q4Distractors.correctLabel,
    explanation: {
      detailed: `Sum ICE registrations and EV registrations over all years, then compute Ratio = Total ICE / Total EV.`,
      steps: [
        `Total ICE Registrations = ${data.map((d) => d.ICE).join(" + ")} = ${totalICE} thousand.`,
        `Total EV Registrations = ${data.map((d) => d.EV).join(" + ")} = ${totalEV} thousand.`,
        `Ratio = ${totalICE} / ${totalEV} ≈ ${ratioICEtoEV} : 1.`,
      ],
      shortcut: `Round ICE to nearest 50 and EV to nearest 10 for a preliminary sanity test before completing arithmetic.`,
      commonMistake: `Inverting the ratio (Total EV / Total ICE), yielding ${(totalEV / totalICE).toFixed(2)} : 1.`,
    },
    estimatedTimeSec: 100,
    skillTested: "Cumulative Multi-Period Ratio",
  });

  // Question 5: Percentage drop in ICE share from first year to last year
  const firstPeriod = data[0];
  const firstICEShare = (firstPeriod.ICE / firstPeriod.total) * 100;
  const lastICEShare = (lastPeriod.ICE / lastPeriod.total) * 100;
  const ppDrop = Number((firstICEShare - lastICEShare).toFixed(1));

  const q5Distractors = generateDistractors(
    ppDrop,
    (v) => `${v.toFixed(1)} percentage points`,
    {
      offByOne: Number((ppDrop + 4.5).toFixed(1)),
      inverted: Number((((firstICEShare - lastICEShare) / firstICEShare) * 100).toFixed(1)),
    }
  );

  questions.push({
    id: `bar-q5-${Date.now()}`,
    questionNumber: 5,
    questionText: `By how many percentage points did the market share of ICE (Internal Combustion Engine) vehicles decline from ${firstPeriod.period} to ${lastPeriod.period}?`,
    questionType: "MCQ",
    options: q5Distractors.options,
    correctAnswer: q5Distractors.correctLabel,
    explanation: {
      detailed: `Market share drop in percentage points = Share(${firstPeriod.period}) - Share(${lastPeriod.period}).`,
      steps: [
        `In ${firstPeriod.period}: ICE Share = (${firstPeriod.ICE} / ${firstPeriod.total}) × 100 = ${firstICEShare.toFixed(1)}%.`,
        `In ${lastPeriod.period}: ICE Share = (${lastPeriod.ICE} / ${lastPeriod.total}) × 100 = ${lastICEShare.toFixed(1)}%.`,
        `Percentage points difference = ${firstICEShare.toFixed(1)}% - ${lastICEShare.toFixed(1)}% = ${ppDrop} percentage points.`,
      ],
      shortcut: `Note the subtle distinction in CAT between 'percentage points change' (arithmetic difference between two percentages) and 'percentage change' ((Δ / initial) × 100).`,
      commonMistake: `Calculating the relative percentage decrease of ICE share (yielding ~${(((firstICEShare - lastICEShare) / firstICEShare) * 100).toFixed(1)}%) instead of the absolute percentage points decline.`,
    },
    estimatedTimeSec: 110,
    skillTested: "Market Share & Percentage Points vs Relative Change",
  });

  return {
    id: `di-bar-${Date.now()}-${getRandomInt(100, 999)}`,
    section: "DI",
    topic: "bar-graph",
    topicTitle: "Grouped Bar Charts & Market Trends",
    difficulty,
    title: `Automotive Powertrain Transition in ${region.name} (${years[0]} - ${years[years.length - 1]})`,
    description: `The grouped bar chart below presents the annual registration volumes of passenger vehicles in ${region.name} categorized by propulsion technology: Electric Vehicles (EV), Hybrid Vehicles, and traditional Internal Combustion Engine (ICE) vehicles. All volumes are indicated in thousands of units.`,
    dataset: { region, data },
    visualizationType: "bar",
    visualizationData: {
      title: `Passenger Vehicle Registrations by Powertrain in ${region.code} ('000s)`,
      xAxisKey: "period",
      bars: [
        { key: "EV", name: "Electric Vehicles (EV)", color: "#10b981" }, // Emerald
        { key: "Hybrid", name: "Hybrid Powertrain", color: "#06b6d4" }, // Cyan
        { key: "ICE", name: "Internal Combustion (ICE)", color: "#f59e0b" }, // Amber
      ],
      data: data.map((d) => ({
        period: d.period,
        EV: d.EV,
        Hybrid: d.Hybrid,
        ICE: d.ICE,
      })),
    },
    estimatedTimeMin: difficulty === "CAT_HARD" ? 13 : 9,
    questions,
    tags: ["Grouped Bar Chart", "Market Share", "Percentage Points", "CAGR", "CAT DILR"],
  };
}
