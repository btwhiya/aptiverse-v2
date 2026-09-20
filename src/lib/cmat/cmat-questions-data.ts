import {
  CMATQuestion,
  CMATCurrentAffairsQuestion,
  CMATStaticGKQuestion,
  CMATEconomyQuestion,
  CMATInnovationQuestion,
  CMATBaseQuestion
} from "./types";

export const CMAT_QUESTION_BANK: CMATQuestion[] = [
  // =========================================================================
  // 1. GENERAL AWARENESS — CURRENT AFFAIRS
  // =========================================================================
  {
    id: "cmat-ca-01",
    exam: "CMAT",
    section: "General Awareness",
    topic: "Current Affairs",
    subtopic: "Multilateral Summits",
    difficulty: "CMAT_LEVEL",
    category: "International",
    eventDate: "2024-01-01",
    source: "BRICS Official Communique",
    lastVerified: "2026-03-01",
    question: "Which of the following international organizations formally expanded on January 1, 2024, to include new member countries including Egypt, Ethiopia, Iran, and the United Arab Emirates?",
    options: [
      { label: "A", text: "ASEAN" },
      { label: "B", text: "BRICS" },
      { label: "C", text: "OECD" },
      { label: "D", text: "Shanghai Cooperation Organisation" }
    ],
    correctAnswer: "B",
    explanation: "BRICS announced its historic expansion at the Johannesburg Summit, officially admitting Egypt, Ethiopia, Iran, and the UAE into full membership on January 1, 2024.",
    estimatedTimeSec: 30,
    tags: ["Current Affairs", "BRICS", "International Summits"]
  } as CMATCurrentAffairsQuestion,
  {
    id: "cmat-ca-02",
    exam: "CMAT",
    section: "General Awareness",
    topic: "Current Affairs",
    subtopic: "National Honors & Awards",
    difficulty: "FOUNDATION",
    category: "Awards",
    eventDate: "2024-02-09",
    source: "President's Secretariat, Rashtrapati Bhavan",
    lastVerified: "2026-03-01",
    question: "Dr. M.S. Swaminathan, revered as the Father of India's Green Revolution, was posthumously conferred which prestigious civilian award in 2024?",
    options: [
      { label: "A", text: "Padma Vibhushan" },
      { label: "B", text: "Bharat Ratna" },
      { label: "C", text: "Padma Bhushan" },
      { label: "D", text: "Param Vir Chakra" }
    ],
    correctAnswer: "B",
    explanation: "In February 2024, the Government of India announced the Bharat Ratna, the highest civilian award of the Republic of India, posthumously for agricultural scientist Dr. M.S. Swaminathan alongside former Prime Ministers P.V. Narasimha Rao and Chaudhary Charan Singh.",
    estimatedTimeSec: 25,
    tags: ["Current Affairs", "Bharat Ratna", "Awards", "Agriculture"]
  } as CMATCurrentAffairsQuestion,
  {
    id: "cmat-ca-03",
    exam: "CMAT",
    section: "General Awareness",
    topic: "Current Affairs",
    subtopic: "Sports & Championships",
    difficulty: "CMAT_LEVEL",
    category: "Sports",
    eventDate: "2024-06-29",
    source: "International Cricket Council (ICC)",
    lastVerified: "2026-03-01",
    question: "India defeated which country in the final at Bridgetown, Barbados to clinch the ICC Men's T20 World Cup 2024 trophy?",
    options: [
      { label: "A", text: "Australia" },
      { label: "B", text: "South Africa" },
      { label: "C", text: "England" },
      { label: "D", text: "Pakistan" }
    ],
    correctAnswer: "B",
    explanation: "India defeated South Africa by 7 runs in a thrilling final in Barbados to win the ICC Men's T20 World Cup 2024 under the captaincy of Rohit Sharma.",
    estimatedTimeSec: 20,
    tags: ["Current Affairs", "Sports", "Cricket", "ICC T20 World Cup"]
  } as CMATCurrentAffairsQuestion,
  {
    id: "cmat-ca-04",
    exam: "CMAT",
    section: "General Awareness",
    topic: "Current Affairs",
    subtopic: "Space Exploration & Tech",
    difficulty: "CMAT_LEVEL",
    category: "Science & Tech",
    eventDate: "2023-09-02",
    source: "ISRO Mission Center",
    lastVerified: "2026-03-01",
    question: "What is the primary scientific objective of ISRO's solar mission 'Aditya-L1', launched into a halo orbit around the Sun-Earth Lagrange point 1?",
    options: [
      { label: "A", text: "To drill and collect soil samples from Mars" },
      { label: "B", text: "To observe the dynamics of the Sun's chromosphere and corona" },
      { label: "C", text: "To explore water-ice deposits in lunar craters" },
      { label: "D", text: "To measure asteroid orbital deviations near Jupiter" }
    ],
    correctAnswer: "B",
    explanation: "Aditya-L1 is India's first dedicated solar observatory mission placed in a halo orbit around the L1 point (1.5 million km from Earth) to study the Sun's upper atmospheric dynamics (chromosphere and corona) and coronal mass ejections.",
    estimatedTimeSec: 35,
    tags: ["Current Affairs", "ISRO", "Aditya-L1", "Science & Tech"]
  } as CMATCurrentAffairsQuestion,
  {
    id: "cmat-ca-05",
    exam: "CMAT",
    section: "General Awareness",
    topic: "Current Affairs",
    subtopic: "Constitutional & Institutional Appointments",
    difficulty: "FOUNDATION",
    category: "Appointments",
    eventDate: "2024-03-14",
    source: "Ministry of Law and Justice, Gazette of India",
    lastVerified: "2026-03-01",
    question: "Under the Chief Election Commissioner and other Election Commissioners (Appointment, Conditions of Service and Term of Office) Act, who heads the Search Committee that shortlists candidates for the Election Commission of India?",
    options: [
      { label: "A", text: "Chief Justice of India" },
      { label: "B", text: "Union Minister of Law and Justice" },
      { label: "C", text: "Leader of Opposition in Lok Sabha" },
      { label: "D", text: "Cabinet Secretary" }
    ],
    correctAnswer: "B",
    explanation: "Under the new legislation, a Search Committee headed by the Union Minister of Law and Justice prepares a panel of five candidates for consideration by the Selection Committee chaired by the Prime Minister.",
    estimatedTimeSec: 30,
    tags: ["Current Affairs", "Election Commission", "Appointments", "Polity"]
  } as CMATCurrentAffairsQuestion,

  // =========================================================================
  // 2. GENERAL AWARENESS — STATIC GK
  // =========================================================================
  {
    id: "cmat-gk-01",
    exam: "CMAT",
    section: "General Awareness",
    topic: "Static GK",
    subtopic: "Indian History",
    difficulty: "FOUNDATION",
    gkDomain: "History",
    question: "The historic 'Poona Pact' was signed in 1932 between Mahatma Gandhi and which prominent leader regarding separate electorates for depressed classes?",
    options: [
      { label: "A", text: "Jawaharlal Nehru" },
      { label: "B", text: "Dr. B.R. Ambedkar" },
      { label: "C", text: "Subhas Chandra Bose" },
      { label: "D", text: "Sardar Vallabhbhai Patel" }
    ],
    correctAnswer: "B",
    explanation: "The Poona Pact was signed in September 1932 at Yerwada Central Jail in Pune between Dr. B.R. Ambedkar and Mahatma Gandhi (represented by Madan Mohan Malaviya), replacing separate electorates with reserved seats in provincial legislatures.",
    estimatedTimeSec: 25,
    tags: ["Static GK", "Modern History", "Freedom Movement"]
  } as CMATStaticGKQuestion,
  {
    id: "cmat-gk-02",
    exam: "CMAT",
    section: "General Awareness",
    topic: "Static GK",
    subtopic: "Indian Constitution",
    difficulty: "FOUNDATION",
    gkDomain: "Polity & Constitution",
    question: "Under which Article of the Indian Constitution can the President declare a National Emergency on grounds of war, external aggression, or armed rebellion?",
    options: [
      { label: "A", text: "Article 352" },
      { label: "B", text: "Article 356" },
      { label: "C", text: "Article 360" },
      { label: "D", text: "Article 370" }
    ],
    correctAnswer: "A",
    explanation: "Article 352 empowers the President to proclaim a National Emergency. Article 356 deals with President's Rule (State Emergency) and Article 360 with Financial Emergency.",
    estimatedTimeSec: 20,
    tags: ["Static GK", "Constitution", "Emergency Articles"]
  } as CMATStaticGKQuestion,
  {
    id: "cmat-gk-03",
    exam: "CMAT",
    section: "General Awareness",
    topic: "Static GK",
    subtopic: "Indian Geography",
    difficulty: "CMAT_LEVEL",
    gkDomain: "Geography",
    question: "Which Indian state shares international land borders with three foreign nations: Nepal, Bhutan, and China?",
    options: [
      { label: "A", text: "Arunachal Pradesh" },
      { label: "B", text: "Sikkim" },
      { label: "C", text: "Uttarakhand" },
      { label: "D", text: "West Bengal" }
    ],
    correctAnswer: "B",
    explanation: "Sikkim borders Nepal to the west, Bhutan to the east, and China (Tibet Autonomous Region) to the north.",
    estimatedTimeSec: 30,
    tags: ["Static GK", "Geography", "Borders"]
  } as CMATStaticGKQuestion,
  {
    id: "cmat-gk-04",
    exam: "CMAT",
    section: "General Awareness",
    topic: "Static GK",
    subtopic: "National Institutions",
    difficulty: "FOUNDATION",
    gkDomain: "Important Institutions",
    question: "Where is the headquarters of the Securities and Exchange Board of India (SEBI) located?",
    options: [
      { label: "A", text: "New Delhi" },
      { label: "B", text: "Mumbai" },
      { label: "C", text: "Kolkata" },
      { label: "D", text: "Bengaluru" }
    ],
    correctAnswer: "B",
    explanation: "SEBI, the statutory regulator for securities and commodity markets in India, is headquartered in the Bandra-Kurla Complex (BKC) in Mumbai.",
    estimatedTimeSec: 15,
    tags: ["Static GK", "SEBI", "Headquarters"]
  } as CMATStaticGKQuestion,
  {
    id: "cmat-gk-05",
    exam: "CMAT",
    section: "General Awareness",
    topic: "Static GK",
    subtopic: "Culture & Heritage",
    difficulty: "CMAT_LEVEL",
    gkDomain: "Culture & Heritage",
    question: "The classical dance form 'Kathakali', characterized by elaborate facial makeup, colorful costumes, and storytelling gestures, originated in which Indian state?",
    options: [
      { label: "A", text: "Tamil Nadu" },
      { label: "B", text: "Kerala" },
      { label: "C", text: "Andhra Pradesh" },
      { label: "D", text: "Karnataka" }
    ],
    correctAnswer: "B",
    explanation: "Kathakali is a major traditional classical dance-drama originating in Kerala. (Bharatnatyam belongs to Tamil Nadu, Kuchipudi to Andhra Pradesh).",
    estimatedTimeSec: 20,
    tags: ["Static GK", "Classical Dance", "Culture"]
  } as CMATStaticGKQuestion,

  // =========================================================================
  // 3. GENERAL AWARENESS — ECONOMY
  // =========================================================================
  {
    id: "cmat-econ-01",
    exam: "CMAT",
    section: "General Awareness",
    topic: "Economy",
    subtopic: "Monetary Policy & Banking",
    difficulty: "FOUNDATION",
    economyType: "CONCEPTUAL",
    domain: "Banking & RBI",
    question: "What does the term 'Statutory Liquidity Ratio' (SLR) refer to in Indian commercial banking?",
    options: [
      { label: "A", text: "The percentage of cash that banks must maintain physically with the Reserve Bank of India" },
      { label: "B", text: "The percentage of Net Demand and Time Liabilities that commercial banks must maintain in liquid assets such as cash, gold, and approved government securities" },
      { label: "C", text: "The interest rate charged by the RBI for overnight emergency liquidity" },
      { label: "D", text: "The ratio of non-performing assets to total advances" }
    ],
    correctAnswer: "B",
    explanation: "SLR is the statutory requirement under Section 24 of the Banking Regulation Act 1949 requiring banks to maintain a specified percentage of their NDTL in safe, liquid assets (gold, unencumbered government securities, and cash).",
    estimatedTimeSec: 30,
    tags: ["Economy", "Banking", "SLR", "RBI"]
  } as CMATEconomyQuestion,
  {
    id: "cmat-econ-02",
    exam: "CMAT",
    section: "General Awareness",
    topic: "Economy",
    subtopic: "Fiscal Deficit & Budget",
    difficulty: "CMAT_LEVEL",
    economyType: "CONCEPTUAL",
    domain: "Fiscal Policy & Budget",
    question: "Primary Deficit in the Union Budget is calculated as which of the following?",
    options: [
      { label: "A", text: "Fiscal Deficit minus Revenue Deficit" },
      { label: "B", text: "Fiscal Deficit minus Interest Payments" },
      { label: "C", text: "Total Expenditure minus Total Receipts" },
      { label: "D", text: "Revenue Receipts minus Revenue Expenditure" }
    ],
    correctAnswer: "B",
    explanation: "Primary Deficit = Fiscal Deficit minus Interest Payments on past debt. It reveals how much the government's borrowing is dedicated to current administrative/developmental programs versus servicing historical accumulated liabilities.",
    estimatedTimeSec: 25,
    tags: ["Economy", "Fiscal Deficit", "Union Budget"]
  } as CMATEconomyQuestion,
  {
    id: "cmat-econ-03",
    exam: "CMAT",
    section: "General Awareness",
    topic: "Economy",
    subtopic: "Inflation & Price Indices",
    difficulty: "CMAT_LEVEL",
    economyType: "CONCEPTUAL",
    domain: "Inflation & GDP",
    question: "Which index serves as the official headline anchor for monetary policy inflation targeting by the Reserve Bank of India?",
    options: [
      { label: "A", text: "Wholesale Price Index (WPI)" },
      { label: "B", text: "Consumer Price Index - Combined (CPI-C)" },
      { label: "C", text: "Index of Industrial Production (IIP)" },
      { label: "D", text: "GDP Deflator" }
    ],
    correctAnswer: "B",
    explanation: "Following the recommendations of the Urjit Patel Committee in 2014, the RBI officially adopted CPI-Combined (CPI-C, released by NSO) as its nominal anchor for inflation targeting, replacing WPI.",
    estimatedTimeSec: 25,
    tags: ["Economy", "Inflation", "CPI", "RBI"]
  } as CMATEconomyQuestion,
  {
    id: "cmat-econ-04",
    exam: "CMAT",
    section: "General Awareness",
    topic: "Economy",
    subtopic: "Financial Terms & Capital Markets",
    difficulty: "FOUNDATION",
    economyType: "CONCEPTUAL",
    domain: "Financial Markets & Terms",
    question: "What does the term 'Stagflation' describe in macroeconomics?",
    options: [
      { label: "A", text: "High economic growth accompanied by falling price levels" },
      { label: "B", text: "A condition of stagnant economic growth, high unemployment, and persistently high inflation" },
      { label: "C", text: "Rapid deflation driven by technological advancements" },
      { label: "D", text: "A sustained surplus in the balance of payments" }
    ],
    correctAnswer: "B",
    explanation: "Stagflation is the toxic economic combination of stagnation (slow/negative GDP growth and high unemployment) coupled with rising price inflation.",
    estimatedTimeSec: 25,
    tags: ["Economy", "Macroeconomics", "Stagflation"]
  } as CMATEconomyQuestion,

  // =========================================================================
  // 4. INNOVATION & ENTREPRENEURSHIP — FUNDAMENTALS
  // =========================================================================
  {
    id: "cmat-ie-fund-01",
    exam: "CMAT",
    section: "Innovation & Entrepreneurship",
    topic: "Innovation & Entrepreneurship",
    subtopic: "Foundations",
    difficulty: "FOUNDATION",
    category: "Fundamentals",
    keyConcept: "Intrapreneurship",
    question: "What is the key structural distinction between an 'Entrepreneur' and an 'Intrapreneur'?",
    options: [
      { label: "A", text: "An intrapreneur owns 100% of the firm's equity, whereas an entrepreneur has no equity." },
      { label: "B", text: "An entrepreneur takes personal financial and operational risk to build a new venture, while an intrapreneur innovates inside an existing corporation using corporate capital." },
      { label: "C", text: "An intrapreneur operates only in the non-profit sector." },
      { label: "D", text: "An entrepreneur works without employees, whereas an intrapreneur manages a team." }
    ],
    correctAnswer: "B",
    explanation: "Entrepreneurs found independent businesses and bear personal financial risks and rewards. Intrapreneurs apply entrepreneurial innovation inside an established corporate structure with corporate capital backing.",
    estimatedTimeSec: 30,
    tags: ["Innovation & Entrepreneurship", "Intrapreneur", "Fundamentals"]
  } as CMATInnovationQuestion,
  {
    id: "cmat-ie-fund-02",
    exam: "CMAT",
    section: "Innovation & Entrepreneurship",
    topic: "Innovation & Entrepreneurship",
    subtopic: "Lean Startup",
    difficulty: "CMAT_LEVEL",
    category: "Fundamentals",
    keyConcept: "Lean Methodology",
    question: "In the Lean Startup framework pioneered by Eric Ries, what is the core iterative feedback engine that guides startup evolution?",
    options: [
      { label: "A", text: "Forecast - Budget - Audit" },
      { label: "B", text: "Build - Measure - Learn" },
      { label: "C", text: "Design - Manufacture - Distribute" },
      { label: "D", text: "Incorporate - Fundraise - Liquidate" }
    ],
    correctAnswer: "B",
    explanation: "The central thesis of the Lean Startup is the 'Build-Measure-Learn' feedback loop: build a Minimum Viable Product, measure customer behavior with actionable metrics, and learn whether to pivot or persevere.",
    estimatedTimeSec: 25,
    tags: ["Innovation & Entrepreneurship", "Lean Startup", "MVP"]
  } as CMATInnovationQuestion,
  {
    id: "cmat-ie-fund-03",
    exam: "CMAT",
    section: "Innovation & Entrepreneurship",
    topic: "Innovation & Entrepreneurship",
    subtopic: "Business Models",
    difficulty: "CMAT_LEVEL",
    category: "Fundamentals",
    keyConcept: "Product-Market Fit",
    question: "Marc Andreessen famously defined 'Product-Market Fit' (PMF) as which milestone in a startup's journey?",
    options: [
      { label: "A", text: "The day the legal Certificate of Incorporation is issued" },
      { label: "B", text: "Being in a good market with a product that can satisfy that market" },
      { label: "C", text: "Achieving a $1 Billion valuation in a Series D round" },
      { label: "D", text: "Securing a patent grant from the intellectual property registry" }
    ],
    correctAnswer: "B",
    explanation: "Marc Andreessen defined Product-Market Fit as 'being in a good market with a product that can satisfy that market.' Customers pull the product, organic word of mouth spreads, and usage grows faster than capacity.",
    estimatedTimeSec: 30,
    tags: ["Innovation & Entrepreneurship", "Product-Market Fit", "Startups"]
  } as CMATInnovationQuestion,
  {
    id: "cmat-ie-fund-04",
    exam: "CMAT",
    section: "Innovation & Entrepreneurship",
    topic: "Innovation & Entrepreneurship",
    subtopic: "Business Model Canvas",
    difficulty: "FOUNDATION",
    category: "Fundamentals",
    keyConcept: "Business Model Canvas",
    question: "Alexander Osterwalder's popular 'Business Model Canvas' (BMC) synthesizes a venture's architecture into how many core building blocks?",
    options: [
      { label: "A", text: "5 blocks" },
      { label: "B", text: "7 blocks" },
      { label: "C", text: "9 blocks" },
      { label: "D", text: "12 blocks" }
    ],
    correctAnswer: "C",
    explanation: "The Business Model Canvas comprises 9 building blocks: Customer Segments, Value Propositions, Channels, Customer Relationships, Revenue Streams, Key Resources, Key Activities, Key Partnerships, and Cost Structure.",
    estimatedTimeSec: 20,
    tags: ["Innovation & Entrepreneurship", "BMC", "Business Models"]
  } as CMATInnovationQuestion,

  // =========================================================================
  // 5. INNOVATION & ENTREPRENEURSHIP — GOVERNMENT INITIATIVES
  // =========================================================================
  {
    id: "cmat-ie-govt-01",
    exam: "CMAT",
    section: "Innovation & Entrepreneurship",
    topic: "Innovation & Entrepreneurship",
    subtopic: "Startup India Scheme",
    difficulty: "CMAT_LEVEL",
    category: "Government Initiatives",
    keyConcept: "DPIIT Startup Recognition",
    schemeDetails: {
      schemeName: "Startup India Action Plan",
      launchDate: "2016-01-16",
      purpose: "Provide regulatory relief, fast-track patent exams, tax exemptions, and fund of funds.",
      implementingBody: "DPIIT, Ministry of Commerce and Industry",
      currentStatus: "Active",
      source: "DPIIT Official Notification",
      lastVerified: "2026-03-01"
    },
    question: "Under the Startup India program administered by DPIIT, what is the maximum duration an entity can be recognized as a 'Startup' from its date of incorporation?",
    options: [
      { label: "A", text: "5 years" },
      { label: "B", text: "7 years" },
      { label: "C", text: "10 years" },
      { label: "D", text: "15 years" }
    ],
    correctAnswer: "C",
    explanation: "DPIIT guidelines provide that an entity shall be considered a startup up to a period of 10 years from the date of incorporation/registration (provided its turnover does not exceed Rs 100 Crore in any financial year).",
    estimatedTimeSec: 25,
    tags: ["Government Initiatives", "Startup India", "DPIIT"]
  } as CMATInnovationQuestion,
  {
    id: "cmat-ie-govt-02",
    exam: "CMAT",
    section: "Innovation & Entrepreneurship",
    topic: "Innovation & Entrepreneurship",
    subtopic: "Mudra Scheme",
    difficulty: "FOUNDATION",
    category: "Government Initiatives",
    keyConcept: "Pradhan Mantri Mudra Yojana",
    question: "Under the Pradhan Mantri Mudra Yojana (PMMY), loans up to what monetary limit are categorized under the 'Shishu' category for micro-entrepreneurs?",
    options: [
      { label: "A", text: "Up to Rs 50,000" },
      { label: "B", text: "Up to Rs 1,00,000" },
      { label: "C", text: "Up to Rs 2,50,000" },
      { label: "D", text: "Up to Rs 5,00,000" }
    ],
    correctAnswer: "A",
    explanation: "PMMY micro-loans are split into three tiers: Shishu (loans up to Rs 50,000), Kishore (above Rs 50,000 and up to Rs 5 Lakh), and Tarun (above Rs 5 Lakh and up to Rs 10 Lakh / 20 Lakh).",
    estimatedTimeSec: 20,
    tags: ["Government Initiatives", "Mudra Yojana", "Microfinance"]
  } as CMATInnovationQuestion,
  {
    id: "cmat-ie-govt-03",
    exam: "CMAT",
    section: "Innovation & Entrepreneurship",
    topic: "Innovation & Entrepreneurship",
    subtopic: "Atal Innovation Mission",
    difficulty: "CMAT_LEVEL",
    category: "Government Initiatives",
    keyConcept: "Atal Tinkering Labs",
    schemeDetails: {
      schemeName: "Atal Innovation Mission (AIM)",
      launchDate: "2016-04-26",
      purpose: "Promote innovation and entrepreneurship at school, university, and industry levels.",
      implementingBody: "NITI Aayog",
      currentStatus: "Active",
      source: "NITI Aayog Portal",
      lastVerified: "2026-03-01"
    },
    question: "Atal Tinkering Labs (ATLs), designed to cultivate scientific curiosity, IoT, and robotics skills in youth, are established in which institutional setting?",
    options: [
      { label: "A", text: "District Collectorates" },
      { label: "B", text: "Schools across Grade 6 to Grade 12" },
      { label: "C", text: "Commercial Bank branches" },
      { label: "D", text: "Special Economic Zones" }
    ],
    correctAnswer: "B",
    explanation: "Atal Tinkering Labs (ATLs) are established in schools across India for students from Grade 6 to 12 by NITI Aayog to foster 3D printing, robotics, and problem-solving skills.",
    estimatedTimeSec: 25,
    tags: ["Government Initiatives", "AIM", "Atal Tinkering Labs", "NITI Aayog"]
  } as CMATInnovationQuestion,

  // =========================================================================
  // 6. INNOVATION & ENTREPRENEURSHIP — BUSINESS ACUMEN & VENTURE CAPITAL
  // =========================================================================
  {
    id: "cmat-ie-biz-01",
    exam: "CMAT",
    section: "Innovation & Entrepreneurship",
    topic: "Innovation & Entrepreneurship",
    subtopic: "Startup Valuation",
    difficulty: "CMAT_LEVEL",
    category: "Business Acumen",
    keyConcept: "Post-Money Valuation",
    question: "A SaaS startup founder agrees to a pre-money valuation of $16 Million and successfully raises $4 Million in a Series A equity round. What is the startup's post-money valuation, and what equity percentage does the VC investor receive?",
    options: [
      { label: "A", text: "Post-Money: $20M; Investor Equity: 20%" },
      { label: "B", text: "Post-Money: $20M; Investor Equity: 25%" },
      { label: "C", text: "Post-Money: $16M; Investor Equity: 20%" },
      { label: "D", text: "Post-Money: $24M; Investor Equity: 16.6%" }
    ],
    correctAnswer: "A",
    explanation: "Post-Money Valuation = Pre-Money Valuation ($16M) + New Capital Invested ($4M) = $20 Million. Investor Equity % = ($4M / $20M) * 100 = 20%.",
    estimatedTimeSec: 40,
    tags: ["Business Acumen", "Valuation", "Series A", "Venture Capital"]
  } as CMATInnovationQuestion,
  {
    id: "cmat-ie-biz-02",
    exam: "CMAT",
    section: "Innovation & Entrepreneurship",
    topic: "Innovation & Entrepreneurship",
    subtopic: "Angel Investing",
    difficulty: "FOUNDATION",
    category: "Business Acumen",
    keyConcept: "Angel Investors",
    question: "Which of the following best defines an 'Angel Investor' in startup financing?",
    options: [
      { label: "A", text: "A government official who approves intellectual property licenses" },
      { label: "B", text: "A high-net-worth individual who invests their personal capital into early-stage startups in exchange for equity" },
      { label: "C", text: "An investment banker responsible for underwriting initial public offerings" },
      { label: "D", text: "A commercial loan officer sanctioning secured overdraft lines" }
    ],
    correctAnswer: "B",
    explanation: "Angel investors are affluent individuals who inject personal capital (often $25k-$250k+) into very early-stage startups (seed/pre-seed) in return for equity or convertible notes.",
    estimatedTimeSec: 25,
    tags: ["Business Acumen", "Angel Investor", "Seed Capital"]
  } as CMATInnovationQuestion,
  {
    id: "cmat-ie-biz-03",
    exam: "CMAT",
    section: "Innovation & Entrepreneurship",
    topic: "Innovation & Entrepreneurship",
    subtopic: "Startup Terminology",
    difficulty: "FOUNDATION",
    category: "Business Acumen",
    keyConcept: "Unicorn Startup",
    question: "In the global venture capital lexicon, what financial benchmark qualifies a privately held startup to be termed a 'Unicorn'?",
    options: [
      { label: "A", text: "Annual net revenue exceeding $100 Million" },
      { label: "B", text: "Valuation of $1 Billion or more" },
      { label: "C", text: "Having more than 10,000 full-time employees" },
      { label: "D", text: "Profitable operations for five consecutive fiscal quarters" }
    ],
    correctAnswer: "B",
    explanation: "The term 'Unicorn', coined by venture capitalist Aileen Lee in 2013, refers to a privately held startup company valued at over $1 Billion.",
    estimatedTimeSec: 20,
    tags: ["Business Acumen", "Unicorn", "Valuation"]
  } as CMATInnovationQuestion,
  {
    id: "cmat-ie-biz-04",
    exam: "CMAT",
    section: "Innovation & Entrepreneurship",
    topic: "Innovation & Entrepreneurship",
    subtopic: "Legal & Term Sheets",
    difficulty: "CMAT_LEVEL",
    category: "Business Acumen",
    keyConcept: "Cap Table",
    question: "In corporate finance and venture investing, what is a 'Capitalization Table' (Cap Table)?",
    options: [
      { label: "A", text: "A tax spreadsheet tracking annual corporate depreciation" },
      { label: "B", text: "A legal record showing the equity ownership percentages, share classes, and option pool allocation of a company's founders and investors" },
      { label: "C", text: "A schedule of capital expenditures for fixed machinery and office real estate" },
      { label: "D", text: "A register of non-convertible debt debentures issued to retail investors" }
    ],
    correctAnswer: "B",
    explanation: "A Capitalization Table (Cap Table) is the master spreadsheet or legal record detailing who owns what percentage of the company's equity, preferred vs common stock, stock options, and convertible instruments.",
    estimatedTimeSec: 30,
    tags: ["Business Acumen", "Cap Table", "Equity"]
  } as CMATInnovationQuestion
];

