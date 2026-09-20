import {
  VAParaJumbleQuestion,
  VAParaSummaryQuestion,
  VAOddOneOutQuestion,
  VASentenceCompletionQuestion,
} from "./types";

// =========================================================================
// 10 PARA-JUMBLES (Programmatically validated, unambiguous unique sequence)
// =========================================================================
export const VA_PARAJUMBLES: VAParaJumbleQuestion[] = [
  {
    id: "pj-1",
    conceptId: "para-jumbles",
    questionType: "TITA",
    prompt: "The four sentences (labelled 1, 2, 3, 4) below, when properly sequenced, would yield a coherent, logically structured paragraph. Determine the correct sequence of numbers and key in the 4-digit sequence without spaces or punctuation.",
    sentences: [
      {
        id: 1,
        text: "This psychological adaptation, known to behavioral ecologists as the 'landscape of fear', forces herbivores to spend significant energy on vigilance rather than continuous grazing.",
      },
      {
        id: 2,
        text: "Consequently, the mere olfactory or auditory hint of a carnivore can trigger an ecological cascade that revitalizes riverbank vegetation without a single kill taking place.",
      },
      {
        id: 3,
        text: "For decades, wildlife biologists believed that apex predators regulated prey populations purely through direct lethal predation.",
      },
      {
        id: 4,
        text: "Recent tracking data, however, reveals that the non-lethal psychological terror of being hunted exerts an even more profound evolutionary pressure on prey behavior.",
      },
    ],
    correctSequence: "3412",
    explanation: {
      detailed:
        "Sentence 3 establishes the broad historical premise regarding direct predation. Sentence 4 provides the contrast ('Recent tracking data, however, reveals...') introducing non-lethal psychological terror. Sentence 1 links directly to 4 by naming this phenomenon: 'This psychological adaptation, known as the landscape of fear...'. Sentence 2 provides the final logical consequence ('Consequently, the mere hint... can trigger an ecological cascade').",
      structuralPairs: [
        "3-4: Contrast marker ('However') moving from traditional lethal predation to psychological terror.",
        "4-1: Noun-phrase bridge ('psychological terror of being hunted' &rarr; 'This psychological adaptation').",
        "1-2: Cause and effect ('forces herbivores to spend energy on vigilance' &rarr; 'Consequently... revitalizes riverbank vegetation').",
      ],
      openingSentenceReason:
        "Sentence 3 is the only independent, self-contained opening sentence that introduces apex predators without backward-referencing pronouns.",
      catTip: "Always look for demonstrative pronouns ('This adaptation') to lock in the preceding definitional sentence.",
      commonTrap: "Placing 2 before 1; 2 begins with 'Consequently' and requires the behavioral mechanism established in 1.",
    },
    difficulty: "CAT",
  },
  {
    id: "pj-2",
    conceptId: "para-jumbles",
    questionType: "TITA",
    prompt: "The four sentences (labelled 1, 2, 3, 4) below, when properly sequenced, would yield a coherent paragraph. Determine the correct sequence.",
    sentences: [
      {
        id: 1,
        text: "In the pre-industrial workshop, the artisan maintained cognitive mastery over the entire trajectory of production, from raw timber to finished cabinet.",
      },
      {
        id: 2,
        text: "Karl Marx famously identified this psychological rupture as 'alienation from the product'—a condition where the worker's own creation confronts them as an alien, hostile object.",
      },
      {
        id: 3,
        text: "The advent of assembly-line Taylorism, however, atomized this organic synthesis into repetitive, de-skilled micro-operations.",
      },
      {
        id: 4,
        text: "Under this hyper-fragmented regime, the laborer was stripped of holistic design knowledge, executing isolated motions without ever perceiving the totality of the artifact.",
      },
    ],
    correctSequence: "1342",
    explanation: {
      detailed:
        "Sentence 1 establishes the pre-industrial artisan baseline (holistic mastery). Sentence 3 introduces the historical disruption ('The advent of assembly-line Taylorism, however...'). Sentence 4 elaborates on this disruption ('Under this hyper-fragmented regime...'). Sentence 2 concludes by providing Marx's philosophical diagnosis of the psychological state described in 4.",
      structuralPairs: [
        "1-3: Historical contrast ('pre-industrial workshop' vs. 'The advent of Taylorism, however').",
        "3-4: Conceptual link ('atomized into micro-operations' &rarr; 'Under this hyper-fragmented regime').",
        "4-2: Psychological diagnosis ('laborer stripped of design knowledge' &rarr; 'Marx identified this psychological rupture as alienation').",
      ],
      openingSentenceReason:
        "Sentence 1 provides the necessary historical anchor before the modern disruption can be introduced.",
      catTip: "Look for historical chronological shifts accompanied by contrast connectors like 'however' or 'in contrast'.",
      commonTrap: "Placing Marx's quote (2) before the condition of alienation (4) is described.",
    },
    difficulty: "CAT",
  },
  {
    id: "pj-3",
    conceptId: "para-jumbles",
    questionType: "TITA",
    prompt: "Arrange the four sentences (1, 2, 3, 4) into a logically ordered paragraph:",
    sentences: [
      {
        id: 1,
        text: "These epistemic bubbles are characterized not by malicious censorship, but by the effortless omission of discordant viewpoints.",
      },
      {
        id: 2,
        text: "Algorithms designed to maximize platform dwell-time quietly filter out challenging socio-political perspectives.",
      },
      {
        id: 3,
        text: "As a result, users gradually inhabit an artificially curated information reality where contrary opinions simply cease to exist.",
      },
      {
        id: 4,
        text: "Because human attention naturally gravitates toward ideologically congenial narratives, social networks optimize their feeds accordingly.",
      },
    ],
    correctSequence: "4231",
    explanation: {
      detailed:
        "Sentence 4 establishes the fundamental psychological premise (attention gravitates toward congenial narratives, causing networks to optimize). Sentence 2 details how this optimization functions mechanically ('Algorithms designed to maximize dwell-time quietly filter out...'). Sentence 3 shows the cumulative cognitive result ('As a result, users gradually inhabit...'). Sentence 1 delivers the culminating conceptual definition ('These epistemic bubbles are characterized by...').",
      structuralPairs: [
        "4-2: Premise to mechanism ('optimize their feeds accordingly' &rarr; 'Algorithms quietly filter out...').",
        "2-3: Cause to effect ('filter out perspectives' &rarr; 'As a result, users inhabit an artificially curated reality').",
        "3-1: Noun phrase link ('artificially curated reality where contrary opinions cease to exist' &rarr; 'These epistemic bubbles').",
      ],
      openingSentenceReason: "Sentence 4 states the root behavioral cause without needing any prior referent.",
      catTip: "Sentence 1 uses 'These epistemic bubbles'—it cannot open the paragraph; it must follow a sentence describing an informational bubble.",
      commonTrap: "Starting with 2, which leaves sentence 4 dangling as an isolated afterthought.",
    },
    difficulty: "CAT",
  },
  {
    id: "pj-4",
    conceptId: "para-jumbles",
    questionType: "TITA",
    prompt: "Arrange the four sentences (1, 2, 3, 4) into a logically ordered paragraph:",
    sentences: [
      {
        id: 1,
        text: "By treating carbon emissions as an unpriced externality, industrial enterprises maximized quarterly profit margins at the direct expense of atmospheric stability.",
      },
      {
        id: 2,
        text: "This market failure stems directly from classical economics' refusal to assign capital value to finite planetary sinks.",
      },
      {
        id: 3,
        text: "Consequently, the climate crisis is fundamentally an accounting catastrophe embedded in modern balance sheets.",
      },
      {
        id: 4,
        text: "For more than two centuries, commercial accounting standards systematically excluded the ecological costs of fossil fuel combustion.",
      },
    ],
    correctSequence: "4123",
    explanation: {
      detailed:
        "Sentence 4 opens with the broad historical fact (accounting standards excluded ecological costs). Sentence 1 explains the immediate corporate behavior that resulted ('By treating carbon emissions as an unpriced externality, enterprises maximized profit...'). Sentence 2 diagnoses the theoretical root ('This market failure stems directly from...'). Sentence 3 delivers the logical conclusion ('Consequently, the climate crisis is fundamentally an accounting catastrophe...').",
      structuralPairs: [
        "4-1: Action to outcome ('excluded ecological costs' &rarr; 'By treating carbon as an unpriced externality, maximized profit').",
        "1-2: Labeling the problem ('maximized profit at expense of atmosphere' &rarr; 'This market failure').",
        "2-3: Diagnosis to verdict ('refusal to assign value to planetary sinks' &rarr; 'Consequently, an accounting catastrophe').",
      ],
      openingSentenceReason: "Sentence 4 sets the 200-year historical framework for corporate accounting.",
      catTip: "Sentence 3 begins with 'Consequently' and represents the final intellectual punchline.",
      commonTrap: "Placing 2 before 1; 'This market failure' refers to the behavior described in 1.",
    },
    difficulty: "FOUNDATION",
  },
  {
    id: "pj-5",
    conceptId: "para-jumbles",
    questionType: "TITA",
    prompt: "Arrange the four sentences (1, 2, 3, 4) into a logically ordered paragraph:",
    sentences: [
      {
        id: 1,
        text: "To preserve their monopolistic gatekeeping, medieval craft guilds enforced draconian bans on unauthorized mechanical looms and metallurgical innovations.",
      },
      {
        id: 2,
        text: "While these restrictive measures protected master artisans from competitive disruption, they simultaneously suffocated broader macroeconomic growth.",
      },
      {
        id: 3,
        text: "Economic historian Joel Mokyr calls this systemic resistance to technological progress the 'conservative bias' of entrenched rent-seekers.",
      },
      {
        id: 4,
        text: "Throughout medieval Europe, urban craft guilds wielded statutory legal monopolies over municipal manufacturing.",
      },
    ],
    correctSequence: "4123",
    explanation: {
      detailed:
        "Sentence 4 introduces the entity and historical context (medieval urban craft guilds and statutory monopolies). Sentence 1 details how this monopoly was maintained ('To preserve their monopolistic gatekeeping, guilds enforced bans on mechanical looms...'). Sentence 2 evaluates the dual consequence of these bans ('While these restrictive measures protected artisans... they suffocated growth'). Sentence 3 synthesizes this with a theoretical term ('Mokyr calls this systemic resistance the conservative bias...').",
      structuralPairs: [
        "4-1: Entity introduction to specific policy ('wielded legal monopolies' &rarr; 'To preserve their monopolistic gatekeeping, enforced bans').",
        "1-2: Policy to consequence ('bans on mechanical looms' &rarr; 'While these restrictive measures protected artisans...').",
        "2-3: Empirical pattern to theoretical concept ('suffocated broader growth' &rarr; 'Mokyr calls this resistance the conservative bias').",
      ],
      openingSentenceReason: "Sentence 4 introduces urban craft guilds in full historical context.",
      catTip: "Theoretical definitions ('Mokyr calls this X') belong at the end when the empirical phenomenon has already been established.",
      commonTrap: "Starting with 3, which leaves 'this systemic resistance' without an antecedent.",
    },
    difficulty: "CAT",
  },
  {
    id: "pj-6",
    conceptId: "para-jumbles",
    questionType: "TITA",
    prompt: "Arrange the five sentences (1, 2, 3, 4, 5) into a logically ordered paragraph:",
    sentences: [
      {
        id: 1,
        text: "When such linguistic markers are repeatedly normalized in public discourse, they recalibrate the boundaries of acceptable political expression.",
      },
      {
        id: 2,
        text: "Sociolinguists refer to this gradual mainstreaming of previously taboo vocabulary as shifting the 'Overton window.'",
      },
      {
        id: 3,
        text: "Extremist movements rarely begin by openly demanding radical legislative overhauls.",
      },
      {
        id: 4,
        text: "Instead, their initial vanguard operation consists in quietly introducing coded epithets and dehumanizing metaphors into fringe media networks.",
      },
      {
        id: 5,
        text: "Once the window has expanded, radical policies that once seemed unthinkable are suddenly debated as reasonable legislative proposals.",
      },
    ],
    correctSequence: "34125",
    explanation: {
      detailed:
        "Sentence 3 establishes the primary premise ('Extremist movements rarely begin by openly demanding radical overhauls'). Sentence 4 provides the contrasting alternative ('Instead, their initial operation consists in introducing coded epithets...'). Sentence 1 explains the psychological normalization of these markers ('When such linguistic markers are repeatedly normalized...'). Sentence 2 names the theoretical concept ('Sociolinguists refer to this as shifting the Overton window'). Sentence 5 completes the arc with the ultimate policy outcome ('Once the window has expanded, radical policies are debated as reasonable').",
      structuralPairs: [
        "3-4: Negative assertion to positive alternative ('rarely begin by X' &rarr; 'Instead, their initial operation is Y').",
        "4-1: Noun phrase antecedent ('introducing coded epithets' &rarr; 'When such linguistic markers are normalized').",
        "1-2: Sociological naming ('recalibrate boundaries' &rarr; 'shifting the Overton window').",
        "2-5: Conceptual continuation ('Overton window' &rarr; 'Once the window has expanded...').",
      ],
      openingSentenceReason: "Sentence 3 is the only independent declarative sentence that sets the behavioral pattern.",
      catTip: "The pair 'rarely X' followed by 'Instead Y' is one of the most reliable structural combinations in CAT VARC.",
      commonTrap: "Placing 5 before 2, which breaks the definition of the Overton window before its consequences are described.",
    },
    difficulty: "CAT_HARD",
  },
  {
    id: "pj-7",
    conceptId: "para-jumbles",
    questionType: "TITA",
    prompt: "Arrange the four sentences (1, 2, 3, 4) into a logically ordered paragraph:",
    sentences: [
      {
        id: 1,
        text: "Under this biological protocol, worker bees voluntarily sacrifice their individual reproductive fitness to nurture their queen's progeny.",
      },
      {
        id: 2,
        text: "Kin selection theory resolved this evolutionary conundrum by showing that altruism is genetically rational when directed toward close genetic relatives.",
      },
      {
        id: 3,
        text: "For Charles Darwin, the existence of sterile insect castes was a 'special difficulty' that initially appeared fatal to his theory of natural selection.",
      },
      {
        id: 4,
        text: "Because workers share three-quarters of their genes with their sisters in haplodiploid species, defending the hive directly maximizes the transmission of their own genetic legacy.",
      },
    ],
    correctSequence: "3124",
    explanation: {
      detailed:
        "Sentence 3 presents Darwin's historical problem (sterile insect castes as a fatal difficulty). Sentence 1 elaborates on what sterile worker insects actually do ('Under this biological protocol, worker bees voluntarily sacrifice reproductive fitness...'). Sentence 2 introduces Hamilton's solution ('Kin selection theory resolved this evolutionary conundrum...'). Sentence 4 provides the genetic mathematics that explains the solution ('Because workers share three-quarters of their genes in haplodiploid species...').",
      structuralPairs: [
        "3-1: Problem to manifestation ('sterile insect castes' &rarr; 'Under this protocol, worker bees sacrifice reproduction').",
        "1-2: Problem to theoretical solution ('altruistic sacrifice' &rarr; 'Kin selection resolved this conundrum').",
        "2-4: Theory to mathematical mechanism ('genetically rational' &rarr; 'share three-quarters of their genes').",
      ],
      openingSentenceReason: "Sentence 3 introduces Darwin and the historical paradox of sterile insect castes.",
      catTip: "Narrative structure: Historical Paradox &rarr; Behavioral Illustration &rarr; Modern Theoretical Solution &rarr; Quantitative Mechanism.",
      commonTrap: "Starting with 2, which leaves 'this evolutionary conundrum' without an initial definition.",
    },
    difficulty: "CAT",
  },
  {
    id: "pj-8",
    conceptId: "para-jumbles",
    questionType: "TITA",
    prompt: "Arrange the four sentences (1, 2, 3, 4) into a logically ordered paragraph:",
    sentences: [
      {
        id: 1,
        text: "This sonic homogenization is driven by algorithmic streaming platforms whose recommendation engines favor predictable, genre-blended pop hooks.",
      },
      {
        id: 2,
        text: "Across the global music industry, sound engineers note a striking convergence in tempo, chord progression, and vocal timbre.",
      },
      {
        id: 3,
        text: "Consequently, regional musical idiosyncratic styles are gradually extinguished in favor of globally palatable commercial uniformity.",
      },
      {
        id: 4,
        text: "Songs that deviate from these standardized acoustic templates are quietly penalized with lower playlist placement and reduced royalty payouts.",
      },
    ],
    correctSequence: "2143",
    explanation: {
      detailed:
        "Sentence 2 presents the broad empirical phenomenon (convergence in tempo, chords, and vocal timbre). Sentence 1 explains the corporate driver ('This sonic homogenization is driven by streaming engines...'). Sentence 4 explains the punitive mechanism enforcing the trend ('Songs that deviate from these templates are quietly penalized...'). Sentence 3 delivers the cultural consequence ('Consequently, regional musical styles are gradually extinguished...').",
      structuralPairs: [
        "2-1: Phenomenon to underlying cause ('striking convergence' &rarr; 'This sonic homogenization is driven by...').",
        "1-4: Engine to punitive filter ('favor predictable hooks' &rarr; 'Songs that deviate from these templates are penalized').",
        "4-3: Cause to cultural consequence ('reduced royalty payouts' &rarr; 'Consequently, regional styles are extinguished').",
      ],
      openingSentenceReason: "Sentence 2 provides the objective musical phenomenon across the industry.",
      catTip: "Notice how 'This sonic homogenization' in 1 directly reframes 'striking convergence' in 2.",
      commonTrap: "Placing 3 before 4; the systemic punishment of deviation in 4 precedes the death of regional styles in 3.",
    },
    difficulty: "FOUNDATION",
  },
  {
    id: "pj-9",
    conceptId: "para-jumbles",
    questionType: "TITA",
    prompt: "Arrange the four sentences (1, 2, 3, 4) into a logically ordered paragraph:",
    sentences: [
      {
        id: 1,
        text: "Deprived of deep, non-monetized conversational spaces, citizens increasingly experience civic isolation as a private pathology.",
      },
      {
        id: 2,
        text: "Urban theorist Ray Oldenburg coined the term 'third places' to designate public venues—cafes, bookstores, public squares—distinct from the home and the workplace.",
      },
      {
        id: 3,
        text: "Over the past three decades, however, rampant commercial real-estate privatization has systematically eradicated these crucial civic commons.",
      },
      {
        id: 4,
        text: "Historically, these informal gathering spots served as vital neutral ground where individuals across class lines forged spontaneous civic bonds.",
      },
    ],
    correctSequence: "2431",
    explanation: {
      detailed:
        "Sentence 2 introduces Oldenburg's concept of 'third places'. Sentence 4 explains their historical democratic function ('Historically, these informal gathering spots served as vital neutral ground...'). Sentence 3 introduces the modern disruption ('Over the past three decades, however, privatization has eradicated these commons'). Sentence 1 concludes with the resulting psychological isolation ('Deprived of deep conversational spaces, citizens experience isolation as private pathology').",
      structuralPairs: [
        "2-4: Definition to function ('third places' &rarr; 'these informal gathering spots').",
        "4-3: Historical virtue to modern destruction ('forged civic bonds' vs. 'privatization has eradicated these commons').",
        "3-1: Loss to consequence ('eradicated commons' &rarr; 'Deprived of conversational spaces, citizens experience isolation').",
      ],
      openingSentenceReason: "Sentence 2 defines the primary theoretical entity ('third places').",
      catTip: "Concept Introduction (2) &rarr; Historical Utility (4) &rarr; Modern Threat (3) &rarr; Psychological Fallout (1).",
      commonTrap: "Placing 4 before 2; 'these informal gathering spots' in 4 refers to the 'third places' defined in 2.",
    },
    difficulty: "CAT",
  },
  {
    id: "pj-10",
    conceptId: "para-jumbles",
    questionType: "TITA",
    prompt: "Arrange the five sentences (1, 2, 3, 4, 5) into a logically ordered paragraph:",
    sentences: [
      {
        id: 1,
        text: "When autonomous surgical systems or algorithmic trading platforms make fatal errors, liability cannot be easily traced to any single programmer or operator.",
      },
      {
        id: 2,
        text: "Philosophers of technology term this dilemma the 'responsibility gap'.",
      },
      {
        id: 3,
        text: "Traditional jurisprudence presumes that every catastrophic malfunction can be traced back to a human agent possessing conscious intention or negligence.",
      },
      {
        id: 4,
        text: "Consequently, victims of algorithmic harm find themselves trapped in a legal vacuum where vast computational networks inflict damage with institutional impunity.",
      },
      {
        id: 5,
        text: "However, deep neural networks exhibit non-linear emergent behaviors that their human designers cannot mathematically anticipate or reconstruct.",
      },
    ],
    correctSequence: "35124",
    explanation: {
      detailed:
        "Sentence 3 establishes the traditional legal baseline (every catastrophe has a negligent human agent). Sentence 5 introduces the technological disruption ('However, deep neural networks exhibit emergent behaviors...'). Sentence 1 explains the practical consequence of this opacity ('When autonomous systems make fatal errors, liability cannot be traced...'). Sentence 2 names the theoretical dilemma ('Philosophers of technology term this the responsibility gap'). Sentence 4 delivers the concluding legal verdict ('Consequently, victims find themselves trapped in a legal vacuum...').",
      structuralPairs: [
        "3-5: Legal orthodoxy vs. algorithmic reality ('human agent responsible' &rarr; 'However, networks exhibit emergent behaviors').",
        "5-1: Emergence to liability puzzle ('designers cannot anticipate' &rarr; 'liability cannot be traced to single programmer').",
        "1-2: Problem to name ('liability cannot be traced' &rarr; 'term this dilemma the responsibility gap').",
        "2-4: Dilemma to terminal consequence ('responsibility gap' &rarr; 'Consequently, victims trapped in legal vacuum').",
      ],
      openingSentenceReason: "Sentence 3 is the foundational statement describing traditional jurisprudence.",
      catTip: "Watch for the 'Consequently' in sentence 4 which wraps up the entire legal problem with the phrase 'institutional impunity'.",
      commonTrap: "Starting with 1; 1 is an example of the opacity established in 5.",
    },
    difficulty: "CAT_HARD",
  },
];

