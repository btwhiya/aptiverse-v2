"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Target,
  Flame,
  Zap,
  Sliders,
  AlertTriangle,
  FileCheck,
  ArrowRight,
  Sparkles,
  Clock,
  Layers,
  ChevronRight,
  Plus,
  PlusCircle,
  BookOpen,
  Search,
  CheckCircle2,
  Trash2,
  Play,
  Filter,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getStoredCurrentUser, UserProfile } from "@/lib/auth-storage";
import { AddQuestionModal } from "@/components/practice/AddQuestionModal";
import {
  getCustomQuestions,
  deleteCustomQuestion,
  CustomQuestionItem,
  resetToDefaultUniqueQuestions,
} from "@/lib/custom-questions";
import { resolveQuestionGraph } from "@/lib/graph-resolver";

export default function PracticeHubPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [customQuestions, setCustomQuestions] = useState<CustomQuestionItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTrackFilter, setSelectedTrackFilter] = useState<string>("ALL");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    setUser(getStoredCurrentUser());
    setCustomQuestions(getCustomQuestions());
  }, []);

  const refreshQuestions = () => {
    setCustomQuestions(getCustomQuestions());
  };

  const handleQuestionAdded = (newQ: CustomQuestionItem) => {
    refreshQuestions();
    setToastMessage(`Unique question "${newQ.topicSlug}" added directly to software bank!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to remove this custom question?")) {
      deleteCustomQuestion(id);
      refreshQuestions();
      setToastMessage("Question removed from bank.");
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  const isNewUser = !user || user.questionsAttempted === 0;
  const streak = isNewUser ? 0 : (user?.currentStreak || 12);

  const filteredQuestions = customQuestions.filter((q) => {
    const matchesTrack =
      selectedTrackFilter === "ALL" ||
      (selectedTrackFilter === "USER" && q.isUserCreated) ||
      (selectedTrackFilter === "IMS" && (q.source?.toLowerCase().includes("ims") || q.tags?.some((t) => t.toLowerCase().includes("ims")))) ||
      q.track === selectedTrackFilter;

    const matchesSearch =
      q.questionText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.topicSlug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (q.subtopicSlug && q.subtopicSlug.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (q.source && q.source.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (q.tags && q.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesTrack && matchesSearch;
  });

  const modes = [
    {
      id: "unique-creator",
      title: "Add & Practice Unique Questions",
      desc: "Author unique questions directly in the software with 4-part solutions, shortcuts, and instant drill launching.",
      icon: PlusCircle,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
      badge: `${customQuestions.length} AVAILABLE`,
      badgeVariant: "success" as const,
      isAction: true,
      stats: "Direct In-App Authoring & Storage",
    },
    {
      id: "weak",
      title: isNewUser ? "Diagnostic Baseline Drill" : "Targeted Weak Area Workout",
      desc: isNewUser
        ? "Instant 10-question diagnostic drill across QA, DILR, and VARC to map your baseline accuracy."
        : "Instant 10-question drill dynamically generated from your <60% accuracy topics (Time & Work, Arrangements, Para Jumbles).",
      icon: AlertTriangle,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/30",
      badge: isNewUser ? "DIAGNOSTIC" : "AI RECOMMENDED",
      badgeVariant: "warning" as const,
      href: "/practice/weak",
      stats: "10 Questions • ~18 Mins",
    },
    {
      id: "daily",
      title: "Daily Streak Challenge",
      desc: isNewUser
        ? "5 curated questions across QA, DILR, and VARC to start your Day 1 active streak and earn +150 bonus XP."
        : `5 curated questions across QA, DILR, and VARC to maintain your ${streak}-day active streak and earn +150 bonus XP.`,
      icon: Flame,
      color: "text-red-400 bg-red-500/10 border-red-500/30",
      badge: isNewUser ? "START STREAK" : "ACTIVE TODAY",
      badgeVariant: "success" as const,
      href: "/practice/daily",
      stats: "5 Questions • ~8 Mins",
    },
    {
      id: "custom",
      title: "Custom Drill Builder",
      desc: "Customize your own drill: filter by specific subtopics, choose difficulty (Easy, Medium, Hard), and toggle timer mode.",
      icon: Sliders,
      color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/30",
      badge: "FLEXIBLE",
      badgeVariant: "indigo" as const,
      href: "/practice/custom",
      stats: "Configurable Parameters",
    },
    {
      id: "previous-year",
      title: "Verified Previous Year Papers",
      desc: "Practice with authentic past entrance exam sets categorized by year and slot with full 4-part solutions.",
      icon: FileCheck,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/30",
      badge: "AUTHENTIC",
      badgeVariant: "verified" as const,
      href: "/practice/previous-year",
      stats: "CAT / XAT / SNAP Sets",
    },
  ];

  return (
    <AppShell>
      <div className="space-y-10 max-w-6xl mx-auto animate-in fade-in duration-200">
        {/* Toast feedback */}
        {toastMessage && (
          <div className="fixed top-20 right-6 z-50 p-4 rounded-2xl bg-emerald-950/90 border border-emerald-500 text-emerald-200 text-xs font-semibold shadow-2xl flex items-center gap-2 animate-in slide-in-from-top-4">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Practice & Workout Hub
              </h1>
              <Badge variant="indigo">ADAPTIVE DRILLS</Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Select your practice modality, build speed with verified sets, or author unique questions directly in software.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="accent"
              size="sm"
              onClick={() => setIsAddModalOpen(true)}
              className="gap-2 shadow-lg shadow-indigo-600/20"
            >
              <Plus className="h-4 w-4" />
              <span>Add Unique Question</span>
            </Button>

            <Link href="/quiz/demo-drill-01">
              <Button variant="outline" size="sm" className="gap-2 border-slate-700">
                <Target className="h-4 w-4 text-indigo-400" />
                <span>Instant 10-Q Sprint</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Practice Modes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modes.map((mode) => (
            <Card
              key={mode.id}
              className="border border-slate-800 bg-[#0e1422] flex flex-col justify-between hover:border-slate-700 transition-all duration-200 group"
            >
              <CardHeader className="space-y-3 pb-3">
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-2xl border ${mode.color}`}>
                    <mode.icon className="h-6 w-6" />
                  </div>
                  <Badge variant={mode.badgeVariant} className="text-[10px]">
                    {mode.badge}
                  </Badge>
                </div>

                <div>
                  <CardTitle className="text-base sm:text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                    {mode.title}
                  </CardTitle>
                  <span className="text-[11px] font-mono text-slate-400 mt-0.5 block">
                    {mode.stats}
                  </span>
                </div>

                <CardDescription className="text-xs text-slate-300 leading-relaxed">
                  {mode.desc}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                {mode.isAction ? (
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => setIsAddModalOpen(true)}
                      className="gap-1 text-xs"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Add New</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const query = new URLSearchParams({
                          topic: "custom",
                          title: "Unique Software Questions Drill",
                          count: "5",
                          timed: "true",
                        });
                        router.push(`/quiz/unique-software-drill?${query.toString()}`);
                      }}
                      className="gap-1 text-xs border-emerald-500/40 text-emerald-300"
                    >
                      <Play className="h-3.5 w-3.5 fill-current" />
                      <span>Practice Bank</span>
                    </Button>
                  </div>
                ) : (
                  <Link href={mode.href!}>
                    <Button variant="default" className="w-full justify-between group">
                      <span>Launch Mode</span>
                      <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Unique Questions Bank in Software */}
        <div className="space-y-4 pt-4 border-t border-slate-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  Direct In-Software Unique Question Bank
                </h2>
                <Badge variant="success" className="text-[10px]">
                  {customQuestions.length} Questions Loaded
                </Badge>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Questions created directly inside the software. Practice them individually or launch full custom workouts.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="accent"
                size="sm"
                onClick={() => setIsAddModalOpen(true)}
                className="gap-1.5 text-xs shadow-md shadow-indigo-600/20"
              >
                <PlusCircle className="h-3.5 w-3.5" />
                <span>+ Add Unique Question</span>
              </Button>
              <Link href="/practice/add-question">
                <Button variant="outline" size="sm" className="text-xs border-slate-700">
                  Full Page Author
                </Button>
              </Link>
            </div>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#0e1422] p-3 rounded-2xl border border-slate-800">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search unique questions by topic, statement, or tags..."
                className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-hidden focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {[
                { id: "ALL", label: "All Tracks" },
                { id: "IMS", label: "IMS SimCAT Benchmark" },
                { id: "qa", label: "QA" },
                { id: "dilr", label: "DILR" },
                { id: "varc", label: "VARC" },
                { id: "USER", label: "My Created" },
              ].map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setSelectedTrackFilter(filter.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                    selectedTrackFilter === filter.id
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-900 text-slate-400 hover:text-white"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question List Cards */}
          {filteredQuestions.length === 0 ? (
            <div className="p-8 rounded-2xl bg-[#0e1422] border border-dashed border-slate-800 text-center space-y-3">
              <Sparkles className="h-8 w-8 text-indigo-400 mx-auto opacity-70" />
              <div>
                <p className="text-sm font-semibold text-white">No matching unique questions found</p>
                <p className="text-xs text-slate-400 mt-1">
                  Add your first unique question directly to start building your personalized drill bank.
                </p>
              </div>
              <Button
                variant="accent"
                size="sm"
                onClick={() => setIsAddModalOpen(true)}
                className="gap-2 text-xs"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Create Unique Question Now</span>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {filteredQuestions.map((q) => (
                <Card
                  key={q.id}
                  className="border border-slate-800 bg-[#0e1422] p-4 sm:p-5 hover:border-indigo-500/40 transition-all group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="indigo" className="text-[10px] uppercase">
                          {q.track || "QA"} • {q.topicSlug.replace(/-/g, " ")}
                        </Badge>
                        <Badge
                          variant={
                            q.difficulty === "EASY"
                              ? "success"
                              : q.difficulty === "HARD"
                              ? "destructive"
                              : "warning"
                          }
                          className="text-[10px]"
                        >
                          {q.difficulty}
                        </Badge>
                        {q.isUserCreated && (
                          <Badge variant="verified" className="text-[10px]">
                            USER CREATED
                          </Badge>
                        )}
                        {resolveQuestionGraph(q) && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-cyan-300">
                            📊 Visual Figure
                          </span>
                        )}
                        <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                          <Clock className="h-3 w-3 text-slate-500" />
                          <span>{q.estimatedTimeSec}s</span>
                        </span>
                      </div>

                      {q.passageText && (
                        <p className="text-xs text-slate-400 line-clamp-1 italic bg-slate-900/50 p-1.5 rounded-lg border border-slate-800">
                          {q.passageText}
                        </p>
                      )}

                      <h3 className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors leading-relaxed">
                        {q.questionText}
                      </h3>

                      {q.solution?.shortcutMethod && (
                        <p className="text-xs text-indigo-300/90 flex items-center gap-1.5 font-sans">
                          <Zap className="h-3 w-3 text-indigo-400 shrink-0" />
                          <span>
                            <strong>Shortcut:</strong> {q.solution.shortcutMethod}
                          </span>
                        </p>
                      )}

                      {q.tags && q.tags.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1 pt-1">
                          {q.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
                      <Button
                        variant="accent"
                        size="sm"
                        onClick={() => {
                          const query = new URLSearchParams({
                            topic: q.topicSlug,
                            title: `Practice Unique Q (${q.topicSlug})`,
                            count: "1",
                            timed: "true",
                          });
                          router.push(`/quiz/solo-${q.id}?${query.toString()}`);
                        }}
                        className="gap-1.5 text-xs shadow-md shadow-indigo-600/20"
                      >
                        <Play className="h-3.5 w-3.5 fill-current" />
                        <span>Practice Solo</span>
                      </Button>

                      {q.isUserCreated && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => handleDelete(q.id, e)}
                          className="text-xs text-slate-500 hover:text-red-400"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>Delete</span>
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Modal for adding questions */}
        <AddQuestionModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onQuestionAdded={handleQuestionAdded}
        />
      </div>
    </AppShell>
  );
}
