"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Flame,
  Target,
  Zap,
  TrendingUp,
  AlertTriangle,
  BookOpen,
  ArrowRight,
  Sparkles,
  Clock,
  CheckCircle2,
  ChevronRight,
  RotateCcw,
  BarChart2,
  Layers,
  Award,
  Calendar,
  Compass,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import { getStoredCurrentUser, UserProfile } from "@/lib/auth-storage";

const demoAccuracyTrendData = [
  { day: "Mon", accuracy: 62, target: 75, questions: 22 },
  { day: "Tue", accuracy: 68, target: 75, questions: 28 },
  { day: "Wed", accuracy: 64, target: 75, questions: 25 },
  { day: "Thu", accuracy: 74, target: 75, questions: 30 },
  { day: "Fri", accuracy: 71, target: 75, questions: 26 },
  { day: "Sat", accuracy: 82, target: 75, questions: 35 },
  { day: "Sun", accuracy: 78, target: 75, questions: 32 },
];

const newUserAccuracyTrendData = [
  { day: "Day 1", accuracy: 0, target: 75, questions: 0 },
  { day: "Day 2", accuracy: 0, target: 75, questions: 0 },
  { day: "Day 3", accuracy: 0, target: 75, questions: 0 },
  { day: "Day 4", accuracy: 0, target: 75, questions: 0 },
  { day: "Day 5", accuracy: 0, target: 75, questions: 0 },
  { day: "Day 6", accuracy: 0, target: 75, questions: 0 },
  { day: "Today", accuracy: 0, target: 75, questions: 0 },
];

const demoSpeedBenchmarkData = [
  { topic: "Percentages", actualSec: 85, benchmarkSec: 90 },
  { topic: "Time & Work", actualSec: 135, benchmarkSec: 105 },
  { topic: "Arrangements", actualSec: 160, benchmarkSec: 120 },
  { topic: "Para Jumbles", actualSec: 110, benchmarkSec: 90 },
  { topic: "RC Inference", actualSec: 95, benchmarkSec: 100 },
];

const newUserSpeedBenchmarkData = [
  { topic: "Quant (QA)", actualSec: 0, benchmarkSec: 90 },
  { topic: "Reasoning (LR)", actualSec: 0, benchmarkSec: 105 },
  { topic: "Verbal (VARC)", actualSec: 0, benchmarkSec: 90 },
  { topic: "Data Insights", actualSec: 0, benchmarkSec: 120 },
];

