import { VARCConceptMeta } from "./types";

export const VARC_CONCEPTS: VARCConceptMeta[] = [
  // ==========================================
  // READING COMPREHENSION CONCEPTS (8)
  // ==========================================
  {
    id: "main-idea",
    section: "RC",
    title: "Main Idea & Central Theme",
    shortDesc: "Distill the central thesis, authorial premise, and holistic umbrella argument of the passage.",
    catWeightage: "Very High",
    averageQuestionsInCAT: "4–5 Questions (1 per passage)",
    whatIsIt:
      "The Main Idea is the single overriding claim or intellectual takeaway that every paragraph exists to support, qualify, or demonstrate. It is not merely the topic (e.g., 'artificial intelligence'), but what the author asserts about that topic (e.g., 'artificial intelligence undermines human epistemic autonomy unless regulated through adversarial auditing').",
    whyCatTests:
      "CAT evaluates whether you can synthesize large, multi-disciplinary texts without drowning in minor sub-arguments, examples, historical digressions, or counter-premises.",
    howToIdentify: [
      "Check the transitional 'pivot' sentences (often preceded by 'However', 'Yet', 'Nevertheless', or 'Crucially').",
      "Look for recurring thematic threads connecting the introduction, mid-body counterpoints, and conclusion.",
      "Ask: 'If the author had to delete everything except one thesis paragraph, which claim would keep the passage coherent?'",
      "Differentiate between the author's primary conclusion and secondary evidence or illustrative case studies.",
    ],
    stepByStepMethod: [
      {
        step: 1,
        title: "Identify Topic vs. Authorial Stance",
        instruction: "State in 5 words what subject is discussed, and then state the author's specific evaluative stance on it.",
      },
      {
        step: 2,
        title: "Map Paragraph Functional Roles",
        instruction: "Tag each paragraph (e.g., Para 1: Problem statement; Para 2: Conventional hypothesis; Para 3: Flaw in hypothesis; Para 4: Author's alternative model).",
      },
      {
        step: 3,
        title: "Apply the 'Umbrella Test'",
        instruction: "Ensure the candidate answer choice can comfortably subsume all paragraphs rather than just summarizing a single paragraph.",
      },
      {
        step: 4,
        title: "Eliminate Classic Distractor Modifiers",
        instruction: "Scrutinize absolute terms ('solely', 'invariably', 'proves') and eliminate options that are factually accurate according to the text but too narrow in scope.",
      },
    ],
    commonTraps: [
      {
        trapName: "The Sub-Argument Trap (Too Narrow)",
        description: "An option that accurately summarizes a fascinating paragraph or case study, but ignores the remaining 75% of the passage.",
        howToAvoid: "Check if the option reflects the whole essay or merely one paragraph's supporting pillar.",
      },
      {
        trapName: "The Cosmic Overreach (Too Broad)",
        description: "An option that balloons the passage's specific argument into a sweeping philosophical generalization about human civilization or technology.",
        howToAvoid: "Cross-check the exact boundaries of the author's claim; keep within the author's defined domain.",
      },
      {
        trapName: "The Distorted Stance (Tone Warping)",
        description: "An option that correctly captures the subject matter but characterizes the author as dogmatic or condemnatory when the author was cautious or ambivalent.",
        howToAvoid: "Highlight the author's qualifiers ('perhaps', 'suggests', 'tends to') against strong verbs in the option.",
      },
    ],
    workedExample: {
      paragraph:
        "The prevailing narrative of technological disruption celebrates decentralization as an inherent democratic virtue. By dismantling traditional gatekeepers in journalism, finance, and culture, algorithmic networks promised to democratize access and empower individual agency. Yet, this celebratory discourse obscures a fundamental dialectic: the elimination of institutional intermediaries has not yielded an egalitarian public sphere, but rather consecrated new, unaccountable platform monopolists whose architectural choices dictate the epistemic boundaries of public deliberation.",
      questionPrompt: "Which of the following most accurately encapsulates the central thesis of the passage?",
      options: [
        {
          label: "A",
          text: "Algorithmic networks have successfully eliminated all institutional intermediaries across journalism and global finance.",
          distractorReason: "Fails because it ignores the author's critical counter-claim and states the initial premise as an unmitigated success.",
        },
        {
          label: "B",
          text: "The promise of decentralized digital democracy is undermined by the emergence of unregulated platform monopolies that quietly govern public discourse.",
          distractorReason: "Correct Answer.",
        },
        {
          label: "C",
          text: "Traditional gatekeepers in media and finance were superior guardians of truth compared to modern algorithmic platforms.",
          distractorReason: "Unsupported comparative value judgment; the author never defends or glorifies traditional gatekeepers.",
        },
        {
          label: "D",
          text: "Technological disruption invariably results in total societal collapse unless democratic governments nationalize private platform networks.",
          distractorReason: "Extreme language ('invariably results in total societal collapse') and unwarranted policy prescription ('nationalize').",
        },
      ],
      correctAnswer: "B",
      explanation: {
        detailed:
          "The paragraph begins by noting the conventional view (decentralization promotes democratic agency) and introduces a pivotal shift ('Yet, this celebratory discourse obscures...'). The author's core thesis is that the erosion of old intermediaries gave rise to even more insidious platform monopolists who control discourse.",
        correctReason:
          "Option B perfectly synthesizes the initial utopian premise with the author's critical verdict: platform monopolies replace decentralized agency and steer deliberation.",
        optionsBreakdown: [
          {
            label: "A",
            isCorrect: false,
            analysis: "Only reports the first half of the argument and treats it as an accomplished fact, missing the author's thesis entirely.",
          },
          {
            label: "B",
            isCorrect: true,
            analysis: "Accurately captures both the premise and the author's corrective insight without introducing extreme or extraneous claims.",
          },
          {
            label: "C",
            isCorrect: false,
            analysis: "Introduces an unjustified nostalgia for legacy institutions not present in the text.",
          },
          {
            label: "D",
            isCorrect: false,
            analysis: "Exaggerates the argument into catastrophic collapse and prescribes extreme state interventions.",
          },
        ],
        catTip: "Whenever an RC paragraph pivots with words like 'Yet', 'However', or 'Rather', the thesis almost always resides AFTER the pivot.",
        commonTrap: "Confusing what the author is reporting as a common belief with what the author actually believes.",
      },
    },
    practiceCount: 15,
  },
  {
    id: "inference",
    section: "RC",
    title: "Inference & Implied Meaning",
    shortDesc: "Deduce unstated implications, logical consequences, and implicit constraints grounded in textual facts.",
    catWeightage: "Very High",
    averageQuestionsInCAT: "6–8 Questions across 4 passages",
    whatIsIt:
      "An inference in CAT is an unstated proposition that MUST be true if the explicit premises in the passage are true. It is NOT creative speculation or a plausible real-world guess. It is a strict logical consequence derived from textual evidence.",
    whyCatTests:
      "CAT evaluates intellectual discipline: the ability to discern boundary conditions, comprehend nuances between lines, and avoid making unfounded cognitive leaps.",
    howToIdentify: [
      "Phrased as: 'It can be inferred from the passage that...', 'The author implies that...', or 'Which of the following would the author most likely agree with?'",
      "Requires bridging two adjacent premises or recognizing the inverse of a conditional statement.",
      "The answer is never a verbatim restatement of a line from the text; it rephrases an inescapable logical conclusion.",
    ],
    stepByStepMethod: [
      {
        step: 1,
        title: "Locate the Specific Textual Anchor",
        instruction: "Trace the key nouns and qualifying verbs from the question stem directly to the corresponding sentences in the passage.",
      },
      {
        step: 2,
        title: "Extract the Raw Logical Equation",
        instruction: "Strip away illustrative adjectives to see the core claim (e.g., 'Premise: All A exhibit B under condition C; Premise: D lacked condition C; Inference: D did not exhibit B via the same mechanism').",
      },
      {
        step: 3,
        title: "Subject Options to the 'Negation Test'",
        instruction: "If you negate the candidate answer choice and the author's stated argument remains completely intact and uncontradicted, the choice is NOT a necessary inference.",
      },
      {
        step: 4,
        title: "Reject Common Sense Inferences Not Grounded in Text",
        instruction: "Discard options that sound highly reasonable in everyday life but lack textual substantiation.",
      },
    ],
    commonTraps: [
      {
        trapName: "The Plausible-World Trap",
        description: "An option that is undeniably true in the real world or in contemporary science, but for which the passage provides zero direct evidential grounding.",
        howToAvoid: "Adopt an insular mindset: if it isn't established or logically necessitated by this author, it does not exist.",
      },
      {
        trapName: "The Quantum Leap (Overextension)",
        description: "Taking an author's limited observation about a specific cohort and generalizing it to an entire species, industry, or era.",
        howToAvoid: "Check quantifiers: did the passage say 'some economists' while the option claims 'modern financial theory'?",
      },
      {
        trapName: "The Direct Paraphrase",
        description: "Directly copy-pasting passage lines without extracting deeper logical consequence; often distracts students who match keywords.",
        howToAvoid: "Remember that true CAT inferences involve synthesis, not visual pattern matching.",
      },
    ],
    workedExample: {
      paragraph:
        "Epigenetic modifications—chemical tags that modulate gene transcription without altering underlying nucleotide sequences—are dynamically responsive to environmental stressors such as nutritional deprivation and chronic cortisol elevation. While classical neo-Darwinian synthesis maintained that acquired somatic adaptations cannot penetrate the germline barrier, empirical studies in mammalian models now indicate that paternal metabolic trauma can alter spermatozoa microRNA profiles, inducing insulin resistance in progeny that never encountered the initial stressor.",
      questionPrompt: "It can be reasonably inferred from the passage that classical neo-Darwinian synthesis:",
      options: [
        {
          label: "A",
          text: "Denied that environmental trauma could cause immediate physiological changes in an individual's somatic cells.",
          distractorReason: "Incorrect; classical synthesis accepted somatic changes, but denied that such changes could cross the germline to offspring.",
        },
        {
          label: "B",
          text: "Would struggle to account for hereditary insulin resistance arising in offspring whose ancestors alone experienced metabolic deprivation.",
          distractorReason: "Correct Answer.",
        },
        {
          label: "C",
          text: "Posited that microRNA profiles in spermatozoa are the sole evolutionary vehicle for multi-generational adaptation.",
          distractorReason: "Completely opposite; microRNA germline transmission is the modern empirical finding challenging neo-Darwinism.",
        },
        {
          label: "D",
          text: "Has been conclusively discarded as pseudoscientific dogma across all branches of modern evolutionary genetics.",
          distractorReason: "Extreme exaggeration; the passage only discusses revision of the germline barrier via epigenetic discoveries.",
        },
      ],
      correctAnswer: "B",
      explanation: {
        detailed:
          "The text states that classical neo-Darwinian synthesis held that acquired somatic adaptations cannot cross the germline into offspring. It then presents recent studies showing that paternal metabolic trauma induces insulin resistance in non-exposed progeny via sperm microRNA. Therefore, neo-Darwinian theory cannot easily explain this transgenerational transmission.",
        correctReason:
          "Option B directly follows: because neo-Darwinism asserted that acquired somatic trauma cannot cross into the germline, hereditary transmission of insulin resistance from ancestral trauma poses an explanatory challenge for that model.",
        optionsBreakdown: [
          {
            label: "A",
            isCorrect: false,
            analysis: "Distorts the germline barrier: the theory accepted somatic adaptation, only denying its intergenerational inheritance.",
          },
          {
            label: "B",
            isCorrect: true,
            analysis: "Valid deduction combining the neo-Darwinian premise (no acquired inheritance) with the empirical finding (hereditary transmission observed).",
          },
          {
            label: "C",
            isCorrect: false,
            analysis: "Reverses the chronological and conceptual framework; microRNA mechanisms belong to the new epigenetic data.",
          },
          {
            label: "D",
            isCorrect: false,
            analysis: "Wildly overstates the case ('conclusively discarded as pseudoscientific dogma').",
          },
        ],
        catTip: "Inference questions testing scientific theories frequently ask how a legacy paradigm would respond to newly cited counter-phenomena.",
        commonTrap: "Choosing options with sensationalist vocabulary like 'debunked' or 'pseudoscientific' when the author expresses measured nuance.",
      },
    },
    practiceCount: 20,
  },
  {
    id: "tone",
    section: "RC",
    title: "Author's Tone & Attitude Spectrum",
    shortDesc: "Decode the author's affective stance, epistemological confidence, and stylistic demeanor.",
    catWeightage: "High",
    averageQuestionsInCAT: "2–3 Questions across 4 passages",
    whatIsIt:
      "The author's tone reflects their intellectual attitude toward the subject matter or specific interlocutors. It ranges across analytical, cautious, skeptical, ambivalent, polemical, nostalgic, acerbic, or appreciative. CAT tone is rarely monolithic; authors frequently shift between objective dissection and subtle irony.",
    whyCatTests:
      "CAT evaluates semantic sensitivity: whether you can pick up on subtle authorial markers (adverbs like 'ostensibly', 'purported', 'admirably') that signal endorsement, reservation, or polite skepticism.",
    howToIdentify: [
      "Look at evocative adjectives, qualifiers, and parenthetical asides.",
      "Check how the author characterizes opposing views (e.g., 'so-called breakthrough' vs. 'pioneering investigation').",
      "Differentiate between the tone of a person quoted in the text and the author's own meta-commentary.",
    ],
    stepByStepMethod: [
      {
        step: 1,
        title: "Establish the Broad Quadrant",
        instruction: "Determine if the tone is Positive (supportive/appreciative), Negative (critical/dismissive), or Neutral/Analytical (objective/inquisitive).",
      },
      {
        step: 2,
        title: "Calibrate Emotional Intensity",
        instruction: "Decide whether the stance is passionate/combative or measured/cautious. CAT authors are almost never hysterically angry or blindly worshipful.",
      },
      {
        step: 3,
        title: "Isolate Authorial Attitudinal Adverbs",
        instruction: "Identify words such as 'conveniently', 'alleged', 'curiously', or 'to be sure', which reveal skepticism or concession.",
      },
      {
        step: 4,
        title: "Match Exact Tone Nuances",
        instruction: "Choose the vocabulary descriptor that matches both the cognitive rigor and affective degree of the passage.",
      },
    ],
    commonTraps: [
      {
        trapName: "The Extreme Vocabulary Trap",
        description: "Options using violent, sensational tone words like 'Belligerent', 'Contemptuous', 'Ecstatic', or 'Derogatory' for an author who merely expresses firm intellectual critique.",
        howToAvoid: "Remember academic essays published in peer-reviewed journals or intellectual quarterlies favor restrained critique over hostility.",
      },
      {
        trapName: "Attributing a Quoted Subject's Tone to the Author",
        description: "Mistaking the furious tone of a revolutionary or historical figure quoted in paragraph 2 for the detached analytical tone of the author examining them.",
        howToAvoid: "Check the narrator's framing sentences outside the quotation marks.",
      },
      {
        trapName: "Ignoring Ambivalence",
        description: "Labeling a passage 'optimistic' because the author notes benefits, while ignoring the author's profound final caveats.",
        howToAvoid: "If both pros and cons are seriously weighted, look for terms like 'measured', 'guardedly optimistic', or 'ambivalent'.",
      },
    ],
    workedExample: {
      paragraph:
        "Proponents of neuro-marketing herald the functional MRI as an infallible window into the consumer's sub-conscious appetites, promising advertisers an unmediated ledger of commercial desire. To be sure, blood-oxygen-level-dependent imaging provides fascinating topological maps of amygdala excitation when subjects view sleek sports sedans. Yet, translating these localized hemodynamic flickers into predictive models of consumer purchasing is an exercise in heroic reductionism. It conflates physiological arousal with cognitive intent, mistaking the cerebral stage for the drama of human decision-making.",
      questionPrompt: "The author's attitude toward the claims made by neuro-marketing proponents can best be described as:",
      options: [
        {
          label: "A",
          text: "Uncompromisingly vitriolic and dismissive of all neuroscience applications.",
          distractorReason: "Too extreme ('vitriolic') and inaccurate ('all neuroscience applications'); the author concedes fMRI provides fascinating maps.",
        },
        {
          label: "B",
          text: "Trenchantly skeptical of their methodological overreach and reductionist assumptions.",
          distractorReason: "Correct Answer.",
        },
        {
          label: "C",
          text: "Enthusiastically supportive, though cautious regarding budgetary costs.",
          distractorReason: "Direct contradiction; the author explicitly attacks their conceptual foundations as heroic reductionism.",
        },
        {
          label: "D",
          text: "Indifferent and detached, presenting both sides without intellectual commitment.",
          distractorReason: "Incorrect; terms like 'heroic reductionism' and 'conflates physiological arousal with cognitive intent' reveal clear critical commitment.",
        },
      ],
      correctAnswer: "B",
      explanation: {
        detailed:
          "The author acknowledges the imaging technique ('To be sure, ... provides fascinating topological maps'), but proceeds to sharply dismantle their commercial claims as 'an exercise in heroic reductionism' that conflates physical arousal with intent.",
        correctReason:
          "Option B captures the precise analytical rigor of the critique: 'trenchantly skeptical' matches the sharp deconstruction, and 'methodological overreach' directly maps to 'heroic reductionism'.",
        optionsBreakdown: [
          {
            label: "A",
            isCorrect: false,
            analysis: "Overstates the emotion into rage ('vitriolic') and overextends the target to all neuroscience.",
          },
          {
            label: "B",
            isCorrect: true,
            analysis: "Accurately represents both the intellectual depth ('trenchant') and critical thrust of the author's stance.",
          },
          {
            label: "C",
            isCorrect: false,
            analysis: "Opposite polarity; the author is criticizing, not championing the field.",
          },
          {
            label: "D",
            isCorrect: false,
            analysis: "Fails to recognize the author's unambiguous, biting epistemological critique.",
          },
        ],
        catTip: "Phrases like 'heroic reductionism' or 'epistemic hubris' are textbook signals of trenchant or scathing academic skepticism.",
        commonTrap: "Assuming that acknowledging an empirical fact ('fMRI works') means the author endorses the extravagant commercial theory built on top of it.",
      },
    },
    practiceCount: 15,
  },
  {
    id: "purpose",
    section: "RC",
    title: "Author's Purpose & Organizational Structure",
    shortDesc: "Decipher why the text was composed and how individual paragraphs orchestrate the central argument.",
    catWeightage: "High",
    averageQuestionsInCAT: "2–4 Questions across 4 passages",
    whatIsIt:
      "Purpose is the functional objective the author seeks to accomplish in writing the piece: to challenge an orthodox paradigm, adjudicate between two competing theories, warn against an emergent peril, historicize a contemporary dilemma, or propose an epistemological framework.",
    whyCatTests:
      "CAT assesses structural comprehension: whether you understand *why* an author constructed the essay in a particular sequence and what rhetorical objective each paragraph fulfills.",
    howToIdentify: [
      "Pay attention to the verbs in answer choices: 'delineate', 'adjudicate', 'interrogate', 'rehabilitate', 'excoriate', 'problematize'.",
      "Notice if the passage resolves a debate or intentionally leaves it an open, unresolved paradox.",
      "Check if a historical narrative was introduced merely for background context or as the core subject under investigation.",
    ],
    stepByStepMethod: [
      {
        step: 1,
        title: "Identify the Primary Rhetorical Mode",
        instruction: "Is the author defending, attacking, reconciling, exposing, categorizing, or chronicling?",
      },
      {
        step: 2,
        title: "Assess the Scope of the Action Verb",
        instruction: "Check whether the verb in the option matches the actual scale of what the author performed.",
      },
      {
        step: 3,
        title: "Verify the Direct Object of the Purpose",
        instruction: "Ensure the target of the purpose matches the passage (e.g., did the author challenge 'Darwin's theory' or merely 'a misapplication of Darwinian ideas to sociology'?).",
      },
      {
        step: 4,
        title: "Eliminate Options Describing Subordinate Steps",
        instruction: "Reject options that describe what the author did in paragraph 1 or 2 as if it were the purpose of the entire essay.",
      },
    ],
    commonTraps: [
      {
        trapName: "Mistaking the Hook for the Thesis",
        description: "An author opens with an engaging historical anecdote; an option claims the primary purpose is to 'narrate the history of X'.",
        howToAvoid: "Recognize pedagogical hooks: authors often introduce history solely to deconstruct a modern assumption.",
      },
      {
        trapName: "Aggressive Action Verb Incongruity",
        description: "Choosing 'demolish an outdated hypothesis' when the author gently proposed revisions or noted evidentiary gaps.",
        howToAvoid: "Check whether the author sought outright refutation or modest refinement.",
      },
      {
        trapName: "Descriptive vs. Prescriptive Confusion",
        description: "Claiming the purpose was to 'advocate for urgent policy reforms' when the author strictly conducted a descriptive sociological diagnosis.",
        howToAvoid: "Unless the author issues explicit normative recommendations ('we must', 'governments should'), the purpose is analytical, not programmatic.",
      },
    ],
    workedExample: {
      paragraph:
        "For nearly a century, economic historiography attributed the onset of Britain's Industrial Revolution almost exclusively to endogenous technological ingenuity—the mechanical prodigy of Watt, Arkwright, and Crompton tinkering in Midlands workshops. Recent quantitative reassessments of trans-Atlantic trade flows, however, have disrupted this insular orthodoxy. By reconstructing the mercantilist conduits that extracted colonial raw cotton and subsidized captive imperial export markets, revisionist historians have demonstrated that British mechanization was not an autonomous triumph of domestic virtue, but an industrial architecture structurally contingent upon global colonial exploitation.",
      questionPrompt: "The primary purpose of the passage is to:",
      options: [
        {
          label: "A",
          text: "Celebrate the pioneering mechanical inventions of Watt and Arkwright that initiated European industrial expansion.",
          distractorReason: "Opposite of purpose; the passage explicitly critiques the traditional celebratory view of these figures.",
        },
        {
          label: "B",
          text: "Highlight revisionist historiography that reinterprets Britain's Industrial Revolution through the lens of colonial exploitation rather than purely domestic innovation.",
          distractorReason: "Correct Answer.",
        },
        {
          label: "C",
          text: "Demand that modern British financial institutions pay economic reparations to former colonies.",
          distractorReason: "Out of scope; introduces modern political activism nowhere found in this historiographical text.",
        },
        {
          label: "D",
          text: "Prove that technological inventions had zero influence on the growth of British manufacturing in the 18th century.",
          distractorReason: "Extreme distortion; revisionists show technological mechanization was contingent on colonial trade, not that inventions had 'zero influence'.",
        },
      ],
      correctAnswer: "B",
      explanation: {
        detailed:
          "The author contrasts the traditional endogenous interpretation of the Industrial Revolution with new quantitative revisionist scholarship showing the vital structural role of colonial extraction and captive markets.",
        correctReason:
          "Option B captures the precise intellectual goal: presenting and legitimizing revisionist historiography that shifts focus from insular domestic ingenuity to colonial extraction.",
        optionsBreakdown: [
          {
            label: "A",
            isCorrect: false,
            analysis: "Misidentifies the discredited orthodoxy as the author's primary objective.",
          },
          {
            label: "B",
            isCorrect: true,
            analysis: "Accurately names the historiographical pivot from insular domestic narrative to global colonial structural contingency.",
          },
          {
            label: "C",
            isCorrect: false,
            analysis: "Imports an external political agenda not supported by the analytical text.",
          },
          {
            label: "D",
            isCorrect: false,
            analysis: "Caricatures the revisionist thesis into an absurd absolute claim ('zero influence').",
          },
        ],
        catTip: "Look for verbs that describe scholarly conversations: 'reassess', 'contextualize', 'interrogate', 'reappraise'.",
        commonTrap: "Selecting an answer that describes the opening consensus that the author wrote the article to overturn.",
      },
    },
    practiceCount: 15,
  },
  {
    id: "strengthen",
    section: "RC",
    title: "Strengthen the Argument",
    shortDesc: "Bolster premises, eliminate rival hypotheses, and reinforce the evidential bridge to the conclusion.",
    catWeightage: "High",
    averageQuestionsInCAT: "2–3 Questions across 4 passages",
    whatIsIt:
      "To Strengthen an argument in CAT is to supply an additional factual premise or eliminate a rival hypothesis such that the author's stated conclusion becomes significantly more probable. It does NOT mean the conclusion must become an absolute mathematical certainty; it simply requires that the reasoning connection between data and conclusion is fortified.",
    whyCatTests:
      "CAT evaluates positive scientific confirmation logic: recognizing what kind of new empirical data or methodological control legitimately reinforces an inferential claim.",
    howToIdentify: [
      "Phrased as: 'Which of the following, if true, would lend the strongest support to the author's hypothesis?', 'The author's conclusion would be most strengthened if which of the following were established?'",
      "Contains the operative phrase 'IF TRUE'—you must treat the choices as authentic facts.",
      "The correct option often functions by eliminating a competing alternative explanation.",
    ],
    stepByStepMethod: [
      {
        step: 1,
        title: "Isolate the Exact Conclusion",
        instruction: "State in one sentence the exact claim the author is trying to prove.",
      },
      {
        step: 2,
        title: "Identify the Missing Assumption",
        instruction: "Ask: 'What unstated bridge must hold true for this evidence to support this conclusion?'",
      },
      {
        step: 3,
        title: "Eliminate Irrelevant or Opposite Options",
        instruction: "Discard choices that merely restate existing passage premises or that accidentally weaken the link.",
      },
      {
        step: 4,
        title: "Verify Evidential Lift",
        instruction: "Check if the candidate option provides positive confirmation by ruling out a confounding variable or confirming a predicted mechanism.",
      },
    ],
    commonTraps: [
      {
        trapName: "The Premise Echo Trap",
        description: "An option that merely repeats a fact already stated in the text with slightly fancier vocabulary.",
        howToAvoid: "A strengthener must add *new* evidential weight, not simply re-announce what is already accepted.",
      },
      {
        trapName: "The Out-of-Scope Factoid",
        description: "An option providing true, impressive facts about the broader subject that nevertheless leave the specific causal link unstrengthened.",
        howToAvoid: "Ensure the new fact directly targets the author's specific causal mechanism.",
      },
    ],
    workedExample: {
      paragraph:
        "Marine biologists observed that coral reefs adjacent to uninhabited Pacific atolls exhibited 80% higher calcification rates and zero bleaching episodes during a severe regional marine heatwave, whereas inhabited neighboring islands suffered catastrophic bleaching. The research team concluded that local artisanal fishing and terrestrial agricultural runoff on inhabited islands impair coral thermal resilience.",
      questionPrompt: "Which of the following, if true, most strongly STRENGTHENS the researchers' conclusion?",
      options: [
        {
          label: "A",
          text: "Uninhabited atolls possessed identical water temperatures and solar radiation levels to the inhabited islands throughout the heatwave.",
          distractorReason: "Correct Answer.",
        },
        {
          label: "B",
          text: "Artisanal fishermen on the inhabited islands primarily catch reef sharks and large groupers using handlines.",
          distractorReason: "Specific fishing gear details that do not speak to thermal bleaching resilience.",
        },
        {
          label: "C",
          text: "Coral bleaching was first identified by French naturalists in the Indian Ocean in the nineteenth century.",
          distractorReason: "Completely irrelevant historical trivia.",
        },
        {
          label: "D",
          text: "Agricultural runoff contains high levels of nitrates that are known to stimulate the growth of terrestrial pineapples.",
          distractorReason: "Terrestrial farming details that fail to link runoff to marine thermal resilience.",
        },
      ],
      correctAnswer: "A",
      explanation: {
        detailed:
          "The researchers concluded that local human factors (fishing and runoff) caused the bleaching on inhabited islands. A major rival explanation would be that the uninhabited islands simply experienced less severe heat or solar radiation. By proving that water temperatures and solar levels were identical, Option A acts as an essential control, ruling out temperature differences and strengthening the conclusion that local human pressure made the difference.",
        correctReason:
          "Option A provides a critical control: it rules out the alternative explanation that uninhabited atolls simply enjoyed cooler water temperatures.",
        optionsBreakdown: [
          {
            label: "A",
            isCorrect: true,
            analysis: "Directly strengthens the causal link by confirming that environmental heat stress was identical across both groups.",
          },
          {
            label: "B",
            isCorrect: false,
            analysis: "Descriptive detail about fishing methods without addressing coral bleaching mechanisms.",
          },
          {
            label: "C",
            isCorrect: false,
            analysis: "Irrelevant historical background.",
          },
          {
            label: "D",
            isCorrect: false,
            analysis: "Focuses on terrestrial pineapples rather than marine calcification.",
          },
        ],
        catTip: "The most powerful way to strengthen a comparative scientific argument is to establish a strict control: showing that baseline conditions were identical.",
        commonTrap: "Picking an option that describes how sad coral bleaching is rather than providing evidential support.",
      },
    },
    practiceCount: 15,
  },
  {
    id: "weaken",
    section: "RC",
    title: "Weaken the Argument",
    shortDesc: "Isolate causal gaps, unearth unstated assumptions, and introduce confounding alternative explanations.",
    catWeightage: "High",
    averageQuestionsInCAT: "2–3 Questions across 4 passages",
    whatIsIt:
      "To Weaken an argument in CAT is to identify an empirical counter-fact, alternative causal pathway, or hidden flaw that diminishes the plausibility of the author's conclusion. It does NOT require proving the conclusion is 100% false; it merely requires casting serious, legitimate doubt on the reasoning bridge.",
    whyCatTests:
      "CAT evaluates intellectual skepticism: can you spot when an author mistakes correlation for causation, assumes an unrepresentative sample, or overlooks an obvious alternative explanation?",
    howToIdentify: [
      "Phrased as: 'Which of the following, if true, would most seriously undermine/weaken the author's argument?'",
      "Contains the phrase 'IF TRUE'—meaning external facts are permitted.",
      "The correct option usually introduces an overlooked variable that accounts for the observed data.",
    ],
    stepByStepMethod: [
      {
        step: 1,
        title: "Map Premises to Conclusion",
        instruction: "Write down: Premise [X happened] &rarr; Author's Conclusion [Therefore, Y caused X].",
      },
      {
        step: 2,
        title: "Brainstorm Alternative Explanations (Z)",
        instruction: "Ask: 'Could variable Z have caused X instead of Y?'",
      },
      {
        step: 3,
        title: "Scan Options for the Confounding Variable",
        instruction: "Look for the answer choice that demonstrates variable Z was at play.",
      },
      {
        step: 4,
        title: "Verify Reversal or Disconnection",
        instruction: "Confirm that if the option is true, the author's conclusion is substantially compromised.",
      },
    ],
    commonTraps: [
      {
        trapName: "The Direct Denial Trap",
        description: "An option that merely screams 'the author is wrong!' without providing an alternative mechanism or counter-evidence.",
        howToAvoid: "A valid weakener provides substantive alternative evidence, not naked contradiction.",
      },
      {
        trapName: "The Accidental Strengthener",
        description: "Selecting an option that actually supports the author's logic because it harmonizes with the text's theme.",
        howToAvoid: "Always ask: does this choice make the author's conclusion LESS likely?",
      },
    ],
    workedExample: {
      paragraph:
        "Field observations across Western protected reserves demonstrate that reintroducing apex predators like the gray wolf invariably triggers an ecological cascade that revitalizes riparian biodiversity. Within five years of wolf reintroduction in Riverdale Valley, willow and aspen stands along riverbanks rebounded threefold, leading directly to a dramatic surge in songbird nesting density and beaver colony stabilization. The research team concluded that apex carnivores restore river ecosystems by directly suppressing ungulate herbivore populations.",
      questionPrompt: "Which of the following, if true, would most seriously WEAKEN the researchers' conclusion regarding the mechanism behind the riparian restoration?",
      options: [
        {
          label: "A",
          text: "Beaver dam engineering creates deep aquatic pools that prevent catastrophic seasonal erosion along high-velocity streams.",
          distractorReason: "Merely elaborates on downstream benefits; does not challenge the wolf-ungulate causal link.",
        },
        {
          label: "B",
          text: "Throughout the five-year period, unprecedented regional rainfall raised the riparian water table, stimulating deciduous tree growth independent of herbivore grazing pressure.",
          distractorReason: "Correct Answer.",
        },
        {
          label: "C",
          text: "Wolf packs in Riverdale Valley occasionally preyed on small rodents in addition to their primary diet of elk and deer.",
          distractorReason: "Irrelevant dietary detail that leaves the ungulate suppression thesis untouched.",
        },
        {
          label: "D",
          text: "Neighboring valleys with no wolf presence experienced continuing depletion of willow and aspen groves.",
          distractorReason: "This actually STRENGTHENS the conclusion by serving as a positive control group.",
        },
      ],
      correctAnswer: "B",
      explanation: {
        detailed:
          "The researchers observed tree growth and concluded that the cause was wolves suppressing ungulates. To weaken this, we must introduce an alternative causal explanation for the tree rebound.",
        correctReason:
          "Option B introduces a powerful confounding variable: regional rainfall raised the water table, driving tree regrowth regardless of ungulate grazing, directly undermining the claim that wolves caused the recovery.",
        optionsBreakdown: [
          {
            label: "A",
            isCorrect: false,
            analysis: "Supports downstream ecological effects without addressing the causal mechanism of tree rebound.",
          },
          {
            label: "B",
            isCorrect: true,
            analysis: "Provides a compelling alternative explanation (rainfall/water table surge) that accounts for the observed vegetation recovery.",
          },
          {
            label: "C",
            isCorrect: false,
            analysis: "Minor detail about rodent consumption that leaves the ungulate suppression thesis untouched.",
          },
          {
            label: "D",
            isCorrect: false,
            analysis: "Acts as a positive control that actually reinforces the researchers' thesis.",
          },
        ],
        catTip: "The most robust way to weaken a causal argument in CAT is to identify an overlooked confounding variable that explains the observed outcome.",
        commonTrap: "Choosing an option (like D) that strengthens the argument because it sounds logically harmonious with the passage.",
      },
    },
    practiceCount: 15,
  },
  {
    id: "contextual-vocab",
    section: "RC",
    title: "Contextual Vocabulary & Semantic Nuance",
    shortDesc: "Infer precise contextual definitions based on surrounding syntactic and ideological cues.",
    catWeightage: "Medium",
    averageQuestionsInCAT: "1–2 Questions across 4 passages",
    whatIsIt:
      "Contextual Vocabulary questions in CAT do NOT test obscure dictionary definitions. Instead, they test polysemy: how everyday words take on specialized philosophical, aesthetic, or analytical meanings based on their contextual environment.",
    whyCatTests:
      "CAT evaluates cognitive flexibility and semantic precision: whether a student relies on rote memorization or can dynamically read context clues, contrasts, and tone to ascertain functional meaning.",
    howToIdentify: [
      "Phrased as: 'The word X as used in paragraph 3 most nearly means...', 'In the context of the sentence, the author's use of Y denotes...'",
      "Target words are often common words deployed in an atypical or philosophically rigorous manner (e.g., 'plasticity', 'economy', 'vulgar', 'pedestrian').",
    ],
    stepByStepMethod: [
      {
        step: 1,
        title: "Block Out the Target Word",
        instruction: "Mentally erase the target word from the sentence and replace it with a blank [ _____ ].",
      },
      {
        step: 2,
        title: "Analyze Syntactic & Logical Context",
        instruction: "Inspect the adjacent clauses: is there a parallel construction ('and'), an antithesis ('unlike X'), or an explanatory elaboration ('namely')?",
      },
      {
        step: 3,
        title: "Insert Your Own Plain English Placeholder",
        instruction: "Formulate your own intuitive word that restores coherence to the sentence before looking at the options.",
      },
      {
        step: 4,
        title: "Eliminate Primary Dictionary Meanings That Clang in Context",
        instruction: "Distractor choices almost always feature the most common dictionary definition of the word, which makes nonsense of the specialized passage context.",
      },
    ],
    commonTraps: [
      {
        trapName: "The Default Lexical Definition Trap",
        description: "Selecting what the word usually means in conversational speech (e.g., interpreting 'arresting' as 'handcuffing' rather than 'compelling/captivating').",
        howToAvoid: "Always substitute the candidate option back into the original sentence to verify semantic coherence.",
      },
      {
        trapName: "Synonym Match Without Tonal Fit",
        description: "Choosing a synonym that has the right basic definition but violates the register (e.g., formal scholarly critique vs. informal slang).",
        howToAvoid: "Check that the connotation matches the author's level of formality.",
      },
      {
        trapName: "Confusing Related Secondary Meanings",
        description: "Choosing an alternate technical definition from a different academic discipline (e.g., economic 'liquidity' vs. chemical 'fluidity').",
        howToAvoid: "Ensure the discipline of the answer matches the essay's domain.",
      },
    ],
    workedExample: {
      paragraph:
        "The novelist's prose exhibits an austere economy that eschews decorative ornamentation. Where lesser writers deploy cascades of baroque adjectives to manufacture pathos, her sentences operate with architectural severity, allowing silence between clauses to convey the immense weight of historical bereavement.",
      questionPrompt: "As employed in the passage, the word 'economy' most nearly denotes:",
      options: [
        {
          label: "A",
          text: "The financial system of production, distribution, and consumption of goods.",
          distractorReason: "Literal economic definition; completely irrelevant to literary stylistics.",
        },
        {
          label: "B",
          text: "Restrained and purposeful parsimony in the artistic utilization of language.",
          distractorReason: "Correct Answer.",
        },
        {
          label: "C",
          text: "Inability to afford standard typographical printing techniques.",
          distractorReason: "Absurd literal interpretation regarding monetary poverty.",
        },
        {
          label: "D",
          text: "Commercial viability and bestseller sales potential in literary publishing.",
          distractorReason: "Conflates artistic discipline with book sales figures.",
        },
      ],
      correctAnswer: "B",
      explanation: {
        detailed:
          "The author pairs 'austere economy' with 'eschews decorative ornamentation' and contrasts it with 'cascades of baroque adjectives'. In literary criticism, 'economy' denotes minimalism, restraint, and the elimination of superfluous words.",
        correctReason:
          "Option B perfectly captures the stylistic meaning: 'restrained and purposeful parsimony' in using linguistic resources.",
        optionsBreakdown: [
          {
            label: "A",
            isCorrect: false,
            analysis: "The primary commercial definition of economy, which is totally unsuited to textual analysis.",
          },
          {
            label: "B",
            isCorrect: true,
            analysis: "Accurately conveys stylistic discipline, concision, and deliberate restraint in prose craft.",
          },
          {
            label: "C",
            isCorrect: false,
            analysis: "Crude literal reading mistaking artistic choice for financial penury.",
          },
          {
            label: "D",
            isCorrect: false,
            analysis: "Mistakes aesthetic technique for commercial marketplace performance.",
          },
        ],
        catTip: "Words like 'economy', 'plastic', 'sensibility', 'currency', and 'gravity' appear frequently in humanities CAT passages with specialized literary meanings.",
        commonTrap: "Instinctively picking option A because it defines how the word is used in 90% of daily newspapers.",
      },
    },
    practiceCount: 15,
  },
  {
    id: "logical-conclusions",
    section: "RC",
    title: "Logical Conclusions & Extensions",
    shortDesc: "Determine the inescapable culmination of an ideological sequence or practical application.",
    catWeightage: "High",
    averageQuestionsInCAT: "2–3 Questions across 4 passages",
    whatIsIt:
      "Logical Conclusion questions require identifying the terminal deduction of an argument or extending the author's analytical framework to evaluate a novel, hypothetical real-world scenario not mentioned in the passage.",
    whyCatTests:
      "CAT assesses predictive and conceptual transference: can you take an abstract philosophical principle and accurately anticipate how the author would analyze a fresh case study?",
    howToIdentify: [
      "Phrased as: 'Which of the following represents the most logical conclusion to the passage?', 'Based on the author's criteria, how would they evaluate the following recent policy?'",
      "Demands applying the author's internal rubric consistently to new facts.",
    ],
    stepByStepMethod: [
      {
        step: 1,
        title: "Formulate the Author's Core Decision Rule",
        instruction: "Extract the underlying normative standard or evaluation metric established by the author.",
      },
      {
        step: 2,
        title: "Test the Hypothetical Against the Rule",
        instruction: "Check if the novel scenario satisfies or breaches the author's explicit conditions.",
      },
      {
        step: 3,
        title: "Maintain Strict Consistency of Perspective",
        instruction: "Do not let your personal moral or political opinion about the scenario contaminate the author's established logic.",
      },
      {
        step: 4,
        title: "Reject Conclusions Requiring Additional Unstated Assumptions",
        instruction: "The valid conclusion must flow directly from the established framework without needing outside premises.",
      },
    ],
    commonTraps: [
      {
        trapName: "The Wishful Thinking Trap",
        description: "Selecting a conclusion that represents a morally uplifting or idealistic outcome when the author's argument was grimly realistic.",
        howToAvoid: "Maintain fidelity to the author's diagnostic realism; do not supply an unearned happy ending.",
      },
      {
        trapName: "Inverting the Evaluation Metric",
        description: "Applying a positive evaluation to an entity that possesses the exact traits the author previously criticized.",
        howToAvoid: "Verify that the qualities condemned in paragraph 2 are condemned equally in the new scenario.",
      },
    ],
    workedExample: {
      paragraph:
        "The tragedy of modern meritocracy lies in its corrosive psychological corollary: when success is attributed exclusively to individual talent and effort, failure is inevitably pathologized as personal deficiency. Unlike aristocratic feudalism, which offered the consolation that one's lowly station was an accident of birth, the meritocratic ethos strips the disenfranchised of their dignity, convincing them that their socio-economic precarity is a direct reflection of their own moral and intellectual inadequacy.",
      questionPrompt: "Following the author's logic, which of the following represents the most coherent conclusion regarding contemporary social unrest in meritocratic societies?",
      options: [
        {
          label: "A",
          text: "Social unrest is driven primarily by material absolute poverty rather than perceived humiliation or systemic loss of dignity.",
          distractorReason: "Contradicts the author's focus on psychological dignity and moral pathologization over mere raw economics.",
        },
        {
          label: "B",
          text: "Populist backlashes against meritocratic elites stem not merely from economic inequality, but from the deep resentment of being judged unworthy by prevailing institutions.",
          distractorReason: "Correct Answer.",
        },
        {
          label: "C",
          text: "Societies should abolish all competitive examinations and return to heredity-based feudal governance models.",
          distractorReason: "Absurd literal regression; the author uses feudalism for contrast, not as a practical policy recommendation.",
        },
        {
          label: "D",
          text: "Individuals from humble backgrounds in meritocracies enjoy significantly higher self-esteem than their historical aristocratic counterparts.",
          distractorReason: "Direct factual reversal; the passage argues meritocracy damages their dignity far more severely.",
        },
      ],
      correctAnswer: "B",
      explanation: {
        detailed:
          "The author's premise is that meritocracy psychologically wounds the unsuccessful by framing failure as personal inadequacy rather than bad luck. The logical extension to social unrest is that resentment against meritocratic systems is fueled by this humiliation of being deemed individually unworthy.",
        correctReason:
          "Option B directly extends the author's thesis regarding psychological dignity and pathologization to explain populist unrest.",
        optionsBreakdown: [
          {
            label: "A",
            isCorrect: false,
            analysis: "Directly rejects the author's core thesis regarding the psychological trauma of meritocratic judgment.",
          },
          {
            label: "B",
            isCorrect: true,
            analysis: "A flawless conceptual extension linking the author's analysis of stripped dignity to societal backlash.",
          },
          {
            label: "C",
            isCorrect: false,
            analysis: "Conflates analytical comparison with an absurd political prescription to return to medieval feudalism.",
          },
          {
            label: "D",
            isCorrect: false,
            analysis: "Directly contradicts the stated thesis that meritocracy strips the disadvantaged of self-worth.",
          },
        ],
        catTip: "Logical extension questions test whether you can recognize how an author's micro-claim about human psychology generates macro-consequences for society.",
        commonTrap: "Choosing options that propose radical policy reversals that the author never advocated.",
      },
    },
    practiceCount: 15,
  },

  // ==========================================
  // VERBAL ABILITY CONCEPTS (4)
  // ==========================================
  {
    id: "para-jumbles",
    section: "VA",
    title: "Para-Jumbles & Paragraph Reconstruction",
    shortDesc: "Sequence scrambled sentences into an airtight, logically coherent narrative (TITA / MCQ).",
    catWeightage: "Very High",
    averageQuestionsInCAT: "3–4 Questions in CAT VA",
    whatIsIt:
      "Para-Jumbles test your ability to synthesize 4–5 scrambled sentences into a singular, logically progressing paragraph. In CAT, these are predominantly TITA (Type In The Answer), meaning there are no answer choices to guess from. There is mathematically only ONE sequence that exhibits logical continuity, referential integrity, and conceptual progression.",
    whyCatTests:
      "CAT evaluates discourse coherence: can you detect discourse markers, pronoun antecedents, chronology, cause-and-effect transitions, and the classic General-to-Specific explanatory hierarchy?",
    howToIdentify: [
      "Opening Sentence: Self-contained, introduces broad subject matter without abrupt unresolved pronouns ('these', 'such', 'this') or continuation conjunctions ('furthermore', 'nevertheless').",
      "Mandatory Pairs: Sentences that MUST be contiguous due to: Noun &rarr; Pronoun, Full Name &rarr; Surname, Acronym expansion &rarr; Acronym, Problem &rarr; Solution, Cause &rarr; Consequence.",
      "Closing Sentence: Provides conceptual resolution, climactic synthesis, or summarizes the implications.",
    ],
    stepByStepMethod: [
      {
        step: 1,
        title: "Identify the Independent Opener",
        instruction: "Scan for the sentence that establishes the broad conceptual umbrella and introduces key entities without relying on backward references.",
      },
      {
        step: 2,
        title: "Lock Mandatory Sentence Pairs",
        instruction: "Identify pairs linked by pronouns (e.g., '1 mentions John Locke; 3 refers to this English philosopher'), contrast transitions ('However', 'On the other hand'), or chronological markers.",
      },
      {
        step: 3,
        title: "Arrange Pairs Along General-to-Specific Vector",
        instruction: "Order the narrative: Broader Principle &rarr; Specific Mechanism &rarr; Empirical Example / Qualification &rarr; Implication.",
      },
      {
        step: 4,
        title: "Read the Entire Sequence End-to-End",
        instruction: "Perform a final coherence check: does the paragraph flow smoothly without cognitive jolts or dangling thoughts?",
      },
    ],
    commonTraps: [
      {
        trapName: "The False Opener Trap",
        description: "Picking a sentence that looks broad, but contains a subtle backward demonstrative pronoun like 'this revolution' or 'these transformations'.",
        howToAvoid: "Check every single noun phrase in your proposed opener: has it already been introduced, or is it genuinely standalone?",
      },
      {
        trapName: "Pair Inversion (Reversing Cause and Effect)",
        description: "Placing the consequence before the triggering cause, or placing the pronoun sentence before the noun sentence.",
        howToAvoid: "Verify that entity introduction strictly precedes entity description.",
      },
      {
        trapName: "Floating Examples",
        description: "Placing an illustrative example before the theoretical principle it was authored to demonstrate.",
        howToAvoid: "Examples ('For instance', 'Take the case of') must immediately follow the general claim.",
      },
    ],
    workedExample: {
      paragraph: "Assemble the sentences into a coherent paragraph.",
      questionPrompt: "Arrange sentences 1-4 in the most logical sequence:",
      options: [
        {
          label: "A",
          text: "3-1-4-2",
          distractorReason: "Correct Answer.",
        },
        {
          label: "B",
          text: "1-3-4-2",
          distractorReason: "Fails because Sentence 1 uses 'This cognitive bias', which requires an antecedent established in Sentence 3.",
        },
        {
          label: "C",
          text: "3-4-1-2",
          distractorReason: "Separates the mandatory pair 3-1, leaving 'This cognitive bias' stranded after empirical observations.",
        },
        {
          label: "D",
          text: "4-2-3-1",
          distractorReason: "Opens with specific financial market behavior before establishing the psychological phenomenon.",
        },
      ],
      correctAnswer: "3-1-4-2",
      explanation: {
        detailed:
          "Sentence 3 introduces the broad cognitive phenomenon (the human tendency to equate past performance with future certainty). Sentence 1 directly refers back to it with 'This cognitive bias...'. Sentence 4 moves from theory to the specific domain of financial markets ('Nowhere is this more evident than in retail equity investments'). Sentence 2 concludes with the empirical consequence ('Consequently, novice traders systematically overpay during late-cycle asset bubbles').",
        correctReason:
          "3 is the only self-contained opener; 3-1 forms a mandatory Noun-Pronoun pair; 4 introduces the investment domain; 2 provides the logical consequence ('Consequently...'). Valid sequence: 3-1-4-2.",
        optionsBreakdown: [
          {
            label: "A",
            isCorrect: true,
            analysis: "Flawless progression: Concept Definition (3) &rarr; Conceptual Elaboration (1) &rarr; Domain Contextualization (4) &rarr; Terminal Consequence (2).",
          },
          {
            label: "B",
            isCorrect: false,
            analysis: "Cannot open with 1 because 'This cognitive bias' has no prior referent.",
          },
          {
            label: "C",
            isCorrect: false,
            analysis: "Breaks the mandatory semantic bridge between 3 and 1.",
          },
          {
            label: "D",
            isCorrect: false,
            analysis: "Inverts the general-to-specific explanatory order.",
          },
        ],
        catTip: "Whenever you spot a demonstrative adjective phrase ('This bias', 'Such policies', 'These anomalies'), look for the sentence that defines that noun.",
        commonTrap: "Assuming that a sentence starting with 'Consequently' can never be part of a question—it is frequently the ideal anchor for the closing sentence.",
      },
    },
    practiceCount: 20,
  },
  {
    id: "para-summary",
    section: "VA",
    title: "Paragraph Summary & Core Distillation",
    shortDesc: "Isolate the non-negotiable core argument of a dense passage while filtering out distractors.",
    catWeightage: "Very High",
    averageQuestionsInCAT: "3–4 Questions in CAT VA",
    whatIsIt:
      "Paragraph Summary questions present a compact, intellectually dense passage of 80–120 words. Your objective is to select the single option among four choices that completely, accurately, and without distortion captures the essence and scope of the author's argument.",
    whyCatTests:
      "CAT evaluates executive distillation: can you separate core premises and authorial conclusions from background examples, while guarding against subtle shifts in tone or unwarranted additions?",
    howToIdentify: [
      "A valid summary MUST contain all indispensable legs of the argument: the Problem/Premise + the Mechanism + the Conclusion.",
      "If an option captures only 2 of the 3 legs, it is INCOMPLETE.",
      "If an option alters the author's degree of certainty (e.g., from 'might correlate' to 'definitely causes'), it is a DISTORTION.",
    ],
    stepByStepMethod: [
      {
        step: 1,
        title: "Draft Your Own 1-Sentence Summary",
        instruction: "Read the paragraph and write down: [X leads to Y, but Z prevents W]. Do this BEFORE reading the options to prevent bias.",
      },
      {
        step: 2,
        title: "Conduct an Element Audit on Options",
        instruction: "Break each option into its component claims and cross-check against your drafted core elements.",
      },
      {
        step: 3,
        title: "Eliminate by Four Classic Flaw Categories",
        instruction: "Look for: (1) Incomplete / Too Narrow; (2) Distorted Stance; (3) Out of Scope / External Generalization; (4) Minor Detail Focus.",
      },
      {
        step: 4,
        title: "Confirm Inclusivity and Scope",
        instruction: "The correct option will often sound slightly dry or understated, precisely because it adheres rigorously to the text's factual boundaries.",
      },
    ],
    commonTraps: [
      {
        trapName: "The Alluring Addition (Out-of-Scope Fact)",
        description: "An option that summarizes the paragraph accurately, but tacks on a highly sensible, real-world conclusion that the text never actually stated.",
        howToAvoid: "If a clause cannot be anchored to a specific sentence in the stimulus, the option is disqualified.",
      },
      {
        trapName: "The Precision Swap (Distortion)",
        description: "Swapping 'often' with 'always', or replacing 'a contributing factor' with 'the sole underlying cause'.",
        howToAvoid: "Scrutinize adverbs of frequency and causality in every option.",
      },
      {
        trapName: "The Illustrative Detail Trap",
        description: "An option that highlights the vivid example used in line 4 rather than the general principle the example illustrates.",
        howToAvoid: "Examples support summaries; they are almost never the summary itself.",
      },
    ],
    workedExample: {
      paragraph:
        "Urban planning orthodoxy has long championed high-density transit corridors as the sovereign remedy for carbon emissions, arguing that compact living inherently reduces automobile reliance. However, recent lifecycle assessments reveal that the carbon intensity of constructing and maintaining subterranean rail networks, combined with the embodied emissions of steel and concrete in high-rise towers, frequently offsets the operational energy savings of dense living. True decarbonization therefore requires evaluating spatial density in tandem with structural material footprints rather than blindly pursuing density as an ecological cure-all.",
      questionPrompt: "Which of the following options best summarizes the main argument of the paragraph?",
      options: [
        {
          label: "A",
          text: "High-density urban living has completely failed to curb automobile dependency and should be abandoned by municipal authorities.",
          distractorReason: "Extreme overstatement; the text does not say compact living failed to reduce car use, but that structural emissions offset energy gains.",
        },
        {
          label: "B",
          text: "Because the embodied emissions of high-rise materials can offset operational energy gains, urban decarbonization must evaluate density alongside material lifecycle footprints rather than assuming density alone is green.",
          distractorReason: "Correct Answer.",
        },
        {
          label: "C",
          text: "Subterranean rail construction generates more carbon emissions than all private automobile travel combined.",
          distractorReason: "Unsubstantiated quantitative comparison nowhere found in the paragraph.",
        },
        {
          label: "D",
          text: "Urban planners must immediately mandate timber architecture across all metropolitan transit corridors.",
          distractorReason: "Introduces external prescriptive policy (timber architecture) not mentioned in the text.",
        },
      ],
      correctAnswer: "B",
      explanation: {
        detailed:
          "The paragraph notes the traditional belief (density solves emissions), reveals a crucial countervailing fact (lifecycle and embodied emissions of concrete/tunnels offset operational savings), and delivers the conclusion (decarbonization must assess density alongside material footprints).",
        correctReason:
          "Option B seamlessly integrates all three essential pillars without adding outside theories or exaggerating the author's measured verdict.",
        optionsBreakdown: [
          {
            label: "A",
            isCorrect: false,
            analysis: "Distorts the author's critique into a wholesale rejection of urban planning.",
          },
          {
            label: "B",
            isCorrect: true,
            analysis: "Accurate, balanced, and exhaustive distillation of the premise, counterbalance, and conclusion.",
          },
          {
            label: "C",
            isCorrect: false,
            analysis: "Manufactures an exaggerated empirical claim not in the text.",
          },
          {
            label: "D",
            isCorrect: false,
            analysis: "Imports an extraneous recommendation not present in the stimulus.",
          },
        ],
        catTip: "The correct summary in CAT often mirrors the structure: [While X is assumed to do Y, Z complicates it, so we must consider W].",
        commonTrap: "Rejecting Option B because it is long—do not confuse length with inaccuracy; accuracy requires representing all essential components.",
      },
    },
    practiceCount: 20,
  },
  {
    id: "odd-one-out",
    section: "VA",
    title: "Odd Sentence Out & Coherence Breakers",
    shortDesc: "Detect the subtle thematic misfit among 5 academic sentences where 4 form a coherent paragraph.",
    catWeightage: "High",
    averageQuestionsInCAT: "2–3 Questions in CAT VA",
    whatIsIt:
      "Odd One Out presents 5 sentences. Four of them assemble into an intellectually sound, contiguous paragraph. One sentence does not fit. Crucially, in CAT, the odd sentence is NOT a bizarre sentence about cooking in an essay about quantum physics. It is on the EXACT SAME general subject matter, but differs in scope, tone, sub-theme, or level of abstraction.",
    whyCatTests:
      "CAT evaluates structural discernment: the ability to see that while a sentence discusses the same broad topic, it disrupts the narrative progression, addresses an incompatible audience, or assumes a divergent focus.",
    howToIdentify: [
      "Assemble the 4 remaining sentences into an explicit, contiguous sequence.",
      "Check for Scope Mismatches: 4 sentences analyze theoretical ethics; the odd one discusses corporate compliance laws.",
      "Check for Vector Shifts: 4 sentences trace a historical timeline from 1900 to 1950; the odd one makes a speculative prediction about 2050.",
      "Check for Cause/Mechanism vs. Broad Commentary: 4 sentences explain how a virus mutates; the odd one laments government healthcare budgets.",
    ],
    stepByStepMethod: [
      {
        step: 1,
        title: "Identify the Shared Micro-Theme",
        instruction: "Do not settle for a broad tag like 'Economics'. Narrow it to: 'The relationship between interest rate hikes and sovereign debt distress in middle-income nations.'",
      },
      {
        step: 2,
        title: "Find the Inseparable Links",
        instruction: "Identify pairs of sentences that must belong together based on shared terminology or logical sequence.",
      },
      {
        step: 3,
        title: "Isolate the Sentence That Cannot Be Integrated",
        instruction: "Identify the sentence that cannot be placed before, between, or after the four integrated sentences without breaking the logical chain.",
      },
      {
        step: 4,
        title: "Confirm the Coherence of the Surviving Sequence",
        instruction: "Verify that the remaining 4 sentences form a flawless paragraph on their own.",
      },
    ],
    commonTraps: [
      {
        trapName: "The Keyword Decoy",
        description: "Assuming a sentence must belong because it repeats the passage's most prominent keyword 3 times.",
        howToAvoid: "Keywords do not equal structural coherence; check what the sentence is *doing* with that keyword.",
      },
      {
        trapName: "Picking the Most Complex Sentence",
        description: "Eliminating a difficult or dense sentence simply because it is hard to parse, when in fact it serves as the crucial thesis statement.",
        howToAvoid: "Read for functional connection, not for ease of reading.",
      },
    ],
    workedExample: {
      paragraph: "Identify the sentence that does not logically fit with the remaining four sentences.",
      questionPrompt: "Select the odd sentence among 1–5:",
      options: [
        {
          label: "A",
          text: "1",
          distractorReason: "Forms part of the coherent sequence (Sentence 1 introduces the psychological mechanism of cognitive dissonance).",
        },
        {
          label: "B",
          text: "2",
          distractorReason: "Forms part of the coherent sequence (Sentence 2 explains how individuals rationalize contradictory behaviors).",
        },
        {
          label: "C",
          text: "4",
          distractorReason: "Correct Answer (Odd Sentence).",
        },
        {
          label: "D",
          text: "5",
          distractorReason: "Forms part of the coherent sequence (Sentence 5 provides the concluding clinical resolution).",
        },
      ],
      correctAnswer: "4",
      explanation: {
        detailed:
          "Sentences 1, 2, 3, and 5 form a cohesive psychological examination of Festinger's cognitive dissonance theory and individual rationalization strategies. Sentence 4, while sharing terms like 'belief' and 'behavior', shifts to a sociology critique of consumer advertising regulations, disrupting the clinical psychological narrative.",
        correctReason:
          "Sentence 4 breaks the internal focus on cognitive dissonance by suddenly pivoting to macro-economic advertising ethics. The remaining sequence (1-3-2-5) forms an airtight psychological progression.",
        optionsBreakdown: [
          {
            label: "A",
            isCorrect: false,
            analysis: "Essential introductory sentence establishing cognitive dissonance.",
          },
          {
            label: "B",
            isCorrect: false,
            analysis: "Natural elaboration demonstrating rationalization mechanisms.",
          },
          {
            label: "C",
            isCorrect: true,
            analysis: "The odd sentence out: introduces regulatory corporate advertising, diverging from cognitive psychology.",
          },
          {
            label: "D",
            isCorrect: false,
            analysis: "Integral terminal sentence completing the psychological model.",
          },
        ],
        catTip: "Notice sudden shifts in level of analysis: moving from micro-individual cognitive psychology to macro-societal marketing regulation is a classic CAT odd-sentence tell.",
        commonTrap: "Thinking sentence 4 belongs because it uses the word 'cognitive'—always trace the overarching conceptual boundary.",
      },
    },
    practiceCount: 20,
  },
  {
    id: "sentence-completion",
    section: "VA",
    title: "Paragraph & Sentence Completion",
    shortDesc: "Complete an incomplete paragraph with the single sentence that provides logical and tonal culmination.",
    catWeightage: "High",
    averageQuestionsInCAT: "2–3 Questions in CAT VA",
    whatIsIt:
      "Paragraph Completion presents a paragraph ending with a blank [ _____ ]. Your task is to select the concluding sentence that fulfills the author's line of thought, respects the established tonal register, and delivers the appropriate analytical climax without drifting off into unrelated territory.",
    whyCatTests:
      "CAT evaluates anticipatory reading: can you follow an author's intellectual momentum and predict the exact conceptual destination toward which their argument is heading?",
    howToIdentify: [
      "Check the penultimate sentence: what question does it leave unanswered?",
      "Verify the logical connector preceding the blank: 'Consequently', 'In this sense', 'Paradoxically, then', or 'On the contrary'.",
      "Ensure the missing sentence does not open a brand new line of inquiry that requires another 3 paragraphs to explain.",
    ],
    stepByStepMethod: [
      {
        step: 1,
        title: "Track the Narrative Vector",
        instruction: "Is the paragraph building toward a synthesis, introducing a paradox, providing an explanatory caveat, or stating an imperative?",
      },
      {
        step: 2,
        title: "Check Scope and Dimension",
        instruction: "The concluding sentence should wrap up the existing argument, not launch a fresh inquiry into a new topic.",
      },
      {
        step: 3,
        title: "Scrutinize Tonal Congruence",
        instruction: "If the paragraph is detached, analytical, and measured, eliminate options that conclude with preachy, emotional, or hyperbolic language.",
      },
      {
        step: 4,
        title: "Execute the Seamless Transition Test",
        instruction: "Read the entire paragraph with your chosen sentence inserted at the end. It should feel like an organic landing.",
      },
    ],
    commonTraps: [
      {
        trapName: "The New Horizon Trap (Premature Expansion)",
        description: "Choosing a sentence that sounds profound, but introduces a totally new concept that the paragraph never laid the groundwork for.",
        howToAvoid: "A conclusion must close the current loop, not start a new thread.",
      },
      {
        trapName: "The Redundant Echo",
        description: "Selecting a sentence that merely repeats the first sentence word-for-word without adding the expected inferential culmination.",
        howToAvoid: "Good conclusions synthesize the cumulative journey of the paragraph rather than merely looping back.",
      },
      {
        trapName: "The Moralizing Leap",
        description: "Ending an objective scientific or economic explanation with a pious sermon about human goodness or ethical duty.",
        howToAvoid: "Ensure the author made moral claims earlier before selecting a moral conclusion.",
      },
    ],
    workedExample: {
      paragraph:
        "Historically, the canonization of literature was conducted by cultural arbiters who privileged texts embodying universalized human virtues. Yet, post-structuralist critiques dismantled this illusion of neutrality, demonstrating that canonical prestige systematically reflected the ideological preoccupations and class dominance of the arbiters themselves. Rather than an innocent repository of transcendent aesthetic excellence, the traditional literary canon was revealed to be a contested ideological battleground. [ _____ ]",
      questionPrompt: "Which of the following best completes the paragraph?",
      options: [
        {
          label: "A",
          text: "Consequently, the study of literature must be immediately expunged from modern university curricula.",
          distractorReason: "Absurdly extreme prescription not supported by post-structuralist critique.",
        },
        {
          label: "B",
          text: "Hence, exclusion from the canon was as much an exercise in socio-political boundary policing as it was a judgment of aesthetic merit.",
          distractorReason: "Correct Answer.",
        },
        {
          label: "C",
          text: "William Shakespeare and John Milton were conscious political propagandists who wrote solely to oppress the proletariat.",
          distractorReason: "Crude, vulgarized ad hominem overreach targeting specific authors.",
        },
        {
          label: "D",
          text: "Traditional book publishing companies in London and New York have seen substantial declines in physical paper sales.",
          distractorReason: "Irrelevant modern commercial detail completely decoupled from literary theory.",
        },
      ],
      correctAnswer: "B",
      explanation: {
        detailed:
          "The paragraph argues that literary canonization was not neutral aesthetic appreciation, but rather an ideological battleground reflecting power and class. The organic culmination must explain what canonization or exclusion ultimately represents under this framework.",
        correctReason:
          "Option B synthesizes the entire argument: if the canon is an ideological battleground, then exclusion from it is an act of political boundary policing, matching both the tone and thesis perfectly.",
        optionsBreakdown: [
          {
            label: "A",
            isCorrect: false,
            analysis: "Extreme, destructive hyperbole ('expunged from modern university curricula').",
          },
          {
            label: "B",
            isCorrect: true,
            analysis: "A flawless theoretical landing: directly culminates the argument that canonization is political boundary work.",
          },
          {
            label: "C",
            isCorrect: false,
            analysis: "Caricatures nuanced literary critique into a crude conspiratorial attack on individual poets.",
          },
          {
            label: "D",
            isCorrect: false,
            analysis: "Shifts from cultural historiography to mundane commercial book sales.",
          },
        ],
        catTip: "In sentence completion, look for the choice that captures the logical payoff of the author's critique without jumping into radical activism.",
        commonTrap: "Choosing options that exaggerate the critique into calls for total destruction of the field.",
      },
    },
    practiceCount: 20,
  },
];
