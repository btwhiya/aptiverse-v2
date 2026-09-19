"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Layers,
  CheckCircle2,
  X,
  Search,
  Sparkles,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Target,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EXAM_SYLLABI_DATABASE } from "@/lib/syllabus-data";
import { switchTargetExam, UserProfile } from "@/lib/auth-storage";

interface ExamSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
}

export function ExamSwitcherModal({
  isOpen,
  onClose,
  currentUser,
}: ExamSwitcherModalProps) {
  const [search, setSearch] = useState("");
  const [switchedExamName, setSwitchedExamName] = useState<string | null>(null);

  if (!isOpen) return null;

  const examsList = Object.values(EXAM_SYLLABI_DATABASE);
  const currentExamSlug = currentUser?.targetExam || "cat";

  const filteredExams = examsList.filter((exam) => {
    const q = search.toLowerCase();
    return (
      exam.shortName.toLowerCase().includes(q) ||
      exam.examName.toLowerCase().includes(q) ||
      exam.fullForm.toLowerCase().includes(q) ||
      exam.conductingBody.toLowerCase().includes(q)
    );
  });

  const handleSelectExam = (examSlug: string, examName: string) => {
    switchTargetExam(examSlug);
    setSwitchedExamName(examName);
    setTimeout(() => {
      setSwitchedExamName(null);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl rounded-3xl bg-[#0b0f19] border border-slate-700/80 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 bg-[#0e1422] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Switch Target Entrance Exam
                </h3>
                <Badge variant="verified" className="text-[10px]">
                  Official 2026
                </Badge>
              </div>
              <p className="text-xs text-slate-400">
                Select your primary entrance exam to calibrate your study plan, drills & mock tests.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Success Alert Banner */}
        {switchedExamName && (
          <div className="p-3 bg-emerald-950/80 border-b border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 px-5 animate-in slide-in-from-top-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>
              Target exam updated to <strong>{switchedExamName}</strong>! Updating platform...
            </span>
          </div>
        )}

        {/* Search filter */}
        <div className="p-4 border-b border-slate-800/80 bg-slate-950/40 shrink-0">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by exam name (e.g. CAT, XAT, NMAT, SNAP, MAH CET)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>

        {/* Exams List Scrollable */}
        <div className="p-4 overflow-y-auto space-y-2.5 flex-1 divide-y divide-slate-800/40">
          {filteredExams.map((exam) => {
            const isCurrent = currentExamSlug.toLowerCase() === exam.examSlug.toLowerCase();

            return (
              <div
                key={exam.examSlug}
                onClick={() => handleSelectExam(exam.examSlug, exam.examName)}
                className={`pt-2.5 first:pt-0 group p-3.5 rounded-2xl border transition-all duration-150 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isCurrent
                    ? "bg-indigo-600/15 border-indigo-500/50 shadow-sm"
                    : "bg-slate-900/50 border-slate-800 hover:bg-slate-800/50 hover:border-slate-700"
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`h-10 w-10 rounded-xl flex items-center justify-center font-extrabold text-xs uppercase tracking-wider shrink-0 border ${
                      isCurrent
                        ? "bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/30"
                        : "bg-slate-800 text-slate-300 border-slate-700 group-hover:bg-slate-700 group-hover:text-white"
                    }`}
                  >
                    {exam.shortName.slice(0, 4)}
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {exam.examName}
                      </span>
                      <Badge
                        variant={
                          exam.difficulty === "High"
                            ? "default"
                            : exam.difficulty === "Speed-Intensive"
                            ? "warning"
                            : "indigo"
                        }
                        className="text-[9px] px-1.5 py-0"
                      >
                        {exam.difficulty}
                      </Badge>
                      {isCurrent && (
                        <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] gap-1 py-0 px-1.5">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>Active Target</span>
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-indigo-300/80 font-medium">{exam.fullForm}</p>
                    <p className="text-[11px] text-slate-400 line-clamp-1">
                      Conducted by {exam.conductingBody} • {exam.durationMinutes} mins • {exam.totalQuestions} Questions
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  {isCurrent ? (
                    <Button
                      size="sm"
                      variant="verified"
                      className="text-xs h-8 gap-1.5 pointer-events-none bg-emerald-600/20 text-emerald-300 border-emerald-500/40"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Currently Selected</span>
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="accent"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectExam(exam.examSlug, exam.examName);
                      }}
                      className="text-xs h-8 gap-1.5 shadow-sm shadow-indigo-600/20 group-hover:bg-indigo-500"
                    >
                      <span>Switch to {exam.shortName}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-[#0e1422] flex items-center justify-between shrink-0">
          <Link
            href="/exams"
            onClick={onClose}
            className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium underline underline-offset-2"
          >
            <span>Explore Full Exam Directory &amp; Syllabus</span>
            <ExternalLink className="h-3 w-3" />
          </Link>

          <Button variant="secondary" size="sm" onClick={onClose} className="text-xs h-8">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
