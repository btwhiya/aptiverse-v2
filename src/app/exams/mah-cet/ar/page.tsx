"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Shapes,
  BookOpen,
  Target,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Clock,
  Layers,
  HelpCircle,
  TrendingUp,
  BarChart2,
  Award,
  ArrowRight,
  Filter,
  Check,
  Eye,
  Grid,
  Zap,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  MAH_CET_AR_CONCEPTS,
  ALL_MAH_CET_AR_QUESTIONS,
  ARQuestion,
  ARQuestionCategory,
  ARDifficulty,
  FigureRenderer,
  FigureSequence,
  FigureAnalogy,
  FigureMatrix,
  OptionFigure,
  loadMAHCETARProgress,
  recordARQuestionAttempt,
  ARProgressMetrics,
} from "@/lib/mah-cet";

export default function MAHCETAbstractReasoningStudioPage() {
  const [activeTab, setActiveTab] = useState<"PRACTICE" | "CONCEPTS" | "MAH_CET_LEVEL" | "MAH_CET_HARD" | "DASHBOARD">("PRACTICE");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  // User state
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [expandedConceptId, setExpandedConceptId] = useState<string | null>("ar-concept-1");
  const [metrics, setMetrics] = useState<ARProgressMetrics | null>(null);

  useEffect(() => {
    setMetrics(loadMAHCETARProgress());
    setStartTime(Date.now());

    const handleProgressUpdate = () => {
      setMetrics(loadMAHCETARProgress());
    };

    window.addEventListener("mah-cet-ar-progress-updated", handleProgressUpdate);
    return () => {
      window.removeEventListener("mah-cet-ar-progress-updated", handleProgressUpdate);
    };
  }, []);

  // Filter questions based on activeTab and selectedCategory
  const filteredQuestions: ARQuestion[] = ALL_MAH_CET_AR_QUESTIONS.filter((q) => {
    if (activeTab === "MAH_CET_LEVEL" && q.difficulty !== "MAH_CET_LEVEL") return false;
    if (activeTab === "MAH_CET_HARD" && q.difficulty !== "MAH_CET_HARD") return false;
    if (selectedCategory !== "ALL" && q.category !== selectedCategory) return false;
    return true;
  });

  const currentQuestion: ARQuestion | undefined = filteredQuestions[activeQuestionIndex] || filteredQuestions[0];

  const handleSelectOption = (label: string) => {
    if (isAnswerRevealed) return;
    setSelectedOption(label);
  };

  const handleSubmitAnswer = () => {
    if (!currentQuestion || !selectedOption || isAnswerRevealed) return;

    const timeSpent = Math.max(5, Math.round((Date.now() - startTime) / 1000));
    const isCorrect = selectedOption === currentQuestion.correctAnswer;

    recordARQuestionAttempt(currentQuestion.id, currentQuestion.category, isCorrect, timeSpent);
    setIsAnswerRevealed(true);
    setMetrics(loadMAHCETARProgress());
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswerRevealed(false);
    setStartTime(Date.now());
    if (activeQuestionIndex < filteredQuestions.length - 1) {
      setActiveQuestionIndex((prev) => prev + 1);
    } else {
      setActiveQuestionIndex(0);
    }
  };

  const handlePrevQuestion = () => {
    setSelectedOption(null);
    setIsAnswerRevealed(false);
    setStartTime(Date.now());
    if (activeQuestionIndex > 0) {
      setActiveQuestionIndex((prev) => prev - 1);
    }
  };

  const handlePracticeWeakConcepts = () => {
    if (metrics?.needsPracticeConcepts && metrics.needsPracticeConcepts.length > 0) {
      setSelectedCategory(metrics.needsPracticeConcepts[0]);
    }
    setActiveTab("PRACTICE");
    setActiveQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerRevealed(false);
  };

  // Categories list for filtering
  const categories: ARQuestionCategory[] = [
    "Figure Series",
    "Figure Analogies",
    "Matching Image Pairs",
    "Figure Classification",
    "Missing Figure",
    "Rotation & Reflection",
  ];

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto space-y-6 pb-16">
        {/* Header Navigation Breadcrumb & Title */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Link href="/exams/mah-cet" className="hover:text-emerald-400 transition-colors">
              MAH CET Hub
            </Link>
            <span>/</span>
            <span className="text-emerald-400 font-semibold">Abstract Reasoning Studio</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Shapes className="w-5 h-5" />
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                  MAH CET Abstract Reasoning Studio
                </h1>
                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-[10px] font-bold">
                  25 QUESTIONS · VISUAL-FIRST
                </Badge>
              </div>
              <p className="text-slate-300 text-xs md:text-sm">
                Strictly rendered SVG figures: Series, Analogies, Matrices, Odd Figure Out, and Spatial Rotations.
              </p>
            </div>

            {/* Overall Quick Metrics */}
            <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 p-1.5 rounded-2xl">
              <div className="px-3 py-1 text-center border-r border-slate-800">
                <span className="text-[10px] uppercase text-slate-400 font-semibold block">Solved</span>
                <span className="text-sm font-bold text-white">{metrics?.questionsAttempted ?? 0}</span>
              </div>
              <div className="px-3 py-1 text-center border-r border-slate-800">
                <span className="text-[10px] uppercase text-slate-400 font-semibold block">Accuracy</span>
                <span className="text-sm font-bold text-emerald-400">{metrics?.overallAccuracy ?? 0}%</span>
              </div>
              <div className="px-3 py-1 text-center">
                <span className="text-[10px] uppercase text-slate-400 font-semibold block">Avg Time</span>
                <span className="text-sm font-bold text-amber-400">{metrics?.avgTimeSeconds ?? 0}s</span>
              </div>
            </div>
          </div>
        </div>

        {/* Primary View Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 overflow-x-auto">
            <Button
              size="sm"
              variant={activeTab === "PRACTICE" ? "default" : "outline"}
              onClick={() => {
                setActiveTab("PRACTICE");
                setActiveQuestionIndex(0);
                setSelectedOption(null);
                setIsAnswerRevealed(false);
              }}
              className={activeTab === "PRACTICE" ? "bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold" : "border-slate-700 text-slate-300"}
            >
              <Target className="w-3.5 h-3.5 mr-1.5" />
              Interactive Practice ({filteredQuestions.length})
            </Button>
            <Button
              size="sm"
              variant={activeTab === "CONCEPTS" ? "default" : "outline"}
              onClick={() => setActiveTab("CONCEPTS")}
              className={activeTab === "CONCEPTS" ? "bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold" : "border-slate-700 text-slate-300"}
            >
              <BookOpen className="w-3.5 h-3.5 mr-1.5" />
              Visual Concepts (20)
            </Button>
            <Button
              size="sm"
              variant={activeTab === "MAH_CET_LEVEL" ? "default" : "outline"}
              onClick={() => {
                setActiveTab("MAH_CET_LEVEL");
                setActiveQuestionIndex(0);
                setSelectedOption(null);
                setIsAnswerRevealed(false);
              }}
              className={activeTab === "MAH_CET_LEVEL" ? "bg-amber-600 hover:bg-amber-500 text-white font-bold" : "border-slate-700 text-slate-300"}
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              MAH CET Level
            </Button>
            <Button
              size="sm"
              variant={activeTab === "MAH_CET_HARD" ? "default" : "outline"}
              onClick={() => {
                setActiveTab("MAH_CET_HARD");
                setActiveQuestionIndex(0);
                setSelectedOption(null);
                setIsAnswerRevealed(false);
              }}
              className={activeTab === "MAH_CET_HARD" ? "bg-rose-600 hover:bg-rose-500 text-white font-bold" : "border-slate-700 text-slate-300"}
            >
              <Zap className="w-3.5 h-3.5 mr-1.5" />
              MAH CET Hard
            </Button>
            <Button
              size="sm"
              variant={activeTab === "DASHBOARD" ? "default" : "outline"}
              onClick={() => setActiveTab("DASHBOARD")}
              className={activeTab === "DASHBOARD" ? "bg-indigo-600 hover:bg-indigo-500 text-white font-bold" : "border-slate-700 text-slate-300"}
            >
              <BarChart2 className="w-3.5 h-3.5 mr-1.5" />
              AR Dashboard
            </Button>
          </div>

          {/* Category Filter Pills (Active in practice modes) */}
          {activeTab !== "CONCEPTS" && activeTab !== "DASHBOARD" && (
            <div className="flex items-center gap-1.5 overflow-x-auto">
              <button
                onClick={() => {
                  setSelectedCategory("ALL");
                  setActiveQuestionIndex(0);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  selectedCategory === "ALL"
                    ? "bg-slate-700 text-white"
                    : "bg-slate-900/80 text-slate-400 hover:text-slate-200"
                }`}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setActiveQuestionIndex(0);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-900/80 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* =========================================================
            TAB 1: INTERACTIVE VISUAL QUESTION SOLVER (PRACTICE)
        ========================================================= */}
        {(activeTab === "PRACTICE" || activeTab === "MAH_CET_LEVEL" || activeTab === "MAH_CET_HARD") && (
          <div>
            {!currentQuestion ? (
              <div className="p-12 text-center text-slate-400 bg-slate-900/60 rounded-2xl border border-slate-800">
                No questions found matching the selected filter.
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left 8 Cols: Main Visual Stage & Question */}
                <div className="lg:col-span-8 space-y-6">
                  {/* Question Header Card */}
                  <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-slate-800 text-slate-300 border-slate-700 text-xs">
                          Question {activeQuestionIndex + 1} of {filteredQuestions.length}
                        </Badge>
                        <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-xs font-semibold">
                          {currentQuestion.category}
                        </Badge>
                        <Badge
                          className={`text-xs ${
                            currentQuestion.difficulty === "FOUNDATION"
                              ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
                              : currentQuestion.difficulty === "MAH_CET_LEVEL"
                              ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                              : "bg-rose-500/20 text-rose-300 border-rose-500/30"
                          }`}
                        >
                          {currentQuestion.difficulty.replace(/_/g, " ")}
                        </Badge>
                      </div>

                      {/* Navigation Controls */}
                      <div className="flex items-center gap-1.5">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handlePrevQuestion}
                          disabled={activeQuestionIndex === 0}
                          className="h-8 w-8 p-0 border-slate-700 text-slate-300"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleNextQuestion}
                          className="h-8 w-8 p-0 border-slate-700 text-slate-300"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <h2 className="text-base md:text-lg font-bold text-white leading-snug">
                      {currentQuestion.prompt}
                    </h2>

                    {/* ===================================================
                        DYNAMIC VISUAL QUESTION STAGE
                    =================================================== */}
                    <div className="p-4 md:p-6 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex flex-col items-center justify-center min-h-[180px]">
                      {/* Case 1: Figure Series */}
                      {currentQuestion.questionType === "FIGURE_SERIES" && (
                        <FigureSequence
                          figures={currentQuestion.sequenceFigures}
                          figureSize={95}
                        />
                      )}

                      {/* Case 2: Figure Analogy */}
                      {currentQuestion.questionType === "FIGURE_ANALOGY" && (
                        <FigureAnalogy
                          pairA={currentQuestion.pairA}
                          figureC={currentQuestion.figureC}
                          figureSize={100}
                        />
                      )}

                      {/* Case 3: Missing Figure Matrix (3x3) */}
                      {currentQuestion.questionType === "MISSING_FIGURE" && (
                        <FigureMatrix
                          matrix={currentQuestion.matrix3x3}
                          figureSize={80}
                        />
                      )}

                      {/* Case 4: Figure Classification (Odd Figure Out) */}
                      {currentQuestion.questionType === "FIGURE_CLASSIFICATION" && (
                        <div className="flex flex-wrap items-center justify-center gap-3">
                          {currentQuestion.classificationFigures.map((cf) => (
                            <div
                              key={cf.label}
                              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-center"
                            >
                              <FigureRenderer figure={cf.figure} size={85} />
                              <span className="text-xs font-bold text-slate-400 block mt-1">
                                Figure {cf.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Case 5: Matching Pairs Reference */}
                      {currentQuestion.questionType === "MATCHING_PAIRS" && (
                        <div className="space-y-2 text-center">
                          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                            Reference Transformation Pair
                          </span>
                          <div className="flex items-center justify-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800">
                            <FigureRenderer figure={currentQuestion.referencePair[0]} size={90} />
                            <ArrowRight className="w-5 h-5 text-amber-400" />
                            <FigureRenderer figure={currentQuestion.referencePair[1]} size={90} />
                          </div>
                        </div>
                      )}

                      {/* Case 6: Rotation & Reflection */}
                      {currentQuestion.questionType === "ROTATION_REFLECTION" && (
                        <div className="space-y-2 text-center">
                          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                            Problem Figure
                          </span>
                          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 inline-block">
                            <FigureRenderer figure={currentQuestion.sourceFigure} size={110} />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ===================================================
                      OPTIONS STAGE (A, B, C, D, E) WITH VISUAL FIGURES
                  =================================================== */}
                  <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                        Select Correct Visual Option (A – E)
                      </span>
                      {selectedOption && !isAnswerRevealed && (
                        <span className="text-xs text-emerald-400 font-semibold">
                          Selected: Option {selectedOption}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                      {currentQuestion.options.map((opt) => {
                        const isSelected = selectedOption === opt.label;
                        const isCorrect = isAnswerRevealed && opt.label === currentQuestion.correctAnswer;
                        const isWrong = isAnswerRevealed && isSelected && !isCorrect;

                        return (
                          <OptionFigure
                            key={opt.label}
                            label={opt.label}
                            figure={opt.figure}
                            figurePair={opt.figurePair}
                            isSelected={isSelected}
                            isRevealed={isAnswerRevealed}
                            isCorrect={isCorrect}
                            onClick={() => handleSelectOption(opt.label)}
                            figureSize={80}
                          />
                        );
                      })}
                    </div>

                    {/* Submit & Next Button Bar */}
                    <div className="flex items-center justify-end gap-3 pt-2">
                      {!isAnswerRevealed ? (
                        <Button
                          disabled={!selectedOption}
                          onClick={handleSubmitAnswer}
                          className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-sm px-6 h-10 shadow-lg shadow-emerald-600/20"
                        >
                          Check Answer
                        </Button>
                      ) : (
                        <Button
                          onClick={handleNextQuestion}
                          className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm px-6 h-10 shadow-lg shadow-indigo-600/20"
                        >
                          <span>Next Question</span>
                          <ArrowRight className="w-4 h-4 ml-1.5" />
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* ===================================================
                      EXPLANATION & TRANSFORMATION RULE BREAKDOWN
                  =================================================== */}
                  {isAnswerRevealed && (
                    <div className="p-5 rounded-2xl bg-slate-900/95 border-2 border-emerald-500/40 shadow-xl space-y-4 animate-in fade-in slide-in-from-top-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {selectedOption === currentQuestion.correctAnswer ? (
                            <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-sm">
                              <CheckCircle2 className="w-5 h-5" />
                              <span>Correct! Option {currentQuestion.correctAnswer} is right.</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 text-rose-400 font-bold text-sm">
                              <XCircle className="w-5 h-5" />
                              <span>Incorrect. Correct answer is Option {currentQuestion.correctAnswer}.</span>
                            </div>
                          )}
                        </div>
                        <Badge variant="outline" className="text-emerald-300 border-emerald-500/30 text-xs">
                          {currentQuestion.transformationType}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Governing Transformation Rule
                        </span>
                        <p className="text-xs md:text-sm text-slate-200 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                          {currentQuestion.ruleExplanation}
                        </p>
                      </div>

                      <div className="space-y-1.5">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Step-by-Step Visual Observation
                        </span>
                        <ul className="space-y-1 text-xs text-slate-300">
                          {currentQuestion.stepByStepRule.map((step, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                                {idx + 1}
                              </span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right 4 Cols: Question Navigator & Strategy Tips */}
                <div className="lg:col-span-4 space-y-5">
                  {/* Question Matrix Grid */}
                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                      Question Navigator ({filteredQuestions.length})
                    </span>
                    <div className="grid grid-cols-5 gap-2 max-h-48 overflow-y-auto pr-1">
                      {filteredQuestions.map((q, idx) => (
                        <button
                          key={q.id}
                          onClick={() => {
                            setActiveQuestionIndex(idx);
                            setSelectedOption(null);
                            setIsAnswerRevealed(false);
                            setStartTime(Date.now());
                          }}
                          className={`h-8 rounded-lg text-xs font-bold transition-all ${
                            activeQuestionIndex === idx
                              ? "bg-emerald-500 text-slate-950 ring-2 ring-emerald-400"
                              : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                          }`}
                        >
                          {idx + 1}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* MAH CET Speed Rule Alert */}
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/40 to-slate-900 border border-emerald-500/30 space-y-2">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                      <Clock className="w-4 h-4" />
                      <span>MAH CET 35-Second Target</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      With 25 Abstract Reasoning questions and 150 minutes for 200 questions, budget an average of 35 seconds per figure question. Never linger past 50 seconds on a single visual pattern.
                    </p>
                  </div>

                  {/* Quick Shortcut to Weak Concepts */}
                  {metrics?.needsPracticeConcepts && metrics.needsPracticeConcepts.length > 0 && (
                    <div className="p-4 rounded-2xl bg-slate-900/90 border border-amber-500/30 space-y-2">
                      <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                        <AlertTriangle className="w-4 h-4" />
                        <span>Needs Practice</span>
                      </div>
                      <p className="text-[11px] text-slate-300">
                        Your accuracy in <span className="font-semibold text-white">{metrics.needsPracticeConcepts.join(", ")}</span> is below 60%.
                      </p>
                      <Button
                        size="sm"
                        onClick={handlePracticeWeakConcepts}
                        className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs h-8"
                      >
                        Practice Weak Concept
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================
            TAB 2: VISUAL CURRICULUM CONCEPTS (20 LESSONS)
        ========================================================= */}
        {activeTab === "CONCEPTS" && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
              <h2 className="text-xl font-bold text-white">MAH CET Abstract Reasoning Curriculum</h2>
              <p className="text-xs text-slate-400 mt-1">
                20 Canonical Visual Reasoning Lessons with SVG step-by-step transformations, thinking methods, common traps, and MAH CET perspectives.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Left 4 Cols: Concept Table of Contents */}
              <div className="md:col-span-4 space-y-2 max-h-[750px] overflow-y-auto pr-1">
                {MAH_CET_AR_CONCEPTS.map((concept) => (
                  <button
                    key={concept.id}
                    onClick={() => setExpandedConceptId(concept.id)}
                    className={`w-full text-left p-3 rounded-xl border text-xs font-semibold transition-all flex items-center justify-between ${
                      expandedConceptId === concept.id
                        ? "bg-emerald-600/20 border-emerald-500/40 text-emerald-300"
                        : "bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800/80"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 font-bold text-[10px] flex items-center justify-center shrink-0">
                        {concept.number}
                      </span>
                      <span>{concept.title}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-70" />
                  </button>
                ))}
              </div>

              {/* Right 8 Cols: Active Concept Guide View */}
              <div className="md:col-span-8">
                {(() => {
                  const concept =
                    MAH_CET_AR_CONCEPTS.find((c) => c.id === expandedConceptId) ||
                    MAH_CET_AR_CONCEPTS[0];

                  return (
                    <Card className="bg-slate-900/95 border-slate-800 shadow-xl space-y-6 p-6">
                      {/* Concept Header */}
                      <div className="border-b border-slate-800 pb-4 space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-xs font-bold">
                            Concept #{concept.number}
                          </Badge>
                          <Badge variant="outline" className="text-slate-400 border-slate-700 text-xs">
                            {concept.category}
                          </Badge>
                        </div>
                        <h2 className="text-2xl font-extrabold text-white">{concept.title}</h2>
                      </div>

                      {/* 1. WHAT IS THIS? */}
                      <div className="space-y-1.5">
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                          What is this?
                        </span>
                        <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
                          {concept.whatIsThis}
                        </p>
                      </div>

                      {/* 2. VISUAL EXAMPLE WITH ACTUAL SVG FIGURES */}
                      <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                          Visual Transformation Demonstration
                        </span>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-2">
                          <div className="text-center">
                            <FigureRenderer figure={concept.visualExample.beforeFigure} size={105} />
                            <span className="text-[11px] font-semibold text-slate-400 block mt-1">
                              {concept.visualExample.beforeFigure.label || "Before"}
                            </span>
                          </div>

                          <div className="flex flex-col items-center justify-center px-2 text-center max-w-[180px]">
                            <span className="text-[10px] uppercase font-bold text-emerald-400 mb-1">
                              Transformation
                            </span>
                            <ArrowRight className="w-6 h-6 text-emerald-400 my-1 hidden sm:block" />
                            <span className="text-[10px] text-slate-300 leading-tight">
                              {concept.visualExample.transformationRule}
                            </span>
                          </div>

                          <div className="text-center">
                            <FigureRenderer figure={concept.visualExample.afterFigure} size={105} />
                            <span className="text-[11px] font-semibold text-slate-400 block mt-1">
                              {concept.visualExample.afterFigure.label || "After"}
                            </span>
                          </div>
                        </div>

                        <p className="text-[11px] text-slate-400 italic text-center">
                          Key insight: {concept.visualExample.whyOptimal}
                        </p>
                      </div>

                      {/* 3. HOW TO SOLVE (STEP-BY-STEP) */}
                      <div className="space-y-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                          How to Solve (Step-by-Step Approach)
                        </span>
                        <div className="space-y-1.5">
                          {concept.howToSolve.map((step, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs md:text-sm text-slate-300">
                              <span className="w-4 h-4 rounded-full bg-blue-500/20 text-blue-400 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                                {idx + 1}
                              </span>
                              <span>{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 4. THINKING METHOD */}
                      <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-1">
                        <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                          Thinking Method
                        </span>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {concept.thinkingMethod}
                        </p>
                      </div>

                      {/* 5. COMMON TRAPS */}
                      <div className="space-y-1.5">
                        <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                          Common Traps to Avoid
                        </span>
                        <ul className="space-y-1 text-xs text-slate-300">
                          {concept.commonTraps.map((trap, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-rose-400 font-bold">•</span>
                              <span>{trap}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* 6. MAH CET PERSPECTIVE */}
                      <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-1">
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                          MAH CET Exam Perspective
                        </span>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {concept.mahCetPerspective}
                        </p>
                      </div>

                      {/* Practice Trigger CTA */}
                      <div className="pt-2 flex justify-end">
                        <Button
                          onClick={() => {
                            setSelectedCategory(concept.category);
                            setActiveTab("PRACTICE");
                            setActiveQuestionIndex(0);
                            setSelectedOption(null);
                            setIsAnswerRevealed(false);
                          }}
                          className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs h-9 shadow-md shadow-emerald-600/20"
                        >
                          Practice {concept.category} Questions
                          <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                        </Button>
                      </div>
                    </Card>
                  );
                })()}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 3: ABSTRACT REASONING DASHBOARD (METRICS & PROGRESS)
        ========================================================= */}
        {activeTab === "DASHBOARD" && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
              <h2 className="text-xl font-bold text-white">MAH CET Abstract Reasoning Analytics</h2>
              <p className="text-xs text-slate-400 mt-1">
                Concept-wise performance breakdown, difficulty tracking, and adaptive recommendations.
              </p>
            </div>

            {/* Core Stats Overview */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                <span className="text-xs text-slate-400 font-semibold uppercase">Total Attempted</span>
                <p className="text-2xl font-extrabold text-white mt-1">{metrics?.questionsAttempted ?? 0}</p>
                <span className="text-[10px] text-slate-500">Across all AR categories</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                <span className="text-xs text-slate-400 font-semibold uppercase">Overall Accuracy</span>
                <p className="text-2xl font-extrabold text-emerald-400 mt-1">{metrics?.overallAccuracy ?? 0}%</p>
                <span className="text-[10px] text-slate-500">{metrics?.totalCorrect ?? 0} Correct / {metrics?.totalIncorrect ?? 0} Incorrect</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                <span className="text-xs text-slate-400 font-semibold uppercase">Avg Solving Pace</span>
                <p className="text-2xl font-extrabold text-amber-400 mt-1">{metrics?.avgTimeSeconds ?? 0}s</p>
                <span className="text-[10px] text-slate-500">CET Benchmark: 35s</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                <span className="text-xs text-slate-400 font-semibold uppercase">CET Readiness</span>
                <p className="text-2xl font-extrabold text-indigo-400 mt-1">
                  {(metrics?.questionsAttempted ?? 0) >= 15 ? "Proficient" : "Foundational"}
                </p>
                <span className="text-[10px] text-slate-500">30 Verified Questions</span>
              </div>
            </div>

            {/* Concept-Wise Performance Breakdown */}
            <Card className="bg-slate-900/90 border-slate-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-bold text-white">
                  Concept Accuracy Breakdown
                </CardTitle>
                <CardDescription className="text-xs text-slate-400">
                  Performance across each of the 6 core visual reasoning archetypes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categories.map((cat) => {
                    const perf = metrics?.categoryPerformance[cat] || {
                      attempted: 0,
                      correct: 0,
                      accuracy: 0,
                      avgTimeSec: 0,
                    };

                    return (
                      <div key={cat} className="space-y-1.5 p-3 rounded-xl bg-slate-800/40 border border-slate-700/40">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-white">{cat}</span>
                          <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                            <span>{perf.attempted} Attempted</span>
                            <span className="font-bold text-emerald-400">{perf.accuracy}%</span>
                          </div>
                        </div>
                        <Progress value={perf.accuracy} className="h-1.5 bg-slate-700" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Strong Concepts & Needs Practice Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Strong Concepts (&ge; 75%)</span>
                </div>
                {metrics?.strongConcepts && metrics.strongConcepts.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {metrics.strongConcepts.map((sc) => (
                      <Badge key={sc} className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-xs">
                        {sc}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">
                    Solve more questions to identify your strongest visual patterns.
                  </p>
                )}
              </div>

              <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Needs Practice (&lt; 60%)</span>
                  </div>
                  <Button
                    size="sm"
                    onClick={handlePracticeWeakConcepts}
                    className="bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs h-7"
                  >
                    Practice Weak Concepts
                  </Button>
                </div>
                {metrics?.needsPracticeConcepts && metrics.needsPracticeConcepts.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {metrics.needsPracticeConcepts.map((nc) => (
                      <Badge key={nc} className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-xs">
                        {nc}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">
                    No critical weak spots detected yet. Keep up the high accuracy!
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
