import { DILRDifficulty, DILRSection, DILRSet, DILRTopicMeta } from "./types";
import { validateDILRSet } from "./solver";

// DI Generators
import { generateTableSet } from "./di-generators/table-generator";
import { generateBarGraphSet } from "./di-generators/bar-graph-generator";
import { generatePieChartSet } from "./di-generators/pie-chart-generator";
import { generateLineGraphSet } from "./di-generators/line-graph-generator";
import { generateMixedGraphSet } from "./di-generators/mixed-graph-generator";
import { generateCaseletSet } from "./di-generators/caselet-generator";
import { generateMissingDataSet } from "./di-generators/missing-data-generator";

// LR Generators
import { generateArrangementSet } from "./lr-generators/arrangement-generator";
import { generateTournamentSet } from "./lr-generators/tournament-generator";
import { generateVennDiagramSet } from "./lr-generators/venn-diagram-generator";
import { generateNetworkRouteSet } from "./lr-generators/network-route-generator";
import { generateBinaryLogicSet } from "./lr-generators/binary-logic-generator";
import { generateSchedulingSet } from "./lr-generators/scheduling-generator";

export const DILR_TOPICS: DILRTopicMeta[] = [
  // --- Data Interpretation Topics ---
  {
    id: "table",
    title: "Financial & Demographic Tables",
    section: "DI",
    description: "Multi-year corporate financials, growth rates, margins, and ratios from structured tabular records.",
    icon: "Table2",
    catWeightage: "Very High",
    questionStyle: "Calculation-Heavy & Comparison",
    visualizationType: "table",
  },
  {
    id: "bar-graph",
    title: "Grouped & Stacked Bar Charts",
    section: "DI",
    description: "Powertrain market transitions, sales volume distributions, and YoY component expansion.",
    icon: "BarChart3",
    catWeightage: "High",
    questionStyle: "Trend Analysis & Percentage Shares",
    visualizationType: "bar",
  },
  {
    id: "pie-chart",
    title: "Pie Charts & Market Share Slices",
    section: "DI",
    description: "Angular proportions, multi-segment market breakdown, and revenue elasticity models.",
    icon: "PieChart",
    catWeightage: "High",
    questionStyle: "Angle Geometry & Elasticity",
    visualizationType: "pie",
  },
  {
    id: "line-graph",
    title: "Multi-Series Line Graphs",
    section: "DI",
    description: "Capital flow trajectories, turning points, divergence gaps, and moving averages.",
    icon: "TrendingUp",
    catWeightage: "High",
    questionStyle: "Curve Crossover & Volatility",
    visualizationType: "line",
  },
  {
    id: "mixed-graph",
    title: "Dual-Axis Composed Graphs",
    section: "DI",
    description: "Combined Bar + Line plots testing scale synthesis, margin traps, and weighted averages.",
    icon: "Activity",
    catWeightage: "Very High",
    questionStyle: "Dual-Axis Synthesis & Traps",
    visualizationType: "mixed",
  },
  {
    id: "caselet",
    title: "Unstructured Business Caselets",
    section: "DI",
    description: "Cohort conversion funnels, CAC/LTV equations, and narrative-driven matrix formulation.",
    icon: "FileSpreadsheet",
    catWeightage: "Very High",
    questionStyle: "Matrix Formulation from Prose",
    visualizationType: "caselet",
  },
  {
    id: "missing-data",
    title: "Missing Data & Matrix Balancing",
    section: "DI",
    description: "Incomplete regional tables with hidden cells deducible via marginal totals and linear equations.",
    icon: "Grid",
    catWeightage: "Very High",
    questionStyle: "Deductive Equation Balancing",
    visualizationType: "table",
  },

  // --- Logical Reasoning Topics ---
  {
    id: "linear-arrangement",
    title: "Linear Seating & Directional Facing",
    section: "LR",
    description: "Straight-row and multi-parameter board seatings with facing constraints and positional clues.",
    icon: "Users",
    catWeightage: "Very High",
    questionStyle: "Slot Deduction & Elimination",
    visualizationType: "arrangement",
  },
  {
    id: "tournament",
    title: "Round-Robin & Knockout Tournaments",
    section: "LR",
    description: "Standings tables, points arithmetic, goal differences, and head-to-head match outcomes.",
    icon: "Trophy",
    catWeightage: "Very High",
    questionStyle: "Points Table Goal Arithmetic",
    visualizationType: "table",
  },
  {
    id: "venn-diagram",
    title: "3-Set Venn Diagrams & Intersections",
    section: "LR",
    description: "Inclusion-exclusion principles, poly-region overlaps, conditional percentages, and exact sums.",
    icon: "CircleDot",
    catWeightage: "Very High",
    questionStyle: "Set Theory & Boundary Cardinality",
    visualizationType: "venn",
  },
  {
    id: "network-routes",
    title: "Network Graphs & Critical Routing",
    section: "LR",
    description: "Directed acyclic graphs (DAGs), pipeline toll costs, shortest paths, and transit bottleneck closures.",
    icon: "GitFork",
    catWeightage: "High",
    questionStyle: "Shortest Path & Path Counting",
    visualizationType: "network",
  },
  {
    id: "binary-logic",
    title: "Binary Logic: Truth-Tellers & Alternators",
    section: "LR",
    description: "Interrogation statements, truth consistency evaluation, paradox resolution, and liar deduction.",
    icon: "HelpCircle",
    catWeightage: "High",
    questionStyle: "Epistemic Paradox Resolution",
    visualizationType: "none",
  },
  {
    id: "scheduling",
    title: "Day-Wise Constraints & Timetables",
    section: "LR",
    description: "Multi-day academic symposium schedules with chronological gaps and domain mapping.",
    icon: "Calendar",
    catWeightage: "High",
    questionStyle: "Timeline Constraint Solving",
    visualizationType: "table",
  },
];

