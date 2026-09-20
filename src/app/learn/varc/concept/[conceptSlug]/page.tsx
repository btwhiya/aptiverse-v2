"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  Brain,
  Lightbulb,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Zap,
  Target,
  Clock,
  Compass,
  Layers,
  ChevronRight,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  VARC_CONCEPTS,
  RC_PASSAGES,
  getStoredVARCProgress,
  recordVARCAttempt,
  VARCDifficulty,
} from "@/lib/varc";

export default function VARCConceptDetailPage({
  params,
}: {
  params: Promise<{ conceptSlug: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const concept = VARC_CONCEPTS.find((c) => c.id === resolvedParams.conceptSlug);

  if (!concept) {
    notFound();
  }

  // Interactive worked example state
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"THEORY" | "STEPS" | "TRAPS" | "EXAMPLE">("THEORY");

  const progress = getStoredVARCProgress();
  const currentStat = progress[concept.id] || {
    attempts: 0,
    correct: 0,
    accuracy: 0,
    status: "NOT_STARTED",
  };

  const handleOptionSelect = (label: string) => {
    if (isRevealed) return;
    setSelectedOpt(label);
  };

  const handleCheckExample = () => {
    if (!selectedOpt) return;
    setIsRevealed(true);
    const isCorrect = selectedOpt === concept.workedExample.correctAnswer;
    recordVARCAttempt(concept.id, isCorrect);
  };

  const handleLaunchPractice = (diff: VARCDifficulty) => {
    if (concept.section === "RC") {
      // Find a passage matching this difficulty or containing questions of this concept
      const targetPassage =
        RC_PASSAGES.find((p) => p.difficulty === diff && p.questions.some((q) => q.conceptId === concept.id)) ||
        RC_PASSAGES.find((p) => p.questions.some((q) => q.conceptId === concept.id)) ||
        RC_PASSAGES[0];
      router.push(`/learn/varc/rc/${targetPassage.id}`);
    } else {
      router.push(`/learn/varc/va/${concept.id}`);
    }
  };

  return (
    <AppShell>
      <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-200">
        {/* Top Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/learn/varc" className="hover:text-white transition-colors flex items-center gap-1">
            <ArrowLeft className="h-3.5 w-3.5 mr-1" />
            <span>VARC Hub</span>
          </Link>
          <span>/</span>
          <span className="text-slate-500 uppercase">{concept.section}</span>
          <span>/</span>
          <span className="text-emerald-400 font-semibold">{concept.title}</span>
        </div>

        {/* Concept Masterclass Header */}
        <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/80 shadow-2xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Badge variant="success" className="text-[11px] font-bold">
                {concept.section} MASTERCLASS
              </Badge>
              <Badge variant="indigo" className="text-[11px] font-bold">
                {concept.catWeightage} Weightage in CAT
              </Badge>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-slate-400">Status:</span>
              <span className="text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                {currentStat.status}
              </span>
              <span className="text-slate-300 font-bold">
                {currentStat.accuracy}% Accuracy ({currentStat.attempts} attempts)
              </span>
            </div>
          </div>

          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {concept.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
              {concept.shortDesc}
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-700/60 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">Exam Frequency</span>
              <span className="text-white font-bold">{concept.averageQuestionsInCAT}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">Curated Questions</span>
              <span className="text-emerald-400 font-bold font-mono">{concept.practiceCount}+ Practice Items</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">Strategy Traps</span>
              <span className="text-amber-400 font-bold font-mono">{concept.commonTraps.length} Classic Traps</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">Target Time</span>
              <span className="text-indigo-300 font-bold font-mono">~90-110 sec / Q</span>
            </div>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/90 border border-slate-800 w-full overflow-x-auto">
          <button
            onClick={() => setActiveTab("THEORY")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all shrink-0 ${
              activeTab === "THEORY"
                ? "bg-emerald-600 text-white shadow-md"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            1. What It Is &amp; Why CAT Tests It
          </button>
          <button
            onClick={() => setActiveTab("STEPS")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all shrink-0 ${
              activeTab === "STEPS"
                ? "bg-emerald-600 text-white shadow-md"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            2. 4-Step Systematic Method
          </button>
          <button
            onClick={() => setActiveTab("TRAPS")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all shrink-0 ${
              activeTab === "TRAPS"
                ? "bg-emerald-600 text-white shadow-md"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            3. Common CAT Traps
          </button>
          <button
            onClick={() => setActiveTab("EXAMPLE")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all shrink-0 ${
              activeTab === "EXAMPLE"
                ? "bg-emerald-600 text-white shadow-md"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            4. Interactive Worked Example
          </button>
        </div>

        {/* TAB CONTENT */}
        <div className="space-y-6">
          {/* TAB 1: THEORY */}
          {activeTab === "THEORY" && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <Card className="p-6 bg-slate-900/90 border border-slate-800 rounded-xl space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
                  <Lightbulb className="w-5 h-5 text-amber-400" />
                  <h3 className="text-base font-bold text-white">What is this Concept?</h3>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                  {concept.whatIsIt}
                </p>
              </Card>

              <Card className="p-6 bg-slate-900/90 border border-slate-800 rounded-xl space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
                  <Brain className="w-5 h-5 text-indigo-400" />
                  <h3 className="text-base font-bold text-white">Why Does CAT Test It?</h3>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {concept.whyCatTests}
                </p>
              </Card>

              <Card className="p-6 bg-slate-900/90 border border-slate-800 rounded-xl space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
                  <Compass className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-base font-bold text-white">How to Identify Signals in the Text</h3>
                </div>
                <ul className="space-y-2.5 text-sm text-slate-300">
                  {concept.howToIdentify.map((signal, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {sIdx + 1}
                      </span>
                      <span>{signal}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          )}

          {/* TAB 2: 4-STEP METHOD */}
          {activeTab === "STEPS" && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
                <h3 className="text-sm font-bold text-white mb-1">Algorithmic Step-by-Step Execution</h3>
                <p className="text-xs text-slate-400">Follow this reproducible 4-step sequence under exam pressure to eliminate guesswork.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {concept.stepByStepMethod.map((step) => (
                  <Card key={step.step} className="p-5 bg-slate-900/90 border border-slate-800 rounded-xl space-y-2">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                        {step.step}
                      </span>
                      <h4 className="text-sm font-bold text-white">{step.title}</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                      {step.instruction}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: TRAPS */}
          {activeTab === "TRAPS" && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
                <h3 className="text-sm font-bold text-white mb-1">Common CAT Distractor Traps</h3>
                <p className="text-xs text-slate-400">CAT question setters design options to trigger specific cognitive biases. Learn to spot them instantly.</p>
              </div>

              <div className="space-y-3">
                {concept.commonTraps.map((trap, tIdx) => (
                  <Card key={tIdx} className="p-5 bg-slate-900/90 border border-slate-800 rounded-xl space-y-3">
                    <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                      <AlertTriangle className="w-4 h-4" />
                      <span>{trap.trapName}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {trap.description}
                    </p>
                    <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-200 flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-emerald-300">How to Avoid: </strong>
                        {trap.howToAvoid}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: INTERACTIVE WORKED EXAMPLE */}
          {activeTab === "EXAMPLE" && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <Card className="p-6 bg-slate-900/90 border border-slate-800 rounded-xl space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-indigo-400" />
                    <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                      Worked Mini-Example
                    </h3>
                  </div>
                  <Badge variant="indigo" className="text-[10px]">
                    CAT STANDARD BENCHMARK
                  </Badge>
                </div>

                {/* Stimulus Paragraph */}
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {concept.workedExample.paragraph}
                  </p>
                </div>

                {/* Question Prompt */}
                <h4 className="text-sm sm:text-base font-bold text-white">
                  {concept.workedExample.questionPrompt}
                </h4>

                {/* Options List */}
                <div className="space-y-2.5">
                  {concept.workedExample.options.map((opt) => {
                    const isSelected = selectedOpt === opt.label;
                    const isCorrect = opt.label === concept.workedExample.correctAnswer;

                    let optClass = "bg-slate-800/60 hover:bg-slate-800 text-slate-200 border-slate-700/70";

                    if (isSelected && !isRevealed) {
                      optClass = "bg-emerald-600/20 text-emerald-200 border-emerald-500 shadow-md";
                    }

                    if (isRevealed) {
                      if (isCorrect) {
                        optClass = "bg-emerald-600/20 text-emerald-200 border-emerald-500 font-semibold";
                      } else if (isSelected && !isCorrect) {
                        optClass = "bg-rose-600/20 text-rose-200 border-rose-500 line-through opacity-80";
                      } else {
                        optClass = "bg-slate-800/40 text-slate-400 border-slate-800 opacity-60";
                      }
                    }

                    return (
                      <button
                        key={opt.label}
                        disabled={isRevealed}
                        onClick={() => handleOptionSelect(opt.label)}
                        className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3.5 ${optClass}`}
                      >
                        <span
                          className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold border shrink-0 transition-colors ${
                            isSelected
                              ? "bg-emerald-600 text-white border-emerald-400"
                              : "bg-slate-700 text-slate-300 border-slate-600"
                          }`}
                        >
                          {opt.label}
                        </span>
                        <span className="text-xs sm:text-sm leading-relaxed">{opt.text}</span>
                        {isRevealed && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 ml-auto shrink-0 mt-0.5" />
                        )}
                        {isRevealed && isSelected && !isCorrect && (
                          <XCircle className="w-4 h-4 text-rose-400 ml-auto shrink-0 mt-0.5" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Check Answer Button */}
                {!isRevealed && (
                  <div className="pt-2">
                    <Button
                      disabled={!selectedOpt}
                      onClick={handleCheckExample}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-2.5"
                    >
                      Check Answer &amp; Reveal Deductive Breakdown
                    </Button>
                  </div>
                )}

                {/* Solution Breakdown Section */}
                {isRevealed && concept.workedExample.explanation && (
                  <div className="mt-6 pt-6 border-t border-slate-800 space-y-4 animate-in fade-in duration-200">
                    <div className="flex items-center gap-2 text-sm font-bold text-white">
                      <Lightbulb className="w-4 h-4 text-amber-400" />
                      <span>Detailed Reasoning Breakdown</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {concept.workedExample.explanation.detailed}
                    </p>

                    {/* Per-Option Analysis */}
                    <div className="space-y-2 p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                      <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                        Why the other options are wrong:
                      </h5>
                      {concept.workedExample.explanation.optionsBreakdown.map((item) => (
                        <div key={item.label} className="text-xs flex items-start gap-2">
                          <span
                            className={`font-mono font-bold px-1.5 py-0.5 rounded text-[10px] shrink-0 mt-0.5 ${
                              item.isCorrect
                                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                                : "bg-rose-500/20 text-rose-400 border border-rose-500/40"
                            }`}
                          >
                            Option {item.label}
                          </span>
                          <span className="text-slate-300 leading-relaxed">{item.analysis}</span>
                        </div>
                      ))}
                    </div>

                    {/* CAT Tip & Trap */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                      <div className="p-3 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-200 flex items-start gap-2">
                        <Zap className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-indigo-300">CAT Strategy Tip: </strong>
                          {concept.workedExample.explanation.catTip}
                        </div>
                      </div>
                      <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-500/30 text-xs text-rose-200 flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-rose-300">Common Trap: </strong>
                          {concept.workedExample.explanation.commonTrap}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          )}
        </div>

        {/* Practice This Concept: Multi-Tier Challenge Footer */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/80 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Practice This Concept in CAT Passages</h3>
              <p className="text-xs text-slate-400">Choose your target difficulty to progress from Foundation to 99th percentile.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Button
              onClick={() => handleLaunchPractice("FOUNDATION")}
              variant="outline"
              className="border-slate-700 hover:border-emerald-500 hover:bg-emerald-950/20 text-slate-200 font-semibold text-xs py-3 flex items-center justify-between"
            >
              <span>1. Foundation Practice</span>
              <ChevronRight className="w-4 h-4 text-emerald-400" />
            </Button>
            <Button
              onClick={() => handleLaunchPractice("CAT")}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 flex items-center justify-between shadow-lg shadow-emerald-600/20"
            >
              <span>2. CAT Standard Drill</span>
              <ChevronRight className="w-4 h-4 text-white" />
            </Button>
            <Button
              onClick={() => handleLaunchPractice("CAT_HARD")}
              variant="outline"
              className="border-slate-700 hover:border-rose-500 hover:bg-rose-950/20 text-slate-200 font-semibold text-xs py-3 flex items-center justify-between"
            >
              <span>3. CAT Hard (99%ile)</span>
              <ChevronRight className="w-4 h-4 text-rose-400" />
            </Button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
