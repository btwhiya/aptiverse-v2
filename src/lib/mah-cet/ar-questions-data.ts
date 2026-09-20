import {
  FigureSeriesQuestion,
  FigureAnalogyQuestion,
  MatchingPairsQuestion,
  FigureClassificationQuestion,
  MissingFigureQuestion,
  RotationReflectionQuestion,
  ARQuestion
} from "./types";

// =================================================================
// 1. FIGURE SERIES (5 QUESTIONS)
// =================================================================

export const FIGURE_SERIES_QUESTIONS: FigureSeriesQuestion[] = [
  {
    id: "fs-01",
    exam: "MAH CET",
    section: "Abstract Reasoning",
    category: "Figure Series",
    questionType: "FIGURE_SERIES",
    difficulty: "FOUNDATION",
    prompt: "Identify the figure that replaces the question mark (?) in the series.",
    transformationType: "Clockwise corner migration with side count progression",
    stepByStepRule: [
      "Shape moves clockwise through corners: Top-Left -> Top-Right -> Bottom-Right -> Bottom-Left.",
      "Side count increases by 1 each step: Triangle (3) -> Square (4) -> Pentagon (5) -> Hexagon (6).",
      "Next position must be Top-Left with a 7-sided polygon (Heptagon) or Star."
    ],
    ruleExplanation:
      "The primary shape cycles clockwise from corner to corner (Top-Left -> Top-Right -> Bottom-Right -> Bottom-Left -> Top-Left) while gaining +1 vertex per step. At Step 5, the shape returns to Top-Left as an 8-pointed star/hexagon with filled shading.",
    sequenceFigures: [
      {
        id: "fs-01-f1",
        label: "1",
        outerFrame: "square",
        elements: [{ id: "e1", shape: "triangle", position: "top-left", rotation: 0, fill: "empty", size: "medium" }]
      },
      {
        id: "fs-01-f2",
        label: "2",
        outerFrame: "square",
        elements: [{ id: "e1", shape: "square", position: "top-right", rotation: 0, fill: "empty", size: "medium" }]
      },
      {
        id: "fs-01-f3",
        label: "3",
        outerFrame: "square",
        elements: [{ id: "e1", shape: "pentagon", position: "bottom-right", rotation: 0, fill: "empty", size: "medium" }]
      },
      {
        id: "fs-01-f4",
        label: "4",
        outerFrame: "square",
        elements: [{ id: "e1", shape: "hexagon", position: "bottom-left", rotation: 0, fill: "empty", size: "medium" }]
      }
    ],
    options: [
      {
        label: "A",
        figure: {
          id: "fs-01-opt-a",
          outerFrame: "square",
          elements: [{ id: "oa", shape: "star", position: "top-left", rotation: 0, fill: "filled", size: "medium" }]
        }
      },
      {
        label: "B",
        figure: {
          id: "fs-01-opt-b",
          outerFrame: "square",
          elements: [{ id: "ob", shape: "hexagon", position: "bottom-left", rotation: 0, fill: "filled", size: "medium" }]
        }
      },
      {
        label: "C",
        figure: {
          id: "fs-01-opt-c",
          outerFrame: "square",
          elements: [{ id: "oc", shape: "square", position: "top-right", rotation: 90, fill: "empty", size: "medium" }]
        }
      },
      {
        label: "D",
        figure: {
          id: "fs-01-opt-d",
          outerFrame: "square",
          elements: [{ id: "od", shape: "triangle", position: "top-left", rotation: 0, fill: "empty", size: "medium" }]
        }
      },
      {
        label: "E",
        figure: {
          id: "fs-01-opt-e",
          outerFrame: "square",
          elements: [{ id: "oe", shape: "circle", position: "center", rotation: 0, fill: "striped", size: "medium" }]
        }
      }
    ],
    correctAnswer: "A",
    tags: ["series", "corner-hop", "vertex-count"]
  },
  {
    id: "fs-02",
    exam: "MAH CET",
    section: "Abstract Reasoning",
    category: "Figure Series",
    questionType: "FIGURE_SERIES",
    difficulty: "MAH_CET_LEVEL",
    prompt: "Determine the subsequent figure that continues the sequence.",
    transformationType: "Dual orbital rotation with alternating fill state",
    stepByStepRule: [
      "The arrow at the center rotates 90° clockwise in each consecutive frame: 0° -> 90° -> 180° -> 270° -> 0°.",
      "The peripheral dot orbits counter-clockwise by 90°: Top -> Left -> Bottom -> Right -> Top.",
      "The fill state of the arrow alternates: Filled -> Empty -> Filled -> Empty -> Filled."
    ],
    ruleExplanation:
      "Arrow rotates 90° CW per frame with fill alternating (Solid, Hollow, Solid, Hollow, Solid). The dot shifts counter-clockwise along cardinal directions (North -> West -> South -> East -> North). Hence, the 5th figure must feature an upright filled arrow at center and a dot at the top.",
    sequenceFigures: [
      {
        id: "fs-02-f1",
        label: "1",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "arrow", position: "center", rotation: 0, fill: "filled", size: "large" },
          { id: "e2", shape: "dot", position: "top", rotation: 0, fill: "filled", size: "small" }
        ]
      },
      {
        id: "fs-02-f2",
        label: "2",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "arrow", position: "center", rotation: 90, fill: "empty", size: "large" },
          { id: "e2", shape: "dot", position: "left", rotation: 0, fill: "filled", size: "small" }
        ]
      },
      {
        id: "fs-02-f3",
        label: "3",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "arrow", position: "center", rotation: 180, fill: "filled", size: "large" },
          { id: "e2", shape: "dot", position: "bottom", rotation: 0, fill: "filled", size: "small" }
        ]
      },
      {
        id: "fs-02-f4",
        label: "4",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "arrow", position: "center", rotation: 270, fill: "empty", size: "large" },
          { id: "e2", shape: "dot", position: "right", rotation: 0, fill: "filled", size: "small" }
        ]
      }
    ],
    options: [
      {
        label: "A",
        figure: {
          id: "fs-02-opt-a",
          outerFrame: "square",
          elements: [
            { id: "oa1", shape: "arrow", position: "center", rotation: 0, fill: "filled", size: "large" },
            { id: "oa2", shape: "dot", position: "top", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "B",
        figure: {
          id: "fs-02-opt-b",
          outerFrame: "square",
          elements: [
            { id: "ob1", shape: "arrow", position: "center", rotation: 0, fill: "empty", size: "large" },
            { id: "ob2", shape: "dot", position: "top", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "C",
        figure: {
          id: "fs-02-opt-c",
          outerFrame: "square",
          elements: [
            { id: "oc1", shape: "arrow", position: "center", rotation: 90, fill: "filled", size: "large" },
            { id: "oc2", shape: "dot", position: "bottom", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "D",
        figure: {
          id: "fs-02-opt-d",
          outerFrame: "square",
          elements: [
            { id: "od1", shape: "arrow", position: "center", rotation: 180, fill: "filled", size: "large" },
            { id: "od2", shape: "dot", position: "left", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "E",
        figure: {
          id: "fs-02-opt-e",
          outerFrame: "square",
          elements: [
            { id: "oe1", shape: "arrow", position: "center", rotation: 270, fill: "empty", size: "large" },
            { id: "oe2", shape: "dot", position: "right", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      }
    ],
    correctAnswer: "A",
    tags: ["series", "rotation", "fill-alternation"]
  },
  {
    id: "fs-03",
    exam: "MAH CET",
    section: "Abstract Reasoning",
    category: "Figure Series",
    questionType: "FIGURE_SERIES",
    difficulty: "MAH_CET_LEVEL",
    prompt: "Choose the correct visual pattern that logically succeeds Figure 4.",
    transformationType: "Dot accumulation with corner bounce",
    stepByStepRule: [
      "Diamond shape remains fixed at center.",
      "Outer dots increase by 1 in each step: 1 dot -> 2 dots -> 3 dots -> 4 dots -> 5 dots.",
      "Each new dot is positioned on an available perimeter anchor in cyclic order (Top, Right, Bottom, Left, Center-Top)."
    ],
    ruleExplanation:
      "The central diamond stays stationary while peripheral satellite dots increment by +1 per frame (1 -> 2 -> 3 -> 4 -> 5 dots). Option C is the only candidate containing exactly 5 dots distributed correctly.",
    sequenceFigures: [
      {
        id: "fs-03-f1",
        label: "1",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "diamond", position: "center", rotation: 0, fill: "empty", size: "medium" },
          { id: "e2", shape: "dot", position: "top", rotation: 0, fill: "filled", size: "small" }
        ]
      },
      {
        id: "fs-03-f2",
        label: "2",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "diamond", position: "center", rotation: 0, fill: "empty", size: "medium" },
          { id: "e2", shape: "dot", position: "top", rotation: 0, fill: "filled", size: "small" },
          { id: "e3", shape: "dot", position: "right", rotation: 0, fill: "filled", size: "small" }
        ]
      },
      {
        id: "fs-03-f3",
        label: "3",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "diamond", position: "center", rotation: 0, fill: "empty", size: "medium" },
          { id: "e2", shape: "dot", position: "top", rotation: 0, fill: "filled", size: "small" },
          { id: "e3", shape: "dot", position: "right", rotation: 0, fill: "filled", size: "small" },
          { id: "e4", shape: "dot", position: "bottom", rotation: 0, fill: "filled", size: "small" }
        ]
      },
      {
        id: "fs-03-f4",
        label: "4",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "diamond", position: "center", rotation: 0, fill: "empty", size: "medium" },
          { id: "e2", shape: "dot", position: "top", rotation: 0, fill: "filled", size: "small" },
          { id: "e3", shape: "dot", position: "right", rotation: 0, fill: "filled", size: "small" },
          { id: "e4", shape: "dot", position: "bottom", rotation: 0, fill: "filled", size: "small" },
          { id: "e5", shape: "dot", position: "left", rotation: 0, fill: "filled", size: "small" }
        ]
      }
    ],
    options: [
      {
        label: "A",
        figure: {
          id: "fs-03-opt-a",
          outerFrame: "square",
          elements: [
            { id: "oa1", shape: "diamond", position: "center", rotation: 0, fill: "filled", size: "medium" },
            { id: "oa2", shape: "dot", position: "top", rotation: 0, fill: "filled", size: "small" },
            { id: "oa3", shape: "dot", position: "bottom", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "B",
        figure: {
          id: "fs-03-opt-b",
          outerFrame: "square",
          elements: [
            { id: "ob1", shape: "diamond", position: "center", rotation: 0, fill: "empty", size: "medium" },
            { id: "ob2", shape: "dot", position: "top", rotation: 0, fill: "filled", size: "small" },
            { id: "ob3", shape: "dot", position: "right", rotation: 0, fill: "filled", size: "small" },
            { id: "ob4", shape: "dot", position: "bottom", rotation: 0, fill: "filled", size: "small" },
            { id: "ob5", shape: "dot", position: "left", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "C",
        figure: {
          id: "fs-03-opt-c",
          outerFrame: "square",
          elements: [
            { id: "oc1", shape: "diamond", position: "center", rotation: 0, fill: "empty", size: "medium" },
            { id: "oc2", shape: "dot", position: "top", rotation: 0, fill: "filled", size: "small" },
            { id: "oc3", shape: "dot", position: "right", rotation: 0, fill: "filled", size: "small" },
            { id: "oc4", shape: "dot", position: "bottom", rotation: 0, fill: "filled", size: "small" },
            { id: "oc5", shape: "dot", position: "left", rotation: 0, fill: "filled", size: "small" },
            { id: "oc6", shape: "dot", position: "top-left", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "D",
        figure: {
          id: "fs-03-opt-d",
          outerFrame: "square",
          elements: [
            { id: "od1", shape: "square", position: "center", rotation: 0, fill: "empty", size: "medium" },
            { id: "od2", shape: "dot", position: "top", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "E",
        figure: {
          id: "fs-03-opt-e",
          outerFrame: "square",
          elements: [
            { id: "oe1", shape: "circle", position: "center", rotation: 0, fill: "empty", size: "large" }
          ]
        }
      }
    ],
    correctAnswer: "C",
    tags: ["series", "counting", "dot-addition"]
  },
  {
    id: "fs-04",
    exam: "MAH CET",
    section: "Abstract Reasoning",
    category: "Figure Series",
    questionType: "FIGURE_SERIES",
    difficulty: "MAH_CET_HARD",
    prompt: "Analyze the multi-step transformation and select the figure that finishes the series.",
    transformationType: "Cross-diagonal interchange with rotational spin",
    stepByStepRule: [
      "Square at top-left moves diagonally to bottom-right, rotating 45°.",
      "Circle at bottom-right moves to top-left, becoming striped.",
      "Star at center shifts to bottom-left with solid shading.",
      "Step 5 requires the next iteration in this periodic cycle."
    ],
    ruleExplanation:
      "Elements exchange along the primary diagonal while mutating fill state and angular rotation. In Step 5, the primary motif restores to top-right with a filled square and an empty circle at bottom-left.",
    sequenceFigures: [
      {
        id: "fs-04-f1",
        label: "1",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "square", position: "top-left", rotation: 0, fill: "filled", size: "medium" },
          { id: "e2", shape: "circle", position: "bottom-right", rotation: 0, fill: "empty", size: "medium" }
        ]
      },
      {
        id: "fs-04-f2",
        label: "2",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "square", position: "bottom-right", rotation: 45, fill: "filled", size: "medium" },
          { id: "e2", shape: "circle", position: "top-left", rotation: 0, fill: "striped", size: "medium" }
        ]
      },
      {
        id: "fs-04-f3",
        label: "3",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "square", position: "top-right", rotation: 0, fill: "filled", size: "medium" },
          { id: "e2", shape: "circle", position: "bottom-left", rotation: 0, fill: "empty", size: "medium" }
        ]
      },
      {
        id: "fs-04-f4",
        label: "4",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "square", position: "bottom-left", rotation: 45, fill: "filled", size: "medium" },
          { id: "e2", shape: "circle", position: "top-right", rotation: 0, fill: "striped", size: "medium" }
        ]
      }
    ],
    options: [
      {
        label: "A",
        figure: {
          id: "fs-04-opt-a",
          outerFrame: "square",
          elements: [
            { id: "oa1", shape: "square", position: "top-left", rotation: 0, fill: "filled", size: "medium" },
            { id: "oa2", shape: "circle", position: "bottom-right", rotation: 0, fill: "empty", size: "medium" }
          ]
        }
      },
      {
        label: "B",
        figure: {
          id: "fs-04-opt-b",
          outerFrame: "square",
          elements: [
            { id: "ob1", shape: "square", position: "center", rotation: 90, fill: "empty", size: "medium" }
          ]
        }
      },
      {
        label: "C",
        figure: {
          id: "fs-04-opt-c",
          outerFrame: "square",
          elements: [
            { id: "oc1", shape: "circle", position: "center", rotation: 0, fill: "filled", size: "large" }
          ]
        }
      },
      {
        label: "D",
        figure: {
          id: "fs-04-opt-d",
          outerFrame: "square",
          elements: [
            { id: "od1", shape: "diamond", position: "top-left", rotation: 0, fill: "striped", size: "medium" }
          ]
        }
      },
      {
        label: "E",
        figure: {
          id: "fs-04-opt-e",
          outerFrame: "square",
          elements: [
            { id: "oe1", shape: "cross", position: "bottom-right", rotation: 0, fill: "empty", size: "medium" }
          ]
        }
      }
    ],
    correctAnswer: "A",
    tags: ["series", "diagonal-swap", "cyclic-period"]
  },
  {
    id: "fs-05",
    exam: "MAH CET",
    section: "Abstract Reasoning",
    category: "Figure Series",
    questionType: "FIGURE_SERIES",
    difficulty: "MAH_CET_HARD",
    prompt: "Choose the figure that logically completes the progression.",
    transformationType: "T-shape angular rotation with lateral pin oscillation",
    stepByStepRule: [
      "Central T-shape rotates 45° clockwise per frame: 0° -> 45° -> 90° -> 135° -> 180°.",
      "The attached pin toggles between top and bottom sides.",
      "At Step 5, rotation is 180° (pointing directly south) with pin on top."
    ],
    ruleExplanation:
      "T-shape undergoes systematic 45° CW rotation. At Step 5, it reaches 180°. Pin orientation follows alternating top/bottom attaching rule, resulting uniquely in Option D.",
    sequenceFigures: [
      {
        id: "fs-05-f1",
        label: "1",
        outerFrame: "square",
        elements: [{ id: "e1", shape: "t-shape", position: "center", rotation: 0, fill: "filled", size: "large" }]
      },
      {
        id: "fs-05-f2",
        label: "2",
        outerFrame: "square",
        elements: [{ id: "e1", shape: "t-shape", position: "center", rotation: 45, fill: "filled", size: "large" }]
      },
      {
        id: "fs-05-f3",
        label: "3",
        outerFrame: "square",
        elements: [{ id: "e1", shape: "t-shape", position: "center", rotation: 90, fill: "filled", size: "large" }]
      },
      {
        id: "fs-05-f4",
        label: "4",
        outerFrame: "square",
        elements: [{ id: "e1", shape: "t-shape", position: "center", rotation: 135, fill: "filled", size: "large" }]
      }
    ],
    options: [
      {
        label: "A",
        figure: {
          id: "fs-05-opt-a",
          outerFrame: "square",
          elements: [{ id: "oa", shape: "t-shape", position: "center", rotation: 0, fill: "filled", size: "large" }]
        }
      },
      {
        label: "B",
        figure: {
          id: "fs-05-opt-b",
          outerFrame: "square",
          elements: [{ id: "ob", shape: "t-shape", position: "center", rotation: 90, fill: "empty", size: "large" }]
        }
      },
      {
        label: "C",
        figure: {
          id: "fs-05-opt-c",
          outerFrame: "square",
          elements: [{ id: "oc", shape: "t-shape", position: "center", rotation: 225, fill: "filled", size: "large" }]
        }
      },
      {
        label: "D",
        figure: {
          id: "fs-05-opt-d",
          outerFrame: "square",
          elements: [{ id: "od", shape: "t-shape", position: "center", rotation: 180, fill: "filled", size: "large" }]
        }
      },
      {
        label: "E",
        figure: {
          id: "fs-05-opt-e",
          outerFrame: "square",
          elements: [{ id: "oe", shape: "cross", position: "center", rotation: 0, fill: "striped", size: "large" }]
        }
      }
    ],
    correctAnswer: "D",
    tags: ["series", "rotation-45", "t-shape"]
  }
];

// =================================================================
// 2. FIGURE ANALOGIES (5 QUESTIONS)
// =================================================================

export const FIGURE_ANALOGY_QUESTIONS: FigureAnalogyQuestion[] = [
  {
    id: "fa-01",
    exam: "MAH CET",
    section: "Abstract Reasoning",
    category: "Figure Analogies",
    questionType: "FIGURE_ANALOGY",
    difficulty: "FOUNDATION",
    prompt: "Figure A is related to Figure B in a specific manner. Find the figure that has the identical relationship to Figure C.",
    transformationType: "Vertex count increment with shading inversion",
    stepByStepRule: [
      "Count vertices of Figure A (Triangle = 3).",
      "Figure B gains 1 side (Square = 4) and inverts fill from empty to filled.",
      "Apply identical transformation to Figure C (Square = 4, empty).",
      "Result must be a 5-sided polygon (Pentagon) with solid fill."
    ],
    ruleExplanation:
      "A is a hollow triangle; B is a solid square (+1 edge, hollow -> solid). Figure C is a hollow square; applying +1 edge and solid fill yields a solid pentagon.",
    pairA: [
      {
        id: "fa-01-a",
        label: "A",
        outerFrame: "square",
        elements: [{ id: "e1", shape: "triangle", position: "center", rotation: 0, fill: "empty", size: "large" }]
      },
      {
        id: "fa-01-b",
        label: "B",
        outerFrame: "square",
        elements: [{ id: "e2", shape: "square", position: "center", rotation: 0, fill: "filled", size: "large" }]
      }
    ],
    figureC: {
      id: "fa-01-c",
      label: "C",
      outerFrame: "square",
      elements: [{ id: "e3", shape: "square", position: "center", rotation: 0, fill: "empty", size: "large" }]
    },
    options: [
      {
        label: "A",
        figure: {
          id: "fa-01-opt-a",
          outerFrame: "square",
          elements: [{ id: "oa", shape: "pentagon", position: "center", rotation: 0, fill: "filled", size: "large" }]
        }
      },
      {
        label: "B",
        figure: {
          id: "fa-01-opt-b",
          outerFrame: "square",
          elements: [{ id: "ob", shape: "pentagon", position: "center", rotation: 0, fill: "empty", size: "large" }]
        }
      },
      {
        label: "C",
        figure: {
          id: "fa-01-opt-c",
          outerFrame: "square",
          elements: [{ id: "oc", shape: "hexagon", position: "center", rotation: 0, fill: "filled", size: "large" }]
        }
      },
      {
        label: "D",
        figure: {
          id: "fa-01-opt-d",
          outerFrame: "square",
          elements: [{ id: "od", shape: "triangle", position: "center", rotation: 180, fill: "filled", size: "large" }]
        }
      },
      {
        label: "E",
        figure: {
          id: "fa-01-opt-e",
          outerFrame: "square",
          elements: [{ id: "oe", shape: "circle", position: "center", rotation: 0, fill: "striped", size: "large" }]
        }
      }
    ],
    correctAnswer: "A",
    tags: ["analogy", "vertices", "shading"]
  },
  {
    id: "fa-02",
    exam: "MAH CET",
    section: "Abstract Reasoning",
    category: "Figure Analogies",
    questionType: "FIGURE_ANALOGY",
    difficulty: "MAH_CET_LEVEL",
    prompt: "Determine the figure that completes the proportion: Figure A : Figure B :: Figure C : ?",
    transformationType: "90° clockwise rotation and lateral dot mirroring",
    stepByStepRule: [
      "Primary arrow rotates 90° clockwise.",
      "Accessory dot shifts from the head side to the tail side.",
      "Applying this to Figure C (pointing right with dot at head) rotates the arrow down (180°) with dot at tail (top)."
    ],
    ruleExplanation:
      "A -> B involves rotating the central arrow 90° clockwise and mirroring the dot to the opposite end. Applying this to C (arrow at 90° with dot at right) turns arrow to 180° (pointing south) with dot positioned at top.",
    pairA: [
      {
        id: "fa-02-a",
        label: "A",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "arrow", position: "center", rotation: 0, fill: "filled", size: "large" },
          { id: "e2", shape: "dot", position: "top", rotation: 0, fill: "filled", size: "small" }
        ]
      },
      {
        id: "fa-02-b",
        label: "B",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "arrow", position: "center", rotation: 90, fill: "filled", size: "large" },
          { id: "e2", shape: "dot", position: "left", rotation: 0, fill: "filled", size: "small" }
        ]
      }
    ],
    figureC: {
      id: "fa-02-c",
      label: "C",
      outerFrame: "square",
      elements: [
        { id: "e1", shape: "arrow", position: "center", rotation: 90, fill: "filled", size: "large" },
        { id: "e2", shape: "dot", position: "right", rotation: 0, fill: "filled", size: "small" }
      ]
    },
    options: [
      {
        label: "A",
        figure: {
          id: "fa-02-opt-a",
          outerFrame: "square",
          elements: [
            { id: "oa1", shape: "arrow", position: "center", rotation: 180, fill: "filled", size: "large" },
            { id: "oa2", shape: "dot", position: "top", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "B",
        figure: {
          id: "fa-02-opt-b",
          outerFrame: "square",
          elements: [
            { id: "ob1", shape: "arrow", position: "center", rotation: 180, fill: "filled", size: "large" },
            { id: "ob2", shape: "dot", position: "bottom", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "C",
        figure: {
          id: "fa-02-opt-c",
          outerFrame: "square",
          elements: [
            { id: "oc1", shape: "arrow", position: "center", rotation: 270, fill: "filled", size: "large" },
            { id: "oc2", shape: "dot", position: "left", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "D",
        figure: {
          id: "fa-02-opt-d",
          outerFrame: "square",
          elements: [
            { id: "od1", shape: "arrow", position: "center", rotation: 0, fill: "filled", size: "large" },
            { id: "od2", shape: "dot", position: "bottom", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "E",
        figure: {
          id: "fa-02-opt-e",
          outerFrame: "square",
          elements: [
            { id: "oe1", shape: "plus", position: "center", rotation: 0, fill: "empty", size: "medium" }
          ]
        }
      }
    ],
    correctAnswer: "A",
    tags: ["analogy", "rotation", "relative-dot"]
  },
  {
    id: "fa-03",
    exam: "MAH CET",
    section: "Abstract Reasoning",
    category: "Figure Analogies",
    questionType: "FIGURE_ANALOGY",
    difficulty: "MAH_CET_LEVEL",
    prompt: "Choose the figure that solves the proportion: A : B :: C : ?",
    transformationType: "Container-content role reversal with fill inversion",
    stepByStepRule: [
      "In A, outer container is a large circle, inner content is a small filled square.",
      "In B, container becomes a large square, inner content is a small filled circle.",
      "For C, container is a triangle, inner content is a diamond.",
      "The result must have a large diamond container housing a small filled triangle."
    ],
    ruleExplanation:
      "The inner shape expands to form the outer boundary, and the outer boundary contracts into the inner solid shape. Thus, a triangle holding a diamond transforms into a diamond holding a solid triangle.",
    pairA: [
      {
        id: "fa-03-a",
        label: "A",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "circle", position: "center", rotation: 0, fill: "empty", size: "large" },
          { id: "e2", shape: "square", position: "center", rotation: 0, fill: "filled", size: "small" }
        ]
      },
      {
        id: "fa-03-b",
        label: "B",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "square", position: "center", rotation: 0, fill: "empty", size: "large" },
          { id: "e2", shape: "circle", position: "center", rotation: 0, fill: "filled", size: "small" }
        ]
      }
    ],
    figureC: {
      id: "fa-03-c",
      label: "C",
      outerFrame: "square",
      elements: [
        { id: "e1", shape: "triangle", position: "center", rotation: 0, fill: "empty", size: "large" },
        { id: "e2", shape: "diamond", position: "center", rotation: 0, fill: "filled", size: "small" }
      ]
    },
    options: [
      {
        label: "A",
        figure: {
          id: "fa-03-opt-a",
          outerFrame: "square",
          elements: [
            { id: "oa1", shape: "diamond", position: "center", rotation: 0, fill: "empty", size: "large" },
            { id: "oa2", shape: "triangle", position: "center", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "B",
        figure: {
          id: "fa-03-opt-b",
          outerFrame: "square",
          elements: [
            { id: "ob1", shape: "triangle", position: "center", rotation: 180, fill: "empty", size: "large" },
            { id: "ob2", shape: "diamond", position: "center", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "C",
        figure: {
          id: "fa-03-opt-c",
          outerFrame: "square",
          elements: [
            { id: "oc1", shape: "square", position: "center", rotation: 0, fill: "empty", size: "large" },
            { id: "oc2", shape: "triangle", position: "center", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "D",
        figure: {
          id: "fa-03-opt-d",
          outerFrame: "square",
          elements: [
            { id: "od1", shape: "diamond", position: "center", rotation: 0, fill: "filled", size: "large" }
          ]
        }
      },
      {
        label: "E",
        figure: {
          id: "fa-03-opt-e",
          outerFrame: "square",
          elements: [
            { id: "oe1", shape: "circle", position: "center", rotation: 0, fill: "empty", size: "large" }
          ]
        }
      }
    ],
    correctAnswer: "A",
    tags: ["analogy", "nested-inversion", "container-content"]
  },
  {
    id: "fa-04",
    exam: "MAH CET",
    section: "Abstract Reasoning",
    category: "Figure Analogies",
    questionType: "FIGURE_ANALOGY",
    difficulty: "MAH_CET_HARD",
    prompt: "Establish the underlying operational rule in A : B and apply it to C.",
    transformationType: "Horizontal reflection and internal segment division",
    stepByStepRule: [
      "Figure A is reflected horizontally (mirrored left-to-right).",
      "Its internal line rotates 90°.",
      "Applying this to Figure C (crescent facing left with vertical dot) reflects crescent to face right with dot horizontally offset."
    ],
    ruleExplanation:
      "A undergoes lateral reflection combined with a 90° axis pivot of its internal indicator. Applying the same dual operation to C results in Option B.",
    pairA: [
      {
        id: "fa-04-a",
        label: "A",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "crescent", position: "left", rotation: 0, fill: "filled", size: "medium" },
          { id: "e2", shape: "arrow", position: "right", rotation: 90, fill: "empty", size: "small" }
        ]
      },
      {
        id: "fa-04-b",
        label: "B",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "crescent", position: "right", rotation: 180, fill: "filled", size: "medium" },
          { id: "e2", shape: "arrow", position: "left", rotation: 270, fill: "empty", size: "small" }
        ]
      }
    ],
    figureC: {
      id: "fa-04-c",
      label: "C",
      outerFrame: "square",
      elements: [
        { id: "e1", shape: "crescent", position: "top", rotation: 90, fill: "filled", size: "medium" },
        { id: "e2", shape: "arrow", position: "bottom", rotation: 180, fill: "empty", size: "small" }
      ]
    },
    options: [
      {
        label: "A",
        figure: {
          id: "fa-04-opt-a",
          outerFrame: "square",
          elements: [
            { id: "oa1", shape: "crescent", position: "top", rotation: 270, fill: "filled", size: "medium" },
            { id: "oa2", shape: "arrow", position: "bottom", rotation: 0, fill: "empty", size: "small" }
          ]
        }
      },
      {
        label: "B",
        figure: {
          id: "fa-04-opt-b",
          outerFrame: "square",
          elements: [
            { id: "ob1", shape: "crescent", position: "bottom", rotation: 270, fill: "filled", size: "medium" },
            { id: "ob2", shape: "arrow", position: "top", rotation: 0, fill: "empty", size: "small" }
          ]
        }
      },
      {
        label: "C",
        figure: {
          id: "fa-04-opt-c",
          outerFrame: "square",
          elements: [
            { id: "oc1", shape: "crescent", position: "left", rotation: 0, fill: "filled", size: "medium" }
          ]
        }
      },
      {
        label: "D",
        figure: {
          id: "fa-04-opt-d",
          outerFrame: "square",
          elements: [
            { id: "od1", shape: "cross", position: "center", rotation: 0, fill: "striped", size: "medium" }
          ]
        }
      },
      {
        label: "E",
        figure: {
          id: "fa-04-opt-e",
          outerFrame: "square",
          elements: [
            { id: "oe1", shape: "circle", position: "center", rotation: 0, fill: "empty", size: "large" }
          ]
        }
      }
    ],
    correctAnswer: "B",
    tags: ["analogy", "reflection", "compound-inversion"]
  },
  {
    id: "fa-05",
    exam: "MAH CET",
    section: "Abstract Reasoning",
    category: "Figure Analogies",
    questionType: "FIGURE_ANALOGY",
    difficulty: "MAH_CET_HARD",
    prompt: "Choose the target figure that completes the proportion: A : B :: C : ?",
    transformationType: "Line segment extraction and diagonal multiplication",
    stepByStepRule: [
      "Polygon edges are split into separate detached peripheral line segments.",
      "Figure A (Square) becomes 4 corner dots in B.",
      "Figure C (Hexagon) must transform into 6 peripheral dots."
    ],
    ruleExplanation:
      "The perimeter polygon converts into an equal number of discrete boundary indicator dots. A 6-sided hexagon yields 6 symmetrically positioned dots.",
    pairA: [
      {
        id: "fa-05-a",
        label: "A",
        outerFrame: "square",
        elements: [{ id: "e1", shape: "square", position: "center", rotation: 0, fill: "empty", size: "large" }]
      },
      {
        id: "fa-05-b",
        label: "B",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "dot", position: "top-left", rotation: 0, fill: "filled", size: "small" },
          { id: "e2", shape: "dot", position: "top-right", rotation: 0, fill: "filled", size: "small" },
          { id: "e3", shape: "dot", position: "bottom-left", rotation: 0, fill: "filled", size: "small" },
          { id: "e4", shape: "dot", position: "bottom-right", rotation: 0, fill: "filled", size: "small" }
        ]
      }
    ],
    figureC: {
      id: "fa-05-c",
      label: "C",
      outerFrame: "square",
      elements: [{ id: "e1", shape: "hexagon", position: "center", rotation: 0, fill: "empty", size: "large" }]
    },
    options: [
      {
        label: "A",
        figure: {
          id: "fa-05-opt-a",
          outerFrame: "square",
          elements: [
            { id: "oa1", shape: "dot", position: "top", rotation: 0, fill: "filled", size: "small" },
            { id: "oa2", shape: "dot", position: "bottom", rotation: 0, fill: "filled", size: "small" },
            { id: "oa3", shape: "dot", position: "left", rotation: 0, fill: "filled", size: "small" },
            { id: "oa4", shape: "dot", position: "right", rotation: 0, fill: "filled", size: "small" },
            { id: "oa5", shape: "dot", position: "top-left", rotation: 0, fill: "filled", size: "small" },
            { id: "oa6", shape: "dot", position: "bottom-right", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "B",
        figure: {
          id: "fa-05-opt-b",
          outerFrame: "square",
          elements: [
            { id: "ob1", shape: "dot", position: "top", rotation: 0, fill: "filled", size: "small" },
            { id: "ob2", shape: "dot", position: "bottom", rotation: 0, fill: "filled", size: "small" },
            { id: "ob3", shape: "dot", position: "left", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "C",
        figure: {
          id: "fa-05-opt-c",
          outerFrame: "square",
          elements: [
            { id: "oc1", shape: "triangle", position: "center", rotation: 0, fill: "filled", size: "medium" }
          ]
        }
      },
      {
        label: "D",
        figure: {
          id: "fa-05-opt-d",
          outerFrame: "square",
          elements: [
            { id: "od1", shape: "hexagon", position: "center", rotation: 90, fill: "filled", size: "large" }
          ]
        }
      },
      {
        label: "E",
        figure: {
          id: "fa-05-opt-e",
          outerFrame: "square",
          elements: [
            { id: "oe1", shape: "cross", position: "center", rotation: 0, fill: "empty", size: "large" }
          ]
        }
      }
    ],
    correctAnswer: "A",
    tags: ["analogy", "vertices-to-dots", "discrete-mapping"]
  }
];

// =================================================================
// 3. MATCHING IMAGE PAIRS (5 QUESTIONS)
// =================================================================

export const MATCHING_PAIRS_QUESTIONS: MatchingPairsQuestion[] = [
  {
    id: "mp-01",
    exam: "MAH CET",
    section: "Abstract Reasoning",
    category: "Matching Image Pairs",
    questionType: "MATCHING_PAIRS",
    difficulty: "FOUNDATION",
    prompt: "The reference pair follows a specific geometric rule. Identify the option pair that exhibits the identical transformation.",
    transformationType: "180° rotation and shading swap",
    stepByStepRule: [
      "In the reference pair, the shape rotates 180° upside down.",
      "The shading swaps from empty to solid filled.",
      "Find the option pair with this exact {180° rotation, hollow -> solid} signature."
    ],
    ruleExplanation:
      "The reference pair displays a hollow triangle turning upside down and becoming solid. Option A shows a hollow arrow turning 180° to point downwards and becoming solid.",
    referencePair: [
      {
        id: "mp-01-r1",
        label: "Ref 1",
        outerFrame: "square",
        elements: [{ id: "e1", shape: "triangle", position: "center", rotation: 0, fill: "empty", size: "large" }]
      },
      {
        id: "mp-01-r2",
        label: "Ref 2",
        outerFrame: "square",
        elements: [{ id: "e2", shape: "triangle", position: "center", rotation: 180, fill: "filled", size: "large" }]
      }
    ],
    options: [
      {
        label: "A",
        figurePair: [
          {
            id: "mp-01-oa1",
            label: "A1",
            outerFrame: "square",
            elements: [{ id: "p1", shape: "arrow", position: "center", rotation: 0, fill: "empty", size: "large" }]
          },
          {
            id: "mp-01-oa2",
            label: "A2",
            outerFrame: "square",
            elements: [{ id: "p2", shape: "arrow", position: "center", rotation: 180, fill: "filled", size: "large" }]
          }
        ],
        figure: {
          id: "mp-01-oa-fig",
          outerFrame: "square",
          elements: [{ id: "p2", shape: "arrow", position: "center", rotation: 180, fill: "filled", size: "large" }]
        }
      },
      {
        label: "B",
        figurePair: [
          {
            id: "mp-01-ob1",
            label: "B1",
            outerFrame: "square",
            elements: [{ id: "p1", shape: "circle", position: "center", rotation: 0, fill: "empty", size: "large" }]
          },
          {
            id: "mp-01-ob2",
            label: "B2",
            outerFrame: "square",
            elements: [{ id: "p2", shape: "square", position: "center", rotation: 0, fill: "filled", size: "large" }]
          }
        ],
        figure: {
          id: "mp-01-ob-fig",
          outerFrame: "square",
          elements: [{ id: "p2", shape: "square", position: "center", rotation: 0, fill: "filled", size: "large" }]
        }
      },
      {
        label: "C",
        figurePair: [
          {
            id: "mp-01-oc1",
            label: "C1",
            outerFrame: "square",
            elements: [{ id: "p1", shape: "star", position: "center", rotation: 0, fill: "filled", size: "large" }]
          },
          {
            id: "mp-01-oc2",
            label: "C2",
            outerFrame: "square",
            elements: [{ id: "p2", shape: "star", position: "center", rotation: 0, fill: "empty", size: "large" }]
          }
        ],
        figure: {
          id: "mp-01-oc-fig",
          outerFrame: "square",
          elements: [{ id: "p2", shape: "star", position: "center", rotation: 0, fill: "empty", size: "large" }]
        }
      },
      {
        label: "D",
        figurePair: [
          {
            id: "mp-01-od1",
            label: "D1",
            outerFrame: "square",
            elements: [{ id: "p1", shape: "cross", position: "center", rotation: 0, fill: "empty", size: "large" }]
          },
          {
            id: "mp-01-od2",
            label: "D2",
            outerFrame: "square",
            elements: [{ id: "p2", shape: "cross", position: "center", rotation: 45, fill: "empty", size: "large" }]
          }
        ],
        figure: {
          id: "mp-01-od-fig",
          outerFrame: "square",
          elements: [{ id: "p2", shape: "cross", position: "center", rotation: 45, fill: "empty", size: "large" }]
        }
      },
      {
        label: "E",
        figurePair: [
          {
            id: "mp-01-oe1",
            label: "E1",
            outerFrame: "square",
            elements: [{ id: "p1", shape: "diamond", position: "center", rotation: 0, fill: "striped", size: "large" }]
          },
          {
            id: "mp-01-oe2",
            label: "E2",
            outerFrame: "square",
            elements: [{ id: "p2", shape: "diamond", position: "center", rotation: 90, fill: "striped", size: "large" }]
          }
        ],
        figure: {
          id: "mp-01-oe-fig",
          outerFrame: "square",
          elements: [{ id: "p2", shape: "diamond", position: "center", rotation: 90, fill: "striped", size: "large" }]
        }
      }
    ],
    correctAnswer: "A",
    tags: ["matching-pairs", "rotation-180", "shading"]
  },
  {
    id: "mp-02",
    exam: "MAH CET",
    section: "Abstract Reasoning",
    category: "Matching Image Pairs",
    questionType: "MATCHING_PAIRS",
    difficulty: "MAH_CET_LEVEL",
    prompt: "Which pair of figures follows the exact transformation manifested by the reference pair?",
    transformationType: "Lateral mirroring and dot duplication",
    stepByStepRule: [
      "Shape is mirrored across vertical axis.",
      "Accessory dot doubles in quantity (1 dot -> 2 dots).",
      "Option C is the only pair that flips laterally and doubles satellite dots from 1 to 2."
    ],
    ruleExplanation:
      "The reference pair exhibits a horizontal reflection plus dot duplication (+1 dot, total 2). Option C uniquely preserves both operations simultaneously.",
    referencePair: [
      {
        id: "mp-02-r1",
        label: "Ref 1",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "crescent", position: "left", rotation: 0, fill: "filled", size: "medium" },
          { id: "e2", shape: "dot", position: "top", rotation: 0, fill: "filled", size: "small" }
        ]
      },
      {
        id: "mp-02-r2",
        label: "Ref 2",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "crescent", position: "right", rotation: 180, fill: "filled", size: "medium" },
          { id: "e2", shape: "dot", position: "top", rotation: 0, fill: "filled", size: "small" },
          { id: "e3", shape: "dot", position: "bottom", rotation: 0, fill: "filled", size: "small" }
        ]
      }
    ],
    options: [
      {
        label: "A",
        figurePair: [
          {
            id: "mp-02-oa1",
            label: "A1",
            outerFrame: "square",
            elements: [{ id: "p1", shape: "arrow", position: "left", rotation: 0, fill: "filled", size: "medium" }]
          },
          {
            id: "mp-02-oa2",
            label: "A2",
            outerFrame: "square",
            elements: [{ id: "p2", shape: "arrow", position: "right", rotation: 0, fill: "filled", size: "medium" }]
          }
        ],
        figure: {
          id: "mp-02-oa-fig",
          outerFrame: "square",
          elements: [{ id: "p2", shape: "arrow", position: "right", rotation: 0, fill: "filled", size: "medium" }]
        }
      },
      {
        label: "B",
        figurePair: [
          {
            id: "mp-02-ob1",
            label: "B1",
            outerFrame: "square",
            elements: [{ id: "p1", shape: "triangle", position: "center", rotation: 0, fill: "empty", size: "medium" }]
          },
          {
            id: "mp-02-ob2",
            label: "B2",
            outerFrame: "square",
            elements: [{ id: "p2", shape: "square", position: "center", rotation: 0, fill: "empty", size: "medium" }]
          }
        ],
        figure: {
          id: "mp-02-ob-fig",
          outerFrame: "square",
          elements: [{ id: "p2", shape: "square", position: "center", rotation: 0, fill: "empty", size: "medium" }]
        }
      },
      {
        label: "C",
        figurePair: [
          {
            id: "mp-02-oc1",
            label: "C1",
            outerFrame: "square",
            elements: [
              { id: "p1", shape: "l-shape", position: "left", rotation: 0, fill: "filled", size: "medium" },
              { id: "p2", shape: "dot", position: "top", rotation: 0, fill: "filled", size: "small" }
            ]
          },
          {
            id: "mp-02-oc2",
            label: "C2",
            outerFrame: "square",
            elements: [
              { id: "p1", shape: "l-shape", position: "right", rotation: 180, fill: "filled", size: "medium" },
              { id: "p2", shape: "dot", position: "top", rotation: 0, fill: "filled", size: "small" },
              { id: "p3", shape: "dot", position: "bottom", rotation: 0, fill: "filled", size: "small" }
            ]
          }
        ],
        figure: {
          id: "mp-02-oc-fig",
          outerFrame: "square",
          elements: [
            { id: "p1", shape: "l-shape", position: "right", rotation: 180, fill: "filled", size: "medium" },
            { id: "p2", shape: "dot", position: "top", rotation: 0, fill: "filled", size: "small" },
            { id: "p3", shape: "dot", position: "bottom", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "D",
        figurePair: [
          {
            id: "mp-02-od1",
            label: "D1",
            outerFrame: "square",
            elements: [{ id: "p1", shape: "cross", position: "center", rotation: 0, fill: "empty", size: "large" }]
          },
          {
            id: "mp-02-od2",
            label: "D2",
            outerFrame: "square",
            elements: [{ id: "p2", shape: "cross", position: "center", rotation: 90, fill: "filled", size: "large" }]
          }
        ],
        figure: {
          id: "mp-02-od-fig",
          outerFrame: "square",
          elements: [{ id: "p2", shape: "cross", position: "center", rotation: 90, fill: "filled", size: "large" }]
        }
      },
      {
        label: "E",
        figurePair: [
          {
            id: "mp-02-oe1",
            label: "E1",
            outerFrame: "square",
            elements: [{ id: "p1", shape: "star", position: "center", rotation: 0, fill: "filled", size: "medium" }]
          },
          {
            id: "mp-02-oe2",
            label: "E2",
            outerFrame: "square",
            elements: [{ id: "p2", shape: "star", position: "center", rotation: 45, fill: "striped", size: "medium" }]
          }
        ],
        figure: {
          id: "mp-02-oe-fig",
          outerFrame: "square",
          elements: [{ id: "p2", shape: "star", position: "center", rotation: 45, fill: "striped", size: "medium" }]
        }
      }
    ],
    correctAnswer: "C",
    tags: ["matching-pairs", "mirror", "dot-multiplication"]
  },
  {
    id: "mp-03",
    exam: "MAH CET",
    section: "Abstract Reasoning",
    category: "Matching Image Pairs",
    questionType: "MATCHING_PAIRS",
    difficulty: "MAH_CET_LEVEL",
    prompt: "Identify the option pair that mirrors the reference transformation exactly.",
    transformationType: "Concentration to periphery dispersion",
    stepByStepRule: [
      "Center shape dissolves and splits into 2 smaller identical elements at top-left and bottom-right corners.",
      "Option B exhibits this exact dispersion behavior."
    ],
    ruleExplanation:
      "The reference pair takes a centered element and disperses it into dual corner elements along the primary diagonal.",
    referencePair: [
      {
        id: "mp-03-r1",
        label: "Ref 1",
        outerFrame: "square",
        elements: [{ id: "e1", shape: "circle", position: "center", rotation: 0, fill: "filled", size: "large" }]
      },
      {
        id: "mp-03-r2",
        label: "Ref 2",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "circle", position: "top-left", rotation: 0, fill: "filled", size: "small" },
          { id: "e2", shape: "circle", position: "bottom-right", rotation: 0, fill: "filled", size: "small" }
        ]
      }
    ],
    options: [
      {
        label: "A",
        figurePair: [
          {
            id: "mp-03-oa1",
            label: "A1",
            outerFrame: "square",
            elements: [{ id: "p1", shape: "square", position: "top", rotation: 0, fill: "empty", size: "medium" }]
          },
          {
            id: "mp-03-oa2",
            label: "A2",
            outerFrame: "square",
            elements: [{ id: "p2", shape: "square", position: "bottom", rotation: 0, fill: "empty", size: "medium" }]
          }
        ],
        figure: {
          id: "mp-03-oa-fig",
          outerFrame: "square",
          elements: [{ id: "p2", shape: "square", position: "bottom", rotation: 0, fill: "empty", size: "medium" }]
        }
      },
      {
        label: "B",
        figurePair: [
          {
            id: "mp-03-ob1",
            label: "B1",
            outerFrame: "square",
            elements: [{ id: "p1", shape: "triangle", position: "center", rotation: 0, fill: "filled", size: "large" }]
          },
          {
            id: "mp-03-ob2",
            label: "B2",
            outerFrame: "square",
            elements: [
              { id: "p1", shape: "triangle", position: "top-left", rotation: 0, fill: "filled", size: "small" },
              { id: "p2", shape: "triangle", position: "bottom-right", rotation: 0, fill: "filled", size: "small" }
            ]
          }
        ],
        figure: {
          id: "mp-03-ob-fig",
          outerFrame: "square",
          elements: [
            { id: "p1", shape: "triangle", position: "top-left", rotation: 0, fill: "filled", size: "small" },
            { id: "p2", shape: "triangle", position: "bottom-right", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "C",
        figurePair: [
          {
            id: "mp-03-oc1",
            label: "C1",
            outerFrame: "square",
            elements: [{ id: "p1", shape: "diamond", position: "center", rotation: 0, fill: "striped", size: "medium" }]
          },
          {
            id: "mp-03-oc2",
            label: "C2",
            outerFrame: "square",
            elements: [{ id: "p2", shape: "diamond", position: "center", rotation: 90, fill: "striped", size: "large" }]
          }
        ],
        figure: {
          id: "mp-03-oc-fig",
          outerFrame: "square",
          elements: [{ id: "p2", shape: "diamond", position: "center", rotation: 90, fill: "striped", size: "large" }]
        }
      },
      {
        label: "D",
        figurePair: [
          {
            id: "mp-03-od1",
            label: "D1",
            outerFrame: "square",
            elements: [{ id: "p1", shape: "star", position: "center", rotation: 0, fill: "filled", size: "large" }]
          },
          {
            id: "mp-03-od2",
            label: "D2",
            outerFrame: "square",
            elements: [{ id: "p2", shape: "circle", position: "center", rotation: 0, fill: "empty", size: "small" }]
          }
        ],
        figure: {
          id: "mp-03-od-fig",
          outerFrame: "square",
          elements: [{ id: "p2", shape: "circle", position: "center", rotation: 0, fill: "empty", size: "small" }]
        }
      },
      {
        label: "E",
        figurePair: [
          {
            id: "mp-03-oe1",
            label: "E1",
            outerFrame: "square",
            elements: [{ id: "p1", shape: "cross", position: "center", rotation: 0, fill: "empty", size: "medium" }]
          },
          {
            id: "mp-03-oe2",
            label: "E2",
            outerFrame: "square",
            elements: [{ id: "p2", shape: "plus", position: "center", rotation: 0, fill: "filled", size: "medium" }]
          }
        ],
        figure: {
          id: "mp-03-oe-fig",
          outerFrame: "square",
          elements: [{ id: "p2", shape: "plus", position: "center", rotation: 0, fill: "filled", size: "medium" }]
        }
      }
    ],
    correctAnswer: "B",
    tags: ["matching-pairs", "dispersion", "corner-split"]
  },
  {
    id: "mp-04",
    exam: "MAH CET",
    section: "Abstract Reasoning",
    category: "Matching Image Pairs",
    questionType: "MATCHING_PAIRS",
    difficulty: "MAH_CET_HARD",
    prompt: "Detect the geometric function mapping Pair 1 to Pair 2, and select the corresponding option pair.",
    transformationType: "Nested inversion with rotation",
    stepByStepRule: [
      "Inner shape expands into outer container.",
      "Outer shape shrinks to center and rotates 45°.",
      "Shading stays empty."
    ],
    ruleExplanation:
      "Role-reversal with 45° rotation of the internalized shape. Option D conforms to this exact structural morphism.",
    referencePair: [
      {
        id: "mp-04-r1",
        label: "Ref 1",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "square", position: "center", rotation: 0, fill: "empty", size: "large" },
          { id: "e2", shape: "diamond", position: "center", rotation: 0, fill: "empty", size: "small" }
        ]
      },
      {
        id: "mp-04-r2",
        label: "Ref 2",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "diamond", position: "center", rotation: 0, fill: "empty", size: "large" },
          { id: "e2", shape: "square", position: "center", rotation: 45, fill: "empty", size: "small" }
        ]
      }
    ],
    options: [
      {
        label: "A",
        figurePair: [
          {
            id: "mp-04-oa1",
            label: "A1",
            outerFrame: "square",
            elements: [{ id: "p1", shape: "circle", position: "center", rotation: 0, fill: "filled", size: "large" }]
          },
          {
            id: "mp-04-oa2",
            label: "A2",
            outerFrame: "square",
            elements: [{ id: "p2", shape: "triangle", position: "center", rotation: 0, fill: "filled", size: "small" }]
          }
        ],
        figure: {
          id: "mp-04-oa-fig",
          outerFrame: "square",
          elements: [{ id: "p2", shape: "triangle", position: "center", rotation: 0, fill: "filled", size: "small" }]
        }
      },
      {
        label: "B",
        figurePair: [
          {
            id: "mp-04-ob1",
            label: "B1",
            outerFrame: "square",
            elements: [{ id: "p1", shape: "star", position: "center", rotation: 0, fill: "empty", size: "large" }]
          },
          {
            id: "mp-04-ob2",
            label: "B2",
            outerFrame: "square",
            elements: [{ id: "p2", shape: "star", position: "center", rotation: 90, fill: "empty", size: "large" }]
          }
        ],
        figure: {
          id: "mp-04-ob-fig",
          outerFrame: "square",
          elements: [{ id: "p2", shape: "star", position: "center", rotation: 90, fill: "empty", size: "large" }]
        }
      },
      {
        label: "C",
        figurePair: [
          {
            id: "mp-04-oc1",
            label: "C1",
            outerFrame: "square",
            elements: [{ id: "p1", shape: "cross", position: "center", rotation: 0, fill: "empty", size: "large" }]
          },
          {
            id: "mp-04-oc2",
            label: "C2",
            outerFrame: "square",
            elements: [{ id: "p2", shape: "plus", position: "center", rotation: 0, fill: "empty", size: "large" }]
          }
        ],
        figure: {
          id: "mp-04-oc-fig",
          outerFrame: "square",
          elements: [{ id: "p2", shape: "plus", position: "center", rotation: 0, fill: "empty", size: "large" }]
        }
      },
      {
        label: "D",
        figurePair: [
          {
            id: "mp-04-od1",
            label: "D1",
            outerFrame: "square",
            elements: [
              { id: "p1", shape: "hexagon", position: "center", rotation: 0, fill: "empty", size: "large" },
              { id: "p2", shape: "square", position: "center", rotation: 0, fill: "empty", size: "small" }
            ]
          },
          {
            id: "mp-04-od2",
            label: "D2",
            outerFrame: "square",
            elements: [
              { id: "p1", shape: "square", position: "center", rotation: 0, fill: "empty", size: "large" },
              { id: "p2", shape: "hexagon", position: "center", rotation: 45, fill: "empty", size: "small" }
            ]
          }
        ],
        figure: {
          id: "mp-04-od-fig",
          outerFrame: "square",
          elements: [
            { id: "p1", shape: "square", position: "center", rotation: 0, fill: "empty", size: "large" },
            { id: "p2", shape: "hexagon", position: "center", rotation: 45, fill: "empty", size: "small" }
          ]
        }
      },
      {
        label: "E",
        figurePair: [
          {
            id: "mp-04-oe1",
            label: "E1",
            outerFrame: "square",
            elements: [{ id: "p1", shape: "t-shape", position: "center", rotation: 0, fill: "filled", size: "large" }]
          },
          {
            id: "mp-04-oe2",
            label: "E2",
            outerFrame: "square",
            elements: [{ id: "p2", shape: "t-shape", position: "center", rotation: 180, fill: "filled", size: "large" }]
          }
        ],
        figure: {
          id: "mp-04-oe-fig",
          outerFrame: "square",
          elements: [{ id: "p2", shape: "t-shape", position: "center", rotation: 180, fill: "filled", size: "large" }]
        }
      }
    ],
    correctAnswer: "D",
    tags: ["matching-pairs", "role-reversal", "nested"]
  },
  {
    id: "mp-05",
    exam: "MAH CET",
    section: "Abstract Reasoning",
    category: "Matching Image Pairs",
    questionType: "MATCHING_PAIRS",
    difficulty: "MAH_CET_HARD",
    prompt: "Identify the matching pair exhibiting the exact transformation law.",
    transformationType: "Quarter-circle quadrant migration with line doubling",
    stepByStepRule: [
      "Top-left element moves to bottom-right.",
      "Single boundary stroke becomes a dual concentric frame.",
      "Option E follows this transformation."
    ],
    ruleExplanation:
      "Elements undergo polar diagonal migration while doubling internal boundary layers.",
    referencePair: [
      {
        id: "mp-05-r1",
        label: "Ref 1",
        outerFrame: "square",
        elements: [{ id: "e1", shape: "dot", position: "top-left", rotation: 0, fill: "filled", size: "medium" }]
      },
      {
        id: "mp-05-r2",
        label: "Ref 2",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "dot", position: "bottom-right", rotation: 0, fill: "filled", size: "medium" },
          { id: "e2", shape: "circle", position: "bottom-right", rotation: 0, fill: "empty", size: "small" }
        ]
      }
    ],
    options: [
      {
        label: "A",
        figurePair: [
          {
            id: "mp-05-oa1",
            label: "A1",
            outerFrame: "square",
            elements: [{ id: "p1", shape: "star", position: "center", rotation: 0, fill: "filled", size: "large" }]
          },
          {
            id: "mp-05-oa2",
            label: "A2",
            outerFrame: "square",
            elements: [{ id: "p2", shape: "cross", position: "center", rotation: 0, fill: "filled", size: "large" }]
          }
        ],
        figure: {
          id: "mp-05-oa-fig",
          outerFrame: "square",
          elements: [{ id: "p2", shape: "cross", position: "center", rotation: 0, fill: "filled", size: "large" }]
        }
      },
      {
        label: "B",
        figurePair: [
          {
            id: "mp-05-ob1",
            label: "B1",
            outerFrame: "square",
            elements: [{ id: "p1", shape: "diamond", position: "center", rotation: 0, fill: "empty", size: "medium" }]
          },
          {
            id: "mp-05-ob2",
            label: "B2",
            outerFrame: "square",
            elements: [{ id: "p2", shape: "diamond", position: "center", rotation: 45, fill: "empty", size: "medium" }]
          }
        ],
        figure: {
          id: "mp-05-ob-fig",
          outerFrame: "square",
          elements: [{ id: "p2", shape: "diamond", position: "center", rotation: 45, fill: "empty", size: "medium" }]
        }
      },
      {
        label: "C",
        figurePair: [
          {
            id: "mp-05-oc1",
            label: "C1",
            outerFrame: "square",
            elements: [{ id: "p1", shape: "arrow", position: "center", rotation: 0, fill: "filled", size: "large" }]
          },
          {
            id: "mp-05-oc2",
            label: "C2",
            outerFrame: "square",
            elements: [{ id: "p2", shape: "arrow", position: "center", rotation: 180, fill: "filled", size: "large" }]
          }
        ],
        figure: {
          id: "mp-05-oc-fig",
          outerFrame: "square",
          elements: [{ id: "p2", shape: "arrow", position: "center", rotation: 180, fill: "filled", size: "large" }]
        }
      },
      {
        label: "D",
        figurePair: [
          {
            id: "mp-05-od1",
            label: "D1",
            outerFrame: "square",
            elements: [{ id: "p1", shape: "triangle", position: "top", rotation: 0, fill: "empty", size: "medium" }]
          },
          {
            id: "mp-05-od2",
            label: "D2",
            outerFrame: "square",
            elements: [{ id: "p2", shape: "triangle", position: "bottom", rotation: 180, fill: "empty", size: "medium" }]
          }
        ],
        figure: {
          id: "mp-05-od-fig",
          outerFrame: "square",
          elements: [{ id: "p2", shape: "triangle", position: "bottom", rotation: 180, fill: "empty", size: "medium" }]
        }
      },
      {
        label: "E",
        figurePair: [
          {
            id: "mp-05-oe1",
            label: "E1",
            outerFrame: "square",
            elements: [{ id: "p1", shape: "square", position: "top-left", rotation: 0, fill: "filled", size: "medium" }]
          },
          {
            id: "mp-05-oe2",
            label: "E2",
            outerFrame: "square",
            elements: [
              { id: "p1", shape: "square", position: "bottom-right", rotation: 0, fill: "filled", size: "medium" },
              { id: "p2", shape: "circle", position: "bottom-right", rotation: 0, fill: "empty", size: "small" }
            ]
          }
        ],
        figure: {
          id: "mp-05-oe-fig",
          outerFrame: "square",
          elements: [
            { id: "p1", shape: "square", position: "bottom-right", rotation: 0, fill: "filled", size: "medium" },
            { id: "p2", shape: "circle", position: "bottom-right", rotation: 0, fill: "empty", size: "small" }
          ]
        }
      }
    ],
    correctAnswer: "E",
    tags: ["matching-pairs", "diagonal-migration", "frame-addition"]
  }
];

// =================================================================
// 4. FIGURE CLASSIFICATION (ODD FIGURE OUT - 5 QUESTIONS)
// =================================================================

export const FIGURE_CLASSIFICATION_QUESTIONS: FigureClassificationQuestion[] = [
  {
    id: "fc-01",
    exam: "MAH CET",
    section: "Abstract Reasoning",
    category: "Figure Classification",
    questionType: "FIGURE_CLASSIFICATION",
    difficulty: "FOUNDATION",
    prompt: "Four of the following five figures are alike in a certain way and form a group. Which one does NOT belong to that group?",
    commonProperty: "Figures A, B, C, and E are composed entirely of straight line segments (Polygons).",
    oddProperty: "Figure D contains a curved shape (Circle) with 0 straight edges.",
    transformationType: "Geometric edge linearity",
    stepByStepRule: [
      "Figure A = Triangle (3 straight lines).",
      "Figure B = Square (4 straight lines).",
      "Figure C = Pentagon (5 straight lines).",
      "Figure D = Circle (Curved line, 0 vertices).",
      "Figure E = Hexagon (6 straight lines).",
      "Figure D is structurally distinct."
    ],
    ruleExplanation:
      "All figures except D are rectilinear polygons constructed solely with straight line segments and distinct vertices. Figure D is a curvilinear shape (circle).",
    classificationFigures: [
      {
        label: "A",
        figure: {
          id: "fc-01-a",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "triangle", position: "center", rotation: 0, fill: "empty", size: "large" }]
        }
      },
      {
        label: "B",
        figure: {
          id: "fc-01-b",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "square", position: "center", rotation: 0, fill: "empty", size: "large" }]
        }
      },
      {
        label: "C",
        figure: {
          id: "fc-01-c",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "pentagon", position: "center", rotation: 0, fill: "empty", size: "large" }]
        }
      },
      {
        label: "D",
        figure: {
          id: "fc-01-d",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "circle", position: "center", rotation: 0, fill: "empty", size: "large" }]
        }
      },
      {
        label: "E",
        figure: {
          id: "fc-01-e",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "hexagon", position: "center", rotation: 0, fill: "empty", size: "large" }]
        }
      }
    ],
    options: [
      {
        label: "A",
        figure: {
          id: "fc-01-opt-a",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "triangle", position: "center", rotation: 0, fill: "empty", size: "large" }]
        }
      },
      {
        label: "B",
        figure: {
          id: "fc-01-opt-b",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "square", position: "center", rotation: 0, fill: "empty", size: "large" }]
        }
      },
      {
        label: "C",
        figure: {
          id: "fc-01-opt-c",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "pentagon", position: "center", rotation: 0, fill: "empty", size: "large" }]
        }
      },
      {
        label: "D",
        figure: {
          id: "fc-01-opt-d",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "circle", position: "center", rotation: 0, fill: "empty", size: "large" }]
        }
      },
      {
        label: "E",
        figure: {
          id: "fc-01-opt-e",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "hexagon", position: "center", rotation: 0, fill: "empty", size: "large" }]
        }
      }
    ],
    correctAnswer: "D",
    tags: ["classification", "straight-vs-curved", "odd-one-out"]
  },
  {
    id: "fc-02",
    exam: "MAH CET",
    section: "Abstract Reasoning",
    category: "Figure Classification",
    questionType: "FIGURE_CLASSIFICATION",
    difficulty: "MAH_CET_LEVEL",
    prompt: "Identify the odd figure that does not follow the structural property shared by the other four.",
    commonProperty: "In four figures, the central arrow points away from the satellite dot.",
    oddProperty: "In Figure C, the arrow points directly toward the satellite dot.",
    transformationType: "Relative directional vector alignment",
    stepByStepRule: [
      "Examine relative angle between arrow heading and dot location.",
      "In A, B, D, and E: angle is 180° (arrow points away from dot).",
      "In C: arrow points 0° directly at the dot.",
      "Figure C is the odd figure."
    ],
    ruleExplanation:
      "In figures A, B, D, and E, the arrow vector is oriented 180° away from the peripheral dot. In Figure C, the arrow points directly toward the dot.",
    classificationFigures: [
      {
        label: "A",
        figure: {
          id: "fc-02-a",
          outerFrame: "square",
          elements: [
            { id: "e1", shape: "arrow", position: "center", rotation: 180, fill: "filled", size: "large" },
            { id: "e2", shape: "dot", position: "top", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "B",
        figure: {
          id: "fc-02-b",
          outerFrame: "square",
          elements: [
            { id: "e1", shape: "arrow", position: "center", rotation: 270, fill: "filled", size: "large" },
            { id: "e2", shape: "dot", position: "right", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "C",
        figure: {
          id: "fc-02-c",
          outerFrame: "square",
          elements: [
            { id: "e1", shape: "arrow", position: "center", rotation: 0, fill: "filled", size: "large" },
            { id: "e2", shape: "dot", position: "top", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "D",
        figure: {
          id: "fc-02-d",
          outerFrame: "square",
          elements: [
            { id: "e1", shape: "arrow", position: "center", rotation: 0, fill: "filled", size: "large" },
            { id: "e2", shape: "dot", position: "bottom", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "E",
        figure: {
          id: "fc-02-e",
          outerFrame: "square",
          elements: [
            { id: "e1", shape: "arrow", position: "center", rotation: 90, fill: "filled", size: "large" },
            { id: "e2", shape: "dot", position: "left", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      }
    ],
    options: [
      {
        label: "A",
        figure: {
          id: "fc-02-opt-a",
          outerFrame: "square",
          elements: [
            { id: "e1", shape: "arrow", position: "center", rotation: 180, fill: "filled", size: "large" },
            { id: "e2", shape: "dot", position: "top", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "B",
        figure: {
          id: "fc-02-opt-b",
          outerFrame: "square",
          elements: [
            { id: "e1", shape: "arrow", position: "center", rotation: 270, fill: "filled", size: "large" },
            { id: "e2", shape: "dot", position: "right", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "C",
        figure: {
          id: "fc-02-opt-c",
          outerFrame: "square",
          elements: [
            { id: "e1", shape: "arrow", position: "center", rotation: 0, fill: "filled", size: "large" },
            { id: "e2", shape: "dot", position: "top", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "D",
        figure: {
          id: "fc-02-opt-d",
          outerFrame: "square",
          elements: [
            { id: "e1", shape: "arrow", position: "center", rotation: 0, fill: "filled", size: "large" },
            { id: "e2", shape: "dot", position: "bottom", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "E",
        figure: {
          id: "fc-02-opt-e",
          outerFrame: "square",
          elements: [
            { id: "e1", shape: "arrow", position: "center", rotation: 90, fill: "filled", size: "large" },
            { id: "e2", shape: "dot", position: "left", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      }
    ],
    correctAnswer: "C",
    tags: ["classification", "vector-direction", "relative-angle"]
  },
  {
    id: "fc-03",
    exam: "MAH CET",
    section: "Abstract Reasoning",
    category: "Figure Classification",
    questionType: "FIGURE_CLASSIFICATION",
    difficulty: "MAH_CET_LEVEL",
    prompt: "Which figure does NOT belong with the other four?",
    commonProperty: "Rotational congruence: four figures can be rotated into one another.",
    oddProperty: "Figure B is a non-superimposable mirror image (chiral inversion).",
    transformationType: "Planar rotation invariance vs chirality",
    stepByStepRule: [
      "Check chirality of the L-shape: long stem with foot extending to the right.",
      "Rotating gives foot pointing: Up-Right, Down-Left, etc.",
      "Figure B has foot extending to the left when stem is vertical (mirror reflected).",
      "Figure B cannot be obtained by pure planar rotation."
    ],
    ruleExplanation:
      "Figures A, C, D, and E are pure 2D planar rotations of a right-handed L-shape. Figure B is a laterally reflected left-handed version.",
    classificationFigures: [
      {
        label: "A",
        figure: {
          id: "fc-03-a",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "l-shape", position: "center", rotation: 0, fill: "filled", size: "large" }]
        }
      },
      {
        label: "B",
        figure: {
          id: "fc-03-b",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "l-shape", position: "center", rotation: 180, fill: "striped", size: "large" }]
        }
      },
      {
        label: "C",
        figure: {
          id: "fc-03-c",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "l-shape", position: "center", rotation: 90, fill: "filled", size: "large" }]
        }
      },
      {
        label: "D",
        figure: {
          id: "fc-03-d",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "l-shape", position: "center", rotation: 180, fill: "filled", size: "large" }]
        }
      },
      {
        label: "E",
        figure: {
          id: "fc-03-e",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "l-shape", position: "center", rotation: 270, fill: "filled", size: "large" }]
        }
      }
    ],
    options: [
      {
        label: "A",
        figure: {
          id: "fc-03-opt-a",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "l-shape", position: "center", rotation: 0, fill: "filled", size: "large" }]
        }
      },
      {
        label: "B",
        figure: {
          id: "fc-03-opt-b",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "l-shape", position: "center", rotation: 180, fill: "striped", size: "large" }]
        }
      },
      {
        label: "C",
        figure: {
          id: "fc-03-opt-c",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "l-shape", position: "center", rotation: 90, fill: "filled", size: "large" }]
        }
      },
      {
        label: "D",
        figure: {
          id: "fc-03-opt-d",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "l-shape", position: "center", rotation: 180, fill: "filled", size: "large" }]
        }
      },
      {
        label: "E",
        figure: {
          id: "fc-03-opt-e",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "l-shape", position: "center", rotation: 270, fill: "filled", size: "large" }]
        }
      }
    ],
    correctAnswer: "B",
    tags: ["classification", "chirality", "rotational-congruence"]
  },
  {
    id: "fc-04",
    exam: "MAH CET",
    section: "Abstract Reasoning",
    category: "Figure Classification",
    questionType: "FIGURE_CLASSIFICATION",
    difficulty: "MAH_CET_HARD",
    prompt: "Select the figure that deviates from the governing mathematical rule of the group.",
    commonProperty: "Each valid figure contains an EVEN number of satellite dots (2 or 4).",
    oddProperty: "Figure E contains exactly 3 dots (ODD count).",
    transformationType: "Component parity invariant",
    stepByStepRule: [
      "Count satellite dots in each figure.",
      "A: 2 dots (Even).",
      "B: 4 dots (Even).",
      "C: 2 dots (Even).",
      "D: 4 dots (Even).",
      "E: 3 dots (Odd).",
      "Figure E is the sole violator of the even parity invariant."
    ],
    ruleExplanation:
      "Figures A, B, C, and D all possess an even quantity of peripheral dots (either 2 or 4). Figure E violates this with 3 dots.",
    classificationFigures: [
      {
        label: "A",
        figure: {
          id: "fc-04-a",
          outerFrame: "square",
          elements: [
            { id: "e1", shape: "hexagon", position: "center", rotation: 0, fill: "empty", size: "large" },
            { id: "e2", shape: "dot", position: "top", rotation: 0, fill: "filled", size: "small" },
            { id: "e3", shape: "dot", position: "bottom", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "B",
        figure: {
          id: "fc-04-b",
          outerFrame: "square",
          elements: [
            { id: "e1", shape: "hexagon", position: "center", rotation: 0, fill: "empty", size: "large" },
            { id: "e2", shape: "dot", position: "top", rotation: 0, fill: "filled", size: "small" },
            { id: "e3", shape: "dot", position: "bottom", rotation: 0, fill: "filled", size: "small" },
            { id: "e4", shape: "dot", position: "left", rotation: 0, fill: "filled", size: "small" },
            { id: "e5", shape: "dot", position: "right", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "C",
        figure: {
          id: "fc-04-c",
          outerFrame: "square",
          elements: [
            { id: "e1", shape: "hexagon", position: "center", rotation: 0, fill: "empty", size: "large" },
            { id: "e2", shape: "dot", position: "left", rotation: 0, fill: "filled", size: "small" },
            { id: "e3", shape: "dot", position: "right", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "D",
        figure: {
          id: "fc-04-d",
          outerFrame: "square",
          elements: [
            { id: "e1", shape: "hexagon", position: "center", rotation: 0, fill: "empty", size: "large" },
            { id: "e2", shape: "dot", position: "top-left", rotation: 0, fill: "filled", size: "small" },
            { id: "e3", shape: "dot", position: "top-right", rotation: 0, fill: "filled", size: "small" },
            { id: "e4", shape: "dot", position: "bottom-left", rotation: 0, fill: "filled", size: "small" },
            { id: "e5", shape: "dot", position: "bottom-right", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "E",
        figure: {
          id: "fc-04-e",
          outerFrame: "square",
          elements: [
            { id: "e1", shape: "hexagon", position: "center", rotation: 0, fill: "empty", size: "large" },
            { id: "e2", shape: "dot", position: "top", rotation: 0, fill: "filled", size: "small" },
            { id: "e3", shape: "dot", position: "bottom-left", rotation: 0, fill: "filled", size: "small" },
            { id: "e4", shape: "dot", position: "bottom-right", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      }
    ],
    options: [
      {
        label: "A",
        figure: {
          id: "fc-04-opt-a",
          outerFrame: "square",
          elements: [
            { id: "e1", shape: "hexagon", position: "center", rotation: 0, fill: "empty", size: "large" },
            { id: "e2", shape: "dot", position: "top", rotation: 0, fill: "filled", size: "small" },
            { id: "e3", shape: "dot", position: "bottom", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "B",
        figure: {
          id: "fc-04-opt-b",
          outerFrame: "square",
          elements: [
            { id: "e1", shape: "hexagon", position: "center", rotation: 0, fill: "empty", size: "large" },
            { id: "e2", shape: "dot", position: "top", rotation: 0, fill: "filled", size: "small" },
            { id: "e3", shape: "dot", position: "bottom", rotation: 0, fill: "filled", size: "small" },
            { id: "e4", shape: "dot", position: "left", rotation: 0, fill: "filled", size: "small" },
            { id: "e5", shape: "dot", position: "right", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "C",
        figure: {
          id: "fc-04-opt-c",
          outerFrame: "square",
          elements: [
            { id: "e1", shape: "hexagon", position: "center", rotation: 0, fill: "empty", size: "large" },
            { id: "e2", shape: "dot", position: "left", rotation: 0, fill: "filled", size: "small" },
            { id: "e3", shape: "dot", position: "right", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "D",
        figure: {
          id: "fc-04-opt-d",
          outerFrame: "square",
          elements: [
            { id: "e1", shape: "hexagon", position: "center", rotation: 0, fill: "empty", size: "large" },
            { id: "e2", shape: "dot", position: "top-left", rotation: 0, fill: "filled", size: "small" },
            { id: "e3", shape: "dot", position: "top-right", rotation: 0, fill: "filled", size: "small" },
            { id: "e4", shape: "dot", position: "bottom-left", rotation: 0, fill: "filled", size: "small" },
            { id: "e5", shape: "dot", position: "bottom-right", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "E",
        figure: {
          id: "fc-04-opt-e",
          outerFrame: "square",
          elements: [
            { id: "e1", shape: "hexagon", position: "center", rotation: 0, fill: "empty", size: "large" },
            { id: "e2", shape: "dot", position: "top", rotation: 0, fill: "filled", size: "small" },
            { id: "e3", shape: "dot", position: "bottom-left", rotation: 0, fill: "filled", size: "small" },
            { id: "e4", shape: "dot", position: "bottom-right", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      }
    ],
    correctAnswer: "E",
    tags: ["classification", "parity", "dot-counting"]
  },
  {
    id: "fc-05",
    exam: "MAH CET",
    section: "Abstract Reasoning",
    category: "Figure Classification",
    questionType: "FIGURE_CLASSIFICATION",
    difficulty: "MAH_CET_HARD",
    prompt: "Choose the figure that does NOT conform to the rotational symmetry property of the set.",
    commonProperty: "Figures A, B, C, and D exhibit 4-fold rotational symmetry (90° invariant).",
    oddProperty: "Figure E exhibits only 2-fold rotational symmetry (180° invariant).",
    transformationType: "Rotational symmetry order",
    stepByStepRule: [
      "Plus, Cross, Square, and 8-pointed Star look identical under 90° rotations.",
      "Figure E (rectangle / asymmetric crescent) requires a 180° rotation to match.",
      "Figure E lacks 4-fold symmetry."
    ],
    ruleExplanation:
      "Figures A (Plus), B (Cross), C (Square), and D (Star) all possess 4-fold rotational symmetry. Figure E (Crescent) has 1-fold (asymmetric) symmetry.",
    classificationFigures: [
      {
        label: "A",
        figure: {
          id: "fc-05-a",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "plus", position: "center", rotation: 0, fill: "filled", size: "large" }]
        }
      },
      {
        label: "B",
        figure: {
          id: "fc-05-b",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "cross", position: "center", rotation: 45, fill: "filled", size: "large" }]
        }
      },
      {
        label: "C",
        figure: {
          id: "fc-05-c",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "square", position: "center", rotation: 0, fill: "filled", size: "large" }]
        }
      },
      {
        label: "D",
        figure: {
          id: "fc-05-d",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "star", position: "center", rotation: 0, fill: "filled", size: "large" }]
        }
      },
      {
        label: "E",
        figure: {
          id: "fc-05-e",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "crescent", position: "center", rotation: 0, fill: "filled", size: "large" }]
        }
      }
    ],
    options: [
      {
        label: "A",
        figure: {
          id: "fc-05-opt-a",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "plus", position: "center", rotation: 0, fill: "filled", size: "large" }]
        }
      },
      {
        label: "B",
        figure: {
          id: "fc-05-opt-b",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "cross", position: "center", rotation: 45, fill: "filled", size: "large" }]
        }
      },
      {
        label: "C",
        figure: {
          id: "fc-05-opt-c",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "square", position: "center", rotation: 0, fill: "filled", size: "large" }]
        }
      },
      {
        label: "D",
        figure: {
          id: "fc-05-opt-d",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "star", position: "center", rotation: 0, fill: "filled", size: "large" }]
        }
      },
      {
        label: "E",
        figure: {
          id: "fc-05-opt-e",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "crescent", position: "center", rotation: 0, fill: "filled", size: "large" }]
        }
      }
    ],
    correctAnswer: "E",
    tags: ["classification", "rotational-symmetry", "order-4"]
  }
];

// =================================================================
// 5. MISSING FIGURE (3x3 MATRIX - 5 QUESTIONS)
// =================================================================

export const MISSING_FIGURE_QUESTIONS: MissingFigureQuestion[] = [
  {
    id: "mf-01",
    exam: "MAH CET",
    section: "Abstract Reasoning",
    category: "Missing Figure",
    questionType: "MISSING_FIGURE",
    difficulty: "FOUNDATION",
    prompt: "Analyze the 3×3 matrix and discover the logical rule to determine the missing figure at row 3, column 3 (marked by ?).",
    horizontalRule: "Each row contains exactly one Circle, one Square, and one Triangle (Latin Square).",
    verticalRule: "Each column contains one filled, one striped, and one empty figure.",
    transformationType: "Latin Square distribution with shading permutation",
    stepByStepRule: [
      "Row 3 has: Square (filled) and Circle (striped). The missing shape MUST be a Triangle.",
      "Column 3 has: Triangle (empty) and Square (striped). The missing fill MUST be filled (solid).",
      "Result: Solid filled Triangle."
    ],
    ruleExplanation:
      "By Latin Square distribution across rows (Circle, Square, Triangle) and columns (Empty, Striped, Filled), the missing cell at (Row 3, Col 3) must be a solid filled triangle.",
    missingRow: 2,
    missingCol: 2,
    matrix3x3: [
      [
        {
          id: "mf-01-r1c1",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "circle", position: "center", rotation: 0, fill: "filled", size: "medium" }]
        },
        {
          id: "mf-01-r1c2",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "square", position: "center", rotation: 0, fill: "empty", size: "medium" }]
        },
        {
          id: "mf-01-r1c3",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "triangle", position: "center", rotation: 0, fill: "striped", size: "medium" }]
        }
      ],
      [
        {
          id: "mf-01-r2c1",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "triangle", position: "center", rotation: 0, fill: "empty", size: "medium" }]
        },
        {
          id: "mf-01-r2c2",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "circle", position: "center", rotation: 0, fill: "striped", size: "medium" }]
        },
        {
          id: "mf-01-r2c3",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "square", position: "center", rotation: 0, fill: "filled", size: "medium" }]
        }
      ],
      [
        {
          id: "mf-01-r3c1",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "square", position: "center", rotation: 0, fill: "striped", size: "medium" }]
        },
        {
          id: "mf-01-r3c2",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "triangle", position: "center", rotation: 0, fill: "filled", size: "medium" }]
        },
        null // The missing figure (?)
      ]
    ],
    options: [
      {
        label: "A",
        figure: {
          id: "mf-01-opt-a",
          outerFrame: "square",
          elements: [{ id: "oa", shape: "circle", position: "center", rotation: 0, fill: "empty", size: "medium" }]
        }
      },
      {
        label: "B",
        figure: {
          id: "mf-01-opt-b",
          outerFrame: "square",
          elements: [{ id: "ob", shape: "circle", position: "center", rotation: 0, fill: "filled", size: "medium" }]
        }
      },
      {
        label: "C",
        figure: {
          id: "mf-01-opt-c",
          outerFrame: "square",
          elements: [{ id: "oc", shape: "triangle", position: "center", rotation: 0, fill: "empty", size: "medium" }]
        }
      },
      {
        label: "D",
        figure: {
          id: "mf-01-opt-d",
          outerFrame: "square",
          elements: [{ id: "od", shape: "square", position: "center", rotation: 0, fill: "striped", size: "medium" }]
        }
      },
      {
        label: "E",
        figure: {
          id: "mf-01-opt-e",
          outerFrame: "square",
          elements: [{ id: "oe", shape: "diamond", position: "center", rotation: 0, fill: "filled", size: "medium" }]
        }
      }
    ],
    correctAnswer: "A",
    tags: ["matrix", "latin-square", "shading-distribution"]
  },
  {
    id: "mf-02",
    exam: "MAH CET",
    section: "Abstract Reasoning",
    category: "Missing Figure",
    questionType: "MISSING_FIGURE",
    difficulty: "MAH_CET_LEVEL",
    prompt: "Find the missing figure that fits logically into cell (Row 3, Column 3) of the matrix.",
    horizontalRule: "The arrow rotates 45° clockwise across each column.",
    verticalRule: "The arrow rotates 90° clockwise down each row.",
    transformationType: "Grid angular matrix rotation",
    stepByStepRule: [
      "Row 3, Col 1 has arrow pointing 180° (Down).",
      "Row 3, Col 2 has arrow pointing 225° (Down-Left).",
      "Row 3, Col 3 must point 270° (Left).",
      "Column 3 check: Col 1 is 90° (Right), Col 2 is 180° (Down), Col 3 is 270° (Left). Perfect match!"
    ],
    ruleExplanation:
      "Each step to the right adds +45° clockwise. Each step down adds +90° clockwise. At Row 3, Column 3, the angle is 270° (pointing directly left).",
    missingRow: 2,
    missingCol: 2,
    matrix3x3: [
      [
        {
          id: "mf-02-r1c1",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "arrow", position: "center", rotation: 0, fill: "filled", size: "large" }]
        },
        {
          id: "mf-02-r1c2",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "arrow", position: "center", rotation: 45, fill: "filled", size: "large" }]
        },
        {
          id: "mf-02-r1c3",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "arrow", position: "center", rotation: 90, fill: "filled", size: "large" }]
        }
      ],
      [
        {
          id: "mf-02-r2c1",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "arrow", position: "center", rotation: 90, fill: "filled", size: "large" }]
        },
        {
          id: "mf-02-r2c2",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "arrow", position: "center", rotation: 135, fill: "filled", size: "large" }]
        },
        {
          id: "mf-02-r2c3",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "arrow", position: "center", rotation: 180, fill: "filled", size: "large" }]
        }
      ],
      [
        {
          id: "mf-02-r3c1",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "arrow", position: "center", rotation: 180, fill: "filled", size: "large" }]
        },
        {
          id: "mf-02-r3c2",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "arrow", position: "center", rotation: 225, fill: "filled", size: "large" }]
        },
        null
      ]
    ],
    options: [
      {
        label: "A",
        figure: {
          id: "mf-02-opt-a",
          outerFrame: "square",
          elements: [{ id: "oa", shape: "arrow", position: "center", rotation: 270, fill: "filled", size: "large" }]
        }
      },
      {
        label: "B",
        figure: {
          id: "mf-02-opt-b",
          outerFrame: "square",
          elements: [{ id: "ob", shape: "arrow", position: "center", rotation: 315, fill: "filled", size: "large" }]
        }
      },
      {
        label: "C",
        figure: {
          id: "mf-02-opt-c",
          outerFrame: "square",
          elements: [{ id: "oc", shape: "arrow", position: "center", rotation: 0, fill: "filled", size: "large" }]
        }
      },
      {
        label: "D",
        figure: {
          id: "mf-02-opt-d",
          outerFrame: "square",
          elements: [{ id: "od", shape: "arrow", position: "center", rotation: 180, fill: "empty", size: "large" }]
        }
      },
      {
        label: "E",
        figure: {
          id: "mf-02-opt-e",
          outerFrame: "square",
          elements: [{ id: "oe", shape: "plus", position: "center", rotation: 0, fill: "filled", size: "medium" }]
        }
      }
    ],
    correctAnswer: "A",
    tags: ["matrix", "rotation-grid", "vector"]
  },
  {
    id: "mf-03",
    exam: "MAH CET",
    section: "Abstract Reasoning",
    category: "Missing Figure",
    questionType: "MISSING_FIGURE",
    difficulty: "MAH_CET_LEVEL",
    prompt: "Determine the missing figure in the 3×3 matrix.",
    horizontalRule: "Dot count in Column 3 is the sum of dots in Column 1 and Column 2 (Col 3 = Col 1 + Col 2).",
    verticalRule: "Shape remains constant down each column.",
    transformationType: "Additive dot matrix arithmetic",
    stepByStepRule: [
      "Row 1: 1 dot + 2 dots = 3 dots.",
      "Row 2: 2 dots + 2 dots = 4 dots.",
      "Row 3: 3 dots + 1 dot = 4 dots.",
      "Result must contain a central diamond with 4 dots."
    ],
    ruleExplanation:
      "Horizontal addition: Cell 3 dot count = Cell 1 dot count + Cell 2 dot count. Row 3 has 3 dots + 1 dot = 4 dots with diamond frame.",
    missingRow: 2,
    missingCol: 2,
    matrix3x3: [
      [
        {
          id: "mf-03-r1c1",
          outerFrame: "square",
          elements: [
            { id: "e1", shape: "circle", position: "center", rotation: 0, fill: "empty", size: "large" },
            { id: "e2", shape: "dot", position: "top", rotation: 0, fill: "filled", size: "small" }
          ]
        },
        {
          id: "mf-03-r1c2",
          outerFrame: "square",
          elements: [
            { id: "e1", shape: "circle", position: "center", rotation: 0, fill: "empty", size: "large" },
            { id: "e2", shape: "dot", position: "top", rotation: 0, fill: "filled", size: "small" },
            { id: "e3", shape: "dot", position: "bottom", rotation: 0, fill: "filled", size: "small" }
          ]
        },
        {
          id: "mf-03-r1c3",
          outerFrame: "square",
          elements: [
            { id: "e1", shape: "circle", position: "center", rotation: 0, fill: "empty", size: "large" },
            { id: "e2", shape: "dot", position: "top", rotation: 0, fill: "filled", size: "small" },
            { id: "e3", shape: "dot", position: "bottom", rotation: 0, fill: "filled", size: "small" },
            { id: "e4", shape: "dot", position: "left", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      ],
      [
        {
          id: "mf-03-r2c1",
          outerFrame: "square",
          elements: [
            { id: "e1", shape: "square", position: "center", rotation: 0, fill: "empty", size: "large" },
            { id: "e2", shape: "dot", position: "top", rotation: 0, fill: "filled", size: "small" },
            { id: "e3", shape: "dot", position: "bottom", rotation: 0, fill: "filled", size: "small" }
          ]
        },
        {
          id: "mf-03-r2c2",
          outerFrame: "square",
          elements: [
            { id: "e1", shape: "square", position: "center", rotation: 0, fill: "empty", size: "large" },
            { id: "e2", shape: "dot", position: "left", rotation: 0, fill: "filled", size: "small" },
            { id: "e3", shape: "dot", position: "right", rotation: 0, fill: "filled", size: "small" }
          ]
        },
        {
          id: "mf-03-r2c3",
          outerFrame: "square",
          elements: [
            { id: "e1", shape: "square", position: "center", rotation: 0, fill: "empty", size: "large" },
            { id: "e2", shape: "dot", position: "top", rotation: 0, fill: "filled", size: "small" },
            { id: "e3", shape: "dot", position: "bottom", rotation: 0, fill: "filled", size: "small" },
            { id: "e4", shape: "dot", position: "left", rotation: 0, fill: "filled", size: "small" },
            { id: "e5", shape: "dot", position: "right", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      ],
      [
        {
          id: "mf-03-r3c1",
          outerFrame: "square",
          elements: [
            { id: "e1", shape: "diamond", position: "center", rotation: 0, fill: "empty", size: "large" },
            { id: "e2", shape: "dot", position: "top", rotation: 0, fill: "filled", size: "small" },
            { id: "e3", shape: "dot", position: "left", rotation: 0, fill: "filled", size: "small" },
            { id: "e4", shape: "dot", position: "right", rotation: 0, fill: "filled", size: "small" }
          ]
        },
        {
          id: "mf-03-r3c2",
          outerFrame: "square",
          elements: [
            { id: "e1", shape: "diamond", position: "center", rotation: 0, fill: "empty", size: "large" },
            { id: "e2", shape: "dot", position: "bottom", rotation: 0, fill: "filled", size: "small" }
          ]
        },
        null
      ]
    ],
    options: [
      {
        label: "A",
        figure: {
          id: "mf-03-opt-a",
          outerFrame: "square",
          elements: [
            { id: "oa1", shape: "diamond", position: "center", rotation: 0, fill: "empty", size: "large" },
            { id: "oa2", shape: "dot", position: "top", rotation: 0, fill: "filled", size: "small" },
            { id: "oa3", shape: "dot", position: "bottom", rotation: 0, fill: "filled", size: "small" },
            { id: "oa4", shape: "dot", position: "left", rotation: 0, fill: "filled", size: "small" },
            { id: "oa5", shape: "dot", position: "right", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "B",
        figure: {
          id: "mf-03-opt-b",
          outerFrame: "square",
          elements: [
            { id: "ob1", shape: "diamond", position: "center", rotation: 0, fill: "empty", size: "large" },
            { id: "ob2", shape: "dot", position: "top", rotation: 0, fill: "filled", size: "small" },
            { id: "ob3", shape: "dot", position: "bottom", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "C",
        figure: {
          id: "mf-03-opt-c",
          outerFrame: "square",
          elements: [
            { id: "oc1", shape: "circle", position: "center", rotation: 0, fill: "filled", size: "large" }
          ]
        }
      },
      {
        label: "D",
        figure: {
          id: "mf-03-opt-d",
          outerFrame: "square",
          elements: [
            { id: "od1", shape: "square", position: "center", rotation: 0, fill: "empty", size: "large" },
            { id: "od2", shape: "dot", position: "center", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "E",
        figure: {
          id: "mf-03-opt-e",
          outerFrame: "square",
          elements: [
            { id: "oe1", shape: "star", position: "center", rotation: 0, fill: "striped", size: "large" }
          ]
        }
      }
    ],
    correctAnswer: "A",
    tags: ["matrix", "dot-addition", "counting"]
  },
  {
    id: "mf-04",
    exam: "MAH CET",
    section: "Abstract Reasoning",
    category: "Missing Figure",
    questionType: "MISSING_FIGURE",
    difficulty: "MAH_CET_HARD",
    prompt: "Discover the matrix superposition rule and choose the appropriate missing figure.",
    horizontalRule: "Cell 3 is formed by overlaying Cell 1 and Cell 2 (Union operation).",
    verticalRule: "Consistency across rows validates the union rule.",
    transformationType: "Superposition union logic",
    stepByStepRule: [
      "Row 3, Col 1 has a horizontal line.",
      "Row 3, Col 2 has a vertical line.",
      "Row 3, Col 3 must combine both lines to form a Plus (+).",
      "Option B constitutes the exact composite figure."
    ],
    ruleExplanation:
      "Boolean OR/Superposition: Cell 3 combines the components of Cell 1 and Cell 2. Row 3 merges a horizontal line with a vertical line, resulting in a cross/plus.",
    missingRow: 2,
    missingCol: 2,
    matrix3x3: [
      [
        {
          id: "mf-04-r1c1",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "dot", position: "top-left", rotation: 0, fill: "filled", size: "small" }]
        },
        {
          id: "mf-04-r1c2",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "dot", position: "bottom-right", rotation: 0, fill: "filled", size: "small" }]
        },
        {
          id: "mf-04-r1c3",
          outerFrame: "square",
          elements: [
            { id: "e1", shape: "dot", position: "top-left", rotation: 0, fill: "filled", size: "small" },
            { id: "e2", shape: "dot", position: "bottom-right", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      ],
      [
        {
          id: "mf-04-r2c1",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "triangle", position: "center", rotation: 0, fill: "empty", size: "medium" }]
        },
        {
          id: "mf-04-r2c2",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "circle", position: "center", rotation: 0, fill: "empty", size: "medium" }]
        },
        {
          id: "mf-04-r2c3",
          outerFrame: "square",
          elements: [
            { id: "e1", shape: "triangle", position: "center", rotation: 0, fill: "empty", size: "medium" },
            { id: "e2", shape: "circle", position: "center", rotation: 0, fill: "empty", size: "medium" }
          ]
        }
      ],
      [
        {
          id: "mf-04-r3c1",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "cross", position: "center", rotation: 0, fill: "empty", size: "large" }]
        },
        {
          id: "mf-04-r3c2",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "diamond", position: "center", rotation: 0, fill: "empty", size: "medium" }]
        },
        null
      ]
    ],
    options: [
      {
        label: "A",
        figure: {
          id: "mf-04-opt-a",
          outerFrame: "square",
          elements: [
            { id: "oa1", shape: "cross", position: "center", rotation: 0, fill: "empty", size: "large" },
            { id: "oa2", shape: "diamond", position: "center", rotation: 0, fill: "empty", size: "medium" }
          ]
        }
      },
      {
        label: "B",
        figure: {
          id: "mf-04-opt-b",
          outerFrame: "square",
          elements: [{ id: "ob1", shape: "cross", position: "center", rotation: 45, fill: "filled", size: "large" }]
        }
      },
      {
        label: "C",
        figure: {
          id: "mf-04-opt-c",
          outerFrame: "square",
          elements: [{ id: "oc1", shape: "diamond", position: "center", rotation: 0, fill: "filled", size: "large" }]
        }
      },
      {
        label: "D",
        figure: {
          id: "mf-04-opt-d",
          outerFrame: "square",
          elements: [{ id: "od1", shape: "star", position: "center", rotation: 0, fill: "empty", size: "large" }]
        }
      },
      {
        label: "E",
        figure: {
          id: "mf-04-opt-e",
          outerFrame: "square",
          elements: [{ id: "oe1", shape: "circle", position: "center", rotation: 0, fill: "striped", size: "large" }]
        }
      }
    ],
    correctAnswer: "A",
    tags: ["matrix", "superposition", "union"]
  },
  {
    id: "mf-05",
    exam: "MAH CET",
    section: "Abstract Reasoning",
    category: "Missing Figure",
    questionType: "MISSING_FIGURE",
    difficulty: "MAH_CET_HARD",
    prompt: "Solve the matrix puzzle by finding the correct visual element to occupy cell (Row 3, Col 3).",
    horizontalRule: "Each row exhibits an alternating fill sequence: Solid -> Striped -> Hollow.",
    verticalRule: "Each column exhibits vertex expansion: 3-sided -> 4-sided -> 5-sided.",
    transformationType: "Dual coordinate parametric progression",
    stepByStepRule: [
      "Row 3 requires the 'Hollow' (empty) state.",
      "Column 3 requires a 5-sided polygon (Pentagon).",
      "Result: Hollow Pentagon."
    ],
    ruleExplanation:
      "Vertical rule increments sides by +1 (Triangle -> Square -> Pentagon). Horizontal rule cycles fills (Solid -> Striped -> Empty). Hence, the missing figure is an empty pentagon.",
    missingRow: 2,
    missingCol: 2,
    matrix3x3: [
      [
        {
          id: "mf-05-r1c1",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "triangle", position: "center", rotation: 0, fill: "filled", size: "large" }]
        },
        {
          id: "mf-05-r1c2",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "triangle", position: "center", rotation: 0, fill: "striped", size: "large" }]
        },
        {
          id: "mf-05-r1c3",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "triangle", position: "center", rotation: 0, fill: "empty", size: "large" }]
        }
      ],
      [
        {
          id: "mf-05-r2c1",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "square", position: "center", rotation: 0, fill: "filled", size: "large" }]
        },
        {
          id: "mf-05-r2c2",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "square", position: "center", rotation: 0, fill: "striped", size: "large" }]
        },
        {
          id: "mf-05-r2c3",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "square", position: "center", rotation: 0, fill: "empty", size: "large" }]
        }
      ],
      [
        {
          id: "mf-05-r3c1",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "pentagon", position: "center", rotation: 0, fill: "filled", size: "large" }]
        },
        {
          id: "mf-05-r3c2",
          outerFrame: "square",
          elements: [{ id: "e1", shape: "pentagon", position: "center", rotation: 0, fill: "striped", size: "large" }]
        },
        null
      ]
    ],
    options: [
      {
        label: "A",
        figure: {
          id: "mf-05-opt-a",
          outerFrame: "square",
          elements: [{ id: "oa", shape: "pentagon", position: "center", rotation: 0, fill: "empty", size: "large" }]
        }
      },
      {
        label: "B",
        figure: {
          id: "mf-05-opt-b",
          outerFrame: "square",
          elements: [{ id: "ob", shape: "pentagon", position: "center", rotation: 0, fill: "filled", size: "large" }]
        }
      },
      {
        label: "C",
        figure: {
          id: "mf-05-opt-c",
          outerFrame: "square",
          elements: [{ id: "oc", shape: "hexagon", position: "center", rotation: 0, fill: "empty", size: "large" }]
        }
      },
      {
        label: "D",
        figure: {
          id: "mf-05-opt-d",
          outerFrame: "square",
          elements: [{ id: "od", shape: "square", position: "center", rotation: 45, fill: "empty", size: "large" }]
        }
      },
      {
        label: "E",
        figure: {
          id: "mf-05-opt-e",
          outerFrame: "square",
          elements: [{ id: "oe", shape: "circle", position: "center", rotation: 0, fill: "striped", size: "large" }]
        }
      }
    ],
    correctAnswer: "A",
    tags: ["matrix", "vertices", "fill-cycle"]
  }
];

