"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Clock,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Eye,
  Award,
  Zap,
  AlertTriangle,
  Lightbulb,
  FileText,
  HelpCircle,
  TrendingUp,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DILRQuestion, DILRSet } from "@/lib/dilr/types";
import { getDILRSetById, generateDILRSet } from "@/lib/dilr/registry";
import { DIVisualizationRenderer } from "@/components/dilr/DIVisualizationRenderer";

interface UserResponse {
  answer: string;
  isChecked: boolean;
  isCorrect?: boolean;
}

export default function DILRSetRunnerPage({
  params,
}: {
  params: Promise<{ setId: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();

  const [set, setSet] = useState<DILRSet | null>(null);
  const [activeQuestionIdx, setActiveQuestionIdx] = useState<number>(0);
  const [responses, setResponses] = useState<Record<number, UserResponse>>({});
  const [titaInput, setTitaInput] = useState<string>("");
  const [elapsedSec, setElapsedSec] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [showSummaryModal, setShowSummaryModal] = useState<boolean>(false);
  const [showPassageOnMobile, setShowPassageOnMobile] = useState<boolean>(true);

  // Initialize or load set
  useEffect(() => {
    let loadedSet = getDILRSetById(resolvedParams.setId);
    if (!loadedSet) {
      loadedSet = getDILRSetById(resolvedParams.setId);
    }
    if (loadedSet) {
      setSet(loadedSet);
    }
  }, [resolvedParams.setId]);

  // Stopwatch timer
  useEffect(() => {
    if (!isTimerRunning) return;
    const interval = setInterval(() => {
      setElapsedSec((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Synchronize TITA input when switching questions
  useEffect(() => {
    if (set && set.questions[activeQuestionIdx]?.questionType === "TITA") {
      setTitaInput(responses[activeQuestionIdx]?.answer || "");
    }
  }, [activeQuestionIdx, set, responses]);

  if (!set) {
    return (
      <AppShell>
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 text-sm font-medium">
            Verifying mathematical invariants and loading CAT set...
          </p>
        </div>
      </AppShell>
    );
  }

  const currentQ: DILRQuestion = set.questions[activeQuestionIdx];
  const currentResp: UserResponse | undefined = responses[activeQuestionIdx];

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSelectOption = (label: string) => {
    if (currentResp?.isChecked) return; // locked after checking
    setResponses((prev) => ({
      ...prev,
      [activeQuestionIdx]: {
        answer: label,
        isChecked: false,
      },
    }));
  };

  const handleTitaChange = (val: string) => {
    if (currentResp?.isChecked) return;
    setTitaInput(val);
    setResponses((prev) => ({
      ...prev,
      [activeQuestionIdx]: {
        answer: val.trim(),
        isChecked: false,
      },
    }));
  };

  const handleCheckAnswer = () => {
    const userAns = currentQ.questionType === "MCQ" ? currentResp?.answer : titaInput.trim();
    if (!userAns) return;

    let isCorrect = false;
    if (currentQ.questionType === "MCQ") {
      isCorrect = userAns.toUpperCase() === currentQ.correctAnswer.toUpperCase();
    } else {
      // TITA numeric check with tolerance for whitespace and decimals
      const uNum = parseFloat(userAns);
      const cNum = parseFloat(currentQ.correctAnswer);
      if (!Number.isNaN(uNum) && !Number.isNaN(cNum)) {
        isCorrect = Math.abs(uNum - cNum) < 0.01;
      } else {
        isCorrect = userAns.trim().toLowerCase() === currentQ.correctAnswer.trim().toLowerCase();
      }
    }

    setResponses((prev) => ({
      ...prev,
      [activeQuestionIdx]: {
        answer: userAns,
        isChecked: true,
        isCorrect,
      },
    }));
  };

  const handleClearResponse = () => {
    if (currentResp?.isChecked) return;
    setResponses((prev) => {
      const copy = { ...prev };
      delete copy[activeQuestionIdx];
      return copy;
    });
    setTitaInput("");
  };

  const handleSubmitSet = () => {
    setIsTimerRunning(false);
    // Mark any unchecked responses
    setResponses((prev) => {
      const updated = { ...prev };
      set.questions.forEach((q, idx) => {
        const resp = updated[idx];
        if (resp && resp.answer && !resp.isChecked) {
          let isCorrect = false;
          if (q.questionType === "MCQ") {
            isCorrect = resp.answer.toUpperCase() === q.correctAnswer.toUpperCase();
          } else {
            const uNum = parseFloat(resp.answer);
            const cNum = parseFloat(q.correctAnswer);
            if (!Number.isNaN(uNum) && !Number.isNaN(cNum)) {
              isCorrect = Math.abs(uNum - cNum) < 0.01;
            } else {
              isCorrect = resp.answer.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();
            }
          }
          updated[idx] = { ...resp, isChecked: true, isCorrect };
        }
      });
      return updated;
    });
    setShowSummaryModal(true);
  };

  // Calculate CAT Score
  const calculateScore = () => {
    let score = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    let attempted = 0;

    set.questions.forEach((q, idx) => {
      const r = responses[idx];
      if (r && r.answer) {
        attempted++;
        let isCorrect = false;
        if (q.questionType === "MCQ") {
          isCorrect = r.answer.toUpperCase() === q.correctAnswer.toUpperCase();
          if (isCorrect) {
            score += 3;
            correctCount++;
          } else {
            score -= 1; // CAT negative marking for MCQ
            incorrectCount++;
          }
        } else {
          const uNum = parseFloat(r.answer);
          const cNum = parseFloat(q.correctAnswer);
          if (!Number.isNaN(uNum) && !Number.isNaN(cNum)) {
            isCorrect = Math.abs(uNum - cNum) < 0.01;
          } else {
            isCorrect = r.answer.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();
          }
          if (isCorrect) {
            score += 3;
            correctCount++;
          } else {
            // 0 negative marking for TITA
            incorrectCount++;
          }
        }
      }
    });

    const accuracy = attempted > 0 ? Math.round((correctCount / attempted) * 100) : 0;
    return { score, correctCount, incorrectCount, attempted, accuracy };
  };

  const stats = calculateScore();

  return (
    <AppShell>
      <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-200">
        {/* Top Navbar: Back, Set Details, Timer, Submit */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <Link
              href="/learn/dilr"
              className="p-2 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              title="Back to DILR Concepts"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {set.section}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {set.topicTitle}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  {set.difficulty}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white mt-1 line-clamp-1">
                {set.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-800">
            {/* Stopwatch Timer */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 font-mono text-sm font-bold text-slate-200">
              <Clock className="w-4 h-4 text-indigo-400" />
              <span>{formatTime(elapsedSec)}</span>
            </div>

            <Button
              onClick={handleSubmitSet}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2 rounded-lg shadow-md shadow-emerald-600/20"
            >
              Submit Set
            </Button>
          </div>
        </div>

        {/* Main 2-Column Split Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Context, Passage & Visuals (7 Cols on desktop) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Mobile Toggle for Passage */}
            <div className="lg:hidden flex items-center justify-between p-3 rounded-lg bg-slate-800 border border-slate-700">
              <span className="text-xs font-semibold text-slate-300">Passage & Data Visuals</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPassageOnMobile(!showPassageOnMobile)}
                className="text-xs border-slate-600"
              >
                {showPassageOnMobile ? "Collapse Passage" : "Show Passage & Visuals"}
              </Button>
            </div>

            {showPassageOnMobile && (
              <div className="space-y-6">
                {/* Passage & Conditions Card */}
                <Card className="p-5 md:p-6 bg-slate-900/90 border border-slate-800 rounded-xl backdrop-blur-md space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
                    <FileText className="w-4 h-4 text-indigo-400" />
                    <h3 className="text-sm font-bold text-slate-200 tracking-wide uppercase">
                      Problem Context & Conditions
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                    {set.description}
                  </p>

                  {/* Bulleted conditions if present */}
                  {set.conditions && set.conditions.length > 0 && (
                    <div className="p-3.5 rounded-lg bg-slate-800/60 border border-slate-700/50 space-y-2">
                      <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                        Operational Constraints / Clues:
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {set.conditions.map((cond, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-indigo-400 font-bold shrink-0">•</span>
                            <span>{cond}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </Card>

                {/* Visual Chart / Table / Diagram */}
                <DIVisualizationRenderer
                  type={set.visualizationType}
                  data={set.visualizationData}
                />
              </div>
            )}
          </div>

          {/* Right Column: Question Runner, Palette & Solutions (5 Cols on desktop) */}
          <div className="lg:col-span-5 space-y-6 sticky top-6">
            {/* Question Palette Card */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 backdrop-blur-md">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Question Palette ({set.questions.length} Items)
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {Object.values(responses).filter((r) => r.answer).length} / {set.questions.length} Answered
                </span>
              </div>

              <div className="flex items-center gap-2">
                {set.questions.map((q, idx) => {
                  const resp = responses[idx];
                  const isAnswered = resp && resp.answer;
                  const isChecked = resp?.isChecked;
                  const isCorrect = resp?.isCorrect;
                  const isActive = idx === activeQuestionIdx;

                  let btnBg = "bg-slate-800 text-slate-300 border-slate-700";
                  if (isChecked) {
                    btnBg = isCorrect
                      ? "bg-emerald-600 text-white border-emerald-500"
                      : "bg-rose-600 text-white border-rose-500";
                  } else if (isAnswered) {
                    btnBg = "bg-indigo-600 text-white border-indigo-500";
                  }

                  if (isActive) {
                    btnBg += " ring-2 ring-indigo-400 ring-offset-2 ring-offset-slate-950";
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveQuestionIdx(idx)}
                      className={`w-9 h-9 rounded-lg font-bold text-xs border transition-all flex items-center justify-center ${btnBg}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Question Card */}
            <Card className="p-5 md:p-6 bg-slate-900/90 border border-slate-800 rounded-xl backdrop-blur-md space-y-5">
              {/* Question Metadata */}
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800/40">
                    Q{activeQuestionIdx + 1} of {set.questions.length}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {currentQ.questionType}
                  </span>
                </div>
                <Badge variant="indigo" className="text-[11px]">
                  {currentQ.skillTested}
                </Badge>
              </div>

              {/* Question Prompt */}
              <p className="text-sm sm:text-base font-semibold text-slate-100 leading-relaxed">
                {currentQ.questionText}
              </p>

              {/* Options or TITA Input */}
              {currentQ.questionType === "MCQ" ? (
                <div className="space-y-2.5">
                  {currentQ.options.map((opt) => {
                    const isSelected = currentResp?.answer === opt.label;
                    const isChecked = currentResp?.isChecked;
                    const isCorrectOpt = opt.label === currentQ.correctAnswer;

                    let optClass =
                      "bg-slate-800/60 hover:bg-slate-800 text-slate-200 border-slate-700/80";

                    if (isSelected && !isChecked) {
                      optClass =
                        "bg-indigo-600/20 text-indigo-200 border-indigo-500 shadow-md";
                    }

                    if (isChecked) {
                      if (isCorrectOpt) {
                        optClass =
                          "bg-emerald-600/20 text-emerald-200 border-emerald-500 font-semibold";
                      } else if (isSelected && !isCorrectOpt) {
                        optClass =
                          "bg-rose-600/20 text-rose-200 border-rose-500 line-through opacity-80";
                      } else {
                        optClass = "bg-slate-800/40 text-slate-400 border-slate-800 opacity-60";
                      }
                    }

                    return (
                      <button
                        key={opt.label}
                        disabled={isChecked}
                        onClick={() => handleSelectOption(opt.label)}
                        className={`w-full text-left p-3 rounded-xl border transition-all flex items-center gap-3.5 group ${optClass}`}
                      >
                        <span
                          className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold border shrink-0 transition-colors ${
                            isSelected
                              ? "bg-indigo-600 text-white border-indigo-400"
                              : "bg-slate-700/80 text-slate-300 border-slate-600 group-hover:border-indigo-400"
                          }`}
                        >
                          {opt.label}
                        </span>
                        <span className="text-xs sm:text-sm">{opt.text}</span>
                        {isChecked && isCorrectOpt && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 ml-auto shrink-0" />
                        )}
                        {isChecked && isSelected && !isCorrectOpt && (
                          <XCircle className="w-4 h-4 text-rose-400 ml-auto shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              ) : (
                /* TITA Input Box */
                <div className="space-y-2">
                  <label className="text-xs text-slate-400 font-medium">
                    Type In The Answer (TITA):
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      disabled={currentResp?.isChecked}
                      value={titaInput}
                      onChange={(e) => handleTitaChange(e.target.value)}
                      placeholder="Enter integer or decimal..."
                      className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-100 font-mono text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                  {currentResp?.isChecked && (
                    <div className="mt-2 text-xs font-semibold flex items-center gap-1.5">
                      {currentResp.isCorrect ? (
                        <span className="text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Correct Answer: {currentQ.correctAnswer}
                        </span>
                      ) : (
                        <span className="text-rose-400 flex items-center gap-1">
                          <XCircle className="w-4 h-4" /> Incorrect. Correct Answer: {currentQ.correctAnswer}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Action Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!currentResp?.answer || currentResp?.isChecked}
                    onClick={handleClearResponse}
                    className="text-xs border-slate-700 text-slate-400 hover:text-slate-200"
                  >
                    Clear
                  </Button>
                  <Button
                    size="sm"
                    disabled={!currentResp?.answer || currentResp?.isChecked}
                    onClick={handleCheckAnswer}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs"
                  >
                    Check Answer
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={activeQuestionIdx === 0}
                    onClick={() => setActiveQuestionIdx((prev) => prev - 1)}
                    className="text-xs border-slate-700 text-slate-300"
                  >
                    <ChevronLeft className="w-3.5 h-3.5 mr-1" /> Prev
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={activeQuestionIdx === set.questions.length - 1}
                    onClick={() => setActiveQuestionIdx((prev) => prev + 1)}
                    className="text-xs border-slate-700 text-slate-300"
                  >
                    Next <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </div>
              </div>

              {/* Solution Accordion — Unlocked after checking or set submission */}
              {currentResp?.isChecked && currentQ.explanation && (
                <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-3.5 animate-in fade-in duration-300">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-200 uppercase tracking-wider">
                    <Lightbulb className="w-4 h-4 text-amber-400" />
                    <span>Comprehensive CAT Solution & Strategy</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {currentQ.explanation.detailed}
                  </p>

                  {/* Step by step */}
                  {currentQ.explanation.steps && currentQ.explanation.steps.length > 0 && (
                    <div className="space-y-1.5 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Deduction Pathway:
                      </span>
                      <ol className="space-y-1 text-xs text-slate-300 list-decimal list-inside">
                        {currentQ.explanation.steps.map((step, sIdx) => (
                          <li key={sIdx} className="leading-relaxed">
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {/* CAT Shortcut */}
                  {currentQ.explanation.shortcut && (
                    <div className="p-3 rounded-lg bg-indigo-950/40 border border-indigo-500/30 flex items-start gap-2.5 text-xs text-indigo-200">
                      <Zap className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-indigo-300">CAT Pro Tip / Shortcut: </span>
                        {currentQ.explanation.shortcut}
                      </div>
                    </div>
                  )}

                  {/* Common Mistake Trap */}
                  {currentQ.explanation.commonMistake && (
                    <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-500/30 flex items-start gap-2.5 text-xs text-rose-200">
                      <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-rose-300">Classic Pitfall / Trap: </span>
                        {currentQ.explanation.commonMistake}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>

      {/* Set Summary Modal */}
      {showSummaryModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <Card className="w-full max-w-lg bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mx-auto">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-white">Set Practice Concluded</h3>
              <p className="text-xs text-slate-400">
                {set.title} • {set.difficulty}
              </p>
            </div>

            {/* Score Grid */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
                <div className="text-xl font-black text-white">{stats.score}</div>
                <div className="text-[11px] text-slate-400 font-medium">CAT Score (+3/-1)</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
                <div className="text-xl font-black text-emerald-400">{stats.accuracy}%</div>
                <div className="text-[11px] text-slate-400 font-medium">Accuracy</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
                <div className="text-xl font-black text-indigo-400">{formatTime(elapsedSec)}</div>
                <div className="text-[11px] text-slate-400 font-medium">Total Time</div>
              </div>
            </div>

            {/* Breakdown per question */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Question Breakdown
              </span>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {set.questions.map((q, idx) => {
                  const r = responses[idx];
                  const isCorrect = r?.isCorrect;
                  const hasAnswered = !!r?.answer;

                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-slate-800/60 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-300">Q{idx + 1}</span>
                        <span className="text-slate-400 line-clamp-1 max-w-[200px]">
                          {q.skillTested}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {hasAnswered ? (
                          isCorrect ? (
                            <span className="text-emerald-400 font-bold flex items-center gap-1">
                              +3 <CheckCircle2 className="w-3.5 h-3.5" />
                            </span>
                          ) : (
                            <span className="text-rose-400 font-bold flex items-center gap-1">
                              {q.questionType === "MCQ" ? "-1" : "0"} <XCircle className="w-3.5 h-3.5" />
                            </span>
                          )
                        ) : (
                          <span className="text-slate-500 font-mono">Unattempted</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setShowSummaryModal(false)}
                className="flex-1 border-slate-700 text-xs font-semibold"
              >
                Review Set
              </Button>
              <Button
                onClick={() => {
                  const newSet = generateDILRSet(set.topic, set.difficulty);
                  router.push(`/learn/dilr/set/${newSet.id}`);
                  setShowSummaryModal(false);
                }}
                className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold"
              >
                Next {set.topicTitle} Set
              </Button>
            </div>
          </Card>
        </div>
      )}
    </AppShell>
  );
}
