"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Search,
  Clock,
  Layers,
  Award,
  ChevronRight,
  ExternalLink,
  BookOpen,
  FileCheck2,
  Sparkles,
  Zap,
  Target,
  BarChart2,
  CheckCircle2,
  Check,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EXAM_SYLLABI_DATABASE } from "@/lib/syllabus-data";
import { getStoredCurrentUser, switchTargetExam, UserProfile } from "@/lib/auth-storage";

export default function ExamsDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "national" | "speed" | "adaptive">("all");
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [switchFeedback, setSwitchFeedback] = useState<string | null>(null);

  useEffect(() => {
    setCurrentUser(getStoredCurrentUser());

    const handleAuthChange = (e: Event) => {
      const customEvent = e as CustomEvent<UserProfile | null>;
      if (customEvent.detail) {
        setCurrentUser(customEvent.detail);
      } else {
        setCurrentUser(getStoredCurrentUser());
      }
    };

    window.addEventListener("aptiverse_auth_changed", handleAuthChange);
    return () => {
      window.removeEventListener("aptiverse_auth_changed", handleAuthChange);
    };
  }, []);

  const currentTargetExamSlug = currentUser?.targetExam || "cat";

  const handleSetTargetExam = (slug: string, name: string) => {
    switchTargetExam(slug);
    setSwitchFeedback(`Successfully switched target exam to ${name}!`);
    setTimeout(() => {
      setSwitchFeedback(null);
    }, 4000);
  };

  const examsList = Object.values(EXAM_SYLLABI_DATABASE);

  const filteredExams = examsList.filter((exam) => {
    const matchesSearch =
      exam.examName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.fullForm.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.conductingBody.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (filterType === "all") return true;
    if (filterType === "national") return ["cat", "xat", "cmat"].includes(exam.examSlug);
    if (filterType === "speed") return ["snap", "mah-cet", "mat"].includes(exam.examSlug);
    if (filterType === "adaptive") return ["nmat", "gmat"].includes(exam.examSlug);
    return true;
  });

  return (
    <AppShell>
      <div className="space-y-8 animate-in fade-in duration-200">
        {/* Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Exam Directory &amp; Syllabus Hub
              </h1>
              <Badge variant="verified">V2.0 UPDATED</Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Complete official syllabus, section weightages, test blueprints, and targeted practice pathways for all 8 major competitive entrance exams.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs">
              <span className="text-slate-400">Current Target:</span>
              <span className="font-bold text-indigo-300">
                {currentUser?.targetExamName || "CAT 2026"}
              </span>
            </div>
            <Link href="/study-plan">
              <Button variant="accent" size="sm" className="gap-2">
                <Target className="h-4 w-4" />
                <span>My Study Plan</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Switch Feedback Toast Banner */}
        {switchFeedback && (
          <div className="p-3.5 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2.5 animate-in slide-in-from-top-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <span className="font-medium">{switchFeedback}</span>
          </div>
        )}

        {/* Filter Controls & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search CAT, XAT, NMAT, SNAP..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setFilterType("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                filterType === "all"
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-500/20"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              All 7 Exams ({examsList.length})
            </button>
            <button
              onClick={() => setFilterType("national")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                filterType === "national"
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-500/20"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              Tier-1 National (CAT / XAT / CMAT)
            </button>
            <button
              onClick={() => setFilterType("speed")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                filterType === "speed"
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-500/20"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              Speed-Intensive (SNAP / CET / MAT)
            </button>
            <button
              onClick={() => setFilterType("adaptive")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                filterType === "adaptive"
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-500/20"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              Adaptive (NMAT by GMAC)
            </button>
          </div>
        </div>

        {/* 7 Exam Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExams.map((exam) => {
            const isCurrent = currentTargetExamSlug.toLowerCase() === exam.examSlug.toLowerCase();

            return (
              <Card
                key={exam.examSlug}
                className={`flex flex-col justify-between transition-all duration-200 group bg-slate-900/60 ${
                  isCurrent
                    ? "border-indigo-500/60 ring-1 ring-indigo-500/30 shadow-lg shadow-indigo-950/40"
                    : "border-slate-800 hover:border-slate-700"
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                          {exam.shortName}
                        </span>
                        <Badge
                          variant={
                            exam.difficulty === "High"
                              ? "default"
                              : exam.difficulty === "Speed-Intensive"
                              ? "warning"
                              : "indigo"
                          }
                          className="text-[10px]"
                        >
                          {exam.difficulty}
                        </Badge>
                        {isCurrent && (
                          <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] gap-1 py-0 px-1.5 font-semibold">
                            <CheckCircle2 className="h-3 w-3" />
                            <span>Active Target</span>
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-indigo-300/80 font-medium mt-0.5">
                        {exam.fullForm}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Conducted by {exam.conductingBody}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 mt-2">
                    {exam.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-4 pt-0">
                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-center">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">Duration</span>
                      <span className="text-xs font-bold text-slate-200">
                        {exam.durationMinutes} mins
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">Questions</span>
                      <span className="text-xs font-bold text-slate-200">
                        {exam.totalQuestions} Qs
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">Max Marks</span>
                      <span className="text-xs font-bold text-indigo-400">
                        {exam.totalMarks} pts
                      </span>
                    </div>
                  </div>

                  {/* Section badges */}
                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                      {exam.sections.length} Exam Sections:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {exam.sections.map((s) => (
                        <span
                          key={s.slug}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/60"
                        >
                          {s.name} ({s.questionCount}Q)
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Target Exam Switcher Action */}
                  <div className="pt-2 border-t border-slate-800/60">
                    {isCurrent ? (
                      <div className="w-full py-2 px-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-center gap-1.5 text-xs text-emerald-400 font-semibold">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        <span>Your Primary Exam Target</span>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleSetTargetExam(exam.examSlug, exam.examName)}
                        className="w-full py-2 px-3 rounded-xl bg-indigo-600/15 hover:bg-indigo-600/30 border border-indigo-500/40 text-xs text-indigo-300 hover:text-white font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Target className="h-3.5 w-3.5 text-indigo-400" />
                        <span>Set as Target Exam</span>
                      </button>
                    )}
                  </div>

                  {/* Action Buttons: 1. Syllabus, 2. Preparation, 3. Mocks */}
                  <div className="space-y-2">
                    <Link href={`/exams/${exam.examSlug}`} className="block">
                      <Button variant="accent" size="sm" className="w-full gap-2 justify-between">
                        <span className="flex items-center gap-1.5">
                          <BookOpen className="h-3.5 w-3.5" />
                          <span>Interactive Syllabus</span>
                        </span>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </Link>
                    <div className="grid grid-cols-2 gap-2">
                      <Link href={`/learn`}>
                        <Button variant="outline" size="sm" className="w-full text-xs gap-1.5 border-slate-800 hover:bg-slate-800/60">
                          <Zap className="h-3.5 w-3.5 text-amber-400" />
                          <span>Preparation</span>
                        </Button>
                      </Link>
                      <Link href={`/mocks?exam=${exam.examSlug}`}>
                        <Button variant="secondary" size="sm" className="w-full text-xs gap-1.5">
                          <FileCheck2 className="h-3.5 w-3.5 text-indigo-400" />
                          <span>Mock Tests</span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