// =========================================================================
// 10 PARAGRAPH SUMMARIES (Distractor analysis: broad, narrow, distorted, extraneous)
// =========================================================================
export const VA_SUMMARIES: VAParaSummaryQuestion[] = [
  {
    id: "ps-1",
    conceptId: "para-summary",
    questionType: "MCQ",
    prompt: "Which of the following options best captures the essence of the paragraph below?",
    paragraph:
      "For centuries, Western political theory operated on the premise that the public sphere was an egalitarian forum where citizens could subordinate private interests to collective rational deliberation. However, feminist and critical race theorists have dismantled this ideal, revealing that the historical public sphere was structurally exclusionary: it depended upon the domestic, unpaid labor of women and enslaved peoples to free bourgeois men for political debate, while systematically dismissing emotional, non-Western styles of communication as 'irrational'. True democratic renewal therefore requires acknowledging and restructuring these foundational exclusions rather than venerating an idealized bourgeois forum that never truly existed.",
    options: [
      {
        label: "A",
        text: "The historical public sphere was an exclusionary bourgeois institution that depended on marginalized labor; hence, democratic renewal requires reforming these structural inequalities rather than worshiping an idealized past.",
        distractorReason: "Correct Answer.",
      },
      {
        label: "B",
        text: "Western political theory has completely eradicated all forms of rational communication from modern parliamentary democracies.",
        distractorReason: "Distorted hyperbole nowhere asserted in the paragraph.",
      },
      {
        label: "C",
        text: "Feminist theorists argue that all political deliberation is inherently patriarchal and should be replaced by emotional intuition.",
        distractorReason: "Crude distortion and extreme caricature of feminist critiques.",
      },
      {
        label: "D",
        text: "Bourgeois men in the eighteenth century spent all their money on political campaigns rather than paying domestic servants.",
        distractorReason: "Trivializes a structural feminist critique into petty household budgeting.",
      },
    ],
    correctAnswer: "A",
    explanation: {
      detailed:
        "The paragraph notes the classical ideal (egalitarian forum), highlights the critical critique (historical exclusion of women/slaves, dismissal of emotional communication), and delivers the conclusion (renewal requires restructuring foundational exclusions instead of worshiping an idealized past).",
      correctReason:
        "Option A seamlessly captures all three essential components: the critique of the historical bourgeois forum, its structural reliance on marginalized labor, and the imperative for structural democratic renewal.",
      optionsBreakdown: [
        {
          label: "A",
          isCorrect: true,
          analysis: "Exhaustive, accurate, and faithful to the author's tone and scope.",
        },
        {
          label: "B",
          isCorrect: false,
          analysis: "Wildly exaggerates critical theory into a claim that rational debate has been eradicated.",
        },
        {
          label: "C",
          isCorrect: false,
          analysis: "Caricatures critical theory into anti-intellectual emotionalism.",
        },
        {
          label: "D",
          isCorrect: false,
          analysis: "Reduces macro-sociological critique to petty domestic finances.",
        },
      ],
      catTip: "The correct summary in CAT balances the critique of an old paradigm with the author's positive normative prescription for the future.",
      commonTrap: "Choosing options that use incendiary words like 'eradicated' or 'patriarchal conspiracy'.",
    },
    difficulty: "CAT",
  },
  {
    id: "ps-2",
    conceptId: "para-summary",
    questionType: "MCQ",
    prompt: "Select the option that best summarizes the paragraph:",
    paragraph:
      "Economists have long promoted carbon taxes as the most elegant, market-based mechanism to curb global emissions, arguing that placing a price on greenhouse gases internalizes environmental costs and lets price signals direct clean innovation. Yet, empirical evidence from jurisdictions that implemented carbon taxes indicates that without simultaneous state-led capital investment in public clean-transit, electrical grid overhaul, and low-income energy rebates, carbon taxes impose a regressive burden that sparks intense populist backlash. Decarbonization cannot rely solely on price signals; it requires state-led industrial policy working in tandem with fiscal redistribution.",
    options: [
      {
        label: "A",
        text: "Carbon taxes are a completely useless policy mechanism that invariably increases fossil fuel consumption across industrial nations.",
        distractorReason: "Direct contradiction; carbon taxes work, but fail if implemented in isolation without public investment and rebates.",
      },
      {
        label: "B",
        text: "Because standalone carbon taxes create regressive burdens and populist backlash, effective decarbonization requires pairing carbon pricing with state-led green infrastructure investment and redistribution.",
        distractorReason: "Correct Answer.",
      },
      {
        label: "C",
        text: "Modern populist movements are funded entirely by fossil fuel companies to prevent the implementation of clean public transit.",
        distractorReason: "Imports an external conspiracy theory nowhere found in the text.",
      },
      {
        label: "D",
        text: "Governments should abolish all market-based economic mechanisms and mandate universal public transit by executive decree.",
        distractorReason: "Extreme authoritarian policy not supported by the author's call for complementary policies.",
      },
    ],
    correctAnswer: "B",
    explanation: {
      detailed:
        "The paragraph explains the theoretical promise of carbon taxes, introduces the empirical limitation (regressive burden, populist backlash when public alternatives are absent), and concludes that decarbonization requires combining price signals with state industrial policy and redistribution.",
      correctReason:
        "Option B captures the limitation of standalone carbon taxes and the necessity of combining them with state infrastructure and redistribution.",
      optionsBreakdown: [
        {
          label: "A",
          isCorrect: false,
          analysis: "Distorts a critique of standalone taxes into a false claim that they increase fossil fuel use.",
        },
        {
          label: "B",
          isCorrect: true,
          analysis: "Accurately represents both the economic dilemma and the policy synthesis.",
        },
        {
          label: "C",
          isCorrect: false,
          analysis: "Introduces external political corruption theories.",
        },
        {
          label: "D",
          isCorrect: false,
          analysis: "Prescribes an authoritarian decree foreign to the author's nuanced policy framework.",
        },
      ],
      catTip: "When an author writes 'X cannot rely solely on Y; it requires Z in tandem with W', the summary must include both Y and Z+W.",
      commonTrap: "Assuming that criticizing standalone carbon taxes means the author is completely anti-tax.",
    },
    difficulty: "CAT",
  },
  {
    id: "ps-3",
    conceptId: "para-summary",
    questionType: "MCQ",
    prompt: "Choose the most accurate summary of the paragraph below:",
    paragraph:
      "In the philosophy of art, aesthetic cognitivism asserts that the value of high literature lies not merely in providing sensory pleasure or escapism, but in expanding our moral and cognitive understanding of human existence. By immersing readers in the complex, morally ambiguous interior lives of fictional characters, great novels function as emotional laboratories that refine our empathetic discernment and challenge habitual prejudices. To reduce literature to mere entertainment or linguistic ornament is to overlook its primary evolutionary and psychological function: the cultivation of moral imagination.",
    options: [
      {
        label: "A",
        text: "Aesthetic cognitivism holds that literature's primary worth resides in its capacity to expand moral understanding and empathy through fictional immersion, rather than in mere entertainment.",
        distractorReason: "Correct Answer.",
      },
      {
        label: "B",
        text: "Reading complex novels guarantees that an individual will behave with absolute moral perfection in real-world business transactions.",
        distractorReason: "Absurd, naive overextension of moral imagination into guaranteed business perfection.",
      },
      {
        label: "C",
        text: "Authors who write entertaining fiction are intellectually inferior to academic philosophers who publish treatises on ethics.",
        distractorReason: "Arrogant, derogatory value judgment unsupported by the author's cognitive thesis.",
      },
      {
        label: "D",
        text: "Fictional characters are psychologically healthier than real human beings because they inhabit emotional laboratories.",
        distractorReason: "Comical misinterpretation of the 'emotional laboratories' metaphor.",
      },
    ],
    correctAnswer: "A",
    explanation: {
      detailed:
        "The paragraph defines aesthetic cognitivism: literature's value is cognitive and moral expansion through empathetic character immersion, rather than superficial entertainment or ornament.",
      correctReason:
        "Option A precisely reflects the definition, the mechanism (empathetic immersion in character interiority), and the rejection of mere entertainment.",
      optionsBreakdown: [
        {
          label: "A",
          isCorrect: true,
          analysis: "Accurate, balanced, and perfectly bounded by the author's philosophical definitions.",
        },
        {
          label: "B",
          isCorrect: false,
          analysis: "Manufactures an absurd guarantee of moral perfection.",
        },
        {
          label: "C",
          isCorrect: false,
          analysis: "Injects petty hierarchy between novelists and philosophers.",
        },
        {
          label: "D",
          isCorrect: false,
          analysis: "Literalizes the laboratory metaphor into character clinical health.",
        },
      ],
      catTip: "In humanities summaries, pay attention to the core philosophical school named in line 1 (Aesthetic Cognitivism) and match its definition.",
      commonTrap: "Choosing options that exaggerate moral cultivation into a guarantee of flawless ethical behavior.",
    },
    difficulty: "FOUNDATION",
  },
  {
    id: "ps-4",
    conceptId: "para-summary",
    questionType: "MCQ",
    prompt: "Which option best summarizes the following passage?",
    paragraph:
      "The rapid commercial deployment of generative artificial intelligence has reignited debates over the nature of creative labor. Silicon Valley proponents herald large language models as democratizing tools that liberate creators from technical drudgery, enabling anyone to produce digital art or code. However, cultural critics emphasize that these systems do not generate genuine novelty from human intentionality; rather, they perform probabilistic collage on vast corpora of uncredited, copyrighted human creative work. By appropriating the collective cultural commons while concentrating intellectual property profits into private server farms, generative AI threatens to proletarianize the very creative class whose labor made its algorithms possible.",
    options: [
      {
        label: "A",
        text: "Generative artificial intelligence has completely eliminated all human artists and software engineers from the global labor market.",
        distractorReason: "Catastrophic hyperbole; the passage discusses threats to labor, not total elimination.",
      },
      {
        label: "B",
        text: "While promoted as creative democratization, generative AI functions by assembling probabilistic collages from uncredited human labor, concentrating profits and economically undermining the creative class.",
        distractorReason: "Correct Answer.",
      },
      {
        label: "C",
        text: "Software developers should refuse to write code for large language models unless Silicon Valley gives them free stock options.",
        distractorReason: "Prescriptive trade-union advice not mentioned in the analytical passage.",
      },
      {
        label: "D",
        text: "Generative AI models possess higher artistic intentionality than historical human Renaissance painters.",
        distractorReason: "Direct opposite; the passage explicitly states AI lacks genuine novelty from human intentionality.",
      },
    ],
    correctAnswer: "B",
    explanation: {
      detailed:
        "The paragraph sets up the tech industry's utopian claim (democratizing creativity), critiques the mechanism (probabilistic collage on uncredited human work), and diagnoses the socio-economic fallout (concentrating profits in private firms while undermining/proletarianizing creative workers).",
      correctReason:
        "Option B seamlessly integrates the utopian premise, the operational critique (probabilistic collage), and the socio-economic harm to creators.",
      optionsBreakdown: [
        {
          label: "A",
          isCorrect: false,
          analysis: "Extreme overstatement of economic threats into total labor extinction.",
        },
        {
          label: "B",
          isCorrect: true,
          analysis: "Accurate, elegant synthesis of both the technical critique and the economic exploitation thesis.",
        },
        {
          label: "C",
          isCorrect: false,
          analysis: "Imports an external activist labor tactic.",
        },
        {
          label: "D",
          isCorrect: false,
          analysis: "Directly contradicts the statement that models lack human intentionality.",
        },
      ],
      catTip: "Look for the dialectic: [Promised virtue vs. Reality of mechanism &rarr; Socio-economic consequence].",
      commonTrap: "Picking Option A due to its dramatic sensationalism.",
    },
    difficulty: "CAT",
  },
  {
    id: "ps-5",
    conceptId: "para-summary",
    questionType: "MCQ",
    prompt: "Select the most accurate summary of the paragraph below:",
    paragraph:
      "Archaeological investigations into early agrarian civilizations in Mesopotamia and Mesoamerica demonstrate that the transition from foraging to sedentary farming did not represent an immediate leap in human well-being. Paleopathological analyses of ancient skeletons reveal that early agriculturalists suffered from higher rates of infectious disease, chronic nutritional deficiencies, and stunted skeletal growth compared to their hunter-gatherer ancestors. The domestication of grains was less an emancipatory civilizational triumph for individual farmers than a logistical prerequisite for the emergence of the predatory early state, which required easily taxable, non-perishable cereal crops to sustain standing armies and bureaucratic elites.",
    options: [
      {
        label: "A",
        text: "Hunter-gatherers enjoyed longer lifespans because they ate exclusively organic meat and lived in egalitarian democratic communes.",
        distractorReason: "Imports modern lifestyle tropes ('organic meat') nowhere found in the archaeological text.",
      },
      {
        label: "B",
        text: "Far from an immediate upgrade in human health, early agricultural transition worsened individual physical well-being while functioning primarily as an infrastructure for state taxation and bureaucratic control.",
        distractorReason: "Correct Answer.",
      },
      {
        label: "C",
        text: "Modern Mesopotamian governments should encourage citizens to abandon farming and return to nomadic foraging in desert oases.",
        distractorReason: "Nonsensical modern political prescription.",
      },
      {
        label: "D",
        text: "Cereal crops like wheat and barley are toxic to human physiology and should be banned by medical authorities.",
        distractorReason: "Crude dietary distortion.",
      },
    ],
    correctAnswer: "B",
    explanation: {
      detailed:
        "The paragraph refutes the traditional progress myth: early farming degraded human physical health (disease, nutritional deficit) and served the interests of the emergent predatory state (taxable cereal crops) rather than individual well-being.",
      correctReason:
        "Option B captures the double revisionist insight: agricultural transition degraded individual physiological well-being while facilitating predatory state extraction.",
      optionsBreakdown: [
        {
          label: "A",
          isCorrect: false,
          analysis: "Invented lifestyle buzzwords foreign to paleopathology.",
        },
        {
          label: "B",
          isCorrect: true,
          analysis: "Faithfully and rigorously summarizes the epidemiological and political economy arguments.",
        },
        {
          label: "C",
          isCorrect: false,
          analysis: "Absurd modern regression.",
        },
        {
          label: "D",
          isCorrect: false,
          analysis: "Distorts historical nutritional analysis into modern anti-grain dietary advice.",
        },
      ],
      catTip: "Anthropology passages often debunk 'the myth of progress' by contrasting paleopathological data with political elite interests.",
      commonTrap: "Choosing options that talk about modern diets rather than ancient state-formation.",
    },
    difficulty: "CAT_HARD",
  },
  {
    id: "ps-6",
    conceptId: "para-summary",
    questionType: "MCQ",
    prompt: "Choose the option that best encapsulates the author's core argument:",
    paragraph:
      "In corporate finance, the doctrine of shareholder primacy—famously formulated by Milton Friedman—posits that a corporation's sole social responsibility is to maximize profits for its equity owners. Proponents argue that this clear, singular mandate prevents managerial self-dealing and ensures optimal capital allocation. Over the past three decades, however, this fixation on quarterly equity valuation has incentivized short-termist behavior: corporations routinely slash long-term scientific research, hollow out employee pensions, and externalize environmental damage to finance debt-fueled share buybacks. True corporate resilience requires shifting to a stakeholder governance model that aligns capital returns with long-term ecological, labor, and community stewardship.",
    options: [
      {
        label: "A",
        text: "Shareholder primacy, while designed to prevent managerial divergence, fosters short-termism at the expense of research, labor, and ecology, necessitating a transition toward stakeholder governance.",
        distractorReason: "Correct Answer.",
      },
      {
        label: "B",
        text: "Milton Friedman was an unethical financial speculator whose main goal was to bankrupt American manufacturing corporations.",
        distractorReason: "Childish ad hominem smear unsupported by the analytical text.",
      },
      {
        label: "C",
        text: "Public corporations should be prohibited from ever earning a profit or issuing equity shares on public stock exchanges.",
        distractorReason: "Absurd anti-capitalist hyperbole.",
      },
      {
        label: "D",
        text: "Share buybacks are illegal under international trade agreements and carry automatic prison sentences for corporate executives.",
        distractorReason: "Fabricates legal fictions.",
      },
    ],
    correctAnswer: "A",
    explanation: {
      detailed:
        "The paragraph acknowledges the theoretical goal of shareholder primacy (preventing managerial self-dealing), details its negative real-world consequences (short-termism, slashes in R&D, externalized harms, share buybacks), and presents the solution (stakeholder governance).",
      correctReason:
        "Option A accurately synthesizes the acknowledged intent of shareholder primacy, its destructive operational consequences, and the stakeholder remedy.",
      optionsBreakdown: [
        {
          label: "A",
          isCorrect: true,
          analysis: "Completely faithful to the structure, nuances, and conclusion of the text.",
        },
        {
          label: "B",
          isCorrect: false,
          analysis: "Crude ad hominem attack.",
        },
        {
          label: "C",
          isCorrect: false,
          analysis: "Extreme distortion nowhere advocated.",
        },
        {
          label: "D",
          isCorrect: false,
          analysis: "Manufactures non-existent criminal laws.",
        },
      ],
      catTip: "Look for summaries that recognize the *initial justification* of the criticized doctrine before delivering the corrective remedy.",
      commonTrap: "Choosing options that completely villainize Friedman rather than analyzing the structural incentives of shareholder primacy.",
    },
    difficulty: "CAT",
  },
  {
    id: "ps-7",
    conceptId: "para-summary",
    questionType: "MCQ",
    prompt: "Which option best summarizes the paragraph below?",
    paragraph:
      "Cognitive psychologists have long observed that human autobiographical memory is fundamentally reconstructive rather than reproductive. When we recall an emotional past event, our brain does not retrieve an immutable, high-definition video recording stored in a neural vault. Instead, each act of retrieval dynamically reassembles disparate memory fragments—sensory details, present emotional states, post-event misinformation, and narrative expectations—into a fresh neurological reconstruction. Because this process subtly modifies the underlying synaptic connections each time a memory is accessed, our most vivid and cherished personal recollections are often our most heavily edited fictions.",
    options: [
      {
        label: "A",
        text: "Human autobiographical memory is a reconstructive process that reassembles fragments and alters synaptic traces during retrieval, making vivid personal memories fluid reconstructions rather than exact recordings.",
        distractorReason: "Correct Answer.",
      },
      {
        label: "B",
        text: "Eyewitness testimonies in criminal courtrooms should be completely banned because all human memories are 100% false fictions.",
        distractorReason: "Extreme legal overreach; the passage explains cognitive fluidity, not total perjury.",
      },
      {
        label: "C",
        text: "Human beings possess photographic memory until they reach early adulthood, after which memory degrades into fiction.",
        distractorReason: "Unsubstantiated age-based factual fabrication.",
      },
      {
        label: "D",
        text: "Neuroscientists have successfully invented microchips that can record human memories as 4K video files.",
        distractorReason: "Sci-fi fantasy that misses the core biological insight.",
      },
    ],
    correctAnswer: "A",
    explanation: {
      detailed:
        "The paragraph contrasts the video-recorder myth with the reality of reconstructive memory: retrieval reassembles fragments, integrates current emotion/information, rewrites synaptic pathways, and turns vivid memories into edited reconstructions.",
      correctReason:
        "Option A concisely states the core distinction (reconstructive vs. reproductive) and the mechanism (alteration during retrieval).",
      optionsBreakdown: [
        {
          label: "A",
          isCorrect: true,
          analysis: "Direct, precise, and academically faithful summary of reconstructive memory theory.",
        },
        {
          label: "B",
          isCorrect: false,
          analysis: "Extrapolates cognitive fluidity into an absolute legal ban on testimony.",
        },
        {
          label: "C",
          isCorrect: false,
          analysis: "Invented claim about childhood photographic memory.",
        },
        {
          label: "D",
          isCorrect: false,
          analysis: "Imports sci-fi hardware tropes.",
        },
      ],
      catTip: "Notice the key theoretical phrase: 'reconstructive rather than reproductive'. The correct summary will preserve this conceptual distinction.",
      commonTrap: "Picking Option B because eyewitness unreliability is a popular topic in the news.",
    },
    difficulty: "FOUNDATION",
  },
  {
    id: "ps-8",
    conceptId: "para-summary",
    questionType: "MCQ",
    prompt: "Identify the best summary for the following text:",
    paragraph:
      "The sociology of scientific knowledge, pioneered by thinkers like Thomas Kuhn and David Bloor, contends that scientific paradigms do not ascend to dominance purely through pristine, objective empirical verification. Rather, scientific revolutions are sociopolitical negotiations where competing theoretical models are championed by rival institutional networks. An established paradigm resists falsification through ad-hoc hypotheses, control over peer-reviewed journals, and university hiring monopolies, collapsing only when generational turnover allows younger scholars to institutionalize new epistemological frameworks. Scientific progress is thus an intensely human, sociologically contingent drama rather than a frictionless march toward metaphysical truth.",
    options: [
      {
        label: "A",
        text: "Scientific knowledge develops through sociopolitical negotiation and institutional power dynamics rather than purely through frictionless empirical verification.",
        distractorReason: "Correct Answer.",
      },
      {
        label: "B",
        text: "All scientific theories are completely fabricated myths created by corrupt university professors to secure research grants.",
        distractorReason: "Nihilistic anti-science smear that vulgarizes Kuhn's sociology.",
      },
      {
        label: "C",
        text: "Younger scientists are invariably more intelligent and mathematically capable than senior peer-reviewers.",
        distractorReason: "Injects an unearned age-based cognitive prejudice.",
      },
      {
        label: "D",
        text: "Thomas Kuhn advocated that laboratory experiments should be replaced by democratic student voting.",
        distractorReason: "Absurd caricature of paradigm shift theory.",
      },
    ],
    correctAnswer: "A",
    explanation: {
      detailed:
        "The paragraph outlines the sociology of science: paradigms do not advance purely on objective empirical verification, but through institutional power, journal gatekeeping, and generational sociopolitical shifts.",
      correctReason:
        "Option A directly captures the core thesis: scientific paradigms succeed through sociopolitical and institutional negotiation rather than frictionless empirical testing.",
      optionsBreakdown: [
        {
          label: "A",
          isCorrect: true,
          analysis: "Accurately represents Kuhn's institutional sociology of science without sliding into anti-scientific nihilism.",
        },
        {
          label: "B",
          isCorrect: false,
          analysis: "Crude conspiratorial caricature.",
        },
        {
          label: "C",
          isCorrect: false,
          analysis: "Misinterprets generational replacement as innate cognitive superiority.",
        },
        {
          label: "D",
          isCorrect: false,
          analysis: "Nonsensical populist distortion.",
        },
      ],
      catTip: "In sociology of science questions, make sure the answer choice reflects 'institutional contingency' rather than 'science is a total lie'.",
      commonTrap: "Selecting cynical options that claim scientific facts do not exist at all.",
    },
    difficulty: "CAT",
  },
  {
    id: "ps-9",
    conceptId: "para-summary",
    questionType: "MCQ",
    prompt: "Which of the following best captures the argument of the passage?",
    paragraph:
      "The widespread adoption of international development metrics like Gross Domestic Product (GDP) has created a profound accounting blindness across modern governance. Because GDP exclusively registers monetized market transactions, it perversely counts oil spill cleanups, post-disaster reconstruction, and cancer treatments as positive economic growth, while completely ignoring the vital, non-monetized work of social reproduction—such as eldercare, child rearing, and ecological carbon sequestration. By mistaking transactional velocity for societal prosperity, policymakers optimize for economic metrics that can rise simultaneously with the degradation of social and ecological well-being.",
    options: [
      {
        label: "A",
        text: "Because GDP measures only monetized transactions, it paradoxically treats disasters and disease as growth while ignoring essential non-market care and ecology, causing policymakers to conflate transactional volume with true prosperity.",
        distractorReason: "Correct Answer.",
      },
      {
        label: "B",
        text: "National governments should immediately abolish all currency systems and return to medieval barter economies.",
        distractorReason: "Absurd regression nowhere advocated.",
      },
      {
        label: "C",
        text: "Oil spills are deliberately orchestrated by energy corporations to artificially inflate quarterly national GDP metrics.",
        distractorReason: "Crazy conspiracy theory.",
      },
      {
        label: "D",
        text: "Cancer treatments should be excluded from hospital medical care because they generate excessive economic growth.",
        distractorReason: "Morally bizarre distortion.",
      },
    ],
    correctAnswer: "A",
    explanation: {
      detailed:
        "The paragraph diagnoses the failure of GDP: measuring only monetized transactions means catastrophes count as growth, while vital non-monetized labor (care work, ecological stewardship) is invisible, causing leaders to confuse transactional speed with genuine prosperity.",
      correctReason:
        "Option A synthesizes the transactional metric flaw, the paradox of disaster counting as growth, the omission of non-market reproduction, and the policy delusion.",
      optionsBreakdown: [
        {
          label: "A",
          isCorrect: true,
          analysis: "Exhaustive, faithful, and precise summary of the critique of GDP as a governance metric.",
        },
        {
          label: "B",
          isCorrect: false,
          analysis: "Crazy policy extrapolation.",
        },
        {
          label: "C",
          isCorrect: false,
          analysis: "Paranoid conspiratorial distortion.",
        },
        {
          label: "D",
          isCorrect: false,
          analysis: "Cruel and absurd literal reading of the cancer treatment example.",
        },
      ],
      catTip: "Watch how the author contrasts 'transactional velocity' with 'societal prosperity'. The correct summary will highlight this mismatch.",
      commonTrap: "Assuming the author is against cleaning up oil spills, rather than critiquing the economic formula that counts cleanup as positive growth.",
    },
    difficulty: "FOUNDATION",
  },
  {
    id: "ps-10",
    conceptId: "para-summary",
    questionType: "MCQ",
    prompt: "Choose the most comprehensive summary of the paragraph below:",
    paragraph:
      "In environmental ethics, the concept of the 'Anthropocene'—the proposed geological epoch characterized by humanity's decisive impact on Earth's ecosystems—has come under severe critical scrutiny. Political ecologists argue that attributing ecological collapse to a generic, undifferentiated 'humanity' (Anthropos) conceals the deeply unequal global drivers of climate breakdown. The catastrophic depletion of the biosphere has not been driven equally by all human beings, but by a carbon-intensive, extractive global capitalist system originating in the Global North. Scholars therefore propose the alternative term 'Capitalocene', shifting the conceptual blame from human biological existence to the historical structures of capital accumulation and unequal ecological exchange.",
    options: [
      {
        label: "A",
        text: "The term 'Anthropocene' is flawed because it falsely blames all humanity for ecological breakdown; the alternative concept 'Capitalocene' accurately highlights that environmental crises stem from historically specific capitalist extraction and global inequality.",
        distractorReason: "Correct Answer.",
      },
      {
        label: "B",
        text: "Geologists have definitively voted to rename planet Earth as 'Capitalocene' in all international school textbooks.",
        distractorReason: "Absurd institutional fantasy.",
      },
      {
        label: "C",
        text: "Human beings in the Global South possess a genetic immunity to the effects of climate change and environmental destruction.",
        distractorReason: "Biologically preposterous distortion.",
      },
      {
        label: "D",
        text: "All industrial machinery should be dismantled to prove that human biology is distinct from geological history.",
        distractorReason: "Extreme Luddite distortion.",
      },
    ],
    correctAnswer: "A",
    explanation: {
      detailed:
        "The paragraph critiques the concept of the 'Anthropocene' for homogenizing all humanity, when environmental destruction was driven by carbon-intensive global capitalism (originating in the Global North). It explains why scholars advocate for 'Capitalocene' to focus on historical structures of capital accumulation.",
      correctReason:
        "Option A cleanly captures the flaw in 'Anthropocene' (universalizing guilt) and the justification for 'Capitalocene' (targeting systemic capitalist extraction).",
      optionsBreakdown: [
        {
          label: "A",
          isCorrect: true,
          analysis: "Flawlessly reflects the intellectual pivot from Anthropocene to Capitalocene and the political economy rationale.",
        },
        {
          label: "B",
          isCorrect: false,
          analysis: "Ridiculously literalizes an academic nomenclature debate.",
        },
        {
          label: "C",
          isCorrect: false,
          analysis: "Invented biological fantasy.",
        },
        {
          label: "D",
          isCorrect: false,
          analysis: "Extreme policy distortion nowhere mentioned.",
        },
      ],
      catTip: "Whenever an academic text proposes replacing Concept X with Concept Y, the summary must explain *what flaw in X* makes *Y necessary*.",
      commonTrap: "Choosing options that treat 'Capitalocene' as an established geological rock layer rather than a conceptual critique.",
    },
    difficulty: "CAT_HARD",
  },
];

