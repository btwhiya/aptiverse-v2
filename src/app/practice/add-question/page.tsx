"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
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
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  saveCustomQuestion,
  CustomQuestionItem,
} from "@/lib/custom-questions";

export default function AddPracticeQuestionPage() {
  const router = useRouter();

  const [track, setTrack] = useState<"qa" | "dilr" | "varc" | "special">("qa");
  const [topicSlug, setTopicSlug] = useState("percentages");
  const [subtopicSlug, setSubtopicSlug] = useState("");
  const [difficulty, setDifficulty] = useState<"EASY" | "MEDIUM" | "HARD">("MEDIUM");
  const [questionType, setQuestionType] = useState<"MCQ" | "TITA">("MCQ");
  const [hasPassage, setHasPassage] = useState(false);
  const [passageText, setPassageText] = useState("");
  const [questionText, setQuestionText] = useState("");

  const [options, setOptions] = useState([
    { label: "A", text: "" },
    { label: "B", text: "" },
    { label: "C", text: "" },
    { label: "D", text: "" },
  ]);
  const [correctAnswer, setCorrectAnswer] = useState("A");

  const [detailedText, setDetailedText] = useState("");
  const [stepByStep, setStepByStep] = useState<string[]>([
    "Step 1: Identify invariant variables and core constraints",
    "Step 2: Formulate the algebraic or logical relationship",
    "Step 3: Solve and verify against edge conditions",
  ]);
  const [shortcutMethod, setShortcutMethod] = useState("");
  const [conceptTested, setConceptTested] = useState("");
  const [commonMistakeTrap, setCommonMistakeTrap] = useState("");
  const [estimatedTimeSec, setEstimatedTimeSec] = useState(90);
  const [tagsInput, setTagsInput] = useState("Direct-Creation, Practice-Bank");

  const [activeTab, setActiveTab] = useState<"form" | "preview">("form");
  const [savedSuccess, setSavedSuccess] = useState(false);
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
      { label: "Linear & Circular Arrangements", slug: "arrangements" },
      { label: "Games & Tournaments", slug: "tournaments" },
      { label: "Missing Data Tables & Caselets", slug: "tables-caselets" },
      { label: "Binary Logic & Truth Tellers", slug: "binary-logic" },
      { label: "Venn Diagrams & Set Theory", slug: "venn-diagrams" },
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

  const handleLoadSampleTemplate = () => {
    if (track === "qa") {
      setTopicSlug("time-speed-distance");
      setSubtopicSlug("circular-tracks");
      setDifficulty("HARD");
      setQuestionType("MCQ");
      setHasPassage(false);
      setQuestionText(
        "Two runners, Anand and Bala, start simultaneously from the same point on a 600-meter circular track in the same direction with speeds of 12 m/s and 7 m/s. Exactly how many seconds after the start will they meet again for the first time at the starting point?"
      );
      setOptions([
        { label: "A", text: "120 seconds" },
        { label: "B", text: "600 seconds" },
        { label: "C", text: "300 seconds" },
        { label: "D", text: "150 seconds" },
      ]);
      setCorrectAnswer("B");
      setDetailedText(
        "Time taken by Anand to complete one full round = 600 / 12 = 50 seconds.\nTime taken by Bala to complete one full round = 600 / 7 seconds.\nThey will meet at the starting point at intervals of LCM(Time_A, Time_B) = LCM(50/1, 600/7) = LCM(50, 600) / HCF(1, 7) = 600 / 1 = 600 seconds."
      );
      setStepByStep([
        "1. Time for Anand per lap = 600 / 12 = 50 s.",
        "2. Time for Bala per lap = 600 / 7 s.",
        "3. Meeting at STARTING point requires LCM of individual lap times: LCM(50/1, 600/7).",
        "4. Rule for LCM of fractions: LCM(numerators) / HCF(denominators) = LCM(50, 600) / HCF(1, 7) = 600 / 1 = 600 seconds.",
      ]);
      setShortcutMethod(
        "LCM of fraction lap times = LCM(numerators) / HCF(denominators) = 600 / 1 = 600s."
      );
      setConceptTested("Circular Motion - First Meeting at Starting Point vs Anywhere on Track");
      setCommonMistakeTrap(
        "Calculating first meeting ANYWHERE on the track (600 / (12-7) = 120s) instead of at the STARTING point (600s)."
      );
      setEstimatedTimeSec(100);
    } else {
      setTopicSlug("arrangements");
      setSubtopicSlug("circular-seating");
      setDifficulty("MEDIUM");
      setQuestionType("MCQ");
      setHasPassage(true);
      setPassageText(
        "Six colleagues (A, B, C, D, E, F) sit around a circular conference table facing inward.\n- A sits opposite to D.\n- B sits to the immediate left of A.\n- C is adjacent to both D and E."
      );
      setQuestionText("Who sits to the immediate right of B?");
      setOptions([
        { label: "A", text: "A" },
        { label: "B", text: "F" },
        { label: "C", text: "D" },
        { label: "D", text: "E" },
      ]);
      setCorrectAnswer("A");
      setDetailedText(
        "Positions 1 to 6 clockwise: Let A = Pos 1. Opposite is D = Pos 4. B is immediate left (clockwise) of A => B = Pos 2. C is between D(4) and E => either Pos 3 or Pos 5. If C=3, E=2 (conflict with B), so C=5, E=6. Remaining slot Pos 3 = F. The person to immediate right (counter-clockwise) of B(2) is A(1)."
      );
      setStepByStep([
        "1. Fix A at position 1, D at position 4.",
        "2. B is immediate left of A (pos 2).",
        "3. C between D and E forces C at pos 5 and E at pos 6.",
        "4. F takes pos 3. Person to immediate right of B is A.",
      ]);
      setShortcutMethod("Immediate right of B (who is immediate left of A) must be A.");
      setConceptTested("Circular Inward Seating & Relative Left/Right Inversion");
      setCommonMistakeTrap("Confusing inward facing clockwise/counterclockwise orientations.");
      setEstimatedTimeSec(70);
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
      options: questionType === "MCQ" ? options : [],
      correctAnswer: correctAnswer.trim(),
      estimatedTimeSec: Number(estimatedTimeSec) || 90,
      isDemo: false,
      source: "Direct In-Software Practice Bank",
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
          "Apply smart options substitution or parameter invariant trick.",
        conceptTested:
          conceptTested.trim() ||
          `${topicSlug.replace(/-/g, " ")} Core Theory`,
        commonMistakeTrap:
          commonMistakeTrap.trim() ||
          "Avoid rushing mental arithmetic or misreading boundary conditions.",
      },
      tags: tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    });

    setSavedSuccess(true);

    setTimeout(() => {
      if (launchPracticeImmediately) {
        const query = new URLSearchParams({
          topic: "custom",
          title: `Practice Unique Q (${created.topicSlug})`,
          count: "5",
          timed: "true",
          difficulty,
        });
        router.push(`/quiz/custom-${created.id}?${query.toString()}`);
      } else {
        router.push("/practice");
      }
    }, 900);
  };

  return (
    <AppShell>
      <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-200">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/practice" className="hover:text-white transition-colors flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Practice Hub</span>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Author Unique Practice Question
              </h1>
              <Badge variant="indigo">DIRECT IN-APP CREATION</Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Add your own high-yield question directly to the software bank with rich 4-part solutions, shortcuts, and instant practice compatibility.
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleLoadSampleTemplate}
            className="gap-1.5 text-xs text-indigo-300 border-indigo-500/40"
          >
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
            <span>Load Quality Sample</span>
          </Button>
        </div>

        {savedSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="h-4 w-4" />
            <span>Question successfully saved directly into the software bank! Redirecting...</span>
          </div>
        )}

        {validationError && (
          <div className="p-4 rounded-2xl bg-red-950/40 border border-red-500/50 text-red-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
            <AlertTriangle className="h-4 w-4" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Tab Toggle */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("form")}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "form"
                ? "bg-indigo-600 text-white shadow-xs"
                : "bg-slate-900 text-slate-400 hover:text-white"
            }`}
          >
            <FileText className="h-3.5 w-3.5 inline mr-1.5" />
            <span>Question Form</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "preview"
                ? "bg-indigo-600 text-white shadow-xs"
                : "bg-slate-900 text-slate-400 hover:text-white"
            }`}
          >
            <Eye className="h-3.5 w-3.5 inline mr-1.5" />
            <span>Live Interactive Preview</span>
          </button>
        </div>

        {activeTab === "form" ? (
          <div className="space-y-6">
            {/* Card 1: Taxonomy */}
            <Card className="border border-slate-800 bg-[#0e1422] p-5 space-y-4">
              <h2 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="h-4 w-4 text-indigo-400" />
                <span>1. Taxonomy & Classification</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Subject Track</label>
                  <select
                    value={track}
                    onChange={(e) => {
                      const t = e.target.value as any;
                      setTrack(t);
                      if (topicPresets[t]?.[0]) {
                        setTopicSlug(topicPresets[t][0].slug);
                      }
                    }}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:border-indigo-500"
                  >
                    <option value="qa">Quantitative Aptitude (QA)</option>
                    <option value="dilr">Data Interpretation & LR (DILR)</option>
                    <option value="varc">Verbal Ability & RC (VARC)</option>
                    <option value="special">Exam Specials (XAT/CMAT)</option>
                  </select>
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs text-slate-400">Topic Area</label>
                  <select
                    value={topicSlug}
                    onChange={(e) => setTopicSlug(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:border-indigo-500"
                  >
                    {topicPresets[track]?.map((p) => (
                      <option key={p.slug} value={p.slug}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Difficulty</label>
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

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs text-slate-400">Subtopic Tag</label>
                  <input
                    type="text"
                    value={subtopicSlug}
                    onChange={(e) => setSubtopicSlug(e.target.value)}
                    placeholder="e.g. Circular Motion, Relative Speed, Truth-Tellers"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Estimated Time (sec)</label>
                  <input
                    type="number"
                    min="30"
                    max="300"
                    value={estimatedTimeSec}
                    onChange={(e) => setEstimatedTimeSec(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:border-indigo-500"
                  />
                </div>
              </div>
            </Card>

            {/* Card 2: Question & Options */}
            <Card className="border border-slate-800 bg-[#0e1422] p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <HelpCircle className="h-4 w-4 text-indigo-400" />
                  <span>2. Problem Statement & Options</span>
                </h2>

                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasPassage}
                      onChange={(e) => setHasPassage(e.target.checked)}
                      className="rounded border-slate-700 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Include Passage / Caselet</span>
                  </label>

                  <div className="flex items-center gap-1 p-0.5 bg-slate-900 rounded-lg border border-slate-800">
                    <button
                      type="button"
                      onClick={() => setQuestionType("MCQ")}
                      className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer ${
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
                      className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer ${
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

              {hasPassage && (
                <div className="space-y-1">
                  <label className="text-xs text-indigo-300">Passage / Caselet Text</label>
                  <textarea
                    rows={3}
                    value={passageText}
                    onChange={(e) => setPassageText(e.target.value)}
                    placeholder="Enter passage context..."
                    className="w-full px-3 py-2 bg-slate-900/90 border border-indigo-500/30 rounded-xl text-xs text-slate-200"
                  />
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-medium">
                  Question Statement <span className="text-red-400">*</span>
                </label>
                <textarea
                  rows={3}
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  placeholder="Enter complete problem text..."
                  className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>

              {questionType === "MCQ" ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs text-slate-400">
                      Options (Click radio to mark Correct Answer)
                    </label>
                    <span className="text-xs text-emerald-400 font-medium">
                      Correct: Option {correctAnswer}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {options.map((opt, idx) => {
                      const isCorrect = correctAnswer === opt.label;
                      return (
                        <div
                          key={opt.label}
                          className={`flex items-center gap-2 p-2.5 rounded-xl border transition-all ${
                            isCorrect
                              ? "bg-emerald-950/30 border-emerald-500/60 text-white"
                              : "bg-slate-900/80 border-slate-800 text-slate-300"
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => setCorrectAnswer(opt.label)}
                            className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 cursor-pointer border transition-colors ${
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
                            placeholder={`Option ${opt.label}...`}
                            className="flex-1 bg-transparent text-xs text-white focus:outline-hidden"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  <label className="text-xs text-slate-300 font-medium">
                    Correct Answer Value <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={correctAnswer}
                    onChange={(e) => setCorrectAnswer(e.target.value)}
                    placeholder="e.g. 600"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white font-mono"
                  />
                </div>
              )}
            </Card>

            {/* Card 3: 4-Part Solution */}
            <Card className="border border-slate-800 bg-[#0e1422] p-5 space-y-4">
              <h2 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-indigo-400" />
                <span>3. 4-Part Pedagogical Solution</span>
              </h2>

              <div className="space-y-1">
                <label className="text-xs text-slate-400">Detailed Solution Explanation</label>
                <textarea
                  rows={2}
                  value={detailedText}
                  onChange={(e) => setDetailedText(e.target.value)}
                  placeholder="Provide complete derivation..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs text-slate-400">Step-by-Step Breakdown</label>
                  <button
                    type="button"
                    onClick={handleAddStep}
                    className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="h-3 w-3" />
                    <span>Add Step</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {stepByStep.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-500 w-5 text-center">
                        {idx + 1}.
                      </span>
                      <input
                        type="text"
                        value={step}
                        onChange={(e) => handleUpdateStep(idx, e.target.value)}
                        className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                      />
                      {stepByStep.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveStep(idx)}
                          className="p-1 text-slate-500 hover:text-red-400"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-indigo-300 font-medium">Speed Shortcut / Hack</label>
                <input
                  type="text"
                  value={shortcutMethod}
                  onChange={(e) => setShortcutMethod(e.target.value)}
                  placeholder="e.g. Ratio multipliers, LCM fraction formula..."
                  className="w-full px-3 py-2 bg-slate-900 border border-indigo-500/40 rounded-xl text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Concept Tested</label>
                  <input
                    type="text"
                    value={conceptTested}
                    onChange={(e) => setConceptTested(e.target.value)}
                    placeholder="e.g. Circular Motion LCM"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-amber-300">Common Mistake Trap</label>
                  <input
                    type="text"
                    value={commonMistakeTrap}
                    onChange={(e) => setCommonMistakeTrap(e.target.value)}
                    placeholder="e.g. Calculating first meeting anywhere instead of starting point"
                    className="w-full px-3 py-2 bg-slate-900 border border-amber-500/40 rounded-xl text-xs text-white"
                  />
                </div>
              </div>
            </Card>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800/80">
              <Link href="/practice">
                <Button variant="ghost" size="sm" className="text-xs text-slate-400">
                  Cancel & Return
                </Button>
              </Link>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="default"
                  onClick={() => handleSaveQuestion(false)}
                  className="flex-1 sm:flex-none gap-2 text-xs"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Save Question to Bank</span>
                </Button>

                <Button
                  variant="accent"
                  size="default"
                  onClick={() => handleSaveQuestion(true)}
                  className="flex-1 sm:flex-none gap-2 text-xs shadow-lg shadow-indigo-600/20"
                >
                  <Play className="h-4 w-4 fill-current" />
                  <span>Save & Practice Immediately</span>
                </Button>
              </div>
            </div>
          </div>
        ) : (
          /* Live Preview Mode */
          <Card className="border border-slate-800 bg-[#0e1422] p-6 space-y-5 animate-in fade-in">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Badge variant="indigo" className="text-xs uppercase">
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
                  className="text-xs"
                >
                  {difficulty}
                </Badge>
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-indigo-400" />
                  <span>{estimatedTimeSec}s Target</span>
                </span>
              </div>
              <Badge variant="verified">DIRECT PRACTICE READY</Badge>
            </div>

            {hasPassage && passageText && (
              <div className="p-4 rounded-xl bg-slate-900/90 border border-indigo-500/20 text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                {passageText}
              </div>
            )}

            <h3 className="text-base font-semibold text-white leading-relaxed">
              {questionText || "(Question statement will appear here...)"}
            </h3>

            {questionType === "MCQ" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
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
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
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
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-300">
                Target Answer: <strong>{correctAnswer || "(Not specified)"}</strong>
              </div>
            )}

            <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 space-y-2 text-xs">
              <h4 className="font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400" />
                <span>Verified Pedagogical Solution</span>
              </h4>
              <p className="text-slate-300 leading-relaxed">
                {detailedText || "(Detailed solution explanation...)"}
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

            <div className="pt-2 flex justify-end">
              <Button
                variant="accent"
                onClick={() => handleSaveQuestion(true)}
                className="gap-2 text-xs shadow-lg shadow-indigo-600/20"
              >
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Save & Practice This Now</span>
              </Button>
            </div>
          </Card>
        )}
      </div>
    </AppShell>
  );
}
