"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Sparkles,
  BookOpen,
  BrainCircuit,
  Target,
  Globe,
  Landmark,
  TrendingUp,
  Lightbulb,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  ChevronRight,
  Layers,
  HelpCircle,
  Flame,
  Award,
  RefreshCw,
  AlertCircle,
  ShieldCheck,
  Calendar,
  ExternalLink,
  Tag,
  BarChart2,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  CMAT_CONCEPT_GUIDES,
  CMAT_QUESTION_BANK,
  CMATConceptGuide,
  CMATQuestion,
  CMATTopic,
  getCMATProgress,
  recordCMATAttempt,
  resetCMATProgress,
  CMATProgressMetrics,
  CMATCurrentAffairsArticle,
} from "@/lib/cmat";

export default function CMATStudioPage() {
  const searchParams = useSearchParams();
  const rawTab = searchParams.get("tab") || "concepts";

  // Map incoming tab query parameters to main tabs
  const initialMainTab =
    rawTab === "practice"
      ? "practice"
      : rawTab === "current-affairs"
      ? "current-affairs"
      : rawTab === "analytics"
      ? "analytics"
      : "concepts";

  const [activeMainTab, setActiveMainTab] = useState<string>(initialMainTab);
  const [selectedConceptCategory, setSelectedConceptCategory] = useState<string>("ALL");
  const [selectedConceptIndex, setSelectedConceptIndex] = useState<number>(0);

  // Practice Solver State
  const [selectedTopicFilter, setSelectedTopicFilter] = useState<string>("ALL");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("ALL");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());

  // Current Affairs Feed State
  const [caCategory, setCaCategory] = useState<string>("ALL");
  const [caArticles, setCaArticles] = useState<CMATCurrentAffairsArticle[]>([]);
  const [caLoading, setCaLoading] = useState<boolean>(false);
  const [caLastUpdated, setCaLastUpdated] = useState<string>("");
  const [caIsLive, setCaIsLive] = useState<boolean>(false);

  // Progress State
  const [cmatProgress, setCmatProgress] = useState<CMATProgressMetrics | null>(null);

  useEffect(() => {
    setCmatProgress(getCMATProgress());
    fetchCurrentAffairs("ALL");
  }, []);

  // Update concept filter if tab param targets a specific section
  useEffect(() => {
    if (rawTab === "current-affairs") {
      setSelectedConceptCategory("Current Affairs");
    } else if (rawTab === "static-gk") {
      setSelectedConceptCategory("Static GK");
    } else if (rawTab === "economy") {
      setSelectedConceptCategory("Economy");
    } else if (rawTab === "innovation") {
      setSelectedConceptCategory("Innovation & Entrepreneurship");
    }
  }, [rawTab]);

  const fetchCurrentAffairs = async (cat: string) => {
    setCaLoading(true);
    try {
      // Calls safe internal proxy route. API key is NEVER exposed in the UI or client bundle.
      const res = await fetch(`/api/cmat/current-affairs?category=${encodeURIComponent(cat)}`);
      if (res.ok) {
        const data = await res.json();
        setCaArticles(data.articles || []);
        setCaLastUpdated(data.lastUpdated || new Date().toISOString());
        setCaIsLive(!!data.isLive);
      }
    } catch {
      // Fail-safe handles network drops cleanly
    } finally {
      setCaLoading(false);
    }
  };

  // Filtered concepts
  const filteredConcepts = useMemo(() => {
    if (selectedConceptCategory === "ALL") return CMAT_CONCEPT_GUIDES;
    return CMAT_CONCEPT_GUIDES.filter(
      (c) =>
        c.topic.toLowerCase().includes(selectedConceptCategory.toLowerCase()) ||
        c.subtopicCategory.toLowerCase().includes(selectedConceptCategory.toLowerCase())
    );
  }, [selectedConceptCategory]);

  const selectedConcept = filteredConcepts[selectedConceptIndex] || filteredConcepts[0] || CMAT_CONCEPT_GUIDES[0];

  // Filtered Practice Questions
  const filteredQuestions = useMemo(() => {
    return CMAT_QUESTION_BANK.filter((q) => {
      if (selectedTopicFilter !== "ALL" && q.topic !== selectedTopicFilter) {
        return false;
      }
      if (selectedDifficulty !== "ALL" && q.difficulty !== selectedDifficulty) {
        return false;
      }
      return true;
    });
  }, [selectedTopicFilter, selectedDifficulty]);

  const currentQ = filteredQuestions[currentQuestionIndex] || filteredQuestions[0];

  const handleOptionSelect = (label: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(label);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption || isAnswerSubmitted || !currentQ) return;
    setIsAnswerSubmitted(true);

    const timeSpent = Math.max(5, Math.round((Date.now() - questionStartTime) / 1000));
    const isCorrect = selectedOption === currentQ.correctAnswer;

    const updated = recordCMATAttempt({
      questionId: currentQ.id,
      topic: currentQ.topic,
      isCorrect,
      timeSpentSeconds: timeSpent,
    });
    setCmatProgress(updated);
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setQuestionStartTime(Date.now());
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setCurrentQuestionIndex(0);
    }
  };

  const handleResetProgress = () => {
    if (confirm("Reset independent CMAT progress tracking? Other exams will remain unaffected.")) {
      resetCMATProgress();
      setCmatProgress(getCMATProgress());
    }
  };

  return (
    <AppShell>
      <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-200">
        {/* Top Breadcrumb & Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <Link href="/exams/cmat" className="hover:text-cyan-400 transition-colors">
                CMAT 2026
              </Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-cyan-300 font-semibold">General Awareness + Innovation Studio</span>
              <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-[10px] uppercase ml-2">
                STRICT CMAT ISOLATION
              </Badge>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
              <Sparkles className="h-6 w-6 text-cyan-400" />
              CMAT Preparation Studio
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Pedagogical deep-dives, factual data verification, verified Current Affairs feeds, and official CMAT MCQs.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              onClick={() => setActiveMainTab("practice")}
              variant={activeMainTab === "practice" ? "default" : "outline"}
              size="sm"
              className={
                activeMainTab === "practice"
                  ? "bg-cyan-600 hover:bg-cyan-500 text-white font-semibold"
                  : "border-slate-800 text-slate-300 hover:bg-slate-800"
              }
            >
              <Target className="h-4 w-4 mr-1.5 text-cyan-400" />
              Interactive Practice
            </Button>
            <Button
              onClick={() => setActiveMainTab("current-affairs")}
              variant={activeMainTab === "current-affairs" ? "default" : "outline"}
              size="sm"
              className={
                activeMainTab === "current-affairs"
                  ? "bg-cyan-600 hover:bg-cyan-500 text-white font-semibold"
                  : "border-slate-800 text-slate-300 hover:bg-slate-800"
              }
            >
              <Globe className="h-4 w-4 mr-1.5 text-cyan-400" />
              Current Affairs
            </Button>
          </div>
        </div>

        {/* Studio Main Navigation Switcher */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800/80">
          <button
            onClick={() => setActiveMainTab("concepts")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeMainTab === "concepts"
                ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>Concept Pathways</span>
            <Badge className="bg-slate-800 text-slate-300 border-none text-[10px] ml-1">
              {CMAT_CONCEPT_GUIDES.length}
            </Badge>
          </button>

          <button
            onClick={() => setActiveMainTab("practice")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeMainTab === "practice"
                ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <Target className="h-3.5 w-3.5" />
            <span>CMAT Question Solver</span>
            <Badge className="bg-slate-800 text-slate-300 border-none text-[10px] ml-1">
              {CMAT_QUESTION_BANK.length} Qs
            </Badge>
          </button>

          <button
            onClick={() => setActiveMainTab("current-affairs")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeMainTab === "current-affairs"
                ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <Globe className="h-3.5 w-3.5" />
            <span>Current Affairs Feed</span>
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse ml-1" />
          </button>

          <button
            onClick={() => setActiveMainTab("analytics")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeMainTab === "analytics"
                ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <BarChart2 className="h-3.5 w-3.5" />
            <span>CMAT Performance</span>
          </button>
        </div>

        {/* TAB 1: CONCEPTS PATHWAY */}
        {activeMainTab === "concepts" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Concept Selector & Category Filter */}
            <div className="lg:col-span-4 space-y-4">
              <Card className="bg-[#0b1120] border-slate-800 p-4 space-y-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Filter by Domain
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    "ALL",
                    "Current Affairs",
                    "Static GK",
                    "Economy",
                    "Innovation & Entrepreneurship",
                  ].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedConceptCategory(cat);
                        setSelectedConceptIndex(0);
                      }}
                      className={`text-left text-xs px-2.5 py-1.5 rounded-lg font-medium transition-all ${
                        selectedConceptCategory === cat
                          ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                          : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </Card>

              {/* Concept Index List */}
              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
                {filteredConcepts.map((concept, idx) => {
                  const isSelected = idx === selectedConceptIndex;
                  return (
                    <div
                      key={concept.id}
                      onClick={() => setSelectedConceptIndex(idx)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-cyan-950/40 border-cyan-500/50 shadow-md shadow-cyan-900/20"
                          : "bg-[#0b1120] border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <Badge
                          className={`text-[9px] uppercase px-1.5 py-0.5 ${
                            concept.topic === "Innovation & Entrepreneurship"
                              ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                              : "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
                          }`}
                        >
                          {concept.subtopicCategory}
                        </Badge>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {concept.topic}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white leading-snug line-clamp-1">
                        {concept.title}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                        {concept.whatIsIt}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Active Concept Detail (7-Step Learning Flow) */}
            <div className="lg:col-span-8 space-y-6">
              {selectedConcept && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  {/* Step 1: Learn Header Card */}
                  <Card className="bg-[#0b1120] border-cyan-500/30 p-6 shadow-xl relative overflow-hidden">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-mono">
                          CMAT CONCEPT GUIDE
                        </Badge>
                        <Badge className="bg-slate-800 text-slate-300">
                          {selectedConcept.topic}
                        </Badge>
                        <Badge className="bg-slate-800 text-slate-300">
                          {selectedConcept.subtopicCategory}
                        </Badge>
                      </div>
                      <span className="text-xs font-mono text-cyan-400 font-semibold">
                        Verified {selectedConcept.lastVerified}
                      </span>
                    </div>

                    <h2 className="text-2xl font-extrabold text-white mb-2">
                      {selectedConcept.title}
                    </h2>

                    <div className="mt-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400 mb-1">
                        <BookOpen className="h-3.5 w-3.5" />
                        <span>What Is It?</span>
                      </div>
                      <p className="text-sm text-slate-200 leading-relaxed font-medium">
                        {selectedConcept.whatIsIt}
                      </p>
                    </div>
                  </Card>

                  {/* Step 2 & 3: Simple Explanation & Concrete Example */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-[#0b1120] border-slate-800 p-5 space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5" />
                        Simple Explanation
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {selectedConcept.simpleExplanation}
                      </p>
                    </Card>

                    <Card className="bg-[#0b1120] border-slate-800 p-5 space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                        <Lightbulb className="h-3.5 w-3.5" />
                        Real-World Example
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {selectedConcept.example}
                      </p>
                    </Card>
                  </div>

                  {/* Step 4: Important Facts / Scheme Details */}
                  <Card className="bg-[#0b1120] border-slate-800 p-5 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Must-Know CMAT Facts
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedConcept.importantFacts.map((fact, fidx) => (
                        <div
                          key={fidx}
                          className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-start gap-2"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                          <span>{fact}</span>
                        </div>
                      ))}
                    </div>

                    {/* Government Scheme Specific Metadata if present */}
                    {selectedConcept.schemeDetails && (
                      <div className="mt-3 p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-xs space-y-1.5">
                        <div className="font-bold text-yellow-300 flex items-center gap-1">
                          <Landmark className="h-3.5 w-3.5" />
                          <span>Official Policy Blueprint: {selectedConcept.schemeDetails.schemeName}</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-300 pt-1">
                          <div>
                            <span className="text-slate-400">Launch Date:</span>{" "}
                            <span className="font-mono text-white">{selectedConcept.schemeDetails.launchDate}</span>
                          </div>
                          <div>
                            <span className="text-slate-400">Implementing Body:</span>{" "}
                            <span className="font-mono text-white">{selectedConcept.schemeDetails.implementingBody}</span>
                          </div>
                          <div>
                            <span className="text-slate-400">Current Status:</span>{" "}
                            <span className="font-semibold text-emerald-400">{selectedConcept.schemeDetails.currentStatus}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </Card>

                  {/* Step 5: CMAT Practice (Mini Check Question) */}
                  <Card className="bg-[#0b1120] border-cyan-500/30 p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                        <Target className="h-3.5 w-3.5" />
                        CMAT Practice: Mini Check
                      </h4>
                      <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 font-mono text-[10px]">
                        FAIR EXAM FORMAT
                      </Badge>
                    </div>

                    <p className="text-sm font-semibold text-white">
                      {selectedConcept.quickCheckQuestion.question}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedConcept.quickCheckQuestion.options.map((opt) => (
                        <div
                          key={opt.label}
                          className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-start gap-2"
                        >
                          <span className="font-mono font-bold text-cyan-400">{opt.label}.</span>
                          <span>{opt.text}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-xs space-y-1">
                      <div className="flex items-center gap-2 font-bold text-cyan-300">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Correct Answer: Option {selectedConcept.quickCheckQuestion.correctAnswer}</span>
                      </div>
                      <p className="text-slate-300 leading-relaxed pl-5">
                        {selectedConcept.quickCheckQuestion.explanation}
                      </p>
                    </div>
                  </Card>

                  {/* Step 6 & 7: Revision & Challenge */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-[#0b1120] border-slate-800 p-5 space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                        <RefreshCw className="h-3.5 w-3.5" />
                        60-Second Revision
                      </h4>
                      <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                        {selectedConcept.revisionTips.map((point, pidx) => (
                          <li key={pidx}>{point}</li>
                        ))}
                      </ul>
                    </Card>

                    <Card className="bg-[#0b1120] border-amber-500/30 p-5 space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                        <Flame className="h-3.5 w-3.5" />
                        CMAT Challenge Scenario
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                        {selectedConcept.cmatChallenge}
                      </p>
                    </Card>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE PRACTICE SOLVER */}
        {activeMainTab === "practice" && (
          <div className="space-y-6">
            {/* Filters bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#0b1120] border border-slate-800">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-slate-400 mr-2">Topic:</span>
                {[
                  "ALL",
                  "Current Affairs",
                  "Static GK",
                  "Economy",
                  "Fundamentals",
                  "Government Initiatives",
                  "Business Acumen",
                ].map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setSelectedTopicFilter(t);
                      setCurrentQuestionIndex(0);
                      setSelectedOption(null);
                      setIsAnswerSubmitted(false);
                    }}
                    className={`text-xs px-3 py-1 rounded-lg font-medium transition-all ${
                      selectedTopicFilter === t
                        ? "bg-cyan-500 text-slate-950 font-bold shadow-sm"
                        : "bg-slate-900 text-slate-400 hover:text-white"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-400">Difficulty:</span>
                {["ALL", "EASY", "MEDIUM", "HARD"].map((d) => (
                  <button
                    key={d}
                    onClick={() => {
                      setSelectedDifficulty(d);
                      setCurrentQuestionIndex(0);
                      setSelectedOption(null);
                      setIsAnswerSubmitted(false);
                    }}
                    className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all ${
                      selectedDifficulty === d
                        ? "bg-indigo-600 text-white font-bold"
                        : "bg-slate-900 text-slate-400 hover:text-white"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Question Solver Card */}
            {currentQ ? (
              <Card className="bg-[#0b1120] border-cyan-500/30 p-6 lg:p-8 space-y-6 shadow-2xl">
                {/* Question Metadata Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 font-mono">
                      CMAT Question {currentQuestionIndex + 1} of {filteredQuestions.length}
                    </Badge>
                    <Badge className="bg-slate-800 text-slate-300 font-mono">
                      {currentQ.section}
                    </Badge>
                    <Badge className="bg-slate-800 text-slate-300">
                      {currentQ.topic}
                    </Badge>
                    <Badge
                      className={
                        String(currentQ.difficulty) === "HARD" || String(currentQ.difficulty) === "CMAT_ADVANCED"
                          ? "bg-rose-500/20 text-rose-300 border-rose-500/30"
                          : String(currentQ.difficulty) === "MEDIUM" || String(currentQ.difficulty) === "CMAT_LEVEL"
                          ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                          : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                      }
                    >
                      {currentQ.difficulty}
                    </Badge>
                  </div>

                  {currentQ.eventDate && (
                    <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>Event Date: {currentQ.eventDate}</span>
                    </div>
                  )}
                </div>

                {/* Question Prompt */}
                <div className="space-y-3">
                  <p className="text-base sm:text-lg font-bold text-white leading-relaxed">
                    {currentQ.question}
                  </p>
                </div>

                {/* Options List */}
                <div className="space-y-3 pt-2">
                  {currentQ.options.map((opt) => {
                    const isSelected = selectedOption === opt.label;
                    const isCorrectAnswer = opt.label === currentQ.correctAnswer;

                    let optionStyle =
                      "border-slate-800 bg-slate-900/60 text-slate-200 hover:border-slate-700 hover:bg-slate-800/60";

                    if (isAnswerSubmitted) {
                      if (isCorrectAnswer) {
                        optionStyle = "border-emerald-500 bg-emerald-950/40 text-emerald-200 font-bold";
                      } else if (isSelected && !isCorrectAnswer) {
                        optionStyle = "border-rose-500 bg-rose-950/40 text-rose-200 line-through";
                      } else {
                        optionStyle = "border-slate-800/50 bg-slate-900/30 text-slate-500";
                      }
                    } else if (isSelected) {
                      optionStyle = "border-cyan-500 bg-cyan-950/40 text-white font-bold ring-1 ring-cyan-500";
                    }

                    return (
                      <div
                        key={opt.label}
                        onClick={() => handleOptionSelect(opt.label)}
                        className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${optionStyle}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="h-7 w-7 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-center text-xs font-mono font-bold text-cyan-400 shrink-0">
                            {opt.label}
                          </span>
                          <span className="text-sm font-medium">{opt.text}</span>
                        </div>

                        {isAnswerSubmitted && isCorrectAnswer && (
                          <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                        )}
                        {isAnswerSubmitted && isSelected && !isCorrectAnswer && (
                          <XCircle className="h-5 w-5 text-rose-400 shrink-0" />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Submit & Next Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
                  <div>
                    {!isAnswerSubmitted ? (
                      <Button
                        onClick={handleSubmitAnswer}
                        disabled={!selectedOption}
                        className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-6 shadow-md shadow-cyan-600/30"
                      >
                        Submit Answer
                      </Button>
                    ) : (
                      <Button
                        onClick={handleNextQuestion}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 gap-2"
                      >
                        <span>Next Question</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="text-xs text-slate-400 font-mono">
                    NTA Marking: +4 / -1 Penalty
                  </div>
                </div>

                {/* Explanation Card upon Submission */}
                {isAnswerSubmitted && (
                  <div className="p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/40 space-y-3 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-bold text-sm text-cyan-300">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        <span>Verified Answer &amp; Explanation</span>
                      </div>
                      {currentQ.source && (
                        <span className="text-xs text-slate-400 font-mono">
                          Source: {currentQ.source}
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                      {currentQ.explanation}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {currentQ.tags.map((tag, tidx) => (
                        <span
                          key={tidx}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 border border-slate-700"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            ) : (
              <Card className="p-8 text-center bg-[#0b1120] border-slate-800">
                <p className="text-slate-400 text-sm">No questions matched the selected filters.</p>
              </Card>
            )}
          </div>
        )}

        {/* TAB 3: CURRENT AFFAIRS LIVE FEED */}
        {activeMainTab === "current-affairs" && (
          <div className="space-y-6">
            {/* Live Feed Header Card */}
            <Card className="bg-[#0b1120] border-cyan-500/30 p-6 shadow-xl relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-mono">
                      CURRENT AFFAIRS ENGINE
                    </Badge>
                    <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 font-mono text-[10px]">
                      {caIsLive ? "EXTERNAL FEED SYNCED" : "VERIFIED LOCAL REPOSITORY"}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    CMAT Daily Current Affairs &amp; Developments
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    National, International, Business, Sports, Sci/Tech, Government Policies, and Corporate Developments.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    onClick={() => fetchCurrentAffairs(caCategory)}
                    disabled={caLoading}
                    variant="outline"
                    size="sm"
                    className="border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/20 gap-2 font-semibold"
                  >
                    <RefreshCw className={`h-3.5 w-3.5 ${caLoading ? "animate-spin" : ""}`} />
                    <span>Refresh Content</span>
                  </Button>
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-4 mt-4 border-t border-slate-800">
                {[
                  "ALL",
                  "National Events",
                  "International Events",
                  "Business Updates",
                  "Sports",
                  "Science & Technology",
                  "Major Appointments",
                  "Awards",
                  "Government Developments",
                  "Corporate Developments",
                ].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setCaCategory(cat);
                      fetchCurrentAffairs(cat);
                    }}
                    className={`text-xs px-3 py-1 rounded-lg font-medium transition-all ${
                      caCategory === cat
                        ? "bg-cyan-500 text-slate-950 font-bold shadow-sm"
                        : "bg-slate-900 text-slate-400 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </Card>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {caArticles.map((article) => (
                <Card
                  key={article.id}
                  className="bg-[#0b1120] border-slate-800 hover:border-cyan-500/40 transition-all p-5 flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-[10px]">
                        {article.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                        <Calendar className="h-3 w-3 text-cyan-400" />
                        <span>{article.eventDate}</span>
                      </div>
                    </div>

                    <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {article.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-mono">
                      Source: <strong className="text-slate-300">{article.source}</strong>
                    </span>
                    <Badge className="bg-slate-800 text-slate-300 text-[10px]">
                      {article.importance} CMAT Priority
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CMAT INDEPENDENT ANALYTICS */}
        {activeMainTab === "analytics" && (
          <div className="space-y-6">
            <Card className="bg-[#0b1120] border-cyan-500/30 p-6 space-y-6 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <BarChart2 className="h-5 w-5 text-cyan-400" />
                    Independent CMAT Performance Profile
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Strict isolation guarantee: These statistics are stored independently in AptiVerse CMAT storage and never merged with CAT, XAT, NMAT, SNAP or MAH CET databases.
                  </p>
                </div>

                <Button
                  onClick={handleResetProgress}
                  variant="outline"
                  size="sm"
                  className="border-rose-500/40 text-rose-300 hover:bg-rose-500/20 text-xs"
                >
                  Reset CMAT Stats
                </Button>
              </div>

              {cmatProgress && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                    <span className="text-xs text-slate-400">Total Questions Attempted</span>
                    <p className="text-2xl font-extrabold text-white">{cmatProgress.questionsAttempted}</p>
                    <span className="text-[11px] text-emerald-400 font-medium">
                      {cmatProgress.questionsCorrect} Correct
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                    <span className="text-xs text-slate-400">Overall Accuracy</span>
                    <p className="text-2xl font-extrabold text-cyan-300">{cmatProgress.overallAccuracy}%</p>
                    <Progress value={cmatProgress.overallAccuracy} className="h-2" />
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                    <span className="text-xs text-slate-400">General Awareness Accuracy</span>
                    <p className="text-2xl font-extrabold text-amber-300">
                      {Math.round(
                        (cmatProgress.currentAffairsAccuracy +
                          cmatProgress.staticGKAccuracy +
                          cmatProgress.economyAccuracy) /
                          3
                      )}
                      %
                    </p>
                    <span className="text-[11px] text-slate-400">CA, Static GK, Economy</span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                    <span className="text-xs text-slate-400">Innovation &amp; Entrepreneurship</span>
                    <p className="text-2xl font-extrabold text-yellow-300">{cmatProgress.innovationAccuracy}%</p>
                    <span className="text-[11px] text-slate-400">Foundations, Schemes, VC</span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-cyan-400 uppercase tracking-wider">
                    General Awareness Subtopic Breakdown
                  </h4>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-slate-300">Current Affairs</span>
                        <span className="text-cyan-300">{cmatProgress?.currentAffairsAccuracy || 0}%</span>
                      </div>
                      <Progress value={cmatProgress?.currentAffairsAccuracy || 0} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-slate-300">Static GK</span>
                        <span className="text-emerald-300">{cmatProgress?.staticGKAccuracy || 0}%</span>
                      </div>
                      <Progress value={cmatProgress?.staticGKAccuracy || 0} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-slate-300">Economy Concepts &amp; Banking</span>
                        <span className="text-amber-300">{cmatProgress?.economyAccuracy || 0}%</span>
                      </div>
                      <Progress value={cmatProgress?.economyAccuracy || 0} className="h-2" />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-yellow-400 uppercase tracking-wider">
                    Innovation &amp; Entrepreneurship Breakdown
                  </h4>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-slate-300">Entrepreneurship Fundamentals</span>
                        <span className="text-yellow-300">{cmatProgress?.innovationAccuracy || 0}%</span>
                      </div>
                      <Progress value={cmatProgress?.innovationAccuracy || 0} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-slate-300">Government Initiatives (Startup India, AIM)</span>
                        <span className="text-yellow-300">{cmatProgress?.innovationAccuracy || 0}%</span>
                      </div>
                      <Progress value={cmatProgress?.innovationAccuracy || 0} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-slate-300">Business Acumen &amp; Venture Capital</span>
                        <span className="text-yellow-300">{cmatProgress?.innovationAccuracy || 0}%</span>
                      </div>
                      <Progress value={cmatProgress?.innovationAccuracy || 0} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </AppShell>
  );
}