// =========================================================================
// 10 ODD ONE OUT (Logical misfit in academic context, 4 remaining form sequence)
// =========================================================================
export const VA_ODD_ONE_OUT: VAOddOneOutQuestion[] = [
  {
    id: "ooo-1",
    conceptId: "odd-one-out",
    questionType: "TITA",
    prompt: "Five sentences are given below. Four of them can be assembled into a coherent, logically structured paragraph. Identify the sentence that does NOT fit and key in its number (1–5).",
    sentences: [
      {
        id: 1,
        text: "This psychological phenomenon, termed 'decision fatigue', explains why judicial sentences in parole hearings grow progressively harsher as the morning wears on.",
      },
      {
        id: 2,
        text: "To preserve scarce cognitive bandwidth, the ego-depleted mind defaults to conservative, low-risk status-quo options.",
      },
      {
        id: 3,
        text: "Unlike physical muscles, the human brain consumes an identical amount of glucose whether solving differential calculus or daydreaming on a beach.",
      },
      {
        id: 4,
        text: "Repeated executive decision-making progressively depletes an individual's conscious self-regulation resources.",
      },
      {
        id: 5,
        text: "When judges suffer this depletion prior to lunch, denying parole becomes the safe, automatic default.",
      },
    ],
    oddSentenceId: 3,
    coherentSequence: "4125",
    explanation: {
      detailed:
        "Sentences 4, 1, 2, and 5 construct a tight, coherent psychological narrative on 'decision fatigue': 4 establishes that repeated decisions deplete self-regulation; 1 names this phenomenon 'decision fatigue' and introduces the parole hearing example; 2 explains the mechanism of defaulting to conservative choices; 5 connects the mechanism back to the judges denying parole. Sentence 3, while discussing the brain, introduces metabolic glucose consumption, which contradicts or distracts from the psychological ego-depletion model.",
      whyOddFails:
        "Sentence 3 shifts the discussion to physiological glucose consumption, completely disrupting the behavioral sequence of decision fatigue and judicial parole defaults.",
      coherentNarrativeFlow: "4 &rarr; 1 &rarr; 2 &rarr; 5",
      catTip: "Look for shifts between psychological behavioral mechanisms (decision fatigue) and physiological metabolic facts (glucose consumption).",
      commonTrap: "Thinking 3 belongs because it mentions 'muscles' and 'brain', which sounds vaguely scientific.",
    },
    difficulty: "CAT",
  },
  {
    id: "ooo-2",
    conceptId: "odd-one-out",
    questionType: "TITA",
    prompt: "Identify the sentence (1–5) that does not logically fit with the rest:",
    sentences: [
      {
        id: 1,
        text: "Throughout the eighteenth century, European cartographers routinely marked interior African territories as blank, terra-incognita spaces.",
      },
      {
        id: 2,
        text: "These deliberate cartographic omissions served a profound ideological purpose, framing the continent as empty territory awaiting civilized cultivation.",
      },
      {
        id: 3,
        text: "Modern GPS navigation software incorporates satellite telemetry to achieve millimeter-level accuracy across urban road networks.",
      },
      {
        id: 4,
        text: "By erasing indigenous polities and trade networks from official maps, colonial powers legitimized their imperial claims of initial discovery.",
      },
      {
        id: 5,
        text: "The map thus functioned not as an objective geographical mirror, but as an active weapon of colonial dispossession.",
      },
    ],
    oddSentenceId: 3,
    coherentSequence: "1245",
    explanation: {
      detailed:
        "Sentences 1, 2, 4, and 5 form a coherent post-colonial analysis of colonial cartography: 1 introduces blank spaces on 18th-century maps; 2 explains their ideological purpose; 4 shows how erasing indigenous polities legitimized imperial claims; 5 concludes that maps functioned as weapons of colonial dispossession. Sentence 3 discusses modern GPS satellite accuracy, which is completely irrelevant to the historical critique of imperial ideology.",
      whyOddFails:
        "Sentence 3 introduces contemporary technical GPS satellite engineering, breaking the historical and ideological critique of 18th-century colonial maps.",
      coherentNarrativeFlow: "1 &rarr; 2 &rarr; 4 &rarr; 5",
      catTip: "A blatant time-period shift (18th-century colonial maps vs. modern satellite GPS) is a dead giveaway in CAT Odd-One-Out.",
      commonTrap: "Assuming 3 belongs because it contains the word 'navigation' and relates to maps.",
    },
    difficulty: "FOUNDATION",
  },
  {
    id: "ooo-3",
    conceptId: "odd-one-out",
    questionType: "TITA",
    prompt: "Identify the odd sentence (1–5):",
    sentences: [
      {
        id: 1,
        text: "In classical Greek tragedy, the protagonist's catastrophe is brought about not by external villains, but by *hamartia*—an inherent tragic flaw or error of judgment.",
      },
      {
        id: 2,
        text: "Sophocles' King Oedipus exemplifies this tragic architecture, where his very relentless pursuit of truth brings about his prophesied downfall.",
      },
      {
        id: 3,
        text: "The ancient theater of Dionysus in Athens was constructed of limestone and could seat up to seventeen thousand spectators.",
      },
      {
        id: 4,
        text: "Because the tragic downfall stems from an organic element of the hero's own noble character, the audience experiences profound catharsis rather than mere horror.",
      },
      {
        id: 5,
        text: "This internal origin of catastrophe elevates Greek tragedy above melodrama, transforming defeat into an affirmation of human moral dignity.",
      },
    ],
    oddSentenceId: 3,
    coherentSequence: "1245",
    explanation: {
      detailed:
        "Sentences 1, 2, 4, and 5 analyze the dramatic theory of Greek tragedy (hamartia, internal origin of catastrophe, Oedipus, audience catharsis, elevation above melodrama). Sentence 3 introduces physical architecture (limestone theater seating capacity), which is an architectural trivia fact completely detached from literary dramatic theory.",
      whyOddFails:
        "Sentence 3 discusses the physical seating capacity of an ancient Greek theater building, disrupting a literary analysis of tragic flaws (*hamartia*) and dramatic catharsis.",
      coherentNarrativeFlow: "1 &rarr; 2 &rarr; 4 &rarr; 5",
      catTip: "Differentiate between aesthetic/literary theory and physical/architectural trivia.",
      commonTrap: "Thinking 3 belongs because the play was performed in the Theater of Dionysus.",
    },
    difficulty: "FOUNDATION",
  },
  {
    id: "ooo-4",
    conceptId: "odd-one-out",
    questionType: "TITA",
    prompt: "Identify the sentence that does not fit into the coherent paragraph:",
    sentences: [
      {
        id: 1,
        text: "When antibiotic exposure eliminates competitive gut flora, opportunistic bacteria like *Clostridioides difficile* proliferate rapidly.",
      },
      {
        id: 2,
        text: "The human intestinal microbiome functions as a complex, mutualistic ecosystem comprising trillions of microbial organisms.",
      },
      {
        id: 3,
        text: "Pharmaceutical companies spend over two billion dollars on marketing cholesterol-lowering statin medications each fiscal year.",
      },
      {
        id: 4,
        text: "This dense microbial carpet provides crucial competitive exclusion, preventing pathogenic colonization through nutrient sequestration and antimicrobial peptide synthesis.",
      },
      {
        id: 5,
        text: "The disruption of this protective microbial barrier illustrates how modern broad-spectrum antibiotics can inadvertently induce secondary clinical infections.",
      },
    ],
    oddSentenceId: 3,
    coherentSequence: "2415",
    explanation: {
      detailed:
        "Sentences 2, 4, 1, and 5 construct a biological explanation of gut microbiome barrier function and antibiotic disruption: 2 introduces the intestinal ecosystem; 4 explains its competitive exclusion mechanism; 1 demonstrates what happens when antibiotics kill gut flora (*C. difficile* overgrowth); 5 synthesizes the clinical lesson regarding broad-spectrum antibiotics. Sentence 3 abruptly shifts to corporate advertising budgets for cholesterol drugs.",
      whyOddFails:
        "Sentence 3 pivots to commercial pharmaceutical marketing for statins, completely unrelated to the microbiological ecology of the gut barrier.",
      coherentNarrativeFlow: "2 &rarr; 4 &rarr; 1 &rarr; 5",
      catTip: "Look for shifts from biological ecological mechanisms to commercial financial marketing.",
      commonTrap: "Thinking 3 belongs because 'pharmaceutical companies' make 'antibiotics'.",
    },
    difficulty: "CAT",
  },
  {
    id: "ooo-5",
    conceptId: "odd-one-out",
    questionType: "TITA",
    prompt: "Select the sentence (1–5) that disrupts the logical flow:",
    sentences: [
      {
        id: 1,
        text: "Under the gold standard, a nation facing a trade deficit suffered an automatic drain of gold bullion from its central bank reserves.",
      },
      {
        id: 2,
        text: "This monetary outflow contracted the domestic money supply, precipitating deflation and driving down domestic wages and prices.",
      },
      {
        id: 3,
        text: "Gold mining in medieval West Africa was historically concentrated along the alluvial basins of the Niger and Senegal rivers.",
      },
      {
        id: 4,
        text: "Lower domestic prices subsequently restored export competitiveness, stimulating foreign purchases and naturally reversing the trade imbalance.",
      },
      {
        id: 5,
        text: "David Hume called this self-equilibrating macroeconomic mechanism the 'price-specie-flow mechanism.'",
      },
    ],
    oddSentenceId: 3,
    coherentSequence: "1245",
    explanation: {
      detailed:
        "Sentences 1, 2, 4, and 5 explain David Hume's classic 'price-specie-flow mechanism' under the gold standard: trade deficit drains gold (1), contracting money supply and lowering domestic prices (2), which restores export competitiveness and reverses the deficit (4), formalized by Hume (5). Sentence 3 introduces medieval West African gold mining geography, which has nothing to do with international monetary theory.",
      whyOddFails:
        "Sentence 3 discusses geographical river basin mining in medieval Africa, breaking an economics explanation of international macroeconomic adjustment under the gold standard.",
      coherentNarrativeFlow: "1 &rarr; 2 &rarr; 4 &rarr; 5",
      catTip: "Macroeconomic theory vs. geographical mineral extraction trivia—always isolate the core conceptual debate.",
      commonTrap: "Thinking 3 belongs because it contains the word 'Gold'.",
    },
    difficulty: "FOUNDATION",
  },
  {
    id: "ooo-6",
    conceptId: "odd-one-out",
    questionType: "TITA",
    prompt: "Key in the number of the odd sentence out (1–5):",
    sentences: [
      {
        id: 1,
        text: "In cybernetic theory, positive feedback loops amplify deviations, driving systems away from baseline equilibrium toward radical instability or phase changes.",
      },
      {
        id: 2,
        text: "An alarming contemporary example is the Arctic albedo feedback: melting white ice exposes dark ocean water, which absorbs more solar radiation and accelerates further melting.",
      },
      {
        id: 3,
        text: "Negative feedback, by contrast, acts as a self-correcting homeostatic brake that dampens fluctuations and restores internal equilibrium.",
      },
      {
        id: 4,
        text: "Unlike linear causal chains where cause and effect are proportional, positive feedback loops exhibit non-linear compounding that can trigger catastrophic runaway tipping points.",
      },
      {
        id: 5,
        text: "Polar bears in northern Hudson Bay primarily hunt ringed seals by waiting patiently near breathing holes in the winter sea ice.",
      },
    ],
    oddSentenceId: 5,
    coherentSequence: "1423",
    explanation: {
      detailed:
        "Sentences 1, 4, 2, and 3 analyze cybernetics and feedback dynamics: 1 defines positive feedback; 4 explains non-linear compounding and tipping points; 2 provides the concrete example of the Arctic albedo loop; 3 provides the conceptual contrast with negative feedback. Sentence 5 is a descriptive zoological fact about polar bear seal-hunting techniques, completely breaking the systems-theory framework.",
      whyOddFails:
        "Sentence 5 shifts to polar bear foraging ethology, diverging completely from the cybernetic systems analysis of feedback loops and climate tipping points.",
      coherentNarrativeFlow: "1 &rarr; 4 &rarr; 2 &rarr; 3",
      catTip: "Watch for sentences that zoom in on a specific animal mentioned in a climate example and begin describing its diet or hunting habits.",
      commonTrap: "Thinking 5 belongs because polar bears live in the Arctic where the ice is melting.",
    },
    difficulty: "CAT",
  },
  {
    id: "ooo-7",
    conceptId: "odd-one-out",
    questionType: "TITA",
    prompt: "Find the odd sentence (1–5):",
    sentences: [
      {
        id: 1,
        text: "The rise of corporate brand identity in the early twentieth century marked a fundamental shift from product utility to emotional association.",
      },
      {
        id: 2,
        text: "Rather than advertising the chemical purity of soap or the physical durability of motor cars, advertisers began selling psychological states: social prestige, youth, and domestic tranquility.",
      },
      {
        id: 3,
        text: "Early automobile factories in Detroit utilized Fordist assembly lines that dramatically reduced the time required to build a chassis from twelve hours to ninety minutes.",
      },
      {
        id: 4,
        text: "Commodities were thus decoupled from their concrete material virtues and imbued with cultural, symbolic totems.",
      },
      {
        id: 5,
        text: "This psychological transformation turned modern consumers into seekers of personal identity through commercial consumption.",
      },
    ],
    oddSentenceId: 3,
    coherentSequence: "1245",
    explanation: {
      detailed:
        "Sentences 1, 2, 4, and 5 trace the cultural and psychological history of brand marketing: moving from utility to emotional association (1), advertising psychological states like prestige rather than physical purity (2), imbuing commodities with cultural totems (4), transforming consumers into identity-seekers (5). Sentence 3 focuses on factory engineering assembly times in Detroit, breaking the cultural history of advertising psychology.",
      whyOddFails:
        "Sentence 3 discusses factory manufacturing efficiency (chassis assembly speed), whereas the other four sentences explore the sociological psychology of brand advertising.",
      coherentNarrativeFlow: "1 &rarr; 2 &rarr; 4 &rarr; 5",
      catTip: "Manufacturing engineering speed (Fordist assembly) is distinct from consumer advertising psychology (branding and symbolic totems).",
      commonTrap: "Thinking 3 belongs because 'motor cars' are mentioned in sentence 2.",
    },
    difficulty: "CAT",
  },
  {
    id: "ooo-8",
    conceptId: "odd-one-out",
    questionType: "TITA",
    prompt: "Identify the sentence that does not fit (1–5):",
    sentences: [
      {
        id: 1,
        text: "In sociolinguistic studies of honorifics, language registers encode and perpetuate rigid hierarchies of social status and caste.",
      },
      {
        id: 2,
        text: "In languages like Javanese and Japanese, speakers are grammatically required to alter verb conjugations, pronouns, and vocabulary based on the relative social rank of the listener.",
      },
      {
        id: 3,
        text: "These grammaticalized deference markers remind interlocutors of their respective social stations in every casual conversational exchange.",
      },
      {
        id: 4,
        text: "Consequently, egalitarian political reforms often struggle to take root in cultures where daily grammar continually reinscribes feudal subordination.",
      },
      {
        id: 5,
        text: "The island of Java possesses over forty active volcanoes, making it one of the most seismically volatile landmasses in the Pacific Ring of Fire.",
      },
    ],
    oddSentenceId: 5,
    coherentSequence: "1234",
    explanation: {
      detailed:
        "Sentences 1, 2, 3, and 4 form an airtight sociolinguistic argument: honorific registers encode social hierarchy (1), illustrated by Javanese and Japanese grammar rules (2), which continuously reinforce social status (3), making egalitarian political reform difficult because grammar reinscribes subordination (4). Sentence 5 introduces physical geography (Java's volcanoes and seismic activity), which is absurdly unrelated.",
      whyOddFails:
        "Sentence 5 introduces physical volcanic geology, which completely derails a sociolinguistic analysis of linguistic honorifics and social hierarchy.",
      coherentNarrativeFlow: "1 &rarr; 2 &rarr; 3 &rarr; 4",
      catTip: "Geological/geographical trivia popping up in a sociology or linguistics paragraph is an obvious distractor.",
      commonTrap: "None—this is a classic foundation-level discriminator.",
    },
    difficulty: "FOUNDATION",
  },
  {
    id: "ooo-9",
    conceptId: "odd-one-out",
    questionType: "TITA",
    prompt: "Identify the odd sentence (1–5):",
    sentences: [
      {
        id: 1,
        text: "Walter Benjamin famously argued that mechanical reproduction stripped the traditional work of art of its unique historical 'aura.'",
      },
      {
        id: 2,
        text: "In pre-modern eras, the authentic artwork possessed a singular presence in time and space, rooted in ritual and sacred cultic traditions.",
      },
      {
        id: 3,
        text: "Lithography, photography, and film destroyed this cultic uniqueness by enabling infinite identical copies detached from any single ritual context.",
      },
      {
        id: 4,
        text: "However, modern lithographic offset printing presses require specialized roller maintenance to prevent ink smudging across high-volume runs.",
      },
      {
        id: 5,
        text: "Yet, Benjamin noted that this decay of the aura paradoxically democratized art, transforming it from a tool of aristocratic worship into an instrument of mass political consciousness.",
      },
    ],
    oddSentenceId: 4,
    coherentSequence: "1235",
    explanation: {
      detailed:
        "Sentences 1, 2, 3, and 5 summarize Walter Benjamin's seminal essay 'The Work of Art in the Age of Mechanical Reproduction': mechanical reproduction destroys the artwork's 'aura' (1); pre-modern art had singular presence in ritual (2); reproduction technologies enabled infinite detached copies (3); but this decay democratized art for mass political consciousness (5). Sentence 4 discusses technical mechanical maintenance for printing press rollers, which is printing shop trivia completely alien to philosophical cultural theory.",
      whyOddFails:
        "Sentence 4 introduces mundane printing press maintenance tips (roller ink smudging), destroying a sophisticated philosophical essay on aesthetics and the decay of the aura.",
      coherentNarrativeFlow: "1 &rarr; 2 &rarr; 3 &rarr; 5",
      catTip: "Differentiate between theoretical philosophy of technology (Benjamin) and mechanical repair manual instructions.",
      commonTrap: "Thinking 4 belongs because it uses the word 'lithographic'.",
    },
    difficulty: "CAT",
  },
  {
    id: "ooo-10",
    conceptId: "odd-one-out",
    questionType: "TITA",
    prompt: "Key in the number of the odd sentence out (1–5):",
    sentences: [
      {
        id: 1,
        text: "In macro-evolutionary paleontology, Stephen Jay Gould and Niles Eldredge proposed the theory of 'punctuated equilibrium' to challenge classical Darwinian gradualism.",
      },
      {
        id: 2,
        text: "Rather than species evolving through slow, continuous phenotypic shifts over millions of years, the fossil record reveals prolonged epochs of morphological stasis.",
      },
      {
        id: 3,
        text: "These vast stretches of evolutionary stability are periodically punctuated by sudden, geologically rapid bursts of speciation in geographically isolated populations.",
      },
      {
        id: 4,
        text: "Consequently, the notorious 'missing links' in the fossil record are not artifacts of poor geological sampling, but genuine reflections of how rapid speciation actually unfolds.",
      },
      {
        id: 5,
        text: "Paleontological field excavations in the Gobi Desert require specialized four-wheel-drive vehicles equipped with heavy-duty sand tires.",
      },
    ],
    oddSentenceId: 5,
    coherentSequence: "1234",
    explanation: {
      detailed:
        "Sentences 1, 2, 3, and 4 form a complete exposition of punctuated equilibrium: Gould and Eldredge challenge gradualism (1); species exhibit prolonged morphological stasis (2); stasis is punctuated by rapid bursts of speciation in isolated pockets (3); explaining why missing links are genuine features of rapid speciation rather than sampling failure (4). Sentence 5 introduces logistics about 4x4 desert tires for digging teams, which is expedition logistics trivia.",
      whyOddFails:
        "Sentence 5 discusses desert vehicle tire specifications, completely disconnected from macro-evolutionary theoretical paleontology.",
      coherentNarrativeFlow: "1 &rarr; 2 &rarr; 3 &rarr; 4",
      catTip: "Expedition logistics (jeeps, shovels, tires) vs. evolutionary theory (punctuated equilibrium).",
      commonTrap: "Thinking 5 belongs because it mentions 'paleontological field excavations'.",
    },
    difficulty: "FOUNDATION",
  },
];