export default function DashboardPage() {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    setUser(getStoredCurrentUser());

    const handleAuthChange = (e: Event) => {
      const customEvent = e as CustomEvent<UserProfile | null>;
      if (customEvent.detail) {
        setUser(customEvent.detail);
      } else {
        setUser(getStoredCurrentUser());
      }
    };

    window.addEventListener("aptiverse_auth_changed", handleAuthChange);
    return () => {
      window.removeEventListener("aptiverse_auth_changed", handleAuthChange);
    };
  }, []);

  // Determine if user is a new user (0 questions attempted or clean profile)
  const isNewUser = !user || (user.questionsAttempted === 0);

  // Compute countdown to target exam
  const calculateDaysLeft = (targetDateStr?: string) => {
    if (!targetDateStr) return 88;
    const target = new Date(targetDateStr).getTime();
    const now = new Date().getTime();
    const diff = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 88;
  };

  const daysLeft = calculateDaysLeft(user?.targetDate);
  const examName = user?.targetExamName || (user?.targetExam ? user.targetExam.toUpperCase() + " 2026" : "CAT 2026");
  const studentFirstName = user?.name ? user.name.split(" ")[0] : "Aspirant";
  const dailyGoal = user?.dailyQuestionGoal || 20;

  // For a new user, start at 0%
  const completedToday = isNewUser ? 0 : Math.min(16, dailyGoal);
  const completionPercent = dailyGoal > 0 ? Math.round((completedToday / dailyGoal) * 100) : 0;
  
  const overallIndex = isNewUser ? 0 : 68;
  const quantMastery = isNewUser ? 0 : 72;
  const dilrMastery = isNewUser ? 0 : 61;
  const varcMastery = isNewUser ? 0 : 74;
  const questionsSolved = isNewUser ? 0 : (user?.questionsAttempted || 348);
  const streakDays = isNewUser ? 0 : (user?.currentStreak || 12);
  const xpEarned = isNewUser ? (user?.totalXp || 0) : (user?.totalXp || 2450);

  return (
    <AppShell>
      <div className="space-y-8 animate-in fade-in duration-200">
        {/* Top Welcome Banner & Daily Motivation */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Good morning, {studentFirstName} 👋
              </h1>
              <Badge variant="verified" className="text-[10px]">
                {examName} Aspirant
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {daysLeft} days remaining for {examName}.{" "}
              {isNewUser ? (
                <span>Welcome to AptiVerse! Start your diagnostic test to calibrate your baseline.</span>
              ) : (
                <>
                  You are on a{" "}
                  <span className="text-amber-400 font-semibold">{streakDays}-day streak 🔥</span>.
                </>
              )}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/practice">
              <Button variant="accent" size="sm" className="gap-2 shadow-lg shadow-indigo-600/20">
                <Flame className="h-4 w-4 text-amber-300 fill-amber-300 animate-pulse" />
                <span>{isNewUser ? "Start First Practice Drill" : "Solve Daily Challenge"}</span>
              </Button>
            </Link>
            <Link href={`/exams/${user?.targetExam || "cat"}`}>
              <Button variant="secondary" size="sm" className="gap-2">
                <Compass className="h-4 w-4 text-indigo-400" />
                <span>Explore {examName} Syllabus</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Bento Grid Row 1: Daily Goal, Exam Readiness, Continue Learning */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-5">
          {/* Today's Goal Card (4 Cols) */}
          <Card className="lg:col-span-4 border border-indigo-500/20 bg-gradient-to-br from-indigo-950/30 via-[#0b1120] to-[#0b1120] flex flex-col justify-between">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
                    <Target className="h-4 w-4" />
                  </div>
                  <CardTitle className="text-base font-semibold">Today&apos;s Goal</CardTitle>
                </div>
                <Badge variant="indigo" className="text-[11px] font-mono font-bold">
                  {completedToday} / {dailyGoal} Qs
                </Badge>
              </div>
              <CardDescription className="text-xs text-slate-400 pt-1">
                Maintain consistency to compound your exam speed and accuracy.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-300">Daily Target Completion</span>
                  <span className="text-indigo-400 font-mono">{completionPercent}%</span>
                </div>
                <Progress value={completionPercent} className="h-2.5" />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-xs font-medium">
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                  <Flame className="h-4 w-4 text-amber-400 fill-amber-400" />
                  <div>
                    <p className="text-[10px] text-slate-400">Streak</p>
                    <p className="text-xs font-bold text-white">{streakDays} Days</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                  <Zap className="h-4 w-4 text-indigo-400 fill-indigo-400" />
                  <div>
                    <p className="text-[10px] text-slate-400">XP Today</p>
                    <p className="text-xs font-bold text-white">+{xpEarned} XP</p>
                  </div>
                </div>
              </div>

              <Link href="/practice" className="block pt-1">
                <Button variant="default" className="w-full justify-between group">
                  <span>{isNewUser ? "Start Your First Session" : "Continue Practice Session"}</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Target Exam Readiness (5 Cols) */}
          <Card className="lg:col-span-5 border border-slate-800 bg-[#0b1120] flex flex-col justify-between">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-base font-semibold">{examName} Readiness</CardTitle>
                    <Badge variant="verified" className="text-[10px]">
                      {isNewUser ? "Initial Calibration" : "99th Percentile Goal"}
                    </Badge>
                  </div>
                  <CardDescription className="text-xs text-slate-400 pt-0.5">
                    {isNewUser
                      ? "Complete practice drills to establish your mastery index."
                      : "Sectional mastery benchmarked against target cutoff criteria."}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-extrabold text-indigo-400 font-mono">{overallIndex}%</span>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Overall Index</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-3.5">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">Quantitative Aptitude</span>
                  <span className={`${isNewUser ? "text-slate-400" : "text-emerald-400"} font-bold font-mono`}>
                    {quantMastery}% Mastery
                  </span>
                </div>
                <Progress value={quantMastery} indicatorClassName="bg-emerald-500" className="h-2" />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">Logical Reasoning &amp; DI</span>
                  <span className={`${isNewUser ? "text-slate-400" : "text-amber-400"} font-bold font-mono`}>
                    {dilrMastery}% Mastery
                  </span>
                </div>
                <Progress value={dilrMastery} indicatorClassName="bg-amber-500" className="h-2" />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">Verbal Ability &amp; RC</span>
                  <span className={`${isNewUser ? "text-slate-400" : "text-indigo-400"} font-bold font-mono`}>
                    {varcMastery}% Mastery
                  </span>
                </div>
                <Progress value={varcMastery} indicatorClassName="bg-indigo-500" className="h-2" />
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
                <span>
                  Questions Solved: <strong className="text-white">{questionsSolved}</strong>
                </span>
                <Link href="/analytics" className="text-indigo-400 hover:underline font-medium">
                  Detailed Analytics →
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Continue Learning Widget (3 Cols) */}
          <Card className="lg:col-span-3 border border-slate-800 bg-[#0b1120] flex flex-col justify-between">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-[10px]">
                  {isNewUser ? "GET STARTED" : "CONTINUE LEARNING"}
                </Badge>
                <span className="text-[11px] font-mono text-slate-400">
                  {isNewUser ? "Ready" : "In Progress"}
                </span>
              </div>
              <CardTitle className="text-base font-semibold pt-1">
                {isNewUser ? `${examName} Foundations` : (user?.lastTopic?.title || "Time & Work – Pipes & Cisterns")}
              </CardTitle>
              <CardDescription className="text-xs text-slate-400">
                {isNewUser ? "Core Foundations Assessment" : (user?.lastTopic?.section || "Quantitative Aptitude")}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300">Module Progress</span>
                  <span className="font-mono font-bold text-white">
                    {isNewUser ? 0 : (user?.lastTopic?.progress || 60)}%
                  </span>
                </div>
                <Progress value={isNewUser ? 0 : (user?.lastTopic?.progress || 60)} className="h-2" />
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2">
                <BookOpen className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
                <span className="line-clamp-2">
                  {isNewUser
                    ? "Next: Start with core formula guides & diagnostic practice"
                    : "Next: Alternating work cycles & negative efficiency traps"}
                </span>
              </div>

              <Link href={isNewUser ? "/learn" : (user?.lastTopic?.href || "/quiz/time-work")} className="block">
                <Button variant="secondary" size="sm" className="w-full justify-center gap-1.5">
                  <span>{isNewUser ? "Start Learning" : "Resume Learning"}</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Bento Grid Row 2: Next Best Action Banner & Weak Area Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Actionable Next Step Recommendation (7 Cols) */}
          <Card className="lg:col-span-7 border border-amber-500/30 bg-gradient-to-r from-amber-950/20 via-[#0b1120] to-[#0b1120]">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-semibold text-white">
                      Recommended for You
                    </CardTitle>
                    <p className="text-[11px] text-amber-400/90 font-medium">
                      Automated Pedagogical Remediation
                    </p>
                  </div>
                </div>
                <Badge variant="warning" className="text-[10px]">
                  HIGH PRIORITY
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {isNewUser ? (
                <>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Welcome to <strong className="text-white">AptiVerse</strong>! Complete your initial 10-minute diagnostic session to calculate your baseline accuracy and unlock AI-tailored study recommendations.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                      <p className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider">
                        Step 1: Explore Syllabus
                      </p>
                      <p className="text-xs text-white font-medium">
                        {examName} Official Blueprint Breakdown
                      </p>
                      <p className="text-[10px] text-slate-400">Section weights &amp; marking schemes</p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                      <p className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
                        Step 2: Take First Drill
                      </p>
                      <p className="text-xs text-white font-medium">
                        10 Baseline Diagnostic Questions
                      </p>
                      <p className="text-[10px] text-slate-400">No time penalty • Zero answer leaks</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Link href={`/exams/${user?.targetExam || "cat"}`}>
                      <Button variant="default" size="sm" className="gap-2">
                        <BookOpen className="h-4 w-4" />
                        <span>View Exam Blueprint</span>
                      </Button>
                    </Link>
                    <Link href="/practice">
                      <Button variant="accent" size="sm" className="gap-2">
                        <Target className="h-4 w-4" />
                        <span>Start First Practice Session</span>
                      </Button>
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    You are currently struggling with <strong className="text-white">Time &amp; Work (48% Accuracy)</strong> and your average solving time is <strong className="text-amber-400 font-mono">2m 15s</strong> (benchmark: 1m 45s).
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                      <p className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider">
                        Step 1: Revise Theory
                      </p>
                      <p className="text-xs text-white font-medium">
                        LCM Units &amp; Alternating Days Protocol
                      </p>
                      <p className="text-[10px] text-slate-400">Estimated duration: 8 minutes</p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                      <p className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
                        Step 2: Solve Drill
                      </p>
                      <p className="text-xs text-white font-medium">
                        10 Medium Target Questions
                      </p>
                      <p className="text-[10px] text-slate-400">Target accuracy: &gt; 80%</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Link href="/learn/quant/time-work">
                      <Button variant="default" size="sm" className="gap-2">
                        <BookOpen className="h-4 w-4" />
                        <span>Revise Concept (8 min)</span>
                      </Button>
                    </Link>
                    <Link href="/quiz/time-work">
                      <Button variant="accent" size="sm" className="gap-2">
                        <Target className="h-4 w-4" />
                        <span>Start 10-Question Drill</span>
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Weak Areas List (5 Cols) */}
          <Card className="lg:col-span-5 border border-slate-800 bg-[#0b1120]">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400" />
                  <CardTitle className="text-base font-semibold">Priority Weak Areas</CardTitle>
                </div>
                <Link href="/mistakes" className="text-xs text-indigo-400 hover:underline">
                  Mistake Book ({isNewUser ? 0 : 7}) →
                </Link>
              </div>
              <CardDescription className="text-xs text-slate-400">
                {isNewUser
                  ? "Areas needing revision will appear automatically after you practice."
                  : "Topics with accuracy < 60% across recent diagnostic sessions."}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              {isNewUser ? (
                <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/60 text-center space-y-3">
                  <div className="h-10 w-10 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto text-indigo-400">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">No Weak Areas Identified Yet</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Solve questions to automatically log tricky questions and speed traps.
                    </p>
                  </div>
                  <Link href="/practice" className="inline-block pt-1">
                    <Button variant="outline" size="sm" className="text-xs">
                      Start Practice Drill
                    </Button>
                  </Link>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                    <div>
                      <p className="text-xs font-semibold text-white">Time &amp; Work</p>
                      <p className="text-[10px] text-slate-400">Quantitative Aptitude • 14 Attempts</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="destructive" className="text-[10px] font-mono">
                        48% Acc
                      </Badge>
                      <Link href="/quiz/time-work">
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-indigo-400">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                    <div>
                      <p className="text-xs font-semibold text-white">Linear &amp; Circular Arrangements</p>
                      <p className="text-[10px] text-slate-400">Logical Reasoning • 18 Attempts</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="warning" className="text-[10px] font-mono">
                        53% Acc
                      </Badge>
                      <Link href="/quiz/linear-arrangements">
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-indigo-400">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                    <div>
                      <p className="text-xs font-semibold text-white">Para Jumbles &amp; Coherence</p>
                      <p className="text-[10px] text-slate-400">Verbal Ability • 21 Attempts</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="warning" className="text-[10px] font-mono">
                        57% Acc
                      </Badge>
                      <Link href="/quiz/para-jumbles">
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-indigo-400">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Bento Grid Row 3: Performance Telemetry (Accuracy Trend & Pace Benchmark) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Accuracy Trend Chart (7 Cols) */}
          <Card className="lg:col-span-7 border border-slate-800 bg-[#0b1120] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-white">7-Day Accuracy Trend</h3>
                <p className="text-xs text-slate-400">
                  {isNewUser
                    ? "Telemetry will plot daily accuracy once sessions are recorded"
                    : "Daily practice accuracy vs 75% target benchmark"}
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="flex items-center gap-1 text-indigo-400 font-medium">
                  <span className="h-2 w-2 rounded-full bg-indigo-500"></span> Accuracy %
                </span>
                <span className="flex items-center gap-1 text-slate-400 font-medium">
                  <span className="h-2 w-2 rounded-full bg-slate-600"></span> Target (75%)
                </span>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={isNewUser ? newUserAccuracyTrendData : demoAccuracyTrendData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="accuracyGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="day" stroke="#64748b" textAnchor="middle" fontSize={11} />
                  <YAxis domain={[0, 100]} stroke="#64748b" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0b0f19",
                      borderColor: "#334155",
                      borderRadius: "0.75rem",
                      fontSize: "12px",
                      color: "#fff",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="accuracy"
                    stroke="#6366f1"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#accuracyGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Solving Pace vs Benchmark (5 Cols) */}
          <Card className="lg:col-span-5 border border-slate-800 bg-[#0b1120] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-white">Solving Pace (Seconds)</h3>
                <p className="text-xs text-slate-400">
                  {isNewUser ? "Benchmark vs your actual solving time" : "Actual average time vs Target benchmark"}
                </p>
              </div>
              <Badge variant="secondary" className="text-[10px]">
                TELEMETRY
              </Badge>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={isNewUser ? newUserSpeedBenchmarkData : demoSpeedBenchmarkData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="topic" stroke="#64748b" fontSize={10} />
                  <YAxis stroke="#64748b" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0b0f19",
                      borderColor: "#334155",
                      borderRadius: "0.75rem",
                      fontSize: "12px",
                      color: "#fff",
                    }}
                  />
                  <Bar dataKey="actualSec" name="Actual Time (s)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="benchmarkSec" name="Benchmark (s)" fill="#64748b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
