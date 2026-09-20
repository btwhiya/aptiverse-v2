"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Clock,
  Layers,
  ArrowRight,
  BookOpen,
  FileCheck2,
  Sparkles,
  Zap,
  Target,
  BarChart2,
  BrainCircuit,
  Scale,
  Search,
  CheckCircle2,
  TrendingUp,
  Flame,
  Award,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { getStoredCurrentUser, switchTargetExam, UserProfile } from "@/lib/auth-storage";
import { getExamSyllabus } from "@/lib/syllabus-data";
import { getSNAPProgress, SNAPProgressMetrics } from "@/lib/snap";

export default function SNAPPreparationHubPage() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [switchFeedback, setSwitchFeedback] = useState<string | null>(null);
  const [snapMetrics, setSnapMetrics] = useState<SNAPProgressMetrics | null>(null);

  const exam = getExamSyllabus("snap");

  useEffect(() => {
    setCurrentUser(getStoredCurrentUser());
    setSnapMetrics(getSNAPProgress());

    const handleAuthChange = (e: Event) => {
      const ce = e as CustomEvent<UserProfile | null>;
      setCurrentUser(ce.detail || getStoredCurrentUser());
    };

    window.addEventListener("aptiverse_auth_changed", handleAuthChange);
    return () => {
      window.removeEventListener("aptiverse_auth_changed", handleAuthChange);
    };
  }, []);

  const handleSetTargetExam = () => {
    switchTargetExam("snap");
    setSwitchFeedback("Successfully set SNAP 2026 as your active target exam!");
    setTimeout(() => setSwitchFeedback(null), 4000);
  };

  const isCurrentTarget = currentUser?.targetExam === "snap";

  const snapModules = [
    {
      title: "Verbal Ability & Reading Comprehension",
      count: "15 Questions",
      color: "from-blue-500/20 to-indigo-500/10 border-blue-500/30 text-blue-400",
      topics: [
        "Reading Comprehension",
        "Verbal Ability",
        "Synonyms",
        "Antonyms",
        "Para-Jumbles",
        "Grammar",
        "Fill-in-the-Blanks",
      ],
      tab: "verbal",
      icon: BookOpen,
    },
    {
      title: "Analytical & Logical Reasoning",
      count: "25 Questions (Highest Weightage)",
      color: "from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400",
      topics: [
        "Seating Arrangements",
        "Syllogisms",
        "Coding-Decoding",
        "Blood Relations",
        "Series Completion",
        "Puzzles",
      ],
      tab: "lr",
      icon: BrainCircuit,
    },
    {
      title: "Quantitative, Data Interpretation & Data Sufficiency",
      count: "20 Questions",
      color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400",
      topics: [
        "Quantitative Ability",
        "Data Interpretation (Visual Charts)",
        "Data Sufficiency (Statements I & II)",
      ],
      tab: "quant",
      icon: Target,
    },
    {
      title: "Ethics, Morality & Values",
      count: "Exclusive Specialization",
      color: "from-rose-500/20 to-pink-500/10 border-rose-500/30 text-rose-400",
      topics: [
        "Workplace Values & Fiduciary Duty",
        "Behavioral Ethics & Confidentiality",
        "Moral Reasoning & Governance",
        "Ethical Decision Making",
      ],
      tab: "ethics",
      icon: Scale,
    },
  ];

  return (
    <AppShell>
      <div className="space-y-8 max-w-7xl mx-auto pb-16">
        {/* Banner Notification for Target Exam */}
        {switchFeedback && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm font-medium flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>{switchFeedback}</span>
            </div>
            <Link href="/dashboard" className="text-xs underline font-semibold hover:text-white">
              View Dashboard
            </Link>
          </div>
        )}

        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl border border-rose-500/30 bg-gradient-to-br from-rose-950/40 via-slate-900/90 to-indigo-950/40 p-6 lg:p-10 shadow-2xl backdrop-blur-xl">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold">
                <Flame className="h-3.5 w-3.5 text-rose-400" />
                <span>Symbiosis National Aptitude Test (SNAP) 2026</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-white">
                SNAP Preparation & Speed Sprint OS
              </h1>
              <p className="text-slate-300 text-sm leading-relaxed">
                Master the high-speed 60-question, 60-minute test format across General English,
                Analytical & Logical Reasoning, Quant/DI/DS, and Ethics, Morality & Values with strict exam-level data isolation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link href="/exams/snap/studio">
                <Button className="w-full sm:w-auto bg-rose-600 hover:bg-rose-500 text-white font-bold gap-2 shadow-lg shadow-rose-600/30">
                  <Sparkles className="h-4 w-4" />
                  Enter SNAP Concepts Studio
                </Button>
              </Link>
              {!isCurrentTarget && (
                <Button
                  onClick={handleSetTargetExam}
                  variant="outline"
                  className="w-full sm:w-auto border-rose-500/40 text-rose-300 hover:bg-rose-500/20 font-semibold"
                >
                  Set as Target Exam
                </Button>
              )}
            </div>
          </div>

          {/* Quick Metrics Header */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-800/80">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Exam Duration</p>
              <p className="text-lg font-bold text-white flex items-center gap-1.5 mt-0.5">
                <Clock className="h-4 w-4 text-rose-400" /> 60 Minutes
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Total Questions</p>
              <p className="text-lg font-bold text-white flex items-center gap-1.5 mt-0.5">
                <FileCheck2 className="h-4 w-4 text-indigo-400" /> 60 MCQs
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Marking Scheme</p>
              <p className="text-lg font-bold text-white flex items-center gap-1.5 mt-0.5">
                <Award className="h-4 w-4 text-amber-400" /> +1.0 / -0.25
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Target Pace</p>
              <p className="text-lg font-bold text-white flex items-center gap-1.5 mt-0.5">
                <Zap className="h-4 w-4 text-emerald-400" /> ~60s / Question
              </p>
            </div>
          </div>
        </div>

        {/* Live SNAP Performance Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs text-blue-400 font-semibold">General English</CardDescription>
              <CardTitle className="text-2xl font-bold text-white">
                {snapMetrics?.sectionPerformance.verbal.accuracy || 0}%
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={snapMetrics?.sectionPerformance.verbal.accuracy || 0} className="h-2 bg-slate-800" />
              <p className="text-[11px] text-slate-400 mt-2">
                {snapMetrics?.sectionPerformance.verbal.attempted || 0} questions attempted
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs text-amber-400 font-semibold">Analytical & Logical Reasoning</CardDescription>
              <CardTitle className="text-2xl font-bold text-white">
                {snapMetrics?.sectionPerformance.logicalReasoning.accuracy || 0}%
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={snapMetrics?.sectionPerformance.logicalReasoning.accuracy || 0} className="h-2 bg-slate-800" />
              <p className="text-[11px] text-slate-400 mt-2">
                {snapMetrics?.sectionPerformance.logicalReasoning.attempted || 0} questions attempted
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs text-emerald-400 font-semibold">Quant, DI & DS</CardDescription>
              <CardTitle className="text-2xl font-bold text-white">
                {snapMetrics?.sectionPerformance.quantitativeDI.accuracy || 0}%
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={snapMetrics?.sectionPerformance.quantitativeDI.accuracy || 0} className="h-2 bg-slate-800" />
              <p className="text-[11px] text-slate-400 mt-2">
                {snapMetrics?.sectionPerformance.quantitativeDI.attempted || 0} questions attempted
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/60 border-rose-500/30 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs text-rose-400 font-semibold">Ethics, Morality & Values</CardDescription>
              <CardTitle className="text-2xl font-bold text-rose-300">
                {snapMetrics?.sectionPerformance.ethicsValues.accuracy || 0}%
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={snapMetrics?.sectionPerformance.ethicsValues.accuracy || 0} className="h-2 bg-slate-800" />
              <p className="text-[11px] text-slate-400 mt-2">
                {snapMetrics?.sectionPerformance.ethicsValues.attempted || 0} questions attempted
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 4 Core Syllabus Modules */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">SNAP Syllabus & Concept Domains</h2>
              <p className="text-xs text-slate-400">Exclusively structured for the SNAP 2026 examination</p>
            </div>
            <Link href="/exams/snap/studio">
              <span className="text-xs font-semibold text-rose-400 hover:text-rose-300 flex items-center gap-1">
                Open Studio <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {snapModules.map((mod, idx) => {
              const ModIcon = mod.icon;
              return (
                <Card
                  key={idx}
                  className={`bg-gradient-to-br ${mod.color} border backdrop-blur-sm transition-all hover:scale-[1.01]`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
                          <ModIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <CardTitle className="text-base font-bold text-white">{mod.title}</CardTitle>
                          <CardDescription className="text-xs">{mod.count}</CardDescription>
                        </div>
                      </div>
                      <Link href={`/exams/snap/studio?tab=${mod.tab}`}>
                        <Button size="sm" variant="ghost" className="text-xs hover:bg-white/10 text-white font-semibold">
                          Explore
                        </Button>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex flex-wrap gap-1.5">
                      {mod.topics.map((t, tidx) => (
                        <span
                          key={tidx}
                          className="px-2 py-1 rounded-md text-[11px] font-medium bg-slate-900/80 text-slate-200 border border-slate-800"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Mock Test Sprint Launch Callout */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-rose-950/30 via-slate-900 to-indigo-950/30 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1 max-w-xl">
            <Badge className="bg-rose-500/20 text-rose-300 border-rose-500/30">SIMULATED EXAM</Badge>
            <h3 className="text-lg font-bold text-white">SNAP 60-Minute Full Sprint Mock #01</h3>
            <p className="text-xs text-slate-400">
              Practice under authentic examination constraints: 60 questions in 60 minutes with immediate score breakdown and pacing analytics.
            </p>
          </div>
          <Link href="/mocks">
            <Button className="bg-rose-600 hover:bg-rose-500 text-white font-bold gap-2">
              <FileCheck2 className="h-4 w-4" />
              Launch SNAP Mock
            </Button>
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