type GeneratorFn = (difficulty: DILRDifficulty) => DILRSet;

const GENERATORS: Record<string, GeneratorFn> = {
  // DI
  table: generateTableSet,
  "bar-graph": generateBarGraphSet,
  "pie-chart": generatePieChartSet,
  "line-graph": generateLineGraphSet,
  "mixed-graph": generateMixedGraphSet,
  caselet: generateCaseletSet,
  "missing-data": generateMissingDataSet,

  // LR
  "linear-arrangement": generateArrangementSet,
  tournament: generateTournamentSet,
  "venn-diagram": generateVennDiagramSet,
  "network-routes": generateNetworkRouteSet,
  "binary-logic": generateBinaryLogicSet,
  scheduling: generateSchedulingSet,
};

/**
 * In-memory cache of generated sets so links like /learn/dilr/set/[setId] can retrieve them
 */
const SET_CACHE = new Map<string, DILRSet>();

/**
 * Master generator function with automatic retry and validation
 */
export function generateDILRSet(
  topicId: string,
  difficulty: DILRDifficulty = "CAT"
): DILRSet {
  const genFn = GENERATORS[topicId];
  if (!genFn) {
    throw new Error(`No generator registered for topic: ${topicId}`);
  }

  const maxAttempts = 3;
  let lastErrors: string[] = [];

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const candidateSet = genFn(difficulty);
    const validation = validateDILRSet(candidateSet);

    if (validation.valid) {
      SET_CACHE.set(candidateSet.id, candidateSet);
      return candidateSet;
    }

    lastErrors = validation.errors;
    console.warn(
      `[DILR Generator] Attempt ${attempt} failed validation for topic '${topicId}':`,
      validation.errors
    );
  }

  throw new Error(
    `Failed to generate valid DILR set for '${topicId}' after ${maxAttempts} attempts. Errors: ${lastErrors.join("; ")}`
  );
}

/**
 * Generate a random DILR set across a section or overall
 */
export function generateRandomDILRSet(
  section?: DILRSection,
  difficulty: DILRDifficulty = "CAT"
): DILRSet {
  const eligibleTopics = section
    ? DILR_TOPICS.filter((t) => t.section === section)
    : DILR_TOPICS;

  const chosenTopic = eligibleTopics[Math.floor(Math.random() * eligibleTopics.length)];
  return generateDILRSet(chosenTopic.id, difficulty);
}

/**
 * Retrieve cached set by ID or regenerate a fresh one matching the ID prefix
 */
export function getDILRSetById(id: string): DILRSet | null {
  if (SET_CACHE.has(id)) {
    return SET_CACHE.get(id)!;
  }

  // Attempt to deduce topic from id prefix (e.g. "di-table-...", "lr-arr-...")
  const prefixMap: Record<string, string> = {
    "di-table": "table",
    "di-bar": "bar-graph",
    "di-pie": "pie-chart",
    "di-line": "line-graph",
    "di-mixed": "mixed-graph",
    "di-caselet": "caselet",
    "di-missing": "missing-data",
    "lr-arr": "linear-arrangement",
    "lr-tour": "tournament",
    "lr-venn": "venn-diagram",
    "lr-net": "network-routes",
    "lr-bin": "binary-logic",
    "lr-sched": "scheduling",
  };

  for (const [prefix, topicId] of Object.entries(prefixMap)) {
    if (id.startsWith(prefix)) {
      const regenerated = generateDILRSet(topicId, "CAT");
      // preserve the requested ID
      regenerated.id = id;
      SET_CACHE.set(id, regenerated);
      return regenerated;
    }
  }

  // Fallback to random table set
  const fallback = generateTableSet("CAT");
  fallback.id = id;
  SET_CACHE.set(id, fallback);
  return fallback;
}
