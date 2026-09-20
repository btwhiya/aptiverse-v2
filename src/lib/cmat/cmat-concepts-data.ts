import { CMATConceptGuide } from "./types";

export const CMAT_CONCEPT_GUIDES: CMATConceptGuide[] = [
  // =========================================================================
  // 1. GENERAL AWARENESS — CURRENT AFFAIRS
  // =========================================================================
  {
    id: "cmat-concept-ca-01",
    number: 1,
    title: "National & International Current Affairs",
    section: "General Awareness",
    topic: "Current Affairs",
    subtopicCategory: "Bilateral Summits & Multilateral Organizations",
    whatIsIt:
      "National and international current affairs encompass the key diplomatic, political, socioeconomic, and appointments milestones shaping India and global governance over the preceding 6 to 12 months.",
    simpleExplanation:
      "CMAT Current Affairs tests prominent national events, international summits (G20, BRICS, SCO, ASEAN, UN), major appointments, and government developments occurring over the preceding 6 to 12 months. Focus is on factual recognition of presiding leaders, host cities, and bilateral agreements.",
    example:
      "If India hosts a summit in New Delhi or inaugurates a major strategic maritime corridor with the Middle East and Europe (IMEC), CMAT questions will directly test the participating member nations, acronyms, and nodal ministries.",
    importantFacts: [
      "CMAT questions emphasize official designations and host cities rather than analytical policy debates.",
      "Major multilateral groupings: G20 (includes African Union), BRICS (expanded members), SCO, and Quad.",
      "High-frequency areas: Chief Guest at Republic Day, Nobel Laureates, Bharat Ratna recipients, and new constitutional officeholders."
    ],
    quickCheckQuestion: {
      question: "The African Union was officially inducted as a permanent member into which international forum during India's presidency?",
      options: [
        { label: "A", text: "G7" },
        { label: "B", text: "G20" },
        { label: "C", text: "OECD" },
        { label: "D", text: "APEC" }
      ],
      correctAnswer: "B",
      explanation: "Under India's 2023 G20 Presidency at the New Delhi Summit, the 55-nation African Union was formally inducted as a permanent member of the G20."
    },
    cmatLevelPractice: {
      question: "Which Indian institution serves as the nodal policy think tank for monitoring the implementation of the Sustainable Development Goals (SDGs) across Indian states?",
      options: [
        { label: "A", text: "Finance Commission of India" },
        { label: "B", text: "NITI Aayog" },
        { label: "C", text: "Reserve Bank of India" },
        { label: "D", text: "National Development Council" }
      ],
      correctAnswer: "B",
      explanation: "NITI Aayog publishes the annual SDG India Index, tracking the progress of States and Union Territories on social, economic, and environmental parameters."
    },
    cmatPerspective:
      "CMAT allocates 20 questions to General Awareness (+4/-1). Around 7-8 questions are purely current affairs from the last 9-12 months. Speed is high: answer factual questions in 20-30 seconds.",
    commonMistakes: [
      "Confusing bilateral exercises (e.g. Malabar, Varuna, Surya Kiran) with trade agreements.",
      "Relying on outdated cabinet portfolios after recent reshuffles."
    ],
    revisionTips: [
      "Maintain a monthly timeline of top appointments, international summits, and sports champions.",
      "Review the past 6 months of PIB (Press Information Bureau) releases."
    ],
    cmatChallenge:
      "A multilateral summit signs a tripartite memorandum on critical supply-chain resilient minerals between India, Japan, and Australia. Identify whether this falls under the Quad Critical Tech initiative or the Supply Chain Resilience Initiative (SCRI).",
    lastVerified: "2026-03-01"
  },

  // =========================================================================
  // 2. GENERAL AWARENESS — STATIC GK: INDIAN CONSTITUTION & POLITY
  // =========================================================================
  {
    id: "cmat-concept-polity-02",
    number: 2,
    title: "Indian Polity & Constitutional Framework",
    section: "General Awareness",
    topic: "Static GK",
    subtopicCategory: "Constitutional Articles & Democratic Institutions",
    whatIsIt:
      "The constitutional and institutional framework governing India's sovereign, socialist, secular, democratic republic, including the separation of powers between the legislature, executive, and judiciary.",
    simpleExplanation:
      "Static Polity in CMAT covers the architecture of the Indian Constitution: Preamble keywords, Fundamental Rights (Articles 12-35), Directive Principles (DPSP), emergency provisions, the President, Supreme Court, Election Commission, and constitutional amendments.",
    example:
      "Understanding Article 21 (Right to Life and Personal Liberty) and how the 42nd Amendment added 'Socialist, Secular, and Integrity' to the Preamble.",
    importantFacts: [
      "The Constitution of India was adopted on 26th November 1949 and came into effect on 26th January 1950.",
      "Dr. B.R. Ambedkar was the Chairman of the Drafting Committee; Dr. Rajendra Prasad was President of the Constituent Assembly.",
      "Fundamental Rights are enforceable by courts under Article 32 (Supreme Court) and Article 226 (High Courts)."
    ],
    quickCheckQuestion: {
      question: "Which Article of the Indian Constitution is referred to as the 'Heart and Soul of the Constitution' by Dr. B.R. Ambedkar?",
      options: [
        { label: "A", text: "Article 14 (Equality before law)" },
        { label: "B", text: "Article 19 (Freedom of speech)" },
        { label: "C", text: "Article 21 (Protection of life)" },
        { label: "D", text: "Article 32 (Right to Constitutional Remedies)" }
      ],
      correctAnswer: "D",
      explanation: "Dr. Ambedkar termed Article 32 the 'Heart and Soul' because it empowers citizens to directly petition the Supreme Court for enforcement of Fundamental Rights via writs."
    },
    cmatLevelPractice: {
      question: "Under the Indian Constitution, the power to initiate a Money Bill resides exclusively in which legislative body?",
      options: [
        { label: "A", text: "Rajya Sabha" },
        { label: "B", text: "Lok Sabha" },
        { label: "C", text: "Joint Sitting of Parliament" },
        { label: "D", text: "NITI Aayog" }
      ],
      correctAnswer: "B",
      explanation: "Under Article 109, a Money Bill can only be introduced in the Lok Sabha with the prior recommendation of the President. Rajya Sabha can only make recommendations within 14 days."
    },
    cmatPerspective:
      "Polity questions in CMAT are direct and recall-based. Memorizing Articles 1 to 51A, emergency articles (352, 356, 360), and key amendments guarantees full marks in this segment.",
    commonMistakes: [
      "Thinking Rajya Sabha can reject a Money Bill (it can only delay it by up to 14 days).",
      "Confusing Fundamental Rights (justiciable) with Directive Principles (non-justiciable)."
    ],
    revisionTips: [
      "Review the 12 Schedules of the Constitution and the 6 Fundamental Rights.",
      "Recall the tenure and appointment authorities for CAG, Election Commissioners, and UPSC members."
    ],
    cmatChallenge:
      "During a national emergency proclaimed under Article 352, which Fundamental Rights guaranteed under the Constitution can never be suspended by the President? (Articles 20 and 21).",
    lastVerified: "2026-03-01"
  },

  // =========================================================================
  // 3. GENERAL AWARENESS — STATIC GK: INDIAN GEOGRAPHY & INSTITUTIONS
  // =========================================================================
  {
    id: "cmat-concept-geo-03",
    number: 3,
    title: "Indian Geography, Biosphere Reserves & National Institutions",
    section: "General Awareness",
    topic: "Static GK",
    subtopicCategory: "River Basins, National Parks & Research Bodies",
    whatIsIt:
      "The physical, economic, and regional geography of India along with its ecological biodiversity sanctuaries, biosphere reserves, and premier public scientific institutions.",
    simpleExplanation:
      "CMAT regularly tests major river systems (Himalayan vs Peninsular), national parks and biosphere reserves (Kaziranga, Jim Corbett, Sundarbans, Gir), and headquarters of prominent national organizations (ISRO, DRDO, RBI, SEBI, BARC).",
    example:
      "Knowing that Jim Corbett National Park in Uttarakhand is India's oldest national park (established in 1936 as Hailey National Park) and that ISRO is headquartered in Bengaluru.",
    importantFacts: [
      "Peninsular rivers flowing west into the Arabian Sea: Narmada and Tapi (they form estuaries, not deltas).",
      "Tropic of Cancer (23.5° N) passes through 8 Indian states: Gujarat, Rajasthan, MP, Chhattisgarh, Jharkhand, West Bengal, Tripura, Mizoram.",
      "Largest freshwater lake in India: Wular Lake (J&K); Largest brackish water lagoon: Chilika Lake (Odisha)."
    ],
    quickCheckQuestion: {
      question: "Which of the following rivers originates near Amarkantak plateau in Madhya Pradesh and flows westward between the Vindhya and Satpura ranges?",
      options: [
        { label: "A", text: "Godavari" },
        { label: "B", text: "Narmada" },
        { label: "C", text: "Mahanadi" },
        { label: "D", text: "Krishna" }
      ],
      correctAnswer: "B",
      explanation: "The Narmada river originates from the Amarkantak plateau and flows westward through a rift valley between the Vindhya and Satpura ranges into the Gulf of Khambhat."
    },
    cmatLevelPractice: {
      question: "Kaziranga National Park, renowned as the global stronghold of the Great One-Horned Rhinoceros, is located in which Indian state?",
      options: [
        { label: "A", text: "West Bengal" },
        { label: "B", text: "Assam" },
        { label: "C", text: "Arunachal Pradesh" },
        { label: "D", text: "Meghalaya" }
      ],
      correctAnswer: "B",
      explanation: "Kaziranga National Park is situated in the Golaghat and Nagaon districts of Assam and is a UNESCO World Heritage site hosting two-thirds of the world's one-horned rhinos."
    },
    cmatPerspective:
      "Geography and institutional headquarters questions are easy scoring opportunities. A high-yield table of national parks, dams, and research laboratories saves test time.",
    commonMistakes: [
      "Confusing rivers that form deltas (Ganga, Godavari) with rift valley rivers forming estuaries (Narmada, Tapi).",
      "Mixing up state locations of major Tiger Reserves."
    ],
    revisionTips: [
      "Memorize the 8 states through which the Tropic of Cancer passes.",
      "Review the list of Ramsar wetland sites and UNESCO cultural/natural heritage sites in India."
    ],
    cmatChallenge:
      "Identify the unique biogeographical zone of Loktak Lake in Manipur, famous for the Keibul Lamjao National Park—the only floating national park in the world.",
    lastVerified: "2026-03-01"
  },

  // =========================================================================
  // 4. GENERAL AWARENESS — ECONOMY & BANKING BASICS
  // =========================================================================
  {
    id: "cmat-concept-econ-04",
    number: 4,
    title: "Indian Economy, Banking & Monetary Policy",
    section: "General Awareness",
    topic: "Economy",
    subtopicCategory: "Monetary Tools, Inflation & Fiscal Indicators",
    whatIsIt:
      "The macroeconomic foundations of monetary management, national income estimation, public finance, banking regulation, and taxation regimes in the Indian economy.",
    simpleExplanation:
      "Economy questions in CMAT divide into Conceptual Macroeconomics (Monetary Policy, Fiscal Deficit, Inflation indices, GDP/GVA) and Banking Structure (CRR, SLR, Repo Rate, Reverse Repo, MSF, Commercial Banks, NBFCs, Small Finance Banks).",
    example:
      "When inflation rises above the 6% upper tolerance limit, the RBI increases the Policy Repo Rate to curb excess money supply and dampen demand-pull price pressures.",
    importantFacts: [
      "Repo Rate: The rate at which commercial banks borrow short-term liquidity from the RBI against government securities.",
      "CRR (Cash Reserve Ratio): Percentage of net demand and time liabilities (NDTL) that banks must keep in cash with the RBI; no interest is earned on CRR.",
      "SLR (Statutory Liquidity Ratio): Percentage of NDTL that banks must maintain in liquid assets (gold, cash, approved government securities).",
      "Monetary Policy Committee (MPC): 6 members (3 from RBI including the Governor who holds casting vote, and 3 external members nominated by the Government)."
    ],
    quickCheckQuestion: {
      question: "What is the primary statutory target band for Consumer Price Index (CPI) inflation set for the RBI Monetary Policy Committee?",
      options: [
        { label: "A", text: "2% with a tolerance band of +/- 1%" },
        { label: "B", text: "4% with a tolerance band of +/- 2%" },
        { label: "C", text: "5% with a tolerance band of +/- 3%" },
        { label: "D", text: "6% fixed rate" }
      ],
      correctAnswer: "B",
      explanation: "Under the flexible inflation targeting framework, the statutory target is 4% CPI inflation within a tolerance band of 2% to 6% (4% +/- 2%)."
    },
    cmatLevelPractice: {
      question: "Which parameter is defined as the excess of the government's total expenditure over its total non-borrowed receipts, indicating total borrowing requirements?",
      options: [
        { label: "A", text: "Revenue Deficit" },
        { label: "B", text: "Fiscal Deficit" },
        { label: "C", text: "Primary Deficit" },
        { label: "D", text: "Trade Deficit" }
      ],
      correctAnswer: "B",
      explanation: "Fiscal Deficit represents the total net borrowing requirement of the government from all sources: Total Expenditure minus Total Non-Debt Receipts."
    },
    cmatPerspective:
      "CMAT frequently asks definitions of financial metrics: Fiscal Deficit vs Primary Deficit (Fiscal Deficit minus Interest Payments), GDP vs GNP, and quantitative RBI credit control tools.",
    commonMistakes: [
      "Assuming CRR earns interest for commercial banks (CRR earns zero interest).",
      "Confusing Repo Rate (banks borrow from RBI) with Reverse Repo Rate (RBI absorbs funds from banks)."
    ],
    revisionTips: [
      "Memorize formulas: Primary Deficit = Fiscal Deficit - Interest Payments.",
      "Review current Union Budget highlights: capital expenditure (Capex), tax slabs, and disinvestment targets."
    ],
    cmatChallenge:
      "If the Consumer Price Index shows an annualized inflation rate of 6.8%, calculate whether the RBI's policy repo rate stance is likely to tighten or ease under the statutory inflation framework.",
    lastVerified: "2026-03-01"
  },

  // =========================================================================
  // 5. INNOVATION & ENTREPRENEURSHIP — FUNDAMENTALS
  // =========================================================================
  {
    id: "cmat-concept-ie-fund-05",
    number: 5,
    title: "Entrepreneurship Foundations & Startup Lifecycle",
    section: "Innovation & Entrepreneurship",
    topic: "Innovation & Entrepreneurship",
    subtopicCategory: "Fundamentals",
    whatIsIt:
      "The mindset, operational framework, and methodologies required to identify market friction, assemble resources, design scalable value propositions, and navigate the startup lifecycle.",
    simpleExplanation:
      "Entrepreneurship is the process of identifying an unfulfilled market need, assembling resources, assuming financial and operational risk, and building a scalable venture. Key CMAT concepts include Intrapreneur vs Entrepreneur, Startup definition, Business Model Canvas (BMC), Minimum Viable Product (MVP), and Product-Market Fit (PMF).",
    example:
      "An entrepreneur leaves an established firm to launch a new fintech venture with personal risk, whereas an intrapreneur innovates from within an existing enterprise (like Sony engineer Ken Kutaragi inventing the PlayStation within Sony).",
    importantFacts: [
      "Intrapreneur: An employee within an established corporation who champions innovation and product development with corporate capital backing.",
      "MVP (Minimum Viable Product): The version of a new product that allows a team to collect the maximum amount of validated learning about customers with the least effort.",
      "Product-Market Fit (PMF): The milestone where a startup's product satisfies a strong market demand and customers readily buy, use, and recommend it.",
      "Pivot: A structured course correction designed to test a new fundamental hypothesis about the product, business model, or engine of growth."
    ],
    quickCheckQuestion: {
      question: "What term describes an employee within an established corporation who acts like an entrepreneur, driving innovative projects using corporate resources?",
      options: [
        { label: "A", text: "Angel Investor" },
        { label: "B", text: "Intrapreneur" },
        { label: "C", text: "Technocrat" },
        { label: "D", text: "Venture Partner" }
      ],
      correctAnswer: "B",
      explanation: "An intrapreneur exercises entrepreneurial skills, innovation, and leadership inside an existing enterprise without personal financial equity exposure."
    },
    cmatLevelPractice: {
      question: "In Eric Ries' Lean Startup methodology, what is the primary purpose of developing a Minimum Viable Product (MVP)?",
      options: [
        { label: "A", text: "To maximize first-quarter commercial revenue" },
        { label: "B", text: "To test core business hypotheses with validated customer learning while expending minimal resources" },
        { label: "C", text: "To secure an immediate Initial Public Offering (IPO)" },
        { label: "D", text: "To eliminate the need for future product iterations" }
      ],
      correctAnswer: "B",
      explanation: "The MVP is built to begin the Build-Measure-Learn feedback loop quickly, testing critical assumptions with the least engineering effort."
    },
    cmatPerspective:
      "Innovation & Entrepreneurship is a mandatory 20-question section (+4/-1) in CMAT. Mastering basic startup terminology, stages, and definitions yields an instant 70+ marks out of 80.",
    commonMistakes: [
      "Confusing a prototype (technical demonstration) with an MVP (validated learning with real end-users).",
      "Assuming all small businesses are startups (startups are specifically designed for rapid, scalable growth)."
    ],
    revisionTips: [
      "Memorize the 9 building blocks of Alexander Osterwalder's Business Model Canvas (Value Prop, Channels, Revenue Streams, etc.).",
      "Review the stages: Ideation -> Validation -> MVP -> PMF -> Scale-up."
    ],
    cmatChallenge:
      "A SaaS startup notices user acquisition is high but 70% churn after 30 days. Identify whether the team should scale marketing spend or pivot their core product-market fit value proposition.",
    lastVerified: "2026-03-01"
  },

  // =========================================================================
  // 6. INNOVATION & ENTREPRENEURSHIP — GOVERNMENT INITIATIVES
  // =========================================================================
  {
    id: "cmat-concept-ie-govt-06",
    number: 6,
    title: "Government Policies, Startup India & Atal Innovation Mission",
    section: "Innovation & Entrepreneurship",
    topic: "Innovation & Entrepreneurship",
    subtopicCategory: "Government Initiatives",
    whatIsIt:
      "Statutory policies, funding frameworks, and innovation incubators launched by the Government of India to empower domestic entrepreneurs and foster industrial competitiveness.",
    simpleExplanation:
      "The Government of India has instituted dedicated programs to foster entrepreneurial ecosystems. CMAT heavily tests official schemes: Startup India Action Plan, DPIIT recognition, Section 80-IAC tax exemptions, Atal Innovation Mission (AIM), Atal Tinkering Labs (ATL), Mudra Yojana, and MSME classification.",
    example:
      "Under DPIIT guidelines, an entity is recognized as a startup for up to 10 years from its incorporation date if turnover has not exceeded INR 100 Crore in any financial year.",
    importantFacts: [
      "Startup India: Launched on 16th January 2016 by the Prime Minister; nodal body is DPIIT (Ministry of Commerce and Industry).",
      "DPIIT Startup Definition: Incorporated as Private Limited, LLP, or Registered Partnership; up to 10 years old; turnover under INR 100 Crore; working toward innovation, development, or improvement of products/services.",
      "Atal Innovation Mission (AIM): Nodal body is NITI Aayog; establishes Atal Tinkering Labs (schools) and Atal Incubation Centres (AICs) for universities.",
      "Mudra Yojana: 3 categories of micro-loans: Shishu (up to Rs 50,000), Kishore (Rs 50,000 to Rs 5 Lakh), Tarun (Rs 5 Lakh to Rs 10 Lakh, expandable up to Rs 20 Lakh)."
    ],
    schemeDetails: {
      schemeName: "Startup India Action Plan",
      launchDate: "16 January 2016",
      purpose: "Building a strong ecosystem for nurturing innovation and driving sustainable economic growth",
      implementingBody: "DPIIT, Ministry of Commerce & Industry",
      currentStatus: "Active (Over 120,000 recognized startups)",
      lastVerified: "2026-03-01"
    },
    quickCheckQuestion: {
      question: "According to the Department for Promotion of Industry and Internal Trade (DPIIT), what is the maximum annual turnover limit for an entity to maintain its recognized 'Startup' status?",
      options: [
        { label: "A", text: "INR 25 Crore" },
        { label: "B", text: "INR 50 Crore" },
        { label: "C", text: "INR 100 Crore" },
        { label: "D", text: "INR 250 Crore" }
      ],
      correctAnswer: "C",
      explanation: "An entity remains recognized as a startup up to 10 years from incorporation provided its annual turnover does not exceed INR 100 Crore in any preceding financial year."
    },
    cmatLevelPractice: {
      question: "Which flagship initiative under NITI Aayog is specifically tasked with creating a world-class innovation ecosystem in India by setting up Atal Tinkering Labs and Atal Incubation Centres?",
      options: [
        { label: "A", text: "Stand-Up India" },
        { label: "B", text: "Atal Innovation Mission (AIM)" },
        { label: "C", text: "PMKVY" },
        { label: "D", text: "Digital India" }
      ],
      correctAnswer: "B",
      explanation: "Atal Innovation Mission (AIM), housed within NITI Aayog, establishes community ATLs in schools and world-class AICs in universities and research hubs."
    },
    cmatPerspective:
      "Government policy questions in CMAT are factual. Always verify launch year, implementing ministry, and financial thresholds.",
    commonMistakes: [
      "Confusing the nodal ministry for Startup India (Ministry of Commerce & Industry / DPIIT) with Ministry of Skill Development.",
      "Mixing up the loan categories of Mudra Yojana (Shishu, Kishore, Tarun)."
    ],
    revisionTips: [
      "Review the MSME revised composite criteria: Micro (<1 Cr investment, <5 Cr turnover), Small (<10 Cr investment, <50 Cr turnover), Medium (<50 Cr investment, <250 Cr turnover).",
      "Remember National Startup Day is celebrated on January 16th."
    ],
    cmatChallenge:
      "Verify the eligibility criteria for a registered partnership firm seeking tax exemptions under Section 80-IAC of the Income Tax Act under DPIIT recognition guidelines.",
    lastVerified: "2026-03-01"
  },

  // =========================================================================
  // 7. INNOVATION & ENTREPRENEURSHIP — BUSINESS ACUMEN & VENTURE CAPITAL
  // =========================================================================
  {
    id: "cmat-concept-ie-vc-07",
    number: 7,
    title: "Venture Financing, Valuation & Business Acumen",
    section: "Innovation & Entrepreneurship",
    topic: "Innovation & Entrepreneurship",
    subtopicCategory: "Business Acumen",
    whatIsIt:
      "The financial mechanisms, valuation models, equity structures, and investor relations through which high-growth startups secure risk capital from angels and venture capital funds.",
    simpleExplanation:
      "Business Acumen covers how ventures raise capital, price equity, and structure corporate transactions: Bootstrapping (self-funding), Angel Investors (HNIs using personal wealth), Venture Capital (institutional funds investing pooled capital), Funding Rounds (Pre-seed, Seed, Series A, B, C), Term Sheets, Valuation (Pre-money vs Post-money), and Exit mechanisms (M&A, IPO).",
    example:
      "If a startup has a pre-money valuation of $8 Million and raises $2 Million in new equity from a VC firm, its post-money valuation becomes $10 Million, and the VC owns 20% equity ($2M / $10M).",
    importantFacts: [
      "Bootstrapping: Building a business using personal savings and operational revenues without external institutional equity.",
      "Angel Investor: High-Net-Worth Individual (HNI) providing early-stage seed capital, often in exchange for convertible debt or equity.",
      "Venture Capital (VC): Professional financial intermediaries that manage third-party institutional funds (Limited Partners) to invest in high-growth startups.",
      "Post-Money Valuation = Pre-Money Valuation + New Capital Invested.",
      "Term Sheet: A non-binding agreement setting forth the basic terms and conditions under which an investment will be made (valuation, board seats, liquidation preferences)."
    ],
    quickCheckQuestion: {
      question: "If an investor contributes $3 Million into a startup that had an agreed pre-money valuation of $12 Million, what percentage of the company does the investor own post-investment?",
      options: [
        { label: "A", text: "25%" },
        { label: "B", text: "20%" },
        { label: "C", text: "15%" },
        { label: "D", text: "30%" }
      ],
      correctAnswer: "B",
      explanation: "Post-Money Valuation = Pre-Money ($12M) + New Investment ($3M) = $15 Million. Investor ownership = $3M / $15M = 1/5 = 20%."
    },
    cmatLevelPractice: {
      question: "What term describes the preliminary, non-binding legal document outlining the fundamental investment terms, valuation, voting rights, and liquidation preferences between a venture capitalist and a startup founder?",
      options: [
        { label: "A", text: "Articles of Association" },
        { label: "B", text: "Term Sheet" },
        { label: "C", text: "Promissory Note" },
        { label: "D", text: "Red Herring Prospectus" }
      ],
      correctAnswer: "B",
      explanation: "A Term Sheet is the standard bullet-point agreement summarizing key investment parameters before drafting formal definitive shareholder agreements."
    },
    cmatPerspective:
      "CMAT loves numerical and definitional venture capital questions: pre-money vs post-money math, cap tables, Unicorn valuation ($1 Billion+), Decacorn ($10 Billion+), and seed funding rounds.",
    commonMistakes: [
      "Dividing investment by pre-money valuation instead of post-money valuation when computing investor ownership share.",
      "Confusing Angel Investors (individual capital) with Venture Capitalists (pooled institutional capital)."
    ],
    revisionTips: [
      "Review capitalization table dilution concepts.",
      "Memorize startup status tiers: Minicorn ($1M+), Soonicorn (potential unicorn), Unicorn ($1B+), Decacorn ($10B+), Hectocorn ($100B+)."
    ],
    cmatChallenge:
      "A founder holds 80% equity. The startup secures $2M on a $6M pre-money valuation in Seed, followed by $5M on a $20M pre-money valuation in Series A. Calculate the founder's diluted equity stake post-Series A.",
    lastVerified: "2026-03-01"
  },

  // =========================================================================
  // 8. INNOVATION & ENTREPRENEURSHIP — DESIGN THINKING & REVENUE MODELS
  // =========================================================================
  {
    id: "cmat-concept-ie-design-08",
    number: 8,
    title: "Design Thinking, Revenue Models & Business Terminology",
    section: "Innovation & Entrepreneurship",
    topic: "Innovation & Entrepreneurship",
    subtopicCategory: "Business Acumen",
    whatIsIt:
      "A human-centric, iterative problem-solving methodology coupled with commercial monetization strategies (subscription, freemium, marketplace, transactional) and core corporate valuation metrics.",
    simpleExplanation:
      "Design thinking progresses through 5 stages: Empathize (understand customer pain), Define (frame the problem statement), Ideate (brainstorm diverse solutions), Prototype (create low-cost representations), and Test (gather feedback from real users). Business Acumen also encompasses monetization models: Freemium, SaaS recurring subscriptions, Marketplace commissions, CAC (Customer Acquisition Cost), and LTV (Lifetime Value).",
    example:
      "A platform like Spotify uses a Freemium model (free ad-supported tier converting engaged listeners into paid premium monthly subscriptions).",
    importantFacts: [
      "Design Thinking 5 Stages: Empathize -> Define -> Ideate -> Prototype -> Test.",
      "Unit Economics: CAC must be significantly lower than LTV (ideal LTV:CAC ratio is 3:1 or higher).",
      "Burn Rate: The monthly rate at which a company expends its cash reserves before reaching positive cash flow.",
      "Runway: Total Cash Balance divided by Monthly Net Burn Rate (e.g., $1.2M cash / $100k burn = 12 months runway)."
    ],
    quickCheckQuestion: {
      question: "Which of the following represents the correct sequence of stages in the standard Stanford d.school Design Thinking framework?",
      options: [
        { label: "A", text: "Ideate -> Empathize -> Define -> Prototype -> Test" },
        { label: "B", text: "Empathize -> Define -> Ideate -> Prototype -> Test" },
        { label: "C", text: "Define -> Empathize -> Prototype -> Ideate -> Test" },
        { label: "D", text: "Prototype -> Test -> Empathize -> Define -> Ideate" }
      ],
      correctAnswer: "B",
      explanation: "The standard 5-stage Design Thinking process starts with Empathize, followed by Define, Ideate, Prototype, and Test."
    },
    cmatLevelPractice: {
      question: "If a startup has $1,800,000 in liquid bank reserves and incurs a net monthly operational cash burn of $150,000, what is its available cash runway?",
      options: [
        { label: "A", text: "8 Months" },
        { label: "B", text: "12 Months" },
        { label: "C", text: "15 Months" },
        { label: "D", text: "18 Months" }
      ],
      correctAnswer: "B",
      explanation: "Cash Runway = Total Liquid Reserves / Monthly Net Burn = $1,800,000 / $150,000 = 12 Months."
    },
    cmatPerspective:
      "CMAT tests financial runway calculations, Design Thinking stages, and common business acronyms (CAC, LTV, EBITDA, ARR, MRR).",
    commonMistakes: [
      "Confusing Gross Burn (total monthly expenses) with Net Burn (total expenses minus monthly revenue).",
      "Inverting the order between Ideate and Prototype in Design Thinking."
    ],
    revisionTips: [
      "Know key formulas: Runway = Cash / Net Burn; LTV/CAC ratio benchmark > 3.",
      "Review the difference between B2B, B2C, B2B2C, and D2C business models."
    ],
    cmatChallenge:
      "A consumer health app spends $50 on marketing to acquire each new subscriber. If subscribers pay $10/month with an average retention of 24 months, evaluate whether their unit economics are viable for venture capital backing.",
    lastVerified: "2026-03-01"
  }
];
