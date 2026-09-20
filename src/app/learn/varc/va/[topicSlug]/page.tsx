"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Clock,
  Award,
  Zap,
  AlertTriangle,
  Lightbulb,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  FileText,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  VA_PARAJUMBLES,
  VA_SUMMARIES,
  VA_ODD_ONE_OUT,
  VA_SENTENCE_COMPLETIONS,
  recordVARCAttempt,
  VAConceptId,
} from "@/lib/varc";

interface UserResponse {
  answer: string;
  isChecked: boolean;
  isCorrect?: boolean;
}

export default function VAPracticeRunnerPage({
  params,
}: {
  params: Promise<{ topicSlug: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const slug = resolvedParams.topicSlug as VAConceptId;

  // Select questions based on slug
  let title = "Verbal Ability Practice";
  let questions: any[] = [];

  if (slug === "para-jumbles") {
    title = "Para-Jumbles (TITA Sequence Drill)";
    questions = VA_PARAJUMBLES;
  } else if (slug === "para-summary") {
    title = "Paragraph Summary Drill";
    questions = VA_SUMMARIES;
  } else if (slug === "odd-one-out") {
    title = "Odd Sentence Out Drill";
    questions = VA_ODD_ONE_OUT;
  } else if (slug === "sentence-completion") {
    title = "Paragraph & Sentence Completion Drill";
    questions = VA_SENTENCE_COMPLETIONS;
  } else {
    notFound();
  }

  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [responses, setResponses] = useState<Record<number, UserResponse>>({});
  const [titaInput, setTitaInput] = useState<string>("");
  const [elapsedSec, setElapsedSec] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [showSummaryModal, setShowSummaryModal] = useState<boolean>(false);

  const currentQ = questions[activeIdx];
  const currentResp: UserResponse | undefined = responses[activeIdx];

  // Stopwatch
  useEffect(() => {
    if (!isTimerRunning) return;
    const interval = setInterval(() => setElapsedSec((p) => p + 1), 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Sync TITA input on question switch
  useEffect(() => {
    if (slug === "para-jumbles" || slug === "odd-one-out") {
      setTitaInput(responses[activeIdx]?.answer || "");
    }
  }, [activeIdx, slug, responses]);

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSelectMCQ = (label: string) => {
    if (currentResp?.isChecked) return;
    setResponses((prev) => ({
      ...prev,
      [activeIdx]: {
        answer: label,
        isChecked: false,
      },
    }));
  };

  const handleTitaChange = (val: string) => {
    if (currentResp?.isChecked) return;
    // Allow digits only
    const clean = val.replace(/\D/g, "");
    setTitaInput(clean);
    setResponses((prev) => ({
      ...prev,
      [activeIdx]: {
        answer: clean,
        isChecked: false,
      },
    }));
  };

  const handleCheckAnswer = () => {
    const userAns =
      slug === "para-jumbles" || slug === "odd-one-out"
        ? titaInput.trim()
        : currentResp?.answer;

    if (!userAns) return;

    let isCorrect = false;
    if (slug === "para-jumbles") {
      isCorrect = userAns === currentQ.correctSequence;
    } else if (slug === "odd-one-out") {
      isCorrect = userAns === currentQ.oddSentenceId.toString();
    } else {
      isCorrect = userAns === currentQ.correctAnswer;
    }

    setResponses((prev) => ({
      ...prev,
      [activeIdx]: {
        answer: userAns,
        isChecked: true,
        isCorrect,
      },
    }));

    recordVARCAttempt(slug, isCorrect);
  };

  const handleClear = () => {
    if (currentResp?.isChecked) return;
    setResponses((prev) => {
      const copy = { ...prev };
      delete copy[activeIdx];
      return copy;
    });
    setTitaInput("");
  };

  const handleSubmitAll = () => {
    setIsTimerRunning(false);
    setResponses((prev) => {
      const updated = { ...prev };
      questions.forEach((q, idx) => {
        const r = updated[idx];
        if (r && r.answer && !r.isChecked) {
          let isCorrect = false;
          if (slug === "para-jumbles") {
            isCorrect = r.answer === q.correctSequence;
          } else if (slug === "odd-one-out") {
            isCorrect = r.answer === q.oddSentenceId.toString();
          } else {
            isCorrect = r.answer === q.correctAnswer;
          }
          updated[idx] = { ...r, isChecked: true, isCorrect };
          recordVARCAttempt(slug, isCorrect);
        }
      });
      return updated;
    });
    setShowSummaryModal(true);
  };

  const calculateStats = () => {
    let score = 0;
    let correctCount = 0;
    let attempted = 0;

    questions.forEach((q, idx) => {
      const r = responses[idx];
      if (r && r.answer) {
        attempted++;
        let isCorrect = false;
        if (slug === "para-jumbles") {
          isCorrect = r.answer === q.correctSequence;
        } else if (slug === "odd-one-out") {
          isCorrect = r.answer === q.oddSentenceId.toString();
        } else {
          isCorrect = r.answer === q.correctAnswer;
        }

        if (isCorrect) {
          score += 3;
          correctCount++;
        } else {
          // In CAT: TITA has 0 negative marking, MCQ has -1
          if (q.questionType === "MCQ") {
            score -= 1;
          }
        }
      }
    });

    const accuracy = attempted > 0 ? Math.round((correctCount / attempted) * 100) : 0;
    return { score, correctCount, attempted, accuracy };
  };

  const stats = calculateStats();

  return (
    <AppShell>
      <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-200">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <Link
              href="/learn/varc"
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="indigo" className="text-[10px] font-bold">
                  VERBAL ABILITY
                </Badge>
                <span className="text-xs text-slate-400 font-mono">
                  {questions.length} Questions
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white mt-0.5">
                {title}
              </h2>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-800">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 font-mono text-sm font-bold text-slate-200">
              <Clock className="w-4 h-4 text-indigo-400" />
              <span>{formatTime(elapsedSec)}</span>
            </div>

            <Button
              onClick={handleSubmitAll}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-4 py-2"
            >
              Submit Drill
            </Button>
          </div>
        </div>

        {/* Question Palette Bar */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Drill Palette: Q{activeIdx + 1} of {questions.length}
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {questions.map((q, idx) => {
              const r = responses[idx];
              let btnClass = "bg-slate-800 text-slate-300 border-slate-700";
              if (r?.isChecked) {
                btnClass = r.isCorrect
                  ? "bg-emerald-600 text-white border-emerald-500"
                  : "bg-rose-600 text-white border-rose-500";
              } else if (r?.answer) {
                btnClass = "bg-indigo-600 text-white border-indigo-500";
              }
              if (idx === activeIdx) {
                btnClass += " ring-2 ring-indigo-400 ring-offset-2 ring-offset-slate-950";
              }

              return (
                <button
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  className={`w-8 h-8 rounded-lg font-bold text-xs border transition-all flex items-center justify-center ${btnClass}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Question Runner Card */}
        <Card className="p-6 bg-slate-900/90 border border-slate-800 rounded-xl space-y-6">
          {/* Stem & Prompt */}
          <div className="space-y-2 pb-3 border-b border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-400 font-mono">
                QUESTION #{activeIdx + 1}
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                {currentQ.questionType} &bull; {currentQ.difficulty}
              </span>
            </div>
            <p className="text-sm font-semibold text-slate-200">
              {currentQ.prompt}
            </p>
          </div>

          {/* QUESTION TYPE SPECIFIC DISPLAY */}

          {/* 1. PARA-JUMBLES */}
          {slug === "para-jumbles" && (
            <div className="space-y-4">
              <div className="space-y-2.5">
                {currentQ.sentences.map((sent: any) => (
                  <div
                    key={sent.id}
                    className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3"
                  >
                    <span className="w-6 h-6 rounded-md bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                      {sent.id}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {sent.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* TITA Sequence Input */}
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
                <label className="text-xs text-slate-300 font-medium block">
                  Key in the sequence (e.g. 3412):
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    disabled={currentResp?.isChecked}
                    maxLength={currentQ.sentences.length}
                    value={titaInput}
                    onChange={(e) => handleTitaChange(e.target.value)}
                    placeholder="e.g. 3412"
                    className="w-44 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-base tracking-widest text-center focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                  {currentResp?.isChecked && (
                    <div className="text-xs font-semibold">
                      {currentResp.isCorrect ? (
                        <span className="text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Correct Sequence: {currentQ.correctSequence}
                        </span>
                      ) : (
                        <span className="text-rose-400 flex items-center gap-1">
                          <XCircle className="w-4 h-4" /> Incorrect. Correct Sequence: {currentQ.correctSequence}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 2. PARAGRAPH SUMMARY */}
          {slug === "para-summary" && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {currentQ.paragraph}
                </p>
              </div>

              <div className="space-y-2.5">
                {currentQ.options.map((opt: any) => {
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
                      onClick={() => handleSelectMCQ(opt.label)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3.5 ${optClass}`}
                    >
                      <span className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold border shrink-0 mt-0.5 bg-slate-700 text-slate-200">
                        {opt.label}
                      </span>
                      <span className="text-xs sm:text-sm leading-relaxed">{opt.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. ODD ONE OUT */}
          {slug === "odd-one-out" && (
            <div className="space-y-4">
              <div className="space-y-2.5">
                {currentQ.sentences.map((sent: any) => {
                  const isSelected = titaInput === sent.id.toString();
                  const isChecked = currentResp?.isChecked;
                  const isOdd = sent.id === currentQ.oddSentenceId;

                  let cardClass = "bg-slate-950/60 border-slate-800/80 hover:border-slate-700";
                  if (isSelected && !isChecked) {
                    cardClass = "bg-indigo-950/30 border-indigo-500/80";
                  }
                  if (isChecked) {
                    if (isOdd) {
                      cardClass = "bg-emerald-950/30 border-emerald-500/80";
                    } else if (isSelected && !isOdd) {
                      cardClass = "bg-rose-950/30 border-rose-500/80 line-through opacity-70";
                    }
                  }

                  return (
                    <div
                      key={sent.id}
                      onClick={() => !isChecked && handleTitaChange(sent.id.toString())}
                      className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${cardClass}`}
                    >
                      <span className="w-6 h-6 rounded-md bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                        {sent.id}
                      </span>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                        {sent.text}
                      </p>
                      {isChecked && isOdd && (
                        <Badge variant="success" className="ml-auto shrink-0 text-[10px]">
                          ODD SENTENCE
                        </Badge>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between text-xs">
                <span className="text-slate-300">
                  Selected Odd Sentence: <strong className="text-white font-mono text-sm">{titaInput || "None"}</strong>
                </span>
                {currentResp?.isChecked && (
                  <span className={`font-bold ${currentResp.isCorrect ? "text-emerald-400" : "text-rose-400"}`}>
                    {currentResp.isCorrect ? "Correct Identification" : `Incorrect. Odd is Sentence ${currentQ.oddSentenceId}`}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* 4. SENTENCE COMPLETION */}
          {slug === "sentence-completion" && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {currentQ.paragraphWithBlank}
                </p>
              </div>

              <div className="space-y-2.5">
                {currentQ.options.map((opt: any) => {
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
                      onClick={() => handleSelectMCQ(opt.label)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3.5 ${optClass}`}
                    >
                      <span className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold border shrink-0 mt-0.5 bg-slate-700 text-slate-200">
                        {opt.label}
                      </span>
                      <span className="text-xs sm:text-sm leading-relaxed">{opt.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={!currentResp?.answer || currentResp?.isChecked}
                onClick={handleClear}
                className="text-xs border-slate-700 text-slate-400"
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
                disabled={activeIdx === 0}
                onClick={() => setActiveIdx((p) => p - 1)}
                className="text-xs border-slate-700 text-slate-300"
              >
                <ChevronLeft className="w-3.5 h-3.5 mr-1" /> Prev
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={activeIdx === questions.length - 1}
                onClick={() => setActiveIdx((p) => p + 1)}
                className="text-xs border-slate-700 text-slate-300"
              >
                Next <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>
          </div>

          {/* Explanation Accordion (Unlocked after answering) */}
          {currentResp?.isChecked && (
            <div className="mt-5 pt-5 border-t border-slate-800 space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-200 uppercase tracking-wider">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>Step-by-Step Structural Explanation</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {currentQ.explanation.detailed}
              </p>

              {/* Special details for Para-Jumbles */}
              {slug === "para-jumbles" && currentQ.explanation.structuralPairs && (
                <div className="space-y-2 p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <h5 className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider">
                    Mandatory Pairs &amp; Logical Links:
                  </h5>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {currentQ.explanation.structuralPairs.map((pair: string, pIdx: number) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <span className="text-indigo-400 font-bold">&bull;</span>
                        <span>{pair}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-2 border-t border-slate-700/60 text-xs text-slate-300">
                    <strong className="text-slate-200">Opening Sentence Reason: </strong>
                    {currentQ.explanation.openingSentenceReason}
                  </div>
                </div>
              )}

              {/* Special details for Odd One Out */}
              {slug === "odd-one-out" && (
                <div className="space-y-2 p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs">
                  <div>
                    <strong className="text-amber-300">Why Sentence {currentQ.oddSentenceId} Fails: </strong>
                    <span className="text-slate-300">{currentQ.explanation.whyOddFails}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-700/60">
                    <strong className="text-emerald-300">Coherent Sequence of Remaining 4: </strong>
                    <span className="font-mono text-white font-bold">{currentQ.coherentSequence}</span>
                    <span className="text-slate-400 block mt-0.5">{currentQ.explanation.coherentNarrativeFlow}</span>
                  </div>
                </div>
              )}

              {/* Per-option analysis for MCQ Summary & Completion */}
              {(slug === "para-summary" || slug === "sentence-completion") &&
                currentQ.explanation.optionsBreakdown && (
                  <div className="space-y-2 p-3 rounded-lg bg-slate-800/60 border border-slate-700/60">
                    <h5 className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Distractor Analysis:
                    </h5>
                    {currentQ.explanation.optionsBreakdown.map((item: any) => (
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
                )}

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
            </div>
          )}
        </Card>

        {/* Drill Summary Modal */}
        {showSummaryModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <Card className="w-full max-w-lg bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mx-auto">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Verbal Ability Drill Complete</h3>
                <p className="text-xs text-slate-400">{title}</p>
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
                    {stats.correctCount} / {questions.length}
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
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold">
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
