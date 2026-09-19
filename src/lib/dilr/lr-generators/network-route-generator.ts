import { DILRDifficulty, DILRQuestion, DILRSet } from "../types";
import { generateCategoricalDistractors, generateDistractors, getRandomInt, pickRandom } from "../solver";

interface Edge {
  from: string;
  to: string;
  cost: number;
}

export function generateNetworkRouteSet(difficulty: DILRDifficulty): DILRSet {
  // Directed Acyclic Network: Source = Node A, Destination = Node F
  // Intermediates: B, C, D, E
  // Edges:
  // A -> B: 12
  // A -> C: 16
  // B -> D: 14
  // B -> E: 22
  // C -> D: 8
  // C -> E: 18
  // D -> E: 6
  // D -> F: 15
  // E -> F: 10

  const multiplier = getRandomInt(1, 2);
  const edges: Edge[] = [
    { from: "A", to: "B", cost: 12 * multiplier },
    { from: "A", to: "C", cost: 16 * multiplier },
    { from: "B", to: "D", cost: 14 * multiplier },
    { from: "B", to: "E", cost: 22 * multiplier },
    { from: "C", to: "D", cost: 8 * multiplier },
    { from: "C", to: "E", cost: 18 * multiplier },
    { from: "D", to: "E", cost: 6 * multiplier },
    { from: "D", to: "F", cost: 15 * multiplier },
    { from: "E", to: "F", cost: 10 * multiplier },
  ];

  // All possible paths from A to F:
  // Path 1: A -> B -> D -> F: 12 + 14 + 15 = 41 * multiplier
  // Path 2: A -> B -> D -> E -> F: 12 + 14 + 6 + 10 = 42 * multiplier
  // Path 3: A -> B -> E -> F: 12 + 22 + 10 = 44 * multiplier
  // Path 4: A -> C -> D -> F: 16 + 8 + 15 = 39 * multiplier (Shortest!)
  // Path 5: A -> C -> D -> E -> F: 16 + 8 + 6 + 10 = 40 * multiplier
  // Path 6: A -> C -> E -> F: 16 + 18 + 10 = 44 * multiplier

  const allPaths = [
    { path: "A → B → D → F", cost: (12 + 14 + 15) * multiplier },
    { path: "A → B → D → E → F", cost: (12 + 14 + 6 + 10) * multiplier },
    { path: "A → B → E → F", cost: (12 + 22 + 10) * multiplier },
    { path: "A → C → D → F", cost: (16 + 8 + 15) * multiplier },
    { path: "A → C → D → E → F", cost: (16 + 8 + 6 + 10) * multiplier },
    { path: "A → C → E → F", cost: (16 + 18 + 10) * multiplier },
  ];

  const totalPathsCount = allPaths.length; // 6
  const minCost = 39 * multiplier;
  const shortestPathName = "A → C → D → F";

  // If node D is closed:
  // Only paths not containing D:
  // Path 3: A -> B -> E -> F (44 * multiplier)
  // Path 6: A -> C -> E -> F (44 * multiplier)
  const minCostWithoutD = 44 * multiplier;

  const conditions = [
    "A logistics pipeline network connects manufacturing origin Hub A to maritime export Terminal F via intermediate distribution waypoints B, C, D, and E.",
    "Transit between waypoints is one-way (directed) along established automated transport corridors as illustrated in the network map.",
    "The toll/transport cost (in ₹ '000 per container) associated with traversing each link is explicitly marked along the corresponding directed corridor.",
    "A container moves strictly in the forward direction and cannot visit any waypoint node more than once.",
  ];

  const questions: DILRQuestion[] = [];

  // Question 1: What is the minimum cost to transport a container from A to F?
  const q1Distractors = generateDistractors(
    minCost,
    (v) => `₹${Math.round(v)}k`,
    {
      offByOne: minCost + 2 * multiplier,
      commonTraps: [40 * multiplier, 41 * multiplier],
    }
  );

  questions.push({
    id: `net-q1-${Date.now()}`,
    questionNumber: 1,
    questionText: `What is the minimum possible transit cost (in ₹ '000) for routing a freight container from Hub A to Terminal F?`,
    questionType: "MCQ",
    options: q1Distractors.options,
    correctAnswer: q1Distractors.correctLabel,
    explanation: {
      detailed: `Evaluate all possible paths from A to F:`,
      steps: [
        ...allPaths.map((p) => `${p.path}: Cost = ₹${p.cost}k ${p.cost === minCost ? "(Optimal / Minimum)" : ""}`),
        `The lowest cost is ₹${minCost}k via the route ${shortestPathName}.`,
      ],
      shortcut: `Dynamic programming / Dijkstra inspection: Optimal cost to D is via C (16 + 8 = 24 vs 12 + 14 = 26). From D to F directly is 15 (24 + 15 = 39).`,
    },
    estimatedTimeSec: 90,
    skillTested: "Directed Graph Shortest Path & Dynamic Programming",
  });

  // Question 2: TITA - How many distinct paths exist from Hub A to Terminal F?
  questions.push({
    id: `net-q2-${Date.now()}`,
    questionNumber: 2,
    questionText: `How many distinct valid routing paths exist for sending a container from Hub A to Terminal F without revisiting any node? (Enter integer only)`,
    questionType: "TITA",
    options: [],
    correctAnswer: totalPathsCount.toString(),
    explanation: {
      detailed: `Enumerate paths systematically by first branching:`,
      steps: [
        `Branch via B: B can go to D (which has 2 sub-paths to F: D->F and D->E->F) or directly to E (which has 1 sub-path to F: E->F). Subtotal from B = 2 + 1 = 3 paths.`,
        `Branch via C: C can go to D (which has 2 sub-paths to F: D->F and D->E->F) or directly to E (which has 1 sub-path to F: E->F). Subtotal from C = 2 + 1 = 3 paths.`,
        `Total distinct paths = 3 + 3 = ${totalPathsCount} paths.`,
      ],
      observation: `CAT network problems frequently ask for path counting using combinatorics on DAGs.`,
    },
    estimatedTimeSec: 60,
    skillTested: "Combinatorial Path Enumeration on DAGs",
  });

  // Question 3: Routing if Waypoint D is shut down
  const q3Distractors = generateDistractors(
    minCostWithoutD,
    (v) => `₹${Math.round(v)}k`,
    {
      offByOne: minCostWithoutD + 3 * multiplier,
      commonTraps: [minCost, 42 * multiplier],
    }
  );

  questions.push({
    id: `net-q3-${Date.now()}`,
    questionNumber: 3,
    questionText: `If Waypoint D is temporarily shut down due to scheduled system overhaul, what will be the new minimum transit cost from Hub A to Terminal F?`,
    questionType: "MCQ",
    options: q3Distractors.options,
    correctAnswer: q3Distractors.correctLabel,
    explanation: {
      detailed: `Eliminate all paths passing through node D:`,
      steps: [
        `Available remaining paths: (i) A → B → E → F, Cost = 12 + 22 + 10 = ₹${44 * multiplier}k.`,
        `(ii) A → C → E → F, Cost = 16 + 18 + 10 = ₹${44 * multiplier}k.`,
        `Both surviving alternative routes yield an identical minimal cost of ₹${minCostWithoutD}k.`,
      ],
      shortcut: `Since D is eliminated, all routes must funnel through E to F. Check min cost to E via B or C.`,
    },
    estimatedTimeSec: 75,
    skillTested: "Constrained Sub-Network Re-Optimization",
  });

  // Question 4: Which edge should be improved for maximum cost saving?
  const q4Distractors = generateCategoricalDistractors("C → D", ["A → B", "D → E", "B → E"]);
  questions.push({
    id: `net-q4-${Date.now()}`,
    questionNumber: 4,
    questionText: `The management is planning to upgrade one corridor to reduce transit cost. Which of the following corridors lies directly on the existing optimal (lowest cost) route from A to F?`,
    questionType: "MCQ",
    options: q4Distractors.options,
    correctAnswer: q4Distractors.correctLabel,
    explanation: {
      detailed: `The unique optimal route is A → C → D → F with cost ₹${minCost}k.`,
      steps: [
        `Edges on optimal route: A → C, C → D, and D → F.`,
        `Among the options given, only 'C → D' lies on this optimal path.`,
      ],
      shortcut: `Verify which edge appears in the optimal route string: A → C → D → F.`,
    },
    estimatedTimeSec: 45,
    skillTested: "Critical Path Link Identification",
  });

  return {
    id: `lr-net-${Date.now()}-${getRandomInt(100, 999)}`,
    section: "LR",
    topic: "network-routes",
    topicTitle: "Network Graphs & Critical Route Optimization",
    difficulty,
    title: "Freight Pipeline Transit & Routing Optimization",
    description: `Inspect the directed transportation network diagram below connecting Hub A to Terminal F with associated transit costs:`,
    conditions,
    dataset: { edges, allPaths, minCost },
    visualizationType: "network",
    visualizationData: {
      title: "Directed Flow Network (Costs in ₹ '000)",
      sourceNode: "A",
      targetNode: "F",
      nodes: [
        { id: "A", label: "Hub A (Source)", x: 50, y: 150 },
        { id: "B", label: "Waypoint B", x: 180, y: 70 },
        { id: "C", label: "Waypoint C", x: 180, y: 230 },
        { id: "D", label: "Waypoint D", x: 320, y: 70 },
        { id: "E", label: "Waypoint E", x: 320, y: 230 },
        { id: "F", label: "Terminal F (Dest)", x: 450, y: 150 },
      ],
      edges: edges.map((e) => ({
        from: e.from,
        to: e.to,
        cost: e.cost,
        label: `₹${e.cost}k`,
      })),
    },
    estimatedTimeMin: difficulty === "CAT_HARD" ? 14 : 10,
    questions,
    tags: ["Network Routes", "Dijkstra", "Shortest Path", "Critical Path", "CAT DILR"],
  };
}
