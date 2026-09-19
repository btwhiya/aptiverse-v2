import { DILRDifficulty, DILRQuestion, DILRSet } from "../types";
import { formatINR, generateCategoricalDistractors, generateDistractors, getRandomInt, pickRandom } from "../solver";

interface CompanyFinancials {
  year: number;
  revenue: number; // in Crores
  cogs: number; // Cost of goods sold
  marketing: number;
  rd: number; // R&D
  operatingProfit: number;
  netMarginPct: number;
}

export function generateTableSet(difficulty: DILRDifficulty): DILRSet {
  const companies = [
    { name: "Apex Dynamics Corp", sector: "Industrial Automation" },
    { name: "NovaCloud Technologies", sector: "SaaS & Cloud Computing" },
    { name: "Zenith Consumer Brands", sector: "FMCG & Nutrition" },
    { name: "Vanguard Mobility Ltd", sector: "Clean Tech & EV" },
  ];

  const company = pickRandom(companies);
  const startYear = 2020;
  const numYears = difficulty === "CAT_HARD" ? 5 : 4;

  let baseRev = getRandomInt(120, 250);
  const data: CompanyFinancials[] = [];

  for (let i = 0; i < numYears; i++) {
    const year = startYear + i;
    const growth = getRandomInt(10, 28) / 100;
    const revenue = Math.round(baseRev * (1 + growth));
    baseRev = revenue;

    const cogsPct = getRandomInt(38, 48) / 100;
    const cogs = Math.round(revenue * cogsPct);

    const mktPct = getRandomInt(14, 22) / 100;
    const marketing = Math.round(revenue * mktPct);

    const rdPct = getRandomInt(8, 15) / 100;
    const rd = Math.round(revenue * rdPct);

    const operatingProfit = revenue - (cogs + marketing + rd);
    const netMarginPct = Number(((operatingProfit / revenue) * 100).toFixed(1));

    data.push({
      year,
      revenue,
      cogs,
      marketing,
      rd,
      operatingProfit,
      netMarginPct,
    });
  }

  // Visualization data for DIDataTable
  const headers = [
    "Fiscal Year",
    "Revenue (₹ Cr)",
    "COGS (₹ Cr)",
    "Marketing (₹ Cr)",
    "R&D Spend (₹ Cr)",
    "Operating Profit (₹ Cr)",
    "Operating Margin (%)",
  ];

  const rows = data.map((d) => [
    `FY ${d.year}`,
    d.revenue.toLocaleString("en-IN"),
    d.cogs.toLocaleString("en-IN"),
    d.marketing.toLocaleString("en-IN"),
    d.rd.toLocaleString("en-IN"),
    d.operatingProfit.toLocaleString("en-IN"),
    `${d.netMarginPct}%`,
  ]);

  const questions: DILRQuestion[] = [];

  // Question 1: Percentage Growth in Revenue or Operating Profit
  const q1Year1 = data[0];
  const q1Year2 = data[data.length - 1];
  const revGrowth = Number((((q1Year2.revenue - q1Year1.revenue) / q1Year1.revenue) * 100).toFixed(1));
  const q1Distractors = generateDistractors(
    revGrowth,
    (v) => `${v.toFixed(1)}%`,
    {
      inverted: Number((((q1Year2.revenue - q1Year1.revenue) / q1Year2.revenue) * 100).toFixed(1)),
      offByOne: Number((revGrowth + 4.2).toFixed(1)),
    }
  );

  questions.push({
    id: `tab-q1-${Date.now()}`,
    questionNumber: 1,
    questionText: `What was the percentage increase in the total revenue of ${company.name} from FY ${q1Year1.year} to FY ${q1Year2.year}? (Choose the closest option)`,
    questionType: "MCQ",
    options: q1Distractors.options,
    correctAnswer: q1Distractors.correctLabel,
    explanation: {
      detailed: `Percentage increase = [(Revenue in FY ${q1Year2.year} - Revenue in FY ${q1Year1.year}) / Revenue in FY ${q1Year1.year}] × 100.`,
      steps: [
        `Revenue in FY ${q1Year1.year} = ₹${q1Year1.revenue} Cr.`,
        `Revenue in FY ${q1Year2.year} = ₹${q1Year2.revenue} Cr.`,
        `Absolute Increase = ₹${q1Year2.revenue} - ₹${q1Year1.revenue} = ₹${q1Year2.revenue - q1Year1.revenue} Cr.`,
        `Percentage Growth = (${q1Year2.revenue - q1Year1.revenue} / ${q1Year1.revenue}) × 100 ≈ ${revGrowth}%.`,
      ],
      shortcut: `Approximate: Base is ~${q1Year1.revenue}. A 10% step is ${Math.round(q1Year1.revenue * 0.1)}. Multiply steps to estimate near ${revGrowth}%.`,
      commonMistake: `Using the final year (FY ${q1Year2.year}) in the denominator instead of initial year base, yielding ~${(((q1Year2.revenue - q1Year1.revenue) / q1Year2.revenue) * 100).toFixed(1)}%.`,
    },
    estimatedTimeSec: 90,
    skillTested: "Percentage Growth Calculation",
  });

  // Question 2: Ratio of Total Expenditure Components
  const totalMkt = data.reduce((acc, d) => acc + d.marketing, 0);
  const totalRD = data.reduce((acc, d) => acc + d.rd, 0);
  const ratioVal = Number((totalMkt / totalRD).toFixed(2));

  const q2Distractors = generateDistractors(
    ratioVal,
    (v) => `${v.toFixed(2)} : 1`,
    {
      inverted: Number((totalRD / totalMkt).toFixed(2)),
    }
  );

  questions.push({
    id: `tab-q2-${Date.now()}`,
    questionNumber: 2,
    questionText: `What is the ratio of the total Marketing expenditure across all given years to the total R&D spend across all given years?`,
    questionType: "MCQ",
    options: q2Distractors.options,
    correctAnswer: q2Distractors.correctLabel,
    explanation: {
      detailed: `Sum the Marketing expenditure and R&D spend across all years and calculate the ratio Total Marketing / Total R&D.`,
      steps: [
        `Total Marketing Spend = ${data.map((d) => d.marketing).join(" + ")} = ₹${totalMkt} Cr.`,
        `Total R&D Spend = ${data.map((d) => d.rd).join(" + ")} = ₹${totalRD} Cr.`,
        `Ratio = ${totalMkt} / ${totalRD} ≈ ${ratioVal} : 1.`,
      ],
      shortcut: `Round each year's Marketing and R&D to the nearest 5 to obtain a lightning fast ratio estimate before looking at options.`,
      commonMistake: `Inverting the ratio (R&D / Marketing), which gives ${(totalRD / totalMkt).toFixed(2)} : 1.`,
    },
    estimatedTimeSec: 100,
    skillTested: "Aggregate Ratio Analysis",
  });

  // Question 3: Max Operating Margin or Max Ratio Year
  const maxMarginYear = [...data].sort((a, b) => b.netMarginPct - a.netMarginPct)[0];
  const yearOptions = data.map((d) => `FY ${d.year}`);
  const q3Distractors = generateCategoricalDistractors(`FY ${maxMarginYear.year}`, yearOptions);

  questions.push({
    id: `tab-q3-${Date.now()}`,
    questionNumber: 3,
    questionText: `In which fiscal year did ${company.name} record the highest Operating Margin percentage?`,
    questionType: "MCQ",
    options: q3Distractors.options,
    correctAnswer: q3Distractors.correctLabel,
    explanation: {
      detailed: `Inspect the 'Operating Margin (%)' column or compute Operating Profit / Revenue for each year.`,
      steps: data.map((d) => `FY ${d.year}: ${d.netMarginPct}% (Profit = ₹${d.operatingProfit} Cr / Rev = ₹${d.revenue} Cr)`),
      shortcut: `Direct lookup in the rightmost column shows the maximum value of ${maxMarginYear.netMarginPct}% occurs in FY ${maxMarginYear.year}.`,
    },
    estimatedTimeSec: 45,
    skillTested: "Data Extraction & Comparison",
  });

  // Question 4: TITA - Count of years satisfying condition or absolute sum
  const threshold = Math.round(data.reduce((acc, d) => acc + d.operatingProfit, 0) / data.length);
  const countExceeding = data.filter((d) => d.operatingProfit >= threshold).length;

  questions.push({
    id: `tab-q4-${Date.now()}`,
    questionNumber: 4,
    questionText: `The average annual Operating Profit across all ${numYears} fiscal years is approximately ₹${threshold} Cr. In how many fiscal years did the Operating Profit strictly equal or exceed this average annual figure? (Enter numeric answer only)`,
    questionType: "TITA",
    options: [],
    correctAnswer: countExceeding.toString(),
    explanation: {
      detailed: `Calculate which years had Operating Profit >= ₹${threshold} Cr.`,
      steps: [
        `Benchmark threshold = ₹${threshold} Cr.`,
        ...data.map(
          (d) =>
            `FY ${d.year}: Operating Profit = ₹${d.operatingProfit} Cr → ${
              d.operatingProfit >= threshold ? "Exceeds/Equals (Count +1)" : "Below benchmark"
            }`
        ),
        `Total qualifying years = ${countExceeding}.`,
      ],
      observation: `In CAT, counting questions with averages require quick mental elimination of below-average values.`,
    },
    estimatedTimeSec: 80,
    skillTested: "Benchmark Comparison & Set Cardinality",
  });

  // Question 5: Projection Scenario (CAT Hard / CAT level)
  const lastYear = data[data.length - 1];
  const projRev = Math.round(lastYear.revenue * 1.25);
  const projCogs = Math.round(lastYear.cogs * 1.15);
  const projMkt = Math.round(lastYear.marketing * 1.2);
  const projRd = lastYear.rd + 10;
  const projProfit = projRev - (projCogs + projMkt + projRd);

  const q5Distractors = generateDistractors(
    projProfit,
    (v) => `₹${Math.round(v)} Cr`,
    {
      offByOne: projProfit + 15,
      commonTraps: [projRev - projCogs, projProfit - 25],
    }
  );

  questions.push({
    id: `tab-q5-${Date.now()}`,
    questionNumber: 5,
    questionText: `For FY ${lastYear.year + 1}, management projects: (i) Revenue to grow by 25%, (ii) COGS to increase by 15%, (iii) Marketing expenditure to rise by 20%, and (iv) R&D spend to increase by ₹10 Cr compared to FY ${lastYear.year}. What will be the projected Operating Profit for FY ${lastYear.year + 1}?`,
    questionType: "MCQ",
    options: q5Distractors.options,
    correctAnswer: q5Distractors.correctLabel,
    explanation: {
      detailed: `Apply the projected growth rates to each respective FY ${lastYear.year} baseline value:`,
      steps: [
        `Projected Revenue = ₹${lastYear.revenue} × 1.25 = ₹${projRev} Cr.`,
        `Projected COGS = ₹${lastYear.cogs} × 1.15 = ₹${projCogs} Cr.`,
        `Projected Marketing = ₹${lastYear.marketing} × 1.20 = ₹${projMkt} Cr.`,
        `Projected R&D = ₹${lastYear.rd} + 10 = ₹${projRd} Cr.`,
        `Operating Profit = Revenue - (COGS + Mkt + R&D) = ${projRev} - (${projCogs} + ${projMkt} + ${projRd}) = ₹${projProfit} Cr.`,
      ],
      shortcut: `Net Change in Profit = (Δ Revenue) - (Δ Costs) = (${projRev - lastYear.revenue}) - [(${projCogs - lastYear.cogs}) + (${projMkt - lastYear.marketing}) + 10].`,
      commonMistake: `Forgetting to deduct R&D or forgetting the fixed ₹10 Cr addition.`,
    },
    estimatedTimeSec: 120,
    skillTested: "Multi-Variable Scenario Modeling",
  });

  return {
    id: `di-table-${Date.now()}-${getRandomInt(100, 999)}`,
    section: "DI",
    topic: "table",
    topicTitle: "Data Tables & Financial Metrics",
    difficulty,
    title: `${company.name} — Multi-Year Financial Performance Statement`,
    description: `The following financial performance statement details the annual Revenue, Cost of Goods Sold (COGS), Marketing Spends, R&D Expenses, and resulting Operating Profits for ${company.name} (Sector: ${company.sector}) across consecutive fiscal years. All financial figures are reported in ₹ Crores. Note that Operating Margin is calculated as (Operating Profit / Revenue) × 100.`,
    dataset: { company, data },
    visualizationType: "table",
    visualizationData: {
      title: `${company.name} — Annual Financial Summary (₹ in Crores)`,
      headers,
      rows,
    },
    estimatedTimeMin: difficulty === "CAT_HARD" ? 14 : 10,
    questions,
    tags: ["Financial Table", "Percentage Change", "Ratio Analysis", "Projections", "CAT DILR"],
  };
}
