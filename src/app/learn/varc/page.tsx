"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  FileText,
  Layers,
  Sparkles,
  Zap,
  Target,
  ArrowRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  Brain,
  Compass,
  Lightbulb,
  Award,
  ChevronRight,
  Filter,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  VARC_CONCEPTS,
  RC_PASSAGES,
  VA_PARAJUMBLES,
  VA_SUMMARIES,
  VA_ODD_ONE_OUT,
  VA_SENTENCE_COMPLETIONS,
  getStoredVARCProgress,
  calculateVARCOverallStats,
  VARCSection,
  VARCDifficulty,
  RCGenre,
} from "@/lib/varc";

export default function VARCHubPage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<VARCSection>("RC");
  const [selectedGenre, setSelectedGenre] = useState<"ALL" | RCGenre>("ALL");
  const [selectedDifficulty, setSelectedDifficulty] = useState<"ALL" | VARCDifficulty>("ALL");
  const [progress, setProgress] = useState(getStoredVARCProgress());
  const [stats, setStats] = useState(calculateVARCOverallStats());

  useEffect(() => {
    setProgress(getStoredVARCProgress());
    setStats(calculateVARCOverallStats());

    const handleUpdate = () => {
      setProgress(getStoredVARCProgress());
      setStats(calculateVARCOverallStats());
    };

    window.addEventListener("aptiverse_varc_progress_updated", handleUpdate);
    return () => window.removeEventListener("aptiverse_varc_progress_updated", handleUpdate);
  }, []);

  const rcConcepts = VARC_CONCEPTS.filter((c) => c.section === "RC");
  const vaConcepts = VARC_CONCEPTS.filter((c) => c.section === "VA");

  const filteredPassages = RC_PASSAGES.filter((p) => {
    const matchGenre = selectedGenre === "ALL" || p.genre === selectedGenre;
    const matchDiff = selectedDifficulty === "ALL" || p.difficulty === selectedDifficulty;
    return matchGenre && matchDiff;
  });

  const launchRandomPassage = () => {
    const randomIndex = Math.floor(Math.random() * RC_PASSAGES.length);
    router.push(`/learn/varc/rc/${RC_PASSAGES[randomIndex].id}`);
  };

  const launchRandomVA = () => {
    const vaSlugs = ["para-jumbles", "para-summary", "odd-one-out", "sentence-completion"];
    const randomSlug = vaSlugs[Math.floor(Math.random() * vaSlugs.length)];
    router.push(`/learn/varc/va/${randomSlug}`);
  };

  return (
    <AppShell>
      <div className="space-y-8 max-w-7xl mx-auto animate-in fade-in duration-200">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/learn" className="hover:text-white transition-colors">
            Learn Center
          </Link>
          <span>/</span>
          <span className="text-emerald-400 font-semibold">Verbal Ability & Reading Comprehension (VARC)</span>
        </div>

        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-emerald-950/30 to-slate-900 border border-slate-800 p-6 md:p-8 shadow-2xl">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-20 w-72 h-72 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="success" className="px-3 py-1 font-bold">
                  <Brain className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                  CAT VARC 99%ile SYSTEM
                </Badge>
                <Badge variant="indigo" className="px-3 py-1 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1 text-indigo-400" />
                  CANONICAL CURRICULUM
                </Badge>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
                Verbal Ability &amp; Reading Comprehension
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Master dense academic passages across Philosophy, Psychology, Economics, and Science. Develop
                airtight distractor elimination, unstated inference deduction, and programmatic Para-Jumble logic.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
              <Button
                onClick={launchRandomPassage}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
              >
                <BookOpen className="w-4 h-4 text-emerald-200" />
                Launch Full CAT RC Passage
              </Button>
              <Button
                onClick={launchRandomVA}
                variant="outline"
                className="border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-xs font-semibold text-slate-200 flex items-center justify-center gap-2"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                Launch VA Speed Drill
              </Button>
            </div>
          </div>
        </div>

        {/* Diagnostic Weak-Area & Accuracy Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Diagnostic Recommendation Card */}
          <Card className="p-5 bg-slate-900/90 border border-slate-800 rounded-xl space-y-3 lg:col-span-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-amber-400" />
                <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                  Personalized Weak Area Diagnostic
                </h3>
              </div>
              <span className="text-[11px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                RECOMMENDED FOCUS
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-white">
                  {stats.recommendedFocus.title}
                </h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {stats.recommendedFocus.reason}
                </p>
                <div className="mt-2.5 flex items-center gap-3">
                  <Link href={`/learn/varc/concept/${stats.recommendedFocus.conceptId}`}>
                    <Button size="sm" className="bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs h-7 px-3">
                      Start Concept Drill &rarr;
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>

          {/* Sectional Accuracy Tracker */}
          <Card className="p-5 bg-slate-900/90 border border-slate-800 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                VARC Performance
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                {stats.totalAttempted} Qs Attempted
              </span>
            </div>

            <div className="space-y-3 pt-1">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-300">Reading Comprehension</span>
                  <span className="text-emerald-400 font-mono font-bold">{stats.rcAccuracy}%</span>
                </div>
                <Progress value={stats.rcAccuracy} className="h-1.5" />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-300">Verbal Ability</span>
                  <span className="text-indigo-400 font-mono font-bold">{stats.vaAccuracy}%</span>
                </div>
                <Progress value={stats.vaAccuracy} className="h-1.5" />
              </div>

              <div className="pt-2 border-t border-slate-800 flex justify-between text-[11px] text-slate-400">
                <span>Strongest: <strong className="text-slate-200">{stats.strongestConcept}</strong></span>
              </div>
            </div>
          </Card>
        </div>

        {/* Section Navigation Tabs: Reading Comprehension vs. Verbal Ability */}
        <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-900 border border-slate-800 w-fit">
          <button
            onClick={() => setActiveSection("RC")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold transition-all ${
              activeSection === "RC"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Reading Comprehension ({RC_PASSAGES.length} Passages)</span>
          </button>
          <button
            onClick={() => setActiveSection("VA")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold transition-all ${
              activeSection === "VA"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Verbal Ability (4 Modules / 40 Qs)</span>
          </button>
        </div>

        {/* ============================================================== */}
        {/* TAB 1: READING COMPREHENSION HUB */}
        {/* ============================================================== */}
        {activeSection === "RC" && (
          <div className="space-y-8 animate-in fade-in duration-150">
            {/* RC Concept Masterclasses Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white">1. RC Core Concept Masterclasses</h2>
                  <p className="text-xs text-slate-400">Learn the theoretical framework, signals, step-by-step methods, and traps before testing.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {rcConcepts.map((c) => {
                  const p = progress[c.id];
                  const statusColors: Record<string, string> = {
                    NOT_STARTED: "bg-slate-800 text-slate-400 border-slate-700",
                    LEARNING: "bg-amber-500/10 text-amber-400 border-amber-500/30",
                    PRACTICING: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
                    MASTERED: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
                  };

                  return (
                    <Card
                      key={c.id}
                      className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl hover:border-emerald-500/50 transition-all flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2.5">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${statusColors[p?.status || "NOT_STARTED"]}`}>
                            {p?.status || "NOT STARTED"}
                          </span>
                          <span className="text-[11px] font-mono text-slate-400">
                            {p?.accuracy || 0}% Acc
                          </span>
                        </div>

                        <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                          {c.title}
                        </h3>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                          {c.shortDesc}
                        </p>
                      </div>

                      <div className="pt-3 mt-3 border-t border-slate-800 flex items-center justify-between">
                        <span className="text-[11px] text-slate-500 font-mono">
                          {c.averageQuestionsInCAT}
                        </span>
                        <Link href={`/learn/varc/concept/${c.id}`}>
                          <Button size="sm" variant="ghost" className="text-xs text-emerald-400 hover:text-emerald-300 p-0 h-auto">
                            Masterclass &rarr;
                          </Button>
                        </Link>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* RC Authentic Passages Library */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-white">2. Authentic CAT Reading Comprehension Passages</h2>
                  <p className="text-xs text-slate-400">Original, intellectually dense 500-600 word passages across 5 core genres with varied questions.</p>
                </div>

                {/* Genre Filter */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  <span className="text-xs text-slate-400 font-medium">Genre:</span>
                  <select
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value as any)}
                    className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="ALL">All Genres ({RC_PASSAGES.length})</option>
                    <option value="Philosophy">Philosophy (2)</option>
                    <option value="Psychology & Sociology">Psychology &amp; Sociology (2)</option>
                    <option value="Business & Economics">Business &amp; Economics (2)</option>
                    <option value="Science & Technology">Science &amp; Technology (2)</option>
                    <option value="Literature, Culture & History">Literature &amp; History (2)</option>
                  </select>
                </div>
              </div>

              {/* Passage Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredPassages.map((passage) => {
                  const difficultyColor =
                    passage.difficulty === "CAT_HARD"
                      ? "bg-rose-500/10 text-rose-400 border-rose-500/30"
                      : passage.difficulty === "CAT"
                      ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/30"
                      : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";

                  return (
                    <Card
                      key={passage.id}
                      className="p-5 bg-slate-900/90 border border-slate-800 rounded-xl hover:border-emerald-500/50 transition-all flex flex-col justify-between group space-y-4"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <Badge variant="indigo" className="text-[11px] font-bold">
                            {passage.genre}
                          </Badge>
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${difficultyColor}`}>
                              {passage.difficulty}
                            </span>
                            <span className="text-xs text-slate-400 font-mono">
                              ~{passage.wordCount} words
                            </span>
                          </div>
                        </div>

                        <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                          {passage.title}
                        </h3>

                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {passage.keyThemes.map((theme, tIdx) => (
                            <span key={tIdx} className="text-[10px] text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded">
                              #{theme}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                        <span className="text-xs text-slate-400 font-medium">
                          {passage.questions.length} Multi-Type Questions
                        </span>
                        <Link href={`/learn/varc/rc/${passage.id}`}>
                          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs">
                            Attempt Passage &rarr;
                          </Button>
                        </Link>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: VERBAL ABILITY HUB */}
        {/* ============================================================== */}
        {activeSection === "VA" && (
          <div className="space-y-8 animate-in fade-in duration-150">
            {/* VA Concept Masterclasses */}
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-bold text-white">Verbal Ability Topic Masterclasses &amp; Drill Runners</h2>
                <p className="text-xs text-slate-400">Master the 4 core non-RC question types that constitute 8-9 questions in every CAT paper.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* 1. Para-Jumbles Card */}
                <Card className="p-6 bg-slate-900/90 border border-slate-800 rounded-xl space-y-4 hover:border-indigo-500/50 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded border border-indigo-500/20">
                      TITA &bull; 3-4 QUESTIONS
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      Accuracy: {progress["para-jumbles"]?.accuracy || 0}%
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white">Para-Jumbles (TITA Sentence Sequencing)</h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Reconstruct scrambled academic paragraphs through mandatory pairs, noun-pronoun bridges,
                      and chronological flows. Validated for 100% unique sequence solvability.
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                      10 Curated CAT Sets
                    </span>
                    <div className="flex gap-2">
                      <Link href="/learn/varc/concept/para-jumbles">
                        <Button size="sm" variant="outline" className="text-xs border-slate-700 text-slate-300">
                          Concept Guide
                        </Button>
                      </Link>
                      <Link href="/learn/varc/va/para-jumbles">
                        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs">
                          Practice Drills &rarr;
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>

                {/* 2. Paragraph Summary Card */}
                <Card className="p-6 bg-slate-900/90 border border-slate-800 rounded-xl space-y-4 hover:border-indigo-500/50 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                      MCQ &bull; 3 QUESTIONS
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      Accuracy: {progress["para-summary"]?.accuracy || 0}%
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white">Paragraph Summary (Core Distillation)</h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Eliminate subtle distractors: too narrow, too broad, distorted authorial stance, or external generalizations.
                      Distill 100-word complex texts into an airtight 1-sentence synthesis.
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                      10 Curated CAT Sets
                    </span>
                    <div className="flex gap-2">
                      <Link href="/learn/varc/concept/para-summary">
                        <Button size="sm" variant="outline" className="text-xs border-slate-700 text-slate-300">
                          Concept Guide
                        </Button>
                      </Link>
                      <Link href="/learn/varc/va/para-summary">
                        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs">
                          Practice Drills &rarr;
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>

                {/* 3. Odd One Out Card */}
                <Card className="p-6 bg-slate-900/90 border border-slate-800 rounded-xl space-y-4 hover:border-indigo-500/50 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
                      TITA &bull; 2-3 QUESTIONS
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      Accuracy: {progress["odd-one-out"]?.accuracy || 0}%
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white">Odd Sentence Out (Coherence Breakers)</h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Detect the sentence that shares surface keywords but diverges in scope, vector, or analytical abstraction.
                      Verify the coherent sequence of the remaining 4 sentences.
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                      10 Curated CAT Sets
                    </span>
                    <div className="flex gap-2">
                      <Link href="/learn/varc/concept/odd-one-out">
                        <Button size="sm" variant="outline" className="text-xs border-slate-700 text-slate-300">
                          Concept Guide
                        </Button>
                      </Link>
                      <Link href="/learn/varc/va/odd-one-out">
                        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs">
                          Practice Drills &rarr;
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>

                {/* 4. Sentence Completion Card */}
                <Card className="p-6 bg-slate-900/90 border border-slate-800 rounded-xl space-y-4 hover:border-indigo-500/50 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded border border-purple-500/20">
                      MCQ &bull; 2 QUESTIONS
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      Accuracy: {progress["sentence-completion"]?.accuracy || 0}%
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white">Paragraph &amp; Sentence Completion</h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Forecast the author's logical climax. Select the concluding sentence that fulfills the argument's
                      direction, matches the tone, and provides structural closure without introducing premature topics.
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                      10 Curated CAT Sets
                    </span>
                    <div className="flex gap-2">
                      <Link href="/learn/varc/concept/sentence-completion">
                        <Button size="sm" variant="outline" className="text-xs border-slate-700 text-slate-300">
                          Concept Guide
                        </Button>
                      </Link>
                      <Link href="/learn/varc/va/sentence-completion">
                        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs">
                          Practice Drills &rarr;
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
