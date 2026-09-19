import { DILRDifficulty, DILRQuestion, DILRSet } from "../types";
import { generateCategoricalDistractors, generateDistractors, getRandomInt, pickRandom } from "../solver";

interface TournamentTeam {
  name: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number; // Goals For
  ga: number; // Goals Against
  gd: number; // Goal Difference
  points: number;
}

export function generateTournamentSet(difficulty: DILRDifficulty): DILRSet {
  // 4 Teams: Red Dragons, Blue Falcons, Silver Wolves, Golden Eagles
  // Total 6 matches played in a single round robin.
  // Scoring: Win = 3 pts, Draw = 1 pt, Loss = 0 pts.
  // Ground truth matches:
  // 1. Dragons vs Falcons: Dragons win 2 - 1
  // 2. Dragons vs Wolves: Dragons win 1 - 0
  // 3. Dragons vs Eagles: Draw 1 - 1
  // 4. Falcons vs Wolves: Falcons win 3 - 2
  // 5. Falcons vs Eagles: Falcons win 2 - 0
  // 6. Wolves vs Eagles: Wolves win 1 - 0

  // Resulting table:
  // Dragons: P=3, W=2, D=1, L=0 | GF = 2+1+1=4, GA = 1+0+1=2 | Pts = 7
  // Falcons: P=3, W=2, D=0, L=1 | GF = 1+3+2=6, GA = 2+2+0=4 | Pts = 6
  // Wolves:  P=3, W=1, D=0, L=2 | GF = 0+2+1=3, GA = 1+3+0=4 | Pts = 3
  // Eagles:  P=3, W=0, D=1, L=2 | GF = 1+0+0=1, GA = 1+2+1=4 | Pts = 1

  const standings: TournamentTeam[] = [
    { name: "Red Dragons", played: 3, won: 2, drawn: 1, lost: 0, gf: 4, ga: 2, gd: 2, points: 7 },
    { name: "Blue Falcons", played: 3, won: 2, drawn: 0, lost: 1, gf: 6, ga: 4, gd: 2, points: 6 },
    { name: "Silver Wolves", played: 3, won: 1, drawn: 0, lost: 2, gf: 3, ga: 4, gd: -1, points: 3 },
    { name: "Golden Eagles", played: 3, won: 0, drawn: 1, lost: 2, gf: 1, ga: 4, gd: -3, points: 1 },
  ];

  const headers = ["Team", "P", "W", "D", "L", "GF", "GA", "GD", "Points"];
  const rows = standings.map((t) => [
    t.name,
    t.played.toString(),
    t.won.toString(),
    t.drawn.toString(),
    t.lost.toString(),
    t.gf.toString(),
    t.ga.toString(),
    (t.gd > 0 ? `+${t.gd}` : `${t.gd}`),
    t.points.toString(),
  ]);

  const conditions = [
    "Four premier soccer clubs—Red Dragons, Blue Falcons, Silver Wolves, and Golden Eagles—competed in a single round-robin invitational tournament (each team played every other team exactly once, yielding 6 total matches).",
    "Points system: A victory yields 3 points to the winner and 0 points to the loser. A drawn match yields 1 point to each team.",
    "The final verified tournament standings table is given above.",
    "Additional confirmed match intelligence:",
    "• In the high-intensity match between Blue Falcons and Silver Wolves, a total of 5 goals were scored, with Blue Falcons securing the win.",
    "• Red Dragons defeated Silver Wolves with a clean sheet (Silver Wolves failed to score).",
    "• The match between Red Dragons and Golden Eagles ended in a 1-1 draw.",
  ];

  const questions: DILRQuestion[] = [];

  // Question 1: What was the exact scoreline between Red Dragons and Blue Falcons?
  // Dragons won (GF 2, GA 1 -> 2 - 1)
  const q1Distractors = generateCategoricalDistractors("2 - 1", ["1 - 0", "3 - 1", "2 - 0"]);
  questions.push({
    id: `tour-q1-${Date.now()}`,
    questionNumber: 1,
    questionText: `What was the exact final scoreline in the match between Red Dragons and Blue Falcons?`,
    questionType: "MCQ",
    options: q1Distractors.options,
    correctAnswer: q1Distractors.correctLabel,
    explanation: {
      detailed: `Analyze Dragons and Falcons records: Dragons won 2 matches (against Falcons and Wolves) and drew with Eagles (1-1). Falcons lost only 1 match (to Dragons).`,
      steps: [
        `Dragons total GF = 4. Against Eagles: 1 goal (1-1 draw). Against Wolves: Dragons kept clean sheet and won (must be 1-0 since Wolves only conceded 4 goals total: 3 to Falcons + 1 to Dragons).`,
        `Hence Dragons scored 4 - 1 - 1 = 2 goals against Falcons.`,
        `Falcons GA = 4 total. Wolves scored 2 against Falcons, Eagles scored 0 (Falcons won 2-0). Hence Falcons conceded 4 - 2 - 0 = 2 goals against Dragons.`,
        `Falcons scored 1 goal against Dragons (Falcons GF = 6: 3 vs Wolves, 2 vs Eagles, leaving 1 vs Dragons).`,
        `Therefore, the scoreline was Red Dragons 2 - 1 Blue Falcons.`,
      ],
      shortcut: `Dragons had 7 pts (W2, D1, L0). Falcons had 6 pts (W2, D0, L1). The only loss for Falcons was against Dragons. Goal accounting yields 2 - 1.`,
    },
    estimatedTimeSec: 120,
    skillTested: "Goal-Difference & Result Matrix Deduction",
  });

  // Question 2: TITA - Total number of goals scored across all 6 matches
  const totalGoals = standings.reduce((s, t) => s + t.gf, 0); // 4 + 6 + 3 + 1 = 14

  questions.push({
    id: `tour-q2-${Date.now()}`,
    questionNumber: 2,
    questionText: `What was the total cumulative number of goals scored across all 6 matches of the tournament? (Enter numeric answer only)`,
    questionType: "TITA",
    options: [],
    correctAnswer: totalGoals.toString(),
    explanation: {
      detailed: `The total goals scored in any round-robin tournament is strictly equal to the sum of the 'Goals For' (GF) column of all teams (which also identically equals the sum of the GA column).`,
      steps: [
        `Sum of GF = 4 (Dragons) + 6 (Falcons) + 3 (Wolves) + 1 (Eagles) = ${totalGoals} goals.`,
        `Verification via GA = 2 + 4 + 4 + 4 = 14 goals.`,
      ],
      observation: `Every goal scored by a team is simultaneously conceded by its opponent, making Sum(GF) = Sum(GA).`,
    },
    estimatedTimeSec: 45,
    skillTested: "Tournament Mathematical Invariants",
  });

  // Question 3: How many matches ended in a draw?
  // Only Dragons vs Eagles (1 draw). Total drawn matches in tournament = 1.
  const q3Distractors = generateCategoricalDistractors("1", ["0", "2", "3"]);
  questions.push({
    id: `tour-q3-${Date.now()}`,
    questionNumber: 3,
    questionText: `How many matches in the entire tournament concluded in a draw?`,
    questionType: "MCQ",
    options: q3Distractors.options,
    correctAnswer: q3Distractors.correctLabel,
    explanation: {
      detailed: `Each drawn match creates exactly 2 draws in the table (1 for each team).`,
      steps: [
        `Total draws recorded in table = 1 (Dragons) + 0 (Falcons) + 0 (Wolves) + 1 (Eagles) = 2 draw entries.`,
        `Since each drawn match involves 2 teams, Number of Drawn Matches = 2 / 2 = 1 match (specifically Red Dragons vs Golden Eagles).`,
      ],
      shortcut: `Total Draw entries in table divided by 2 gives total drawn fixtures immediately.`,
    },
    estimatedTimeSec: 40,
    skillTested: "Handshake & Draw Pair Counting",
  });

  // Question 4: What was the score in Falcons vs Eagles?
  const q4Distractors = generateCategoricalDistractors("2 - 0", ["3 - 0", "1 - 0", "2 - 1"]);
  questions.push({
    id: `tour-q4-${Date.now()}`,
    questionNumber: 4,
    questionText: `What was the outcome and scoreline of the match played between Blue Falcons and Golden Eagles?`,
    questionType: "MCQ",
    options: q4Distractors.options,
    correctAnswer: q4Distractors.correctLabel,
    explanation: {
      detailed: `Deduce from Eagles records:`,
      steps: [
        `Eagles scored only 1 goal all tournament (which was in the 1-1 draw against Dragons).`,
        `Hence Eagles scored 0 goals against Falcons.`,
        `Falcons scored 6 goals total: 1 against Dragons, 3 against Wolves. Remaining goals against Eagles = 6 - 1 - 3 = 2.`,
        `Therefore, Falcons won 2 - 0 against Eagles.`,
      ],
      shortcut: `Eagles' total GF was 1, all of which was used up against Dragons! Falcons conceded 0 goals against Eagles.`,
    },
    estimatedTimeSec: 90,
    skillTested: "Residual Goals Allocation",
  });

  return {
    id: `lr-tour-${Date.now()}-${getRandomInt(100, 999)}`,
    section: "LR",
    topic: "tournament",
    topicTitle: "Round-Robin Tournaments & Points Table Deduction",
    difficulty,
    title: "Invitational Round-Robin Championship Analysis",
    description: `Analyze the final points and goal statistics from the 4-team invitational championship below:`,
    conditions,
    dataset: { standings },
    visualizationType: "table",
    visualizationData: {
      title: "Championship Final Standings Table",
      headers,
      rows,
    },
    estimatedTimeMin: difficulty === "CAT_HARD" ? 15 : 10,
    questions,
    tags: ["Tournaments", "Round Robin", "Goal Difference", "Points Deduction", "CAT DILR"],
  };
}
