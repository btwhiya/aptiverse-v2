"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Compass,
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
  Award,
  Calendar,
  Filter,
  Check,
  Zap,
  HelpCircle,
  ExternalLink,
  Flame,
  BarChart2,
  Bookmark,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  XAT_STATIC_GK_QUESTIONS,
  XAT_CURRENT_AFFAIRS_QUESTIONS,
  ALL_XAT_GK_QUESTIONS,
  XAT_GK_REVISION_CARDS,
  GKQuestion,
  GKRevisionCard,
  RevisionCardStatus,
  getXATProgress,
  recordGKAttempt,
  updateRevisionCardStatus,
  XATProgressMetrics,
} from "@/lib/xat";

export default function XATGeneralKnowledgeStudioPage() {
  const [activeTab, setActiveTab] = useState<"PRACTICE" | "CURRENT_AFFAIRS" | "STATIC_GK" | "REVISION" | "TEST">("PRACTICE");
  const [activeTimeFilter, setActiveTimeFilter] = useState<"ALL" | "30_DAYS" | "3_MONTHS" | "6_MONTHS" | "12_MONTHS" | "2026" | "2025">("ALL");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [activeQIndex, setActiveQIndex] = useState(0);

  // Attempt states
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [progressMetrics, setProgressMetrics] = useState<XATProgressMetrics | null>(null);

  // Revision Cards State
  const [revisionIndex, setRevisionIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setProgressMetrics(getXATProgress());
  }, []);

  // Filter questions based on active tab, time filter, and category
  const filteredQuestions: GKQuestion[] = ALL_XAT_GK_QUESTIONS.filter((q) => {
    if (activeTab === "STATIC_GK" && q.isCurrentAffairs) return false;
    if (activeTab === "CURRENT_AFFAIRS" && !q.isCurrentAffairs) return false;

    if (q.isCurrentAffairs && activeTimeFilter !== "ALL") {
      const caQ = q as any;
      if (activeTimeFilter === "30_DAYS" && caQ.timeFilterWindow !== "30_DAYS") return false;
      if (activeTimeFilter === "3_MONTHS" && !["30_DAYS", "3_MONTHS"].includes(caQ.timeFilterWindow)) return false;
      if (activeTimeFilter === "6_MONTHS" && !["30_DAYS", "3_MONTHS", "6_MONTHS"].includes(caQ.timeFilterWindow)) return false;
      if (activeTimeFilter === "12_MONTHS" && !["30_DAYS", "3_MONTHS", "6_MONTHS", "12_MONTHS"].includes(caQ.timeFilterWindow)) return false;
      if (activeTimeFilter === "2026" && caQ.year !== 2026) return false;
      if (activeTimeFilter === "2025" && caQ.year !== 2025) return false;
    }

    if (selectedCategory !== "ALL" && !q.category.toLowerCase().includes(selectedCategory.toLowerCase())) {
      return false;
    }

    return true;
  });

  const currentQ: GKQuestion | undefined = filteredQuestions[activeQIndex] || filteredQuestions[0];

  const handleOptionClick = (label: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(label);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption || !currentQ || isAnswerSubmitted) return;
    const isCorrect = selectedOption === currentQ.correctAnswer;
    setIsAnswerSubmitted(true);

    const updated = recordGKAttempt({
      category: currentQ.category,
      isCurrentAffairs: currentQ.isCurrentAffairs,
      isCorrect,
    });
    setProgressMetrics(updated);
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    if (activeQIndex < filteredQuestions.length - 1) {
      setActiveQIndex((prev) => prev + 1);
    } else {
      setActiveQIndex(0);
    }
  };

  const handleMarkRevisionCard = (cardId: string, status: RevisionCardStatus) => {
    const updated = updateRevisionCardStatus(cardId, status);
    setProgressMetrics(updated);
    if (revisionIndex < XAT_GK_REVISION_CARDS.length - 1) {
      setRevisionIndex((prev) => prev + 1);
      setIsFlipped(false);
    }
  };

  const currentRevisionCard = XAT_GK_REVISION_CARDS[revisionIndex];
  const metrics = progressMetrics || {
    staticGkAccuracy: 64,
    currentAffairsAccuracy: 51,
    categoryPerformance: {},
    weakCategories: ["Economy", "International Affairs"],
  };

  const categoriesList = [
    "ALL",
    "Economy",
    "Banking & Finance",
    "Constitution",
    "Science",
    "International Affairs",
    "Awards",
    "Sports",
    "Business & Corporate",
  ];

  return (
    <AppShell>
      <div className="space-y-8 max-w-6xl mx-auto animate-in fade-in duration-200">
        {/* Breadcrumb & Scope Lock */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Link href="/dashboard" className="hover:text-white transition-colors">
              Aptiverse
            </Link>
            <span>/</span>
            <Link href="/exams/xat" className="hover:text-white transition-colors">
              XAT Preparation
            </Link>
            <span>/</span>
            <span className="text-purple-400 font-semibold">General Knowledge (GK)</span>
          </div>

          <Badge variant="outline" className="border-purple-500/40 text-purple-300 bg-purple-500/10 text-xs">
            XAT EXCLUSIVE MODULE
          </Badge>
        </div>

        {/* Studio Header */}
        <div className="p-6 sm:p-8 rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-950/40 via-[#0e1422] to-[#0e1422] relative overflow-hidden shadow-2xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-purple-400">
                  XAT → General Knowledge
                </span>
                <Badge variant="verified" className="text-xs">
                  PART 2 BLUEPRINT
                </Badge>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                XAT General Knowledge Studio
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
                Dedicated preparation for the 25-question XAT General Knowledge section. Features verified Static GK
                (Polity, Economy, Geography, History) and dated, factually verified Current Affairs with flexible time filters.
                No negative marking; scores are evaluated during XLRI interview shortlisting.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Link href="/exams/xat">
                <Button variant="secondary" size="sm" className="gap-2 text-xs">
                  <ChevronLeft className="h-4 w-4" />
                  <span>Back to XAT Hub</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Mode Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800">
            <button
              onClick={() => {
                setActiveTab("PRACTICE");
                setActiveQIndex(0);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "PRACTICE"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/20"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              <Target className="h-4 w-4" />
              <span>All GK Practice ({ALL_XAT_GK_QUESTIONS.length}Q)</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("CURRENT_AFFAIRS");
                setActiveQIndex(0);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "CURRENT_AFFAIRS"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/20"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              <Clock className="h-4 w-4" />
              <span>Current Affairs (Dated 2025–26)</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("STATIC_GK");
                setActiveQIndex(0);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "STATIC_GK"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/20"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>Static GK (Polity, History, Econ)</span>
            </button>

            <button
              onClick={() => setActiveTab("REVISION")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "REVISION"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/20"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              <Bookmark className="h-4 w-4" />
              <span>XAT GK Revision Cards</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TIME FILTER & CATEGORY TOOLBAR (REQUIREMENT 6)                            */}
        {/* ========================================================================= */}
        {activeTab !== "REVISION" && (
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {/* Time Period Filter for Current Affairs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 shrink-0">
                  <Calendar className="h-3.5 w-3.5 text-purple-400" />
                  <span>Time Window:</span>
                </span>
                {[
                  { label: "All Time", val: "ALL" },
                  { label: "Last 30 Days", val: "30_DAYS" },
                  { label: "Last 3 Months", val: "3_MONTHS" },
                  { label: "Last 6 Months", val: "6_MONTHS" },
                  { label: "Last 12 Months", val: "12_MONTHS" },
                  { label: "2026 Events", val: "2026" },
                  { label: "2025 Events", val: "2025" },
                ].map((tf) => (
                  <button
                    key={tf.val}
                    onClick={() => {
                      setActiveTimeFilter(tf.val as any);
                      setActiveQIndex(0);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                      activeTimeFilter === tf.val
                        ? "bg-purple-600 text-white"
                        : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                    }`}
                  >
                    {tf.label}
                  </button>
                ))}
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                <span className="text-xs font-semibold text-slate-400 shrink-0">Category:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setActiveQIndex(0);
                  }}
                  className="bg-slate-900 border border-slate-800 text-xs text-slate-200 rounded-lg px-2.5 py-1 focus:outline-none focus:border-purple-500"
                >
                  {categoriesList.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODE: QUESTION RUNNER (PRACTICE, CURRENT AFFAIRS, STATIC GK)               */}
        {/* ========================================================================= */}
        {activeTab !== "REVISION" && currentQ && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-150">
            {/* Main Question Card (8 Cols) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-5 shadow-lg">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        currentQ.isCurrentAffairs
                          ? "border-purple-500/40 text-purple-300 bg-purple-500/10"
                          : "border-blue-500/40 text-blue-300 bg-blue-500/10"
                      }`}
                    >
                      {currentQ.isCurrentAffairs ? "CURRENT AFFAIRS" : "STATIC GK"}
                    </Badge>
                    <span className="text-xs font-semibold text-slate-400">{currentQ.category}</span>
                  </div>

                  <span className="text-xs text-slate-400">
                    Question {activeQIndex + 1} of {filteredQuestions.length}
                  </span>
                </div>

                {/* Question Prompt */}
                <div className="space-y-3">
                  <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
                    {currentQ.question}
                  </h3>

                  {currentQ.isCurrentAffairs && (
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
                      <span>Event Date: <strong className="text-slate-300">{(currentQ as any).eventDate}</strong></span>
                      <span>•</span>
                      <span>Verified Source: <strong className="text-slate-300">{(currentQ as any).source}</strong></span>
                    </div>
                  )}
                </div>

                {/* 5 Options List */}
                <div className="space-y-2.5">
                  {currentQ.options.map((opt) => {
                    const isSelected = selectedOption === opt.label;
                    const isCorrect = currentQ.correctAnswer === opt.label;

                    let optClasses = "bg-slate-900/60 border-slate-800 text-slate-200 hover:border-slate-700";
                    if (isSelected) {
                      optClasses = "bg-purple-950/60 border-purple-500 text-white";
                    }
                    if (isAnswerSubmitted) {
                      if (isCorrect) {
                        optClasses = "bg-emerald-950/70 border-emerald-500 text-emerald-200 font-semibold";
                      } else if (isSelected && !isCorrect) {
                        optClasses = "bg-rose-950/70 border-rose-500 text-rose-200";
                      }
                    }

                    return (
                      <button
                        key={opt.label}
                        onClick={() => handleOptionClick(opt.label)}
                        className={`w-full p-3.5 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-center gap-3 cursor-pointer ${optClasses}`}
                      >
                        <span
                          className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                            isSelected
                              ? "bg-purple-600 text-white"
                              : "bg-slate-800 text-slate-400"
                          }`}
                        >
                          {opt.label}
                        </span>
                        <span className="leading-snug">{opt.text}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Question Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                  <Button
                    onClick={handleSubmitAnswer}
                    disabled={!selectedOption || isAnswerSubmitted}
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs"
                  >
                    <span>Submit Answer</span>
                  </Button>

                  <Button
                    onClick={handleNextQuestion}
                    variant="secondary"
                    size="sm"
                    className="text-xs gap-1.5"
                  >
                    <span>Next Question</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                {/* Explanation & Important Fact Box */}
                {isAnswerSubmitted && (
                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold flex items-center gap-1.5">
                        {selectedOption === currentQ.correctAnswer ? (
                          <>
                            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                            <span className="text-emerald-400">Correct! Option {currentQ.correctAnswer}</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="h-4 w-4 text-rose-400" />
                            <span className="text-rose-400">Incorrect. Correct Answer: Option {currentQ.correctAnswer}</span>
                          </>
                        )}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {currentQ.explanation}
                    </p>

                    <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/30 text-xs text-purple-200 space-y-1">
                      <strong className="text-purple-300 flex items-center gap-1">
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>Important Fact for XAT:</span>
                      </strong>
                      <p className="text-slate-300">{currentQ.importantFact}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Performance Sidebar (4 Cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-5">
                <div className="space-y-1 pb-3 border-b border-slate-800">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <BarChart2 className="h-4 w-4 text-purple-400" />
                    <span>GK Performance Tracker</span>
                  </h3>
                  <p className="text-xs text-slate-400">Separately tracked by pillar</p>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-300">Static GK Accuracy</span>
                      <span className="font-bold text-white">{metrics.staticGkAccuracy}%</span>
                    </div>
                    <Progress value={metrics.staticGkAccuracy} className="h-2 bg-slate-900" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-300">Current Affairs Accuracy</span>
                      <span className="font-bold text-white">{metrics.currentAffairsAccuracy}%</span>
                    </div>
                    <Progress value={metrics.currentAffairsAccuracy} className="h-2 bg-slate-900" />
                  </div>
                </div>

                {/* Category Accuracy Matrix */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Category Breakdown
                  </span>
                  <div className="space-y-2">
                    {Object.values(metrics.categoryPerformance || {}).length > 0 ? (
                      Object.values(metrics.categoryPerformance).map((cat: any) => (
                        <div key={cat.category} className="text-xs space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-300">{cat.category}</span>
                            <span className={`font-bold ${cat.accuracy < 60 ? "text-amber-400" : "text-emerald-400"}`}>
                              {cat.accuracy}% ({cat.correct}/{cat.attempted})
                            </span>
                          </div>
                          <Progress value={cat.accuracy} className="h-1 bg-slate-900" />
                        </div>
                      ))
                    ) : (
                      <span className="text-xs text-slate-500">Attempt questions to see category breakdown.</span>
                    )}
                  </div>
                </div>

                {/* Weak Areas Banner */}
                {metrics.weakCategories && metrics.weakCategories.length > 0 && (
                  <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs space-y-1">
                    <span className="font-bold text-amber-300 flex items-center gap-1">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      <span>Needs Review:</span>
                    </span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {metrics.weakCategories.map((wc) => (
                        <Badge key={wc} variant="outline" className="text-[10px] border-amber-500/40 text-amber-300">
                          {wc}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODE: XAT GK REVISION SYSTEM (FLASHCARDS WITH [KNOW] [REVIEW] [PRACTICE]) */}
        {/* ========================================================================= */}
        {activeTab === "REVISION" && currentRevisionCard && (
          <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-150">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold text-white flex items-center justify-center gap-2">
                <Bookmark className="h-5 w-5 text-purple-400" />
                <span>XAT GK Rapid Revision Cards</span>
              </h2>
              <p className="text-xs text-slate-400">
                Card {revisionIndex + 1} of {XAT_GK_REVISION_CARDS.length} • Tap card to reveal exam context
              </p>
            </div>

            {/* Interactive Flashcard */}
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="p-8 rounded-3xl bg-slate-950 border border-purple-500/30 hover:border-purple-500/50 transition-all cursor-pointer min-h-[260px] flex flex-col justify-between shadow-2xl space-y-4 text-center"
            >
              <div className="flex items-center justify-between text-xs">
                <Badge variant="outline" className="border-purple-500/40 text-purple-300">
                  {currentRevisionCard.category}
                </Badge>
                <span className="text-slate-400 text-[11px]">
                  {currentRevisionCard.isCurrentAffairs ? `Dated: ${currentRevisionCard.dateOrEra}` : "Static GK Anchor"}
                </span>
              </div>

              {!isFlipped ? (
                <div className="space-y-3 py-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-400">One-Line Core Fact</span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-white leading-relaxed">
                    {currentRevisionCard.oneLineFact}
                  </h3>
                  <span className="text-xs text-slate-400 block">Click to flip card</span>
                </div>
              ) : (
                <div className="space-y-3 py-4 text-left animate-in fade-in duration-150">
                  <h4 className="text-sm font-bold text-white">{currentRevisionCard.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong>Context:</strong> {currentRevisionCard.context}
                  </p>
                  <p className="text-xs text-purple-300">
                    <strong>Frequently Tested Area:</strong> {currentRevisionCard.frequentlyTestedArea}
                  </p>
                  <p className="text-xs text-amber-300">
                    <strong>XAT Relevance:</strong> {currentRevisionCard.examRelevance}
                  </p>
                </div>
              )}

              <div className="text-[11px] text-slate-500">
                Status: {progressMetrics?.revisionStatusMap[currentRevisionCard.id] || "NOT_REVIEWED"}
              </div>
            </div>

            {/* Rating Buttons: [Know] [Review] [Need Practice] */}
            <div className="flex items-center justify-center gap-3">
              <Button
                onClick={() => handleMarkRevisionCard(currentRevisionCard.id, "KNOW")}
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-5"
              >
                <Check className="h-4 w-4 mr-1.5" />
                <span>Know</span>
              </Button>

              <Button
                onClick={() => handleMarkRevisionCard(currentRevisionCard.id, "REVIEW")}
                className="bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold px-5"
              >
                <RotateCcw className="h-4 w-4 mr-1.5" />
                <span>Review</span>
              </Button>

              <Button
                onClick={() => handleMarkRevisionCard(currentRevisionCard.id, "NEED_PRACTICE")}
                className="bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold px-5"
              >
                <AlertTriangle className="h-4 w-4 mr-1.5" />
                <span>Need Practice</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
