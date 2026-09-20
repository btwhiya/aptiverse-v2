"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import {
  Clock,
  Lock,
  Calculator,
  Send,
  RotateCcw,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Menu,
  X,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SAMPLE_VERIFIED_QUESTIONS } from "@/lib/seed-data";
import { getAllQuestionBank } from "@/lib/question-engine";
import { formatTimeRemaining } from "@/lib/utils";
import { QuizTimer, type QuizTimerTickData } from "@/components/quiz";
import { QuestionGraphViewer } from "@/components/practice/QuestionGraphViewer";
import {
  ALL_MAH_CET_AR_QUESTIONS,
  FigureRenderer,
  FigureSequence,
  FigureAnalogy,
  FigureMatrix,
  OptionFigure,
} from "@/lib/mah-cet";
import { SNAP_QUESTION_BANK } from "@/lib/snap";

type PaletteStatus =
  | "NOT_VISITED"
  | "SKIPPED"
  | "ANSWERED"
  | "MARKED_FOR_REVIEW"
  | "ANSWERED_AND_MARKED";

interface MockQuestionState {
  selectedOption: string | null;
  paletteStatus: PaletteStatus;
  timeSpentSec: number;
}

export default function MockAttemptSimulatorPage({
  params,
}: {
  params: Promise<{ mockId: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();

  const isXATMock = resolvedParams.mockId.toLowerCase().includes("xat");
  const isXATDMSectional = resolvedParams.mockId.toLowerCase().includes("xat-dm");
  const isMAHCETMock = resolvedParams.mockId.toLowerCase().includes("mah-cet") || resolvedParams.mockId.toLowerCase().includes("mahcet");
  const isMAHCETARSectional = resolvedParams.mockId.toLowerCase().includes("mah-cet-ar");
  const isSNAPMock = resolvedParams.mockId.toLowerCase().includes("snap");
  const isSNAPEthicsSectional = resolvedParams.mockId.toLowerCase().includes("snap-ethics");

  // Mock Sections Configuration
  const sections = isSNAPEthicsSectional
    ? [{ id: "ethics", name: "Ethics, Morality & Values", durationSec: 900, questionCount: 15 }]
    : isSNAPMock
    ? [
        { id: "english", name: "General English", durationSec: 900, questionCount: 15 },
        { id: "alr", name: "Analytical & Logical Reasoning", durationSec: 1500, questionCount: 25 },
        { id: "qadi", name: "Quant, DI & DS", durationSec: 1200, questionCount: 20 },
      ]
    : isMAHCETARSectional
    ? [{ id: "ar", name: "Abstract Reasoning", durationSec: 1200, questionCount: 25 }]
    : isMAHCETMock
    ? [
        { id: "lr", name: "Logical Reasoning", durationSec: 3375, questionCount: 75 },
        { id: "ar", name: "Abstract Reasoning", durationSec: 1125, questionCount: 25 },
        { id: "qa", name: "Quantitative Aptitude", durationSec: 2250, questionCount: 50 },
        { id: "varc", name: "Verbal Ability & RC", durationSec: 2250, questionCount: 50 },
      ]
    : isXATDMSectional
    ? [{ id: "dm", name: "Decision Making", durationSec: 2400, questionCount: 22 }]
    : isXATMock
    ? [
        { id: "valr", name: "VALR", durationSec: 3600, questionCount: 26 },
        { id: "dm", name: "Decision Making", durationSec: 3000, questionCount: 22 },
        { id: "qadi", name: "QA & DI", durationSec: 3600, questionCount: 28 },
        { id: "gk", name: "General Knowledge", durationSec: 1800, questionCount: 25 },
      ]
    : [
        { id: "varc", name: "VARC", durationSec: 2400, questionCount: 24 },
        { id: "dilr", name: "DILR", durationSec: 2400, questionCount: 20 },
        { id: "qa", name: "QA", durationSec: 2400, questionCount: 22 },
      ];

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [calcInput, setCalcInput] = useState("0");
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // Load questions by section with STRICT EXAM ISOLATION
  const allQuestions = getAllQuestionBank();

  // For non-XAT, non-SNAP, non-MAH CET (e.g. CAT), ensure DM, GK, AR, and SNAP Ethics NEVER appear
  const nonXATPool = allQuestions.filter(
    (q) =>
      !q.id.startsWith("xat-") &&
      !q.id.startsWith("mah-") &&
      !q.id.startsWith("snap-") &&
      !q.topicSlug.includes("dm") &&
      !q.topicSlug.includes("decision-making") &&
      !q.topicSlug.includes("gk") &&
      !q.topicSlug.includes("general-knowledge") &&
      !q.topicSlug.includes("abstract") &&
      !q.topicSlug.includes("ethics") &&
      !q.topicSlug.includes("morality")
  );

  const varcQuestions = nonXATPool.filter(
    (q) =>
      q.topicSlug.includes("reading") ||
      q.topicSlug.includes("verbal") ||
      q.topicSlug.includes("varc") ||
      q.topicSlug.includes("para-") ||
      q.topicSlug.includes("odd-one") ||
      q.topicSlug.includes("sentence-completion")
  );
  const dilrQuestions = nonXATPool.filter(
    (q) =>
      q.topicSlug.includes("logical") ||
      q.topicSlug.includes("data") ||
      q.topicSlug.includes("dilr") ||
      q.topicSlug.includes("arrangements") ||
      q.topicSlug.includes("tournaments") ||
      q.topicSlug.includes("tables-caselets") ||
      q.topicSlug.includes("binary-logic")
  );
  const qaQuestions = nonXATPool.filter(
    (q) =>
      q.topicSlug.includes("arithmetic") ||
      q.topicSlug.includes("algebra") ||
      q.topicSlug.includes("geometry") ||
      q.topicSlug.includes("number") ||
      q.topicSlug.includes("modern") ||
      q.topicSlug.includes("qa") ||
      q.topicSlug.includes("time-") ||
      q.topicSlug.includes("percentages")
  );

  // XAT DM Question Pool
  const xatDMQuestions = [
    {
      id: "xat-dm-m01",
      topicSlug: "decision-making",
      subtopicSlug: "ethical-dilemmas",
      difficulty: "HARD" as const,
      questionType: "MCQ" as const,
      isDemo: false,
      passageText: "A manufacturing company's wastewater discharge meets statutory limits. However, internal research reveals an unlisted synthetic chemical could accumulate in groundwater over 15 years. Remediation now reduces margins by 6%, jeopardizing an overseas expansion.",
      questionText: "What is the most ethically and strategically sound recommendation for the Board of Directors?",
      options: [
        { label: "A", text: "Phase in advanced filtration retrofits over 18 months, transparently disclose groundwater research to environmental regulators, and recalibrate expansion financing." },
        { label: "B", text: "Maintain current discharge levels since they fully comply with statutory municipal requirements, and review only if laws change." },
        { label: "C", text: "Shut down all factory operations immediately and cancel the overseas expansion indefinitely." },
        { label: "D", text: "Lobby municipal authorities to maintain current statutory emission thresholds." },
        { label: "E", text: "Transfer the factory ownership to a shell company to shield against future liability." },
      ],
      correctAnswer: "A",
      estimatedTimeSec: 120,
      source: "XAT Decision Making Mock Bank",
      solution: {
        detailedText: "XAT Decision Making balances long-term ethical stewardship (preventing groundwater toxicity) with pragmatic managerial execution (phased 18-month retrofit rather than impulsive shutdown).",
        stepByStep: ["Proactive ethical remediation protects brand value and prevents catastrophic liability."],
        shortcutMethod: "Ethical stewardship + feasible phased execution.",
        conceptTested: "XAT Decision Making - Environmental Ethics",
        commonMistakeTrap: "Relying strictly on statutory minimums rather than moral duty.",
      },
    },
    {
      id: "xat-dm-m02",
      topicSlug: "decision-making",
      subtopicSlug: "resource-allocation",
      difficulty: "HARD" as const,
      questionType: "MCQ" as const,
      isDemo: false,
      passageText: "A supply chain aggregator faces 65% annual rider attrition and rising accident rates due to punitive delay deductions. A venture-backed rival is poaching drivers with a 20% wage guarantee. The CTO wants autonomous pods (₹75 Cr); Head of Ops wants rider welfare (₹45 Cr). Reserve capital is ₹80 Cr.",
      questionText: "How should the CEO allocate capital to resolve the immediate crisis?",
      options: [
        { label: "A", text: "Commit ₹75 Cr to autonomous pods and announce phased human rider termination." },
        { label: "B", text: "Allocate ₹45 Cr to human fleet stabilization, ₹15 Cr to a controlled autonomous pod pilot, and retain ₹20 Cr liquid reserves." },
        { label: "C", text: "Distribute ₹80 Cr as an unconditional one-time cash bonus to riders without policy changes." },
        { label: "D", text: "Acquire a competitor app to diversify away from e-commerce delivery." },
        { label: "E", text: "File an anti-competitive lawsuit against the rival to halt their recruitment." },
      ],
      correctAnswer: "B",
      estimatedTimeSec: 120,
      source: "XAT Decision Making Mock Bank",
      solution: {
        detailedText: "Option B addresses immediate operational survival by stabilizing the human fleet while prudently exploring autonomy at a safe scale.",
        stepByStep: ["Stabilize core engine first, fund exploratory technology in controlled pilot."],
        shortcutMethod: "Core stabilization > Speculative moonshot.",
        conceptTested: "XAT Decision Making - Capital Prioritization",
        commonMistakeTrap: "Betting the enterprise on unproven robotics in chaotic traffic.",
      },
    },
  ];

  // XAT GK Question Pool
  const xatGKQuestions = [
    {
      id: "xat-gk-m01",
      topicSlug: "general-knowledge",
      subtopicSlug: "constitution-writs",
      difficulty: "MEDIUM" as const,
      questionType: "MCQ" as const,
      isDemo: false,
      questionText: "Under the Constitution of India, which writ is issued by the Supreme Court or High Courts to command a public authority to perform a mandatory statutory duty that they have refused to execute?",
      options: [
        { label: "A", text: "Habeas Corpus" },
        { label: "B", text: "Mandamus" },
        { label: "C", text: "Quo-Warranto" },
        { label: "D", text: "Certiorari" },
        { label: "E", text: "Prohibition" },
      ],
      correctAnswer: "B",
      estimatedTimeSec: 40,
      source: "XAT General Knowledge Bank",
      solution: {
        detailedText: "Mandamus ('We Command') directs a public official or authority to execute an act falling under their mandatory legal duty.",
        stepByStep: ["Article 32 and Article 226 empower courts to issue writs."],
        shortcutMethod: "Mandamus = Command to perform public duty.",
        conceptTested: "Indian Constitution - Fundamental Rights & Writs",
        commonMistakeTrap: "Confusing Mandamus with Quo-Warranto.",
      },
    },
    {
      id: "xat-gk-m02",
      topicSlug: "general-knowledge",
      subtopicSlug: "banking-fintech",
      difficulty: "MEDIUM" as const,
      questionType: "MCQ" as const,
      isDemo: false,
      questionText: "In early 2026, the Reserve Bank of India and NPCI International operationalized real-time cross-border linkage between India's UPI and which Southeast Asian instant payment network?",
      options: [
        { label: "A", text: "Philippines (InstaPay)" },
        { label: "B", text: "Malaysia (DuitNow)" },
        { label: "C", text: "Brunei (FastPay)" },
        { label: "D", text: "Vietnam (Napas)" },
        { label: "E", text: "Cambodia (Bakong)" },
      ],
      correctAnswer: "B",
      estimatedTimeSec: 35,
      source: "XAT Current Affairs Bank",
      solution: {
        detailedText: "India operationalized bilateral real-time remittances between UPI and Malaysia's DuitNow platform, following the Singapore PayNow linkage.",
        stepByStep: ["Enables low-cost P2P cross-border transfers."],
        shortcutMethod: "UPI-DuitNow linkage.",
        conceptTested: "Current Affairs - International Banking & Digital Infrastructure",
        commonMistakeTrap: "Guessing Vietnam or Cambodia instead of Malaysia.",
      },
    },
  ];

  // SNAP Question Pools
  const mapSNAPQuestionToMock = (q: any) => ({
    id: q.id,
    topicSlug: q.topic.toLowerCase().replace(/[^a-z0-9]/g, "-"),
    subtopicSlug: q.subtopic?.toLowerCase().replace(/[^a-z0-9]/g, "-") || "general",
    difficulty: q.difficulty === "FOUNDATION" ? "EASY" : q.difficulty === "SNAP_ADVANCED" ? "HARD" : "MEDIUM",
    questionType: "MCQ" as const,
    isDemo: false,
    passageText: q.passageText || q.scenarioText,
    questionText: q.question,
    options: q.options,
    correctAnswer: q.correctAnswer,
    estimatedTimeSec: q.estimatedTimeSec || 60,
    source: "SNAP 2026 Question Bank",
    solution: {
      detailedText: q.explanation,
      stepByStep: [q.explanation],
      shortcutMethod: q.tags?.join(", ") || "SNAP Speed Method",
      conceptTested: q.topic,
      commonMistakeTrap: q.commonTrap || "Careless reading or timing trap",
    },
  });

  const snapVerbalQuestions = SNAP_QUESTION_BANK.filter(q => q.section === "General English").map(mapSNAPQuestionToMock);
  const snapLRQuestions = SNAP_QUESTION_BANK.filter(q => q.section === "Analytical & Logical Reasoning").map(mapSNAPQuestionToMock);
  const snapQuantDIQuestions = SNAP_QUESTION_BANK.filter(q => q.section === "Quantitative, Data Interpretation & Data Sufficiency").map(mapSNAPQuestionToMock);
  const snapEthicsQuestions = SNAP_QUESTION_BANK.filter(q => q.section === "Ethics, Morality & Values").map(mapSNAPQuestionToMock);

  // Configure sectionPools dynamically based on mock exam
  let sectionPools: any[] = [];
  if (isSNAPEthicsSectional) {
    sectionPools = [snapEthicsQuestions];
  } else if (isSNAPMock) {
    sectionPools = [
      snapVerbalQuestions.length > 0 ? snapVerbalQuestions : nonXATPool,
      snapLRQuestions.length > 0 ? snapLRQuestions : nonXATPool,
      snapQuantDIQuestions.length > 0 ? snapQuantDIQuestions : nonXATPool,
    ];
  } else if (isMAHCETARSectional) {
    sectionPools = [ALL_MAH_CET_AR_QUESTIONS];
  } else if (isMAHCETMock) {
    sectionPools = [
      dilrQuestions.length > 0 ? dilrQuestions : nonXATPool, // LR (75Q)
      ALL_MAH_CET_AR_QUESTIONS,                             // Abstract Reasoning (25Q)
      qaQuestions.length > 0 ? qaQuestions : nonXATPool,     // QA (50Q)
      varcQuestions.length > 0 ? varcQuestions : nonXATPool, // VARC (50Q)
    ];
  } else if (isXATDMSectional) {
    sectionPools = [xatDMQuestions];
  } else if (isXATMock) {
    sectionPools = [
      varcQuestions.length > 0 ? varcQuestions : nonXATPool,
      xatDMQuestions,
      qaQuestions.length > 0 ? qaQuestions : nonXATPool,
      xatGKQuestions,
    ];
  } else {
    // Non-XAT, Non-MAH CET, Non-SNAP (e.g. CAT Mock): STRICTLY NO DM, NO GK, NO AR, NO SNAP Ethics
    sectionPools = [
      varcQuestions.length > 0 ? varcQuestions : nonXATPool,
      dilrQuestions.length > 0 ? dilrQuestions : nonXATPool,
      qaQuestions.length > 0 ? qaQuestions : nonXATPool,
    ];
  }

  const currentSectionQuestions = sectionPools[currentSectionIndex] || nonXATPool;
  const currentQ = currentSectionQuestions[currentQIndex % currentSectionQuestions.length];

  // Responses state
  const [responses, setResponses] = useState<Record<number, MockQuestionState>>(() => {
    const initial: Record<number, MockQuestionState> = {};
    for (let i = 0; i < 66; i++) {
      initial[i] = {
        selectedOption: null,
        paletteStatus: i === 0 ? "SKIPPED" : "NOT_VISITED",
        timeSpentSec: 0,
      };
    }
    return initial;
  });

  // Section transition handlers
  const handleSectionTimeUp = (completedIdx: number, nextIdx: number | null) => {
    if (nextIdx !== null) {
      setCurrentSectionIndex(nextIdx);
      setCurrentQIndex(0);
    }
  };

  const handleSectionChange = (newIdx: number) => {
    setCurrentSectionIndex(newIdx);
    setCurrentQIndex(0);
  };

  // Track per-question time spent via synchronized QuizTimer tick
  const handleTimerTick = (data: QuizTimerTickData) => {
    setResponses((prev) => {
      const cur = prev[currentQIndex];
      if (!cur) return prev;
      return {
        ...prev,
        [currentQIndex]: {
          ...cur,
          timeSpentSec: (cur.timeSpentSec || 0) + 1,
        },
      };
    });
  };

  const handleSelectOption = (label: string) => {
    setResponses((prev) => ({
      ...prev,
      [currentQIndex]: {
        ...prev[currentQIndex],
        selectedOption: label,
        paletteStatus:
          prev[currentQIndex]?.paletteStatus === "MARKED_FOR_REVIEW" ||
          prev[currentQIndex]?.paletteStatus === "ANSWERED_AND_MARKED"
            ? "ANSWERED_AND_MARKED"
            : "ANSWERED",
      },
    }));
  };

  const handleClear = () => {
    setResponses((prev) => ({
      ...prev,
      [currentQIndex]: {
        ...prev[currentQIndex],
        selectedOption: null,
        paletteStatus: "SKIPPED",
      },
    }));
  };

  const handleMarkReview = () => {
    setResponses((prev) => {
      const hasAns = prev[currentQIndex]?.selectedOption !== null;
      const isMarked =
        prev[currentQIndex]?.paletteStatus === "MARKED_FOR_REVIEW" ||
        prev[currentQIndex]?.paletteStatus === "ANSWERED_AND_MARKED";

      return {
        ...prev,
        [currentQIndex]: {
          ...prev[currentQIndex],
          paletteStatus: isMarked
            ? hasAns
              ? "ANSWERED"
              : "SKIPPED"
            : hasAns
            ? "ANSWERED_AND_MARKED"
            : "MARKED_FOR_REVIEW",
        },
      };
    });
  };

  const handleSubmit = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        `mock-attempt-${resolvedParams.mockId}`,
        JSON.stringify(responses)
      );
    }
    router.push(`/mocks/${resolvedParams.mockId}/result`);
  };

  const currentSec = sections[currentSectionIndex];
  const currentState = responses[currentQIndex] || {
    selectedOption: null,
    paletteStatus: "NOT_VISITED",
  };

  // Calculator Logic
  const handleCalcBtn = (val: string) => {
    if (val === "C") {
      setCalcInput("0");
    } else if (val === "=") {
      try {
        // eslint-disable-next-line no-eval
        const res = eval(calcInput.replace(/×/g, "*").replace(/÷/g, "/"));
        setCalcInput(String(res));
      } catch {
        setCalcInput("Error");
      }
    } else {
      setCalcInput((prev) => (prev === "0" ? val : prev + val));
    }
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white select-none">
      {/* Top Exam Header */}
      <header className="h-16 px-4 sm:px-8 border-b border-slate-800 bg-[#0b0f19] flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <Badge variant="verified" className="text-[10px]">
            CAT 2026 OFFICIAL SIMULATOR
          </Badge>
          <span className="hidden sm:inline text-xs font-semibold text-white">
            CAT 2026 National Full Mock #01
          </span>
        </div>

        {/* Section Tabs with Locking */}
        <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          {sections.map((sec, idx) => {
            const isCurrent = currentSectionIndex === idx;
            const isLocked = currentSectionIndex > idx;
            return (
              <div
                key={sec.id}
                className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  isCurrent
                    ? "bg-indigo-600 text-white shadow-xs"
                    : isLocked
                    ? "text-slate-500 cursor-not-allowed"
                    : "text-slate-400"
                }`}
              >
                {isLocked && <Lock className="h-3 w-3" />}
                <span>{sec.name}</span>
                <span className="text-[10px] opacity-75 font-mono">({sec.questionCount}Q)</span>
              </div>
            );
          })}
        </div>

        {/* Right: Section Timer & Calculator */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCalculatorOpen((prev) => !prev)}
            className={`p-2 rounded-xl border text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
              isCalculatorOpen
                ? "bg-purple-600 text-white border-purple-500"
                : "bg-slate-900 text-slate-300 border-slate-800 hover:text-white"
            }`}
            title="Toggle On-Screen Calculator"
          >
            <Calculator className="h-4 w-4" />
            <span className="hidden md:inline font-mono">Calc</span>
          </button>

          <QuizTimer
            testId={`mock-${resolvedParams.mockId}`}
            sections={sections}
            activeSectionIndex={currentSectionIndex}
            isSectionLocked={true}
            onAutoSubmit={handleSubmit}
            onSectionTimeUp={handleSectionTimeUp}
            onSectionChange={handleSectionChange}
            onTick={handleTimerTick}
            variant="detailed"
          />

          <Button
            variant="accent"
            size="sm"
            onClick={() => setIsSubmitModalOpen(true)}
            className="text-xs shadow-md shadow-indigo-600/20"
          >
            <span>Submit Mock</span>
            <Send className="h-3.5 w-3.5" />
          </Button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Question Viewer */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-4 rounded-2xl bg-[#0e1422] border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-sm font-bold text-white font-mono">
                Section: {currentSec.name} • Question {currentQIndex + 1} of {currentSec.questionCount}
              </span>
              <Badge variant="indigo" className="text-[10px]">
                {currentQ.difficulty}
              </Badge>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-bold">+3.0 / -1.0</span>
          </div>

          {/* Passage (if present) */}
          {currentQ.passageText && (
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2 max-h-64 overflow-y-auto">
              <p className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider">
                Reading Passage / Context
              </p>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-serif">
                {currentQ.passageText}
              </p>
            </div>
          )}

          {/* Graph / Chart Visualizer if applicable */}
          <QuestionGraphViewer question={currentQ} />

          {/* Question & Options */}
          <div className="p-6 rounded-2xl bg-[#0e1422] border border-slate-800 space-y-6">
            <p className="text-sm sm:text-base font-medium text-white leading-relaxed">
              {currentQ.questionText || (currentQ as any).prompt || (currentQ as any).question}
            </p>

            {/* Visual Abstract Reasoning Question Renderers */}
            {(currentQ as any).questionType === "FIGURE_SERIES" && (currentQ as any).sequenceFigures && (
              <div className="flex justify-center p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
                <FigureSequence figures={(currentQ as any).sequenceFigures} figureSize={85} />
              </div>
            )}
            {(currentQ as any).questionType === "FIGURE_ANALOGY" && (currentQ as any).pairA && (
              <div className="flex justify-center p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
                <FigureAnalogy
                  pairA={(currentQ as any).pairA}
                  figureC={(currentQ as any).figureC}
                  figureSize={90}
                />
              </div>
            )}
            {(currentQ as any).questionType === "MISSING_FIGURE" && (currentQ as any).matrix3x3 && (
              <div className="flex justify-center p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
                <FigureMatrix matrix={(currentQ as any).matrix3x3} figureSize={75} />
              </div>
            )}
            {(currentQ as any).questionType === "FIGURE_CLASSIFICATION" && (currentQ as any).classificationFigures && (
              <div className="flex flex-wrap items-center justify-center gap-3 p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
                {(currentQ as any).classificationFigures.map((cf: any) => (
                  <div key={cf.label} className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-center">
                    <FigureRenderer figure={cf.figure} size={75} />
                    <span className="text-xs font-bold text-slate-400 block mt-1">Figure {cf.label}</span>
                  </div>
                ))}
              </div>
            )}
            {(currentQ as any).questionType === "ROTATION_REFLECTION" && (currentQ as any).sourceFigure && (
              <div className="flex justify-center p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
                <FigureRenderer figure={(currentQ as any).sourceFigure} size={95} />
              </div>
            )}
            {(currentQ as any).questionType === "MATCHING_PAIRS" && (currentQ as any).referencePair && (
              <div className="flex items-center justify-center gap-3 p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
                <FigureRenderer figure={(currentQ as any).referencePair[0]} size={80} />
                <ArrowRight className="w-5 h-5 text-amber-400" />
                <FigureRenderer figure={(currentQ as any).referencePair[1]} size={80} />
              </div>
            )}

            {currentQ.options && currentQ.options.length > 0 ? (
              (currentQ.options[0] as any).figure ? (
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {currentQ.options.map((opt: any) => {
                    const isSelected = currentState.selectedOption === opt.label;
                    return (
                      <OptionFigure
                        key={opt.label}
                        label={opt.label}
                        figure={opt.figure}
                        figurePair={opt.figurePair}
                        isSelected={isSelected}
                        isRevealed={false}
                        isCorrect={false}
                        onClick={() => handleSelectOption(opt.label)}
                        figureSize={75}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-3">
                  {currentQ.options.map((opt: { label: string; text: string }) => {
                    const isSelected = currentState.selectedOption === opt.label;
                    return (
                      <div
                        key={opt.label}
                        onClick={() => handleSelectOption(opt.label)}
                        className={`p-4 rounded-xl border text-sm flex items-start gap-3.5 transition-all cursor-pointer ${
                          isSelected
                            ? "bg-indigo-950/40 border-indigo-500 text-white"
                            : "bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700"
                        }`}
                      >
                        <div
                          className={`h-6 w-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                            isSelected
                              ? "bg-indigo-600 text-white"
                              : "bg-slate-800 text-slate-400 border border-slate-700"
                          }`}
                        >
                          {opt.label}
                        </div>
                        <span className="text-xs sm:text-sm pt-0.5">{opt.text}</span>
                      </div>
                    );
                  })}
                </div>
              )
            ) : (
              <div className="p-5 rounded-xl bg-slate-900/80 border border-indigo-500/30 space-y-3">
                <label className="text-xs font-semibold text-indigo-300 block uppercase tracking-wider">
                  Type In The Answer (TITA) • No Negative Marking
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={currentState.selectedOption || ""}
                    onChange={(e) => handleSelectOption(e.target.value)}
                    placeholder="Enter your answer (numeric or text)..."
                    className="flex-1 px-4 py-3 bg-[#080c14] border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-hidden focus:border-indigo-500 transition-colors"
                  />
                  {currentState.selectedOption && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handleClear}
                      className="text-xs"
                    >
                      Clear
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-[#0e1422] border border-slate-800">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentQIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentQIndex === 0}
                className="gap-1 text-xs"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleClear}
                disabled={!currentState.selectedOption}
                className="gap-1 text-xs"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Clear</span>
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleMarkReview}
                className="gap-1.5 text-xs text-violet-400 border-violet-500/30"
              >
                <Bookmark className="h-3.5 w-3.5" />
                <span>Mark for Review</span>
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() =>
                  setCurrentQIndex((prev) => Math.min(currentSec.questionCount - 1, prev + 1))
                }
                disabled={currentQIndex === currentSec.questionCount - 1}
                className="gap-1 text-xs"
              >
                <span>Save & Next</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Right: Section Question Palette */}
        <aside className="hidden lg:block lg:col-span-4 space-y-5 sticky top-24">
          <Card className="border border-slate-800 bg-[#0e1422] p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white">{currentSec.name} Palette</h3>
              <Badge variant="indigo" className="text-[10px]">
                {currentSec.questionCount} Questions
              </Badge>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: currentSec.questionCount }).map((_, idx) => {
                const state = responses[idx] || { paletteStatus: "NOT_VISITED" };
                const isCurrent = currentQIndex === idx;

                let stateClasses = "bg-slate-800/80 border-slate-700 text-slate-400";
                if (state.paletteStatus === "ANSWERED") {
                  stateClasses = "bg-emerald-500 border-emerald-600 text-white font-bold";
                } else if (state.paletteStatus === "MARKED_FOR_REVIEW") {
                  stateClasses = "bg-violet-950 border-violet-500 text-violet-300 font-bold";
                } else if (state.paletteStatus === "ANSWERED_AND_MARKED") {
                  stateClasses = "bg-violet-600 border-emerald-400 text-white font-bold";
                } else if (state.paletteStatus === "SKIPPED") {
                  stateClasses = "bg-amber-500/15 border-amber-500/50 text-amber-400 font-bold";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentQIndex(idx)}
                    className={`h-9 w-9 rounded-xl border text-xs font-mono flex items-center justify-center cursor-pointer ${stateClasses} ${
                      isCurrent ? "ring-2 ring-indigo-400 ring-offset-2 ring-offset-[#080c14] scale-105" : ""
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Floating On-Screen Calculator Panel */}
          {isCalculatorOpen && (
            <Card className="border border-purple-500/40 bg-[#0e1422] p-4 space-y-3 shadow-2xl animate-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                  <Calculator className="h-3.5 w-3.5" /> Basic On-Screen Calculator
                </span>
                <button
                  onClick={() => setIsCalculatorOpen(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-right font-mono text-lg font-bold text-emerald-400 overflow-x-auto">
                {calcInput}
              </div>

              <div className="grid grid-cols-4 gap-1.5 font-mono text-xs">
                {["7", "8", "9", "÷", "4", "5", "6", "×", "1", "2", "3", "-", "C", "0", "=", "+"].map((btn) => (
                  <button
                    key={btn}
                    onClick={() => handleCalcBtn(btn)}
                    className={`p-2.5 rounded-lg border text-center font-bold transition-colors cursor-pointer ${
                      btn === "="
                        ? "bg-emerald-600 text-white border-emerald-500"
                        : btn === "C"
                        ? "bg-red-600 text-white border-red-500"
                        : ["+", "-", "×", "÷"].includes(btn)
                        ? "bg-indigo-600 text-white border-indigo-500"
                        : "bg-slate-900 text-slate-200 border-slate-800 hover:bg-slate-800"
                    }`}
                  >
                    {btn}
                  </button>
                ))}
              </div>
            </Card>
          )}
        </aside>
      </div>

      {/* Submit Confirmation Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-[#0e1422] border border-slate-700 p-6 space-y-6 shadow-2xl">
            <div className="space-y-2 text-center">
              <div className="h-12 w-12 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center mx-auto">
                <Send className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Submit Full Mock Test?</h3>
              <p className="text-xs text-slate-400">
                Are you sure you want to end the test and generate your official percentile report?
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setIsSubmitModalOpen(false)}
              >
                Return to Test
              </Button>
              <Button
                variant="accent"
                className="flex-1"
                onClick={handleSubmit}
              >
                Confirm & Grade
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
