"use client";

import React, { Suspense, useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Sparkles,
  BookOpen,
  BrainCircuit,
  Target,
  Scale,
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
  Lightbulb,
  AlertTriangle,
  FileCheck2,
  BarChart2,
  PieChart as PieChartIcon,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  SNAP_CONCEPT_GUIDES,
  SNAP_QUESTION_BANK,
  SNAPConceptGuide,
  SNAPQuestion,
  SNAPTopic,
  SNAPDIQuestion,
  SNAPDataSufficiencyQuestion,
  SNAPEthicsQuestion,
  SNAPRCQuestion,
  SNAPVocabQuestion,
  SNAPParaJumbleQuestion,
  SNAPGrammarQuestion,
  getSNAPProgress,
  recordSNAPAttempt,
  fetchWordEnrichment,
  WordEnrichmentResult,
  SNAPProgressMetrics,
} from "@/lib/snap";

function SNAPStudioContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "concepts";

  const [activeMainTab, setActiveMainTab] = useState(initialTab);
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(0);
  const [selectedTopicFilter, setSelectedTopicFilter] = useState<string>("ALL");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("ALL");

  // Solver State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());

  // Vocab Enrichment Tool State
  const [vocabSearchWord, setVocabSearchWord] = useState("obdurate");
  const [vocabLoading, setVocabLoading] = useState(false);
  const [vocabResult, setVocabResult] = useState<WordEnrichmentResult | null>(null);

  // Progress State
  const [snapProgress, setSnapProgress] = useState<SNAPProgressMetrics | null>(null);

  useEffect(() => {
    setSnapProgress(getSNAPProgress());
    handleVocabLookup("obdurate");
  }, []);

  const handleVocabLookup = async (word: string) => {
    if (!word.trim()) return;
    setVocabLoading(true);
    try {
      const res = await fetchWordEnrichment(word.trim());
      setVocabResult(res);
    } catch {
      // Graceful fallback handled by api-service
    } finally {
      setVocabLoading(false);
    }
  };

  // Filtered Questions for Practice
  const filteredQuestions = useMemo(() => {
    return SNAP_QUESTION_BANK.filter((q) => {
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
  const selectedConcept = SNAP_CONCEPT_GUIDES[selectedConceptIndex] || SNAP_CONCEPT_GUIDES[0];

  const handleOptionSelect = (label: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(label);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption || isAnswerSubmitted || !currentQ) return;
    setIsAnswerSubmitted(true);

    const timeSpent = Math.max(5, Math.round((Date.now() - questionStartTime) / 1000));
    const isCorrect = selectedOption === currentQ.correctAnswer;
    const updated = recordSNAPAttempt(currentQ, isCorrect, timeSpent);
    setSnapProgress(updated);
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setQuestionStartTime(Date.now());
    setCurrentQuestionIndex((prev) => (prev + 1) % (filteredQuestions.length || 1));
  };

  // Render DI Chart SVG helper
  const renderDIChart = (q: SNAPDIQuestion) => {
    const chart = q.chart;
    if (chart.type === "bar") {
      const maxVal = Math.max(...chart.series.flatMap((s) => s.data)) * 1.15 || 100;
      return (
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <BarChart2 className="h-4 w-4 text-emerald-400" /> {chart.title}
            </span>
            <div className="flex gap-3 text-[11px]">
              {chart.series.map((s, idx) => (
                <div key={idx} className="flex items-center gap-1">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: s.color || "#4f46e5" }} />
                  <span className="text-slate-300 font-medium">{s.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="h-44 flex items-end justify-around gap-2 pt-6 pb-2 px-2 border-b border-slate-800">
            {chart.categories.map((cat, cIdx) => (
              <div key={cIdx} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex items-end justify-center gap-1 h-32">
                  {chart.series.map((s, sIdx) => {
                    const val = s.data[cIdx] || 0;
                    const heightPercent = Math.round((val / maxVal) * 100);
                    return (
                      <div
                        key={sIdx}
                        className="w-1/2 rounded-t transition-all hover:opacity-80 relative group flex justify-center"
                        style={{ height: `${heightPercent}%`, backgroundColor: s.color || "#4f46e5" }}
                      >
                        <span className="absolute -top-5 text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          {val}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <span className="text-[10px] text-slate-400 font-semibold">{cat}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (chart.type === "pie") {
      const data = chart.series[0]?.data || [50, 50];
      const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ec4899", "#8b5cf6"];
      return (
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
          <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <PieChartIcon className="h-4 w-4 text-blue-400" /> {chart.title}
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
            {chart.categories.map((cat, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                <div className="h-1.5 w-full rounded-full mb-1.5" style={{ backgroundColor: colors[idx % colors.length] }} />
                <p className="text-[11px] text-slate-400">{cat}</p>
                <p className="text-sm font-bold text-white">{data[idx]}%</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto space-y-6 pb-16">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Link href="/exams/snap" className="hover:text-rose-400 transition-colors font-medium">
              SNAP Preparation Hub
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
            <span className="text-slate-200 font-bold">SNAP Concepts & Practice Studio</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-[11px] font-bold">
            <Flame className="h-3 w-3 text-rose-400" />
            SNAP ONLY MODULE
          </div>
        </div>

        {/* Main Tab Controls */}
        <div className="w-full space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 p-1 rounded-2xl w-full grid grid-cols-4 max-w-2xl">
            <button
              onClick={() => setActiveMainTab("concepts")}
              className={`rounded-xl text-xs font-semibold py-2 flex items-center justify-center transition-all ${
                activeMainTab === "concepts"
                  ? "bg-rose-600 text-white shadow-md shadow-rose-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <BookOpen className="h-3.5 w-3.5 mr-1.5" /> 12 Concepts
            </button>
            <button
              onClick={() => setActiveMainTab("practice")}
              className={`rounded-xl text-xs font-semibold py-2 flex items-center justify-center transition-all ${
                activeMainTab === "practice"
                  ? "bg-rose-600 text-white shadow-md shadow-rose-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Target className="h-3.5 w-3.5 mr-1.5" /> Practice Solver
            </button>
            <button
              onClick={() => setActiveMainTab("vocab")}
              className={`rounded-xl text-xs font-semibold py-2 flex items-center justify-center transition-all ${
                activeMainTab === "vocab"
                  ? "bg-rose-600 text-white shadow-md shadow-rose-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Sparkles className="h-3.5 w-3.5 mr-1.5" /> Vocab API
            </button>
            <button
              onClick={() => setActiveMainTab("analytics")}
              className={`rounded-xl text-xs font-semibold py-2 flex items-center justify-center transition-all ${
                activeMainTab === "analytics"
                  ? "bg-rose-600 text-white shadow-md shadow-rose-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <BarChart2 className="h-3.5 w-3.5 mr-1.5" /> Analytics
            </button>
          </div>

          {/* ========================================================
              TAB 1: 12 SNAP CONCEPTS GUIDE VIEWER
             ======================================================== */}
          {activeMainTab === "concepts" && (
            <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Concept Selector Sidebar */}
              <div className="lg:col-span-4 space-y-2">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <p className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    SNAP Curriculum Index (12 Concepts)
                  </p>
                  <p className="text-[11px] text-slate-400">Strictly mapped to SNAP official test syllabus</p>
                </div>
                <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
                  {SNAP_CONCEPT_GUIDES.map((concept, idx) => {
                    const isSelected = selectedConceptIndex === idx;
                    return (
                      <div
                        key={concept.id}
                        onClick={() => setSelectedConceptIndex(idx)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? "bg-rose-950/40 border-rose-500/60 text-white shadow-md shadow-rose-900/20"
                            : "bg-slate-900/40 border-slate-800/80 text-slate-300 hover:bg-slate-800/60 hover:text-white"
                        }`}
                      >
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wide">
                            {concept.section}
                          </span>
                          <p className="text-xs font-semibold">{concept.title}</p>
                        </div>
                        <span className="text-xs font-bold text-slate-500">#{concept.number}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Concept Deep Dive Card */}
              <div className="lg:col-span-8 space-y-4">
                <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-xl">
                  <CardHeader className="border-b border-slate-800 pb-4">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-rose-500/20 text-rose-300 border-rose-500/30">
                        {selectedConcept.section}
                      </Badge>
                      <span className="text-xs text-slate-400">Module #{selectedConcept.number} of 12</span>
                    </div>
                    <CardTitle className="text-2xl font-bold text-white mt-2">
                      {selectedConcept.title}
                    </CardTitle>
                    <CardDescription className="text-slate-300 text-sm leading-relaxed">
                      {selectedConcept.simpleExplanation}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-5 space-y-6">
                    {/* Worked Example */}
                    <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/90 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-bold text-indigo-400">
                        <Lightbulb className="h-4 w-4" /> WORKED EXAMPLE
                      </div>
                      <p className="text-xs font-semibold text-white">
                        {selectedConcept.workedExample.problem}
                      </p>
                      <div className="space-y-1.5 pl-3 border-l-2 border-indigo-500/40">
                        {selectedConcept.workedExample.stepByStepSolution.map((step, sIdx) => (
                          <p key={sIdx} className="text-xs text-slate-300">
                            {step}
                          </p>
                        ))}
                      </div>
                      <div className="p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-[11px] text-indigo-200">
                        <span className="font-bold">Key Takeaway: </span>
                        {selectedConcept.workedExample.keyTakeaway}
                      </div>
                    </div>

                    {/* Shortcuts & Tips vs Common Mistakes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                          <Sparkles className="h-3.5 w-3.5" /> SNAP Speed Shortcuts & Tips
                        </span>
                        <ul className="space-y-1.5 text-xs text-slate-300">
                          {selectedConcept.shortcutsAndTips.map((tip, tidx) => (
                            <li key={tidx} className="flex items-start gap-1.5">
                              <span className="text-emerald-400 font-bold">•</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-2">
                        <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                          <AlertTriangle className="h-3.5 w-3.5" /> Common Exam Traps
                        </span>
                        <ul className="space-y-1.5 text-xs text-slate-300">
                          {selectedConcept.commonMistakes.map((mistake, midx) => (
                            <li key={midx} className="flex items-start gap-1.5">
                              <span className="text-amber-400 font-bold">•</span>
                              <span>{mistake}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* SNAP Exam Perspective */}
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
                      <Clock className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-white">SNAP Pacing Perspective: </span>
                        {selectedConcept.snapPerspective}
                      </div>
                    </div>

                    {/* Quick Practice Drill Button */}
                    <div className="pt-2 flex justify-end">
                      <Button
                        onClick={() => {
                          setSelectedTopicFilter(selectedConcept.topic);
                          setActiveMainTab("practice");
                        }}
                        className="bg-rose-600 hover:bg-rose-500 text-white font-bold gap-2 text-xs"
                      >
                        Practice {selectedConcept.title} MCQs
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

          {/* ========================================================
              TAB 2: INTERACTIVE PRACTICE SOLVER
             ======================================================== */}
          {activeMainTab === "practice" && (
            <div className="space-y-6">
            {/* Filters Bar */}
            <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-semibold text-slate-400">Filter Topic:</span>
                <select
                  value={selectedTopicFilter}
                  onChange={(e) => {
                    setSelectedTopicFilter(e.target.value);
                    setCurrentQuestionIndex(0);
                    setSelectedOption(null);
                    setIsAnswerSubmitted(false);
                  }}
                  className="bg-slate-950 border border-slate-800 text-xs font-semibold text-white rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-rose-500"
                >
                  <option value="ALL">All SNAP Topics ({SNAP_QUESTION_BANK.length})</option>
                  <option value="Reading Comprehension">Reading Comprehension</option>
                  <option value="Verbal Ability">Verbal Ability</option>
                  <option value="Synonyms">Synonyms</option>
                  <option value="Antonyms">Antonyms</option>
                  <option value="Para-Jumbles">Para-Jumbles</option>
                  <option value="Grammar">Grammar</option>
                  <option value="Fill-in-the-Blanks">Fill-in-the-Blanks</option>
                  <option value="Seating Arrangements">Seating Arrangements</option>
                  <option value="Syllogisms">Syllogisms</option>
                  <option value="Coding-Decoding">Coding-Decoding</option>
                  <option value="Blood Relations">Blood Relations</option>
                  <option value="Series Completion">Series Completion</option>
                  <option value="Puzzles">Puzzles</option>
                  <option value="Quantitative Ability">Quantitative Ability</option>
                  <option value="Data Interpretation">Data Interpretation</option>
                  <option value="Data Sufficiency">Data Sufficiency</option>
                  <option value="Ethics, Morality & Values">Ethics, Morality & Values</option>
                </select>

                <span className="text-xs font-semibold text-slate-400 ml-2">Difficulty:</span>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => {
                    setSelectedDifficulty(e.target.value);
                    setCurrentQuestionIndex(0);
                    setSelectedOption(null);
                    setIsAnswerSubmitted(false);
                  }}
                  className="bg-slate-950 border border-slate-800 text-xs font-semibold text-white rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-rose-500"
                >
                  <option value="ALL">All Difficulties</option>
                  <option value="FOUNDATION">Foundation</option>
                  <option value="SNAP_LEVEL">SNAP Level</option>
                  <option value="SNAP_ADVANCED">SNAP Advanced</option>
                </select>
              </div>

              <div className="text-xs text-slate-400 font-medium">
                Showing question <span className="text-white font-bold">{currentQuestionIndex + 1}</span> of{" "}
                <span className="text-white font-bold">{filteredQuestions.length}</span>
              </div>
            </div>

            {/* Question Workspace Card */}
            {currentQ ? (
              <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-xl">
                <CardHeader className="border-b border-slate-800 pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-rose-500/20 text-rose-300 border-rose-500/30">
                        {currentQ.section}
                      </Badge>
                      <Badge variant="outline" className="text-slate-300 border-slate-700">
                        {currentQ.topic}
                      </Badge>
                      <Badge
                        className={`text-[10px] ${
                          currentQ.difficulty === "FOUNDATION"
                            ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                            : currentQ.difficulty === "SNAP_LEVEL"
                            ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
                            : "bg-purple-500/20 text-purple-300 border-purple-500/30"
                        }`}
                      >
                        {currentQ.difficulty}
                      </Badge>
                    </div>
                    <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                      <Clock className="h-3.5 w-3.5 text-slate-400" /> ~{currentQ.estimatedTimeSec}s budget
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="pt-5 space-y-5">
                  {/* Reading Comprehension Passage */}
                  {currentQ.topic === "Reading Comprehension" && (
                    <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                      <span className="text-xs font-bold text-indigo-400 uppercase tracking-wide">
                        Passage: {(currentQ as SNAPRCQuestion).passageTitle}
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed max-h-48 overflow-y-auto pr-2">
                        {(currentQ as SNAPRCQuestion).passageText}
                      </p>
                    </div>
                  )}

                  {/* Data Interpretation Visual Charts */}
                  {currentQ.topic === "Data Interpretation" && renderDIChart(currentQ as SNAPDIQuestion)}

                  {/* Ethics Scenario facts */}
                  {currentQ.topic === "Ethics, Morality & Values" && (
                    <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                      <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Scale className="h-4 w-4" /> Scenario Facts & Stakeholder Context
                      </span>
                      <p className="text-xs text-slate-200 leading-relaxed">
                        {(currentQ as SNAPEthicsQuestion).scenarioText}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        <span className="text-[10px] text-slate-400 font-semibold">Stakeholders:</span>
                        {(currentQ as SNAPEthicsQuestion).stakeholders.map((sh, idx) => (
                          <span key={idx} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                            {sh}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Question Stem */}
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-white whitespace-pre-line leading-relaxed">
                      {currentQ.question}
                    </p>
                  </div>

                  {/* Options List */}
                  <div className="space-y-2.5">
                    {currentQ.options.map((opt) => {
                      const isSelected = selectedOption === opt.label;
                      const isCorrect = isAnswerSubmitted && opt.label === currentQ.correctAnswer;
                      const isWrong = isAnswerSubmitted && isSelected && !isCorrect;

                      let optStyles =
                        "bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white";
                      if (isSelected && !isAnswerSubmitted) {
                        optStyles = "bg-rose-950/30 border-rose-500 text-white font-semibold";
                      } else if (isCorrect) {
                        optStyles = "bg-emerald-950/30 border-emerald-500 text-emerald-200 font-semibold";
                      } else if (isWrong) {
                        optStyles = "bg-red-950/30 border-red-500 text-red-200";
                      }

                      return (
                        <div
                          key={opt.label}
                          onClick={() => handleOptionSelect(opt.label)}
                          className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${optStyles}`}
                        >
                          <span
                            className={`h-6 w-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                              isSelected || isCorrect
                                ? "bg-rose-600 text-white"
                                : "bg-slate-800 text-slate-400"
                            }`}
                          >
                            {opt.label}
                          </span>
                          <span className="text-xs leading-relaxed pt-0.5">{opt.text}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Actions & Immediate Feedback */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                    <div className="text-xs">
                      {isAnswerSubmitted && (
                        <span
                          className={`font-bold flex items-center gap-1.5 ${
                            selectedOption === currentQ.correctAnswer
                              ? "text-emerald-400"
                              : "text-red-400"
                          }`}
                        >
                          {selectedOption === currentQ.correctAnswer ? (
                            <>
                              <CheckCircle2 className="h-4 w-4" /> Correct Answer! (+1.0 Mark)
                            </>
                          ) : (
                            <>
                              <XCircle className="h-4 w-4" /> Incorrect (-0.25 Mark). Correct was Option {currentQ.correctAnswer}.
                            </>
                          )}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      {!isAnswerSubmitted ? (
                        <Button
                          onClick={handleSubmitAnswer}
                          disabled={!selectedOption}
                          className="bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs"
                        >
                          Submit Answer
                        </Button>
                      ) : (
                        <Button
                          onClick={handleNextQuestion}
                          className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs gap-1.5"
                        >
                          Next Question <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Rich Explanation & Analysis */}
                  {isAnswerSubmitted && (
                    <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3 animate-in fade-in">
                      <span className="text-xs font-bold text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
                        <Lightbulb className="h-4 w-4 text-amber-400" /> Solution & Logical Analysis
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                        {currentQ.explanation}
                      </p>

                      {/* Special Details for Ethics Questions */}
                      {currentQ.topic === "Ethics, Morality & Values" && (
                        <div className="pt-2 space-y-2 border-t border-slate-800 text-xs">
                          <p className="text-slate-300">
                            <span className="font-bold text-rose-300">Governing Principle: </span>
                            {(currentQ as SNAPEthicsQuestion).keyPrinciple}
                          </p>
                          <p className="text-slate-300">
                            <span className="font-bold text-amber-300">Distractor Analysis: </span>
                            {(currentQ as SNAPEthicsQuestion).commonTrap}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="p-8 text-center text-slate-400 bg-slate-900/40 rounded-2xl border border-slate-800">
                No questions found matching the selected filter criteria.
              </div>
            )}
            </div>
          )}

          {/* ========================================================
              TAB 3: VOCABULARY API TOOL WITH LOCAL FALLBACK
             ======================================================== */}
          {activeMainTab === "vocab" && (
            <div className="space-y-6">
            <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-xl">
              <CardHeader className="border-b border-slate-800 pb-4">
                <div className="flex items-center justify-between">
                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                    OPEN VOCABULARY ENGINE
                  </Badge>
                  <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Free Open API + Zero-Drop Offline Cache
                  </span>
                </div>
                <CardTitle className="text-xl font-bold text-white mt-1">
                  SNAP Verbal Enrichment Studio
                </CardTitle>
                <CardDescription className="text-xs text-slate-300">
                  Instant word etymology, contextual definitions, synonyms, antonyms, and usage examples.
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-5 space-y-5">
                {/* Search Input Bar */}
                <div className="flex gap-2 max-w-lg">
                  <input
                    type="text"
                    value={vocabSearchWord}
                    onChange={(e) => setVocabSearchWord(e.target.value)}
                    placeholder="Search any SNAP vocabulary word (e.g. obdurate, taciturn, equivocal)..."
                    className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleVocabLookup(vocabSearchWord);
                    }}
                  />
                  <Button
                    onClick={() => handleVocabLookup(vocabSearchWord)}
                    disabled={vocabLoading}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs gap-1.5"
                  >
                    {vocabLoading ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Search className="h-3.5 w-3.5" />}
                    Lookup
                  </Button>
                </div>

                {/* Quick Word Tags */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] text-slate-400 font-semibold">Try High-Frequency Words:</span>
                  {["obdurate", "laconic", "pernicious", "taciturn", "inchoate", "ephemeral"].map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => {
                        setVocabSearchWord(w);
                        handleVocabLookup(w);
                      }}
                      className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-800 text-blue-300 hover:bg-blue-900/40 border border-slate-700 transition-colors"
                    >
                      {w}
                    </button>
                  ))}
                </div>

                {/* Enrichment Card Display */}
                {vocabResult && (
                  <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-black text-white uppercase tracking-tight">
                          {vocabResult.word}
                        </h3>
                        {vocabResult.phonetic && (
                          <span className="text-xs text-slate-400 font-mono">
                            {vocabResult.phonetic} • {vocabResult.partOfSpeech}
                          </span>
                        )}
                      </div>
                      <Badge variant="outline" className="text-[10px] text-slate-400 border-slate-800">
                        Source: {vocabResult.source}
                      </Badge>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Primary Meaning
                      </span>
                      <p className="text-xs text-slate-200 leading-relaxed">
                        {vocabResult.definition}
                      </p>
                    </div>

                    {vocabResult.exampleSentence && (
                      <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs italic text-slate-300">
                        "{vocabResult.exampleSentence}"
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                          Key Synonyms
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {vocabResult.synonyms.map((s: string, idx: number) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-300 border border-emerald-500/30 text-xs"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider">
                          Key Antonyms
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {vocabResult.antonyms.map((a: string, idx: number) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded bg-rose-950/40 text-rose-300 border border-rose-500/30 text-xs"
                            >
                              {a}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            </div>
          )}

          {/* ========================================================
              TAB 4: INDEPENDENT SNAP ANALYTICS
             ======================================================== */}
          {activeMainTab === "analytics" && (
            <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-slate-900/60 border-slate-800">
                <CardHeader className="pb-2">
                  <CardDescription className="text-xs text-slate-400 font-semibold">Total Attempted</CardDescription>
                  <CardTitle className="text-3xl font-bold text-white">
                    {snapProgress?.questionsAttempted || 0}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-slate-400">Questions answered in SNAP Studio</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/60 border-slate-800">
                <CardHeader className="pb-2">
                  <CardDescription className="text-xs text-slate-400 font-semibold">Overall Accuracy</CardDescription>
                  <CardTitle className="text-3xl font-bold text-rose-400">
                    {snapProgress?.overallAccuracy || 0}%
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-slate-400">
                    {snapProgress?.totalCorrect || 0} correct / {snapProgress?.totalIncorrect || 0} incorrect
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/60 border-slate-800">
                <CardHeader className="pb-2">
                  <CardDescription className="text-xs text-slate-400 font-semibold">Average Pace</CardDescription>
                  <CardTitle className="text-3xl font-bold text-indigo-400">
                    {snapProgress?.avgTimeSeconds || 0}s
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-slate-400">Target budget is ~60 seconds per question</p>
                </CardContent>
              </Card>
            </div>

            {/* Section Breakdown */}
            <Card className="bg-slate-900/60 border-slate-800">
              <CardHeader>
                <CardTitle className="text-base font-bold text-white">Section-wise Performance Breakdown</CardTitle>
                <CardDescription className="text-xs text-slate-400">
                  Tracked strictly under SNAP exam isolation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {snapProgress && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-300 font-medium">General English</span>
                      <span className="text-white font-bold">{snapProgress.sectionPerformance.verbal.accuracy}% ({snapProgress.sectionPerformance.verbal.attempted} Qs)</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-300 font-medium">Analytical & Logical Reasoning</span>
                      <span className="text-white font-bold">{snapProgress.sectionPerformance.logicalReasoning.accuracy}% ({snapProgress.sectionPerformance.logicalReasoning.attempted} Qs)</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-300 font-medium">Quantitative, DI & DS</span>
                      <span className="text-white font-bold">{snapProgress.sectionPerformance.quantitativeDI.accuracy}% ({snapProgress.sectionPerformance.quantitativeDI.attempted} Qs)</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-300 font-medium">Ethics, Morality & Values</span>
                      <span className="text-rose-400 font-bold">{snapProgress.sectionPerformance.ethicsValues.accuracy}% ({snapProgress.sectionPerformance.ethicsValues.attempted} Qs)</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
export default function SNAPStudioPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
      <SNAPStudioContent />
    </Suspense>
  );
}
