"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  BrainCircuit,
  BookOpen,
  Target,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Scale,
  ShieldCheck,
  TrendingUp,
  Award,
  Clock,
  Layers,
  HelpCircle,
  Users,
  Eye,
  Check,
  RotateCcw,
  ArrowRight,
  Filter,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  XAT_DM_CONCEPTS,
  XAT_DM_CASELETS,
  DMCaselet,
  DMCaseletQuestion,
  recordDMAttempt,
  getXATProgress,
} from "@/lib/xat";

export default function XATDecisionMakingStudioPage() {
  const [activeTab, setActiveTab] = useState<"CONCEPTS" | "PRACTICE" | "XAT_SETS" | "XAT_HARD">("PRACTICE");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [activeCaseletIndex, setActiveCaseletIndex] = useState(0);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  // User answers per question in active caselet: { [qId]: selectedOption }
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});
  const [expandedConceptId, setExpandedConceptId] = useState<string | null>("dm-concept-01");

  // Filter caselets based on tab and category
  const filteredCaselets = XAT_DM_CASELETS.filter((c) => {
    if (activeTab === "XAT_SETS" && c.difficulty !== "XAT_LEVEL") return false;
    if (activeTab === "XAT_HARD" && c.difficulty !== "XAT_HARD") return false;
    if (selectedCategory !== "ALL" && c.category !== selectedCategory) return false;
    return true;
  });

  const currentCaselet: DMCaselet | undefined =
    filteredCaselets[activeCaseletIndex] || filteredCaselets[0] || XAT_DM_CASELETS[0];

  const currentQuestion: DMCaseletQuestion | undefined =
    currentCaselet?.questions[activeQuestionIndex] || currentCaselet?.questions[0];

  const handleSelectOption = (qId: string, optionLabel: string) => {
    if (revealedSolutions[qId]) return; // lock after revealing
    setUserAnswers((prev) => ({ ...prev, [qId]: optionLabel }));
  };

  const handleCheckAnswer = (qId: string) => {
    setRevealedSolutions((prev) => ({ ...prev, [qId]: true }));
  };

  const handleCompleteCaselet = () => {
    if (!currentCaselet) return;
    let correct = 0;
    currentCaselet.questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) correct++;
    });
    const total = currentCaselet.questions.length;
    const pct = Math.round((correct / total) * 100);

    recordDMAttempt({
      caseletTitle: currentCaselet.title,
      scoreFraction: `${correct}/${total} (${pct}%)`,
      accuracyPct: pct,
    });
  };

  const categories = [
    "ALL",
    "Ethical Dilemmas",
    "Resource Allocation",
    "Workplace Dilemmas",
    "Managerial Caselets",
    "Business Scenarios",
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
            <span className="text-amber-400 font-semibold">Decision Making (DM)</span>
          </div>

          <Badge variant="outline" className="border-amber-500/40 text-amber-300 bg-amber-500/10 text-xs">
            XAT EXCLUSIVE MODULE
          </Badge>
        </div>

        {/* Studio Header */}
        <div className="p-6 sm:p-8 rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-950/40 via-[#0e1422] to-[#0e1422] relative overflow-hidden shadow-2xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                  XAT → Decision Making
                </span>
                <Badge variant="verified" className="text-xs">
                  XLRI STANDARD
                </Badge>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                XAT Decision Making Studio
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
                Master the signature section of the Xavier Aptitude Test. Rigorous training across multi-question
                managerial caselets, ethical trade-offs, resource allocation dilemmas, and stakeholder balance
                evaluated against strict XLRI fairness criteria.
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
              onClick={() => setActiveTab("PRACTICE")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "PRACTICE"
                  ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              <Target className="h-4 w-4" />
              <span>Practice Caselets</span>
            </button>

            <button
              onClick={() => setActiveTab("CONCEPTS")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "CONCEPTS"
                  ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>Learn Concepts (12 Guides)</span>
            </button>

            <button
              onClick={() => setActiveTab("XAT_SETS")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "XAT_SETS"
                  ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              <Award className="h-4 w-4" />
              <span>XAT-Level Sets</span>
            </button>

            <button
              onClick={() => setActiveTab("XAT_HARD")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "XAT_HARD"
                  ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              <Sparkles className="h-4 w-4" />
              <span>XAT Hard Caselets</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MODE 1: 12 CANONICAL DM CONCEPTS                                          */}
        {/* ========================================================================= */}
        {activeTab === "CONCEPTS" && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-amber-400" />
                  <span>The 12 Canonical Decision Making Concepts</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  The official conceptual frameworks formulated for XLRI business and ethical dilemma analysis
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {XAT_DM_CONCEPTS.map((concept) => {
                const isExpanded = expandedConceptId === concept.id;
                return (
                  <div
                    key={concept.id}
                    className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all space-y-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-bold text-amber-400 text-sm">
                          {concept.number}
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-white">{concept.title}</h3>
                          <span className="text-[11px] text-amber-300/80 font-medium">
                            XLRI Assessment Pillar
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => setExpandedConceptId(isExpanded ? null : concept.id)}
                        className="text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800"
                      >
                        {isExpanded ? "Collapse" : "Expand"}
                      </button>
                    </div>

                    <p className="text-xs text-slate-300 font-medium italic border-l-2 border-amber-500/50 pl-3">
                      "{concept.corePrinciple}"
                    </p>

                    <p className="text-xs text-slate-400 leading-relaxed">{concept.overview}</p>

                    {isExpanded && (
                      <div className="space-y-4 pt-3 border-t border-slate-800/80 animate-in fade-in duration-200">
                        <div className="space-y-1.5">
                          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                            Decision Rules
                          </h4>
                          <ul className="space-y-1 text-xs text-slate-300 list-disc list-inside">
                            {concept.decisionRules.map((rule, idx) => (
                              <li key={idx}>{rule}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/20 space-y-2">
                          <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                            <Scale className="h-3.5 w-3.5" />
                            <span>Worked Caselet Example</span>
                          </span>
                          <p className="text-xs text-slate-300">
                            <strong>Situation:</strong> {concept.caseletExample.situation}
                          </p>
                          <div className="p-2.5 rounded-lg bg-rose-950/30 border border-rose-500/30 text-xs text-rose-200">
                            <strong>Common Trap:</strong> {concept.caseletExample.trapOption}
                            <div className="text-[11px] text-rose-300/80 mt-0.5">
                              Why: {concept.caseletExample.whyTrap}
                            </div>
                          </div>
                          <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-200">
                            <strong>Optimal Option:</strong> {concept.caseletExample.optimalOption}
                            <div className="text-[11px] text-emerald-300/80 mt-0.5">
                              Why: {concept.caseletExample.whyOptimal}
                            </div>
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-900 text-xs text-slate-300">
                          <strong className="text-white">XLRI Perspective:</strong> {concept.xlriPerspective}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODE 2, 3, 4: CASELET RUNNER (PRACTICE, XAT-LEVEL, XAT HARD)              */}
        {/* ========================================================================= */}
        {activeTab !== "CONCEPTS" && currentCaselet && currentQuestion && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* Caselet Selector Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                <span className="text-xs font-semibold text-slate-400 shrink-0">Caselets:</span>
                {filteredCaselets.map((c, idx) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setActiveCaseletIndex(idx);
                      setActiveQuestionIndex(0);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      activeCaseletIndex === idx
                        ? "bg-amber-500 text-slate-950 font-bold"
                        : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                    }`}
                  >
                    <span>Set {idx + 1}: {c.title.split(":")[0]}</span>
                  </button>
                ))}
              </div>

              <Badge variant="outline" className="border-slate-700 text-slate-300 text-xs shrink-0 self-start sm:self-auto">
                {currentCaselet.category} • {currentCaselet.difficulty}
              </Badge>
            </div>

            {/* Split Pane: Left Scenario, Right Question */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Full Caselet Scenario & Context (7 Cols) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800/90 space-y-5 shadow-lg">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <h2 className="text-lg font-bold text-white">{currentCaselet.title}</h2>
                    <Badge variant="outline" className="text-[10px] text-amber-400 border-amber-500/30">
                      {currentCaselet.questions.length} Connected Questions
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                      Case Scenario &amp; Background
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {currentCaselet.scenario}
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                      {currentCaselet.background}
                    </p>
                  </div>

                  {/* Stakeholders Matrix */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5 text-amber-400" />
                      <span>Stakeholders &amp; Key Interests</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {currentCaselet.stakeholders.map((sh, idx) => (
                        <div key={idx} className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                          <span className="font-bold text-white">{sh.name}</span>
                          <span className="text-[10px] text-amber-300/80 block">{sh.role}</span>
                          <span className="text-slate-400 text-[11px] mt-0.5 block">{sh.interest}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Constraints & Competing Interests */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 space-y-1">
                      <span className="text-[11px] font-bold text-rose-400">Constraints</span>
                      <ul className="text-[11px] text-slate-300 space-y-0.5 list-disc list-inside">
                        {currentCaselet.constraints.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 space-y-1">
                      <span className="text-[11px] font-bold text-blue-400">Decision Objective</span>
                      <p className="text-[11px] text-slate-300 leading-tight">
                        {currentCaselet.decisionObjective}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Question Runner (5 Cols) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800/90 space-y-5 shadow-lg">
                  {/* Question Navigator */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-1.5">
                      {currentCaselet.questions.map((q, qIdx) => {
                        const isAns = userAnswers[q.id];
                        const isRev = revealedSolutions[q.id];
                        const isCor = isAns === q.correctAnswer;
                        return (
                          <button
                            key={q.id}
                            onClick={() => setActiveQuestionIndex(qIdx)}
                            className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                              activeQuestionIndex === qIdx
                                ? "bg-amber-500 text-slate-950 ring-2 ring-amber-400"
                                : isRev && isCor
                                ? "bg-emerald-600 text-white"
                                : isRev && !isCor
                                ? "bg-rose-600 text-white"
                                : isAns
                                ? "bg-indigo-600 text-white"
                                : "bg-slate-900 text-slate-400 border border-slate-800"
                            }`}
                          >
                            {qIdx + 1}
                          </button>
                        );
                      })}
                    </div>

                    <span className="text-[11px] text-slate-400">
                      Q{activeQuestionIndex + 1} of {currentCaselet.questions.length}
                    </span>
                  </div>

                  {/* Question Text */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                      {currentQuestion.conceptTested}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                      {currentQuestion.questionText}
                    </h3>
                  </div>

                  {/* 5 Options List */}
                  <div className="space-y-2">
                    {currentQuestion.options.map((opt) => {
                      const isSelected = userAnswers[currentQuestion.id] === opt.label;
                      const isRevealed = revealedSolutions[currentQuestion.id];
                      const isCorrect = currentQuestion.correctAnswer === opt.label;

                      let optClasses = "bg-slate-900/70 border-slate-800 text-slate-200 hover:border-slate-700";
                      if (isSelected) {
                        optClasses = "bg-indigo-950/60 border-indigo-500 text-white";
                      }
                      if (isRevealed) {
                        if (isCorrect) {
                          optClasses = "bg-emerald-950/70 border-emerald-500 text-emerald-200 font-semibold";
                        } else if (isSelected && !isCorrect) {
                          optClasses = "bg-rose-950/70 border-rose-500 text-rose-200";
                        }
                      }

                      return (
                        <button
                          key={opt.label}
                          onClick={() => handleSelectOption(currentQuestion.id, opt.label)}
                          className={`w-full p-3 rounded-2xl border text-left text-xs transition-all flex items-start gap-2.5 cursor-pointer ${optClasses}`}
                        >
                          <span
                            className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5 ${
                              isSelected
                                ? "bg-amber-500 text-slate-950"
                                : "bg-slate-800 text-slate-400"
                            }`}
                          >
                            {opt.label}
                          </span>
                          <span className="leading-relaxed">{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                    <Button
                      onClick={() => handleCheckAnswer(currentQuestion.id)}
                      disabled={!userAnswers[currentQuestion.id] || revealedSolutions[currentQuestion.id]}
                      size="sm"
                      className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
                    >
                      <span>Submit &amp; Evaluate Answer</span>
                    </Button>

                    <div className="flex items-center gap-2">
                      {activeQuestionIndex < currentCaselet.questions.length - 1 ? (
                        <Button
                          onClick={() => setActiveQuestionIndex((prev) => prev + 1)}
                          variant="secondary"
                          size="sm"
                          className="text-xs"
                        >
                          <span>Next Question</span>
                          <ChevronRight className="h-3.5 w-3.5 ml-1" />
                        </Button>
                      ) : (
                        <Button
                          onClick={handleCompleteCaselet}
                          variant="accent"
                          size="sm"
                          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                        >
                          <span>Save Caselet Result</span>
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Multi-Dimensional Validation Checklist (Revealed upon submission) */}
                  {revealedSolutions[currentQuestion.id] && (
                    <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white flex items-center gap-1.5">
                          {userAnswers[currentQuestion.id] === currentQuestion.correctAnswer ? (
                            <>
                              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                              <span className="text-emerald-400">Correct! Correct Answer: Option {currentQuestion.correctAnswer}</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="h-4 w-4 text-rose-400" />
                              <span className="text-rose-400">Incorrect. Correct Answer: Option {currentQuestion.correctAnswer}</span>
                            </>
                          )}
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        {currentQuestion.explanation}
                      </p>

                      <div className="p-2.5 rounded-xl bg-amber-950/20 border border-amber-500/20 text-xs text-amber-200">
                        <strong>Key Managerial Reasoning:</strong> {currentQuestion.keyReasoning}
                      </div>

                      {/* 7-Point Validation Checklist */}
                      <div className="space-y-1.5 pt-2 border-t border-slate-800">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          XLRI Decision Validation Matrix
                        </span>
                        <div className="grid grid-cols-1 gap-1 text-[11px] text-slate-300">
                          <div className="flex items-start gap-1.5">
                            <Check className="h-3 w-3 text-emerald-400 shrink-0 mt-0.5" />
                            <span><strong>Feasibility:</strong> {currentQuestion.validation.feasibility}</span>
                          </div>
                          <div className="flex items-start gap-1.5">
                            <Check className="h-3 w-3 text-emerald-400 shrink-0 mt-0.5" />
                            <span><strong>Stakeholder Impact:</strong> {currentQuestion.validation.stakeholderImpact}</span>
                          </div>
                          <div className="flex items-start gap-1.5">
                            <Check className="h-3 w-3 text-emerald-400 shrink-0 mt-0.5" />
                            <span><strong>Fairness:</strong> {currentQuestion.validation.fairness}</span>
                          </div>
                          <div className="flex items-start gap-1.5">
                            <Check className="h-3 w-3 text-emerald-400 shrink-0 mt-0.5" />
                            <span><strong>Ethical Consistency:</strong> {currentQuestion.validation.ethicalConsistency}</span>
                          </div>
                          <div className="flex items-start gap-1.5">
                            <Check className="h-3 w-3 text-emerald-400 shrink-0 mt-0.5" />
                            <span><strong>Long-term Consequence:</strong> {currentQuestion.validation.longTermConsequences}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