// =========================================================================
// PROGRAMMATIC QUESTION VALIDATOR
// =========================================================================

export interface CMATValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateCMATQuestion(q: CMATQuestion): CMATValidationResult {
  const errors: string[] = [];

  if (q.exam !== "CMAT") {
    errors.push(`Exam tag must strictly be 'CMAT', found: ${q.exam}`);
  }

  if (!q.id || q.id.trim() === "") {
    errors.push("Question ID cannot be empty");
  }

  if (!q.question || q.question.trim().length < 10) {
    errors.push("Question text is missing or too short");
  }

  if (!Array.isArray(q.options) || q.options.length !== 4) {
    errors.push(`Question must contain exactly 4 options for CMAT standard format, found: ${q.options?.length || 0}`);
  }

  const validLabels = q.options?.map(o => o.label) || [];
  if (!validLabels.includes(q.correctAnswer)) {
    errors.push(`Correct answer '${q.correctAnswer}' does not match any available option label [${validLabels.join(", ")}]`);
  }

  // Check unique option texts
  if (q.options) {
    const optionTexts = q.options.map(o => o.text.trim().toLowerCase());
    const uniqueTexts = new Set(optionTexts);
    if (uniqueTexts.size !== optionTexts.length) {
      errors.push("Duplicate option texts detected");
    }
  }

  // Topic-specific validations
  if (q.topic === "Current Affairs") {
    const caQ = q as CMATCurrentAffairsQuestion;
    if (!caQ.eventDate || !caQ.source || !caQ.lastVerified) {
      errors.push("Current Affairs questions must include eventDate, source, and lastVerified timestamp");
    }
  }

  if (q.topic === "Innovation & Entrepreneurship") {
    const ieQ = q as CMATInnovationQuestion;
    if (!ieQ.category || !ieQ.keyConcept) {
      errors.push("Innovation & Entrepreneurship questions must specify category and keyConcept");
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
