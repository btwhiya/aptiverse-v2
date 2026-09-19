import { DILRDifficulty, DILRQuestion, DILRSet } from "../types";
import { generateCategoricalDistractors, generateDistractors, getRandomInt, pickRandom } from "../solver";

export function generateMissingDataSet(difficulty: DILRDifficulty): DILRSet {
  // Scenario: 4 Products (Alpha, Beta, Gamma, Delta) across 3 Zones (North, South, West)
  const products = ["Alpha X", "Beta Pro", "Gamma Plus", "Delta Lite"];
  const zones = ["North", "South", "West"];

  // True ground truth matrix
  const matrix: Record<string, Record<string, number>> = {
    "Alpha X": { North: 120, South: 90, West: 150 },
    "Beta Pro": { North: 140, South: 160, West: 110 },
    "Gamma Plus": { North: 80, South: 110, West: 130 },
    "Delta Lite": { North: 160, South: 140, West: 110 },
  };

  // Add slight randomized multipliers
  const scale = getRandomInt(1, 3);
  products.forEach((p) => {
    zones.forEach((z) => {
      matrix[p][z] = matrix[p][z] * scale;
    });
  });

  // Calculate totals
  const productTotals: Record<string, number> = {};
  products.forEach((p) => {
    productTotals[p] = zones.reduce((s, z) => s + matrix[p][z], 0);
  });

  const zoneTotals: Record<string, number> = {};
  zones.forEach((z) => {
    zoneTotals[z] = products.reduce((s, p) => s + matrix[p][z], 0);
  });

  const grandTotal = Object.values(productTotals).reduce((s, v) => s + v, 0);

  // Mask specific cells with '?'
  // We strategically mask:
  // Alpha X in South (can be found from Alpha X row total)
  // Beta Pro in North (can be found from North zone total or Beta row total)
  // Gamma Plus in West (can be found from West zone total)
  // Delta Lite in South (can be found from South zone total)
  const displayRows = [
    ["Alpha X", `${matrix["Alpha X"].North}`, "?", `${matrix["Alpha X"].West}`, `${productTotals["Alpha X"]}`],
    ["Beta Pro", "?", `${matrix["Beta Pro"].South}`, `${matrix["Beta Pro"].West}`, `${productTotals["Beta Pro"]}`],
    ["Gamma Plus", `${matrix["Gamma Plus"].North}`, `${matrix["Gamma Plus"].South}`, "?", `${productTotals["Gamma Plus"]}`],
    ["Delta Lite", `${matrix["Delta Lite"].North}`, "?", `${matrix["Delta Lite"].West}`, `${productTotals["Delta Lite"]}`],
    ["Total", `${zoneTotals.North}`, `${zoneTotals.South}`, `${zoneTotals.West}`, `${grandTotal}`],
  ];

  const headers = ["Product Category", "North Zone", "South Zone", "West Zone", "Total Volume"];

  const questions: DILRQuestion[] = [];

  // Question 1: Value of Alpha X in South Zone
  const alphaSouth = matrix["Alpha X"].South;
  const q1Distractors = generateDistractors(
    alphaSouth,
    (v) => Math.round(v).toString(),
    {
      offByOne: alphaSouth + 20 * scale,
      commonTraps: [productTotals["Alpha X"] - matrix["Alpha X"].North, alphaSouth + 10 * scale],
    }
  );

  questions.push({
    id: `miss-q1-${Date.now()}`,
    questionNumber: 1,
    questionText: `What is the missing shipment volume of 'Alpha X' in the South Zone?`,
    questionType: "MCQ",
    options: q1Distractors.options,
    correctAnswer: q1Distractors.correctLabel,
    explanation: {
      detailed: `Use the row constraint for Alpha X: Total Volume = North + South + West.`,
      steps: [
        `Alpha X Total = ${productTotals["Alpha X"]}.`,
        `Alpha X North = ${matrix["Alpha X"].North}, Alpha X West = ${matrix["Alpha X"].West}.`,
        `Alpha X South = Total - (North + West) = ${productTotals["Alpha X"]} - (${matrix["Alpha X"].North} + ${matrix["Alpha X"].West}) = ${alphaSouth}.`,
      ],
      shortcut: `Row total balance deduction: Subtract known cells in the first row from the row total directly.`,
    },
    estimatedTimeSec: 60,
    skillTested: "Single Row Balance Deduction",
  });

  // Question 2: Value of Beta Pro in North Zone (TITA)
  const betaNorth = matrix["Beta Pro"].North;

  questions.push({
    id: `miss-q2-${Date.now()}`,
    questionNumber: 2,
    questionText: `What is the missing volume of 'Beta Pro' shipped to the North Zone? (Enter integer only)`,
    questionType: "TITA",
    options: [],
    correctAnswer: betaNorth.toString(),
    explanation: {
      detailed: `Use the row total for Beta Pro:`,
      steps: [
        `Beta Pro Total = ${productTotals["Beta Pro"]}.`,
        `Beta Pro South = ${matrix["Beta Pro"].South}, Beta Pro West = ${matrix["Beta Pro"].West}.`,
        `Beta Pro North = ${productTotals["Beta Pro"]} - (${matrix["Beta Pro"].South} + ${matrix["Beta Pro"].West}) = ${betaNorth}.`,
      ],
      observation: `Can also be double-checked using the North column total once other North cells are identified.`,
    },
    estimatedTimeSec: 50,
    skillTested: "Incomplete Table Row-Column Cross-Verification",
  });

  // Question 3: Ratio of missing Gamma Plus in West to missing Delta Lite in South
  const gammaWest = matrix["Gamma Plus"].West;
  const deltaSouth = matrix["Delta Lite"].South;
  const ratioGtoD = Number((gammaWest / deltaSouth).toFixed(2));

  const q3Distractors = generateDistractors(
    ratioGtoD,
    (v) => `${v.toFixed(2)} : 1`,
    {
      inverted: Number((deltaSouth / gammaWest).toFixed(2)),
    }
  );

  questions.push({
    id: `miss-q3-${Date.now()}`,
    questionNumber: 3,
    questionText: `After completing all missing cells, what is the ratio of Gamma Plus volume in the West Zone to Delta Lite volume in the South Zone?`,
    questionType: "MCQ",
    options: q3Distractors.options,
    correctAnswer: q3Distractors.correctLabel,
    explanation: {
      detailed: `Find Gamma Plus West and Delta Lite South, then compute the ratio:`,
      steps: [
        `Gamma Plus West = ${productTotals["Gamma Plus"]} - (${matrix["Gamma Plus"].North} + ${matrix["Gamma Plus"].South}) = ${gammaWest}.`,
        `Delta Lite South = ${productTotals["Delta Lite"]} - (${matrix["Delta Lite"].North} + ${matrix["Delta Lite"].West}) = ${deltaSouth}.`,
        `Ratio = ${gammaWest} / ${deltaSouth} ≈ ${ratioGtoD} : 1.`,
      ],
      shortcut: `Compute the two values directly from their respective row totals.`,
    },
    estimatedTimeSec: 90,
    skillTested: "Derived Cross-Cell Relative Comparison",
  });

  // Question 4: Percentage contribution of North Zone to overall volume
  const northShare = Number(((zoneTotals.North / grandTotal) * 100).toFixed(1));
  const q4Distractors = generateDistractors(
    northShare,
    (v) => `${v.toFixed(1)}%`,
    {
      offByOne: Number((northShare + 4.2).toFixed(1)),
      inverted: Number(((zoneTotals.South / grandTotal) * 100).toFixed(1)),
    }
  );

  questions.push({
    id: `miss-q4-${Date.now()}`,
    questionNumber: 4,
    questionText: `What percentage of the overall grand total volume across all categories and zones was accounted for by the North Zone?`,
    questionType: "MCQ",
    options: q4Distractors.options,
    correctAnswer: q4Distractors.correctLabel,
    explanation: {
      detailed: `Percentage Share of North = (North Zone Total / Grand Total) × 100.`,
      steps: [
        `North Zone Total = ${zoneTotals.North}.`,
        `Grand Total = ${grandTotal}.`,
        `North Share = (${zoneTotals.North} / ${grandTotal}) × 100 = ${northShare}%.`,
      ],
      shortcut: `Use the bottom 'Total' row directly.`,
    },
    estimatedTimeSec: 60,
    skillTested: "Marginal Distribution Analysis",
  });

  return {
    id: `di-missing-${Date.now()}-${getRandomInt(100, 999)}`,
    section: "DI",
    topic: "missing-data",
    topicTitle: "Missing Data Tables & Linear Deduction",
    difficulty,
    title: "Regional Distribution Matrix with Incomplete Records",
    description: `The table below exhibits the quarterly shipment volumes (in units) of four specialized industrial product categories across three geographical zones: North, South, and West. Due to partial transmission packet loss, certain individual cell values (denoted by '?') are missing. However, all marginal row totals and column totals are intact and verified.`,
    dataset: { matrix, productTotals, zoneTotals, grandTotal },
    visualizationType: "table",
    visualizationData: {
      title: "Quarterly Industrial Shipments Matrix (with Missing Data '?')",
      headers,
      rows: displayRows,
      hasMissingValues: true,
    },
    estimatedTimeMin: difficulty === "CAT_HARD" ? 12 : 8,
    questions,
    tags: ["Missing Data", "Linear Constraints", "Matrix Balancing", "CAT DILR"],
  };
}
