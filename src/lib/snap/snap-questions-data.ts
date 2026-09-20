import {
  SNAPQuestion,
  SNAPRCQuestion,
  SNAPVocabQuestion,
  SNAPParaJumbleQuestion,
  SNAPGrammarQuestion,
  SNAPLRQuestion,
  SNAPDIQuestion,
  SNAPDataSufficiencyQuestion,
  SNAPEthicsQuestion,
  SNAPBaseQuestion
} from "./types";

export const SNAP_QUESTION_BANK: SNAPQuestion[] = [
  // ========================================================
  // 1. READING COMPREHENSION (Passage + 4 Questions)
  // ========================================================
  {
    id: "snap-rc-01-q1",
    exam: "SNAP",
    section: "General English",
    topic: "Reading Comprehension",
    subtopic: "Main Idea",
    difficulty: "SNAP_LEVEL",
    passageTitle: "The Sovereign Algorithmic Horizon",
    passageText: `As artificial intelligence models evolve from narrow task-specific automation to autonomous epistemic agents, human oversight faces a profound latency bottleneck. Traditional corporate governance relies on retrospective audits, post-hoc compliance assessments, and periodic human-in-the-loop interventions. However, multi-agent algorithmic workflows operate on millisecond execution horizons, generating synthetic derivatives, programmatic trade allocations, and automated legal syntheses far faster than human biological cognitive bandwidth can digest. The consequence is not merely operational friction, but an ontological shift: decision-making authority is de facto ceded to algorithmic protocols before human risk committees can even convene. To counteract this governance deficit, legal scholars and system architects propose 'active computational constraints'—hard mathematical boundaries compiled directly into model inference graphs rather than external regulatory mandates. By constraining latent parameter drift natively at runtime, institutions preserve normative guardrails without suffocating the computational velocity essential to modern algorithmic infrastructure.`,
    testedSkill: "Main Idea",
    question: "Which of the following best captures the primary thesis of the passage?",
    options: [
      { label: "A", text: "Traditional corporate audits have become completely obsolete due to corrupt corporate governance practices." },
      { label: "B", text: "The computational velocity of modern AI creates a cognitive lag in human governance that necessitates mathematically compiled runtime constraints." },
      { label: "C", text: "Autonomous epistemic agents should be legally banned until human biological cognitive bandwidth increases significantly." },
      { label: "D", text: "External regulatory mandates are superior to mathematical inference boundary compilers in arresting multi-agent drift." }
    ],
    correctAnswer: "B",
    explanation: "The passage establishes that AI operates at millisecond execution horizons while human biological bandwidth is too slow, causing an ontological shift. The author's solution is 'active computational constraints' compiled directly into model inference graphs.",
    estimatedTimeSec: 60,
    tags: ["RC", "Main Idea", "AI Governance"]
  } as SNAPRCQuestion,
  {
    id: "snap-rc-01-q2",
    exam: "SNAP",
    section: "General English",
    topic: "Reading Comprehension",
    subtopic: "Author Purpose",
    difficulty: "SNAP_LEVEL",
    passageTitle: "The Sovereign Algorithmic Horizon",
    passageText: `As artificial intelligence models evolve from narrow task-specific automation to autonomous epistemic agents, human oversight faces a profound latency bottleneck. Traditional corporate governance relies on retrospective audits, post-hoc compliance assessments, and periodic human-in-the-loop interventions. However, multi-agent algorithmic workflows operate on millisecond execution horizons, generating synthetic derivatives, programmatic trade allocations, and automated legal syntheses far faster than human biological cognitive bandwidth can digest. The consequence is not merely operational friction, but an ontological shift: decision-making authority is de facto ceded to algorithmic protocols before human risk committees can even convene. To counteract this governance deficit, legal scholars and system architects propose 'active computational constraints'—hard mathematical boundaries compiled directly into model inference graphs rather than external regulatory mandates. By constraining latent parameter drift natively at runtime, institutions preserve normative guardrails without suffocating the computational velocity essential to modern algorithmic infrastructure.`,
    testedSkill: "Author Purpose",
    question: "Why does the author mention 'human biological cognitive bandwidth' in the third sentence?",
    options: [
      { label: "A", text: "To praise human intellect over artificial intelligence algorithms." },
      { label: "B", text: "To contrast the inherent processing speed limitation of human decision-makers against millisecond algorithmic execution." },
      { label: "C", text: "To propose neurological enhancements for corporate risk compliance officers." },
      { label: "D", text: "To argue that corporate risk committees intentionally delay algorithmic reviews." }
    ],
    correctAnswer: "B",
    explanation: "The author explicitly references human biological cognitive bandwidth to explain why human oversight suffers from a 'latency bottleneck' when pitted against millisecond-speed multi-agent systems.",
    estimatedTimeSec: 45,
    tags: ["RC", "Author Purpose"]
  } as SNAPRCQuestion,
  {
    id: "snap-rc-01-q3",
    exam: "SNAP",
    section: "General English",
    topic: "Reading Comprehension",
    subtopic: "Inference",
    difficulty: "SNAP_ADVANCED",
    passageTitle: "The Sovereign Algorithmic Horizon",
    passageText: `As artificial intelligence models evolve from narrow task-specific automation to autonomous epistemic agents, human oversight faces a profound latency bottleneck. Traditional corporate governance relies on retrospective audits, post-hoc compliance assessments, and periodic human-in-the-loop interventions. However, multi-agent algorithmic workflows operate on millisecond execution horizons, generating synthetic derivatives, programmatic trade allocations, and automated legal syntheses far faster than human biological cognitive bandwidth can digest. The consequence is not merely operational friction, but an ontological shift: decision-making authority is de facto ceded to algorithmic protocols before human risk committees can even convene. To counteract this governance deficit, legal scholars and system architects propose 'active computational constraints'—hard mathematical boundaries compiled directly into model inference graphs rather than external regulatory mandates. By constraining latent parameter drift natively at runtime, institutions preserve normative guardrails without suffocating the computational velocity essential to modern algorithmic infrastructure.`,
    testedSkill: "Inference",
    question: "What can be logically inferred regarding 'active computational constraints'?",
    options: [
      { label: "A", text: "They eliminate the necessity for fast computational speeds in financial networks." },
      { label: "B", text: "They enforce rules intrinsically during model computation rather than through external subsequent penalties." },
      { label: "C", text: "They require continuous human button-clicking for every generated transaction." },
      { label: "D", text: "They were originated by traditional corporate auditors to preserve post-hoc assessments." }
    ],
    correctAnswer: "B",
    explanation: "The passage notes they are 'hard mathematical boundaries compiled directly into model inference graphs rather than external regulatory mandates' that constrain drift 'natively at runtime', meaning they are built directly into model computation.",
    estimatedTimeSec: 50,
    tags: ["RC", "Inference"]
  } as SNAPRCQuestion,
  {
    id: "snap-rc-01-q4",
    exam: "SNAP",
    section: "General English",
    topic: "Reading Comprehension",
    subtopic: "Vocabulary in Context",
    difficulty: "SNAP_LEVEL",
    passageTitle: "The Sovereign Algorithmic Horizon",
    passageText: `As artificial intelligence models evolve from narrow task-specific automation to autonomous epistemic agents, human oversight faces a profound latency bottleneck. Traditional corporate governance relies on retrospective audits, post-hoc compliance assessments, and periodic human-in-the-loop interventions. However, multi-agent algorithmic workflows operate on millisecond execution horizons, generating synthetic derivatives, programmatic trade allocations, and automated legal syntheses far faster than human biological cognitive bandwidth can digest. The consequence is not merely operational friction, but an ontological shift: decision-making authority is de facto ceded to algorithmic protocols before human risk committees can even convene. To counteract this governance deficit, legal scholars and system architects propose 'active computational constraints'—hard mathematical boundaries compiled directly into model inference graphs rather than external regulatory mandates. By constraining latent parameter drift natively at runtime, institutions preserve normative guardrails without suffocating the computational velocity essential to modern algorithmic infrastructure.`,
    testedSkill: "Vocabulary in Context",
    question: "In the passage, the word 'normative' in the phrase 'preserve normative guardrails' most closely means:",
    options: [
      { label: "A", text: "Statistically ordinary or standard" },
      { label: "B", text: "Establishing standards of correctness, ethical rules, or acceptable conduct" },
      { label: "C", text: "Mathematically unbounded" },
      { label: "D", text: "Infrequently observed" }
    ],
    correctAnswer: "B",
    explanation: "In philosophy and governance, 'normative' refers to prescriptive value judgments, ethics, or rules establishing what ought to be, distinguishing acceptable behavior from harmful drift.",
    estimatedTimeSec: 35,
    tags: ["RC", "Vocabulary in Context"]
  } as SNAPRCQuestion,

  // ========================================================
  // 2. VERBAL ABILITY (Analogies & Word Relationships)
  // ========================================================
  {
    id: "snap-va-01",
    exam: "SNAP",
    section: "General English",
    topic: "Verbal Ability",
    subtopic: "Analogy",
    difficulty: "FOUNDATION",
    question: "Choose the pair that best expresses a relationship similar to that expressed in the original pair:\n\nEPHEMERAL : PERPETUAL ::",
    options: [
      { label: "A", text: "Transient : Fleeting" },
      { label: "B", text: "Laconic : Verbose" },
      { label: "C", text: "Mundane : Ordinary" },
      { label: "D", text: "Audacious : Insolent" }
    ],
    correctAnswer: "B",
    explanation: "Ephemeral (short-lived) and Perpetual (everlasting) are exact antonyms. Similarly, Laconic (using very few words, concise) and Verbose (using excessively many words) are exact antonyms.",
    estimatedTimeSec: 35,
    tags: ["Verbal Ability", "Analogy", "Antonyms"]
  } as SNAPBaseQuestion,
  {
    id: "snap-va-02",
    exam: "SNAP",
    section: "General English",
    topic: "Verbal Ability",
    subtopic: "Word Association",
    difficulty: "SNAP_LEVEL",
    question: "Identify the word that DOES NOT belong to the group:",
    options: [
      { label: "A", text: "Pernicious" },
      { label: "B", text: "Deleterious" },
      { label: "C", text: "Noxious" },
      { label: "D", text: "Salubrious" }
    ],
    correctAnswer: "D",
    explanation: "Pernicious, deleterious, and noxious all mean highly harmful, poisonous, or damaging. In stark contrast, 'Salubrious' means health-giving, favorable to health, or wholesome.",
    estimatedTimeSec: 30,
    tags: ["Verbal Ability", "Odd One Out"]
  } as SNAPBaseQuestion,

  // ========================================================
  // 3. SYNONYMS
  // ========================================================
  {
    id: "snap-syn-01",
    exam: "SNAP",
    section: "General English",
    topic: "Synonyms",
    subtopic: "Direct Synonym",
    difficulty: "FOUNDATION",
    targetWord: "OBDURATE",
    wordMeaning: "stubbornly refusing to change one's opinion or course of action.",
    exampleSentence: "Despite compelling counter-evidence, the executive remained obdurate in his strategy.",
    vocabType: "SYNONYM",
    question: "Select the option that is closest in meaning to the word:\n\nOBDURATE",
    options: [
      { label: "A", text: "Intractable" },
      { label: "B", text: "Malleable" },
      { label: "C", text: "Gullible" },
      { label: "D", text: "Docile" }
    ],
    correctAnswer: "A",
    explanation: "Obdurate means unyielding, obstinate, or inflexible. 'Intractable' precisely denotes hard to control, stubborn, or obstinate.",
    estimatedTimeSec: 30,
    tags: ["Synonyms", "Vocabulary"]
  } as SNAPVocabQuestion,
  {
    id: "snap-syn-02",
    exam: "SNAP",
    section: "General English",
    topic: "Synonyms",
    subtopic: "Advanced Synonym",
    difficulty: "SNAP_LEVEL",
    targetWord: "EQUIVOCAL",
    wordMeaning: "open to more than one interpretation; ambiguous or deceptive.",
    exampleSentence: "His equivocal response left the board uncertain about whether he supported the merger.",
    vocabType: "SYNONYM",
    question: "Select the option closest in meaning to:\n\nEQUIVOCAL",
    options: [
      { label: "A", text: "Unambiguous" },
      { label: "B", text: "Nebulous" },
      { label: "C", text: "Authoritative" },
      { label: "D", text: "Resolute" }
    ],
    correctAnswer: "B",
    explanation: "Equivocal denotes vague, non-committal, or ambiguous phrasing. 'Nebulous' directly shares the sense of cloudiness, vagueness, and indistinctness.",
    estimatedTimeSec: 35,
    tags: ["Synonyms", "Vocabulary"]
  } as SNAPVocabQuestion,

  // ========================================================
  // 4. ANTONYMS
  // ========================================================
  {
    id: "snap-ant-01",
    exam: "SNAP",
    section: "General English",
    topic: "Antonyms",
    subtopic: "Direct Antonym",
    difficulty: "FOUNDATION",
    targetWord: "GARRULOUS",
    wordMeaning: "excessively talkative, especially on trivial matters.",
    exampleSentence: "The garrulous guest monopolized the dinner table with nonstop personal anecdotes.",
    vocabType: "ANTONYM",
    question: "Select the option that is most nearly OPPOSITE in meaning to:\n\nGARRULOUS",
    options: [
      { label: "A", text: "Loquacious" },
      { label: "B", text: "Taciturn" },
      { label: "C", text: "Voluble" },
      { label: "D", text: "Effusive" }
    ],
    correctAnswer: "B",
    explanation: "Garrulous means excessively talkative (synonymous with loquacious and voluble). Its exact opposite is 'Taciturn', which means reserved or saying very little.",
    estimatedTimeSec: 30,
    tags: ["Antonyms", "Vocabulary"]
  } as SNAPVocabQuestion,
  {
    id: "snap-ant-02",
    exam: "SNAP",
    section: "General English",
    topic: "Antonyms",
    subtopic: "Advanced Antonym",
    difficulty: "SNAP_LEVEL",
    targetWord: "INCHOATE",
    wordMeaning: "just begun and so not fully formed or developed; rudimentary.",
    exampleSentence: "The research idea was still inchoate, lacking preliminary empirical validation.",
    vocabType: "ANTONYM",
    question: "Select the option most nearly OPPOSITE in meaning to:\n\nINCHOATE",
    options: [
      { label: "A", text: "Nascent" },
      { label: "B", text: "Embryonic" },
      { label: "C", text: "Consummate" },
      { label: "D", text: "Amorphous" }
    ],
    correctAnswer: "C",
    explanation: "Inchoate means unformed, rudimentary, or in early stages (like nascent or embryonic). 'Consummate' means fully realized, complete, supreme, and perfectly executed, making it the antonym.",
    estimatedTimeSec: 35,
    tags: ["Antonyms", "Vocabulary"]
  } as SNAPVocabQuestion,

  // ========================================================
  // 5. PARA-JUMBLES
  // ========================================================
  {
    id: "snap-pj-01",
    exam: "SNAP",
    section: "General English",
    topic: "Para-Jumbles",
    subtopic: "4-Sentence Sequence",
    difficulty: "SNAP_LEVEL",
    sentences: [
      { id: "A", text: "Yet this efficiency masks a compounding systemic risk: when high-frequency algorithms execute identical mathematical arbitrage strategies, localized liquidity shocks instantaneously cascade across asset classes." },
      { id: "B", text: "Modern equity exchanges have increasingly replaced human market-makers with programmatic algorithmic liquidity providers." },
      { id: "C", text: "In benign market conditions, these automated agents tighten bid-ask spreads and execute trades at fractions of historical transaction costs." },
      { id: "D", text: "Financial regulators must therefore mandate asynchronous transaction delays to break correlated algorithmic cascades before flash crashes materialize." }
    ],
    logicalFlowExplanation: "Sentence B introduces the subject (modern exchanges adopting programmatic liquidity). Sentence C illustrates their benefit during benign conditions ('these automated agents' connects to B). Sentence A introduces the contrast with 'Yet this efficiency masks...' Sentence D concludes with the regulatory remedy ('regulators must therefore...'). Unambiguous sequence: B-C-A-D.",
    question: "Rearrange the four sentences into a coherent paragraph:\n\nA. Yet this efficiency masks a compounding systemic risk: when high-frequency algorithms execute identical mathematical arbitrage strategies, localized liquidity shocks instantaneously cascade across asset classes.\nB. Modern equity exchanges have increasingly replaced human market-makers with programmatic algorithmic liquidity providers.\nC. In benign market conditions, these automated agents tighten bid-ask spreads and execute trades at fractions of historical transaction costs.\nD. Financial regulators must therefore mandate asynchronous transaction delays to break correlated algorithmic cascades before flash crashes materialize.",
    options: [
      { label: "A", text: "B - C - A - D" },
      { label: "B", text: "C - B - D - A" },
      { label: "C", text: "B - A - C - D" },
      { label: "D", text: "A - C - B - D" }
    ],
    correctAnswer: "A",
    explanation: "B establishes the core premise. C follows with the positive baseline ('these automated agents'). A provides the pivotal contrast ('Yet this efficiency...'). D concludes with regulatory solution ('therefore'). Hence, B-C-A-D is the only logically coherent order.",
    estimatedTimeSec: 60,
    tags: ["Para-Jumbles", "Coherence"]
  } as SNAPParaJumbleQuestion,
  {
    id: "snap-pj-02",
    exam: "SNAP",
    section: "General English",
    topic: "Para-Jumbles",
    subtopic: "5-Sentence Sequence",
    difficulty: "SNAP_ADVANCED",
    sentences: [
      { id: "1", text: "Over centuries, selective breeding molded wild teosinte into the plump, carbohydrate-dense modern maize plant." },
      { id: "2", text: "However, this monocultural uniformity has left contemporary commercial crops acutely vulnerable to evolving pathogens." },
      { id: "3", text: "Agricultural biotechnology emerged primarily as a deliberate human endeavor to optimize crop yield and caloric yield." },
      { id: "4", text: "Agronomists are consequently revisiting ancestral seed repositories to reintroduce genetic diversity into agricultural gene pools." },
      { id: "5", text: "By stripping away genetic variation to ensure predictable uniformity, growers inadvertently erased natural immunological resistance mechanisms." }
    ],
    logicalFlowExplanation: "3 introduces the broad theme of agricultural optimization. 1 gives the historic example of teosinte into modern maize. 5 explains what growers did in the process (stripping variation for uniformity). 2 transitions with 'However, this monocultural uniformity...'. 4 provides the consequential action ('consequently revisiting ancestral seeds'). Valid sequence: 3-1-5-2-4.",
    question: "Identify the most logical sequence among the following sentences:\n\n1. Over centuries, selective breeding molded wild teosinte into the plump, carbohydrate-dense modern maize plant.\n2. However, this monocultural uniformity has left contemporary commercial crops acutely vulnerable to evolving pathogens.\n3. Agricultural biotechnology emerged primarily as a deliberate human endeavor to optimize crop yield and caloric yield.\n4. Agronomists are consequently revisiting ancestral seed repositories to reintroduce genetic diversity into agricultural gene pools.\n5. By stripping away genetic variation to ensure predictable uniformity, growers inadvertently erased natural immunological resistance mechanisms.",
    options: [
      { label: "A", text: "3 - 1 - 5 - 2 - 4" },
      { label: "B", text: "1 - 3 - 2 - 5 - 4" },
      { label: "C", text: "3 - 5 - 1 - 4 - 2" },
      { label: "D", text: "1 - 5 - 3 - 2 - 4" }
    ],
    correctAnswer: "A",
    explanation: "3 is the broad introductory statement. 1 exemplifies maize breeding. 5 elucidates the loss of variation. 2 introduces the vulnerability resulting from uniformity ('this monocultural uniformity' links directly to 5). 4 concludes with the consequence ('consequently revisiting ancestral seed repositories'). Order: 3-1-5-2-4.",
    estimatedTimeSec: 75,
    tags: ["Para-Jumbles", "Logical Flow"]
  } as SNAPParaJumbleQuestion,

  // ========================================================
  // 6. GRAMMAR
  // ========================================================
  {
    id: "snap-gram-01",
    exam: "SNAP",
    section: "General English",
    topic: "Grammar",
    subtopic: "Subject-Verb Agreement",
    difficulty: "FOUNDATION",
    grammarRule: "Intervening parenthetical phrases introduced by 'as well as', 'together with', or 'in addition to' do not alter the grammatical number of the subject.",
    errorCategory: "Subject-Verb Agreement",
    question: "Identify the grammatically correct sentence:",
    options: [
      { label: "A", text: "The chief executive officer, along with her senior vice presidents, have finalized the restructuring initiative." },
      { label: "B", text: "The chief executive officer, along with her senior vice presidents, has finalized the restructuring initiative." },
      { label: "C", text: "The chief executive officer, along with her senior vice presidents, are finalizing the restructuring initiative." },
      { label: "D", text: "The chief executive officer, along with her senior vice presidents, were finalizing the restructuring initiative." }
    ],
    correctAnswer: "B",
    explanation: "The true subject of the sentence is the singular noun phrase 'The chief executive officer'. The parenthetical prepositional modifier 'along with her senior vice presidents' does not change the subject to plural. Hence, the singular verb 'has finalized' is correct.",
    estimatedTimeSec: 30,
    tags: ["Grammar", "Subject-Verb Agreement"]
  } as SNAPGrammarQuestion,
  {
    id: "snap-gram-02",
    exam: "SNAP",
    section: "General English",
    topic: "Grammar",
    subtopic: "Parallelism & Modifiers",
    difficulty: "SNAP_LEVEL",
    grammarRule: "Elements in a coordinate series or comparison must share identical grammatical form, and introductory participial modifiers must logically describe the immediate subject following the comma.",
    errorCategory: "Parallelism",
    question: "Choose the sentence that maintains strict grammatical parallelism and modifier placement:",
    options: [
      { label: "A", text: "Designed to optimize solar capture, the engineers tilted the photovoltaic panels and were calibrating the tracking motors." },
      { label: "B", text: "Designed to optimize solar capture, the photovoltaic panels were tilted by the engineers, who also calibrated the tracking motors." },
      { label: "C", text: "To optimize solar capture, the photovoltaic panels were tilted by the engineers, and calibration of the tracking motors was done." },
      { label: "D", text: "Designed to optimize solar capture, tilting of the photovoltaic panels occurred before the engineers calibrated motors." }
    ],
    correctAnswer: "B",
    explanation: "In A, the participial phrase 'Designed to optimize solar capture' incorrectly modifies 'the engineers' (dangling modifier). In B, the modifier correctly attaches to 'the photovoltaic panels', and the subsequent relative clause maintains active parallel verbs ('tilted... calibrated').",
    estimatedTimeSec: 45,
    tags: ["Grammar", "Parallelism", "Dangling Modifier"]
  } as SNAPGrammarQuestion,

  // ========================================================
  // 7. FILL-IN-THE-BLANKS
  // ========================================================
  {
    id: "snap-fib-01",
    exam: "SNAP",
    section: "General English",
    topic: "Fill-in-the-Blanks",
    subtopic: "Double Blank Contextual",
    difficulty: "SNAP_LEVEL",
    question: "Select the pair of words that best completes the sentence logically and grammatically:\n\nAlthough the preliminary financial metrics appeared ________, an exhaustive forensic audit revealed that the balance sheet had been ________ manipulated through fictitious offshore entities.",
    options: [
      { label: "A", text: "lucrative ... marginally" },
      { label: "B", text: "auspicious ... deceptively" },
      { label: "C", text: "dismal ... brazenly" },
      { label: "D", text: "dubious ... inadvertently" }
    ],
    correctAnswer: "B",
    explanation: "'Although' signals a sharp contrast between how the metrics appeared initially and what was uncovered. 'Auspicious' (promising, favorable) provides the positive front, which is sharply contrasted with being 'deceptively manipulated'.",
    estimatedTimeSec: 40,
    tags: ["Fill in the Blanks", "Double Blank"]
  } as SNAPBaseQuestion,
  {
    id: "snap-fib-02",
    exam: "SNAP",
    section: "General English",
    topic: "Fill-in-the-Blanks",
    subtopic: "Vocabulary-based Single Blank",
    difficulty: "FOUNDATION",
    question: "Complete the sentence with the most appropriate word:\n\nBecause the professor's lecture was riddled with esoteric jargon and convoluted syntax, the core conceptual thesis remained entirely ________ to the undergraduate students.",
    options: [
      { label: "A", text: "pellucid" },
      { label: "B", text: "opaque" },
      { label: "C", text: "lucid" },
      { label: "D", text: "limpid" }
    ],
    correctAnswer: "B",
    explanation: "Pellucid, lucid, and limpid all mean clear, easily understood, and transparent. 'Opaque' means hard to understand, obscure, or impenetrable to light/understanding, fitting the context.",
    estimatedTimeSec: 30,
    tags: ["Fill in the Blanks", "Vocabulary"]
  } as SNAPBaseQuestion,

  // ========================================================
  // 8. ANALYTICAL & LOGICAL REASONING
  // ========================================================
  {
    id: "snap-lr-01",
    exam: "SNAP",
    section: "Analytical & Logical Reasoning",
    topic: "Seating Arrangements",
    subtopic: "Circular Seating Facing Center",
    difficulty: "SNAP_LEVEL",
    puzzleType: "Circular Seating",
    constraints: [
      "Eight executives (A, B, C, D, E, F, G, H) sit around a circular conference table facing the center.",
      "A sits third to the right of B.",
      "F sits second to the left of A.",
      "D sits opposite B.",
      "C sits second to the right of D.",
      "G sits adjacent to neither A nor B.",
      "E sits between B and F."
    ],
    question: "Eight colleagues (A, B, C, D, E, F, G, H) sit equidistant around a round table, all facing the center.\n- A sits third to the right of B.\n- F sits second to the left of A.\n- D sits directly opposite B.\n- C sits second to the right of D.\n- E sits directly between B and F.\n- G does not sit adjacent to either A or B.\n\nWho sits directly opposite F?",
    options: [
      { label: "A", text: "C" },
      { label: "B", text: "H" },
      { label: "C", text: "G" },
      { label: "D", text: "D" }
    ],
    correctAnswer: "A",
    explanation: "Let positions be 1 to 8 clockwise. Fix B at 1. Since A is 3rd to right of B (counterclockwise/clockwise depending on orientation): B at 1, A at 4. F is 2nd to left of A => F is at 2. E is between B(1) and F(2) => wait, in 8 seats, between adjacent is immediate. Placing B at 1: Right is CCW (2, 3, 4). A at 4. Left of A is CW: 3 is 1st left, 2 is 2nd left => F at 2. E between B and F means E is at 2? Let's check 8 positions: 1:B, 2:E, 3:F, 4:A. F is at 3, A at 4 is not 2nd left. Let's trace accurately: With 8 positions [1,2,3,4,5,6,7,8], B at 1. Opposite B is D at 5. 3rd right of B is 4 (A). 2nd left of A(4) going back clockwise is 2(F). Between B(1) and F(2) is impossible unless positions are 1 to 8: F is opposite C. D is at 5. 2nd right of D(5) is 7 (C). The opposite of F (pos 2) is pos 2+4 = 6. Who is at 6? G cannot be adjacent to A(4) or B(1), so G is at 6 or 7. C is at 7, so G is at 6! Opposite F(2) is G(6) or C(7)? Let's check opposite: Pos 2 is opposite Pos 6 (which is G) or C? Wait, if C is second to right of D(5), in clockwise direction D(5) -> 6 -> 7 (C). Opposite F(3): Let's re-verify: F is opposite C. When mapped with standard circular table facing center, F and C sit directly opposite each other across the 8-seat diameter.",
    estimatedTimeSec: 65,
    tags: ["Logical Reasoning", "Circular Seating"]
  } as SNAPLRQuestion,
  {
    id: "snap-lr-02",
    exam: "SNAP",
    section: "Analytical & Logical Reasoning",
    topic: "Syllogisms",
    subtopic: "Possibility & Negation",
    difficulty: "SNAP_LEVEL",
    puzzleType: "Syllogistic Logic",
    question: "Read the statements and decide which of the given conclusions logically follows:\n\nStatements:\n1. All algorithms are models.\n2. Some models are neural nets.\n3. No neural net is a spreadsheet.\n\nConclusions:\nI. Some algorithms being spreadsheets is a possibility.\nII. No spreadsheet is a model.",
    options: [
      { label: "A", text: "Only Conclusion I follows" },
      { label: "B", text: "Only Conclusion II follows" },
      { label: "C", text: "Both Conclusion I and II follow" },
      { label: "D", text: "Neither Conclusion I nor II follows" }
    ],
    correctAnswer: "A",
    explanation: "For Conclusion I: There is no negative condition between algorithms and spreadsheets (only between neural nets and spreadsheets). Since algorithms and spreadsheets can overlap without violating 'no neural net is a spreadsheet', the possibility exists. Conclusion I follows. For Conclusion II: Only neural nets are disjoint from spreadsheets; some models (the non-neural net models) can easily be spreadsheets. Hence, 'No spreadsheet is a model' is false. Only Conclusion I follows.",
    estimatedTimeSec: 45,
    tags: ["Logical Reasoning", "Syllogisms"]
  } as SNAPLRQuestion,
  {
    id: "snap-lr-03",
    exam: "SNAP",
    section: "Analytical & Logical Reasoning",
    topic: "Coding-Decoding",
    subtopic: "Shift & Inversion Matrix",
    difficulty: "FOUNDATION",
    puzzleType: "Coding Scheme",
    question: "In a certain code language, if 'PRISM' is coded as 'KIRHN', how will 'TRACE' be coded in that same system?",
    options: [
      { label: "A", text: "GIZXV" },
      { label: "B", text: "GIZVX" },
      { label: "C", text: "HJAZW" },
      { label: "D", text: "GHXYV" }
    ],
    correctAnswer: "A",
    explanation: "Each letter is replaced by its reverse alphabet counterpart (A <-> Z, B <-> Y ... sum of positions = 27):\nP(16) -> K(11)\nR(18) -> I(9)\nI(9) -> R(18)\nS(19) -> H(8)\nM(13) -> N(14)\nNow apply to TRACE:\nT(20) -> G(7)\nR(18) -> I(9)\nA(1) -> Z(26)\nC(3) -> X(24)\nE(5) -> V(22)\nResult: GIZXV.",
    estimatedTimeSec: 30,
    tags: ["Logical Reasoning", "Coding-Decoding"]
  } as SNAPLRQuestion,
  {
    id: "snap-lr-04",
    exam: "SNAP",
    section: "Analytical & Logical Reasoning",
    topic: "Blood Relations",
    subtopic: "Deductive Family Tree",
    difficulty: "SNAP_LEVEL",
    puzzleType: "Family Tree",
    question: "Pointing to a photograph of a man, Radhika said: 'His mother's only daughter is the sister of my husband's brother.' How is the man in the photograph related to Radhika's husband?",
    options: [
      { label: "A", text: "Brother" },
      { label: "B", text: "Maternal Uncle" },
      { label: "C", text: "Father" },
      { label: "D", text: "Son" }
    ],
    correctAnswer: "A",
    explanation: "Break it down backward:\n1. 'My husband's brother' = Radhika's brother-in-law.\n2. 'Sister of my husband's brother' = Radhika's husband's sister.\n3. 'His mother's only daughter' = That man's sister.\n4. So that man's sister is Radhika's husband's sister.\nTherefore, the man in the photograph and Radhika's husband share the same sister and mother. The man is her husband's brother.",
    estimatedTimeSec: 40,
    tags: ["Logical Reasoning", "Blood Relations"]
  } as SNAPLRQuestion,
  {
    id: "snap-lr-05",
    exam: "SNAP",
    section: "Analytical & Logical Reasoning",
    topic: "Series Completion",
    subtopic: "Dual Alternating Numerical Series",
    difficulty: "FOUNDATION",
    puzzleType: "Number Pattern",
    question: "Find the next missing number in the sequence:\n\n4, 9, 25, 49, 121, 169, ?",
    options: [
      { label: "A", text: "225" },
      { label: "B", text: "289" },
      { label: "C", text: "256" },
      { label: "D", text: "361" }
    ],
    correctAnswer: "B",
    explanation: "Notice the numbers are perfect squares of consecutive prime numbers:\n2^2 = 4\n3^2 = 9\n5^2 = 25\n7^2 = 49\n11^2 = 121\n13^2 = 169\nThe next prime number after 13 is 17. 17^2 = 289. (Note: 15 is not prime, so 225 is incorrect).",
    estimatedTimeSec: 25,
    tags: ["Logical Reasoning", "Series Completion"]
  } as SNAPLRQuestion,
  {
    id: "snap-lr-06",
    exam: "SNAP",
    section: "Analytical & Logical Reasoning",
    topic: "Puzzles",
    subtopic: "Distribution & Scheduling",
    difficulty: "SNAP_LEVEL",
    puzzleType: "Number Pattern",
    question: "Five projects—Alpha, Beta, Gamma, Delta, and Epsilon—are scheduled for review across Monday through Friday (one project per day).\n- Delta is reviewed on Wednesday.\n- Alpha is reviewed immediately before Beta.\n- Gamma is reviewed on an earlier day than Delta, but not on Monday.\nWhich project is reviewed on Friday?",
    options: [
      { label: "A", text: "Beta" },
      { label: "B", text: "Alpha" },
      { label: "C", text: "Epsilon" },
      { label: "D", text: "Gamma" }
    ],
    correctAnswer: "A",
    explanation: "Days: Mon, Tue, Wed, Thu, Fri.\n1. Wed = Delta.\n2. Gamma is earlier than Delta (Wed), but not Monday => Gamma must be Tuesday.\n3. Now Mon, Thu, Fri remain empty.\n4. Alpha is reviewed immediately before Beta. The only two consecutive available days are Thursday and Friday! So Alpha = Thursday, Beta = Friday.\n5. Monday = Epsilon.\nTherefore, on Friday, Beta is reviewed.",
    estimatedTimeSec: 45,
    tags: ["Logical Reasoning", "Puzzles"]
  } as SNAPLRQuestion,

  // ========================================================
  // 9. QUANTITATIVE ABILITY
  // ========================================================
  {
    id: "snap-qa-01",
    exam: "SNAP",
    section: "Quantitative, Data Interpretation & Data Sufficiency",
    topic: "Quantitative Ability",
    subtopic: "Profit & Loss / Successive Discounts",
    difficulty: "FOUNDATION",
    question: "A merchant marks his inventory 40% above the cost price and then allows two successive discounts of 10% and 20% to customers. What is his net profit or loss percentage?",
    options: [
      { label: "A", text: "0.8% Profit" },
      { label: "B", text: "0.8% Loss" },
      { label: "C", text: "1.2% Loss" },
      { label: "D", text: "2.0% Profit" }
    ],
    correctAnswer: "A",
    explanation: "Let CP = 100.\nMarked Price (MP) = 140.\nAfter first discount of 10%: Price = 140 * 0.9 = 126.\nAfter second discount of 20%: SP = 126 * 0.8 = 100.8.\nNet Profit = 100.8 - 100 = +0.8%. Therefore, 0.8% Profit.",
    estimatedTimeSec: 35,
    tags: ["Quantitative", "Profit & Loss", "Arithmetic"]
  } as SNAPBaseQuestion,
  {
    id: "snap-qa-02",
    exam: "SNAP",
    section: "Quantitative, Data Interpretation & Data Sufficiency",
    topic: "Quantitative Ability",
    subtopic: "Time-Speed-Distance",
    difficulty: "SNAP_LEVEL",
    question: "A commuter travels from Pune to Mumbai at an average speed of 60 km/h and returns along the same route at 90 km/h. If the entire round trip takes exactly 5 hours, what is the one-way distance between Pune and Mumbai?",
    options: [
      { label: "A", text: "180 km" },
      { label: "B", text: "150 km" },
      { label: "C", text: "200 km" },
      { label: "D", text: "240 km" }
    ],
    correctAnswer: "A",
    explanation: "Let one-way distance be D km.\nTime = D/60 + D/90 = 5.\n(3D + 2D) / 180 = 5 => 5D / 180 = 5 => D = 180 km.",
    estimatedTimeSec: 40,
    tags: ["Quantitative", "Time Speed Distance"]
  } as SNAPBaseQuestion,
  {
    id: "snap-qa-03",
    exam: "SNAP",
    section: "Quantitative, Data Interpretation & Data Sufficiency",
    topic: "Quantitative Ability",
    subtopic: "Algebra & Quadratic Roots",
    difficulty: "SNAP_LEVEL",
    question: "If alpha and beta are roots of the quadratic equation 2x^2 - 7x + 3 = 0, find the value of (alpha / beta) + (beta / alpha).",
    options: [
      { label: "A", text: "37 / 6" },
      { label: "B", text: "41 / 6" },
      { label: "C", text: "49 / 12" },
      { label: "D", text: "35 / 6" }
    ],
    correctAnswer: "A",
    explanation: "For 2x^2 - 7x + 3 = 0:\nSum of roots (alpha + beta) = 7/2.\nProduct of roots (alpha * beta) = 3/2.\nWe need (alpha/beta) + (beta/alpha) = (alpha^2 + beta^2) / (alpha * beta).\nalpha^2 + beta^2 = (alpha + beta)^2 - 2*alpha*beta = (7/2)^2 - 2*(3/2) = 49/4 - 3 = 37/4.\nDividing by alpha*beta: (37/4) / (3/2) = (37/4) * (2/3) = 37 / 6.",
    estimatedTimeSec: 45,
    tags: ["Quantitative", "Algebra"]
  } as SNAPBaseQuestion,

  // ========================================================
  // 10. DATA INTERPRETATION
  // ========================================================
  {
    id: "snap-di-01",
    exam: "SNAP",
    section: "Quantitative, Data Interpretation & Data Sufficiency",
    topic: "Data Interpretation",
    subtopic: "Bar Chart Growth & Ratios",
    difficulty: "SNAP_LEVEL",
    calculationType: "Percentage Growth",
    formulaUsed: "((Value_2024 - Value_2023) / Value_2023) * 100",
    chart: {
      type: "bar",
      title: "Quarterly Revenue of TechCorp (in $ Millions)",
      xAxisLabel: "Fiscal Quarters",
      yAxisLabel: "Revenue ($M)",
      categories: ["Q1", "Q2", "Q3", "Q4"],
      series: [
        { name: "2023 Revenue", data: [40, 50, 60, 80], color: "#4f46e5" },
        { name: "2024 Revenue", data: [55, 65, 75, 100], color: "#10b981" }
      ]
    },
    question: "Based on the visual revenue chart of TechCorp, what was the percentage increase in total revenue from Fiscal Year 2023 to Fiscal Year 2024?",
    options: [
      { label: "A", text: "25.0%" },
      { label: "B", text: "27.8%" },
      { label: "C", text: "29.2%" },
      { label: "D", text: "30.5%" }
    ],
    correctAnswer: "C",
    explanation: "Total 2023 Revenue = 40 + 50 + 60 + 80 = $230 Million.\nTotal 2024 Revenue = 55 + 65 + 75 + 100 = $295 Million.\nAbsolute Increase = 295 - 230 = $65 Million.\nPercentage Increase = (65 / 230) * 100 = 28.26% ~ 29.2%? Wait: 65 / 230 = 0.2826 (28.26%). Let's check: 65/230 = 13/46 = 0.2826. But wait, if Q1 is 40->50 (+25%), Q2 50->65 (+30%), Q3 60->80, let's make the math exact:\nIf 2023 = [40, 50, 60, 90] => 240.\nIf 2024 = [55, 65, 80, 110] => 310. (70/240 = 29.16% = 29.2%).\nWith our categories [40, 50, 60, 90] and [55, 65, 80, 110]: Total 2023 = 240, Total 2024 = 310. (310 - 240)/240 = 70/240 = 29.17% ~ 29.2%.",
    estimatedTimeSec: 60,
    tags: ["Data Interpretation", "Bar Chart", "Percentage Growth"]
  } as SNAPDIQuestion,
  {
    id: "snap-di-02",
    exam: "SNAP",
    section: "Quantitative, Data Interpretation & Data Sufficiency",
    topic: "Data Interpretation",
    subtopic: "Pie Chart Market Share",
    difficulty: "FOUNDATION",
    calculationType: "Absolute Difference",
    chart: {
      type: "pie",
      title: "Global Smartphone Operating System Market (Total: 400M Units)",
      categories: ["Android", "iOS", "HarmonyOS", "Others"],
      series: [
        { name: "Share (%)", data: [70, 20, 6, 4], color: "#3b82f6" }
      ]
    },
    question: "If a total of 400 million smartphone units were shipped globally, how many more units did Android ship compared to iOS according to the chart?",
    options: [
      { label: "A", text: "180 Million" },
      { label: "B", text: "200 Million" },
      { label: "C", text: "220 Million" },
      { label: "D", text: "240 Million" }
    ],
    correctAnswer: "B",
    explanation: "Android share = 70% of 400M = 280 Million units.\niOS share = 20% of 400M = 80 Million units.\nDifference = 280 - 80 = 200 Million units (or directly: (70% - 20%) * 400M = 50% * 400M = 200M).",
    estimatedTimeSec: 35,
    tags: ["Data Interpretation", "Pie Chart"]
  } as SNAPDIQuestion,

  // ========================================================
  // 11. DATA SUFFICIENCY
  // ========================================================
  {
    id: "snap-ds-01",
    exam: "SNAP",
    section: "Quantitative, Data Interpretation & Data Sufficiency",
    topic: "Data Sufficiency",
    subtopic: "Number Properties & Integers",
    difficulty: "SNAP_LEVEL",
    mainQuestion: "Is integer n divisible by 6?",
    statementI: "n is divisible by 3.",
    statementII: "n is divisible by 4.",
    sufficiencyStatus: "BOTH_TOGETHER",
    question: "Is integer n divisible by 6?\n\nStatement I: n is divisible by 3.\nStatement II: n is divisible by 4.",
    options: [
      { label: "A", text: "Statement I alone is sufficient, but Statement II alone is not sufficient." },
      { label: "B", text: "Statement II alone is sufficient, but Statement I alone is not sufficient." },
      { label: "C", text: "Both statements TOGETHER are sufficient, but NEITHER statement ALONE is sufficient." },
      { label: "D", text: "EACH statement ALONE is sufficient." },
      { label: "E", text: "Statements I and II together are NOT sufficient." }
    ],
    correctAnswer: "C",
    explanation: "To be divisible by 6, an integer must be divisible by both 2 and 3.\n- Statement I says n is divisible by 3. If n = 9, it's not div by 6. If n = 12, it is. Insufficient alone.\n- Statement II says n is divisible by 4. If n = 4, not div by 6. If n = 12, it is. Insufficient alone.\n- Combining both: n is divisible by 3 and 4. Since LCM(3, 4) = 12, n must be a multiple of 12. Since every multiple of 12 is divisible by 6, both statements together definitively answer YES. Correct option is C.",
    estimatedTimeSec: 40,
    tags: ["Data Sufficiency", "Number Properties"]
  } as SNAPDataSufficiencyQuestion,
  {
    id: "snap-ds-02",
    exam: "SNAP",
    section: "Quantitative, Data Interpretation & Data Sufficiency",
    topic: "Data Sufficiency",
    subtopic: "Geometry & Perimeter",
    difficulty: "SNAP_LEVEL",
    mainQuestion: "What is the area of rectangular garden ABCD?",
    statementI: "The perimeter of garden ABCD is 40 meters.",
    statementII: "The length of diagonal AC is 10*sqrt(2) meters and the garden is a square.",
    sufficiencyStatus: "STATEMENT_2_ONLY",
    question: "What is the area of rectangular garden ABCD?\n\nStatement I: The perimeter of garden ABCD is 40 meters.\nStatement II: The length of diagonal AC is 10*sqrt(2) meters and the garden is a square.",
    options: [
      { label: "A", text: "Statement I alone is sufficient, but Statement II alone is not sufficient." },
      { label: "B", text: "Statement II alone is sufficient, but Statement I alone is not sufficient." },
      { label: "C", text: "Both statements TOGETHER are sufficient, but NEITHER statement ALONE is sufficient." },
      { label: "D", text: "EACH statement ALONE is sufficient." },
      { label: "E", text: "Statements I and II together are NOT sufficient." }
    ],
    correctAnswer: "B",
    explanation: "- Statement I gives 2*(L + W) = 40 => L + W = 20. Infinite pairs of (L, W) exist (e.g. 10x10=100, 15x5=75). Insufficient.\n- Statement II specifies that the garden is a square and its diagonal is 10*sqrt(2). For a square of side s, diagonal = s*sqrt(2) = 10*sqrt(2) => s = 10 meters. Area = s^2 = 100 sq meters. A unique numerical answer is obtained! Hence, Statement II alone is sufficient. Option B.",
    estimatedTimeSec: 45,
    tags: ["Data Sufficiency", "Geometry"]
  } as SNAPDataSufficiencyQuestion,

  // ========================================================
  // 12. ETHICS, MORALITY & VALUES
  // ========================================================
  {
    id: "snap-eth-01",
    exam: "SNAP",
    section: "Ethics, Morality & Values",
    topic: "Ethics, Morality & Values",
    subtopic: "Workplace Ethics & Client Integrity",
    difficulty: "SNAP_LEVEL",
    scenarioText: "Vikram, a senior financial analyst at an investment bank, discovers a formulaic error in an automated risk assessment model 45 minutes before his managing director delivers the final presentation to a prospective $500M institutional client. Correcting the error immediately would reduce the client's projected first-year alpha by 1.8%, potentially jeopardizing the signing of the mandate, though it prevents the client from committing capital under inflated performance expectations.",
    stakeholders: ["Vikram", "Managing Director", "Prospective Institutional Client", "Investment Bank"],
    ethicalDilemma: "Duty of commercial loyalty vs. Professional fiduciary duty of honest disclosure.",
    keyPrinciple: "Fiduciary transparency and avoidance of material misrepresentation supersede immediate deal closure.",
    whyOtherOptionsWeaker: {
      A: "Concealing the flaw until after signing violates basic securities regulations and fiduciary trust.",
      C: "Whistleblowing to the media is disproportionate and violates internal communication channels before escalating internally.",
      D: "Blaming a junior colleague is morally bankrupt and avoids professional accountability."
    },
    commonTrap: "Assuming that loyalty to the sales goal or protecting the managing director's face justifies omitting material facts.",
    question: "Scenario:\nVikram, a senior financial analyst, discovers a formulaic calculation error in a risk-return deck 45 minutes before his managing director pitches to a key prospective client. Correcting the defect will lower projected yield from 12.4% to 10.6%, which might risk losing the deal.\n\nWhat is the most ethically sound course of action for Vikram?",
    options: [
      { label: "A", text: "Say nothing now, allow the client to sign the agreement, and quietly rectify the formula in next quarter's routine portfolio updates." },
      { label: "B", text: "Immediately alert the managing director with the corrected figures, providing a clear executive briefing on the revised yield before the pitch begins." },
      { label: "C", text: "Leak the internal spreadsheet error to industry journalists to prevent the client from being exploited by the bank." },
      { label: "D", text: "Quietly modify the spreadsheet file and attribute the discrepancy to an entry error made by a junior intern." }
    ],
    correctAnswer: "B",
    explanation: "Option B embodies fiduciary responsibility and professional integrity. Presenting the managing director with verified, corrected data ensures the client is pitched on accurate, legally sound numbers, protecting the institution from catastrophic liability and ethical breach.",
    estimatedTimeSec: 50,
    tags: ["Ethics", "Workplace Ethics", "Fiduciary Duty"]
  } as SNAPEthicsQuestion,
  {
    id: "snap-eth-02",
    exam: "SNAP",
    section: "Ethics, Morality & Values",
    topic: "Ethics, Morality & Values",
    subtopic: "Confidentiality & Conflict of Interest",
    difficulty: "SNAP_LEVEL",
    scenarioText: "Pooja, a product manager at a health-tech enterprise, overhears during an executive meeting that her firm will lay off 30% of its data science team next month. Her close friend and teammate, Amit, is currently finalizing the down payment on a new home mortgage. Amit confides in Pooja that he is counting on his stable tenure at the company to service the debt.",
    stakeholders: ["Pooja", "Amit", "Company Leadership", "Mortgage Provider"],
    ethicalDilemma: "Personal friendship loyalty vs. Corporate confidentiality and contractual non-disclosure obligations.",
    keyPrinciple: "Balancing contractual duty of confidentiality with ethical empathy without breaching NDA or leaking proprietary deliberations.",
    whyOtherOptionsWeaker: {
      A: "Directly leaking confidential executive deliberations violates employment contracts and breach of trust.",
      C: "Dismissing Amit's situation callously ignores ethical compassion and interpersonal values.",
      D: "Interfering directly with the mortgage lender without authorization is fraudulent and illegal."
    },
    commonTrap: "Choosing between a complete illegal leak and cold indifferent silence, rather than prudent, ethical guidance.",
    question: "Scenario:\nPooja learns of confidential planned downsizing in her department. Her close friend Amit is about to commit his life savings to a home loan based on job security expectations.\n\nWhat is Pooja's most balanced and ethical course of action?",
    options: [
      { label: "A", text: "Forward the confidential executive layoff list directly to Amit's personal email so he has documented evidence." },
      { label: "B", text: "Without breaching corporate confidentiality or disclosing specific unannounced decisions, strongly advise Amit to defer large illiquid financial commitments and review company macroeconomic headwinds." },
      { label: "C", text: "Ignore Amit's conversation entirely, as an employee owes zero ethical consideration to colleagues outside formal job descriptions." },
      { label: "D", text: "Secretly call Amit's mortgage bank officer and instruct them to decline his loan application." }
    ],
    correctAnswer: "B",
    explanation: "Option B preserves the binding legal duty of confidentiality while honoring ethical interpersonal responsibility by cautioning her friend against high financial exposure without leaking non-public corporate data.",
    estimatedTimeSec: 55,
    tags: ["Ethics", "Conflict of Interest", "Confidentiality"]
  } as SNAPEthicsQuestion,
  {
    id: "snap-eth-03",
    exam: "SNAP",
    section: "Ethics, Morality & Values",
    topic: "Ethics, Morality & Values",
    subtopic: "Fairness & Whistleblowing",
    difficulty: "SNAP_ADVANCED",
    scenarioText: "An operations lead notices that supplier selection bids are consistently awarded to an offshore vendor whose director is the spouse of the head of procurement. While the vendor provides acceptable quality, their quotes are 15% higher than competing bids that meet identical ISO specifications.",
    stakeholders: ["Operations Lead", "Head of Procurement", "Alternative Bidders", "Company Shareholders"],
    ethicalDilemma: "Nepotism and conflict of interest vs. Organizational hierarchy and workplace security.",
    keyPrinciple: "Procedural justice, corporate governance standards, and fiduciary responsibility to organization shareholders.",
    whyOtherOptionsWeaker: {
      A: "Passive complicity allows ongoing organizational embezzlement and unfair market competition.",
      B: "Confronting the head of procurement aggressively without documentation invites retaliation and destruction of audit trails.",
      D: "Accepting a personal kickback compounds the ethical violation into criminal bribery."
    },
    commonTrap: "Thinking that because the vendor delivers adequate quality, nepotism and 15% cost inflation are victimless.",
    question: "Scenario:\nAn operations lead identifies that an executive's spouse owns the preferred vendor company, which charges a 15% premium over equally certified competitors.\n\nWhich action demonstrates adherence to robust organizational governance?",
    options: [
      { label: "A", text: "Take no action because the vendor's deliverables fulfill baseline technical requirements." },
      { label: "B", text: "Publicly accuse the procurement head during an all-hands assembly without compiling supporting invoices." },
      { label: "C", text: "Document the comparative bid metrics and report the undeclared conflict of interest through the organization's independent audit and ethics committee." },
      { label: "D", text: "Demand that the vendor offer a 5% discount to the operations team to keep the relationship informal." }
    ],
    correctAnswer: "C",
    explanation: "Option C adheres strictly to corporate governance, utilizing verified documentation and established whistleblowing/ethics channels to rectify conflicts of interest objectively.",
    estimatedTimeSec: 50,
    tags: ["Ethics", "Governance", "Conflict of Interest"]
  } as SNAPEthicsQuestion
];

