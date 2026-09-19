"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  PlusCircle,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Zap,
  Clock,
  Layers,
  Eye,
  Trash2,
  Plus,
  Play,
  FileText,
  AlertTriangle,
} from "lucide-react";
import {
  saveCustomQuestion,
  CustomQuestionItem,
} from "@/lib/custom-questions";
import { QuestionGraphViewer } from "./QuestionGraphViewer";

interface AddQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuestionAdded?: (newQ: CustomQuestionItem) => void;
  defaultTrack?: "qa" | "dilr" | "varc" | "special";
  defaultTopic?: string;
}

export function AddQuestionModal({
  isOpen,
  onClose,
  onQuestionAdded,
  defaultTrack = "qa",
  defaultTopic = "percentages",
}: AddQuestionModalProps) {
  const router = useRouter();

  const [track, setTrack] = useState<"qa" | "dilr" | "varc" | "special">(defaultTrack);
  const [topicSlug, setTopicSlug] = useState(defaultTopic);
  const [subtopicSlug, setSubtopicSlug] = useState("");
  const [difficulty, setDifficulty] = useState<"EASY" | "MEDIUM" | "HARD">("MEDIUM");
  const [questionType, setQuestionType] = useState<"MCQ" | "TITA">("MCQ");
  const [hasPassage, setHasPassage] = useState(false);
  const [passageText, setPassageText] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // Options for MCQ
  const [options, setOptions] = useState([
    { label: "A", text: "" },
    { label: "B", text: "" },
    { label: "C", text: "" },
    { label: "D", text: "" },
  ]);
  const [correctAnswer, setCorrectAnswer] = useState("A");

  // 4-Part Solution
  const [detailedText, setDetailedText] = useState("");
  const [stepByStep, setStepByStep] = useState<string[]>([
    "Step 1: Identify given variables and constraints",
    "Step 2: Apply the core formula or deduction logic",
  ]);
  const [shortcutMethod, setShortcutMethod] = useState("");
  const [conceptTested, setConceptTested] = useState("");
  const [commonMistakeTrap, setCommonMistakeTrap] = useState("");
  const [estimatedTimeSec, setEstimatedTimeSec] = useState(90);
  const [tagsInput, setTagsInput] = useState("Direct-Creation, Practice-Bank");

  const [activeTab, setActiveTab] = useState<"form" | "preview">("form");
  const [savedStatus, setSavedStatus] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const topicPresets: Record<string, { label: string; slug: string }[]> = {
    qa: [
      { label: "Percentages & Profit-Loss", slug: "percentages" },
      { label: "Time, Speed & Distance", slug: "time-speed-distance" },
      { label: "Time & Work", slug: "time-work" },
      { label: "Ratios & Mixtures", slug: "ratios-mixtures" },
      { label: "Quadratic Equations", slug: "quadratic-equations" },
      { label: "Triangles & Geometry", slug: "geometry" },
      { label: "Number System & Cyclicity", slug: "number-system" },
      { label: "Permutations & Combinations", slug: "modern-math" },
    ],
    dilr: [
      { label: "Graphs & Charts (Bar, Line, Pie, Radar)", slug: "graphs-charts" },
      { label: "Mixed Graphs (Combined Sets)", slug: "mixed-graphs" },
      { label: "Missing Data Tables & Caselets", slug: "tables-caselets" },
      { label: "Calculation Basics (DI Speed)", slug: "calculation-basics" },
      { label: "Linear & Circular Arrangements", slug: "arrangements" },
      { label: "Games & Tournaments", slug: "tournaments" },
      { label: "Scheduling & Resource Allocation", slug: "scheduling-distribution" },
      { label: "Venn Diagrams & Set Theory", slug: "venn-diagrams" },
      { label: "Puzzles & Multi-Variable Grid", slug: "puzzles" },
      { label: "Binary Logic & Truth Tellers", slug: "binary-logic" },
    ],
    varc: [
      { label: "RC: Central Thesis & Main Idea", slug: "rc-main-idea" },
      { label: "RC: Inference & Tone", slug: "rc-inference" },
      { label: "Para Jumbles & Coherence", slug: "para-jumbles" },
      { label: "Para Summary & Odd Sentence", slug: "para-summary" },
      { label: "Critical Reasoning", slug: "critical-reasoning" },
    ],
    special: [
      { label: "XAT Decision Making", slug: "xat-dm" },
      { label: "CMAT Innovation & Entrepreneurship", slug: "cmat-innovation" },
      { label: "MAT Economic Environment", slug: "mat-economy" },
      { label: "MAH CET Abstract Reasoning", slug: "mah-cet-abstract" },
    ],
  };

  const handleOptionChange = (idx: number, text: string) => {
    setOptions((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], text };
      return next;
    });
  };

  const handleAddStep = () => {
    setStepByStep((prev) => [...prev, `Step ${prev.length + 1}: `]);
  };

  const handleUpdateStep = (idx: number, val: string) => {
    setStepByStep((prev) => {
      const copy = [...prev];
      copy[idx] = val;
      return copy;
    });
  };

  const handleRemoveStep = (idx: number) => {
    setStepByStep((prev) => prev.filter((_, i) => i !== idx));
  };

  // Pre-fill a sample question template
  const handleLoadSampleTemplate = (presetType?: "ims-work" | "ims-trader" | "ims-escalator" | "ims-tournament" | "ims-rc" | "ims-xat") => {
    if (presetType === "ims-work" || (!presetType && track === "qa")) {
      setTrack("qa");
      setTopicSlug("time-work");
      setSubtopicSlug("alternate-days");
      setDifficulty("HARD");
      setQuestionType("MCQ");
      setHasPassage(false);
      setQuestionText(
        "A, B, and C can complete a piece of work individually in 15 days, 20 days, and 30 days respectively. They work in a repeating cycle of three days: on Day 1, only A works; on Day 2, A and B work together; on Day 3, A, B, and C all work together. If the target work is 47 units (where LCM work = 60 units), on which day and at what fraction of that day is the work completed?"
      );
      setOptions([
        { label: "A", text: "8th day (at 1/3 of the day)" },
        { label: "B", text: "8th day (at 3/7 of the day)" },
        { label: "C", text: "9th day (at 1/2 of the day)" },
        { label: "D", text: "7th day (at 5/6 of the day)" },
      ]);
      setCorrectAnswer("B");
      setDetailedText(
        "Total Work = 60 units. A = 4 u/day, B = 3 u/day, C = 2 u/day.\nDay 1 (A) = 4 units.\nDay 2 (A+B) = 7 units.\nDay 3 (A+B+C) = 9 units.\n3-day cycle = 20 units. In 2 cycles (6 days) = 40 units.\nDay 7: A does 4 units => 44 units total (3 units left).\nDay 8: A+B work together at 7 u/day => Time = 3/7 of the 8th day."
      );
      setStepByStep([
        "1. Total work units = 60.",
        "2. Efficiencies: A = 4, B = 3, C = 2.",
        "3. 2 full cycles (6 days) = 40 units.",
        "4. Day 7: A does 4 units (total = 44 units, 3 units remaining).",
        "5. Day 8: A+B (7 u/day) take 3/7 day. Finished on 8th day at 3/7 fraction.",
      ]);
      setShortcutMethod("LCM Cycle block method: 2 cycles = 40 units. Remainder 7 units split across Day 7 (4u) and Day 8 (3u).");
      setConceptTested("Cyclic Non-Uniform Workforce Allocation");
      setCommonMistakeTrap("Dividing remaining work by the 3-day average rate instead of following the roster.");
      setEstimatedTimeSec(100);
      setTagsInput("IMS SimCAT, Time & Work, Cyclical");
    } else if (presetType === "ims-trader") {
      setTrack("qa");
      setTopicSlug("percentages");
      setSubtopicSlug("profit-loss");
      setDifficulty("HARD");
      setQuestionType("MCQ");
      setHasPassage(false);
      setQuestionText(
        "A dishonest wholesale trader uses a modified weighing scale that reads 1200g while purchasing every 1000g from farmers, and reads 800g while dispensing every 1000g to retailers. If he sells goods at a nominal discount of 10% on cost price, what is his overall net percentage profit?"
      );
      setOptions([
        { label: "A", text: "35.0%" },
        { label: "B", text: "40.0%" },
        { label: "C", text: "37.5%" },
        { label: "D", text: "50.0%" },
      ]);
      setCorrectAnswer("A");
      setDetailedText(
        "Multiplying Factor = (1200/1000) * (1000/800) * (1 - 0.10) = 1.20 * 1.25 * 0.90 = 1.50 * 0.90 = 1.35 => Net Profit = +35%."
      );
      setStepByStep([
        "1. Purchase multiplier: 1200/1000 = 1.20.",
        "2. Selling weight multiplier: 1000/800 = 1.25.",
        "3. Discount factor = 0.90.",
        "4. Composite multiplier = 1.20 * 1.25 * 0.90 = 1.35 (+35%).",
      ]);
      setShortcutMethod("Chain Multipliers: (1200/800) * 0.9 = 1.5 * 0.9 = 1.35 => 35% Profit.");
      setConceptTested("Dishonest Weighing Multipliers with Discounts");
      setCommonMistakeTrap("Inverting the purchasing ratio.");
      setEstimatedTimeSec(90);
      setTagsInput("IMS SimCAT, Profit-Loss, Dishonest Dealer");
    } else if (presetType === "ims-tournament" || (!presetType && track === "dilr")) {
      setTrack("dilr");
      setTopicSlug("tournaments");
      setSubtopicSlug("seeded-bracket");
      setDifficulty("HARD");
      setQuestionType("MCQ");
      setHasPassage(true);
      setPassageText(
        "In a 16-player single-elimination tournament seeded from 1 to 16, assume the higher seed always beats the lower seed, EXCEPT that Seed 10 upsets Seed 7 in R1 and Seed 2 in QF, while Seed 4 upsets Seed 1 in the Semi-Finals."
      );
      setQuestionText("Which two players face each other in the Final match?");
      setOptions([
        { label: "A", text: "Seed 4 and Seed 3" },
        { label: "B", text: "Seed 4 and Seed 10" },
        { label: "C", text: "Seed 1 and Seed 3" },
        { label: "D", text: "Seed 8 and Seed 2" },
      ]);
      setCorrectAnswer("A");
      setDetailedText(
        "Top half winner: Seed 4 (upsets Seed 1 in SF). Bottom half: Seed 10 upsets 7 and 2, but loses to higher-seed 3 in SF. Final is Seed 4 vs Seed 3."
      );
      setStepByStep([
        "1. Top half: 4 upsets 1 -> 4 reaches Final.",
        "2. Bottom half: 10 upsets 2 in QF. SF2 is 3 vs 10. Higher seed 3 wins.",
        "3. Final match is 4 vs 3.",
      ]);
      setShortcutMethod("Separate top and bottom half branches independently.");
      setConceptTested("Seeded Bracket Knockout Propagation");
      setCommonMistakeTrap("Assuming upset player continues winning without a prompt rule.");
      setEstimatedTimeSec(120);
      setTagsInput("IMS SimCAT, Tournaments, DILR");
    } else if (presetType === "ims-rc" || (!presetType && track === "varc")) {
      setTrack("varc");
      setTopicSlug("rc-inference");
      setSubtopicSlug("institutional-economics");
      setDifficulty("HARD");
      setQuestionType("MCQ");
      setHasPassage(true);
      setPassageText(
        "Institutions are not merely neutral arbiters that lower transaction costs in economic exchange; they are historically contingent structures that codify pre-existing power asymmetries. When legal regimes establish property boundaries, they validate historical distributions of capital. Economic efficiency cannot be disaggregated from the distributional politics that birthed its regulatory framework."
      );
      setQuestionText(
        "Based on the passage, with which assertion would the author most strongly agree?"
      );
      setOptions([
        { label: "A", text: "The definition and enforcement of economic efficiency are inherently shaped by the power dynamics that established the legal system." },
        { label: "B", text: "Transaction costs in modern markets can be completely eradicated through deregulation." },
        { label: "C", text: "State coercion in property enforcement universally leads to total inefficiency." },
        { label: "D", text: "Market self-regulation is the most optimal method for wealth redistribution." },
      ]);
      setCorrectAnswer("A");
      setDetailedText(
        "The author's core thesis is that economic efficiency is inseparable from historical political power and regulatory creation. Option A captures this precisely."
      );
      setStepByStep([
        "1. Identify main claim: Efficiency is tied to regulatory power.",
        "2. Eliminate extreme options B, C, D.",
        "3. Select balanced Option A.",
      ]);
      setShortcutMethod("Look for direct reflection of the concluding sentence.");
      setConceptTested("RC High Inference Argument Mapping");
      setCommonMistakeTrap("Selecting options with absolute words like 'completely' or 'universally'.");
      setEstimatedTimeSec(90);
      setTagsInput("IMS SimCAT, VARC, RC Inference");
    } else {
      setTrack("special");
      setTopicSlug("xat-dm");
      setSubtopicSlug("business-ethics");
      setDifficulty("HARD");
      setQuestionType("MCQ");
      setHasPassage(true);
      setPassageText(
        "A renewable energy firm discovered that an inverter model installed in 4,000 rural microgrids has a 2% failure rate during heatwaves, causing 48h blackouts during peak harvest. Current contracts exempt the firm above 45°C. Replacing all capacitors immediately costs ₹8 Crores, eliminating retail dividends."
      );
      setQuestionText("What is the most ethically sound and commercially sustainable decision?");
      setOptions([
        { label: "A", text: "Proactively initiate a free phased capacitor upgrade starting with high-risk agricultural clusters, deploy mobile repair units for harvest season, and transparently inform shareholders." },
        { label: "B", text: "Strictly invoke the contract temperature exemption to reject all claims and preserve the ₹8 Crore dividend." },
        { label: "C", text: "Shut down all 4,000 microgrids immediately until total replacement is done." },
        { label: "D", text: "Replace capacitors only for farmers who threaten legal litigation." },
      ]);
      setCorrectAnswer("A");
      setDetailedText(
        "XAT Decision Making balances long-term brand equity and customer protection with pragmatic phased execution and stakeholder communication."
      );
      setStepByStep([
        "1. Reject legalistic loopholes (B).",
        "2. Reject panic shutdown (C).",
        "3. Reject discriminatory secrecy (D).",
        "4. Choose phased stakeholder stewardship (A).",
      ]);
      setShortcutMethod("Pragmatic phased execution + stakeholder transparency wins in XAT DM.");
      setConceptTested("XAT Decision Making - Stakeholder Stewardship");
      setCommonMistakeTrap("Relying purely on legal technicalities.");
      setEstimatedTimeSec(100);
      setTagsInput("IMS XAT, Decision Making, Ethics");
    }
    setValidationError(null);
  };

  const handleSaveQuestion = (launchPracticeImmediately = false) => {
    if (!questionText.trim()) {
      setValidationError("Please enter the question statement.");
      return;
    }

    if (questionType === "MCQ") {
      const emptyOpt = options.find((o) => !o.text.trim());
      if (emptyOpt) {
        setValidationError(`Please fill out text for Option ${emptyOpt.label}.`);
        return;
      }
    } else {
      if (!correctAnswer.trim()) {
        setValidationError("Please specify the correct answer value.");
        return;
      }
    }

    setValidationError(null);

    const created = saveCustomQuestion({
      topicSlug: topicSlug || "general-practice",
      subtopicSlug: subtopicSlug || topicSlug,
      track,
      difficulty,
      questionType,
      questionText: questionText.trim(),
      passageText: hasPassage && passageText.trim() ? passageText.trim() : undefined,
      imageUrl: imageUrl.trim() || undefined,
      options: questionType === "MCQ" ? options : [],
      correctAnswer: correctAnswer.trim(),
      estimatedTimeSec: Number(estimatedTimeSec) || 90,
      isDemo: false,
      source: "Direct User In-App Bank",
      solution: {
        detailedText:
          detailedText.trim() ||
          "Direct mathematical deduction and verified stepwise reduction.",
        stepByStep:
          stepByStep.filter((s) => s.trim().length > 0).length > 0
            ? stepByStep.filter((s) => s.trim().length > 0)
            : [detailedText.trim() || "Stepwise solution verified."],
        shortcutMethod:
          shortcutMethod.trim() ||
          "Examine answer options or apply speed substitution technique.",
        conceptTested:
          conceptTested.trim() ||
          `${topicSlug.replace(/-/g, " ")} Core Principles`,
        commonMistakeTrap:
          commonMistakeTrap.trim() ||
          "Avoid rushing mental arithmetic or misreading boundary conditions.",
      },
      tags: tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    });

    setSavedStatus(true);
    if (onQuestionAdded) {
      onQuestionAdded(created);
    }

    setTimeout(() => {
      setSavedStatus(false);
      onClose();
      if (launchPracticeImmediately) {
        // Launch dynamic quiz prioritizing this custom question
        const query = new URLSearchParams({
          topic: "custom",
          title: `Practice Unique Q (${created.topicSlug})`,
          count: "5",
          timed: "true",
          difficulty,
        });
        router.push(`/quiz/custom-${created.id}?${query.toString()}`);
      }
    }, 600);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0b0f19] border-slate-800 text-white p-6 shadow-2xl">
        <DialogHeader className="space-y-1 pb-3 border-b border-slate-800/80">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Badge variant="indigo" className="text-[10px]">
                IN-APP AUTHORING
              </Badge>
              <Badge variant="success" className="text-[10px]">
                IMS SIMCAT BENCHMARKS
              </Badge>
            </div>
            
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    handleLoadSampleTemplate(e.target.value as any);
                    e.target.value = "";
                  }
                }}
                defaultValue=""
                className="bg-slate-900 border border-indigo-500/40 text-indigo-300 rounded-lg px-2 py-1 text-xs focus:outline-hidden cursor-pointer"
              >
                <option value="" disabled>
                  Load IMS SimCAT Template...
                </option>
                <option value="ims-work">IMS CAT: Alternate Days Work (QA)</option>
                <option value="ims-trader">IMS CAT: Dishonest Trader Scale (QA)</option>
                <option value="ims-tournament">IMS CAT: Seeded Knockout Bracket (DILR)</option>
                <option value="ims-rc">IMS CAT: Institutional Economics RC (VARC)</option>
                <option value="ims-xat">IMS XAT: Decision Making Ethics (Special)</option>
              </select>
            </div>
          </div>

          <DialogTitle className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
            <PlusCircle className="h-5 w-5 text-indigo-400" />
            <span>Add Unique Question Directly in Software</span>
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-400">
            Create custom practice questions with 4-part solutions, shortcuts, and trap alerts. Saved questions immediately integrate into your practice drills and custom workouts.
          </DialogDescription>
        </DialogHeader>

        {/* Tab Toggle: Form vs Live Preview */}
        <div className="flex items-center justify-between gap-2 pt-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("form")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "form"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "bg-slate-900 text-slate-400 hover:text-white"
              }`}
            >
              <FileText className="h-3.5 w-3.5 inline mr-1.5" />
              <span>Question Editor</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "preview"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "bg-slate-900 text-slate-400 hover:text-white"
              }`}
            >
              <Eye className="h-3.5 w-3.5 inline mr-1.5" />
              <span>Live Quiz Preview</span>
            </button>
          </div>

          {validationError && (
            <div className="text-xs text-red-400 flex items-center gap-1">
              <AlertTriangle className="h-3.5 w-3.5" />
              <span>{validationError}</span>
            </div>
          )}
        </div>

        {activeTab === "form" ? (
          <div className="space-y-6 pt-2">
            {/* Section 1: Classification & Metadata */}
            <div className="p-4 rounded-2xl bg-[#0e1422] border border-slate-800 space-y-4">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 text-indigo-400" />
                <span>1. Taxonomy & Classification</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                {/* Track */}
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-slate-400">Track</label>
                  <select
                    value={track}
                    onChange={(e) => {
                      const t = e.target.value as any;
                      setTrack(t);
                      if (topicPresets[t]?.[0]) {
                        setTopicSlug(topicPresets[t][0].slug);
                      }
                    }}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-hidden focus:border-indigo-500"
                  >
                    <option value="qa">Quantitative Aptitude (QA)</option>
                    <option value="dilr">Data Interpretation & LR (DILR)</option>
                    <option value="varc">Verbal Ability & RC (VARC)</option>
                    <option value="special">Exam Specials (XAT/CMAT)</option>
                  </select>
                </div>

                {/* Topic */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[11px] font-medium text-slate-400">Topic Area</label>
                  <select
                    value={topicSlug}
                    onChange={(e) => setTopicSlug(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-hidden focus:border-indigo-500"
                  >
                    {topicPresets[track]?.map((p) => (
                      <option key={p.slug} value={p.slug}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Difficulty */}
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-slate-400">Difficulty</label>
                  <div className="grid grid-cols-3 gap-1">
                    {(["EASY", "MEDIUM", "HARD"] as const).map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDifficulty(d)}
                        className={`py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer border ${
                          difficulty === d
                            ? d === "EASY"
                              ? "bg-emerald-600/30 text-emerald-300 border-emerald-500"
                              : d === "MEDIUM"
                              ? "bg-amber-600/30 text-amber-300 border-amber-500"
                              : "bg-red-600/30 text-red-300 border-red-500"
                            : "bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700"
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Subtopic & Target Time */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[11px] font-medium text-slate-400">
                    Subtopic / Chapter Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={subtopicSlug}
                    onChange={(e) => setSubtopicSlug(e.target.value)}
                    placeholder="e.g. Linear Arrangements, Alligation Ratio, etc."
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-hidden focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-slate-400">
                    Target Time (seconds)
                  </label>
                  <input
                    type="number"
                    min="30"
                    max="300"
                    step="5"
                    value={estimatedTimeSec}
                    onChange={(e) => setEstimatedTimeSec(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-hidden focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Question Statement & Options */}
            <div className="p-4 rounded-2xl bg-[#0e1422] border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <HelpCircle className="h-3.5 w-3.5 text-indigo-400" />
                  <span>2. Problem Statement & Options</span>
                </h3>

                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasPassage}
                      onChange={(e) => setHasPassage(e.target.checked)}
                      className="rounded border-slate-700 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Add Passage / Caselet Context</span>
                  </label>

                  <div className="flex items-center gap-1 p-0.5 bg-slate-900 rounded-lg border border-slate-800">
                    <button
                      type="button"
                      onClick={() => setQuestionType("MCQ")}
                      className={`px-2.5 py-1 rounded text-[11px] font-semibold cursor-pointer ${
                        questionType === "MCQ"
                          ? "bg-indigo-600 text-white"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      MCQ
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuestionType("TITA")}
                      className={`px-2.5 py-1 rounded text-[11px] font-semibold cursor-pointer ${
                        questionType === "TITA"
                          ? "bg-indigo-600 text-white"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      TITA
                    </button>
                  </div>
                </div>
              </div>

              {/* Passage Box if checked */}
              {hasPassage && (
                <div className="space-y-1 animate-in fade-in duration-150">
                  <label className="text-[11px] font-medium text-indigo-300">
                    Passage / Stimulus Context
                  </label>
                  <textarea
                    rows={3}
                    value={passageText}
                    onChange={(e) => setPassageText(e.target.value)}
                    placeholder="Enter reading comprehension passage or DILR puzzle constraints..."
                    className="w-full px-3 py-2 bg-slate-900/90 border border-indigo-500/30 rounded-xl text-xs text-slate-200 focus:outline-hidden focus:border-indigo-500"
                  />
                </div>
              )}

              {/* Question Text */}
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-slate-300">
                  Question Text <span className="text-red-400">*</span>
                </label>
                <textarea
                  rows={3}
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  placeholder="Enter the complete question statement..."
                  className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-hidden focus:border-indigo-500"
                />
              </div>

              {/* Graph Image / Diagram URL (Optional) */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-medium text-indigo-300">
                    Figure Image URL (Optional)
                  </label>
                  <span className="text-[10px] text-slate-400">
                    Auto-renders visual chart if left blank
                  </span>
                </div>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://... or /graphs/... (renders instant visual figure)"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-hidden focus:border-indigo-500 font-mono"
                />
              </div>

              {/* Options */}
              {questionType === "MCQ" ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-medium text-slate-400">
                      Options (Click the radio to set the correct answer)
                    </label>
                    <span className="text-[10px] text-emerald-400 font-medium">
                      Correct: Option {correctAnswer}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {options.map((opt, idx) => {
                      const isCorrect = correctAnswer === opt.label;
                      return (
                        <div
                          key={opt.label}
                          className={`flex items-center gap-2 p-2 rounded-xl border transition-all ${
                            isCorrect
                              ? "bg-emerald-950/30 border-emerald-500/60 text-white"
                              : "bg-slate-900/80 border-slate-800 text-slate-300"
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => setCorrectAnswer(opt.label)}
                            className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 cursor-pointer border transition-colors ${
                              isCorrect
                                ? "bg-emerald-500 text-slate-950 border-emerald-400"
                                : "bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-500"
                            }`}
                          >
                            {opt.label}
                          </button>
                          <input
                            type="text"
                            value={opt.text}
                            onChange={(e) => handleOptionChange(idx, e.target.value)}
                            placeholder={`Option ${opt.label} text...`}
                            className="flex-1 bg-transparent text-xs text-white focus:outline-hidden"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-slate-300">
                    Correct Answer Value (Numeric or Exact Text) <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={correctAnswer}
                    onChange={(e) => setCorrectAnswer(e.target.value)}
                    placeholder="e.g. 30, 2314, 12.5"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white font-mono focus:outline-hidden focus:border-indigo-500"
                  />
                </div>
              )}
            </div>

            {/* Section 3: Verified 4-Part Solution */}
            <div className="p-4 rounded-2xl bg-[#0e1422] border border-slate-800 space-y-4">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-indigo-400" />
                <span>3. 4-Part Solution & Pedagogy</span>
              </h3>

              {/* Detailed Explanation */}
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-slate-400">
                  Part 1: Detailed Solution Explanation
                </label>
                <textarea
                  rows={2}
                  value={detailedText}
                  onChange={(e) => setDetailedText(e.target.value)}
                  placeholder="Explain the derivation and logic in full detail..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-hidden focus:border-indigo-500"
                />
              </div>

              {/* Step-by-Step Breakdown */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-medium text-slate-400">
                    Part 2: Step-by-Step Breakdown Steps
                  </label>
                  <button
                    type="button"
                    onClick={handleAddStep}
                    className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="h-3 w-3" />
                    <span>Add Step</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {stepByStep.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-slate-500 w-5 text-center">
                        {idx + 1}.
                      </span>
                      <input
                        type="text"
                        value={step}
                        onChange={(e) => handleUpdateStep(idx, e.target.value)}
                        placeholder={`Step ${idx + 1}...`}
                        className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-hidden focus:border-indigo-500"
                      />
                      {stepByStep.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveStep(idx)}
                          className="p-1 text-slate-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Speed Shortcut */}
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-indigo-300 flex items-center gap-1">
                  <Zap className="h-3 w-3 text-indigo-400" />
                  <span>Part 3: Pro Speed Shortcut / Exam Hack</span>
                </label>
                <input
                  type="text"
                  value={shortcutMethod}
                  onChange={(e) => setShortcutMethod(e.target.value)}
                  placeholder="e.g. Use ratio multipliers or eliminate impossible options first..."
                  className="w-full px-3 py-2 bg-slate-900 border border-indigo-500/40 rounded-xl text-xs text-white focus:outline-hidden focus:border-indigo-500"
                />
              </div>

              {/* Concept & Trap */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-slate-400">
                    Part 4A: Concept Tested
                  </label>
                  <input
                    type="text"
                    value={conceptTested}
                    onChange={(e) => setConceptTested(e.target.value)}
                    placeholder="e.g. Relative Speed & Meeting Points"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-hidden focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-amber-300 flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3 text-amber-400" />
                    <span>Part 4B: Common Mistake Trap</span>
                  </label>
                  <input
                    type="text"
                    value={commonMistakeTrap}
                    onChange={(e) => setCommonMistakeTrap(e.target.value)}
                    placeholder="e.g. Applying inverse ratio or forgetting to sum distances..."
                    className="w-full px-3 py-2 bg-slate-900 border border-amber-500/40 rounded-xl text-xs text-white focus:outline-hidden focus:border-amber-500"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Live Preview Mode */
          <div className="space-y-4 py-2 animate-in fade-in duration-150">
            <div className="p-4 rounded-2xl bg-[#0e1422] border border-slate-800 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Badge variant="indigo" className="text-[10px] uppercase">
                    {track} • {topicSlug.replace(/-/g, " ")}
                  </Badge>
                  <Badge
                    variant={
                      difficulty === "EASY"
                        ? "success"
                        : difficulty === "HARD"
                        ? "destructive"
                        : "warning"
                    }
                    className="text-[10px]"
                  >
                    {difficulty}
                  </Badge>
                  <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                    <Clock className="h-3 w-3 text-indigo-400" />
                    <span>{estimatedTimeSec}s</span>
                  </span>
                </div>
                <Badge variant="verified" className="text-[10px]">
                  DIRECT PREVIEW
                </Badge>
              </div>

              {hasPassage && passageText && (
                <div className="p-3 rounded-xl bg-slate-900/90 border border-indigo-500/20 text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {passageText}
                </div>
              )}

              {/* Graph Viewer in Live Preview */}
              <QuestionGraphViewer
                question={{
                  id: "preview-user-q",
                  topicSlug,
                  subtopicSlug,
                  questionText,
                  passageText,
                  imageUrl: imageUrl.trim() || undefined,
                }}
              />

              <h4 className="text-sm font-semibold text-white leading-relaxed">
                {questionText || "(Question text will appear here...)"}
              </h4>

              {questionType === "MCQ" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  {options.map((opt) => (
                    <div
                      key={opt.label}
                      className={`p-3 rounded-xl border text-xs flex items-center gap-2.5 ${
                        correctAnswer === opt.label
                          ? "bg-emerald-950/40 border-emerald-500/60 text-emerald-200"
                          : "bg-slate-900/70 border-slate-800 text-slate-300"
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[11px] ${
                          correctAnswer === opt.label
                            ? "bg-emerald-500 text-slate-950"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {opt.label}
                      </span>
                      <span>{opt.text || `Option ${opt.label}`}</span>
                      {correctAnswer === opt.label && (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 ml-auto" />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-300">
                  Target Answer: <strong>{correctAnswer || "(Not specified)"}</strong>
                </div>
              )}
            </div>

            {/* Solution Preview */}
            <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 space-y-2 text-xs">
              <h5 className="font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400" />
                <span>Verified Solution Preview</span>
              </h5>
              <p className="text-slate-300 leading-relaxed">
                {detailedText || "(Detailed solution will appear here...)"}
              </p>
              {shortcutMethod && (
                <div className="p-2.5 rounded-xl bg-indigo-900/40 border border-indigo-500/40 text-indigo-200">
                  ⚡ <strong>Speed Shortcut:</strong> {shortcutMethod}
                </div>
              )}
              {commonMistakeTrap && (
                <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-200">
                  ⚠️ <strong>Common Mistake Trap:</strong> {commonMistakeTrap}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800/80">
          <Button variant="ghost" size="sm" onClick={onClose} className="text-xs text-slate-400">
            Cancel
          </Button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSaveQuestion(false)}
              className="flex-1 sm:flex-none text-xs gap-1.5 border-slate-700"
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>Save to Bank</span>
            </Button>

            <Button
              variant="accent"
              size="sm"
              onClick={() => handleSaveQuestion(true)}
              className="flex-1 sm:flex-none text-xs gap-1.5 shadow-lg shadow-indigo-600/20"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>Save & Practice Now</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
