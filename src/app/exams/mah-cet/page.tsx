"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Clock,
  Layers,
  Calculator,
  ArrowRight,
  BookOpen,
  FileCheck2,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Zap,
  Target,
  BarChart2,
  Award,
  ChevronRight,
  HelpCircle,
  TrendingUp,
  AlertTriangle,
  BrainCircuit,
  Shapes,
  FileText,
  Search,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { getStoredCurrentUser, switchTargetExam, UserProfile } from "@/lib/auth-storage";
import { getExamSyllabus } from "@/lib/syllabus-data";
import { getCanonicalExamData } from "@/lib/canonical-chapters";
import { loadMAHCETARProgress, ARProgressMetrics } from "@/lib/mah-cet";
import { TopicPracticeModal } from "@/components/practice/TopicPracticeModal";

export default function MAHCETPreparationHubPage() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [switchFeedback, setSwitchFeedback] = useState<string | null>(null);
  const [arMetrics, setArMetrics] = useState<ARProgressMetrics | null>(null);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [syllabusSearch, setSyllabusSearch] = useState("");
  const [filterTaxonomy, setFilterTaxonomy] = useState<"ALL" | "OFFICIAL" | "RECOMMENDED">("ALL");

  const [practiceModalState, setPracticeModalState] = useState<{
    isOpen: boolean;
    topicName: string;
    topicSlug: string;
    chapterName?: string;
    chapterSlug?: string;
  }>({
    isOpen: false,
    topicName: "",
    topicSlug: "",
  });

  const exam = getExamSyllabus("mah-cet");
  const canonicalData = getCanonicalExamData("mah-cet");

  useEffect(() => {
    setCurrentUser(getStoredCurrentUser());
    setArMetrics(loadMAHCETARProgress());

    const handleProgressUpdate = () => {
      setArMetrics(loadMAHCETARProgress());
    };

    const handleAuthChange = (e: Event) => {
      const ce = e as CustomEvent<UserProfile | null>;
      setCurrentUser(ce.detail || getStoredCurrentUser());
    };

    window.addEventListener("mah-cet-ar-progress-updated", handleProgressUpdate);
    window.addEventListener("aptiverse_auth_changed", handleAuthChange);
    return () => {
      window.removeEventListener("mah-cet-ar-progress-updated", handleProgressUpdate);
      window.removeEventListener("aptiverse_auth_changed", handleAuthChange);
    };
  }, []);

  const handleSetTargetExam = () => {
    if (!exam) return;
    switchTargetExam("mah-cet");
    setSwitchFeedback(`Successfully set MAH MBA CET as your active target exam!`);
    setTimeout(() => setSwitchFeedback(null), 4000);
  };

  const isCurrentTarget = currentUser?.targetExam === "mah-cet";

  if (!exam) {
    return (
      <AppShell>
        <div className="p-8 text-center text-slate-400">
          MAH CET Syllabus configuration not found.
        </div>
      </AppShell>
    );
  }

  const sections = exam.sections;
  const currentSection = sections[activeSectionIndex] || sections[0];

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto space-y-8 pb-16">
        {/* Top Header Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-500/20 p-6 md:p-8 shadow-xl">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 px-2.5 py-0.5 text-xs font-semibold">
                  STATE CET CELL MAHARASHTRA
                </Badge>
                <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 px-2.5 py-0.5 text-xs font-semibold">
                  200 QUESTIONS · 150 MINS
                </Badge>
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 px-2.5 py-0.5 text-xs font-semibold">
                  0 NEGATIVE MARKING
                </Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                MAH MBA CET 2026 Preparation Hub
              </h1>
              <p className="text-slate-300 text-sm md:text-base max-w-3xl leading-relaxed">
                Complete preparation portal for Maharashtra MBA/MMS CET. Master all 4 official sections
                including our dedicated, visual-first <span className="text-emerald-400 font-semibold">Abstract Reasoning Studio</span>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-3 min-w-[200px]">
              {isCurrentTarget ? (
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-semibold justify-center">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Active Target Exam</span>
                </div>
              ) : (
                <Button
                  onClick={handleSetTargetExam}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-lg shadow-emerald-600/20"
                >
                  <Target className="w-4 h-4 mr-2" />
                  Set as Target Exam
                </Button>
              )}

              <Link href="/mocks">
                <Button variant="outline" className="w-full border-slate-700 hover:bg-slate-800 text-slate-200 text-sm">
                  <FileText className="w-4 h-4 mr-2 text-indigo-400" />
                  MAH CET Mocks (200Q)
                </Button>
              </Link>
            </div>
          </div>

          {switchFeedback && (
            <div className="mt-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{switchFeedback}</span>
            </div>
          )}
        </div>

        {/* Dedicated Section Cards: Abstract Reasoning Spotlight */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Abstract Reasoning (Spotlight) */}
          <div className="relative p-5 rounded-2xl bg-gradient-to-br from-emerald-950/50 via-slate-900 to-slate-900 border-2 border-emerald-500/40 shadow-lg space-y-3 group hover:border-emerald-400 transition-all">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Shapes className="w-5 h-5" />
              </div>
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 font-bold text-[10px]">
                MAH CET EXCLUSIVE
              </Badge>
            </div>
            <div>
              <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                Abstract Reasoning
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                25 Questions · 25 Marks · 100% Visual Figures, Series, Matrices & Transformations.
              </p>
            </div>
            <div className="pt-2">
              <Link href="/exams/mah-cet/ar">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs h-9 shadow-md shadow-emerald-600/20">
                  <span>Enter AR Studio</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* 2. Logical Reasoning */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md space-y-3 hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-slate-400">75 Questions</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Logical Reasoning</h3>
              <p className="text-xs text-slate-400 mt-1">
                Linear & Circular Arrangements, Puzzles, Blood Relations, Coding, Syllogisms.
              </p>
            </div>
            <div className="pt-2">
              <Button
                variant="outline"
                onClick={() => setActiveSectionIndex(0)}
                className="w-full border-slate-700 hover:bg-slate-800 text-slate-300 text-xs h-9"
              >
                View Syllabus
              </Button>
            </div>
          </div>

          {/* 3. Quantitative Aptitude */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md space-y-3 hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Target className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-slate-400">50 Questions</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Quantitative Aptitude</h3>
              <p className="text-xs text-slate-400 mt-1">
                Arithmetic, Modern Math, Geometry, Algebra & Data Interpretation sets.
              </p>
            </div>
            <div className="pt-2">
              <Button
                variant="outline"
                onClick={() => setActiveSectionIndex(2)}
                className="w-full border-slate-700 hover:bg-slate-800 text-slate-300 text-xs h-9"
              >
                View Syllabus
              </Button>
            </div>
          </div>

          {/* 4. Verbal Ability & RC */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md space-y-3 hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-slate-400">50 Questions</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Verbal Ability & RC</h3>
              <p className="text-xs text-slate-400 mt-1">
                Reading Comprehension, Vocab, Grammar, Error Detection & Para Jumbles.
              </p>
            </div>
            <div className="pt-2">
              <Button
                variant="outline"
                onClick={() => setActiveSectionIndex(3)}
                className="w-full border-slate-700 hover:bg-slate-800 text-slate-300 text-xs h-9"
              >
                View Syllabus
              </Button>
            </div>
          </div>
        </div>

        {/* Abstract Reasoning Performance Widget */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/30 border border-emerald-500/20 shadow-lg space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Shapes className="w-5 h-5 text-emerald-400" />
                <h2 className="text-lg font-bold text-white">Abstract Reasoning Progress</h2>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Real-time tracking of figure series, matrices, analogies, and classification accuracy.
              </p>
            </div>
            <Link href="/exams/mah-cet/ar">
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs">
                Launch Visual Studio
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <span className="text-[11px] text-slate-400 uppercase font-semibold">Questions Solved</span>
              <p className="text-xl font-extrabold text-white mt-0.5">{arMetrics?.questionsAttempted ?? 0}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <span className="text-[11px] text-slate-400 uppercase font-semibold">Overall Accuracy</span>
              <p className="text-xl font-extrabold text-emerald-400 mt-0.5">{arMetrics?.overallAccuracy ?? 0}%</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <span className="text-[11px] text-slate-400 uppercase font-semibold">Avg Solving Time</span>
              <p className="text-xl font-extrabold text-amber-400 mt-0.5">{arMetrics?.avgTimeSeconds ?? 0}s</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <span className="text-[11px] text-slate-400 uppercase font-semibold">Total Correct</span>
              <p className="text-xl font-extrabold text-blue-400 mt-0.5">{arMetrics?.totalCorrect ?? 0}</p>
            </div>
          </div>
        </div>

        {/* Section Syllabus & Topic Explorer */}
        <div id="syllabus" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-xl font-bold text-white">MAH CET Official Syllabus Explorer</h2>
              <p className="text-xs text-slate-400">Detailed breakdown of topics, weightages, and practice drills.</p>
            </div>

            {/* Section Tab Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {sections.map((sec, idx) => (
                <button
                  key={sec.slug}
                  onClick={() => setActiveSectionIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    activeSectionIndex === idx
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                  }`}
                >
                  {sec.name.split(" ")[0]} ({sec.questionCount}Q)
                </button>
              ))}
            </div>
          </div>

          {/* Active Section Details */}
          <Card className="bg-slate-900/90 border-slate-800">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                    <span>{currentSection.name}</span>
                    <Badge variant="outline" className="text-emerald-400 border-emerald-500/30 text-xs">
                      {currentSection.questionCount} Questions
                    </Badge>
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-400 mt-1">
                    Marks per question: {currentSection.marksPerQuestion ?? 1} · Negative: 0 marks
                  </CardDescription>
                </div>
                {currentSection.slug === "abstract-reasoning" && (
                  <Link href="/exams/mah-cet/ar">
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs">
                      Open AR Studio
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </Link>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentSection.topics.map((top) => (
                  <div key={top.slug} className="space-y-2">
                    <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider text-[11px]">
                      {top.name}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      {top.subtopics.map((st) => (
                        <div
                          key={st.slug}
                          className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-between hover:bg-slate-800/80 transition-colors"
                        >
                          <div>
                            <p className="text-xs font-semibold text-white">{st.name}</p>
                            <span className="text-[10px] text-slate-400">{st.conceptsCount ?? 4} concepts</span>
                          </div>
                          {currentSection.slug === "abstract-reasoning" ? (
                            <Link href="/exams/mah-cet/ar">
                              <Button size="sm" variant="ghost" className="h-7 text-xs text-emerald-400 hover:text-emerald-300">
                                Practice
                              </Button>
                            </Link>
                          ) : (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() =>
                                setPracticeModalState({
                                  isOpen: true,
                                  topicName: st.name,
                                  topicSlug: st.slug,
                                })
                              }
                              className="h-7 text-xs text-indigo-400 hover:text-indigo-300"
                            >
                              Practice
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Practice Modal for QA / LR / VARC */}
        {practiceModalState.isOpen && (
          <TopicPracticeModal
            isOpen={practiceModalState.isOpen}
            onClose={() => setPracticeModalState({ isOpen: false, topicName: "", topicSlug: "" })}
            topicName={practiceModalState.topicName}
            topicSlug={practiceModalState.topicSlug}
            chapterName={practiceModalState.chapterName}
            chapterSlug={practiceModalState.chapterSlug}
          />
        )}
      </div>
    </AppShell>
  );
}
