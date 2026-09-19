import { DILRDifficulty, DILRQuestion, DILRSet } from "../types";
import { generateCategoricalDistractors, generateDistractors, getRandomInt, pickRandom } from "../solver";

interface LineDataPoint {
  year: string;
  FII: number; // ₹ Thousand Cr
  DII: number;
  net: number;
}

export function generateLineGraphSet(difficulty: DILRDifficulty): DILRSet {
  const years = ["2019", "2020", "2021", "2022", "2023", "2024"];
  const scenarios = [
    {
      title: "Equity Capital Flows: FII vs DII Net Investments",
      series1: { key: "FII", name: "Foreign Institutional Investors (FII)", color: "#6366f1" },
      series2: { key: "DII", name: "Domestic Institutional Investors (DII)", color: "#10b981" },
      unit: "₹ '000 Cr",
    },
    {
      title: "Clean Energy Transmission: Wind vs Solar Power Generation",
      series1: { key: "FII", name: "Solar PV Generation", color: "#f59e0b" },
      series2: { key: "DII", name: "Wind Turbine Generation", color: "#06b6d4" },
      unit: "Billion kWh",
    },
  ];

  const sc = pickRandom(scenarios);
  const data: LineDataPoint[] = [];

  let prevS1 = getRandomInt(45, 80);
  let prevS2 = getRandomInt(50, 75);

  years.forEach((yr) => {
    // Fluctuations realistic for financial or power flows
    const changeS1 = getRandomInt(-20, 35);
    const changeS2 = getRandomInt(5, 30); // DII / Solar generally steady upward
    const s1 = Math.max(20, prevS1 + changeS1);
    const s2 = Math.max(30, prevS2 + changeS2);
    prevS1 = s1;
    prevS2 = s2;

    data.push({
      year: yr,
      FII: s1,
      DII: s2,
      net: s1 + s2,
    });
  });

  const questions: DILRQuestion[] = [];

  // Question 1: Year with maximum difference between Series 1 and Series 2
  let maxDiff = -1;
  let maxDiffYear = "";
  data.forEach((d) => {
    const diff = Math.abs(d.FII - d.DII);
    if (diff > maxDiff) {
      maxDiff = diff;
      maxDiffYear = d.year;
    }
  });

  const q1Distractors = generateCategoricalDistractors(maxDiffYear, years);

  questions.push({
    id: `line-q1-${Date.now()}`,
    questionNumber: 1,
    questionText: `In which year was the absolute gap between ${sc.series1.name} and ${sc.series2.name} the largest?`,
    questionType: "MCQ",
    options: q1Distractors.options,
    correctAnswer: q1Distractors.correctLabel,
    explanation: {
      detailed: `Compute |${sc.series1.key} - ${sc.series2.key}| for each year:`,
      steps: data.map(
        (d) =>
          `${d.year}: |${d.FII} - ${d.DII}| = ${Math.abs(d.FII - d.DII)} ${sc.unit} ${
            d.year === maxDiffYear ? "(Highest Absolute Gap)" : ""
          }`
      ),
      shortcut: `Visually observe the vertical distance between the two lines on the graph; the widest vertical separation occurs in ${maxDiffYear}.`,
    },
    estimatedTimeSec: 60,
    skillTested: "Line Graph Divergence & Distance",
  });

  // Question 2: Ratio of average Series 1 to average Series 2
  const avgS1 = data.reduce((s, d) => s + d.FII, 0) / data.length;
  const avgS2 = data.reduce((s, d) => s + d.DII, 0) / data.length;
  const ratioVal = Number((avgS1 / avgS2).toFixed(2));

  const q2Distractors = generateDistractors(
    ratioVal,
    (v) => `${v.toFixed(2)} : 1`,
    {
      inverted: Number((avgS2 / avgS1).toFixed(2)),
    }
  );

  questions.push({
    id: `line-q2-${Date.now()}`,
    questionNumber: 2,
    questionText: `What is the ratio of the average annual value of ${sc.series1.name} to the average annual value of ${sc.series2.name} across the 6-year period?`,
    questionType: "MCQ",
    options: q2Distractors.options,
    correctAnswer: q2Distractors.correctLabel,
    explanation: {
      detailed: `Sum both series and compute Ratio = (Total S1 / 6) / (Total S2 / 6) = Total S1 / Total S2.`,
      steps: [
        `Total ${sc.series1.key} = ${data.map((d) => d.FII).join(" + ")} = ${data.reduce((s, d) => s + d.FII, 0)} ${sc.unit}.`,
        `Total ${sc.series2.key} = ${data.map((d) => d.DII).join(" + ")} = ${data.reduce((s, d) => s + d.DII, 0)} ${sc.unit}.`,
        `Average ${sc.series1.key} = ${avgS1.toFixed(1)}, Average ${sc.series2.key} = ${avgS2.toFixed(1)}.`,
        `Ratio = ${avgS1.toFixed(1)} / ${avgS2.toFixed(1)} ≈ ${ratioVal} : 1.`,
      ],
      shortcut: `Notice that since both averages divide by the same number of years (6), the ratio of averages is strictly identical to the ratio of the cumulative sums!`,
    },
    estimatedTimeSec: 90,
    skillTested: "Ratio of Multi-Period Means",
  });

  // Question 3: TITA - Count of years where Series 2 exceeded Series 1
  const s2Wins = data.filter((d) => d.DII > d.FII).length;

  questions.push({
    id: `line-q3-${Date.now()}`,
    questionNumber: 3,
    questionText: `During how many of the given 6 years was the value of ${sc.series2.name} strictly greater than that of ${sc.series1.name}? (Enter integer answer only)`,
    questionType: "TITA",
    options: [],
    correctAnswer: s2Wins.toString(),
    explanation: {
      detailed: `Count the number of years where the ${sc.series2.key} curve is strictly above the ${sc.series1.key} curve.`,
      steps: data.map(
        (d) =>
          `${d.year}: ${sc.series2.key} (${d.DII}) ${d.DII > d.FII ? ">" : "<="} ${sc.series1.key} (${d.FII}) → ${
            d.DII > d.FII ? "Satisfies Condition" : "Does Not Satisfy"
          }`
      ),
      observation: `Total qualifying years = ${s2Wins}.`,
    },
    estimatedTimeSec: 45,
    skillTested: "Graphical Curve Crossover Cardinality",
  });

  // Question 4: Percentage growth in combined net figure between year 0 and year 5
  const netStart = data[0].net;
  const netEnd = data[data.length - 1].net;
  const netGrowth = Number((((netEnd - netStart) / netStart) * 100).toFixed(1));

  const q4Distractors = generateDistractors(
    netGrowth,
    (v) => `${v.toFixed(1)}%`,
    {
      inverted: Number((((netEnd - netStart) / netEnd) * 100).toFixed(1)),
      offByOne: Number((netGrowth + 5.2).toFixed(1)),
    }
  );

  questions.push({
    id: `line-q4-${Date.now()}`,
    questionNumber: 4,
    questionText: `By what percentage did the total combined value (${sc.series1.key} + ${sc.series2.key}) expand from ${data[0].year} to ${data[data.length - 1].year}?`,
    questionType: "MCQ",
    options: q4Distractors.options,
    correctAnswer: q4Distractors.correctLabel,
    explanation: {
      detailed: `Combined Net in ${data[0].year} vs ${data[data.length - 1].year}.`,
      steps: [
        `Combined in ${data[0].year} = ${data[0].FII} + ${data[0].DII} = ${netStart} ${sc.unit}.`,
        `Combined in ${data[data.length - 1].year} = ${data[data.length - 1].FII} + ${data[data.length - 1].DII} = ${netEnd} ${sc.unit}.`,
        `Absolute Growth = ${netEnd} - ${netStart} = ${netEnd - netStart} ${sc.unit}.`,
        `Percentage Increase = (${netEnd - netStart} / ${netStart}) × 100 = ${netGrowth}%.`,
      ],
      shortcut: `Round base to nearest 10 and compute mental ratio before picking closest option.`,
    },
    estimatedTimeSec: 85,
    skillTested: "Composite Cumulative Growth",
  });

  return {
    id: `di-line-${Date.now()}-${getRandomInt(100, 999)}`,
    section: "DI",
    topic: "line-graph",
    topicTitle: "Multi-Series Line Trends & Turning Points",
    difficulty,
    title: sc.title,
    description: `The multi-line graph displays annual trajectories for ${sc.series1.name} and ${sc.series2.name} over the 6-year period spanning ${years[0]} to ${years[years.length - 1]}. All values are measured in ${sc.unit}.`,
    dataset: { title: sc.title, unit: sc.unit, data },
    visualizationType: "line",
    visualizationData: {
      title: `${sc.title} (${sc.unit})`,
      xAxisKey: "year",
      lines: [
        { key: "FII", name: sc.series1.name, color: sc.series1.color },
        { key: "DII", name: sc.series2.name, color: sc.series2.color },
      ],
      data: data.map((d) => ({
        year: d.year,
        FII: d.FII,
        DII: d.DII,
      })),
    },
    estimatedTimeMin: difficulty === "CAT_HARD" ? 11 : 8,
    questions,
    tags: ["Line Graph", "Trajectory Analysis", "Ratios", "CAT DILR"],
  };
}