// =========================================================================
// 10 SENTENCE / PARAGRAPH COMPLETIONS
// =========================================================================
export const VA_SENTENCE_COMPLETIONS: VASentenceCompletionQuestion[] = [
  {
    id: "sc-1",
    conceptId: "sentence-completion",
    questionType: "MCQ",
    prompt: "Which of the following best completes the paragraph below?",
    paragraphWithBlank:
      "In classical jurisprudence, the rule of law was designed as an institutional shield against the arbitrary, tyrannical whims of monarchical rulers. By binding sovereign power to fixed, publicly promulgated statutes and procedural due process, citizens were protected from capricious state coercion. However, modern administrative governance has inverted this dynamic. Today, sprawling regulatory bureaucracies deploy ambiguous, discretionary statutory language that leaves corporate compliance officers and private citizens guessing how laws will be enforced. [ _____ ]",
    options: [
      {
        label: "A",
        text: "Far from safeguarding liberty against arbitrary power, bureaucratic vagueness resurrects the very unpredictability the rule of law was created to abolish.",
        distractorReason: "Correct Answer.",
      },
      {
        label: "B",
        text: "Therefore, monarchs in sixteenth-century Europe were significantly more democratic than modern administrative civil servants.",
        distractorReason: "Absurd romanticization of absolute monarchy.",
      },
      {
        label: "C",
        text: "Citizens should immediately stop paying municipal taxes until all government statutes are abolished.",
        distractorReason: "Extreme anarchist prescription unsupported by the text.",
      },
      {
        label: "D",
        text: "Corporate compliance officers earn substantially higher salaries than judicial judges in supreme courts.",
        distractorReason: "Irrelevant compensation trivia.",
      },
    ],
    correctAnswer: "A",
    explanation: {
      detailed:
        "The paragraph begins with the historical purpose of the rule of law (protecting against arbitrary tyranny), shows how modern bureaucracies use vague statutes that leave citizens guessing, and demands a conclusion that states the tragic irony: bureaucratic vagueness brings back the very arbitrary unpredictability that the law was invented to eliminate.",
      correctReason:
        "Option A synthesizes the beginning and middle: bureaucratic vagueness resurrects the arbitrary unpredictability that the rule of law was meant to extinguish.",
      optionsBreakdown: [
        {
          label: "A",
          isCorrect: true,
          analysis: "A flawless theoretical culmination highlighting the systemic inversion of the rule of law.",
        },
        {
          label: "B",
          isCorrect: false,
          analysis: "Wildly praises feudal monarchs, ignoring the opening historical premise.",
        },
        {
          label: "C",
          isCorrect: false,
          analysis: "Imports an extreme tax-strike proposal.",
        },
        {
          label: "D",
          isCorrect: false,
          analysis: "Mundane salary gossip unrelated to jurisprudence.",
        },
      ],
      catTip: "Look for the ironic inversion: when an institution created to eliminate Problem X ends up producing Problem X in a new guise.",
      commonTrap: "Choosing options that jump into radical political activism.",
    },
    difficulty: "CAT",
  },
  {
    id: "sc-2",
    conceptId: "sentence-completion",
    questionType: "MCQ",
    prompt: "Which sentence provides the most logical conclusion to the passage?",
    paragraphWithBlank:
      "The widespread adoption of algorithmic risk-assessment tools in criminal sentencing was heralded as an objective antidote to human judicial bias. Advocates argued that neural networks trained on historical arrest records would eliminate racial and socioeconomic prejudice by calculating recidivism risk purely on cold statistical probabilities. Yet, algorithmic systems do not operate in a social vacuum; they learn by identifying patterns in historical data. In societies where policing has historically concentrated disproportionately on minority neighborhoods, the algorithm simply ingests historical racial bias and codifies it into mathematical certainty. [ _____ ]",
    options: [
      {
        label: "A",
        text: "Consequently, criminal defendants should be required to write computer code before receiving their bail sentences.",
        distractorReason: "Absurd, nonsensical requirement.",
      },
      {
        label: "B",
        text: "Rather than eradicating prejudice, algorithmic sentencing merely launders historical discrimination through the veneer of computational objectivity.",
        distractorReason: "Correct Answer.",
      },
      {
        label: "C",
        text: "Police departments have entirely ceased making arrests in high-crime metropolitan sectors.",
        distractorReason: "Direct contradiction of universal policing reality.",
      },
      {
        label: "D",
        text: "Artificial intelligence has achieved higher moral enlightenment than the constitutional framers of democratic nations.",
        distractorReason: "Direct opposite of the passage's scathing critique of biased algorithms.",
      },
    ],
    correctAnswer: "B",
    explanation: {
      detailed:
        "The paragraph traces the promise of AI sentencing (objective antidote to human bias), shows the fatal flaw (algorithms train on historically biased police data), and must conclude by identifying what the algorithm actually accomplishes: laundering past discrimination as objective math.",
      correctReason:
        "Option B delivers the precise logical and metaphorical payoff: algorithms 'launder historical discrimination through the veneer of computational objectivity'.",
      optionsBreakdown: [
        {
          label: "A",
          isCorrect: false,
          analysis: "Bizarre procedural fantasy.",
        },
        {
          label: "B",
          isCorrect: true,
          analysis: "Flawlessly encapsulates the critique: bias is not erased, but disguised as neutral computation.",
        },
        {
          label: "C",
          isCorrect: false,
          analysis: "Manufactures a false empirical claim.",
        },
        {
          label: "D",
          isCorrect: false,
          analysis: "Presents the exact naive techno-utopian view that the passage dismantles.",
        },
      ],
      catTip: "Phrases like 'laundering bias through objectivity' or 'sanitizing extraction' are hallmark concluding motifs in CAT technology critiques.",
      commonTrap: "Falling for Option D if one skimmed only the first sentence.",
    },
    difficulty: "CAT",
  },
  {
    id: "sc-3",
    conceptId: "sentence-completion",
    questionType: "MCQ",
    prompt: "Choose the sentence that best completes the paragraph:",
    paragraphWithBlank:
      "In ecological economics, the concept of 'ecosystem services' was introduced to assign monetary value to the biosphere's unpriced natural processes—such as wetland water filtration, mangrove storm buffering, and insect pollination. Proponents argued that in a capitalist world, what is not priced is not protected; valuing nature in dollars was deemed the only practical way to prevent corporate destruction. However, radical environmentalists argue that this economic framework concedes the fatal premise: that nature's right to exist is contingent upon its utility to human commerce. [ _____ ]",
    options: [
      {
        label: "A",
        text: "Once the preservation of an ecosystem is tethered to its financial profitability, any species that fails to generate market returns becomes economically expendable.",
        distractorReason: "Correct Answer.",
      },
      {
        label: "B",
        text: "Therefore, mangrove trees should be commercially harvested to manufacture luxury corporate executive desks.",
        distractorReason: "Grotesque inversion that directly contradicts the environmental premise.",
      },
      {
        label: "C",
        text: "Insect pollination generates more annual tax revenue than the entire global automotive industry combined.",
        distractorReason: "Unsupported quantitative financial hyperbole.",
      },
      {
        label: "D",
        text: "Environmentalists have unanimously agreed that money is the only thing that matters in modern biology.",
        distractorReason: "Gross caricature of environmental philosophy.",
      },
    ],
    correctAnswer: "A",
    explanation: {
      detailed:
        "The paragraph sets up the utilitarian defense of ecosystem pricing, then presents the radical environmentalist objection (nature's existence should not be contingent on market utility). The logical conclusion must reveal the danger of this contingency: if an ecosystem has no commercial return, it becomes expendable under market logic.",
      correctReason:
        "Option A articulates the lethal consequence of financializing nature: if conservation requires market profit, unprofitable species can be legitimately destroyed.",
      optionsBreakdown: [
        {
          label: "A",
          isCorrect: true,
          analysis: "Logically and ethically culminates the critique of financializing nature.",
        },
        {
          label: "B",
          isCorrect: false,
          analysis: "Advocates the exact destruction the environmentalists oppose.",
        },
        {
          label: "C",
          isCorrect: false,
          analysis: "Injects random tax statistics unrelated to the philosophical dilemma.",
        },
        {
          label: "D",
          isCorrect: false,
          analysis: "Vulgar inversion of environmental ethics.",
        },
      ],
      catTip: "Follow the conditional reasoning: If Value = Profit, then Zero Profit = Zero Value (Expendable).",
      commonTrap: "Choosing options that continue the utilitarian math rather than resolving the philosophical objection.",
    },
    difficulty: "CAT",
  },
  {
    id: "sc-4",
    conceptId: "sentence-completion",
    questionType: "MCQ",
    prompt: "Select the most appropriate final sentence for the paragraph:",
    paragraphWithBlank:
      "The architecture of modern open-plan corporate offices was originally championed as a democratic breakthrough that would dismantle bureaucratic silos, encourage spontaneous cross-disciplinary collaboration, and flatten organizational hierarchies. Yet, comprehensive empirical studies tracking workplace interactions reveal the exact opposite outcome. Confronted with constant visual exposure and auditory distraction, employees do not engage in richer conversations; instead, they retreat into defensive psychological isolation, donning noise-canceling headphones and migrating verbal communication entirely to private digital chat channels. [ _____ ]",
    options: [
      {
        label: "A",
        text: "The physical elimination of walls has paradoxically erected higher psychological barriers to genuine human connection.",
        distractorReason: "Correct Answer.",
      },
      {
        label: "B",
        text: "Consequently, corporate executives have mandated that all employees work exclusively from home without computers.",
        distractorReason: "Absurd corporate policy exaggeration.",
      },
      {
        label: "C",
        text: "Noise-canceling headphones were originally invented by aerospace engineers in the nineteenth century.",
        distractorReason: "Historical gadget trivia completely out of place.",
      },
      {
        label: "D",
        text: "Open-plan offices have proven to be the most successful architectural design in human civilization.",
        distractorReason: "Direct opposite of the empirical findings detailed in the paragraph.",
      },
    ],
    correctAnswer: "A",
    explanation: {
      detailed:
        "The paragraph contrasts the utopian goal of open-plan offices (removing walls to foster collaboration) with the empirical reality (constant distraction driving workers into headphones and digital isolation). The conclusion must capture this paradox: tearing down physical walls created higher psychological walls.",
      correctReason:
        "Option A delivers the perfect paradoxical synthesis: removing physical walls erected higher psychological barriers to connection.",
      optionsBreakdown: [
        {
          label: "A",
          isCorrect: true,
          analysis: "A stunning, concise synthesis of the architectural-psychological paradox.",
        },
        {
          label: "B",
          isCorrect: false,
          analysis: "Bizarre managerial hyperbole.",
        },
        {
          label: "C",
          isCorrect: false,
          analysis: "Anachronistic gadget trivia.",
        },
        {
          label: "D",
          isCorrect: false,
          analysis: "Contradicts the entire empirical critique.",
        },
      ],
      catTip: "Look for chiasmus or paradoxical parallelisms: [Physical removal of X &rarr; Psychological erection of Y].",
      commonTrap: "Selecting mundane technical advice like installing more soundproofing panels.",
    },
    difficulty: "FOUNDATION",
  },
  {
    id: "sc-5",
    conceptId: "sentence-completion",
    questionType: "MCQ",
    prompt: "Which sentence provides the most coherent conclusion?",
    paragraphWithBlank:
      "In the historiography of science, the 'heroic inventor' narrative portrays technological breakthroughs as sudden, lightning-strike epiphanies occurring in the solitary minds of isolated geniuses like Thomas Edison or Alexander Graham Bell. While this myth makes for compelling Hollywood drama, it fundamentally distorts how technological innovation actually operates. Every landmark invention is in reality the cumulative synthesis of decades of publicly funded research, incremental workshop refinements by anonymous machinists, and broader economic imperatives. [ _____ ]",
    options: [
      {
        label: "A",
        text: "Technological progress is never the miraculous gift of lone visionaries, but the collective harvest of an entire civilizational ecosystem.",
        distractorReason: "Correct Answer.",
      },
      {
        label: "B",
        text: "Thomas Edison was an illiterate con-artist who never spent a single hour inside a research laboratory.",
        distractorReason: "Childish ad hominem defamation.",
      },
      {
        label: "C",
        text: "Patents should be permanently granted only to Hollywood movie producers who write scripts about science.",
        distractorReason: "Absurd commercial distortion.",
      },
      {
        label: "D",
        text: "Machine workshops in New Jersey have completely ceased operations due to foreign competition.",
        distractorReason: "Irrelevant modern industrial decline trivia.",
      },
    ],
    correctAnswer: "A",
    explanation: {
      detailed:
        "The paragraph debunks the 'solitary genius' myth and shows that invention is cumulative, public, incremental, and collective. The final sentence must reinforce this collective, ecosystemic reality.",
      correctReason:
        "Option A directly contrasts the 'lone visionary' myth with the 'collective harvest of an entire civilizational ecosystem', perfectly concluding the essay.",
      optionsBreakdown: [
        {
          label: "A",
          isCorrect: true,
          analysis: "Flawless philosophical culmination of the cumulative historiographical argument.",
        },
        {
          label: "B",
          isCorrect: false,
          analysis: "Sensationalist personal smear.",
        },
        {
          label: "C",
          isCorrect: false,
          analysis: "Absurd intellectual property parody.",
        },
        {
          label: "D",
          isCorrect: false,
          analysis: "Unrelated modern economic lament.",
        },
      ],
      catTip: "Match the contrast: [Not the solitary genius (myth) &rarr; but the collective civilizational ecosystem (reality)].",
      commonTrap: "Picking options that attack Edison personally rather than the myth of the heroic inventor.",
    },
    difficulty: "FOUNDATION",
  },
  {
    id: "sc-6",
    conceptId: "sentence-completion",
    questionType: "MCQ",
    prompt: "Which option best completes the paragraph?",
    paragraphWithBlank:
      "In developmental psychology, the 'scaffolding' model formulated by Lev Vygotsky emphasizes that children achieve intellectual breakthroughs not in solitary contemplation, but within the 'zone of proximal development' through structured collaboration with more competent mentors. The teacher's role is not to dispense finished knowledge like water poured into an empty vessel, but to provide temporary cognitive supports that are gradually dismantled as the learner internalizes the skill. Education is thus fundamentally an interactive social apprenticeships. [ _____ ]",
    options: [
      {
        label: "A",
        text: "True pedagogical mastery consists not in making the student permanently dependent on instruction, but in systematically rendering the teacher obsolete.",
        distractorReason: "Correct Answer.",
      },
      {
        label: "B",
        text: "Children should be locked in solitary rooms with encyclopedias until they reach age twenty-one.",
        distractorReason: "Horrific abuse scenario opposite to Vygotsky's social model.",
      },
      {
        label: "C",
        text: "Vygotsky believed that teachers should receive higher financial pensions than corporate lawyers.",
        distractorReason: "Irrelevant compensation trivia.",
      },
      {
        label: "D",
        text: "Scaffolding should be constructed out of steel rather than bamboo during school renovations.",
        distractorReason: "Hilariously literal construction site confusion.",
      },
    ],
    correctAnswer: "A",
    explanation: {
      detailed:
        "The paragraph explains Vygotsky's scaffolding: providing temporary support that is gradually removed as the child internalizes competence. The logical climax must state what happens when scaffolding is fully removed: the student becomes self-sufficient, making the teacher obsolete.",
      correctReason:
        "Option A elegantly concludes the metaphor: the ultimate goal of temporary cognitive scaffolding is the learner's independence, rendering the teacher obsolete.",
      optionsBreakdown: [
        {
          label: "A",
          isCorrect: true,
          analysis: "Profound and accurate pedagogical insight directly derived from the scaffolding metaphor.",
        },
        {
          label: "B",
          isCorrect: false,
          analysis: "Directly violates the fundamental social-learning premise of Vygotsky.",
        },
        {
          label: "C",
          isCorrect: false,
          analysis: "Unrelated salary politics.",
        },
        {
          label: "D",
          isCorrect: false,
          analysis: "Literal construction engineering nonsense.",
        },
      ],
      catTip: "Remember that 'scaffolding' is temporary: its success is measured by its eventual removal.",
      commonTrap: "Choosing options that praise perpetual dependence on teachers.",
    },
    difficulty: "CAT",
  },
  {
    id: "sc-7",
    conceptId: "sentence-completion",
    questionType: "MCQ",
    prompt: "Identify the sentence that logically completes the passage:",
    paragraphWithBlank:
      "For decades, medical researchers treated pain almost exclusively as a direct, hardwired sensory signal: tissue damage stimulates peripheral nociceptors, which send electrical impulses up the spinal cord to trigger an unmediated sensation of agony in the cortex. Modern neurobiology, however, has overturned this simplistic biomechanical model. The brain does not passively register incoming pain signals; it actively predicts and modulates them through descending inhibitory neural pathways, influenced by emotional context, cultural beliefs, and perceived threat levels. [ _____ ]",
    options: [
      {
        label: "A",
        text: "Pain is therefore not an objective readout of bodily damage, but an active, complex psychological interpretation crafted by the brain to protect the organism.",
        distractorReason: "Correct Answer.",
      },
      {
        label: "B",
        text: "Consequently, surgical patients should be forbidden from receiving anesthesia during open-heart operations.",
        distractorReason: "Barbaric medical malpractice advice.",
      },
      {
        label: "C",
        text: "Spinal cords in mammals contain more copper wiring than transatlantic telecommunications cables.",
        distractorReason: "Absurd biological fantasy.",
      },
      {
        label: "D",
        text: "Pharmaceutical painkillers have completely eradicated all chronic illnesses across the Western hemisphere.",
        distractorReason: "False empirical claim.",
      },
    ],
    correctAnswer: "A",
    explanation: {
      detailed:
        "The passage moves from the old view (pain is direct hardwired damage) to the new view (the brain actively predicts and modulates pain based on emotion and context). The terminal sentence must synthesize this new paradigm: pain is an interpretation, not a mechanical readout.",
      correctReason:
        "Option A directly synthesizes the neurobiological revolution: pain is an active brain interpretation rather than an objective damage meter.",
      optionsBreakdown: [
        {
          label: "A",
          isCorrect: true,
          analysis: "Accurate, balanced, and perfectly articulates the shift from passive sensation to active neurological interpretation.",
        },
        {
          label: "B",
          isCorrect: false,
          analysis: "Horrific medical absurdity.",
        },
        {
          label: "C",
          isCorrect: false,
          analysis: "Copper wiring in human biology is pure fiction.",
        },
        {
          label: "D",
          isCorrect: false,
          analysis: "Unfounded medical utopian claim.",
        },
      ],
      catTip: "Track the shift from 'passive mechanical registration' to 'active interpretive modulation'.",
      commonTrap: "Selecting options that dismiss pain as imaginary; the text says it is an *active interpretation*, not an illusion.",
    },
    difficulty: "CAT",
  },
  {
    id: "sc-8",
    conceptId: "sentence-completion",
    questionType: "MCQ",
    prompt: "Choose the best concluding sentence:",
    paragraphWithBlank:
      "In urban sociology, the phenomenon of 'hostile architecture'—such as benches fitted with middle armrests to deter sleeping, spiked window ledges, and public sprinklers activated at midnight—is defended by municipal authorities as necessary crime prevention and public order maintenance. Critics, however, recognize these defensive urban designs as a violent physical manifestation of social exclusion. Rather than addressing the root structural drivers of homelessness, affordable housing shortages, and mental healthcare deficits, city planners weaponize the built environment against the vulnerable. [ _____ ]",
    options: [
      {
        label: "A",
        text: "By transforming public space into an obstacle course for the destitute, the city sanitizes poverty from elite view while quietly abandoning the humane obligation to resolve it.",
        distractorReason: "Correct Answer.",
      },
      {
        label: "B",
        text: "Park benches should be manufactured exclusively from 24-karat solid gold to demonstrate civic wealth.",
        distractorReason: "Absurd, ostentatious fantasy.",
      },
      {
        label: "C",
        text: "Homeless individuals universally prefer sleeping on metal spikes rather than in heated municipal shelters.",
        distractorReason: "Offensive, cruel distortion.",
      },
      {
        label: "D",
        text: "Civil engineering departments have completely eliminated the study of structural concrete from college curricula.",
        distractorReason: "Unrelated academic curriculum rumor.",
      },
    ],
    correctAnswer: "A",
    explanation: {
      detailed:
        "The author critiques hostile architecture: authorities claim it is crime prevention, but critics show it weaponizes public space against the homeless instead of solving affordable housing. The conclusion must expose the underlying objective: hiding poverty from view while abandoning social responsibility.",
      correctReason:
        "Option A articulates the political consequence: sanitizing poverty from elite sight while abandoning the obligation to fix its root causes.",
      optionsBreakdown: [
        {
          label: "A",
          isCorrect: true,
          analysis: "Powerful, logically seamless culmination of the sociopolitical critique of defensive urban design.",
        },
        {
          label: "B",
          isCorrect: false,
          analysis: "Ridiculous gold bench fantasy.",
        },
        {
          label: "C",
          isCorrect: false,
          analysis: "Cruel and absurd distortion.",
        },
        {
          label: "D",
          isCorrect: false,
          analysis: "Irrelevant civil engineering rumor.",
        },
      ],
      catTip: "Look for verbs that reveal social mechanisms: 'sanitizes', 'invisibilizes', 'deflects', 'displaces'.",
      commonTrap: "Choosing technical engineering answers about bench materials rather than social critique.",
    },
    difficulty: "CAT_HARD",
  },
  {
    id: "sc-9",
    conceptId: "sentence-completion",
    questionType: "MCQ",
    prompt: "Which sentence provides the most logical conclusion?",
    paragraphWithBlank:
      "In classical diplomatic theory, the 'balance of power' framework assumed that international stability was best preserved when rival coalitions possessed roughly equivalent military capabilities, neutralizing any single nation's temptation to pursue imperial hegemony. While this equilibrium successfully prevented continent-wide European wars for long stretches of the nineteenth century, it contained a fatal structural vulnerability: the rigidity of secret interlocking alliances. When power balances are maintained through hair-trigger mutual defense treaties, a localized crisis between minor regional actors cannot be contained. [ _____ ]",
    options: [
      {
        label: "A",
        text: "The very diplomatic mechanism designed to preserve continental equilibrium becomes the transmission belt that drags every major power into catastrophic total war.",
        distractorReason: "Correct Answer.",
      },
      {
        label: "B",
        text: "Consequently, nineteenth-century European diplomats were completely uneducated in foreign geography.",
        distractorReason: "Crude insult unrelated to treaty architecture.",
      },
      {
        label: "C",
        text: "Secret treaties were written exclusively in invisible ink that caused international ambassadors to misunderstand treaty terms.",
        distractorReason: "Comical spy-novel fiction.",
      },
      {
        label: "D",
        text: "Regional conflicts in the Balkans had zero impact on Austro-Hungarian foreign policy decisions in 1914.",
        distractorReason: "Direct contradiction of universal historical fact.",
      },
    ],
    correctAnswer: "A",
    explanation: {
      detailed:
        "The paragraph explains how the balance of power kept stability, but notes the fatal flaw of secret mutual defense treaties: when an isolated crisis occurs, the rigid alliances prevent containment. The climax must show how the system backfires, dragging everyone into war (as occurred in WWI).",
      correctReason:
        "Option A captures the ultimate structural paradox: the balance-of-power alliance system becomes the transmission belt for global war.",
      optionsBreakdown: [
        {
          label: "A",
          isCorrect: true,
          analysis: "Flawless historical and diplomatic payoff: balance of power becomes the transmission belt of total war.",
        },
        {
          label: "B",
          isCorrect: false,
          analysis: "Petty personal insult.",
        },
        {
          label: "C",
          isCorrect: false,
          analysis: "Invisible ink spy trope.",
        },
        {
          label: "D",
          isCorrect: false,
          analysis: "Direct historical reversal of the outbreak of WWI.",
        },
      ],
      catTip: "Watch for mechanical metaphors in diplomatic history: 'transmission belt', 'tripwire', 'domino effect'.",
      commonTrap: "Picking options that discuss specific battles rather than the structural systemic breakdown.",
    },
    difficulty: "CAT",
  },
  {
    id: "sc-10",
    conceptId: "sentence-completion",
    questionType: "MCQ",
    prompt: "Which option best completes the paragraph below?",
    paragraphWithBlank:
      "In evolutionary medicine, the 'mismatch hypothesis' posits that a significant proportion of modern non-communicable diseases—including obesity, hypertension, and autoimmune disorders—arise because our biological genome remains adapted to Paleolithic ancestral conditions that no longer correspond to our industrial environment. For hundreds of millennia, human survival depended on hoarding calorie-dense sugars and fats whenever scarce opportunities arose, and conserving physical energy during periods of food scarcity. In a modern environment of super-abundant hyper-palatable processed food and sedentary desk work, this evolutionary survival instinct becomes our physiological downfall. [ _____ ]",
    options: [
      {
        label: "A",
        text: "The very biological adaptations that once protected our ancestral lineages from starvation now operate as lethal vectors of metabolic chronic disease.",
        distractorReason: "Correct Answer.",
      },
      {
        label: "B",
        text: "Therefore, modern supermarket corporations should be prosecuted in criminal courts for selling fresh fruits and vegetables.",
        distractorReason: "Nonsensical legal absurdity.",
      },
      {
        label: "C",
        text: "Paleolithic hunter-gatherers spent an average of ten hours every day reading medical textbooks on diabetes.",
        distractorReason: "Anachronistic comedy.",
      },
      {
        label: "D",
        text: "Human DNA has mutated so rapidly in the last twenty years that ancestral history has zero relevance to modern medicine.",
        distractorReason: "Direct opposite of the mismatch hypothesis, which states DNA has NOT adapted to the new environment.",
      },
    ],
    correctAnswer: "A",
    explanation: {
      detailed:
        "The paragraph explains the mismatch hypothesis: adaptations designed for ancestral scarcity (craving sugar/fat, conserving energy) now cause disease in an environment of abundance and sedentariness. The conclusion must state the evolutionary irony: past survival adaptations have become modern disease vectors.",
      correctReason:
        "Option A directly synthesizes the evolutionary inversion: ancestral survival adaptations have transformed into vectors of chronic metabolic disease.",
      optionsBreakdown: [
        {
          label: "A",
          isCorrect: true,
          analysis: "A flawless theoretical landing summarizing the evolutionary medicine mismatch paradox.",
        },
        {
          label: "B",
          isCorrect: false,
          analysis: "Absurd anti-vegetable legal fantasy.",
        },
        {
          label: "C",
          isCorrect: false,
          analysis: "Anachronistic nonsense.",
        },
        {
          label: "D",
          isCorrect: false,
          analysis: "Directly contradicts the central premise that the human genome has remained unchanged.",
        },
      ],
      catTip: "In evolutionary medicine, look for the inversion: [What was once protective in scarcity becomes destructive in abundance].",
      commonTrap: "Choosing options that propose unrealistic societal bans rather than summarizing the biological paradox.",
    },
    difficulty: "FOUNDATION",
  },
];
