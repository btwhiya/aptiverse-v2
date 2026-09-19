"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Target,
  ArrowRight,
  ChevronRight,
  Sparkles,
  BarChart2,
  Calculator,
  Layers,
  FileText,
  Filter,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ALL_QUANT_TOPICS } from "@/lib/quant";
import { ALL_DILR_TOPICS } from "@/lib/dilr";

export default function LearnSectionPage({
  params,
}: {
  params: Promise<{ sectionSlug: string }>;
}) {
  const resolvedParams = use(params);
  const slug = resolvedParams.sectionSlug.toLowerCase();
  const isQuant = slug === "quant" || slug === "qa" || slug === "quantitative-aptitude";
  const isDILR = slug === "dilr" || slug === "di" || slug === "lr" || slug === "data-interpretation-logical-reasoning";

  const [selectedDomain, setSelectedDomain] = useState<string>("ALL");

  const quantDomains = [
    "ALL",
    "Arithmetic",
    "Algebra",
    "Geometry & Mensuration",
    "Number System",
    "Modern Math",
  ];

  const dilrDomains = [
    "ALL",
    "Data Interpretation",
    "Logical Reasoning",
  ];

  const filteredQuantTopics =
    selectedDomain === "ALL"
      ? ALL_QUANT_TOPICS
      : ALL_QUANT_TOPICS.filter((t) => t.domain === selectedDomain);

  const filteredDILRTopics =
    selectedDomain === "ALL"
      ? ALL_DILR_TOPICS
      : ALL_DILR_TOPICS.filter((t) => t.domain === selectedDomain);

  const activeTopics = isQuant ? filteredQuantTopics : isDILR ? filteredDILRTopics : [];
  const activeDomains = isQuant ? quantDomains : isDILR ? dilrDomains : [];

  return (
    <AppShell>
      <div className="space-y-8 animate-in fade-in duration-200">
        {/* Header Breadcrumb & Banner */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Link
                href="/learn"
                className="text-xs text-slate-400 hover:text-white transition-colors"
              >
                Learn Center
              </Link>
              <span className="text-xs text-slate-600">/</span>
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                {isQuant
                  ? "Quantitative Aptitude (CAT 2026)"
                  : isDILR
                  ? "Data Interpretation & Logical Reasoning (CAT 2026)"
                  : resolvedParams.sectionSlug.toUpperCase()}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {isQuant
                ? "Quantitative Aptitude Mastery"
                : isDILR
                ? "Data Interpretation & Logical Reasoning Mastery"
                : `${resolvedParams.sectionSlug.toUpperCase()} Topics`}
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl">
              {isQuant
                ? "All 21 canonical Quantitative Aptitude topics for CAT. Each topic includes comprehensive conceptual theory, formula vaults, 20 curated practice questions with shortcuts, and a 20-question timed chapter test."
                : isDILR
                ? "All 10 canonical DI and LR topics for CAT & MBA entrance exams. Each topic includes comprehensive conceptual frameworks, deduction techniques, 20 curated practice questions with speed shortcuts, and a 20-question timed chapter test."
                : "Master critical concepts, formula sheets, speed drills, and official exam pattern tests."}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/exams/cat">
              <Button variant="outline" size="sm" className="gap-2">
                <Target className="h-4 w-4 text-indigo-400" />
                <span>CAT Syllabus Blueprint</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Domain Filter Tabs */}
        {(isQuant || isDILR) && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mr-2">
              <Filter className="h-3.5 w-3.5" />
              <span>Domain:</span>
            </div>
            {activeDomains.map((dom) => {
              const count = isQuant
                ? dom === "ALL"
                  ? ALL_QUANT_TOPICS.length
                  : ALL_QUANT_TOPICS.filter((t) => t.domain === dom).length
                : dom === "ALL"
                ? ALL_DILR_TOPICS.length
                : ALL_DILR_TOPICS.filter((t) => t.domain === dom).length;

              return (
                <button
                  key={dom}
                  onClick={() => setSelectedDomain(dom)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                    selectedDomain === dom
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                      : "bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
                  }`}
                >
                  {dom} ({count})
                </button>
              );
            })}
          </div>
        )}

        {/* Topics Grid */}
        {isQuant || isDILR ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {activeTopics.map((topic) => (
              <Card
                key={topic.slug}
                className="bg-[#0b0f19] border-slate-800/80 hover:border-indigo-500/50 transition-all flex flex-col group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-colors pointer-events-none" />

                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <Badge variant="outline" className="text-[10px] text-slate-400 border-slate-800">
                      {topic.domain}
                    </Badge>
                    <span className="text-[11px] text-indigo-400 font-mono font-medium">
                      {topic.explanation.catWeightage}
                    </span>
                  </div>

                  <CardTitle className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {topic.name}
                  </CardTitle>

                  <CardDescription className="text-xs text-slate-400 line-clamp-2 mt-1">
                    {topic.explanation.overview}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 flex-1 flex flex-col justify-between pt-0">
                  {/* Topic Features Pill Bar */}
                  <div className="grid grid-cols-3 gap-1.5 py-2 px-2.5 rounded-lg bg-slate-900/60 border border-slate-800/60 text-center">
                    <div>
                      <span className="block text-[10px] text-slate-500 font-medium">Theory</span>
                      <span className="text-xs font-semibold text-emerald-400">Detailed</span>
                    </div>
                    <div className="border-x border-slate-800">
                      <span className="block text-[10px] text-slate-500 font-medium">Practice</span>
                      <span className="text-xs font-semibold text-indigo-400">
                        {topic.practiceQuestions?.length || 20} Qs
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-500 font-medium">Test</span>
                      <span className="text-xs font-semibold text-purple-400">
                        {topic.testQuestions?.length || 20} Qs
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-800/60">
                    <Link
                      href={`/learn/${resolvedParams.sectionSlug}/${topic.slug}`}
                      className="flex-1"
                    >
                      <Button
                        size="sm"
                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs gap-1.5 h-8"
                      >
                        <BookOpen className="h-3.5 w-3.5" />
                        <span>Learn & Practice</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-[#0b0f19] border border-slate-800 text-center text-slate-400">
            Select a learning track from the Learn Center navigation.
          </div>
        )}
      </div>
    </AppShell>
  );
}