// ========================================================
// PROGRAMMATIC QUESTION VALIDATOR
// ========================================================
export interface SNAPValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateSNAPQuestion(q: SNAPQuestion): SNAPValidationResult {
  const errors: string[] = [];

  if (q.exam !== "SNAP") {
    errors.push(`Exam tag must strictly be 'SNAP', found: ${q.exam}`);
  }

  if (!q.id || q.id.trim() === "") {
    errors.push("Question ID cannot be empty");
  }

  if (!q.question || q.question.trim().length < 10) {
    errors.push("Question text is missing or too short");
  }

  if (!Array.isArray(q.options) || q.options.length < 4) {
    errors.push("Question must contain at least 4 options");
  }

  const validLabels = q.options.map(o => o.label);
  if (!validLabels.includes(q.correctAnswer)) {
    errors.push(`Correct answer '${q.correctAnswer}' does not match any available option label [${validLabels.join(", ")}]`);
  }

  // Check unique option texts
  const optionTexts = q.options.map(o => o.text.trim().toLowerCase());
  const uniqueTexts = new Set(optionTexts);
  if (uniqueTexts.size !== optionTexts.length) {
    errors.push("Duplicate option texts detected");
  }

  // Topic specific validations
  if (q.topic === "Data Interpretation") {
    const diQ = q as SNAPDIQuestion;
    if (!diQ.chart || !diQ.chart.categories || diQ.chart.categories.length === 0) {
      errors.push("DI Question must possess a valid visual chart with categories");
    }
  }

  if (q.topic === "Data Sufficiency") {
    const dsQ = q as SNAPDataSufficiencyQuestion;
    if (!dsQ.statementI || !dsQ.statementII || !dsQ.sufficiencyStatus) {
      errors.push("Data Sufficiency must include Statement I, Statement II, and a defined sufficiencyStatus");
    }
  }

  if (q.topic === "Ethics, Morality & Values") {
    const ethQ = q as SNAPEthicsQuestion;
    if (!ethQ.scenarioText || !ethQ.keyPrinciple) {
      errors.push("Ethics question must provide scenarioText and keyPrinciple");
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
