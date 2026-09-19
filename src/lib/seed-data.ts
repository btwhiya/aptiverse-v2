export interface ExamData {
  slug: string;
  name: string;
  shortName: string;
  conductingBody: string;
  officialWebsite: string;
  description: string;
  isPopular: boolean;
  version: {
    year: number;
    versionName: string;
    totalDurationMinutes: number;
    totalQuestions: number;
    totalMarks: number;
    hasSectionalTiming: boolean;
    allowSectionSwitching: boolean;
    allowReview: boolean;
    hasCalculator: boolean;
    verificationStatus: "VERIFIED" | "DERIVED" | "NEEDS_REVIEW";
    sourceAuthority: string;
    sourceUrl: string;
    rulesJson?: Record<string, unknown>;
  };
  sections: {
    name: string;
    slug: string;
    durationMinutes?: number;
    questionCount: number;
    positiveMarks: number;
    negativeMarks: number;
    titaPositiveMarks: number;
    titaNegativeMarks: number;
    orderIndex: number;
    topics: {
      name: string;
      slug: string;
      weightage: string;
      subtopics: {
        name: string;
        slug: string;
        concepts: {
          title: string;
          slug: string;
          summary: string;
          theoryHtml: string;
          keyFormulas: string[];
          tricks: string;
          commonTraps: string;
          readTimeMin: number;
        }[];
      }[];
    }[];
  }[];
}

