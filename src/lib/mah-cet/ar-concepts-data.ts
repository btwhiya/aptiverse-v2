import { ARConceptGuide } from "./types";

export const MAH_CET_AR_CONCEPTS: ARConceptGuide[] = [
  {
    id: "ar-concept-1",
    number: 1,
    title: "Pattern Sequences",
    category: "Pattern Sequences",
    whatIsThis:
      "A pattern sequence is an ordered visual progression where geometric elements evolve across successive steps according to consistent spatial, count, or cyclic transformation rules.",
    howToSolve: [
      "Track individual components separately rather than attempting to comprehend the entire figure as a whole.",
      "Check cyclic rotation (e.g. 45°, 90°, or 135° clockwise or counter-clockwise).",
      "Observe count increments or decrements (e.g., +1 side, +1 dot, alternating +1/-1).",
      "Identify positional shift patterns (perimeter traversal, corner jumping, center migration)."
    ],
    thinkingMethod:
      "Deconstruct the figure into layers: (1) Primary Outer Shape, (2) Internal Symbols, (3) Shading/Texture, and (4) Peripheral Indicators (dots, arrows). Map each layer's independent timeline.",
    commonTraps: [
      "Assuming a clockwise motion when the element is actually bouncing back and forth between two positions.",
      "Overlooking alternating patterns (where odd steps follow rule X and even steps follow rule Y).",
      "Relying on color alone; MAH CET tests structural logic and orientation."
    ],
    mahCetPerspective:
      "MAH CET allocates 25 questions specifically to Abstract Reasoning. Pattern sequences typically comprise 5 to 7 questions where speed (under 35 seconds per question) and error-free layer tracking are critical.",
    visualExample: {
      title: "Clockwise Corner Hop with Side Count Progression",
      beforeFigure: {
        id: "ex1-before",
        label: "Figure 1",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "triangle", position: "top-left", rotation: 0, fill: "filled", size: "medium" },
          { id: "e2", shape: "dot", position: "bottom-right", rotation: 0, fill: "filled", size: "small" }
        ]
      },
      transformationRule: "Shape rotates 90° clockwise to adjacent corner while dot increments by +1 in opposing corner.",
      afterFigure: {
        id: "ex1-after",
        label: "Figure 2",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "triangle", position: "top-right", rotation: 90, fill: "filled", size: "medium" },
          { id: "e2", shape: "dot", position: "bottom-left", rotation: 0, fill: "filled", size: "small" },
          { id: "e3", shape: "dot", position: "top-left", rotation: 0, fill: "filled", size: "small" }
        ]
      },
      whyOptimal:
        "Isolating the triangle's clockwise corner trajectory and the dots' count sequence immediately eliminates 4 out of 5 options without ambiguity."
    }
  },
  {
    id: "ar-concept-2",
    number: 2,
    title: "Figure Series",
    category: "Figure Series",
    whatIsThis:
      "Figure series questions present 4 or 5 sequential frames (Figure 1 → 2 → 3 → 4 → 5). Candidates must deduce the multi-variable governing rule to determine the missing final frame from options A through E.",
    howToSolve: [
      "Number the positions or quadrant sectors (1 to 8 in an octagonal compass layout).",
      "Check for arithmetic step length progression (e.g., advances 1 step, then 2 steps, then 3 steps).",
      "Verify whether elements toggle between inverted and upright states on consecutive steps.",
      "Check for deletion/addition of peripheral pins or strokes."
    ],
    thinkingMethod:
      "Formulate a state table: Frame 1 → Frame 2 → Frame 3. Write down: Direction: CW? Step: +1, +2, +3? State: Hollow -> Striped -> Solid?",
    commonTraps: [
      "Distractor figures often match the position of an element but fail its rotation or shading condition.",
      "Failing to check the second or third variable after spotting a prominent rotation."
    ],
    mahCetPerspective:
      "Figure Series is the bedrock of MAH CET Abstract Reasoning. Historically, 6 to 8 questions in every CET exam slot test this archetype.",
    visualExample: {
      title: "Central Shape Inversion & Shading Cycle",
      beforeFigure: {
        id: "ex2-before",
        label: "Step 3",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "arrow", position: "center", rotation: 180, fill: "empty", size: "large" },
          { id: "e2", shape: "star", position: "top", rotation: 0, fill: "filled", size: "small" }
        ]
      },
      transformationRule: "Central arrow rotates 90° CW and flips fill state (empty <-> filled); orbital star advances 90° CW.",
      afterFigure: {
        id: "ex2-after",
        label: "Step 4",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "arrow", position: "center", rotation: 270, fill: "filled", size: "large" },
          { id: "e2", shape: "star", position: "right", rotation: 45, fill: "filled", size: "small" }
        ]
      },
      whyOptimal:
        "The arrow turns from pointing downwards (180°) to pointing left (270°) and fills up completely, providing deterministic verification."
    }
  },
  {
    id: "ar-concept-3",
    number: 3,
    title: "Image Sequences",
    category: "Figure Series",
    whatIsThis:
      "Image sequences involve complex composite figures composed of multiple interacting geometric symbols shifting simultaneously under cyclic permutations.",
    howToSolve: [
      "Track the replacement rule: does an element disappear and get replaced by an entirely new symbol?",
      "Observe diagonal swapping: do corner elements exchange positions across the diagonals?",
      "Detect cyclic clockwise perimeter exchange where Top-Left goes to Top-Right, Top-Right goes to Bottom-Right, etc."
    ],
    thinkingMethod:
      "Assign coordinates: TL, TR, BL, BR, and C. Identify which coordinate is the generator (new symbol appears) and which is the terminator (symbol leaves the frame).",
    commonTraps: [
      "Confusing new symbols with rotated existing symbols (e.g., a diamond rotated 45° is a square).",
      "Missing symmetric inversions across vertical or horizontal frame axes."
    ],
    mahCetPerspective:
      "Speed tests here rely on candidate recognition of standard 4-corner permutation cycles that appear frequently in state CET papers.",
    visualExample: {
      title: "Corner Permutation & New Element Injection",
      beforeFigure: {
        id: "ex3-before",
        label: "Frame A",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "circle", position: "top-left", rotation: 0, fill: "filled", size: "medium" },
          { id: "e2", shape: "square", position: "top-right", rotation: 0, fill: "empty", size: "medium" },
          { id: "e3", shape: "triangle", position: "bottom-left", rotation: 0, fill: "filled", size: "medium" }
        ]
      },
      transformationRule: "All elements rotate 1 slot CW around corners; oldest element (bottom-left) vanishes, replaced by a diamond at center.",
      afterFigure: {
        id: "ex3-after",
        label: "Frame B",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "circle", position: "top-right", rotation: 0, fill: "filled", size: "medium" },
          { id: "e2", shape: "square", position: "bottom-right", rotation: 0, fill: "empty", size: "medium" },
          { id: "e4", shape: "diamond", position: "center", rotation: 0, fill: "half-filled", size: "medium" }
        ]
      },
      whyOptimal:
        "Tracking the circle moving from top-left to top-right instantly rules out incorrect distractors."
    }
  },
  {
    id: "ar-concept-4",
    number: 4,
    title: "Matching Image Pairs",
    category: "Matching Image Pairs",
    whatIsThis:
      "A reference pair of figures (Figure 1 → Figure 2) demonstrates a specific transformation. Candidates must identify which option pair (A → B) demonstrates the exact same transformation relationship.",
    howToSolve: [
      "Extract the precise transformation operator: Operator = { Rotation, Reflection, Shading Swap, Element Count }.",
      "Check relative internal geometry: did the inner shape become the outer frame and vice versa?",
      "Verify whether the transformation maintains chirality (handedness) or mirrors it.",
      "Apply the operator to each option pair until one satisfies all sub-rules simultaneously."
    ],
    thinkingMethod:
      "Write the transformation sentence: 'Inner shape grows into outer container, outer shape shrinks into inner filled element, and rotates 45°'.",
    commonTraps: [
      "Selecting an option where the individual shapes are similar to the reference, but the transformation operation itself is inverted or incomplete.",
      "Failing to observe that shading transferred from inner to outer component."
    ],
    mahCetPerspective:
      "Matching Image Pairs test meta-reasoning: you are not solving for a missing figure, but matching functional transformations.",
    visualExample: {
      title: "Nested Geometry Inversion with Shading Handover",
      beforeFigure: {
        id: "ex4-before",
        label: "Pair Ref 1",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "square", position: "center", rotation: 0, fill: "empty", size: "large" },
          { id: "e2", shape: "circle", position: "center", rotation: 0, fill: "filled", size: "small" }
        ]
      },
      transformationRule: "Inner circle expands into the outer container; outer square shrinks to the center and becomes filled.",
      afterFigure: {
        id: "ex4-after",
        label: "Pair Ref 2",
        outerFrame: "circle",
        elements: [
          { id: "e1", shape: "circle", position: "center", rotation: 0, fill: "empty", size: "large" },
          { id: "e2", shape: "square", position: "center", rotation: 0, fill: "filled", size: "small" }
        ]
      },
      whyOptimal:
        "The clear role-reversal between host and nested shapes provides a distinctive mathematical signature."
    }
  },
  {
    id: "ar-concept-5",
    number: 5,
    title: "Figure Analogies",
    category: "Figure Analogies",
    whatIsThis:
      "Visual Analogies follow the classical proportion formula: Figure A : Figure B :: Figure C : [?]. The student must discern the exact visual mapping rule between A and B, then rigorously apply it to C to yield D.",
    howToSolve: [
      "Identify the relation between A and B across 3 axes: Structural (edges/vertices), Spatial (rotation/shift), and Textural (fill/shading).",
      "Synthesize the transformation rule into a strict rule statement.",
      "Apply the rule systematically to Figure C.",
      "Compare the synthesized target figure against options A through E."
    ],
    thinkingMethod:
      "Think of A → B as a mathematical function f(A) = B. Your goal is to compute f(C) without any extraneous additions or omissions.",
    commonTraps: [
      "Selecting an option that matches Figure B rather than applying the transformation to Figure C.",
      "Misinterpreting a 180° rotation as a mirror reflection when asymmetric details are present."
    ],
    mahCetPerspective:
      "Figure analogies in CET are designed to be high-accuracy, 25-second scoring questions for prepared candidates.",
    visualExample: {
      title: "Vertex Truncation & Lateral Mirror Reflection",
      beforeFigure: {
        id: "ex5-before",
        label: "Figure A",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "triangle", position: "center", rotation: 0, fill: "empty", size: "large" },
          { id: "e2", shape: "arrow", position: "right", rotation: 90, fill: "filled", size: "small" }
        ]
      },
      transformationRule: "Outer shape gains 1 side (+1 vertex: Triangle -> Square) and arrow mirrors horizontally to left pointing opposite.",
      afterFigure: {
        id: "ex5-after",
        label: "Figure B",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "square", position: "center", rotation: 0, fill: "empty", size: "large" },
          { id: "e2", shape: "arrow", position: "left", rotation: 270, fill: "filled", size: "small" }
        ]
      },
      whyOptimal:
        "Increasing vertices by 1 while flipping lateral accessories creates an unambiguous deterministic analogical relationship."
    }
  },
  {
    id: "ar-concept-6",
    number: 6,
    title: "Visual Analogies",
    category: "Figure Analogies",
    whatIsThis:
      "Visual analogies test subtle spatial-geometric relationships where figures undergo proportional scaling, axis inversion, and sector rotation.",
    howToSolve: [
      "Count total straight and curved lines in each figure.",
      "Observe if closed shapes become open shapes or if open curves become enclosed polygons.",
      "Look for line intersection counts (e.g. 2 crossing lines -> 3 crossing lines)."
    ],
    thinkingMethod:
      "Focus on topological invariants: number of enclosed regions (Euler characteristic), intersection points, and free line ends.",
    commonTraps: [
      "Overlooking line ends or arrows that reversed direction.",
      "Ignoring slight changes in orientation (e.g., 45° vs 90°)."
    ],
    mahCetPerspective:
      "Tests the student's ability to maintain composure under strict time pressure when figures share high visual similarity.",
    visualExample: {
      title: "Topological Enclosure to Linear Decomposition",
      beforeFigure: {
        id: "ex6-before",
        label: "Analogy A",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "diamond", position: "center", rotation: 0, fill: "striped", size: "large" }
        ]
      },
      transformationRule: "Enclosed shape decomposes into its 4 constituent perimeter lines, rotating 45°.",
      afterFigure: {
        id: "ex6-after",
        label: "Analogy B",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "cross", position: "center", rotation: 45, fill: "filled", size: "large" }
        ]
      },
      whyOptimal:
        "The transformation preserves the 4-fold symmetry while altering internal topology from perimeter loop to diagonal cross."
    }
  },
  {
    id: "ar-concept-7",
    number: 7,
    title: "Odd Figure Out",
    category: "Figure Classification",
    whatIsThis:
      "Five candidate figures are shown. Four figures adhere to a strict geometric, structural, or symmetry constraint, while exactly one figure violates this invariant property.",
    howToSolve: [
      "Check line/side counts for each figure.",
      "Check rotational equivalence: can 4 of the figures be obtained by merely rotating one another, while the 5th is a mirror image (chirality difference)?",
      "Check number of acute vs. obtuse angles or open vs. closed regions.",
      "Examine symmetry axes: are 4 figures horizontally symmetric while one is asymmetric?"
    ],
    thinkingMethod:
      "Never look for what makes one figure 'special' in isolation. Look for the common property shared by at least THREE figures first, check the fourth, and confirm the fifth violates it.",
    commonTraps: [
      "Selecting an option based on an arbitrary cosmetic detail rather than a fundamental geometric property.",
      "Confusing rotation with reflection (chirality reversal is the #1 odd-one-out trap in MAH CET)."
    ],
    mahCetPerspective:
      "Classification questions reward rapid disqualification. Checking symmetry or side parity usually cracks the question in 15 seconds.",
    visualExample: {
      title: "Rotational Invariance vs Lateral Chiral Inversion",
      beforeFigure: {
        id: "ex7-before",
        label: "Group Norm (1-4)",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "l-shape", position: "center", rotation: 0, fill: "filled", size: "large" }
        ]
      },
      transformationRule: "Four figures are 90°, 180°, and 270° rotations of an L-shape. The odd figure is reflected (reversed foot).",
      afterFigure: {
        id: "ex7-after",
        label: "Odd Figure (5)",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "l-shape", position: "center", rotation: 180, fill: "striped", size: "large" }
        ]
      },
      whyOptimal:
        "Non-superimposable mirror reflections cannot be achieved through planar rotation, proving structural deviation."
    }
  },
  {
    id: "ar-concept-8",
    number: 8,
    title: "Figure Classification",
    category: "Figure Classification",
    whatIsThis:
      "Advanced figure classification evaluates grouping logic where multiple elements interact within each frame, testing ratio of shaded components, number of line intersections, or relative directional alignments.",
    howToSolve: [
      "Tabulate counts: number of components, arrows pointing clockwise vs anticlockwise.",
      "Evaluate relative positions: is dot always to the left of the arrow?",
      "Test parity of elements: odd vs even number of segments."
    ],
    thinkingMethod:
      "Create a binary classification checklist: [Parallel lines?], [Even dots?], [Arrow points away from center?].",
    commonTraps: [
      "Assuming the odd figure must be the most complex one.",
      "Stopping after noticing one difference without verifying that the other 4 figures are genuinely identical in that attribute."
    ],
    mahCetPerspective:
      "MAH CET uses figure classification to reward candidates with disciplined systematic verification over intuitive guessing.",
    visualExample: {
      title: "Peripheral Dot Parity Invariant",
      beforeFigure: {
        id: "ex8-before",
        label: "Standard Group (Even)",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "hexagon", position: "center", rotation: 0, fill: "empty", size: "large" },
          { id: "e2", shape: "dot", position: "top", rotation: 0, fill: "filled", size: "small" },
          { id: "e3", shape: "dot", position: "bottom", rotation: 0, fill: "filled", size: "small" }
        ]
      },
      transformationRule: "All standard figures have an even number of satellite dots (2 or 4). The odd figure has an odd number (3).",
      afterFigure: {
        id: "ex8-after",
        label: "Odd Figure (Odd Parity)",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "hexagon", position: "center", rotation: 0, fill: "empty", size: "large" },
          { id: "e2", shape: "dot", position: "top", rotation: 0, fill: "filled", size: "small" },
          { id: "e3", shape: "dot", position: "bottom-left", rotation: 0, fill: "filled", size: "small" },
          { id: "e4", shape: "dot", position: "bottom-right", rotation: 0, fill: "filled", size: "small" }
        ]
      },
      whyOptimal:
        "Counting dots is objective, instant, and leaves zero margin for subjective debate."
    }
  },
  {
    id: "ar-concept-9",
    number: 9,
    title: "Image Transformation",
    category: "Rotation & Reflection",
    whatIsThis:
      "Image transformation examines sequential spatial operations: translation across axes, scaling, morphing of perimeter curves into polygons, and folding along planar seams.",
    howToSolve: [
      "Determine if the transformation is isometric (distance-preserving: rotation, translation, reflection) or affine (dilation, shearing).",
      "Trace the trajectory of vertex coordinates.",
      "Check if internal contents retain their relative anchor positions during the transformation."
    ],
    thinkingMethod:
      "Mentally anchor one prominent corner (e.g. top-left) and track its coordinate vector across the transformation.",
    commonTraps: [
      "Confusing an internal flip with an overall whole-figure rotation.",
      "Neglecting changes in stroke thickness or pattern direction."
    ],
    mahCetPerspective:
      "Understanding coordinate translation allows CET aspirants to solve multi-stage transformation questions in seconds.",
    visualExample: {
      title: "Radial Dilation & Interior Inversion",
      beforeFigure: {
        id: "ex9-before",
        label: "Initial State",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "circle", position: "center", rotation: 0, fill: "empty", size: "small" },
          { id: "e2", shape: "plus", position: "center", rotation: 0, fill: "filled", size: "medium" }
        ]
      },
      transformationRule: "Circle dilates to large frame; internal plus rotates 45° to become a cross and changes to striped fill.",
      afterFigure: {
        id: "ex9-after",
        label: "Transformed State",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "circle", position: "center", rotation: 0, fill: "empty", size: "large" },
          { id: "e2", shape: "cross", position: "center", rotation: 45, fill: "striped", size: "small" }
        ]
      },
      whyOptimal:
        "Clear size inversion combined with a 45° rotation creates an unmistakably validated state."
    }
  },
  {
    id: "ar-concept-10",
    number: 10,
    title: "Rotation-based Reasoning",
    category: "Rotation & Reflection",
    whatIsThis:
      "Questions that test rotational orientation evaluate a candidate's mental rotation skills across 45°, 90°, 135°, 180°, and 270° clockwise or counter-clockwise angles.",
    howToSolve: [
      "Pick an asymmetric marker inside the figure (an arrow tip, a flag, or a notched corner).",
      "Treat the figure like a clock face: 12 o'clock (0°), 3 o'clock (90°), 6 o'clock (180°), 9 o'clock (270°).",
      "Determine direction (Clockwise vs Anticlockwise) and angular displacement per step."
    ],
    thinkingMethod:
      "Use clock numbers for angles: +3 hours = 90° CW; -1.5 hours = 45° ACW. Arithmetic clock math eliminates spatial orientation errors.",
    commonTraps: [
      "Failing to recognize that a 270° clockwise rotation is identical to a 90° anticlockwise rotation.",
      "Confusing a 180° rotation with a mirror reflection of an asymmetric shape."
    ],
    mahCetPerspective:
      "Speed is won or lost here. Translating geometric angles into clock hours avoids mental fatigue over 25 questions.",
    visualExample: {
      title: "135° Clockwise Stepped Angular Rotation",
      beforeFigure: {
        id: "ex10-before",
        label: "Angle 0° (North)",
        outerFrame: "circle",
        elements: [
          { id: "e1", shape: "arrow", position: "center", rotation: 0, fill: "filled", size: "large" }
        ]
      },
      transformationRule: "Arrow rotates 135° clockwise (from 12 o'clock to 4:30 position).",
      afterFigure: {
        id: "ex10-after",
        label: "Angle 135° (South-East)",
        outerFrame: "circle",
        elements: [
          { id: "e1", shape: "arrow", position: "center", rotation: 135, fill: "filled", size: "large" }
        ]
      },
      whyOptimal:
        "The distinct diagonal heading (South-East) immediately singles out the correct rotation from orthogonal distractors."
    }
  },
  {
    id: "ar-concept-11",
    number: 11,
    title: "Reflection / Mirror Patterns",
    category: "Rotation & Reflection",
    whatIsThis:
      "Mirror reflections involve flipping a figure across a vertical mirror line (left-right inversion). Left becomes right and right becomes left, while vertical height (top-bottom) remains strictly unchanged.",
    howToSolve: [
      "Imagine a vertical mirror line placed to the right or left of the original figure.",
      "Points closest to the mirror line stay closest to the mirror in the reflected image.",
      "Top remains Top; Bottom remains Bottom. Only Left and Right invert."
    ],
    thinkingMethod:
      "Apply the proximity rule: 'Near the mirror stays near; far from the mirror stays far.'",
    commonTraps: [
      "Inverting the top and bottom (which is a water image, not a lateral mirror image).",
      "Confusing a 180° planar rotation with a lateral mirror reflection."
    ],
    mahCetPerspective:
      "Lateral mirror reflection questions frequently feature alphabets, asymmetric polygons, or off-center arrows.",
    visualExample: {
      title: "Lateral Mirror Inversion Across Vertical Axis",
      beforeFigure: {
        id: "ex11-before",
        label: "Object Figure",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "crescent", position: "left", rotation: 0, fill: "filled", size: "medium" },
          { id: "e2", shape: "arrow", position: "right", rotation: 90, fill: "empty", size: "medium" }
        ]
      },
      transformationRule: "Reflected across vertical mirror plane: crescent shifts from left to right facing opposite, arrow shifts to left pointing left.",
      afterFigure: {
        id: "ex11-after",
        label: "Mirror Image",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "crescent", position: "right", rotation: 180, fill: "filled", size: "medium" },
          { id: "e2", shape: "arrow", position: "left", rotation: 270, fill: "empty", size: "medium" }
        ]
      },
      whyOptimal:
        "Shows both position swap and intrinsic feature orientation inversion required by optical laws."
    }
  },
  {
    id: "ar-concept-12",
    number: 12,
    title: "Water Image Patterns",
    category: "Rotation & Reflection",
    whatIsThis:
      "Water images represent horizontal axis reflections (mirror placed along the base). Top becomes bottom and bottom becomes top, while lateral direction (left-right) remains completely unchanged.",
    howToSolve: [
      "Place the reflection axis horizontally beneath the figure.",
      "Features at the top of the object appear at the very bottom of the reflection.",
      "Left-hand elements stay strictly on the left; right-hand elements stay strictly on the right."
    ],
    thinkingMethod:
      "Rule of Water Inversion: Y-coordinates invert across the midline (Y' = -Y); X-coordinates remain unaltered (X' = X).",
    commonTraps: [
      "Flipping the left and right sides (mixing up mirror reflection with water reflection).",
      "Forgetting that asymmetrical vertical shapes turn completely upside down."
    ],
    mahCetPerspective:
      "MAH CET often presents a composite shape with both vertical and horizontal arrows to test candidate precision in differentiating water images from mirror images.",
    visualExample: {
      title: "Top-to-Bottom Water Surface Reflection",
      beforeFigure: {
        id: "ex12-before",
        label: "Above Water",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "triangle", position: "top", rotation: 0, fill: "filled", size: "medium" },
          { id: "e2", shape: "dot", position: "bottom-left", rotation: 0, fill: "filled", size: "small" }
        ]
      },
      transformationRule: "Reflected across horizontal ground plane: top triangle flips to bottom pointing down; dot remains on left side at top.",
      afterFigure: {
        id: "ex12-after",
        label: "Water Image",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "triangle", position: "bottom", rotation: 180, fill: "filled", size: "medium" },
          { id: "e2", shape: "dot", position: "top-left", rotation: 0, fill: "filled", size: "small" }
        ]
      },
      whyOptimal:
        "The triangle points downward in the bottom half while the dot remains on the left half, directly validating water optics."
    }
  },
  {
    id: "ar-concept-13",
    number: 13,
    title: "Figure Completion",
    category: "Missing Figure",
    whatIsThis:
      "A large symmetrical diagram has one missing quadrant (usually the bottom-right or top-right). The candidate must choose the exact sector piece that restores global structural harmony.",
    howToSolve: [
      "Identify the overall pattern symmetry: 4-fold rotational symmetry or bilateral reflection symmetry across diagonal axes.",
      "Project lines from adjacent quadrants into the vacant space.",
      "Check concentric arcs, intersecting diagonals, and shaded quadrants."
    ],
    thinkingMethod:
      "Mentally fold the opposite quadrant into the blank quadrant. If diagonally opposite, apply a 180° rotation or double reflection.",
    commonTraps: [
      "Selecting a piece that has the right elements but in the wrong corner quadrant.",
      "Missing the curvature direction of concentric quarter-circle arcs."
    ],
    mahCetPerspective:
      "Figure completion provides rapid points in MAH CET if you follow the line continuation method.",
    visualExample: {
      title: "Quarter Sector Completion via Diagonal Symmetry",
      beforeFigure: {
        id: "ex13-before",
        label: "Quadrant Complete",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "cross", position: "center", rotation: 0, fill: "empty", size: "large" },
          { id: "e2", shape: "dot", position: "top-left", rotation: 0, fill: "filled", size: "small" }
        ]
      },
      transformationRule: "Diagonally opposite quadrant mirrors the dot to bottom-right while line continuity is preserved.",
      afterFigure: {
        id: "ex13-after",
        label: "Opposing Quadrant",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "cross", position: "center", rotation: 0, fill: "empty", size: "large" },
          { id: "e2", shape: "dot", position: "bottom-right", rotation: 0, fill: "filled", size: "small" }
        ]
      },
      whyOptimal:
        "Guarantees that the composite 4-quadrant mandala maintains balance across both diagonals."
    }
  },
  {
    id: "ar-concept-14",
    number: 14,
    title: "Missing Figure",
    category: "Missing Figure",
    whatIsThis:
      "A 3×3 matrix of figures where one cell (usually Row 3, Column 3 or Row 2, Column 3) contains a question mark '?'. Candidates must uncover simultaneous horizontal and vertical mathematical/visual rules.",
    howToSolve: [
      "Test Row-wise rules: Row 1 establishes rule, Row 2 verifies rule, Row 3 applies rule.",
      "Test Column-wise rules: Col 1 establishes, Col 2 verifies, Col 3 applies.",
      "Common rules: Set union (XOR/OR of lines), shape rotation (+45° per column), count conservation (each row has 1 circle, 1 square, 1 triangle)."
    ],
    thinkingMethod:
      "Latin Square check: Does each row have one triangle, one square, one circle? Does each row have one solid, one striped, one hollow shape? If yes, solve by elimination in 10 seconds.",
    commonTraps: [
      "Assuming the rule is strictly row-wise when the pattern is actually a diagonal cascade or column-wise progression.",
      "Overlooking line cancellation (XOR logic where overlapping lines disappear)."
    ],
    mahCetPerspective:
      "3×3 Matrix reasoning questions are signature MAH CET problems testing multi-dimensional pattern tracking.",
    visualExample: {
      title: "Latin Square Shape Distribution with Shading Shift",
      beforeFigure: {
        id: "ex14-before",
        label: "Row 1 (Circle, Sq, Tri)",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "circle", position: "center", rotation: 0, fill: "filled", size: "medium" }
        ]
      },
      transformationRule: "Every row must contain one circle, one square, and one triangle with unique fill styles (filled, striped, empty).",
      afterFigure: {
        id: "ex14-after",
        label: "Row 3 Missing (Triangle)",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "triangle", position: "center", rotation: 0, fill: "striped", size: "medium" }
        ]
      },
      whyOptimal:
        "The Latin Square constraint deterministically isolates the exact missing geometric properties."
    }
  },
  {
    id: "ar-concept-15",
    number: 15,
    title: "Embedded Figures",
    category: "Embedded Figures",
    whatIsThis:
      "A target simple geometric figure (X) is hidden within one of four or five intricate complex figures. The candidate must find the figure containing X exactly as oriented without altering proportions.",
    howToSolve: [
      "Memorize the key angle (e.g. 60° acute junction or Z-profile).",
      "Scan each complex figure specifically for that anchor angle.",
      "Confirm that lines forming the target shape are unbroken and do not rely on imagined connections."
    ],
    thinkingMethod:
      "Treat the target shape as a transparent stencil. Mentally slide the stencil over the complex options to locate an exact match.",
    commonTraps: [
      "Selecting an option where the shape is present but scaled with distorted aspect ratio.",
      "Accepting an inverted or rotated version when the question specifies non-rotated embedding."
    ],
    mahCetPerspective:
      "Tests visual acuity and spatial filtering—separating signal (target) from visual noise (distractor mesh).",
    visualExample: {
      title: "Z-Shape Anchor Embedded within Lattice",
      beforeFigure: {
        id: "ex15-before",
        label: "Target Shape (X)",
        outerFrame: "none",
        elements: [
          { id: "e1", shape: "arrow", position: "center", rotation: 45, fill: "filled", size: "medium" }
        ]
      },
      transformationRule: "Target arrow is embedded at exact 45° orientation inside a triangular housing.",
      afterFigure: {
        id: "ex15-after",
        label: "Embedded Complex Figure",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "triangle", position: "center", rotation: 0, fill: "empty", size: "large" },
          { id: "e2", shape: "arrow", position: "center", rotation: 45, fill: "filled", size: "medium" }
        ]
      },
      whyOptimal:
        "The exact preservation of the 45° angle inside the enclosing polygon confirms the solution."
    }
  },
  {
    id: "ar-concept-16",
    number: 16,
    title: "Shape Relationships",
    category: "Figure Analogies",
    whatIsThis:
      "Examines relationships between concentric, intersecting, or adjacent figures: containment, intersection area, relative size, and geometric hierarchy.",
    howToSolve: [
      "Count the number of vertices for the outer shape vs inner shape (e.g., N vertices outside, N-1 inside).",
      "Check if the shared intersection region is shaded or cleared.",
      "Identify parent-child relationships between enclosing containers and internal components."
    ],
    thinkingMethod:
      "Express relationships mathematically: Outer_Vertices = Inner_Vertices + 1, or Shading = (Shape_A ∩ Shape_B).",
    commonTraps: [
      "Focusing on the shapes themselves while missing the rule governing their intersection area.",
      "Assuming shapes are touching when there is a deliberate gap."
    ],
    mahCetPerspective:
      "MAH CET frequently pairs vertex difference rules with inner shading to construct clean 2-step analogy questions.",
    visualExample: {
      title: "Enclosure with Vertices Decrement (N -> N-1)",
      beforeFigure: {
        id: "ex16-before",
        label: "Pentagon with Square",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "pentagon", position: "center", rotation: 0, fill: "empty", size: "large" },
          { id: "e2", shape: "square", position: "center", rotation: 0, fill: "filled", size: "small" }
        ]
      },
      transformationRule: "Outer 5-gon houses filled 4-gon (N -> N-1). Analogous to Square (4-gon) housing Triangle (3-gon).",
      afterFigure: {
        id: "ex16-after",
        label: "Square with Triangle",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "square", position: "center", rotation: 0, fill: "empty", size: "large" },
          { id: "e2", shape: "triangle", position: "center", rotation: 0, fill: "filled", size: "small" }
        ]
      },
      whyOptimal:
        "The N to N-1 vertex containment invariant is preserved with mathematical rigor."
    }
  },
  {
    id: "ar-concept-17",
    number: 17,
    title: "Position/Movement Patterns",
    category: "Pattern Sequences",
    whatIsThis:
      "Questions where elements navigate across predetermined tracks (perimeter paths, star diagonals, or 8-point compass grids).",
    howToSolve: [
      "Map out the 8 primary track coordinates: N, NE, E, SE, S, SW, W, NW.",
      "Calculate step size: +1 step (45°), +2 steps (90°), +3 steps (135°).",
      "Determine if the step displacement increases arithmetically (+1, +2, +3, +4 steps) or remains constant."
    ],
    thinkingMethod:
      "Number the 8 perimeter positions 1 through 8 clockwise. A step pattern like 1 -> 2 -> 4 -> 7 -> 3 reveals an increasing step sequence (+1, +2, +3, +4 mod 8).",
    commonTraps: [
      "Failing to account for modulo arithmetic when an element wraps around the corner.",
      "Missing a direction reversal after an element reaches an edge."
    ],
    mahCetPerspective:
      "Modulo track arithmetic is one of the most reliable shortcuts in MAH CET Abstract Reasoning.",
    visualExample: {
      title: "Perimeter Octagon Jump (+1, +2, +3 Progression)",
      beforeFigure: {
        id: "ex17-before",
        label: "Pos 1 (Top-Left)",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "dot", position: "top-left", rotation: 0, fill: "filled", size: "medium" }
        ]
      },
      transformationRule: "Dot advances +2 steps along perimeter clockwise: Top-Left -> Top-Right.",
      afterFigure: {
        id: "ex17-after",
        label: "Pos 3 (Top-Right)",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "dot", position: "top-right", rotation: 0, fill: "filled", size: "medium" }
        ]
      },
      whyOptimal:
        "The clockwise advancement along corner nodes follows a consistent spatial step count."
    }
  },
  {
    id: "ar-concept-18",
    number: 18,
    title: "Combination of Figures",
    category: "Matching Image Pairs",
    whatIsThis:
      "Two or more separate constituent figures are superimposed, merged, or combined according to boolean operations (Union, Intersection, XOR).",
    howToSolve: [
      "Superimpose Figure 1 directly on top of Figure 2.",
      "Examine overlapping boundary lines: do common lines stay or vanish?",
      "XOR rule: lines present in only one figure appear in the combination; lines present in both cancel out."
    ],
    thinkingMethod:
      "Think in digital logic: Result = (A OR B) for simple overlay; Result = (A XOR B) for overlapping line elimination.",
    commonTraps: [
      "Retaining shared lines when the governing rule is XOR cancellation.",
      "Forgetting to rotate one of the constituent figures before merging."
    ],
    mahCetPerspective:
      "XOR figure combination questions appear regularly in MAH CET mock papers and actual exam slots.",
    visualExample: {
      title: "Direct Superposition with Common Line Cancellation (XOR)",
      beforeFigure: {
        id: "ex18-before",
        label: "Input Figures (Cross + Diamond)",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "cross", position: "center", rotation: 0, fill: "empty", size: "large" }
        ]
      },
      transformationRule: "Cross is superimposed onto a diamond frame to form an 8-pointed star rosette.",
      afterFigure: {
        id: "ex18-after",
        label: "Combined Rosette",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "star", position: "center", rotation: 0, fill: "filled", size: "large" }
        ]
      },
      whyOptimal:
        "Merging the symmetrical geometry creates an unmistakable 8-pointed star compound."
    }
  },
  {
    id: "ar-concept-19",
    number: 19,
    title: "Counting/Visual Properties",
    category: "Figure Classification",
    whatIsThis:
      "Problems governed by quantitative visual metrics: total line segments, right angles, acute angles, closed regions, dots, or line intersections.",
    howToSolve: [
      "Count straight lines systematically (horizontal first, vertical second, slanting third).",
      "Count closed interior loops (Euler regions).",
      "Check for parity: are counts even, odd, or prime numbers?"
    ],
    thinkingMethod:
      "Tabulate visual properties into numbers. Abstract geometric puzzles often reduce to basic arithmetic number series.",
    commonTraps: [
      "Double-counting overlapping line segments.",
      "Overlooking collinear line segments that form a single continuous straight line."
    ],
    mahCetPerspective:
      "Converts visual reasoning into rapid mental arithmetic, enabling confident 10-second solutions.",
    visualExample: {
      title: "Line Segment Count Progression (3 -> 4 -> 5)",
      beforeFigure: {
        id: "ex19-before",
        label: "Triangle (3 Lines)",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "triangle", position: "center", rotation: 0, fill: "empty", size: "large" }
        ]
      },
      transformationRule: "Line segment count increases by exactly +1 per step: 3 lines -> 4 lines (Square).",
      afterFigure: {
        id: "ex19-after",
        label: "Square (4 Lines)",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "square", position: "center", rotation: 0, fill: "empty", size: "large" }
        ]
      },
      whyOptimal:
        "The strict arithmetic addition of boundary edges provides unambiguous progression."
    }
  },
  {
    id: "ar-concept-20",
    number: 20,
    title: "Complex Figure Sequences",
    category: "Figure Series",
    whatIsThis:
      "High-difficulty MAH CET figure sequences involving 3 or more simultaneous variables: alternating cyclic movement, periodic inversion, and rotational acceleration.",
    howToSolve: [
      "Identify the 3 independent rules: Rule A (Rotation), Rule B (Position Shift), Rule C (Shading/Count).",
      "Check alternating frames: does Frame 1 connect to Frame 3 and 5, while Frame 2 connects to Frame 4?",
      "Use process of elimination: Rule A eliminates 2 options; Rule B eliminates 2 more; Rule C confirms the unique answer."
    ],
    thinkingMethod:
      "Don't try to synthesize the full answer in your head. Use the 'Eliminate by Attribute' pipeline: Attribute 1 -> discard; Attribute 2 -> discard; Attribute 3 -> win.",
    commonTraps: [
      "Getting overwhelmed by visual density; complex figures are just 3 simple rules superimposed.",
      "Forgetting to check the alternating cadence (odd frames vs even frames)."
    ],
    mahCetPerspective:
      "This is where candidates distinguish themselves in the 99.5+ percentile bracket in MAH CET.",
    visualExample: {
      title: "Tri-Variable Cascade: Orbit, Spin, and Texture Inversion",
      beforeFigure: {
        id: "ex20-before",
        label: "Complex Step 3",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "diamond", position: "top", rotation: 0, fill: "filled", size: "medium" },
          { id: "e2", shape: "arrow", position: "center", rotation: 90, fill: "empty", size: "medium" },
          { id: "e3", shape: "dot", position: "bottom-left", rotation: 0, fill: "filled", size: "small" }
        ]
      },
      transformationRule: "Diamond orbits 90° CW to Right; arrow rotates 90° CW to 180° and fills; dot advances diagonally to Top-Right.",
      afterFigure: {
        id: "ex20-after",
        label: "Complex Step 4",
        outerFrame: "square",
        elements: [
          { id: "e1", shape: "diamond", position: "right", rotation: 45, fill: "filled", size: "medium" },
          { id: "e2", shape: "arrow", position: "center", rotation: 180, fill: "filled", size: "medium" },
          { id: "e3", shape: "dot", position: "top-right", rotation: 0, fill: "filled", size: "small" }
        ]
      },
      whyOptimal:
        "All 3 simultaneous coordinates advance strictly according to their defined sub-rules."
    }
  }
];
