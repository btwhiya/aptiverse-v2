"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
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
  Bookmark,
  Share2,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RC_PASSAGES, recordVARCAttempt, RCQuestion } from "@/lib/varc";

interface UserResponse {
  answer: string;
  isChecked: boolean;
  isCorrect?: boolean;
}

export default function RCPassageRunnerPage({
  params,
}: {
  params: Promise<{ passageId: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();

  const passage = RC_PASSAGES.find((p) => p.id === resolvedParams.passageId);

  if (!passage) {
    notFound();
  }

  const [activeQuestionIdx, setActiveQuestionIdx] = useState<number>(0);
  const [responses, setResponses] = useState<Record<number, UserResponse>>({});
  const [elapsedSec, setElapsedSec] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [showSummaryModal, setShowSummaryModal] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg">("sm");

  // Stopwatch
  useEffect(() => {
    if (!isTimerRunning) return;
    const interval = setInterval(() => {
      setElapsedSec((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const currentQ: RCQuestion = passage.questions[activeQuestionIdx];
  const currentResp: UserResponse | undefined = responses[activeQuestionIdx];

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSelectOption = (label: string) => {
    if (currentResp?.isChecked) return;
    setResponses((prev) => ({
      ...prev,
      [activeQuestionIdx]: {
        answer: label,
        isChecked: false,
      },
    }));
  };

  const handleCheckAnswer = () => {
    if (!currentResp?.answer) return;
    const isCorrect = currentResp.answer === currentQ.correctAnswer;

    setResponses((prev) => ({
      ...prev,
      [activeQuestionIdx]: {
        ...prev[activeQuestionIdx],
        isChecked: true,
        isCorrect,
      },
    }));

    recordVARCAttempt(currentQ.conceptId, isCorrect);
  };

  const handleClearResponse = () => {
    if (currentResp?.isChecked) return;
    setResponses((prev) => {
      const copy = { ...prev };
      delete copy[activeQuestionIdx];
      return copy;
    });
  };

  const handleSubmitSet = () => {
    setIsTimerRunning(false);
    setResponses((prev) => {
      const updated = { ...prev };
      passage.questions.forEach((q, idx) => {
        const resp = updated[idx];
        if (resp && resp.answer && !resp.isChecked) {
          const isCorrect = resp.answer === q.correctAnswer;
          updated[idx] = { ...resp, isChecked: true, isCorrect };
          recordVARCAttempt(q.conceptId, isCorrect);
        }
      });
      return updated;
    });
    setShowSummaryModal(true);
  };

  const calculateScore = () => {
    let score = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    let attempted = 0;

    passage.questions.forEach((q, idx) => {
      const r = responses[idx];
      if (r && r.answer) {
        attempted++;
        const isCorrect = r.answer === q.correctAnswer;
        if (isCorrect) {
          score += 3;
          correctCount++;
        } else {
          score -= 1; // CAT negative marking for MCQ
          incorrectCount++;
        }
      }
    });

    const accuracy = attempted > 0 ? Math.round((correctCount / attempted) * 100) : 0;
    return { score, correctCount, incorrectCount, attempted, accuracy };
  };

  const stats = calculateScore();

  // Split passage text into paragraphs for clean typography
  const paragraphs = passage.passageText
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);

  const fontSizeClass = {
    sm: "text-xs sm:text-sm leading-relaxed",
    base: "text-sm sm:text-base leading-relaxed",
    lg: "text-base sm:text-lg leading-relaxed",
  }[fontSize];

  return (
    <AppShell>
      <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-200">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <Link
              href="/learn/varc"
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              title="Back to VARC Hub"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="indigo" className="text-[10px] font-bold">
                  {passage.genre}
                </Badge>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  {passage.difficulty}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  ~{passage.wordCount} words
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white mt-1 line-clamp-1">
                {passage.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-800">
            {/* Font Size Adjuster */}
            <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-lg border border-slate-700/60 text-xs text-slate-300">
              <span className="text-[10px] text-slate-400 px-1">Size:</span>
              <button
                onClick={() => setFontSize("sm")}
                className={`px-2 py-0.5 rounded ${fontSize === "sm" ? "bg-slate-700 text-white font-bold" : "hover:text-white"}`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize("base")}
                className={`px-2 py-0.5 rounded ${fontSize === "base" ? "bg-slate-700 text-white font-bold" : "hover:text-white"}`}
              >
                A+
              </button>
              <button
                onClick={() => setFontSize("lg")}
                className={`px-2 py-0.5 rounded ${fontSize === "lg" ? "bg-slate-700 text-white font-bold" : "hover:text-white"}`}
              >
                A++
              </button>
            </div>

            {/* Stopwatch */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 font-mono text-sm font-bold text-slate-200">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>{formatTime(elapsedSec)}</span>
            </div>

            <Button
              onClick={handleSubmitSet}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2"
            >
              Submit Set
            </Button>
          </div>
        </div>

        {/* 2-Column Split Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: 500-600 Word Academic Passage (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <Card className="p-6 bg-slate-900/90 border border-slate-800 rounded-xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Passage Text ({paragraphs.length} Paragraphs)
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <span>Standard CAT Reading Interface</span>
                </div>
              </div>

              {/* Paragraphs with numbers */}
              <div className={`space-y-4 text-slate-200 ${fontSizeClass}`}>
                {paragraphs.map((para, pIdx) => (
                  <div key={pIdx} className="relative pl-6">
                    <span className="absolute left-0 top-0 text-[11px] font-mono text-slate-500 font-bold select-none">
                      [{pIdx + 1}]
                    </span>
                    <p className="leading-relaxed text-slate-300">{para}</p>
                  </div>
                ))}
              </div>

              {/* Themes Footer */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-400 font-medium">Core Themes:</span>
                {passage.keyThemes.map((t, idx) => (
                  <span key={idx} className="text-[11px] font-mono text-indigo-300 bg-indigo-950/40 border border-indigo-500/20 px-2 py-0.5 rounded">
                    #{t}
                  </span>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column: Question Runner, Palette & Explanation (5 Cols) */}
          <div className="lg:col-span-5 space-y-5 sticky top-6">
            {/* Question Palette */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Question Palette ({passage.questions.length} Items)
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {Object.values(responses).filter((r) => r.answer).length} / {passage.questions.length} Answered
                </span>
              </div>

              <div className="flex items-center gap-2">
                {passage.questions.map((q, idx) => {
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
                    btnBg += " ring-2 ring-emerald-400 ring-offset-2 ring-offset-slate-950";
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
            <Card className="p-5 md:p-6 bg-slate-900/90 border border-slate-800 rounded-xl space-y-5">
              {/* Question Metadata */}
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/40">
                    Q{activeQuestionIdx + 1} of {passage.questions.length}
                  </span>
                  <span className="text-xs text-slate-400 font-medium capitalize">
                    {currentQ.conceptId.replace("-", " ")}
                  </span>
                </div>
                <Badge variant="indigo" className="text-[10px]">
                  {currentQ.skillTested}
                </Badge>
              </div>

              {/* Question Prompt */}
              <p className="text-sm sm:text-base font-semibold text-slate-100 leading-relaxed">
                {currentQ.prompt}
              </p>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((opt) => {
                  const isSelected = currentResp?.answer === opt.label;
                  const isChecked = currentResp?.isChecked;
                  const isCorrectOpt = opt.label === currentQ.correctAnswer;

                  let optClass = "bg-slate-800/60 hover:bg-slate-800 text-slate-200 border-slate-700/80";

                  if (isSelected && !isChecked) {
                    optClass = "bg-indigo-600/20 text-indigo-200 border-indigo-500 shadow-md";
                  }

                  if (isChecked) {
                    if (isCorrectOpt) {
                      optClass = "bg-emerald-600/20 text-emerald-200 border-emerald-500 font-semibold";
                    } else if (isSelected && !isCorrectOpt) {
                      optClass = "bg-rose-600/20 text-rose-200 border-rose-500 line-through opacity-80";
                    } else {
                      optClass = "bg-slate-800/40 text-slate-400 border-slate-800 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={opt.label}
                      disabled={isChecked}
                      onClick={() => handleSelectOption(opt.label)}
                      className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 group ${optClass}`}
                    >
                      <span
                        className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold border shrink-0 mt-0.5 transition-colors ${
                          isSelected
                            ? "bg-indigo-600 text-white border-indigo-400"
                            : "bg-slate-700/80 text-slate-300 border-slate-600 group-hover:border-indigo-400"
                        }`}
                      >
                        {opt.label}
                      </span>
                      <span className="text-xs sm:text-sm leading-relaxed">{opt.text}</span>
                      {isChecked && isCorrectOpt && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 ml-auto shrink-0 mt-0.5" />
                      )}
                      {isChecked && isSelected && !isCorrectOpt && (
                        <XCircle className="w-4 h-4 text-rose-400 ml-auto shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Controls */}
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
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
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
                    disabled={activeQuestionIdx === passage.questions.length - 1}
                    onClick={() => setActiveQuestionIdx((prev) => prev + 1)}
                    className="text-xs border-slate-700 text-slate-300"
                  >
                    Next <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </div>
              </div>

              {/* Solution Accordion — Unlocked after checking answer */}
              {currentResp?.isChecked && currentQ.explanation && (
                <div className="mt-4 pt-4 border-t border-slate-800 space-y-3.5 animate-in fade-in duration-300">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-200 uppercase tracking-wider">
                    <Lightbulb className="w-4 h-4 text-amber-400" />
                    <span>Deductive Explanation &amp; Distractor Breakdown</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {currentQ.explanation.detailed}
                  </p>

                  {/* Why other options are wrong */}
                  <div className="space-y-2 p-3 rounded-lg bg-slate-800/60 border border-slate-700/60">
                    <h5 className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Distractor Elimination Analysis:
                    </h5>
                    {currentQ.explanation.optionsBreakdown.map((item) => (
                      <div key={item.label} className="text-xs flex items-start gap-2">
                        <span
                          className={`font-mono font-bold px-1.5 py-0.5 rounded text-[10px] shrink-0 mt-0.5 ${
                            item.isCorrect
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                              : "bg-rose-500/20 text-rose-400 border border-rose-500/40"
                          }`}
                        >
                          {item.label}
                        </span>
                        <span className="text-slate-300 leading-relaxed">{item.analysis}</span>
                      </div>
                    ))}
                  </div>

                  {/* CAT Strategy Tip */}
                  {currentQ.explanation.catTip && (
                    <div className="p-3 rounded-lg bg-indigo-950/40 border border-indigo-500/30 flex items-start gap-2 text-xs text-indigo-200">
                      <Zap className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-indigo-300">CAT Tip: </strong>
                        {currentQ.explanation.catTip}
                      </div>
                    </div>
                  )}

                  {/* Common Trap */}
                  {currentQ.explanation.commonTrap && (
                    <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-500/30 flex items-start gap-2 text-xs text-rose-200">
                      <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-rose-300">Classic Trap: </strong>
                        {currentQ.explanation.commonTrap}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Card>
          </div>
        </div>

        {/* Summary Modal */}
        {showSummaryModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <Card className="w-full max-w-lg bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">CAT RC Passage Complete</h3>
                <p className="text-xs text-slate-400">
                  {passage.title} &bull; {passage.genre}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
                  <span className="text-[10px] text-slate-400 block uppercase">CAT Score</span>
                  <span className={`text-xl font-mono font-extrabold ${stats.score >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                    {stats.score > 0 ? `+${stats.score}` : stats.score}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
                  <span className="text-[10px] text-slate-400 block uppercase">Accuracy</span>
                  <span className="text-xl font-mono font-extrabold text-white">
                    {stats.accuracy}%
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
                  <span className="text-[10px] text-slate-400 block uppercase">Correct</span>
                  <span className="text-xl font-mono font-extrabold text-emerald-400">
                    {stats.correctCount} / {passage.questions.length}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
                  <span className="text-[10px] text-slate-400 block uppercase">Time</span>
                  <span className="text-xl font-mono font-extrabold text-indigo-300">
                    {formatTime(elapsedSec)}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setShowSummaryModal(false)}
                  variant="outline"
                  className="flex-1 border-slate-700 text-slate-300 hover:text-white"
                >
                  Review Answers
                </Button>
                <Link href="/learn/varc" className="flex-1">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold">
                    Return to Hub
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        )}
      </div>
    </AppShell>
  );
}
