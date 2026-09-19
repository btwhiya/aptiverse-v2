"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  BarChart3,
  Table2,
  PieChart,
  TrendingUp,
  Activity,
  FileSpreadsheet,
  Grid,
  Users,
  Trophy,
  CircleDot,
  GitFork,
  HelpCircle,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Clock,
  Layers,
  ChevronLeft,
  BookOpen,
  CheckCircle2,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DILRDifficulty, DILRSection, DILRTopicMeta } from "@/lib/dilr/types";
import { DILR_TOPICS, generateDILRSet, generateRandomDILRSet } from "@/lib/dilr/registry";

export default function DILRConceptHubPage() {
  const router = useRouter();
  const [selectedSection, setSelectedSection] = useState<"ALL" | DILRSection>("ALL");
  const [difficulty, setDifficulty] = useState<DILRDifficulty>("CAT");
  const [isGenerating, setIsGenerating] = useState<string | null>(null);

  const iconMap: Record<string, React.ElementType> = {
    Table2,
    BarChart3,
    PieChart,
    TrendingUp,
    Activity,
    FileSpreadsheet,
    Grid,
    Users,
    Trophy,
    CircleDot,
    GitFork,
    HelpCircle,
    Calendar,
  };

  const handleStartSet = (topicId: string) => {
    try {
      setIsGenerating(topicId);
      const set = generateDILRSet(topicId, difficulty);
      router.push(`/learn/dilr/set/${set.id}`);
    } catch (err) {
      console.error("Failed to generate set:", err);
      setIsGenerating(null);
    }
  };

  const handleStartRandomSet = (section?: DILRSection) => {
    try {
      setIsGenerating(section || "RANDOM");
      const set = generateRandomDILRSet(section, difficulty);
      router.push(`/learn/dilr/set/${set.id}`);
    } catch (err) {
      console.error("Failed to generate random set:", err);
      setIsGenerating(null);
    }
  };

  const filteredTopics =
    selectedSection === "ALL"
      ? DILR_TOPICS
      : DILR_TOPICS.filter((t) => t.section === selectedSection);

  const diCount = DILR_TOPICS.filter((t) => t.section === "DI").length;
  const lrCount = DILR_TOPICS.filter((t) => t.section === "LR").length;

  return (
    <AppShell>
      <div className="space-y-8 max-w-6xl mx-auto animate-in fade-in duration-200">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/learn" className="hover:text-white transition-colors flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" />
            <span>Learn Concepts</span>
          </Link>
          <span>/</span>
          <span className="text-indigo-400 font-semibold">Data Interpretation & Logical Reasoning</span>
        </div>

        {/* Header Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800/80 p-6 md:p-8 shadow-2xl">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-16 w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="indigo" className="px-3 py-1">
                  <BookOpen className="w-3.5 h-3.5 mr-1 text-indigo-400" />
                  CANONICAL CONCEPT GRAPH
                </Badge>
                <Badge variant="verified" className="px-3 py-1">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                  CAT-LEVEL DILR ENGINE
                </Badge>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
                Data Interpretation & Logical Reasoning
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Master constraint-based reasoning, missing tabular data reconstruction, tournament brackets,
                circular orderings, and multi-graph caselets with structured pedagogical theory and auto-validated CAT sets.
              </p>
            </div>

            {/* Quick Action Box */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
              <Button
                onClick={() => handleStartRandomSet()}
                disabled={isGenerating !== null}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
              >
                <Zap className="w-4 h-4 text-amber-300" />
                {isGenerating === "RANDOM" ? "Generating..." : "Launch Random CAT Set"}
              </Button>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleStartRandomSet("DI")}
                  disabled={isGenerating !== null}
                  variant="outline"
                  className="flex-1 border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-xs font-semibold text-slate-200"
                >
                  Random DI ({diCount})
                </Button>
                <Button
                  onClick={() => handleStartRandomSet("LR")}
                  disabled={isGenerating !== null}
                  variant="outline"
                  className="flex-1 border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-xs font-semibold text-slate-200"
                >
                  Random LR ({lrCount})
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Configuration Bar: Difficulty + Section Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur-md">
          {/* Section Filter */}
          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-800/80 border border-slate-700/60 w-fit">
            <button
              onClick={() => setSelectedSection("ALL")}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                selectedSection === "ALL"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              All Topics ({DILR_TOPICS.length})
            </button>
            <button
              onClick={() => setSelectedSection("DI")}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                selectedSection === "DI"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Data Interpretation ({diCount})
            </button>
            <button
              onClick={() => setSelectedSection("LR")}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                selectedSection === "LR"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Logical Reasoning ({lrCount})
            </button>
          </div>

          {/* Difficulty Segmented Control */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Difficulty Level:</span>
            <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-800/80 border border-slate-700/60">
              <button
                onClick={() => setDifficulty("MODERATE")}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                  difficulty === "MODERATE"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                MODERATE
              </button>
              <button
                onClick={() => setDifficulty("CAT")}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                  difficulty === "CAT"
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                CAT STANDARD
              </button>
              <button
                onClick={() => setDifficulty("CAT_HARD")}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                  difficulty === "CAT_HARD"
                    ? "bg-red-600 text-white shadow-xs"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                CAT HARD (99%ile)
              </button>
            </div>
          </div>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTopics.map((topic: DILRTopicMeta) => {
            const Icon = iconMap[topic.icon] || BarChart3;
            const isDI = topic.section === "DI";
            const isCurrentlyGenerating = isGenerating === topic.id;

            return (
              <Card
                key={topic.id}
                className="group relative flex flex-col justify-between p-5 bg-slate-900/90 border border-slate-800 rounded-xl hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-200 backdrop-blur-md"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
                          isDI
                            ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
                            : "bg-purple-500/10 text-purple-400 border border-purple-500/30"
                        }`}
                      >
                        {topic.section}
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">
                        {topic.visualizationType.toUpperCase()}
                      </span>
                    </div>

                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                        topic.catWeightage === "Very High"
                          ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {topic.catWeightage} Weightage
                    </span>
                  </div>

                  {/* Icon and Title */}
                  <div className="flex items-start gap-3.5 mb-2">
                    <div
                      className={`p-2.5 rounded-lg border transition-colors ${
                        isDI
                          ? "bg-cyan-950/40 border-cyan-800/40 text-cyan-400 group-hover:border-cyan-500/50"
                          : "bg-purple-950/40 border-purple-800/40 text-purple-400 group-hover:border-purple-500/50"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-100 group-hover:text-indigo-300 transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-xs text-indigo-400/90 font-medium mt-0.5">
                        {topic.questionStyle}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {topic.description}
                  </p>
                </div>

                {/* Footer details & Action */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>~10-12 mins</span>
                    <span className="text-slate-600">•</span>
                    <span>4-5 Qs</span>
                  </div>

                  <Button
                    size="sm"
                    disabled={isCurrentlyGenerating}
                    onClick={() => handleStartSet(topic.id)}
                    className="bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white font-semibold text-xs px-3 py-1.5 rounded-lg border border-slate-700 hover:border-indigo-500 transition-all flex items-center gap-1.5"
                  >
                    {isCurrentlyGenerating ? "Building..." : "Concept & Set"}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
