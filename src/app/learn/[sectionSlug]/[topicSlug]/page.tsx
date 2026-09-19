"use client";

import React, { useState, use, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Target,
  ArrowRight,
  Clock,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Award,
  RotateCcw,
  Check,
  HelpCircle,
  Play,
  Layers,
  Flame,
  FileCheck2,
  XCircle
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getQuantTopicBySlug } from "@/lib/quant";
import { getDILRTopicBySlug } from "@/lib/dilr";
import { QuestionGraphViewer } from "@/components/practice/QuestionGraphViewer";
import { TopicTheoryGraphShowcase } from "@/components/practice/TopicTheoryGraphShowcase";
import confetti from "canvas-confetti";

export default function QuantTopicReaderPage({
  params,
}: {
  params: Promise<{ sectionSlug: string; topicSlug: string }>;
}) {
  const resolvedParams = use(params);
  const isDILR =
    resolvedParams.sectionSlug.toLowerCase().includes("dilr") ||
    resolvedParams.sectionSlug.toLowerCase() === "di" ||
    resolvedParams.sectionSlug.toLowerCase() === "lr";

  const topicData = isDILR
    ? getDILRTopicBySlug(resolvedParams.topicSlug) || getQuantTopicBySlug(resolvedParams.topicSlug)
    : getQuantTopicBySlug(resolvedParams.topicSlug) || getDILRTopicBySlug(resolvedParams.topicSlug);

  const [activeTab, setActiveTab] = useState<"THEORY" | "PRACTICE" | "TEST">("THEORY");
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Practice state
  const [practiceAnswers, setPracticeAnswers] = useState<Record<number, string>>({});
  const [revealedSolutions, setRevealedSolutions] = useState<Record<number, boolean>>({});
  const [practiceFilter, setPracticeFilter] = useState<"ALL" | "EASY" | "MEDIUM" | "HARD">("ALL");

  // Test state
  const [testActive, setTestActive] = useState(false);
  const [testCurrentIndex, setTestCurrentIndex] = useState(0);
  const [testAnswers, setTestAnswers] = useState<Record<number, string>>({});
  const [testTimeRemaining, setTestTimeRemaining] = useState<number>(2400); // 40 minutes = 2400 sec
  const [testSubmitted, setTestSubmitted] = useState(false);

  // Test Timer
  useEffect(() => {
    let timer: any = null;
    if (testActive && !testSubmitted && testTimeRemaining > 0) {
      timer = setInterval(() => {
        setTestTimeRemaining((prev) => {
          if (prev <= 1) {
            setTestSubmitted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [testActive, testSubmitted, testTimeRemaining]);

  if (!topicData) {
    return (
      <AppShell>
        <div className="p-12 text-center text-slate-400">
          Topic not found. Please return to{" "}
          <Link href={`/learn/${resolvedParams.sectionSlug}`} className="text-indigo-400 underline">
            Topics list
          </Link>
          .
        </div>
      </AppShell>
    );
  }

  const { explanation, practiceQuestions, testQuestions } = topicData;

  const filteredPractice = practiceFilter === "ALL"
    ? practiceQuestions
    : practiceQuestions.filter((q) => q.difficulty === practiceFilter);

  // Test evaluation calculation
  const totalTestQ = testQuestions.length;
  let correctCount = 0;
  let incorrectCount = 0;
  let skippedCount = 0;
  let totalScore = 0;

  testQuestions.forEach((q, idx) => {
    const ans = testAnswers[idx];
    if (!ans) {
      skippedCount++;
    } else if (ans.trim().toUpperCase() === q.correctAnswer.trim().toUpperCase()) {
      correctCount++;
      totalScore += 3;
    } else {
      incorrectCount++;
      totalScore -= 1;
    }
  });

  const accuracyPct =
    correctCount + incorrectCount > 0
      ? Math.round((correctCount / (correctCount + incorrectCount)) * 100)
      : 0;

  const handleStartTest = () => {
    setTestActive(true);
    setTestSubmitted(false);
    setTestAnswers({});
    setTestTimeRemaining(2400);
    setTestCurrentIndex(0);
  };

  const handleSubmitTest = () => {
    setTestSubmitted(true);
    setTestActive(false);
    try {
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    } catch {}
  };

  const formatSec = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <AppShell>
      <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-200 pb-16">
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <Link
            href={`/learn/${resolvedParams.sectionSlug}`}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back to {resolvedParams.sectionSlug.toUpperCase()} Topics</span>
          </Link>

          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-slate-400 border-slate-800 text-xs">
              {topicData.domain}
            </Badge>
            <Badge variant="indigo" className="text-xs">
              {explanation.catWeightage}
            </Badge>
            <button
              onClick={() => setIsBookmarked((prev) => !prev)}
              className={`p-2 rounded-xl border text-xs transition-colors cursor-pointer ${
                isBookmarked
                  ? "bg-indigo-600/20 text-indigo-400 border-indigo-500/40"
                  : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
              }`}
              title="Bookmark Topic"
            >
              <Bookmark className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Hero Topic Title Bar */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-slate-900 to-slate-950 border border-slate-800/90 relative overflow-hidden">
          <div className="space-y-2 relative z-10">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {topicData.name}
            </h1>
            <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
              {explanation.overview}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2 font-mono">
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-amber-400" />
                Target Time: {explanation.recommendedTime}
              </span>
              <span className="flex items-center gap-1">
                <Target className="h-3.5 w-3.5 text-indigo-400" />
                Focus Areas: {explanation.typicalQuestions}
              </span>
            </div>
          </div>
        </div>

        {/* 3 Main Interactive Tabs */}
        <div className="flex items-center border-b border-slate-800 gap-2">
          <button
            onClick={() => setActiveTab("THEORY")}
            className={`px-4 py-3 text-sm font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === "THEORY"
                ? "border-indigo-500 text-white bg-indigo-500/10 rounded-t-xl"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <BookOpen className="h-4 w-4 text-indigo-400" />
            <span>1. Concept Theory & Formula Vault</span>
          </button>

          <button
            onClick={() => setActiveTab("PRACTICE")}
            className={`px-4 py-3 text-sm font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === "PRACTICE"
                ? "border-emerald-500 text-white bg-emerald-500/10 rounded-t-xl"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <Zap className="h-4 w-4 text-emerald-400" />
            <span>2. 20 Curated Practice Questions</span>
            <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">
              20
            </span>
          </button>

          <button
            onClick={() => setActiveTab("TEST")}
            className={`px-4 py-3 text-sm font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === "TEST"
                ? "border-purple-500 text-white bg-purple-500/10 rounded-t-xl"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <Target className="h-4 w-4 text-purple-400" />
            <span>3. 20-Question Chapter Test</span>
            <span className="px-1.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-mono">
              Timed
            </span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: THEORY & FORMULAS */}
        {/* ========================================================================= */}
        {activeTab === "THEORY" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Interactive Concept Visualizer for Graph Topics */}
            <TopicTheoryGraphShowcase topicSlug={topicData.slug} />

            {/* Core Theorems & Methods */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-indigo-400" />
                <span>Core Theorems & Mathematical Frameworks</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {explanation.coreTheorems.map((theorem, idx) => (
                  <Card key={idx} className="bg-[#0b0f19] border-slate-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-bold text-indigo-300">
                        {theorem.heading}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-slate-300 leading-relaxed">
                      {theorem.details}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Formula Vault */}
            <Card className="bg-[#0b0f19] border-slate-800">
              <CardHeader className="pb-3 border-b border-slate-800/80">
                <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-indigo-400" />
                  <span>High-Yield CAT Formula Sheet</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                  {explanation.keyFormulas.map((formula, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 flex items-start gap-2.5"
                    >
                      <span className="h-5 w-5 rounded bg-indigo-600/20 text-indigo-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{formula}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* CAT Speed Tricks & Traps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Speed Tricks */}
              <Card className="bg-[#081320] border-cyan-900/40">
                <CardHeader className="pb-3 border-b border-cyan-900/30">
                  <CardTitle className="text-sm font-bold text-cyan-300 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-cyan-400" />
                    <span>CAT 20-Second Shortcuts & Speed Tricks</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-3">
                  {explanation.catTricks.map((trick, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-cyan-100/90">
                      <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{trick}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Common Pitfalls & Traps */}
              <Card className="bg-[#1c0d12] border-rose-950/60">
                <CardHeader className="pb-3 border-b border-rose-950/40">
                  <CardTitle className="text-sm font-bold text-rose-300 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-rose-400" />
                    <span>Common Traps (What 90% of Students Get Wrong)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-3">
                  {explanation.commonTraps.map((trap, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-rose-100/90">
                      <AlertTriangle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                      <span>{trap}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Next Steps Prompt */}
            <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-800/40 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Ready to test your understanding?</h3>
                <p className="text-xs text-slate-400">
                  Solve 20 curated practice questions with step-by-step solutions and speed tricks.
                </p>
              </div>
              <Button
                onClick={() => setActiveTab("PRACTICE")}
                className="bg-indigo-600 hover:bg-indigo-500 text-white gap-2"
              >
                <span>Start Practice Drill</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: 20 PRACTICE QUESTIONS (Interactive with Solutions) */}
        {/* ========================================================================= */}
        {activeTab === "PRACTICE" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Filter Bar */}
            <div className="flex items-center justify-between gap-4 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-xs font-semibold text-slate-300">
                Showing {filteredPractice.length} of 20 Practice Questions
              </span>

              <div className="flex items-center gap-1.5">
                {(["ALL", "EASY", "MEDIUM", "HARD"] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setPracticeFilter(lvl)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      practiceFilter === lvl
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-6">
              {filteredPractice.map((q, idx) => {
                const isSelected = practiceAnswers[q.questionNumber];
                const isRevealed = revealedSolutions[q.questionNumber];

                return (
                  <Card
                    key={q.id}
                    className="bg-[#0b0f19] border-slate-800 overflow-hidden shadow-lg shadow-black/20"
                  >
                    <CardHeader className="pb-3 border-b border-slate-800/80">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="h-6 px-2.5 rounded-md bg-indigo-600/20 text-indigo-400 text-xs font-bold font-mono flex items-center justify-center">
                            Practice Q{q.questionNumber}
                          </span>
                          <Badge
                            variant={
                              q.difficulty === "EASY"
                                ? "success"
                                : q.difficulty === "MEDIUM"
                                ? "indigo"
                                : "destructive"
                            }
                            className="text-[10px]"
                          >
                            {q.difficulty}
                          </Badge>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {q.questionType}
                          </span>
                        </div>

                        <span className="text-[11px] text-slate-500 font-mono">
                          ~{q.estimatedTimeSec}s
                        </span>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-4 space-y-4">
                      {/* Graph / Chart Visualizer if applicable */}
                      <QuestionGraphViewer question={q} />

                      <p className="text-sm text-slate-100 font-medium leading-relaxed whitespace-pre-line">
                        {q.questionText}
                      </p>

                      {/* Options Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {q.options.map((opt) => {
                          const chosen = isSelected === opt.label;
                          const isAnswered = !!isSelected;
                          const isCorrectOption = opt.label === q.correctAnswer;
                          const isCorrect = (chosen && isCorrectOption) || ((isAnswered || isRevealed) && isCorrectOption);
                          const isWrong = chosen && !isCorrectOption;

                          return (
                            <button
                              key={opt.label}
                              onClick={() =>
                                setPracticeAnswers((prev) => ({
                                  ...prev,
                                  [q.questionNumber]: opt.label,
                                }))
                              }
                              className={`p-3 rounded-xl border text-left text-xs font-medium transition-all flex items-start gap-3 cursor-pointer ${
                                isCorrect
                                  ? "bg-emerald-950/70 border-emerald-500 text-emerald-100 ring-1 ring-emerald-500/30"
                                  : isWrong
                                  ? "bg-rose-950/70 border-rose-500 text-rose-100 ring-1 ring-rose-500/30"
                                  : "bg-slate-900/90 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
                              }`}
                            >
                              <span
                                className={`h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                                  isCorrect
                                    ? "bg-emerald-500 text-slate-950"
                                    : isWrong
                                    ? "bg-rose-500 text-white"
                                    : "bg-slate-800 text-slate-400"
                                }`}
                              >
                                {opt.label}
                              </span>
                              <span className="flex-1">{opt.text}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Reveal Solution Button & Feedback */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
                        <div>
                          {isSelected ? (
                            isSelected === q.correctAnswer ? (
                              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 animate-in fade-in">
                                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                                <span>Correct! Option {isSelected} is the right answer.</span>
                              </span>
                            ) : (
                              <span className="text-xs font-semibold text-rose-400 flex items-center gap-1.5 animate-in fade-in">
                                <XCircle className="h-4 w-4 text-rose-400 shrink-0" />
                                <span>Incorrect (Option {isSelected}). Correct is Option {q.correctAnswer}.</span>
                              </span>
                            )
                          ) : (
                            <span className="text-xs text-slate-400 font-mono">
                              Select an option to test
                            </span>
                          )}
                        </div>

                        <Button
                          variant={isRevealed ? "secondary" : "outline"}
                          size="sm"
                          onClick={() =>
                            setRevealedSolutions((prev) => ({
                              ...prev,
                              [q.questionNumber]: !prev[q.questionNumber],
                            }))
                          }
                          className="text-xs gap-1.5 h-8"
                        >
                          <HelpCircle className="h-3.5 w-3.5 text-indigo-400" />
                          <span>{isRevealed ? "Hide Solution" : "Show Detailed Solution & Shortcut"}</span>
                        </Button>
                      </div>

                      {/* Detailed Solution Block */}
                      {isRevealed && (
                        <div className="p-4 rounded-xl bg-slate-900/90 border border-indigo-900/40 space-y-3 animate-in fade-in duration-150">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                            <span className="text-xs font-bold text-emerald-300 font-mono">
                              Correct Answer: Option {q.correctAnswer}
                            </span>
                          </div>

                          <div className="text-xs text-slate-200 leading-relaxed font-sans">
                            <span className="font-semibold text-indigo-300 block mb-1">
                              Step-by-Step Mathematical Proof:
                            </span>
                            {q.detailedSolution}
                          </div>

                          {q.shortcutMethod && (
                            <div className="p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-900/50 text-xs text-cyan-200">
                              <span className="font-bold text-cyan-400 block mb-0.5">
                                ⚡ CAT 20-Second Shortcut Method:
                              </span>
                              {q.shortcutMethod}
                            </div>
                          )}

                          {q.commonTrap && (
                            <div className="p-2.5 rounded-lg bg-rose-950/40 border border-rose-900/50 text-xs text-rose-200">
                              <span className="font-bold text-rose-400 block mb-0.5">
                                ⚠️ Trap Alert:
                              </span>
                              {q.commonTrap}
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: 20-QUESTION CHAPTER TEST (Timed Exam Runner) */}
        {/* ========================================================================= */}
        {activeTab === "TEST" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {!testActive && !testSubmitted && (
              <Card className="bg-[#0b0f19] border-slate-800 text-center py-12 px-6">
                <CardContent className="space-y-6 max-w-xl mx-auto">
                  <div className="h-16 w-16 rounded-2xl bg-purple-600/20 text-purple-400 flex items-center justify-center mx-auto">
                    <Target className="h-8 w-8" />
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-white">
                      Official Chapter Test: {topicData.name}
                    </h2>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Evaluate your speed, accuracy, and percentile rank. Strict CAT exam rules apply:
                      timed 40 minutes, +3 for correct answers, -1 for incorrect MCQs, 0 for TITA questions.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center font-mono">
                    <div>
                      <span className="block text-slate-500 text-[10px]">Questions</span>
                      <span className="text-base font-bold text-white">20 Qs</span>
                    </div>
                    <div>
                      <span className="block text-slate-500 text-[10px]">Duration</span>
                      <span className="text-base font-bold text-amber-400">40 Mins</span>
                    </div>
                    <div>
                      <span className="block text-slate-500 text-[10px]">Max Score</span>
                      <span className="text-base font-bold text-purple-400">60 Marks</span>
                    </div>
                  </div>

                  <Button
                    onClick={handleStartTest}
                    size="lg"
                    className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold gap-2 text-sm shadow-lg shadow-purple-600/25 cursor-pointer"
                  >
                    <Play className="h-4 w-4" />
                    <span>Launch 20-Question Chapter Test</span>
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Live Test Running Interface */}
            {testActive && !testSubmitted && (
              <div className="space-y-4">
                {/* Top Test Bar */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-[#0b0f19] border border-slate-800 sticky top-4 z-20 shadow-xl">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold text-white">
                      CAT Chapter Drill #{testCurrentIndex + 1} / {totalTestQ}
                    </span>
                  </div>

                  {/* Timer */}
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-sm font-bold text-amber-400">
                    <Clock className="h-4 w-4" />
                    <span>{formatSec(testTimeRemaining)}</span>
                  </div>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleSubmitTest}
                    className="text-xs font-bold"
                  >
                    Submit Test
                  </Button>
                </div>

                {/* Main Question Display */}
                {(() => {
                  const q = testQuestions[testCurrentIndex];
                  const chosenOption = testAnswers[testCurrentIndex];

                  return (
                    <Card className="bg-[#0b0f19] border-slate-800">
                      <CardHeader className="pb-3 border-b border-slate-800/80 flex flex-row items-center justify-between">
                        <Badge variant="indigo" className="text-xs font-mono">
                          Question {testCurrentIndex + 1} of {totalTestQ}
                        </Badge>
                        <span className="text-xs text-slate-400 font-mono">
                          +3.0 / -1.0 Marking
                        </span>
                      </CardHeader>

                      <CardContent className="pt-6 space-y-6">
                        {/* Graph / Chart Visualizer if applicable */}
                        <QuestionGraphViewer question={q} />

                        <p className="text-base text-slate-100 font-medium leading-relaxed">
                          {q.questionText}
                        </p>

                        {/* Options */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {q.options.map((opt) => (
                            <button
                              key={opt.label}
                              onClick={() =>
                                setTestAnswers((prev) => ({
                                  ...prev,
                                  [testCurrentIndex]: opt.label,
                                }))
                              }
                              className={`p-3.5 rounded-xl border text-left text-xs font-medium transition-all flex items-start gap-3 cursor-pointer ${
                                chosenOption === opt.label
                                  ? "bg-purple-600/20 border-purple-500 text-white"
                                  : "bg-slate-900/90 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
                              }`}
                            >
                              <span
                                className={`h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                                  chosenOption === opt.label
                                    ? "bg-purple-500 text-white"
                                    : "bg-slate-800 text-slate-400"
                                }`}
                              >
                                {opt.label}
                              </span>
                              <span className="flex-1">{opt.text}</span>
                            </button>
                          ))}
                        </div>

                        {/* Question Navigation Controls */}
                        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={testCurrentIndex === 0}
                            onClick={() => setTestCurrentIndex((prev) => prev - 1)}
                            className="text-xs gap-1"
                          >
                            <ChevronLeft className="h-4 w-4" />
                            <span>Previous</span>
                          </Button>

                          {/* Quick Palette Jump Dots */}
                          <div className="hidden sm:flex items-center gap-1.5">
                            {testQuestions.map((_, i) => (
                              <button
                                key={i}
                                onClick={() => setTestCurrentIndex(i)}
                                className={`h-6 w-6 rounded-md text-[10px] font-mono font-bold transition-all cursor-pointer ${
                                  testCurrentIndex === i
                                    ? "bg-purple-600 text-white ring-2 ring-purple-400/50"
                                    : testAnswers[i]
                                    ? "bg-emerald-600/30 text-emerald-400 border border-emerald-500/40"
                                    : "bg-slate-900 text-slate-500 border border-slate-800 hover:text-white"
                                }`}
                              >
                                {i + 1}
                              </button>
                            ))}
                          </div>

                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => {
                              if (testCurrentIndex < totalTestQ - 1) {
                                setTestCurrentIndex((prev) => prev + 1);
                              } else {
                                handleSubmitTest();
                              }
                            }}
                            className="text-xs gap-1 bg-purple-600 hover:bg-purple-500 text-white"
                          >
                            <span>{testCurrentIndex === totalTestQ - 1 ? "Finish Test" : "Next"}</span>
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })()}
              </div>
            )}

            {/* Test Submitted Result & Detailed Scorecard */}
            {testSubmitted && (
              <div className="space-y-6 animate-in fade-in duration-200">
                {/* Result Hero */}
                <Card className="bg-gradient-to-br from-[#120826] via-[#0b0f19] to-slate-950 border-purple-900/50 text-center py-8 px-6">
                  <CardContent className="space-y-6 max-w-2xl mx-auto">
                    <div className="h-16 w-16 rounded-2xl bg-purple-600/20 text-purple-400 flex items-center justify-center mx-auto">
                      <Award className="h-8 w-8" />
                    </div>

                    <div className="space-y-1">
                      <h2 className="text-2xl font-bold text-white">Test Completed!</h2>
                      <p className="text-xs text-slate-400">
                        Detailed Diagnostic Report for {topicData.name}
                      </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
                      <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                        <span className="block text-[10px] text-slate-500">Total Score</span>
                        <span className="text-lg font-bold text-purple-400">
                          {totalScore} / 60
                        </span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                        <span className="block text-[10px] text-slate-500">Accuracy</span>
                        <span className="text-lg font-bold text-emerald-400">
                          {accuracyPct}%
                        </span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                        <span className="block text-[10px] text-slate-500">Correct</span>
                        <span className="text-lg font-bold text-emerald-400">
                          {correctCount} Qs
                        </span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                        <span className="block text-[10px] text-slate-500">Incorrect</span>
                        <span className="text-lg font-bold text-rose-400">
                          {incorrectCount} Qs
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-3">
                      <Button
                        onClick={handleStartTest}
                        variant="outline"
                        size="sm"
                        className="gap-1.5 text-xs"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        <span>Retake Test</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Question-by-Question Review Breakdown */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <FileCheck2 className="h-4 w-4 text-indigo-400" />
                    <span>Complete Answer Key & Step-by-Step Solutions</span>
                  </h3>

                  {testQuestions.map((q, idx) => {
                    const userAns = testAnswers[idx];
                    const isCorrect = userAns === q.correctAnswer;
                    const isSkipped = !userAns;

                    return (
                      <Card
                        key={q.id}
                        className={`bg-[#0b0f19] border ${
                          isCorrect
                            ? "border-emerald-900/40"
                            : isSkipped
                            ? "border-slate-800"
                            : "border-rose-900/40"
                        }`}
                      >
                        <CardHeader className="pb-2 flex flex-row items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white font-mono">
                              Q{idx + 1}.
                            </span>
                            <Badge
                              variant={isCorrect ? "success" : isSkipped ? "outline" : "destructive"}
                              className="text-[10px]"
                            >
                              {isCorrect ? "+3 Marks" : isSkipped ? "Skipped (0)" : "-1 Mark"}
                            </Badge>
                          </div>
                          <span className="text-[11px] text-slate-500 font-mono">
                            Your Ans: {userAns || "None"} | Correct: {q.correctAnswer}
                          </span>
                        </CardHeader>
                        <CardContent className="space-y-3 pt-2 text-xs">
                          {/* Graph / Chart Visualizer if applicable in review */}
                          <QuestionGraphViewer question={q} />

                          <p className="text-slate-200 font-medium">{q.questionText}</p>
                          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 leading-relaxed font-sans">
                            <span className="font-semibold text-indigo-300 block mb-1">
                              Solution:
                            </span>
                            {q.detailedSolution}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </AppShell>
  );
}