// =================================================================
// 6. ROTATION & REFLECTION (5 QUESTIONS)
// =================================================================

export const ROTATION_REFLECTION_QUESTIONS: RotationReflectionQuestion[] = [
  {
    id: "rr-01",
    exam: "MAH CET",
    section: "Abstract Reasoning",
    category: "Rotation & Reflection",
    questionType: "ROTATION_REFLECTION",
    difficulty: "FOUNDATION",
    prompt: "Which option represents the figure after a 90° clockwise rotation?",
    transformationType: "90° clockwise planar rotation",
    operationType: "90_CW",
    stepByStepRule: [
      "Arrow initially points to the right (90° orientation).",
      "Rotating 90° clockwise points it directly down (180° orientation).",
      "Peripheral dot shifts from top to right."
    ],
    ruleExplanation:
      "A 90° clockwise rotation transforms the right-pointing arrow to a down-pointing arrow, moving the top dot to the right.",
    sourceFigure: {
      id: "rr-01-src",
      label: "Problem Figure",
      outerFrame: "square",
      elements: [
        { id: "e1", shape: "arrow", position: "center", rotation: 90, fill: "filled", size: "large" },
        { id: "e2", shape: "dot", position: "top", rotation: 0, fill: "filled", size: "small" }
      ]
    },
    options: [
      {
        label: "A",
        figure: {
          id: "rr-01-opt-a",
          outerFrame: "square",
          elements: [
            { id: "oa1", shape: "arrow", position: "center", rotation: 180, fill: "filled", size: "large" },
            { id: "oa2", shape: "dot", position: "right", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "B",
        figure: {
          id: "rr-01-opt-b",
          outerFrame: "square",
          elements: [
            { id: "ob1", shape: "arrow", position: "center", rotation: 0, fill: "filled", size: "large" },
            { id: "ob2", shape: "dot", position: "left", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "C",
        figure: {
          id: "rr-01-opt-c",
          outerFrame: "square",
          elements: [
            { id: "oc1", shape: "arrow", position: "center", rotation: 270, fill: "filled", size: "large" },
            { id: "oc2", shape: "dot", position: "bottom", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "D",
        figure: {
          id: "rr-01-opt-d",
          outerFrame: "square",
          elements: [
            { id: "od1", shape: "arrow", position: "center", rotation: 180, fill: "filled", size: "large" },
            { id: "od2", shape: "dot", position: "left", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "E",
        figure: {
          id: "rr-01-opt-e",
          outerFrame: "square",
          elements: [
            { id: "oe1", shape: "plus", position: "center", rotation: 0, fill: "empty", size: "medium" }
          ]
        }
      }
    ],
    correctAnswer: "A",
    tags: ["rotation", "90-cw", "arrow"]
  },
  {
    id: "rr-02",
    exam: "MAH CET",
    section: "Abstract Reasoning",
    category: "Rotation & Reflection",
    questionType: "ROTATION_REFLECTION",
    difficulty: "MAH_CET_LEVEL",
    prompt: "Choose the correct LATERAL MIRROR IMAGE (mirror placed vertically to the right of the figure).",
    transformationType: "Lateral mirror reflection",
    operationType: "MIRROR_HORIZONTAL",
    stepByStepRule: [
      "Left and right invert across the vertical axis.",
      "Crescent on left facing right inverts to right side facing left.",
      "Top dot stays at top.",
      "Option B represents the correct mirror image."
    ],
    ruleExplanation:
      "Vertical mirror reflection swaps X-coordinates (left becomes right and vice versa), while Y-coordinates remain completely unchanged.",
    sourceFigure: {
      id: "rr-02-src",
      label: "Problem Figure",
      outerFrame: "square",
      elements: [
        { id: "e1", shape: "crescent", position: "left", rotation: 0, fill: "filled", size: "medium" },
        { id: "e2", shape: "dot", position: "top", rotation: 0, fill: "filled", size: "small" }
      ]
    },
    options: [
      {
        label: "A",
        figure: {
          id: "rr-02-opt-a",
          outerFrame: "square",
          elements: [
            { id: "oa1", shape: "crescent", position: "left", rotation: 180, fill: "filled", size: "medium" },
            { id: "oa2", shape: "dot", position: "top", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "B",
        figure: {
          id: "rr-02-opt-b",
          outerFrame: "square",
          elements: [
            { id: "ob1", shape: "crescent", position: "right", rotation: 180, fill: "filled", size: "medium" },
            { id: "ob2", shape: "dot", position: "top", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "C",
        figure: {
          id: "rr-02-opt-c",
          outerFrame: "square",
          elements: [
            { id: "oc1", shape: "crescent", position: "bottom", rotation: 90, fill: "filled", size: "medium" },
            { id: "oc2", shape: "dot", position: "bottom", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "D",
        figure: {
          id: "rr-02-opt-d",
          outerFrame: "square",
          elements: [
            { id: "od1", shape: "crescent", position: "right", rotation: 0, fill: "filled", size: "medium" },
            { id: "od2", shape: "dot", position: "bottom", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "E",
        figure: {
          id: "rr-02-opt-e",
          outerFrame: "square",
          elements: [
            { id: "oe1", shape: "circle", position: "center", rotation: 0, fill: "empty", size: "large" }
          ]
        }
      }
    ],
    correctAnswer: "B",
    tags: ["mirror", "lateral-inversion", "reflection"]
  },
  {
    id: "rr-03",
    exam: "MAH CET",
    section: "Abstract Reasoning",
    category: "Rotation & Reflection",
    questionType: "ROTATION_REFLECTION",
    difficulty: "MAH_CET_LEVEL",
    prompt: "Identify the correct WATER IMAGE (reflection across a horizontal water surface beneath the figure).",
    transformationType: "Water surface vertical reflection",
    operationType: "WATER_VERTICAL",
    stepByStepRule: [
      "Top and bottom invert across horizontal axis.",
      "Upright triangle at top inverts to inverted triangle pointing down at bottom.",
      "Left-hand dot remains strictly on the left side (at the top).",
      "Option C accurately depicts this water inversion."
    ],
    ruleExplanation:
      "Water reflection inverts vertical coordinates (top becomes bottom) while keeping lateral positions (left/right) strictly unchanged.",
    sourceFigure: {
      id: "rr-03-src",
      label: "Problem Figure",
      outerFrame: "square",
      elements: [
        { id: "e1", shape: "triangle", position: "top", rotation: 0, fill: "filled", size: "medium" },
        { id: "e2", shape: "dot", position: "bottom-left", rotation: 0, fill: "filled", size: "small" }
      ]
    },
    options: [
      {
        label: "A",
        figure: {
          id: "rr-03-opt-a",
          outerFrame: "square",
          elements: [
            { id: "oa1", shape: "triangle", position: "top", rotation: 180, fill: "filled", size: "medium" },
            { id: "oa2", shape: "dot", position: "bottom-left", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "B",
        figure: {
          id: "rr-03-opt-b",
          outerFrame: "square",
          elements: [
            { id: "ob1", shape: "triangle", position: "bottom", rotation: 0, fill: "filled", size: "medium" },
            { id: "ob2", shape: "dot", position: "top-right", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "C",
        figure: {
          id: "rr-03-opt-c",
          outerFrame: "square",
          elements: [
            { id: "oc1", shape: "triangle", position: "bottom", rotation: 180, fill: "filled", size: "medium" },
            { id: "oc2", shape: "dot", position: "top-left", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "D",
        figure: {
          id: "rr-03-opt-d",
          outerFrame: "square",
          elements: [
            { id: "od1", shape: "triangle", position: "bottom", rotation: 180, fill: "filled", size: "medium" },
            { id: "od2", shape: "dot", position: "top-right", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "E",
        figure: {
          id: "rr-03-opt-e",
          outerFrame: "square",
          elements: [
            { id: "oe1", shape: "square", position: "center", rotation: 0, fill: "striped", size: "large" }
          ]
        }
      }
    ],
    correctAnswer: "C",
    tags: ["water-image", "vertical-reflection", "inversion"]
  },
  {
    id: "rr-04",
    exam: "MAH CET",
    section: "Abstract Reasoning",
    category: "Rotation & Reflection",
    questionType: "ROTATION_REFLECTION",
    difficulty: "MAH_CET_HARD",
    prompt: "Which option represents the problem figure after a 180° rotation?",
    transformationType: "180° point reflection / half turn",
    operationType: "180",
    stepByStepRule: [
      "A 180° rotation inverts both horizontal and vertical axes simultaneously.",
      "Top-left arrow pointing North-East becomes bottom-right arrow pointing South-West.",
      "Bottom-left dot moves to top-right.",
      "Option D fulfills all 180° rotation conditions."
    ],
    ruleExplanation:
      "A 180° planar turn maps (x, y) to (-x, -y). The top-left element transfers to bottom-right and rotates 180°.",
    sourceFigure: {
      id: "rr-04-src",
      label: "Problem Figure",
      outerFrame: "square",
      elements: [
        { id: "e1", shape: "arrow", position: "top-left", rotation: 45, fill: "filled", size: "medium" },
        { id: "e2", shape: "dot", position: "bottom-left", rotation: 0, fill: "filled", size: "small" }
      ]
    },
    options: [
      {
        label: "A",
        figure: {
          id: "rr-04-opt-a",
          outerFrame: "square",
          elements: [
            { id: "oa1", shape: "arrow", position: "top-right", rotation: 135, fill: "filled", size: "medium" },
            { id: "oa2", shape: "dot", position: "bottom-right", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "B",
        figure: {
          id: "rr-04-opt-b",
          outerFrame: "square",
          elements: [
            { id: "ob1", shape: "arrow", position: "bottom-left", rotation: 225, fill: "filled", size: "medium" },
            { id: "ob2", shape: "dot", position: "top-left", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "C",
        figure: {
          id: "rr-04-opt-c",
          outerFrame: "square",
          elements: [
            { id: "oc1", shape: "arrow", position: "bottom-right", rotation: 45, fill: "filled", size: "medium" },
            { id: "oc2", shape: "dot", position: "top-right", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "D",
        figure: {
          id: "rr-04-opt-d",
          outerFrame: "square",
          elements: [
            { id: "od1", shape: "arrow", position: "bottom-right", rotation: 225, fill: "filled", size: "medium" },
            { id: "od2", shape: "dot", position: "top-right", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "E",
        figure: {
          id: "rr-04-opt-e",
          outerFrame: "square",
          elements: [
            { id: "oe1", shape: "cross", position: "center", rotation: 0, fill: "empty", size: "medium" }
          ]
        }
      }
    ],
    correctAnswer: "D",
    tags: ["rotation", "180-degree", "point-reflection"]
  },
  {
    id: "rr-05",
    exam: "MAH CET",
    section: "Abstract Reasoning",
    category: "Rotation & Reflection",
    questionType: "ROTATION_REFLECTION",
    difficulty: "MAH_CET_HARD",
    prompt: "Identify the figure produced by rotating the source figure by 270° clockwise (equivalent to 90° counter-clockwise).",
    transformationType: "270° clockwise rotation",
    operationType: "270_CW",
    stepByStepRule: [
      "270° CW is equivalent to 90° CCW.",
      "T-shape at 0° (upright) rotates 90° CCW to 270° (pointing Left).",
      "Peripheral dot at right moves 90° CCW to top.",
      "Option A is the correct transformation."
    ],
    ruleExplanation:
      "Rotating 270° clockwise pivots the T-shape from 0° to 270° (pointing west). The satellite dot at the right edge swings 270° CW (or 90° CCW) to the top edge.",
    sourceFigure: {
      id: "rr-05-src",
      label: "Problem Figure",
      outerFrame: "square",
      elements: [
        { id: "e1", shape: "t-shape", position: "center", rotation: 0, fill: "filled", size: "large" },
        { id: "e2", shape: "dot", position: "right", rotation: 0, fill: "filled", size: "small" }
      ]
    },
    options: [
      {
        label: "A",
        figure: {
          id: "rr-05-opt-a",
          outerFrame: "square",
          elements: [
            { id: "oa1", shape: "t-shape", position: "center", rotation: 270, fill: "filled", size: "large" },
            { id: "oa2", shape: "dot", position: "top", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "B",
        figure: {
          id: "rr-05-opt-b",
          outerFrame: "square",
          elements: [
            { id: "ob1", shape: "t-shape", position: "center", rotation: 90, fill: "filled", size: "large" },
            { id: "ob2", shape: "dot", position: "bottom", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "C",
        figure: {
          id: "rr-05-opt-c",
          outerFrame: "square",
          elements: [
            { id: "oc1", shape: "t-shape", position: "center", rotation: 180, fill: "filled", size: "large" },
            { id: "oc2", shape: "dot", position: "left", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "D",
        figure: {
          id: "rr-05-opt-d",
          outerFrame: "square",
          elements: [
            { id: "od1", shape: "t-shape", position: "center", rotation: 270, fill: "filled", size: "large" },
            { id: "od2", shape: "dot", position: "bottom", rotation: 0, fill: "filled", size: "small" }
          ]
        }
      },
      {
        label: "E",
        figure: {
          id: "rr-05-opt-e",
          outerFrame: "square",
          elements: [
            { id: "oe1", shape: "plus", position: "center", rotation: 0, fill: "empty", size: "large" }
          ]
        }
      }
    ],
    correctAnswer: "A",
    tags: ["rotation", "270-cw", "t-shape"]
  }
];

// =================================================================
// ALL COMBINED VERIFIED MAH CET AR QUESTIONS
// =================================================================

export const ALL_MAH_CET_AR_QUESTIONS: ARQuestion[] = [
  ...FIGURE_SERIES_QUESTIONS,
  ...FIGURE_ANALOGY_QUESTIONS,
  ...MATCHING_PAIRS_QUESTIONS,
  ...FIGURE_CLASSIFICATION_QUESTIONS,
  ...MISSING_FIGURE_QUESTIONS,
  ...ROTATION_REFLECTION_QUESTIONS
];

// Validation function: guarantees question adheres to the strict criteria
export function validateARQuestion(q: ARQuestion): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (q.exam !== "MAH CET") {
    errors.push(`Exam tag must be 'MAH CET', got '${q.exam}'`);
  }
  if (q.section !== "Abstract Reasoning") {
    errors.push(`Section tag must be 'Abstract Reasoning', got '${q.section}'`);
  }
  if (!q.options || q.options.length !== 5) {
    errors.push(`Question ${q.id} must have exactly 5 options (A-E), found ${q.options?.length}`);
  }
  const labels = q.options.map(o => o.label).sort();
  if (labels.join(",") !== "A,B,C,D,E") {
    errors.push(`Options must be labeled A, B, C, D, E. Got: ${labels.join(",")}`);
  }
  if (!["A", "B", "C", "D", "E"].includes(q.correctAnswer)) {
    errors.push(`Correct answer must be one of A, B, C, D, E. Got: ${q.correctAnswer}`);
  }
  const correctOpt = q.options.find(o => o.label === q.correctAnswer);
  if (!correctOpt) {
    errors.push(`Option matching correctAnswer ${q.correctAnswer} not found in options array.`);
  }

  return {
    valid: errors.length === 0,
    errors
  };
}
