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
  Compass,
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
import { getXATProgress, XATProgressMetrics } from "@/lib/xat";
import { TopicPracticeModal } from "@/components/practice/TopicPracticeModal";

export default function XATPreparationHubPage() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [switchFeedback, setSwitchFeedback] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<XATProgressMetrics | null>(null);
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

  const exam = getExamSyllabus("xat");
  const canonicalData = getCanonicalExamData("xat");

  useEffect(() => {
    setCurrentUser(getStoredCurrentUser());
    setMetrics(getXATProgress());

    const handleProgressUpdate = (e: Event) => {
      const ce = e as CustomEvent<XATProgressMetrics>;
      if (ce.detail) setMetrics(ce.detail);
    };

    const handleAuthChange = (e: Event) => {
      const ce = e as CustomEvent<UserProfile | null>;
      setCurrentUser(ce.detail || getStoredCurrentUser());
    };

    window.addEventListener("xat_progress_updated", handleProgressUpdate);
    window.addEventListener("aptiverse_auth_changed", handleAuthChange);
    return () => {
      window.removeEventListener("xat_progress_updated", handleProgressUpdate);
      window.removeEventListener("aptiverse_auth_changed", handleAuthChange);
    };
  }, []);

  const handleSetTargetExam = () => {
    switchTargetExam("xat");
    setSwitchFeedback("Successfully set XAT 2026 as your active target exam!");
    setTimeout(() => setSwitchFeedback(null), 4000);
  };

  const currentMetrics = metrics || {
    overallAccuracy: 64,
    varcAccuracy: 68,
    dmAccuracy: 61,
    qadiAccuracy: 72,
    gkAccuracy: 54,
    staticGkAccuracy: 64,
    currentAffairsAccuracy: 51,
    recentPractices: [],
    weakCategories: ["Economy", "International Affairs"],
  };

  const sectionsList = [
    {
      id: "varc",
      title: "Verbal Ability & Reading Comprehension",
      shortTitle: "VARC",
      questionCount: "26 Questions",
      weightage: "26% of Exam",
      desc: "Critical reasoning, RC analytical passages, para-jumbles, and semantic vocabulary. Standard +1 / -0.25 negative marking.",
      accuracy: currentMetrics.varcAccuracy,
      href: "/learn/varc",
      btnText: "Open VARC Studio",
      icon: FileText,
      color: "from-blue-500/20 via-indigo-500/10 to-transparent border-blue-500/30 text-blue-400",
      badge: "CORE SECTION",
    },
    {
      id: "dm",
      title: "Decision Making",
      shortTitle: "DM",
      questionCount: "22 Questions",
      weightage: "22% of Exam",
      desc: "Ethical dilemmas, managerial caselets, resource allocation, and multi-stakeholder trade-offs. XLRI's signature differentiator.",
      accuracy: currentMetrics.dmAccuracy,
      href: "/exams/xat/dm",
      btnText: "Launch DM Studio",
      icon: BrainCircuit,
      color: "from-amber-500/20 via-orange-500/10 to-transparent border-amber-500/30 text-amber-400",
      badge: "XAT EXCLUSIVE",
    },
    {
      id: "qadi",
      title: "Quantitative Ability & Data Interpretation",
      shortTitle: "QA & DI",
      questionCount: "28 Questions",
      weightage: "28% of Exam",
      desc: "Advanced arithmetic, geometry, modern math, and data sufficiency caselets. Sectional cutoffs enforced by XLRI.",
      accuracy: currentMetrics.qadiAccuracy,
      href: "#syllabus",
      btnText: "Explore QA & DI Chapters",
      icon: Calculator,
      color: "from-emerald-500/20 via-teal-500/10 to-transparent border-emerald-500/30 text-emerald-400",
      badge: "CORE SECTION",
    },
    {
      id: "gk",
      title: "General Knowledge",
      shortTitle: "GK",
      questionCount: "25 Questions",
      weightage: "Part 2 (No Negative Marks)",
      desc: "Static GK (Polity, History, Economics) and date-aware Current Affairs. Crucial for XLRI interview shortlists.",
      accuracy: currentMetrics.gkAccuracy,
      href: "/exams/xat/gk",
      btnText: "Launch GK Studio",
      icon: Compass,
      color: "from-purple-500/20 via-pink-500/10 to-transparent border-purple-500/30 text-purple-400",
      badge: "XAT EXCLUSIVE",
    },
  ];

  const currentSection = exam?.sections[activeSectionIndex] || exam?.sections[0];
  const currentCanonicalSection = canonicalData?.sections[activeSectionIndex] || canonicalData?.sections[0];

  return (
    <AppShell>
      <div className="space-y-8 max-w-6xl mx-auto animate-in fade-in duration-200">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/dashboard" className="hover:text-white transition-colors">
            Aptiverse
          </Link>
          <span>/</span>
          <Link href="/exams" className="hover:text-white transition-colors">
            Exams
          </Link>
          <span>/</span>
          <span className="text-white font-medium">XAT Preparation</span>
        </div>

        {/* Hero Header */}
        <div className="p-6 sm:p-8 rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-950/30 via-[#0e1422] to-[#0e1422] relative overflow-hidden shadow-2xl space-y-6">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                  Aptiverse Exam Architecture
                </span>
                <Badge variant="verified" className="text-xs border-amber-500/40 text-amber-300 bg-amber-500/10">
                  OFFICIAL XAT 2026
                </Badge>
                <Badge variant="indigo" className="text-xs">
                  XLRI JAMSHEDPUR
                </Badge>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
                XAT PREPARATION
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
                Comprehensive preparation for the Xavier Aptitude Test. Features dedicated studios for XAT-exclusive
                modules: <strong>Decision Making (DM)</strong> and <strong>General Knowledge (GK)</strong>, alongside
                Verbal Ability &amp; Reading Comprehension and Quantitative Ability &amp; Data Interpretation.
              </p>
            </div>

            <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-2.5 shrink-0">
              {currentUser?.targetExam === "xat" ? (
                <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs font-bold text-emerald-300 shadow-sm">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Your Active Target Exam</span>
                </div>
              ) : (
                <Button
                  onClick={handleSetTargetExam}
                  variant="accent"
                  size="sm"
                  className="gap-2 shadow-md shadow-amber-600/25 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold"
                >
                  <Target className="h-4 w-4" />
                  <span>Set XAT as Target Exam</span>
                </Button>
              )}

              <Link href="/mocks">
                <Button variant="secondary" size="sm" className="gap-2 text-xs">
                  <FileCheck2 className="h-3.5 w-3.5 text-amber-400" />
                  <span>XAT 205-Min Full Mock</span>
                </Button>
              </Link>
            </div>
          </div>

          {switchFeedback && (
            <div className="p-3 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-in slide-in-from-top-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>{switchFeedback}</span>
            </div>
          )}

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <Clock className="h-3.5 w-3.5 text-amber-400" />
                <span>Test Duration</span>
              </div>
              <p className="text-base font-bold text-white">205 Minutes</p>
              <span className="text-[10px] text-slate-400">Part 1 (175m) + Part 2 (30m)</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <Layers className="h-3.5 w-3.5 text-amber-400" />
                <span>Total Questions</span>
              </div>
              <p className="text-base font-bold text-white">101 Questions</p>
              <span className="text-[10px] text-slate-400">76 Part 1 + 25 GK Questions</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <TrendingUp className="h-3.5 w-3.5 text-amber-400" />
                <span>Unattempted Penalty</span>
              </div>
              <p className="text-base font-bold text-amber-300">-0.10 Marks</p>
              <span className="text-[10px] text-slate-400">Applies after 8 consecutive skips</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span>XLRI Cutoff Target</span>
              </div>
              <p className="text-base font-bold text-emerald-300">~95+ Percentile</p>
              <span className="text-[10px] text-slate-400">Requires ~35–38 Raw Marks</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* REQUIREMENT 2 & 14: XAT PREPARATION SECTIONS GRID                         */}
        {/* [Verbal Ability & Reading Comprehension]                                  */}
        {/* [Decision Making]                                                         */}
        {/* [Quantitative Ability & Data Interpretation]                              */}
        {/* [General Knowledge]                                                       */}
        {/* ========================================================================= */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>XAT Sections</span>
                <Badge variant="outline" className="text-xs text-amber-400 border-amber-500/30 bg-amber-500/10">
                  4 Tested Sections
                </Badge>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                XAT features two distinct exclusive sections: Decision Making and General Knowledge.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sectionsList.map((sec) => {
              const Icon = sec.icon;
              return (
                <div
                  key={sec.id}
                  className={`p-5 rounded-2xl border bg-gradient-to-br ${sec.color} bg-slate-950/60 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all`}
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-white">{sec.title}</h3>
                          <span className="text-xs text-slate-400">{sec.questionCount} • {sec.weightage}</span>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-[10px] font-bold ${
                          sec.badge === "XAT EXCLUSIVE"
                            ? "border-amber-500/50 text-amber-300 bg-amber-500/10"
                            : "border-slate-700 text-slate-300"
                        }`}
                      >
                        {sec.badge}
                      </Badge>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">{sec.desc}</p>
                  </div>

                  <div className="space-y-3 pt-2 border-t border-slate-800/80">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Current Accuracy:</span>
                      <span className="font-bold text-white">{sec.accuracy}%</span>
                    </div>
                    <Progress value={sec.accuracy} className="h-1.5 bg-slate-900" />

                    <Link href={sec.href} className="block w-full">
                      <Button
                        variant={sec.badge === "XAT EXCLUSIVE" ? "accent" : "secondary"}
                        size="sm"
                        className={`w-full justify-between gap-2 text-xs font-semibold ${
                          sec.badge === "XAT EXCLUSIVE"
                            ? "bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
                            : ""
                        }`}
                      >
                        <span>{sec.btnText}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* REQUIREMENT 14: XAT PROGRESS & RECENT PRACTICE WIDGETS                     */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* XAT Progress Card */}
          <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-950 border border-slate-800/90 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <BarChart2 className="h-5 w-5 text-amber-400" />
                  <span>XAT Progress</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Real-time accuracy breakdown across official XAT sections
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400">Overall Accuracy</span>
                <p className="text-lg font-extrabold text-amber-400">{currentMetrics.overallAccuracy}%</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium">VARC (Verbal Ability &amp; RC)</span>
                  <span className="font-bold text-white">{currentMetrics.varcAccuracy}%</span>
                </div>
                <Progress value={currentMetrics.varcAccuracy} className="h-2 bg-slate-900" />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium flex items-center gap-1.5">
                    <span>Decision Making (DM)</span>
                    <Badge variant="outline" className="text-[9px] px-1 py-0 border-amber-500/30 text-amber-400">
                      XAT ONLY
                    </Badge>
                  </span>
                  <span className="font-bold text-amber-300">{currentMetrics.dmAccuracy}%</span>
                </div>
                <Progress value={currentMetrics.dmAccuracy} className="h-2 bg-slate-900" />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium">Quantitative Ability &amp; DI</span>
                  <span className="font-bold text-white">{currentMetrics.qadiAccuracy}%</span>
                </div>
                <Progress value={currentMetrics.qadiAccuracy} className="h-2 bg-slate-900" />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium flex items-center gap-1.5">
                    <span>General Knowledge (GK)</span>
                    <Badge variant="outline" className="text-[9px] px-1 py-0 border-purple-500/30 text-purple-400">
                      XAT ONLY
                    </Badge>
                  </span>
                  <span className="font-bold text-purple-300">{currentMetrics.gkAccuracy}%</span>
                </div>
                <Progress value={currentMetrics.gkAccuracy} className="h-2 bg-slate-900" />
              </div>
            </div>

            {/* GK Sub-Breakdown & Weak Areas Notice */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="text-slate-400 font-medium">GK Detailed Breakdown:</span>
                <div className="flex items-center gap-3">
                  <span className="text-slate-300">
                    Static GK: <strong className="text-white">{currentMetrics.staticGkAccuracy}%</strong>
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-300">
                    Current Affairs: <strong className="text-white">{currentMetrics.currentAffairsAccuracy}%</strong>
                  </span>
                </div>
              </div>

              {currentMetrics.weakCategories && currentMetrics.weakCategories.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-[11px] text-amber-400 font-semibold flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    <span>Needs Review:</span>
                  </span>
                  {currentMetrics.weakCategories.map((wc) => (
                    <Badge
                      key={wc}
                      variant="outline"
                      className="text-[10px] border-amber-500/40 bg-amber-500/10 text-amber-300"
                    >
                      {wc}
                    </Badge>
                  ))}
                  <Link href="/exams/xat/gk" className="text-[11px] text-indigo-400 hover:underline ml-auto">
                    Practice Weak Categories →
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Recent Practice Widget */}
          <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800/90 flex flex-col justify-between space-y-4">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Clock className="h-5 w-5 text-indigo-400" />
                <span>Recent Practice</span>
              </h3>
              <p className="text-xs text-slate-400">
                Your latest XAT preparation drills and caselets
              </p>
            </div>

            <div className="space-y-3 flex-1">
              {currentMetrics.recentPractices && currentMetrics.recentPractices.length > 0 ? (
                currentMetrics.recentPractices.slice(0, 4).map((rp) => (
                  <Link
                    key={rp.id}
                    href={rp.link}
                    className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 block transition-all group"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                        {rp.title}
                      </span>
                      <span className="text-xs font-bold text-emerald-400 shrink-0">{rp.score}</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                      <span>{rp.type.replace("_", " ")}</span>
                      <span>{rp.timestamp}</span>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-4 rounded-2xl bg-slate-900/40 text-center text-xs text-slate-400">
                  No practice attempts yet. Launch DM or GK studio to begin!
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-slate-800">
              <Link href="/exams/xat/dm" className="block w-full">
                <Button variant="outline" size="sm" className="w-full text-xs gap-1.5 border-slate-700">
                  <BrainCircuit className="h-3.5 w-3.5 text-amber-400" />
                  <span>Start a DM Caselet Now</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* XAT CANONICAL SYLLABUS & CHAPTER EXPLORER                                  */}
        {/* ========================================================================= */}
        <div className="space-y-6 pt-4" id="syllabus">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-amber-400" />
                <span>XAT Canonical Syllabus &amp; Chapters</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Standardized chapters mapped directly to official XAT examination sections
              </p>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {exam?.sections.map((section, idx) => (
                <button
                  key={section.slug}
                  onClick={() => setActiveSectionIndex(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activeSectionIndex === idx
                      ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                      : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                  }`}
                >
                  <span>{section.name}</span>
                  <span className="ml-1.5 text-[10px] opacity-80">({section.questionCount}Q)</span>
                </button>
              ))}
            </div>
          </div>

          {/* Section Detail View */}
          {currentCanonicalSection && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-white">{currentCanonicalSection.name}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {currentCanonicalSection.topics.length} Core Modules • {currentSection?.questionCount} Questions in Official Paper
                  </p>
                </div>

                {currentCanonicalSection.slug === "decision-making" && (
                  <Link href="/exams/xat/dm">
                    <Button size="sm" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold gap-1.5 text-xs">
                      <BrainCircuit className="h-3.5 w-3.5" />
                      <span>Launch Decision Making Studio</span>
                    </Button>
                  </Link>
                )}

                {currentCanonicalSection.slug === "gk" && (
                  <Link href="/exams/xat/gk">
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-500 text-white font-bold gap-1.5 text-xs">
                      <Compass className="h-3.5 w-3.5" />
                      <span>Launch General Knowledge Studio</span>
                    </Button>
                  </Link>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentCanonicalSection.topics.map((topic) => (
                  <div
                    key={topic.slug}
                    className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white">{topic.name}</h4>
                      <Badge variant="outline" className="text-[10px] border-slate-700 text-slate-400">
                        {topic.chapters.length} Chapters
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      {topic.chapters.slice(0, 4).map((ch) => (
                        <div
                          key={ch.slug}
                          className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/70 flex items-center justify-between text-xs"
                        >
                          <span className="text-slate-300 font-medium">{ch.name}</span>
                          <button
                            onClick={() =>
                              setPracticeModalState({
                                isOpen: true,
                                topicName: topic.name,
                                topicSlug: topic.slug,
                                chapterName: ch.name,
                                chapterSlug: ch.slug,
                              })
                            }
                            className="px-2 py-1 rounded-lg bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600/30 text-[11px] font-semibold transition-colors"
                          >
                            Drill
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Practice Modal */}
        <TopicPracticeModal
          isOpen={practiceModalState.isOpen}
          onClose={() => setPracticeModalState((prev) => ({ ...prev, isOpen: false }))}
          topicName={practiceModalState.topicName}
          topicSlug={practiceModalState.topicSlug}
          chapterName={practiceModalState.chapterName}
          chapterSlug={practiceModalState.chapterSlug}
        />
      </div>
    </AppShell>
  );
}
