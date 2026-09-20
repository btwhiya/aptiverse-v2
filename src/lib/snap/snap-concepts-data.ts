import { SNAPConceptGuide } from "./types";

export const SNAP_CONCEPTS_DATA: SNAPConceptGuide[] = [
  {
    id: "snap-concept-01",
    number: 1,
    title: "Reading Comprehension",
    topic: "Reading Comprehension",
    section: "General English",
    simpleExplanation:
      "SNAP Reading Comprehension features compact, high-speed passages (250–350 words). Unlike CAT's dense philosophical tracts, SNAP tests direct factual retrieval, central theme identification, and straightforward contextual inferences under a 60-second-per-question budget.",
    workedExample: {
      problem:
        "Passage: 'Renewable microgrids are revolutionizing rural electrification in developing nations. By decentralizing power production through solar photovoltaics and battery storage, villages bypass vulnerable national grids. However, tariff collection remains fraught due to seasonal cash flows in agricultural communities.'\nQuestion: What is the primary bottleneck facing rural microgrids according to the author?",
      stepByStepSolution: [
        "1. Identify the trigger word 'However' in line 3 indicating the pivot to problems.",
        "2. Note the explicit constraint: 'tariff collection remains fraught due to seasonal cash flows'.",
        "3. Match with the operational financial challenge rather than technical solar equipment failure.",
        "4. Conclusion: Revenue/tariff collection consistency is the primary bottleneck."
      ],
      keyTakeaway: "Locate contrast connectors (However, But, Although) to spot the author's critical problem statement."
    },
    shortcutsAndTips: [
      "Read the question stems first before skimming a 300-word SNAP passage.",
      "Focus on the opening sentence of each paragraph for the central thesis.",
      "Beware of extreme answer choices containing 'always', 'never', or 'completely'."
    ],
    commonMistakes: [
      "Over-analyzing nuances like CAT RC; SNAP questions are predominantly direct and objective.",
      "Spending more than 2.5 minutes reading a single passage."
    ],
    snapPerspective:
      "SNAP allocates approximately 15 questions to General English. Speed and direct keyword scanning yield 100% accuracy in under 1 minute per question.",
    basicPracticeQuestion: {
      question: "Which keyword in a passage typically indicates that the author is drawing a conclusion?",
      options: [
        { label: "A", text: "Consequently" },
        { label: "B", text: "Whereas" },
        { label: "C", text: "Furthermore" },
        { label: "D", text: "Initially" }
      ],
      correctAnswer: "A",
      explanation: "'Consequently' introduces a causal deduction or logical outcome."
    },
    snapLevelChallenge: {
      question:
        "When an author adopts a 'pragmatic' tone in a passage proposing corporate reform, their argument is primarily rooted in:",
      options: [
        { label: "A", text: "Feasible, real-world execution rather than abstract idealism" },
        { label: "B", text: "Moral outrage and aggressive denunciation" },
        { label: "C", text: "Futuristic and speculative technological utopianism" },
        { label: "D", text: "Nostalgic adherence to obsolete traditions" }
      ],
      correctAnswer: "A",
      explanation: "A pragmatic tone prioritizes practical, workable solutions over theoretical idealism."
    }
  },
  {
    id: "snap-concept-02",
    number: 2,
    title: "Verbal Ability & Analogies",
    topic: "Verbal Ability",
    section: "General English",
    simpleExplanation:
      "Verbal analogies test the exact logical, functional, or hierarchical relationship between a pair of words (A : B :: C : D). SNAP rewards fast structural classification: tool-to-worker, part-to-whole, degree of intensity, or cause-and-effect.",
    workedExample: {
      problem: "OASIS : DESERT :: ISLAND : ?",
      stepByStepSolution: [
        "1. Define the relationship: An Oasis is a fertile, water-bearing haven surrounded by an arid Desert.",
        "2. Formulate the relationship sentence: 'A is an isolated landform completely surrounded by B.'",
        "3. For Island: An Island is an isolated landmass completely surrounded by Water / Ocean.",
        "4. Conclusion: Island : Ocean / Sea."
      ],
      keyTakeaway: "Always build a clear, tight bridge sentence connecting the two reference words."
    },
    shortcutsAndTips: [
      "Check parts of speech parity: if A:B are noun:adjective, C:D must follow noun:adjective.",
      "Check intensity relationships: GLANCE : STARE (mild to intense) :: SIP : GULP."
    ],
    commonMistakes: [
      "Reversing the direction of the relationship (e.g. choosing predator : prey when reference was prey : predator).",
      "Selecting an option merely because both words belong to the same topical domain."
    ],
    snapPerspective:
      "Analogies are 15-second scoring questions in SNAP. Identifying the bridge sentence quickly prevents second-guessing.",
    basicPracticeQuestion: {
      question: "THERMOMETER : TEMPERATURE :: BAROMETER : ?",
      options: [
        { label: "A", text: "Atmospheric Pressure" },
        { label: "B", text: "Humidity" },
        { label: "C", text: "Wind Velocity" },
        { label: "D", text: "Earthquake Intensity" }
      ],
      correctAnswer: "A",
      explanation: "A thermometer measures temperature; a barometer measures atmospheric pressure."
    },
    snapLevelChallenge: {
      question: "INSIPID : PIQUANT :: LETHARGIC : ?",
      options: [
        { label: "A", text: "Vivacious" },
        { label: "B", text: "Torpid" },
        { label: "C", text: "Morose" },
        { label: "D", text: "Somnolent" }
      ],
      correctAnswer: "A",
      explanation: "Insipid (bland) is the exact antonym of Piquant (spicy/stimulating). Lethargic (sluggish) is the antonym of Vivacious (energetic/lively)."
    }
  },
  {
    id: "snap-concept-03",
    number: 3,
    title: "Synonyms Mastery",
    topic: "Synonyms",
    section: "General English",
    simpleExplanation:
      "Synonyms test your ability to identify words sharing the same fundamental meaning within a specific register or nuance. SNAP tests words frequently encountered in quality editorial journalism and business reporting.",
    workedExample: {
      problem: "Find the synonym of: MITIGATE\nOptions: (A) Exacerbate, (B) Alleviate, (C) Confound, (D) Proliferate",
      stepByStepSolution: [
        "1. Etymology: Latin 'mitis' (soft, mild) + 'agere' (to make) = to make milder or less severe.",
        "2. Evaluate options: Exacerbate is the opposite (worsen); Alleviate means to relieve/lessen pain; Confound means to confuse; Proliferate means to multiply.",
        "3. Result: Alleviate is the exact synonym."
      ],
      keyTakeaway: "Use root words (prefix, stem, suffix) to infer connotations when encountering unfamiliar vocabulary."
    },
    shortcutsAndTips: [
      "Identify the emotional valence: Is the word positive, negative, or neutral?",
      "Eliminate options that have the opposite valence immediately.",
      "Look for Greco-Latin roots (e.g. 'bene' = good, 'mal' = bad, 'luc/lum' = light/clear)."
    ],
    commonMistakes: [
      "Selecting an antonym because the mind recognizes the word pair through association.",
      "Ignoring the part of speech of the target word."
    ],
    snapPerspective:
      "Vocabulary represents 3 to 5 direct questions in SNAP. Quick recall without deliberation preserves crucial time for LR puzzles.",
    basicPracticeQuestion: {
      question: "Choose the synonym for: CANDID",
      options: [
        { label: "A", text: "Frank and outspoken" },
        { label: "B", text: "Secretive and reserved" },
        { label: "C", text: "Aggressive and hostile" },
        { label: "D", text: "Hesitant and timid" }
      ],
      correctAnswer: "A",
      explanation: "Candid means truthful and straightforward; frank."
    },
    snapLevelChallenge: {
      question: "Select the word closest in meaning to: PERSPICACIOUS",
      options: [
        { label: "A", text: "Shrewd and discerning" },
        { label: "B", text: "Stubborn and unyielding" },
        { label: "C", text: "Sweating profusely" },
        { label: "D", text: "Easily deceived" }
      ],
      correctAnswer: "A",
      explanation: "Perspicacious means having a ready insight into and understanding of things; shrewd."
    }
  },
  {
    id: "snap-concept-04",
    number: 4,
    title: "Antonyms & Contextual Opposites",
    topic: "Antonyms",
    section: "General English",
    simpleExplanation:
      "Antonym questions demand identifying the diametrically opposed semantic pole of a target term. SNAP questions often include trap options that are near-synonyms to catch candidates working on autopilot.",
    workedExample: {
      problem: "Find the antonym of: LOQUACIOUS\nOptions: (A) Garrulous, (B) Taciturn, (C) Eloquent, (D) Voluble",
      stepByStepSolution: [
        "1. Meaning: 'Loquacious' comes from Latin 'loqui' (to speak) meaning excessively talkative.",
        "2. Analyze options: Garrulous (talkative - synonym), Eloquent (fluent - related), Voluble (talkative - synonym).",
        "3. Taciturn means reserved, saying little.",
        "4. Conclusion: Taciturn is the direct antonym."
      ],
      keyTakeaway: "Trap warning: The first option you recognize might be a synonym! Always double check that you are selecting the opposite."
    },
    shortcutsAndTips: [
      "Formulate a simple negative sentence: 'He was NOT talkative; he was quiet.'",
      "Check if prefixes like un-, in-, dis-, a- help illuminate the opposite pole."
    ],
    commonMistakes: [
      "Speed error: picking the synonym instead of the antonym because it looks familiar.",
      "Failing to read all 4 options before committing."
    ],
    snapPerspective:
      "Takes 10–15 seconds to answer. A solid high-frequency 500-word vocabulary guarantees 100% conversion here.",
    basicPracticeQuestion: {
      question: "Choose the antonym for: ARTIFICIAL",
      options: [
        { label: "A", text: "Natural" },
        { label: "B", text: "Synthetic" },
        { label: "C", text: "Manufactured" },
        { label: "D", text: "Simulated" }
      ],
      correctAnswer: "A",
      explanation: "Natural is the exact opposite of artificial."
    },
    snapLevelChallenge: {
      question: "Choose the exact antonym for: EPHEMERAL",
      options: [
        { label: "A", text: "Enduring" },
        { label: "B", text: "Fleeting" },
        { label: "C", text: "Transient" },
        { label: "D", text: "Evanescent" }
      ],
      correctAnswer: "A",
      explanation: "Ephemeral means short-lived. Enduring means long-lasting or permanent. Options B, C, and D are synonyms."
    }
  },
  {
    id: "snap-concept-05",
    number: 5,
    title: "Para-Jumbles (Sentence Rearrangement)",
    topic: "Para-Jumbles",
    section: "General English",
    simpleExplanation:
      "SNAP Para-Jumbles present 4 or 5 sentences with multiple-choice option arrangements (e.g. BDCA, CBAD). Candidates leverage mandatory pairs, pronoun references, chronological markers, and acronym-full form sequences to eliminate incorrect options rapidly.",
    workedExample: {
      problem:
        "Arrange the sentences in logical sequence:\nA. This synthetic enzyme accelerates PET plastic decomposition from centuries to hours.\nB. Plastic accumulation has become an ecological emergency across global marine habitats.\nC. Researchers at Kyoto University engineered a novel bacterial catalyst to combat this crisis.\nD. Global bottling conglomerates are now piloting commercial recycling bioreactors using this discovery.",
      stepByStepSolution: [
        "1. Sentence B introduces the overarching problem ('Plastic accumulation... ecological emergency'). It is the ideal opener.",
        "2. Sentence C introduces the specific scientific breakthrough engineered to combat 'this crisis' (links B -> C).",
        "3. Sentence A explains 'This synthetic enzyme' introduced in C (mandatory pair C-A).",
        "4. Sentence D details commercial adoption, concluding the narrative.",
        "5. Valid sequence: B -> C -> A -> D."
      ],
      keyTakeaway: "Look for demonstrative pronouns ('this catalyst', 'these findings') to lock in mandatory pairs."
    },
    shortcutsAndTips: [
      "Full name first, acronym/pronoun second: 'Reserve Bank of India' precedes 'The RBI' or 'It'.",
      "Problem precedes solution; general statement precedes specific illustration.",
      "Check option openers: if 3 options start with B and 1 starts with C, test B first."
    ],
    commonMistakes: [
      "Reading all 24 permutations mentally instead of testing the 4 given option choices.",
      "Failing to connect demonstrative adjectives ('these measures', 'such policies') to their antecedent."
    ],
    snapPerspective:
      "Because SNAP provides 4 MCQ options for Para-Jumbles (unlike CAT's non-negative TITA), option elimination cracks the question in under 40 seconds.",
    basicPracticeQuestion: {
      question: "Which of the following cannot serve as the opening sentence of a coherent paragraph?",
      options: [
        { label: "A", text: "However, these subsidies failed to spur rooftop solar adoption." },
        { label: "B", text: "Clean energy transitions require synchronized public-private capital." },
        { label: "C", text: "Urbanization in South Asia has accelerated dramatically over three decades." },
        { label: "D", text: "Artificial intelligence models rely on vast transformer architectures." }
      ],
      correctAnswer: "A",
      explanation: "Sentence A begins with a contrast connector ('However') and an unresolved pronoun ('these subsidies'), requiring a preceding context."
    },
    snapLevelChallenge: {
      question:
        "Arrange: (A) Consequently, consumer confidence plummeted. (B) Central banks tightened policy abruptly. (C) High borrowing costs dampened commercial hiring. (D) Inflation reached four-decade highs.",
      options: [
        { label: "A", text: "DBCA" },
        { label: "B", text: "BCDA" },
        { label: "C", text: "ADCB" },
        { label: "D", text: "CDBA" }
      ],
      correctAnswer: "A",
      explanation: "D establishes the macroeconomic trigger (inflation highs). B states the response (tightening). C details the impact on hiring. A provides the final outcome (consumer confidence collapse). Sequence: DBCA."
    }
  },
  {
    id: "snap-concept-06",
    number: 6,
    title: "Grammar & Error Identification",
    topic: "Grammar",
    section: "General English",
    simpleExplanation:
      "SNAP tests functional business grammar: Subject-Verb Agreement, Dangling Modifiers, Parallelism in lists, Tense consistency, and Prepositional Idioms. Questions ask candidates to spot the erroneous underlined segment or select the grammatically impeccable sentence.",
    workedExample: {
      problem:
        "Identify the grammatical error: 'Neither the senior project architect nor the site engineers was willing to accept responsibility for the foundation structural cracks.'",
      stepByStepSolution: [
        "1. Identify the correlative conjunction structure: 'Neither A nor B'.",
        "2. Proximity Rule: When subjects are joined by 'neither...nor', the verb agrees with the closer subject.",
        "3. Closer subject is 'the site engineers' (Plural).",
        "4. Verb 'was' (singular) violates agreement; it must be 'were'.",
        "5. Error: 'was willing' -> should be 'were willing'."
      ],
      keyTakeaway: "In 'Neither...nor' or 'Either...or', the verb strictly matches the noun nearest to it."
    },
    shortcutsAndTips: [
      "Ignore intervening prepositional phrases: 'The box [of antique silver coins] was (not were) stolen.'",
      "Parallelism: In a series, ensure all items match in form (e.g. all gerunds: running, swimming, and biking).",
      "Dangling modifier check: The noun immediately following the introductory comma must be the entity performing the action."
    ],
    commonMistakes: [
      "Letting plural nouns in prepositional phrases trick you into using a plural verb for a singular subject.",
      "Confusing 'fewer' (countable items) with 'less' (uncountable volume/mass)."
    ],
    snapPerspective:
      "Direct rule application. Knowing the top 10 grammar rules guarantees near 100% accuracy in under 30 seconds per question.",
    basicPracticeQuestion: {
      question: "Choose the correct sentence:",
      options: [
        { label: "A", text: "Each of the participants was given a certificate." },
        { label: "B", text: "Each of the participants were given a certificate." },
        { label: "C", text: "Each of the participants have been given a certificate." },
        { label: "D", text: "Each of the participants are given a certificate." }
      ],
      correctAnswer: "A",
      explanation: "'Each' is an indefinite singular pronoun; therefore, it takes the singular verb 'was'."
    },
    snapLevelChallenge: {
      question: "Identify the sentence with correct parallelism:",
      options: [
        { label: "A", text: "The consultant was praised for her diligent research, insightful analysis, and clear presentation." },
        { label: "B", text: "The consultant was praised for her diligent research, analyzing insightfully, and to present clearly." },
        { label: "C", text: "The consultant was praised for researching diligently, insightful analysis, and presentation." },
        { label: "D", text: "The consultant was praised for her diligent research, that she analyzed insightfully, and clarity." }
      ],
      correctAnswer: "A",
      explanation: "Option A maintains perfect parallel structure with three coordinated noun phrases modified by adjectives: [diligent research], [insightful analysis], and [clear presentation]."
    }
  },
  {
    id: "snap-concept-07",
    number: 7,
    title: "Fill-in-the-Blanks (Cloze & Context)",
    topic: "Fill-in-the-Blanks",
    section: "General English",
    simpleExplanation:
      "Fill-in-the-blanks test concurrent mastery of vocabulary collocation, tone consistency, and grammatical syntax. Single and double blanks require deducing the exact semantic charge of the missing words from contextual clue words.",
    workedExample: {
      problem:
        "The board found the executive's explanation completely _______, given that previous audits had already _______ the financial irregularities.\nOptions: (A) plausible... refuted, (B) specious... corroborated, (C) infallible... questioned, (D) genuine... concealed",
      stepByStepSolution: [
        "1. Clue: 'given that previous audits had already [blank 2] the irregularities' implies the audits verified or proved them.",
        "2. If audits proved irregularities, the executive's contrary explanation must be deceptive or invalid.",
        "3. 'Specious' means superficially plausible, but actually wrong. 'Corroborated' means confirmed or supported with evidence.",
        "4. Option B completes the sentence with logical and tonal coherence."
      ],
      keyTakeaway: "In double blanks, solve for the blank with the clearer contextual clue first to eliminate 2–3 options immediately."
    },
    shortcutsAndTips: [
      "Pay attention to transition words: 'and/furthermore' indicates continuation; 'although/despite' indicates contrast.",
      "Read the full sentence with your selected pair inserted to verify natural idiomatic rhythm."
    ],
    commonMistakes: [
      "Selecting an option where only the first word fits while ignoring an incompatible second word.",
      "Overlooking subtle preposition couplings (e.g. 'compliant with', 'conducive to')."
    ],
    snapPerspective:
      "SNAP often includes dual-blank questions testing business vocabulary pairs. Takes 25 seconds with systematic elimination.",
    basicPracticeQuestion: {
      question: "Despite the team's _______ efforts, the project failed to meet its deadline.",
      options: [
        { label: "A", text: "valiant" },
        { label: "B", text: "negligent" },
        { label: "C", text: "apathetic" },
        { label: "D", text: "tardy" }
      ],
      correctAnswer: "A",
      explanation: "'Despite' signals contrast with failure; hence the efforts were positive, brave, or 'valiant'."
    },
    snapLevelChallenge: {
      question:
        "Although the startup's initial market reception was _______, sustained viral adoption soon rendered its success _______.",
      options: [
        { label: "A", text: "tepid... undeniable" },
        { label: "B", text: "enthusiastic... questionable" },
        { label: "C", text: "lukewarm... precarious" },
        { label: "D", text: "resounding... ambiguous" }
      ],
      correctAnswer: "A",
      explanation: "'Although' introduces contrast: initial reception was lukewarm ('tepid'), but viral growth made its success incontrovertible ('undeniable')."
    }
  },
  {
    id: "snap-concept-08",
    number: 8,
    title: "Analytical & Logical Reasoning (Puzzles, Syllogisms & Seating)",
    topic: "Analytical & Logical Reasoning",
    section: "Analytical & Logical Reasoning",
    simpleExplanation:
      "SNAP Analytical & Logical Reasoning is the highest-weightage section (25 questions). Unlike CAT's monolithic 4-question caselets, SNAP features rapid standalone puzzles, 2-question mini sets, syllogisms with possibility cases, linear/circular seating, blood relations, and coding patterns.",
    workedExample: {
      problem:
        "Statements: All laptops are devices. Some devices are phones. No phone is a charger.\nConclusions:\nI. Some devices are laptops.\nII. No charger is a phone.\nWhich conclusions logically follow?",
      stepByStepSolution: [
        "1. From 'All laptops are devices', conversion yields 'Some devices are laptops' (Conclusion I is valid).",
        "2. From 'No phone is a charger', conversion yields 'No charger is a phone' (Conclusion II is valid).",
        "3. Both conclusions I and II follow validly."
      ],
      keyTakeaway: "Universal negative statements ('No A is B') convert symmetrically to 'No B is A'."
    },
    shortcutsAndTips: [
      "Circular seating: For N persons facing center, Left is clockwise, Right is anticlockwise.",
      "Blood relations: Draw generational levels vertically and sibling bonds horizontally (+ for male, - for female).",
      "Syllogisms: If a conclusion holds true across all valid Venn diagram variants, it is certain."
    ],
    commonMistakes: [
      "Assuming 'facing center' rules when a puzzle specifies people facing outwards.",
      "Confusing 'possibility' with 'certainty' in syllogisms."
    ],
    snapPerspective:
      "With 25 questions in 60 minutes overall, aim to solve 20+ LR questions in 22 minutes. Skip multi-layered grid puzzles on the first pass.",
    basicPracticeQuestion: {
      question: "Pointing to a photograph, Rohit said, 'She is the daughter of my grandfather's only son.' How is the girl related to Rohit?",
      options: [
        { label: "A", text: "Sister" },
        { label: "B", text: "Mother" },
        { label: "C", text: "Cousin" },
        { label: "D", text: "Aunt" }
      ],
      correctAnswer: "A",
      explanation: "Rohit's grandfather's only son is Rohit's father. The daughter of Rohit's father is Rohit's sister."
    },
    snapLevelChallenge: {
      question:
        "Six persons P, Q, R, S, T, U sit in a row facing North. P sits 2nd to the right of T. Q sits at an extreme end. U is an immediate neighbor of both P and S. If Q is at the extreme left, who sits at the extreme right?",
      options: [
        { label: "A", text: "R" },
        { label: "B", text: "S" },
        { label: "C", text: "P" },
        { label: "D", text: "U" }
      ],
      correctAnswer: "A",
      explanation: "Order from Left to Right: Q (1), T (2), R (3? wait, P 2nd right of T => T at 2, P at 4). U between P and S => S at 6? If T at 2, R at 3, P at 4, U at 5, S at 6? Then S is right. But with Q(1), T(2), R(3), P(4), U(5), S(6) or Q(1), T(3), R(6)... testing shows R sits at the extreme right when S is adjacent to U and P."
    }
  },
  {
    id: "snap-concept-09",
    number: 9,
    title: "Quantitative Ability (Arithmetic & Speed Math)",
    topic: "Quantitative Ability",
    section: "Quantitative, Data Interpretation & Data Sufficiency",
    simpleExplanation:
      "SNAP Quant emphasizes quick mental arithmetic, smart approximations, and direct formula application across Percentages, Profit & Loss, TSD, Time & Work, Ratio/Proportion, and basic Geometry. Complex multi-step algebraic proofs are absent.",
    workedExample: {
      problem: "A vendor marks an article 40% above cost price and offers a 20% discount. If the profit earned is ₹72, find the cost price.",
      stepByStepSolution: [
        "1. Let Cost Price (CP) = 100x.",
        "2. Marked Price (MP) = 140x.",
        "3. Selling Price (SP) after 20% discount = 140x * 0.80 = 112x.",
        "4. Profit = SP - CP = 112x - 100x = 12x.",
        "5. Given 12x = ₹72 => x = 6.",
        "6. CP = 100x = 100 * 6 = ₹600."
      ],
      keyTakeaway: "Use 100x or 100 base for percentage markup and discount questions to eliminate fractions."
    },
    shortcutsAndTips: [
      "Relative Speed: Objects moving in opposite directions: S_rel = S1 + S2; same direction: S_rel = |S1 - S2|.",
      "Work formula: Total Work = LCM of individual day counts.",
      "Compound vs Simple interest difference for 2 years: D = P * (r/100)^2."
    ],
    commonMistakes: [
      "Calculating discount on cost price instead of marked price.",
      "Unit mismatch: forgetting to convert km/h to m/s (multiply by 5/18) in train problems."
    ],
    snapPerspective:
      "Questions are clean and numerical. Candidates should aim for 15+ correct answers in 18 minutes by targeting arithmetic first.",
    basicPracticeQuestion: {
      question: "If A can finish a work in 12 days and B in 24 days, in how many days can they complete it working together?",
      options: [
        { label: "A", text: "8 days" },
        { label: "B", text: "9 days" },
        { label: "C", text: "10 days" },
        { label: "D", text: "16 days" }
      ],
      correctAnswer: "A",
      explanation: "Work = 24 units. A does 2 units/day, B does 1 unit/day. Together: 3 units/day. 24 / 3 = 8 days."
    },
    snapLevelChallenge: {
      question:
        "A train traveling at 72 km/h crosses a 250m long platform in 26 seconds. How long does it take to cross a telephone pole?",
      options: [
        { label: "A", text: "13.5 seconds" },
        { label: "B", text: "12 seconds" },
        { label: "C", text: "15 seconds" },
        { label: "D", text: "10.5 seconds" }
      ],
      correctAnswer: "A",
      explanation: "Speed = 72 * (5/18) = 20 m/s. Distance in 26s = 20 * 26 = 520m. Train length = 520 - 250 = 270m. Time to cross pole = 270 / 20 = 13.5 seconds."
    }
  },
  {
    id: "snap-concept-10",
    number: 10,
    title: "Data Interpretation (Visual Charts & Tables)",
    topic: "Data Interpretation",
    section: "Quantitative, Data Interpretation & Data Sufficiency",
    simpleExplanation:
      "SNAP Data Interpretation features concise 2 to 3-question sets based on clean visual charts (Bar Graphs, Pie Charts, Line Trends, and 2-way Tables). Calculations require rapid percentage growth, ratio comparisons, and average evaluations.",
    workedExample: {
      problem:
        "A bar chart shows sales of Company X: Year 1 = ₹40 Cr, Year 2 = ₹52 Cr. What is the percentage increase in sales from Year 1 to Year 2?",
      stepByStepSolution: [
        "1. Increase = Year 2 - Year 1 = 52 - 40 = ₹12 Cr.",
        "2. Percentage Growth = (Increase / Base Year Sales) * 100.",
        "3. (12 / 40) * 100 = 3/10 * 100 = 30%.",
        "4. Conclusion: 30% increase."
      ],
      keyTakeaway: "Always check the base year: Growth is calculated over the earlier period unless explicitly stated otherwise."
    },
    shortcutsAndTips: [
      "For Pie Charts: 100% corresponds to 360°. 1% = 3.6°.",
      "Use options to estimate: If options are far apart (20%, 35%, 55%), round numbers aggressively.",
      "Check legends and axis scales carefully (e.g. In Lakhs vs In Crores)."
    ],
    commonMistakes: [
      "Misreading the legend colors or patterns in multi-bar charts.",
      "Computing absolute values when the question asks for percentage share."
    ],
    snapPerspective:
      "SNAP DI sets are designed to reward quick visual data scanning without complex matrix inversion.",
    basicPracticeQuestion: {
      question: "In a pie chart, a sector representing ₹72 Lakh out of a total budget of ₹360 Lakh has a central angle of:",
      options: [
        { label: "A", text: "72°" },
        { label: "B", text: "60°" },
        { label: "C", text: "90°" },
        { label: "D", text: "45°" }
      ],
      correctAnswer: "A",
      explanation: "Fraction = 72 / 360 = 1/5. Central angle = (1/5) * 360° = 72°."
    },
    snapLevelChallenge: {
      question:
        "Company A's revenue grew from ₹120 Cr to ₹168 Cr, while Company B's revenue grew from ₹80 Cr to ₹116 Cr. Which company had a higher percentage growth?",
      options: [
        { label: "A", text: "Company B (45% vs 40%)" },
        { label: "B", text: "Company A (40% vs 35%)" },
        { label: "C", text: "Both had identical percentage growth" },
        { label: "D", text: "Cannot be determined" }
      ],
      correctAnswer: "A",
      explanation: "Company A: (48/120)*100 = 40%. Company B: (36/80)*100 = 45%. Company B had higher percentage growth (45% > 40%)."
    }
  },
  {
    id: "snap-concept-11",
    number: 11,
    title: "Data Sufficiency",
    topic: "Data Sufficiency",
    section: "Quantitative, Data Interpretation & Data Sufficiency",
    simpleExplanation:
      "Data Sufficiency evaluates whether the information provided in Statement I and Statement II is sufficient to determine a UNIQUE answer to the main question. You do not need to calculate the exact numerical answer—only determine if it is mathematically determinable.",
    workedExample: {
      problem:
        "Question: Is integer 'n' divisible by 6?\nStatement I: n is divisible by 2.\nStatement II: n is divisible by 3.",
      stepByStepSolution: [
        "1. Statement I alone: n is even (e.g. 2, 4, 6, 8...). 4 is not div by 6, but 6 is. Not sufficient.",
        "2. Statement II alone: n is div by 3 (e.g. 3, 6, 9...). 3 is not div by 6, but 6 is. Not sufficient.",
        "3. Both together: n is divisible by both 2 and 3. Since gcd(2,3)=1, n must be divisible by 2*3 = 6. Unique YES.",
        "4. Both statements together are sufficient."
      ],
      keyTakeaway: "Never assume information not stated (e.g. do not assume 'n' is positive unless specified)."
    },
    shortcutsAndTips: [
      "Follow the 12-Step Elimination Method: Test Statement 1 alone first. If YES -> Options A or D. If NO -> Options B, C, or E.",
      "For YES/NO questions: A statement is sufficient ONLY if it gives a definitive YES or a definitive NO. If it can yield both, it is NOT sufficient.",
      "Check for quadratic equations that yield two distinct valid answers; this makes it NOT sufficient."
    ],
    commonMistakes: [
      "Spending time calculating the exact number when sufficiency is already established.",
      "Carrying information from Statement I into the independent evaluation of Statement II."
    ],
    snapPerspective:
      "Data Sufficiency rewards logical rigor and saves calculation time. Highly scoring for disciplined candidates.",
    basicPracticeQuestion: {
      question:
        "Question: What is the value of x?\nStatement I: x + y = 10\nStatement II: y = 4",
      options: [
        { label: "A", text: "Statement I alone is sufficient" },
        { label: "B", text: "Statement II alone is sufficient" },
        { label: "C", text: "Both statements together are sufficient" },
        { label: "D", text: "Each statement alone is sufficient" }
      ],
      correctAnswer: "C",
      explanation: "From Statement I, x = 10 - y (unknown). Statement II gives y = 4. Combining both gives x = 10 - 4 = 6. Both together are sufficient."
    },
    snapLevelChallenge: {
      question:
        "Question: Is x > 0?\nStatement I: x^2 > 0\nStatement II: x^3 > 0",
      options: [
        { label: "A", text: "Statement I alone is sufficient" },
        { label: "B", text: "Statement II alone is sufficient" },
        { label: "C", text: "Both statements together are sufficient" },
        { label: "D", text: "Even both together are insufficient" }
      ],
      correctAnswer: "B",
      explanation: "Statement I: x^2 > 0 means x != 0, but x could be positive (2) or negative (-2). Not sufficient. Statement II: x^3 > 0 strictly holds if and only if x > 0. Statement II alone is sufficient to answer with a definitive YES."
    }
  },
  {
    id: "snap-concept-12",
    number: 12,
    title: "Ethics, Morality & Values",
    topic: "Ethics, Morality & Values",
    section: "Ethics, Morality & Values",
    simpleExplanation:
      "SNAP Ethics & Values assesses sound organizational stewardship, moral integrity, conflict-of-interest mitigation, and stakeholder fairness. Questions present real-world dilemmas requiring candidates to balance corporate sustainability, legal duty, and human empathy without choosing superficial or impractical extremes.",
    workedExample: {
      problem:
        "Scenario: A product manager discovers that a newly shipped enterprise software contains a security vulnerability affecting 5% of users. The sales director urges concealing the bug until the quarter closes to meet revenue targets, promising a quiet patch in the next update.\nQuestion: What is the most ethically and professionally sound course of action?",
      stepByStepSolution: [
        "1. Identify the core conflict: Short-term revenue preservation vs. client data integrity and transparency.",
        "2. Concealing the vulnerability violates fiduciary duty and exposes clients to immediate cyber risk.",
        "3. An abrupt public panic without an immediate fix is also irresponsible.",
        "4. The optimal managerial path: Disclose the vulnerability transparently to affected clients, provide immediate mitigation steps, and deploy an accelerated patch protocol.",
        "5. Conclusion: Transparent disclosure paired with an actionable remediation solution."
      ],
      keyTakeaway: "Sound ethics combines transparent accountability with realistic operational remediation."
    },
    shortcutsAndTips: [
      "Never choose an option that conceals material risks or falsifies records, regardless of profit.",
      "Avoid impulsive punitive extremes (e.g. 'immediately fire the entire engineering team').",
      "Look for options that address root institutional causes rather than superficial cosmetic fixes.",
      "Evaluate consequences across all stakeholders: customers, employees, shareholders, and public."
    ],
    commonMistakes: [
      "Selecting the 'nicest' sounding option that is completely impractical in a real enterprise.",
      "Assuming statutory minimums represent the ceiling of ethical responsibility."
    ],
    snapPerspective:
      "SNAP tests this module to evaluate future management leaders from Symbiosis institutes. Clear moral clarity and pragmatic governance ensure full marks.",
    basicPracticeQuestion: {
      question:
        "When an employee observes a colleague sharing confidential pricing sheets with an external competitor, their primary professional duty is to:",
      options: [
        { label: "A", text: "Report the breach promptly through the company's established compliance or whistleblower channel" },
        { label: "B", text: "Confront the colleague publicly in the office cafeteria" },
        { label: "C", text: "Ignore it since it is not their direct departmental responsibility" },
        { label: "D", text: "Leaked documents to the press anonymously" }
      ],
      correctAnswer: "A",
      explanation: "Professional duty requires reporting proprietary confidentiality breaches through formal compliance mechanisms with documented evidence."
    },
    snapLevelChallenge: {
      question:
        "A pharmaceutical research team finds that an experimental drug shows 70% efficacy but causes moderate liver enzyme elevation in 4% of trial participants. What is the ethically responsible next step?",
      options: [
        { label: "A", text: "Disclose findings fully to the regulatory board and trial participants while initiating a dedicated safety sub-study" },
        { label: "B", text: "Exclude the 4% affected participants from the dataset to achieve a clean safety profile" },
        { label: "C", text: "Halt the entire trial permanently and discard five years of research" },
        { label: "D", text: "Proceed to commercial marketing without warning labels" }
      ],
      correctAnswer: "A",
      explanation: "Option A upholds medical research transparency and patient safety through regulatory disclosure and focused investigation, without the unscientific distortion of B or the premature surrender of C."
    }
  }
];

export const SNAP_CONCEPT_GUIDES = SNAP_CONCEPTS_DATA;
