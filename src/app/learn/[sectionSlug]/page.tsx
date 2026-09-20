"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
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

  if (slug === "varc" || slug === "verbal" || slug === "rc" || slug === "va" || slug === "reading-comprehension") {
    redirect("/learn/varc");
  }

  const isQuant = slug === "quant" || slug === "qa" || slug === "quantitative-aptitude";
  const isDILR = slug === "dilr" || slug === "di" || slug === "lr" || slug === "data-interpretation-logical-reasoning";
  const isSpecial = slug === "special" || slug === "specialist" || slug === "exam-specific";

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

  const specialDomains = [
    "ALL",
    "CMAT (Innovation)",
    "MAT (Economic Env)",
    "MAH CET (Abstract Reasoning)",
  ];

  const SPECIAL_TOPICS = [
    {
      slug: "cmat-innovation",
      name: "CMAT Innovation & Entrepreneurship",
      domain: "CMAT (Innovation)",
      examBadge: "CMAT 2026",
      badgeColor: "text-purple-400 border-purple-500/30 bg-purple-500/10",
      catWeightage: "20 Qs (20% of CMAT)",
      overview: "Lean Startup methodology, Business Model Canvas, venture capital rounds, seed/angel funding, term sheets, patents, and government MSME policies.",
      theory: "Detailed",
      practiceCount: 20,
      testCount: 20,
      practiceLink: "/practice/custom?track=special&topic=cmat-innovation",
      examLink: "/exams/cmat",
    },
    {
      slug: "mat-economy",
      name: "MAT Economic & Business Environment",
      domain: "MAT (Economic Env)",
      examBadge: "MAT 2026",
      badgeColor: "text-blue-400 border-blue-500/30 bg-blue-500/10",
      catWeightage: "40 Qs (20% of MAT)",
      overview: "Macroeconomic indicators, fiscal & monetary policy, RBI repo/reverse-repo tools, corporate mergers & acquisitions, and global trade balance.",
      theory: "Detailed",
      practiceCount: 20,
      testCount: 20,
      practiceLink: "/practice/custom?track=special&topic=mat-economy",
      examLink: "/exams/mat",
    },
    {
      slug: "mah-cet-abstract",
      name: "MAH MBA CET Abstract Reasoning",
      domain: "MAH CET (Abstract Reasoning)",
      examBadge: "MAH CET 2026",
      badgeColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
      catWeightage: "25 Qs (~13% of CET)",
      overview: "Visual pattern matrices, clockwise/anti-clockwise element rotations, geometric shape analogies, and mirror/water inversion transformation grids.",
      theory: "Detailed",
      practiceCount: 20,
      testCount: 20,
      practiceLink: "/practice/custom?track=special&topic=mah-cet-abstract",
      examLink: "/exams/mah-cet",
    },
  ];

  const filteredQuantTopics =
    selectedDomain === "ALL"
      ? ALL_QUANT_TOPICS
      : ALL_QUANT_TOPICS.filter((t) => t.domain === selectedDomain);

  const filteredDILRTopics =
    selectedDomain === "ALL"
      ? ALL_DILR_TOPICS
      : ALL_DILR_TOPICS.filter((t) => t.domain === selectedDomain);

  const filteredSpecialTopics =
    selectedDomain === "ALL"
      ? SPECIAL_TOPICS
      : SPECIAL_TOPICS.filter((t) => t.domain === selectedDomain);

  const activeDomains = isQuant ? quantDomains : isDILR ? dilrDomains : isSpecial ? specialDomains : [];

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
                  : isSpecial
                  ? "Exam-Specific Specialist Modules"
                  : resolvedParams.sectionSlug.toUpperCase()}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {isQuant
                ? "Quantitative Aptitude Mastery"
                : isDILR
                ? "Data Interpretation & Logical Reasoning Mastery"
                : isSpecial
                ? "Exam-Specific Specialist Modules"
                : `${resolvedParams.sectionSlug.toUpperCase()} Topics`}
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl">
              {isQuant
                ? "All 21 canonical Quantitative Aptitude topics for CAT. Each topic includes comprehensive conceptual theory, formula vaults, 20 curated practice questions with shortcuts, and a 20-question timed chapter test."
                : isDILR
                ? "All 10 canonical DI and LR topics for CAT & MBA entrance exams. Each topic includes comprehensive conceptual frameworks, deduction techniques, 20 curated practice questions with speed shortcuts, and a 20-question timed chapter test."
                : isSpecial
                ? "Specialized, high-weightage sections unique to management entrance exams: CMAT Innovation & Entrepreneurship, MAT Economic Environment, and MAH CET Abstract Reasoning."
                : "Master critical concepts, formula sheets, speed drills, and official exam pattern tests."}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href={isSpecial ? "/exams/xat" : "/exams/cat"}>
              <Button variant="outline" size="sm" className="gap-2">
                <Target className="h-4 w-4 text-indigo-400" />
                <span>{isSpecial ? "XAT Preparation Hub" : "CAT Syllabus Blueprint"}</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* XAT Exclusive Section Notice on Specialist Page */}
        {isSpecial && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-slate-900/60 border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white">Looking for XAT Decision Making (DM) or General Knowledge (GK)?</h3>
                  <Badge variant="outline" className="text-[10px] border-amber-500/40 text-amber-300 bg-amber-500/10">
                    XAT EXCLUSIVE
                  </Badge>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  In accordance with official exam architecture, <strong>Decision Making</strong> and <strong>General Knowledge</strong> are housed exclusively in the dedicated <strong>XAT Section</strong>.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link href="/exams/xat/dm">
                <Button size="sm" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs gap-1.5 shadow-md shadow-amber-500/20">
                  <span>Open XAT DM Studio</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
              <Link href="/exams/xat">
                <Button variant="outline" size="sm" className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10 text-xs">
                  <span>XAT Hub</span>
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Domain Filter Tabs */}
        {(isQuant || isDILR || isSpecial) && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mr-2">
              <Filter className="h-3.5 w-3.5" />
              <span>Filter:</span>
            </div>
            {activeDomains.map((dom) => {
              const count = isQuant
                ? dom === "ALL"
                  ? ALL_QUANT_TOPICS.length
                  : ALL_QUANT_TOPICS.filter((t) => t.domain === dom).length
                : isDILR
                ? dom === "ALL"
                  ? ALL_DILR_TOPICS.length
                  : ALL_DILR_TOPICS.filter((t) => t.domain === dom).length
                : dom === "ALL"
                ? SPECIAL_TOPICS.length
                : SPECIAL_TOPICS.filter((t) => t.domain === dom).length;

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
        {isSpecial ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredSpecialTopics.map((topic) => (
              <Card
                key={topic.slug}
                className="bg-[#0b0f19] border-slate-800/80 hover:border-purple-500/50 transition-all flex flex-col group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-28 h-28 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-colors pointer-events-none" />

                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <Badge variant="outline" className={`text-[10px] font-mono font-semibold border ${topic.badgeColor}`}>
                      {topic.examBadge}
                    </Badge>
                    <span className="text-[11px] text-purple-400 font-mono font-medium">
                      {topic.catWeightage}
                    </span>
                  </div>

                  <CardTitle className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                    {topic.name}
                  </CardTitle>

                  <CardDescription className="text-xs text-slate-400 leading-relaxed mt-1">
                    {topic.overview}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 flex-1 flex flex-col justify-between pt-0">
                  <div className="grid grid-cols-3 gap-1.5 py-2 px-2.5 rounded-lg bg-slate-900/60 border border-slate-800/60 text-center">
                    <div>
                      <span className="block text-[10px] text-slate-500 font-medium">Curriculum</span>
                      <span className="text-xs font-semibold text-emerald-400">{topic.theory}</span>
                    </div>
                    <div className="border-x border-slate-800">
                      <span className="block text-[10px] text-slate-500 font-medium">Practice</span>
                      <span className="text-xs font-semibold text-indigo-400">
                        {topic.practiceCount} Qs
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-500 font-medium">Speed Drill</span>
                      <span className="text-xs font-semibold text-purple-400">
                        {topic.testCount} Qs
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-800/60">
                    <Link href={topic.practiceLink} className="flex-1">
                      <Button
                        size="sm"
                        className="w-full bg-purple-600 hover:bg-purple-500 text-white text-xs gap-1.5 h-8 shadow-xs"
                      >
                        <BookOpen className="h-3.5 w-3.5" />
                        <span>Launch Drill</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                    <Link href={topic.examLink}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs border-slate-700 hover:bg-slate-800 text-slate-300 gap-1"
                      >
                        <Target className="h-3.5 w-3.5 text-purple-400" />
                        <span>Syllabus</span>
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : isQuant || isDILR ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {(isQuant ? filteredQuantTopics : filteredDILRTopics).map((topic) => (
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