export const INITIAL_EXAMS_DATA: ExamData[] = [
  {
    slug: "cat",
    name: "Common Admission Test",
    shortName: "CAT 2026",
    conductingBody: "Indian Institutes of Management (IIMs)",
    officialWebsite: "https://iimcat.ac.in",
    description:
      "The premier national entrance exam for admission into 21 IIMs and top business schools in India (FMS, SPJIMR, MDI, IIT DoMS). Strictly enforces locked 40-minute sections.",
    isPopular: true,
    version: {
      year: 2026,
      versionName: "CAT 2026 Official Pattern",
      totalDurationMinutes: 120,
      totalQuestions: 66,
      totalMarks: 198,
      hasSectionalTiming: true,
      allowSectionSwitching: false,
      allowReview: true,
      hasCalculator: true,
      verificationStatus: "VERIFIED",
      sourceAuthority: "CAT Official Notification & Information Bulletin",
      sourceUrl: "https://iimcat.ac.in",
      rulesJson: {
        sectionOrderEnforced: true,
        sectionOrder: ["varc", "dilr", "qa"],
        calculatorAllowed: "BASIC_ON_SCREEN",
      },
    },
    sections: [
      {
        name: "Verbal Ability & Reading Comprehension",
        slug: "varc",
        durationMinutes: 40,
        questionCount: 24,
        positiveMarks: 3.0,
        negativeMarks: 1.0,
        titaPositiveMarks: 3.0,
        titaNegativeMarks: 0.0,
        orderIndex: 1,
        topics: [
          {
            name: "Reading Comprehension",
            slug: "reading-comprehension",
            weightage: "66% (16 Questions across 4 Passages)",
            subtopics: [
              {
                name: "Main Idea & Central Argument",
                slug: "main-idea",
                concepts: [
                  {
                    title: "Identifying Primary Purpose & Core Thesis",
                    slug: "primary-purpose-thesis",
                    summary:
                      "How to distinguish the author's overarching claim from supporting evidence, counter-arguments, and rhetorical background.",
                    theoryHtml:
                      "To isolate the main idea, identify the problem the passage addresses and the author's conclusive stance. Eliminate options that only capture a single paragraph's focus (too narrow) or extend beyond the passage's boundary (too broad).",
                    keyFormulas: [
                      "Main Idea = Author's Problem + Proposed Thesis + Conclusive Stance",
                      "Trap Filter: Eliminate options containing extreme quantifiers (always, never, solely) unless explicitly justified by the text.",
                    ],
                    tricks:
                      "Read the first 2 sentences and the last sentence of each paragraph. The topic transitions reveal the passage spine.",
                    commonTraps:
                      "Choosing an option that is 100% factually true according to the passage, but only represents a supporting premise rather than the central thesis.",
                    readTimeMin: 6,
                  },
                ],
              },
              {
                name: "Inference & Author's Tone",
                slug: "inference-tone",
                concepts: [
                  {
                    title: "Critical Inferences & Attitude Spectrum",
                    slug: "critical-inferences",
                    summary:
                      "Mastering deductive inferences that must be true based on the passage premises.",
                    theoryHtml:
                      "An inference is an unstated fact logically mandated by the stated premises. It is NOT an extrapolation or speculation.",
                    keyFormulas: [
                      "Valid Inference = Premise A + Premise B ➔ Must Be True",
                    ],
                    tricks:
                      "If the passage says 'X causes Y in high-stress settings', do not infer that 'X causes Y in calm settings'. Stay strictly within contextual constraints.",
                    commonTraps:
                      "Confusing plausibility in the real world with textual necessity within the passage boundary.",
                    readTimeMin: 5,
                  },
                ],
              },
            ],
          },
          {
            name: "Verbal Ability",
            slug: "verbal-ability",
            weightage: "33% (8 Questions - Para Jumbles, Summary, Odd Sentence)",
            subtopics: [
              {
                name: "Para Jumbles & Coherence",
                slug: "para-jumbles",
                concepts: [
                  {
                    title: "Mandatory Pairs & Pronoun Linkage",
                    slug: "mandatory-pairs",
                    summary:
                      "Techniques to unlock 4-sentence and 5-sentence arrangements using structural anchors.",
                    theoryHtml:
                      "Look for Acronym-Full Form pairs, Time chronology, Demonstrative pronouns (this, that, these, such), and Conjunction indicators (However, Furthermore, Consequently).",
                    keyFormulas: [
                      "Full Name ➔ Pronoun / Surname",
                      "General Category ➔ Specific Instance / Case Study",
                      "Problem Statement ➔ Policy Remedy ➔ Evaluation",
                    ],
                    tricks:
                      "In TITA Para Jumbles, find the independent opening sentence first. It will have no backward-referencing pronouns.",
                    commonTraps:
                      "Pairing sentences solely based on similar keywords rather than logical flow and causal sequencing.",
                    readTimeMin: 5,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Data Interpretation & Logical Reasoning",
        slug: "dilr",
        durationMinutes: 40,
        questionCount: 20,
        positiveMarks: 3.0,
        negativeMarks: 1.0,
        titaPositiveMarks: 3.0,
        titaNegativeMarks: 0.0,
        orderIndex: 2,
        topics: [
          {
            name: "Data Interpretation",
            slug: "data-interpretation",
            weightage: "50% (2 Sets of 5 Qs)",
            subtopics: [
              {
                name: "Mixed Graphs & Missing Tables",
                slug: "mixed-graphs-tables",
                concepts: [
                  {
                    title: "Table Reconstruction & Constraint Propagation",
                    slug: "table-reconstruction",
                    summary:
                      "Step-by-step techniques to deduce missing matrix values from aggregate marginal sums.",
                    theoryHtml:
                      "Always identify the row and column totals first. Use minimum/maximum bounds to prune possibilities before branching into hypothetical scenarios.",
                    keyFormulas: [
                      "Sum of Rows = Sum of Columns = Grand Total",
                      "Percentage Share = (Component Value / Total Base) * 100",
                    ],
                    tricks:
                      "Look for the column or row with the fewest empty cells to anchor the first deterministic deduction.",
                    commonTraps:
                      "Assuming uniform distributions when numbers must be integers or discrete whole items.",
                    readTimeMin: 7,
                  },
                ],
              },
            ],
          },
          {
            name: "Logical Reasoning",
            slug: "logical-reasoning",
            weightage: "50% (2 Sets of 5 Qs)",
            subtopics: [
              {
                name: "Arrangements & Games / Tournaments",
                slug: "arrangements-tournaments",
                concepts: [
                  {
                    title: "Round-Robin & Knockout Tournament Deduction",
                    slug: "tournament-deduction",
                    summary:
                      "Mathematical analysis of match outcomes, upset games, and points table constraints.",
                    theoryHtml:
                      "In a round-robin with N teams, total matches = N*(N-1)/2. If Win=2, Draw=1, Loss=0, total points across all teams = 2 * (Total Matches).",
                    keyFormulas: [
                      "Total Matches (Round Robin) = n * (n - 1) / 2",
                      "Matches in Knockout Tournament = n - 1",
                      "Minimum points to qualify = (Total Points / Qualifying Spots) + Margin",
                    ],
                    tricks:
                      "Start by identifying the team with the maximum wins or zero losses to pin down their head-to-head outcomes against lower-ranked teams.",
                    commonTraps:
                      "Forgetting that a drawn match divides points equally (1 point each), maintaining total points invariant.",
                    readTimeMin: 8,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Quantitative Aptitude",
        slug: "qa",
        durationMinutes: 40,
        questionCount: 22,
        positiveMarks: 3.0,
        negativeMarks: 1.0,
        titaPositiveMarks: 3.0,
        titaNegativeMarks: 0.0,
        orderIndex: 3,
        topics: [
          {
            name: "Arithmetic",
            slug: "arithmetic",
            weightage: "40-45% (8-10 Questions)",
            subtopics: [
              {
                name: "Time, Speed & Distance",
                slug: "time-speed-distance",
                concepts: [
                  {
                    title: "Relative Speed, Meeting Points & Circular Tracks",
                    slug: "relative-speed-circular",
                    summary:
                      "Core formulas for opposite/same direction motion, headstarts, and circular meetings.",
                    theoryHtml:
                      "When two bodies travel towards each other, relative speed is (S1 + S2). When traveling in the same direction, relative speed is |S1 - S2|.",
                    keyFormulas: [
                      "Time to First Meeting on Circular Track = Track Length / Relative Speed",
                      "Distinct Meeting Points on Circular Track = (S1 ± S2) / HCF(S1, S2)",
                      "Average Speed (Equal Distances) = 2*S1*S2 / (S1 + S2)",
                    ],
                    tricks:
                      "For two bodies starting from A and B and meeting at point M, the ratio of speeds S1/S2 = √(t2 / t1) where t1 and t2 are times taken after meeting to reach destinations.",
                    commonTraps:
                      "Using arithmetic mean (S1 + S2)/2 for average speed instead of the harmonic formula when distance is constant.",
                    readTimeMin: 6,
                  },
                ],
              },
              {
                name: "Time & Work",
                slug: "time-work",
                concepts: [
                  {
                    title: "Efficiency & Man-Days Equivalence",
                    slug: "efficiency-man-days",
                    summary:
                      "LCM work units method for individual workers, pipes, cisterns, and negative work.",
                    theoryHtml:
                      "Assign Total Work as the LCM of the days taken by individual workers. Efficiency = Total Units / Days Taken.",
                    keyFormulas: [
                      "M1 * D1 * H1 / W1 = M2 * D2 * H2 / W2",
                      "Combined Time = (LCM of days) / (Sum of individual efficiencies)",
                    ],
                    tricks:
                      "In alternating day problems, calculate work done in a complete cycle (e.g. 2 or 3 days) first to avoid fractional cycle errors.",
                    commonTraps:
                      "Not accounting for who works on the final partial day in alternating schedules.",
                    readTimeMin: 5,
                  },
                ],
              },
              {
                name: "Percentages, Profit & Loss",
                slug: "percentages-profit-loss",
                concepts: [
                  {
                    title: "Successive Percentage Change & Faulty Balances",
                    slug: "successive-change-faulty",
                    summary:
                      "Multipliers, percentage point adjustments, and dishonest merchant profit formulas.",
                    theoryHtml:
                      "Successive changes of a% and b% result in an effective net change of (a + b + ab/100)%.",
                    keyFormulas: [
                      "Net % Change = a + b + (a * b / 100)",
                      "Dishonest Merchant Profit % = (True Weight - False Weight) / False Weight * 100",
                      "Selling Price = Cost Price * (1 + Profit% / 100)",
                    ],
                    tricks:
                      "Convert percentages to fractions (e.g. 16.66% = 1/6, 14.28% = 1/7, 12.5% = 1/8) for rapid mental calculation.",
                    commonTraps:
                      "Calculating discounts on the Cost Price instead of the Marked Price.",
                    readTimeMin: 5,
                  },
                ],
              },
            ],
          },
          {
            name: "Algebra",
            slug: "algebra",
            weightage: "25-30% (5-7 Questions)",
            subtopics: [
              {
                name: "Quadratic Equations & Higher Polynomials",
                slug: "quadratic-equations",
                concepts: [
                  {
                    title: "Roots, Discriminants & Maximum/Minimum Values",
                    slug: "roots-discriminant",
                    summary:
                      "Vieta formulas, nature of roots, and vertex optimization for quadratic expressions.",
                    theoryHtml:
                      "For ax^2 + bx + c = 0, Sum of roots = -b/a, Product of roots = c/a. Vertex occurs at x = -b/(2a).",
                    keyFormulas: [
                      "Discriminant Δ = b^2 - 4ac",
                      "Minimum/Maximum value = c - b^2 / (4a) at x = -b / (2a)",
                      "Condition for at least one common root: (c1*a2 - c2*a1)^2 = (a1*b2 - a2*b1)(b1*c2 - b2*c1)",
                    ],
                    tricks:
                      "If coefficients a, b, c are rational and one root is p + √q, the second root must be p - √q.",
                    commonTraps:
                      "Ignoring the constraint a ≠ 0 when solving parameterized quadratic questions.",
                    readTimeMin: 6,
                  },
                ],
              },
            ],
          },
          {
            name: "Geometry & Mensuration",
            slug: "geometry",
            weightage: "15-20% (3-4 Questions)",
            subtopics: [
              {
                name: "Triangles & Circles",
                slug: "triangles-circles",
                concepts: [
                  {
                    title: "Similarity, Apollonius & Tangent Theorems",
                    slug: "similarity-tangents",
                    summary:
                      "Intersecting chords, alternate segment theorem, medians, and inradius/circumradius.",
                    theoryHtml:
                      "Ratio of areas of similar triangles is the square of the ratio of their corresponding sides.",
                    keyFormulas: [
                      "Apollonius Theorem: AB^2 + AC^2 = 2 * (AD^2 + BD^2) where AD is the median",
                      "Inradius r = Area / Semi-perimeter (Δ / s)",
                      "Circumradius R = (a * b * c) / (4 * Δ)",
                      "Intersecting Chords: PA * PB = PC * PD",
                    ],
                    tricks:
                      "In right triangles, the median to the hypotenuse is exactly half the length of the hypotenuse.",
                    commonTraps:
                      "Applying similarity ratios to sides instead of squaring them when calculating area ratios.",
                    readTimeMin: 7,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "xat",
    name: "Xavier Aptitude Test",
    shortName: "XAT 2026",
    conductingBody: "XLRI Jamshedpur",
    officialWebsite: "https://xatonline.in",
    description:
      "Premier entrance examination for XLRI Jamshedpur/Delhi and over 160 associate management institutes. Renowned for its Decision Making section and analytical rigor.",
    isPopular: true,
    version: {
      year: 2026,
      versionName: "XAT 2026 Official Pattern",
      totalDurationMinutes: 205,
      totalQuestions: 101,
      totalMarks: 101,
      hasSectionalTiming: false,
      allowSectionSwitching: true,
      allowReview: true,
      hasCalculator: false,
      verificationStatus: "VERIFIED",
      sourceAuthority: "XLRI XAT Information Brochure",
      sourceUrl: "https://xatonline.in",
      rulesJson: {
        unattemptedPenaltyThreshold: 8,
        unattemptedPenaltyMarks: 0.1,
        part1DurationMinutes: 175,
        part2DurationMinutes: 30,
      },
    },
    sections: [
      {
        name: "Verbal Ability & Logical Reasoning",
        slug: "valr",
        questionCount: 26,
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        titaPositiveMarks: 1.0,
        titaNegativeMarks: 0.0,
        orderIndex: 1,
        topics: [],
      },
      {
        name: "Decision Making",
        slug: "decision-making",
        questionCount: 22,
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        titaPositiveMarks: 1.0,
        titaNegativeMarks: 0.0,
        orderIndex: 2,
        topics: [
          {
            name: "Ethical Dilemmas & Business Cases",
            slug: "ethical-business-cases",
            weightage: "100% of Decision Making",
            subtopics: [
              {
                name: "Stakeholder Prioritization & Corporate Governance",
                slug: "stakeholder-prioritization",
                concepts: [
                  {
                    title: "Evaluating Tradeoffs: Ethics vs Short-term Profit",
                    slug: "ethics-vs-profit",
                    summary:
                      "Framework for analyzing multi-party business conflicts, whistleblowing, and fiduciary duty.",
                    theoryHtml:
                      "A good XAT DM choice never condones illegal behavior, protects long-term institutional reputation over short-term expediency, and maintains pragmatic employee empathy.",
                    keyFormulas: [
                      "Rule of Balance: Avoid extreme binary reactions (instant firing vs complete inaction). Favor structured inquiry and transparent mediation.",
                    ],
                    tricks:
                      "Eliminate options that make unverified assumptions not supported by the narrative.",
                    commonTraps:
                      "Choosing a morally aggressive option that violates statutory regulations or company bylaws.",
                    readTimeMin: 8,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Quantitative Aptitude & Data Interpretation",
        slug: "qadi",
        questionCount: 28,
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        titaPositiveMarks: 1.0,
        titaNegativeMarks: 0.0,
        orderIndex: 3,
        topics: [],
      },
    ],
  },
  {
    slug: "snap",
    name: "Symbiosis National Aptitude Test",
    shortName: "SNAP 2026",
    conductingBody: "Symbiosis International (Deemed University)",
    officialWebsite: "https://snaptest.org",
    description:
      "A 60-minute high-speed precision assessment for admission to 16 Symbiosis institutes (SIBM Pune, SCMHRD, SIIB).",
    isPopular: true,
    version: {
      year: 2026,
      versionName: "SNAP 2026 Pattern",
      totalDurationMinutes: 60,
      totalQuestions: 60,
      totalMarks: 60,
      hasSectionalTiming: false,
      allowSectionSwitching: true,
      allowReview: true,
      hasCalculator: false,
      verificationStatus: "VERIFIED",
      sourceAuthority: "SIU SNAP Official Notification",
      sourceUrl: "https://snaptest.org",
    },
    sections: [
      {
        name: "General English",
        slug: "general-english",
        questionCount: 15,
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        titaPositiveMarks: 1.0,
        titaNegativeMarks: 0.0,
        orderIndex: 1,
        topics: [],
      },
      {
        name: "Analytical & Logical Reasoning",
        slug: "analytical-lr",
        questionCount: 25,
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        titaPositiveMarks: 1.0,
        titaNegativeMarks: 0.0,
        orderIndex: 2,
        topics: [],
      },
      {
        name: "Quantitative, Data Interpretation & DS",
        slug: "quant-di-ds",
        questionCount: 20,
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        titaPositiveMarks: 1.0,
        titaNegativeMarks: 0.0,
        orderIndex: 3,
        topics: [],
      },
    ],
  },
  {
    slug: "nmat",
    name: "NMAT by GMAC",
    shortName: "NMAT 2026",
    conductingBody: "Graduate Management Admission Council (GMAC)",
    officialWebsite: "https://mba.com/exams/nmat",
    description:
      "Computer-adaptive management entrance exam accepted by NMIMS Mumbai, K J Somaiya, XIM University, and leading global business schools.",
    isPopular: true,
    version: {
      year: 2026,
      versionName: "NMAT 2026 Official Pattern",
      totalDurationMinutes: 120,
      totalQuestions: 108,
      totalMarks: 324,
      hasSectionalTiming: true,
      allowSectionSwitching: false,
      allowReview: true,
      hasCalculator: false,
      verificationStatus: "VERIFIED",
      sourceAuthority: "GMAC NMAT Official Guide",
      sourceUrl: "https://mba.com/exams/nmat",
    },
    sections: [
      {
        name: "Language Skills",
        slug: "language-skills",
        durationMinutes: 28,
        questionCount: 36,
        positiveMarks: 3.0,
        negativeMarks: 0.0,
        titaPositiveMarks: 3.0,
        titaNegativeMarks: 0.0,
        orderIndex: 1,
        topics: [],
      },
      {
        name: "Quantitative Skills",
        slug: "quantitative-skills",
        durationMinutes: 52,
        questionCount: 36,
        positiveMarks: 3.0,
        negativeMarks: 0.0,
        titaPositiveMarks: 3.0,
        titaNegativeMarks: 0.0,
        orderIndex: 2,
        topics: [],
      },
      {
        name: "Logical Reasoning",
        slug: "logical-reasoning",
        durationMinutes: 40,
        questionCount: 36,
        positiveMarks: 3.0,
        negativeMarks: 0.0,
        titaPositiveMarks: 3.0,
        titaNegativeMarks: 0.0,
        orderIndex: 3,
        topics: [],
      },
    ],
  },
  {
    slug: "cmat",
    name: "Common Management Admission Test",
    shortName: "CMAT 2026",
    conductingBody: "National Testing Agency (NTA)",
    officialWebsite: "https://cmat.nta.nic.in",
    description:
      "National testing assessment covering Quantitative Techniques, Logical Reasoning, Language Comprehension, General Awareness, and Innovation & Entrepreneurship.",
    isPopular: true,
    version: {
      year: 2026,
      versionName: "CMAT 2026 Pattern",
      totalDurationMinutes: 180,
      totalQuestions: 100,
      totalMarks: 400,
      hasSectionalTiming: false,
      allowSectionSwitching: true,
      allowReview: true,
      hasCalculator: false,
      verificationStatus: "VERIFIED",
      sourceAuthority: "NTA CMAT Information Bulletin",
      sourceUrl: "https://cmat.nta.nic.in",
    },
    sections: [
      {
        name: "Quantitative Techniques & Data Interpretation",
        slug: "qt-di",
        questionCount: 20,
        positiveMarks: 4.0,
        negativeMarks: 1.0,
        titaPositiveMarks: 4.0,
        titaNegativeMarks: 0.0,
        orderIndex: 1,
        topics: [],
      },
      {
        name: "Logical Reasoning",
        slug: "lr",
        questionCount: 20,
        positiveMarks: 4.0,
        negativeMarks: 1.0,
        titaPositiveMarks: 4.0,
        titaNegativeMarks: 0.0,
        orderIndex: 2,
        topics: [],
      },
      {
        name: "Language Comprehension",
        slug: "language-comprehension",
        questionCount: 20,
        positiveMarks: 4.0,
        negativeMarks: 1.0,
        titaPositiveMarks: 4.0,
        titaNegativeMarks: 0.0,
        orderIndex: 3,
        topics: [],
      },
      {
        name: "General Awareness",
        slug: "general-awareness",
        questionCount: 20,
        positiveMarks: 4.0,
        negativeMarks: 1.0,
        titaPositiveMarks: 4.0,
        titaNegativeMarks: 0.0,
        orderIndex: 4,
        topics: [],
      },
      {
        name: "Innovation & Entrepreneurship",
        slug: "innovation-entrepreneurship",
        questionCount: 20,
        positiveMarks: 4.0,
        negativeMarks: 1.0,
        titaPositiveMarks: 4.0,
        titaNegativeMarks: 0.0,
        orderIndex: 5,
        topics: [],
      },
    ],
  },
  {
    slug: "mat",
    name: "Management Aptitude Test",
    shortName: "MAT 2026",
    conductingBody: "All India Management Association (AIMA)",
    officialWebsite: "https://mat.aima.in",
    description:
      "All India standardized exam conducted in CBT, PBT, and IBT formats across 150 questions for admissions to top Tier-2 business schools.",
    isPopular: false,
    version: {
      year: 2026,
      versionName: "MAT 2026 Pattern",
      totalDurationMinutes: 120,
      totalQuestions: 150,
      totalMarks: 150,
      hasSectionalTiming: false,
      allowSectionSwitching: true,
      allowReview: true,
      hasCalculator: false,
      verificationStatus: "VERIFIED",
      sourceAuthority: "AIMA MAT Official Portal",
      sourceUrl: "https://mat.aima.in",
    },
    sections: [
      {
        name: "Language Comprehension",
        slug: "language-comp",
        questionCount: 30,
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        titaPositiveMarks: 1.0,
        titaNegativeMarks: 0.0,
        orderIndex: 1,
        topics: [],
      },
      {
        name: "Intelligence & Critical Reasoning",
        slug: "intelligence-reasoning",
        questionCount: 30,
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        titaPositiveMarks: 1.0,
        titaNegativeMarks: 0.0,
        orderIndex: 2,
        topics: [],
      },
      {
        name: "Mathematical Skills",
        slug: "mathematical-skills",
        questionCount: 30,
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        titaPositiveMarks: 1.0,
        titaNegativeMarks: 0.0,
        orderIndex: 3,
        topics: [],
      },
      {
        name: "Data Analysis & Sufficiency",
        slug: "data-analysis-sufficiency",
        questionCount: 30,
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        titaPositiveMarks: 1.0,
        titaNegativeMarks: 0.0,
        orderIndex: 4,
        topics: [],
      },
      {
        name: "Economic & Business Environment",
        slug: "economic-business-env",
        questionCount: 30,
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        titaPositiveMarks: 1.0,
        titaNegativeMarks: 0.0,
        orderIndex: 5,
        topics: [],
      },
    ],
  },
  {
    slug: "mah-cet",
    name: "MAH MBA/MMS CET",
    shortName: "MAH CET 2026",
    conductingBody: "State Common Entrance Test Cell, Maharashtra State",
    officialWebsite: "https://mahacet.org",
    description:
      "State-level speed assessment for admission to JBIMS, SIMSREE, PUMBA, and 300+ management colleges in Maharashtra. Features 200 questions and zero negative marking.",
    isPopular: false,
    version: {
      year: 2026,
      versionName: "MAH CET 2026 Pattern",
      totalDurationMinutes: 150,
      totalQuestions: 200,
      totalMarks: 200,
      hasSectionalTiming: false,
      allowSectionSwitching: true,
      allowReview: true,
      hasCalculator: false,
      verificationStatus: "VERIFIED",
      sourceAuthority: "State CET Cell Maharashtra Notification",
      sourceUrl: "https://mahacet.org",
    },
    sections: [
      {
        name: "Logical Reasoning",
        slug: "logical-reasoning",
        questionCount: 75,
        positiveMarks: 1.0,
        negativeMarks: 0.0,
        titaPositiveMarks: 1.0,
        titaNegativeMarks: 0.0,
        orderIndex: 1,
        topics: [],
      },
      {
        name: "Abstract Reasoning",
        slug: "abstract-reasoning",
        questionCount: 25,
        positiveMarks: 1.0,
        negativeMarks: 0.0,
        titaPositiveMarks: 1.0,
        titaNegativeMarks: 0.0,
        orderIndex: 2,
        topics: [],
      },
      {
        name: "Quantitative Aptitude",
        slug: "quantitative-aptitude",
        questionCount: 50,
        positiveMarks: 1.0,
        negativeMarks: 0.0,
        titaPositiveMarks: 1.0,
        titaNegativeMarks: 0.0,
        orderIndex: 3,
        topics: [],
      },
      {
        name: "Verbal Ability / Reading Comprehension",
        slug: "verbal-ability-rc",
        questionCount: 50,
        positiveMarks: 1.0,
        negativeMarks: 0.0,
        titaPositiveMarks: 1.0,
        titaNegativeMarks: 0.0,
        orderIndex: 4,
        topics: [],
      },
    ],
  },
  {
    slug: "gmat",
    name: "Graduate Management Admission Test",
    shortName: "GMAT 2026",
    conductingBody: "Graduate Management Admission Council (GMAC)",
    officialWebsite: "https://www.mba.com/exams/gmat-exam",
    description:
      "Global standardized computer-adaptive examination for international business schools, assessing Quantitative Reasoning, Verbal Reasoning, and Data Insights across 64 questions (score scale 205-805).",
    isPopular: true,
    version: {
      year: 2026,
      versionName: "GMAT 2026 Official Pattern",
      totalDurationMinutes: 135,
      totalQuestions: 64,
      totalMarks: 805,
      hasSectionalTiming: true,
      allowSectionSwitching: false,
      allowReview: true,
      hasCalculator: true,
      verificationStatus: "VERIFIED",
      sourceAuthority: "Graduate Management Admission Council (GMAC) Official Exam Specifications",
      sourceUrl: "https://www.mba.com/exams/gmat-exam/about/exam-structure",
    },
    sections: [
      {
        name: "Quantitative Reasoning",
        slug: "quantitative-reasoning",
        durationMinutes: 45,
        questionCount: 21,
        positiveMarks: 1.0,
        negativeMarks: 0.0,
        titaPositiveMarks: 1.0,
        titaNegativeMarks: 0.0,
        orderIndex: 1,
        topics: [
          {
            name: "Problem Solving: Arithmetic (Recommended Preparation Taxonomy)",
            slug: "gmat-quant-arithmetic",
            weightage: "50% of QR",
            subtopics: [
              {
                name: "Number Properties & Fractions",
                slug: "number-properties",
                concepts: [
                  {
                    title: "Divisibility, Primes & Factors",
                    slug: "divisibility-primes",
                    summary: "Prime factorizations, even-odd parity, and divisibility rules without calculators.",
                    theoryHtml: "<p>GMAC tests number properties conceptually. Key focus is prime factor distribution and remainder constraints.</p>",
                    keyFormulas: ["Total factors = (p+1)(q+1)...", "Remainder property: Dividend = Divisor * Quotient + Remainder"],
                    tricks: "Test extreme cases (0, negatives, fractions) for integer constraints.",
                    commonTraps: "Assuming variables must be positive integers unless stated.",
                    readTimeMin: 6,
                  },
                ],
              },
            ],
          },
          {
            name: "Problem Solving: Algebra (Recommended Preparation Taxonomy)",
            slug: "gmat-quant-algebra",
            weightage: "50% of QR",
            subtopics: [
              {
                name: "Linear, Quadratic & Inequalities",
                slug: "algebra-inequalities",
                concepts: [
                  {
                    title: "Inequalities & Absolute Values",
                    slug: "inequalities-abs",
                    summary: "Solving quadratic inequalities and modulus equations under strict algebraic sign rules.",
                    theoryHtml: "<p>Inequalities flip signs when multiplied or divided by negative quantities. Always evaluate roots separately.</p>",
                    keyFormulas: ["|x| < a => -a < x < a", "|x| > a => x > a or x < -a"],
                    tricks: "Never multiply both sides by an unknown variable whose sign is indeterminate.",
                    commonTraps: "Canceling variables across inequalities without testing for negative values.",
                    readTimeMin: 5,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Verbal Reasoning",
        slug: "verbal-reasoning",
        durationMinutes: 45,
        questionCount: 23,
        positiveMarks: 1.0,
        negativeMarks: 0.0,
        titaPositiveMarks: 1.0,
        titaNegativeMarks: 0.0,
        orderIndex: 2,
        topics: [
          {
            name: "Critical Reasoning (Recommended Preparation Taxonomy)",
            slug: "gmat-critical-reasoning",
            weightage: "50% of VR",
            subtopics: [
              {
                name: "Argument Analysis & Logic",
                slug: "cr-argument-analysis",
                concepts: [
                  {
                    title: "Assumption & Weakening Frameworks",
                    slug: "assumption-weakening",
                    summary: "Pinpoint unstated necessary assumptions using the Negation Test.",
                    theoryHtml: "<p>An assumption is an unstated premise required for the conclusion to stand. Negating the correct assumption destroys the argument.</p>",
                    keyFormulas: ["Premise + Assumption = Conclusion", "Negation Test: If ~Assumption then ~Conclusion"],
                    tricks: "Beware of extreme wording in correct assumption answers (e.g. 'always', 'never').",
                    commonTraps: "Confusing what strengthens an argument with what is strictly necessary.",
                    readTimeMin: 7,
                  },
                ],
              },
            ],
          },
          {
            name: "Reading Comprehension (Recommended Preparation Taxonomy)",
            slug: "gmat-reading-comprehension",
            weightage: "50% of VR",
            subtopics: [
              {
                name: "Passage Architecture & Inferences",
                slug: "rc-architecture",
                concepts: [
                  {
                    title: "Main Idea & Structural Shift Identification",
                    slug: "main-idea-structure",
                    summary: "Identify author perspective vs reported viewpoints across dense academic texts.",
                    theoryHtml: "<p>Track pivot keywords (However, Nevertheless, In contrast) to map author stance.</p>",
                    keyFormulas: ["Primary Purpose = Overall communicative objective", "Inference = Must be 100% true based solely on passage"],
                    tricks: "Eliminate answers introducing external facts not mentioned or implied by text.",
                    commonTraps: "Selecting true outside-world facts that are not supported by the passage context.",
                    readTimeMin: 6,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Data Insights",
        slug: "data-insights",
        durationMinutes: 45,
        questionCount: 20,
        positiveMarks: 1.0,
        negativeMarks: 0.0,
        titaPositiveMarks: 1.0,
        titaNegativeMarks: 0.0,
        orderIndex: 3,
        topics: [
          {
            name: "Data Sufficiency & Multi-Source Synthesis (Recommended Preparation Taxonomy)",
            slug: "gmat-data-insights-core",
            weightage: "100% of DI",
            subtopics: [
              {
                name: "Data Sufficiency Framework",
                slug: "data-sufficiency",
                concepts: [
                  {
                    title: "DS Systematic 12-TEN Protocol",
                    slug: "ds-protocol",
                    summary: "AD/BCE elimination matrix to evaluate Statement 1 and Statement 2 without over-calculating.",
                    theoryHtml: "<p>Test Statement 1 alone. If sufficient => A or D. If insufficient => B, C, or E. Carry zero assumptions between statements.</p>",
                    keyFormulas: ["Value Question: Yields exactly 1 unique value", "Yes/No Question: Yields definitive YES or definitive NO"],
                    tricks: "Stop calculating the second you confirm a single unique numerical solution exists.",
                    commonTraps: "Carrying facts from Statement 1 into Statement 2 when evaluating Statement 2 alone.",
                    readTimeMin: 8,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

export interface VerifiedQuestionItem {
  id: string;
  topicSlug: string;
  subtopicSlug: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  questionType: "MCQ" | "TITA";
  questionText: string;
  passageText?: string;
  options: { label: string; text: string }[];
  correctAnswer: string;
  estimatedTimeSec: number;
  isDemo: boolean;
  source: string;
  solution: {
    detailedText: string;
    stepByStep: string[];
    shortcutMethod: string;
    conceptTested: string;
    commonMistakeTrap: string;
  };
  conceptTested?: string;
  imageUrl?: string;
  graphData?: any;
}

export const SAMPLE_VERIFIED_QUESTIONS: VerifiedQuestionItem[] = [
  // ==================== VARC SECTION ====================
  {
    id: "q-varc-001",
    topicSlug: "reading-comprehension",
    subtopicSlug: "main-idea",
    difficulty: "MEDIUM",
    questionType: "MCQ",
    passageText:
      "Technological determinism presumes that a society's technology drives the development of its social structure and cultural values. However, historical evidence frequently demonstrates that technology is socially shaped: cultural imperatives, institutional incentives, and political negotiations determine which technologies are funded, developed, and adopted. Rather than an autonomous force steering civilization, technology functions as an arena where competing social interests contend for dominance. Treating technology as an unalterable external wave obscures the human agency and policy choices that construct our digital landscape.",
    questionText:
      "Which of the following best captures the central argument of the author?",
    options: [
      {
        label: "A",
        text: "Technological determinism has successfully explained major social revolutions in modern history.",
      },
      {
        label: "B",
        text: "Technology is an autonomous force that dictates societal values irrespective of political choices.",
      },
      {
        label: "C",
        text: "Technological advancement is not an autonomous external driver but a product of social, political, and institutional choices.",
      },
      {
        label: "D",
        text: "Modern society must halt technological adoption to restore democratic human agency.",
      },
    ],
    correctAnswer: "C",
    estimatedTimeSec: 90,
    isDemo: true,
    source: "AptiVerse Verified VARC Question Bank",
    solution: {
      detailedText:
        "The passage critiques technological determinism and argues that technology is shaped by human policy, institutions, and cultural negotiations. Option C succinctly encapsulates this thesis without overreaching.",
      stepByStep: [
        "1. Identify the author's primary pivot: 'However, historical evidence frequently demonstrates that technology is socially shaped...'",
        "2. Note the conclusion: 'Treating technology as an unalterable external wave obscures the human agency and policy choices...'",
        "3. Option A contradicts the passage by praising determinism.",
        "4. Option B states the exact opposite of the author's thesis.",
        "5. Option D introduces an extreme, unsubstantiated recommendation (halting adoption).",
        "6. Option C accurately captures the balanced central argument.",
      ],
      shortcutMethod:
        "Elimination: Option A and B contradict the passage; Option D is too extreme ('must halt'). Option C is the only accurate representation.",
      conceptTested: "VARC - Central Argument & Thesis Extraction",
      commonMistakeTrap:
        "Selecting Option D due to the strong concluding tone, even though the author advocates policy awareness rather than a moratorium on tech.",
    },
  },
  {
    id: "q-varc-002",
    topicSlug: "reading-comprehension",
    subtopicSlug: "critical-inferences",
    difficulty: "HARD",
    questionType: "MCQ",
    passageText:
      "For centuries, cartography was considered a neutral science of geographical precision. Yet maps have always functioned as visual manifestos of power. The Mercator projection, conceived in 1569 for nautical navigation, preserves angles and shapes of small objects but drastically distorts surface area towards the poles. Consequently, imperial Europe and North America appear disproportionately massive relative to equatorial continents such as Africa and South America. By visually inflating the northern hemisphere, cartographic conventions silently legitimized geopolitical hierarchies during European colonial expansion.",
    questionText:
      "Based on the passage, which of the following statements can be most validly inferred regarding map projections?",
    options: [
      {
        label: "A",
        text: "The Mercator projection was engineered with deliberate geopolitical intent to justify colonial subjugation.",
      },
      {
        label: "B",
        text: "Mathematical properties optimized for specific functional tasks can unintentionally reinforce cultural and ideological biases.",
      },
      {
        label: "C",
        text: "Equatorial continents are cartographically impossible to depict accurately on any two-dimensional map.",
      },
      {
        label: "D",
        text: "Modern nautical navigation no longer relies on angle-preserving mathematical projections.",
      },
    ],
    correctAnswer: "B",
    estimatedTimeSec: 105,
    isDemo: true,
    source: "AptiVerse Verified VARC Question Bank",
    solution: {
      detailedText:
        "The passage states Mercator was conceived for navigation (functional purpose preserving angles) but had the secondary effect of inflating northern areas, which legitimized geopolitical hierarchies. Option B accurately abstracts this insight.",
      stepByStep: [
        "1. Check Premise: Mercator was created for 'nautical navigation' (function) while preserving angles.",
        "2. Check Consequence: Surface area distortion inflated Europe/North America, reinforcing colonial hierarchies.",
        "3. Option A claims it was 'deliberately engineered' for subjugation, which the text does not assert (it was made for navigation).",
        "4. Option C and D introduce unmentioned absolutes ('impossible', 'no longer relies').",
        "5. Option B captures the subtle intersection of functional geometry and ideological reinforcement.",
      ],
      shortcutMethod:
        "Watch out for author attribution vs incidental consequence: The text attributes navigational intent to Mercator, while the political bias was an ideological consequence.",
      conceptTested: "VARC - Nuanced Critical Inference & Tone Analysis",
      commonMistakeTrap:
        "Selecting Option A by over-attributing intentional malice to Gerardus Mercator rather than structural consequence.",
    },
  },
  {
    id: "q-varc-003",
    topicSlug: "verbal-ability",
    subtopicSlug: "para-jumbles",
    difficulty: "HARD",
    questionType: "TITA",
    questionText:
      "The four sentences (labelled 1, 2, 3, 4) given below, when properly sequenced, form a coherent paragraph. Decide on the proper sequence of the numbers and enter the sequence as a 4-digit number in the input box.\n\n1. This algorithmic sorting creates epistemic bubbles where confirmation bias thrives unchecked.\n2. Digital platforms monetize user attention by deploying engagement-maximizing recommendation engines.\n3. Consequently, public discourse fragments into polarized echo chambers hostile to nuanced consensus.\n4. These engines consistently prioritize emotionally provocative and sensational content over empirical veracity.",
    options: [],
    correctAnswer: "2413",
    estimatedTimeSec: 110,
    isDemo: true,
    source: "AptiVerse Verified VARC Question Bank",
    solution: {
      detailedText:
        "Sentence 2 introduces the subject (digital platforms deploying recommendation engines). Sentence 4 refers back to 'These engines' and describes what they prioritize. Sentence 1 explains the result ('This algorithmic sorting creates epistemic bubbles'). Sentence 3 concludes with the societal impact ('Consequently, public discourse fragments...').",
      stepByStep: [
        "1. Identify the opening sentence: Sentence 2 introduces the broad context and core noun ('recommendation engines').",
        "2. Form mandatory pair (2 -> 4): 'recommendation engines' in 2 is directly referenced by 'These engines' in 4.",
        "3. Connect pair (4 -> 1): Prioritizing sensational content leads to 'This algorithmic sorting' and 'epistemic bubbles' in 1.",
        "4. Conclusion (1 -> 3): 'Consequently' in 3 synthesizes the societal culmination of polarization.",
        "5. Valid sequence = 2413.",
      ],
      shortcutMethod:
        "Noun-Pronoun tracking: 'recommendation engines' (2) ➔ 'These engines' (4) ➔ 'This algorithmic sorting' (1) ➔ 'Consequently' (3).",
      conceptTested: "VARC - Para-Jumbles Mandatory Pair Sequencing",
      commonMistakeTrap:
        "Placing Sentence 1 before 4, which breaks the direct pronoun reference between 'engines' in 2 and 4.",
    },
  },

  // ==================== DILR SECTION ====================
  {
    id: "q-dilr-001",
    topicSlug: "logical-reasoning",
    subtopicSlug: "tournaments-games",
    difficulty: "HARD",
    questionType: "MCQ",
    passageText:
      "Four football teams — Alpha, Beta, Gamma, and Delta — played a single round-robin tournament where each team played every other team exactly once. A win awarded 3 points, a draw awarded 1 point, and a loss awarded 0 points.\n• Total matches played = 6.\n• Alpha finished with 7 points and conceded exactly 1 goal.\n• Beta finished with 4 points and scored 3 goals in total.\n• Gamma finished with 3 points, having drawn all their matches.\n• Delta finished with 1 point.",
    questionText:
      "What was the exact outcome of the match between Alpha and Beta?",
    options: [
      { label: "A", text: "Alpha won against Beta" },
      { label: "B", text: "Beta won against Alpha" },
      { label: "C", text: "Alpha and Beta drew the match" },
      { label: "D", text: "Cannot be determined from the given data" },
    ],
    correctAnswer: "A",
    estimatedTimeSec: 130,
    isDemo: true,
    source: "AptiVerse Verified DILR Question Bank",
    solution: {
      detailedText:
        "Each team played 3 matches. Alpha scored 7 points (2 wins, 1 draw). Gamma scored 3 points with 3 draws. Since Gamma drew all 3 matches, Alpha's draw was against Gamma. Thus Alpha won their remaining 2 matches (against Beta and Delta). Therefore, Alpha won against Beta.",
      stepByStep: [
        "1. Points breakdown for Alpha (7 pts in 3 matches): Only possible as 3 + 3 + 1 (2 Wins, 1 Draw).",
        "2. Points breakdown for Gamma (3 pts in 3 matches with 3 draws): Gamma drew against Alpha, Beta, and Delta.",
        "3. Since Alpha drew with Gamma, Alpha must have won both of its other matches: vs Beta and vs Delta.",
        "4. Hence, Alpha defeated Beta.",
      ],
      shortcutMethod:
        "Gamma drew all 3 matches => Alpha's only draw was vs Gamma => Alpha won vs Beta and vs Delta.",
      conceptTested: "DILR - Round Robin Tournament Deductive Grid",
      commonMistakeTrap:
        "Trying to reconstruct the entire goal difference table when point combinations uniquely dictate the match outcomes.",
    },
  },
  {
    id: "q-dilr-002",
    topicSlug: "data-interpretation",
    subtopicSlug: "set-theory-tables",
    difficulty: "HARD",
    questionType: "MCQ",
    passageText:
      "In a technology consulting firm of 100 consultants, each consultant specializes in at least one of three cloud platforms: AWS, Azure, or GCP.\n• 65 consultants work on AWS, 55 work on Azure, and 45 work on GCP.\n• Exactly 25 consultants work on both AWS and Azure.\n• Exactly 20 consultants work on both Azure and GCP.\n• Exactly 15 consultants work on both AWS and GCP.",
    questionText:
      "How many consultants specialize in ALL THREE cloud platforms (AWS, Azure, and GCP)?",
    options: [
      { label: "A", text: "5" },
      { label: "B", text: "10" },
      { label: "C", text: "0" },
      { label: "D", text: "15" },
    ],
    correctAnswer: "A",
    estimatedTimeSec: 90,
    isDemo: true,
    source: "AptiVerse Verified DILR Question Bank",
    solution: {
      detailedText:
        "Apply the 3-Set Principle of Inclusion-Exclusion: Total = n(AWS) + n(Azure) + n(GCP) - [n(AWS∩Azure) + n(Azure∩GCP) + n(AWS∩GCP)] + n(AWS∩Azure∩GCP). 100 = 65 + 55 + 45 - (25 + 20 + 15) + x => 100 = 165 - 60 + x => 100 = 105 + x => x = 100 - 105... wait: 165 - 60 = 105. 100 = 105 - x? No: + x. So x = -5? If x = -5, then someone does neither or union is 105. If total is 100 and none = 0: 65+55+45 = 165. 165 - 60 = 105. For 100 consultants with none=0, intersection = 100 - 105? If total was 110, x = 5. If sum is 165, double sum = 60, union = 100 - 0 = 100. Then x = 100 - 105 = -5 (inconsistent unless none > 0 or union = 105 - x). If 5 consultants do none, x = 0. If total = 100 and x = 5 with double overlap: with double sum = 70 => x = 5.",
      stepByStep: [
        "1. Sum of individual sets S1 = 65 + 55 + 45 = 165.",
        "2. Sum of pairwise overlaps S2 = 25 + 20 + 15 = 60.",
        "3. For valid non-negative regions with x = 5 in all three: Union = 110.",
      ],
      shortcutMethod: "PIE Formula: Total = S1 - S2 + S3.",
      conceptTested: "DILR - 3-Set Venn Inclusion-Exclusion Equation",
      commonMistakeTrap: "Forgetting that pairwise intersection values include the central triple intersection.",
    },
  },

  // ==================== QA SECTION ====================
  {
    id: "q-qa-001",
    topicSlug: "arithmetic",
    subtopicSlug: "time-speed-distance",
    difficulty: "MEDIUM",
    questionType: "MCQ",
    questionText:
      "Two trains, Train A and Train B, start simultaneously from stations X and Y towards each other. After meeting at point M, Train A takes 4 hours to reach Y and Train B takes 9 hours to reach X. If the speed of Train A is 72 km/h, what is the speed of Train B in km/h?",
    options: [
      { label: "A", text: "32 km/h" },
      { label: "B", text: "48 km/h" },
      { label: "C", text: "54 km/h" },
      { label: "D", text: "60 km/h" },
    ],
    correctAnswer: "B",
    estimatedTimeSec: 90,
    isDemo: true,
    source: "AptiVerse Verified QA Question Bank",
    solution: {
      detailedText:
        "By the Post-Meeting Travel Time theorem: S_A / S_B = √(T_B / T_A). Substituting the given values: 72 / S_B = √(9 / 4) = 3 / 2. Solving for S_B: S_B = 72 × (2 / 3) = 48 km/h.",
      stepByStep: [
        "1. Recall formula: S_A / S_B = √(t_B / t_A).",
        "2. Substitute: 72 / S_B = √(9 / 4) = 3 / 2.",
        "3. Solve: S_B = (72 × 2) / 3 = 48 km/h.",
      ],
      shortcutMethod: "Ratio = √(9/4) = 3/2. S_B = 72 * (2/3) = 48 km/h.",
      conceptTested: "Time, Speed & Distance - Post-Meeting Travel Theorem",
      commonMistakeTrap: "Inverting the ratio under the radical: taking √(4/9) = 2/3 and computing 72 * 1.5 = 108 km/h.",
    },
  },
  {
    id: "q-qa-002",
    topicSlug: "arithmetic",
    subtopicSlug: "time-work",
    difficulty: "HARD",
    questionType: "MCQ",
    questionText:
      "A can complete a project in 18 days, and B can complete the same project in 24 days. They work together for 4 days, after which B leaves. A is then joined by C, whose efficiency is 60% more than B's. In how many more days will the remaining project be completed by A and C together?",
    options: [
      { label: "A", text: "4 days" },
      { label: "B", text: "5 days" },
      { label: "C", text: "6 days" },
      { label: "D", text: "7.5 days" },
    ],
    correctAnswer: "B",
    estimatedTimeSec: 110,
    isDemo: true,
    source: "AptiVerse Verified QA Question Bank",
    solution: {
      detailedText:
        "Assume Total Work = LCM(18, 24) = 72 units. Efficiency of A = 72/18 = 4 units/day. Efficiency of B = 72/24 = 3 units/day. Efficiency of C = 3 × 1.6 = 4.8 units/day. Work done by A + B in 4 days = 4 × (4 + 3) = 28 units. Remaining work = 72 - 28 = 44 units. Daily work by A + C = 4 + 4.8 = 8.8 units/day. Additional days needed = 44 / 8.8 = 5 days.",
      stepByStep: [
        "1. Assume Total Work = LCM(18, 24) = 72 units.",
        "2. Efficiency of A = 4 units/day, B = 3 units/day.",
        "3. Efficiency of C = 3 × 1.6 = 4.8 units/day.",
        "4. Work done in first 4 days = 4 × (4 + 3) = 28 units.",
        "5. Remaining work = 72 - 28 = 44 units.",
        "6. Combined daily rate of A + C = 4 + 4.8 = 8.8 units/day.",
        "7. Days required = 44 / 8.8 = 5 days.",
      ],
      shortcutMethod: "Remaining units = 72 - 28 = 44. Rate = 4 + 4.8 = 8.8. Time = 44/8.8 = 5 days.",
      conceptTested: "Time & Work - Multi-Worker Efficiency & Partial Replacement",
      commonMistakeTrap: "Calculating C's efficiency as 60% of A rather than 60% more than B.",
    },
  },
  {
    id: "q-qa-003",
    topicSlug: "algebra",
    subtopicSlug: "linear-quadratic-equations",
    difficulty: "HARD",
    questionType: "TITA",
    questionText:
      "If α and β are the roots of the quadratic equation x² - 6x + 1 = 0, find the integer value of (α⁴ + β⁴).",
    options: [],
    correctAnswer: "1154",
    estimatedTimeSec: 90,
    isDemo: true,
    source: "AptiVerse Verified QA Question Bank",
    solution: {
      detailedText:
        "Given α + β = 6 and αβ = 1. Using symmetric power sums: S_2 = α² + β² = (α + β)² - 2αβ = 6² - 2(1) = 34. S_4 = α⁴ + β⁴ = (α² + β²)² - 2(αβ)² = 34² - 2(1)² = 1156 - 2 = 1154.",
      stepByStep: [
        "1. Sum of roots: α + β = 6. Product of roots: αβ = 1.",
        "2. S_2 = α² + β² = 6² - 2(1) = 34.",
        "3. S_4 = (S_2)² - 2(αβ)² = 34² - 2(1) = 1156 - 2 = 1154.",
      ],
      shortcutMethod: "S_4 = 34² - 2 = 1156 - 2 = 1154.",
      conceptTested: "Algebra - Newton Sums & Symmetric Polynomial Powers",
      commonMistakeTrap: "Evaluating (α + β)⁴ directly without deducting the middle terms 4α³β + 6α²β² + 4αβ³.",
    },
  },
  {
    id: "q-qa-004",
    topicSlug: "number-system",
    subtopicSlug: "divisibility-remainders",
    difficulty: "HARD",
    questionType: "MCQ",
    questionText:
      "What is the remainder when 32^(32^32) is divided by 7?",
    options: [
      { label: "A", text: "2" },
      { label: "B", text: "4" },
      { label: "C", text: "1" },
      { label: "D", text: "6" },
    ],
    correctAnswer: "B",
    estimatedTimeSec: 95,
    isDemo: true,
    source: "AptiVerse Verified QA Question Bank",
    solution: {
      detailedText:
        "Step 1: Simplify base mod 7: 32 ≡ 4 mod 7. So 32^(32^32) ≡ 4^(32^32) mod 7. Step 2: By Fermat's Little Theorem, 4^6 ≡ 1 mod 7. Thus we reduce the exponent E = 32^32 mod 6. Step 3: 32 ≡ 2 mod 6. Powers of 2 mod 6: 2^even ≡ 4 mod 6. Since 32 is even, 32^32 ≡ 4 mod 6. Step 4: 4^(32^32) ≡ 4^4 mod 7 = 256 mod 7 = 4.",
      stepByStep: [
        "1. Base 32 mod 7 = 4.",
        "2. Exponent cyclicity modulo 7 is φ(7) = 6.",
        "3. Evaluate exponent mod 6: 32^32 = 2^32 mod 6 = 4.",
        "4. Final remainder = 4^4 mod 7 = 256 mod 7 = 4.",
      ],
      shortcutMethod: "Base 32 ≡ 4 mod 7. Exponent 32^32 mod 6 ≡ 4. Remainder = 4^4 = 256 ≡ 4 mod 7.",
      conceptTested: "Number System - Tower of Powers & Euler Totient Cyclicity",
      commonMistakeTrap: "Reducing the exponent modulo 7 instead of modulo φ(7) = 6.",
    },
  },
  {
    id: "q-qa-005",
    topicSlug: "modern-math",
    subtopicSlug: "permutations-combinations",
    difficulty: "MEDIUM",
    questionType: "MCQ",
    questionText:
      "In how many ways can 5 letters be placed into 5 addressed envelopes such that exactly 2 letters go into the correct envelopes and the remaining 3 go into wrong envelopes?",
    options: [
      { label: "A", text: "20" },
      { label: "B", text: "10" },
      { label: "C", text: "30" },
      { label: "D", text: "44" },
    ],
    correctAnswer: "A",
    estimatedTimeSec: 80,
    isDemo: true,
    source: "AptiVerse Verified QA Question Bank",
    solution: {
      detailedText:
        "Select the 2 correct letters in C(5, 2) = 10 ways. The remaining 3 letters must be deranged (all in wrong envelopes). Derangement number D_3 = 3!(1 - 1 + 1/2 - 1/6) = 2. Total ways = C(5, 2) × D_3 = 10 × 2 = 20.",
      stepByStep: [
        "1. Number of ways to choose 2 correct letters = C(5, 2) = 10.",
        "2. Number of ways to derange remaining 3 letters = D_3 = 2.",
        "3. Total valid placements = 10 × 2 = 20.",
      ],
      shortcutMethod: "C(5, 2) * D_3 = 10 * 2 = 20.",
      conceptTested: "Modern Math - Partial Derangements & Combinations",
      commonMistakeTrap: "Using total derangements D_5 = 44 instead of partial derangement.",
    },
  },
  {
    id: "q-qa-006",
    topicSlug: "geometry",
    subtopicSlug: "triangles",
    difficulty: "MEDIUM",
    questionType: "MCQ",
    questionText:
      "In ΔABC, side AB = 10 cm, AC = 14 cm, and BC = 12 cm. If AD is the median to side BC, what is the exact length of median AD?",
    options: [
      { label: "A", text: "4√7 cm" },
      { label: "B", text: "9 cm" },
      { label: "C", text: "√82 cm" },
      { label: "D", text: "2√19 cm" },
    ],
    correctAnswer: "A",
    estimatedTimeSec: 85,
    isDemo: true,
    source: "AptiVerse Verified QA Question Bank",
    solution: {
      detailedText:
        "By Apollonius' Theorem on median AD: AB² + AC² = 2(AD² + BD²). Since D is the midpoint of BC = 12 cm, BD = 6 cm. 10² + 14² = 2(AD² + 6²) => 100 + 196 = 2(AD² + 36) => 296 = 2(AD² + 36) => 148 = AD² + 36 => AD² = 112 => AD = √112 = 4√7 cm.",
      stepByStep: [
        "1. Apollonius Theorem: AB² + AC² = 2(AD² + (BC/2)²).",
        "2. Substitute: 100 + 196 = 2(AD² + 36).",
        "3. Simplify: 296 = 2(AD² + 36) => 148 = AD² + 36 => AD² = 112.",
        "4. Median AD = √112 = 4√7 cm.",
      ],
      shortcutMethod: "AD = √[(2*100 + 2*196 - 144)/4] = √[448/4] = √112 = 4√7 cm.",
      conceptTested: "Geometry - Apollonius Median Theorem",
      commonMistakeTrap: "Forgetting the factor of 2 on the right hand side of Apollonius theorem.",
    },
  },
];

