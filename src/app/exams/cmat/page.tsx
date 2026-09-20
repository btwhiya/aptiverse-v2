"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Clock,
  Layers,
  ArrowRight,
  BookOpen,
  Sparkles,
  Zap,
  Target,
  BarChart2,
  BrainCircuit,
  Globe,
  Landmark,
  TrendingUp,
  Lightbulb,
  CheckCircle2,
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
import { getCMATProgress, CMATProgressMetrics } from "@/lib/cmat";

export default function CMATPreparationHubPage() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [switchFeedback, setSwitchFeedback] = useState<string | null>(null);
  const [cmatMetrics, setCmatMetrics] = useState<CMATProgressMetrics | null>(null);

  const exam = getExamSyllabus("cmat");

  useEffect(() => {
    setCurrentUser(getStoredCurrentUser());
    setCmatMetrics(getCMATProgress());

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
    switchTargetExam("cmat");
    setSwitchFeedback("Successfully set CMAT 2026 as your active target exam!");
    setTimeout(() => setSwitchFeedback(null), 4000);
  };

  const isCurrentTarget = currentUser?.targetExam === "cmat";

  const cmatSections = [
    {
      title: "Quantitative Techniques & Data Interpretation",
      count: "20 Questions / 80 Marks",
      color: "from-blue-500/20 to-indigo-500/10 border-blue-500/30 text-blue-400",
      topics: [
        "Arithmetic & Percentages",
        "Algebra & Quadratics",
        "Geometry & Mensuration",
        "Tables & Bar Graphs",
        "Pie Charts & Line Graphs",
        "Number Systems",
      ],
      tab: "qt",
      icon: Target,
    },
    {
      title: "Logical Reasoning",
      count: "20 Questions / 80 Marks",
      color: "from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400",
      topics: [
        "Linear & Circular Seating",
        "Syllogisms & Deductions",
        "Blood Relations & Coding",
        "Direction Sense & Sequences",
        "Analytical Puzzles",
        "Assertion & Reason",
      ],
      tab: "lr",
      icon: BrainCircuit,
    },
    {
      title: "Language Comprehension",
      count: "20 Questions / 80 Marks",
      color: "from-purple-500/20 to-pink-500/10 border-purple-500/30 text-purple-400",
      topics: [
        "Reading Comprehension",
        "Vocabulary & Idioms",
        "Grammar & Sentence Correction",
        "Para Jumbles & Coherence",
        "Antonyms & Synonyms",
        "Fill in the Blanks",
      ],
      tab: "lang",
      icon: BookOpen,
    },
    {
      title: "General Awareness (Exclusive)",
      count: "20 Questions / 80 Marks",
      color: "from-cyan-500/20 to-teal-500/10 border-cyan-500/30 text-cyan-400",
      topics: [
        "Current Affairs (National/Global)",
        "Static GK & Indian History",
        "Indian Geography & Polity",
        "Banking & Economy Concepts",
        "Awards, Sports & Appointments",
        "Institutions & Constitution",
      ],
      tab: "current-affairs",
      icon: Globe,
    },
    {
      title: "Innovation & Entrepreneurship (Exclusive)",
      count: "20 Questions / 80 Marks",
      color: "from-yellow-500/20 to-amber-500/10 border-yellow-500/30 text-yellow-400",
      topics: [
        "Entrepreneurship Fundamentals",
        "Startup Lifecycle & Terminology",
        "Startup India & AIM Schemes",
        "Venture Capital & Angel Funding",
        "Business Acumen & Models",
        "Valuation & M&A Basics",
      ],
      tab: "innovation",
      icon: Lightbulb,
    },
  ];

  return (
    <AppShell>
      <div className="space-y-8 max-w-6xl mx-auto animate-in fade-in duration-200">
        {/* Top Header Card */}
        <div className="relative overflow-hidden rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-cyan-950/40 via-[#0a1020] to-[#040814] p-6 lg:p-8 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-mono text-xs">
                  NTA CMAT 2026 OFFICIAL PATTERN
                </Badge>
                {isCurrentTarget ? (
                  <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40 text-xs">
                    ACTIVE TARGET EXAM
                  </Badge>
                ) : (
                  <Button
                    onClick={handleSetTargetExam}
                    variant="outline"
                    size="sm"
                    className="h-6 text-xs border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/20"
                  >
                    Set as Target Exam
                  </Button>
                )}
              </div>

              <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                CMAT 2026 Preparation Hub
              </h1>
              <p className="text-sm lg:text-base text-slate-300 leading-relaxed">
                National Level MBA Entrance for AICTE-approved institutions with 100 Questions in 180 Minutes.
                Featuring strict exam-isolated General Awareness and Innovation &amp; Entrepreneurship modules.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
              <Link href="/exams/cmat/studio">
                <Button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold gap-2 shadow-lg shadow-cyan-600/30">
                  <Sparkles className="h-4 w-4" />
                  <span>Launch CMAT Studio</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/mocks">
                <Button variant="outline" className="w-full border-slate-700 text-slate-200 hover:bg-slate-800 gap-2">
                  <Flame className="h-4 w-4 text-amber-400" />
                  <span>Full-Length 180M Mocks</span>
                </Button>
              </Link>
            </div>
          </div>

          {switchFeedback && (
            <div className="mt-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold animate-in fade-in">
              {switchFeedback}
            </div>
          )}
        </div>

        {/* Quick Exam Blueprint Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card className="bg-[#0b1120] border-slate-800 p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 uppercase font-semibold">Total Duration</p>
              <p className="text-sm font-bold text-white">180 Mins (No Sectional Limits)</p>
            </div>
          </Card>

          <Card className="bg-[#0b1120] border-slate-800 p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 uppercase font-semibold">Structure</p>
              <p className="text-sm font-bold text-white">100 Qs (20 per Section)</p>
            </div>
          </Card>

          <Card className="bg-[#0b1120] border-slate-800 p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 uppercase font-semibold">Marking Scheme</p>
              <p className="text-sm font-bold text-white">+4 Marks / -1 Penalty</p>
            </div>
          </Card>

          <Card className="bg-[#0b1120] border-slate-800 p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 uppercase font-semibold">Target Score</p>
              <p className="text-sm font-bold text-white">320+ for 99.5+ %ile (JBIMS)</p>
            </div>
          </Card>
        </div>

        {/* Independent CMAT Progress Tracker */}
        {cmatMetrics && (
          <Card className="bg-[#0b1120] border-cyan-500/30 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <BarChart2 className="h-4 w-4 text-cyan-400" />
                  Independent CMAT Performance Metrics
                </h3>
                <p className="text-xs text-slate-400">
                  Strictly isolated from CAT, XAT, SNAP &amp; MAH CET progress databases
                </p>
              </div>
              <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                {cmatMetrics.questionsAttempted} Solved ({cmatMetrics.overallAccuracy}% Acc)
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-[11px] text-slate-400">Current Affairs Accuracy</span>
                <p className="text-lg font-extrabold text-cyan-300">{cmatMetrics.currentAffairsAccuracy}%</p>
                <Progress value={cmatMetrics.currentAffairsAccuracy} className="h-1.5" />
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-[11px] text-slate-400">Static GK Accuracy</span>
                <p className="text-lg font-extrabold text-emerald-300">{cmatMetrics.staticGKAccuracy}%</p>
                <Progress value={cmatMetrics.staticGKAccuracy} className="h-1.5" />
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-[11px] text-slate-400">Economy Accuracy</span>
                <p className="text-lg font-extrabold text-amber-300">{cmatMetrics.economyAccuracy}%</p>
                <Progress value={cmatMetrics.economyAccuracy} className="h-1.5" />
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-[11px] text-slate-400">Innovation &amp; Entrepreneurship</span>
                <p className="text-lg font-extrabold text-yellow-300">{cmatMetrics.innovationAccuracy}%</p>
                <Progress value={cmatMetrics.innovationAccuracy} className="h-1.5" />
              </div>
            </div>
          </Card>
        )}

        {/* 5 CMAT Sections Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Layers className="h-5 w-5 text-cyan-400" />
              <span>Official 5-Section Curriculum</span>
            </h2>
            <Link href="/exams/cmat/studio">
              <span className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 cursor-pointer">
                Enter CMAT Studio <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {cmatSections.map((sec, idx) => (
              <Card
                key={idx}
                className="bg-[#0b1120] border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
              >
                <CardHeader className="p-5 pb-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className={`p-2.5 rounded-xl border bg-gradient-to-br ${sec.color}`}>
                      <sec.icon className="h-5 w-5" />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-slate-400">
                      {sec.count}
                    </span>
                  </div>
                  <CardTitle className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {sec.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-5 pt-0 space-y-3">
                  <div className="space-y-1">
                    {sec.topics.map((t, tidx) => (
                      <div
                        key={tidx}
                        className="text-xs text-slate-300 flex items-center gap-2 py-0.5"
                      >
                        <CheckCircle2 className="h-3 w-3 text-cyan-500/70 shrink-0" />
                        <span className="truncate">{t}</span>
                      </div>
                    ))}
                  </div>

                  <Link href={`/exams/cmat/studio?tab=${sec.tab}`} className="block pt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-between text-xs text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 font-semibold"
                    >
                      <span>Study &amp; Practice</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
