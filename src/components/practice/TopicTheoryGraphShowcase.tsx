"use client";

import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import {
  PieChart as PieIcon,
  BarChart2,
  TrendingUp,
  Table as TableIcon,
  Sparkles,
  Layers,
  CheckCircle2,
  Zap,
  Info,
  ChevronRight,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TopicTheoryGraphShowcaseProps {
  topicSlug: string;
}

export function TopicTheoryGraphShowcase({ topicSlug }: TopicTheoryGraphShowcaseProps) {
  const [mounted, setMounted] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<string>("pie");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="p-6 rounded-2xl bg-[#090d16] border border-slate-800 animate-pulse h-72" />
    );
  }

  const slug = topicSlug.toLowerCase();

  // Show only for relevant DI/LR topics
  const isGraphTopic =
    slug === "graphs-charts" ||
    slug === "mixed-graphs" ||
    slug === "tables-caselets" ||
    slug === "venn-diagrams" ||
    slug === "calculation-basics" ||
    slug === "tournaments" ||
    slug === "arrangements";

  if (!isGraphTopic) {
    return null;
  }

  return (
    <Card className="bg-gradient-to-b from-[#090e1c] via-[#070b16] to-[#070b16] border-indigo-900/50 shadow-2xl overflow-hidden my-6">
      {/* Header */}
      <CardHeader className="pb-3 border-b border-indigo-900/30 bg-indigo-950/20">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center text-indigo-400">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-base font-extrabold text-white tracking-tight">
                  Interactive Concept Visualizer &amp; Benchmark Charts
                </CardTitle>
                <Badge variant="indigo" className="text-[10px]">
                  VISUAL MASTERCLASS
                </Badge>
              </div>
              <p className="text-xs text-slate-400">
                Explore real interactive charts and figures tested in CAT Data Interpretation &amp; Logical Reasoning.
              </p>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-5 space-y-6">
        {/* ========================================== */}
        {/* TOPIC 1: GRAPHS & CHARTS SHOWCASE */}
        {/* ========================================== */}
        {slug === "graphs-charts" && (
          <div className="space-y-4">
            {/* Sub-tabs */}
            <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
              {[
                { id: "pie", label: "Pie Chart (Degrees vs %)", icon: PieIcon },
                { id: "bar", label: "Comparative Multi-Bar", icon: BarChart2 },
                { id: "line", label: "Multi-Line YoY Trend", icon: TrendingUp },
                { id: "radar", label: "Radar / Spider Chart", icon: Layers },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeSubTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSubTab(tab.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                        : "bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB: PIE */}
            {activeSubTab === "pie" && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80">
                <div className="md:col-span-6 h-64 w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#0b0f19",
                          borderColor: "#334155",
                          borderRadius: "10px",
                          fontSize: "12px",
                        }}
                        formatter={(val: any, name: any, p: any) => [
                          `₹${val} Lakhs (${p.payload.pct}% • ${p.payload.angle}°)`,
                          name,
                        ]}
                      />
                      <Pie
                        data={[
                          { name: "R&D", val: 600, angle: 90, pct: 25, color: "#6366f1" },
                          { name: "Salaries", val: 840, angle: 126, pct: 35, color: "#06b6d4" },
                          { name: "Infrastructure", val: 480, angle: 72, pct: 20, color: "#10b981" },
                          { name: "Marketing", val: 240, angle: 36, pct: 10, color: "#f59e0b" },
                          { name: "Contingency", val: 240, angle: 36, pct: 10, color: "#ec4899" },
                        ]}
                        dataKey="val"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={85}
                        paddingAngle={3}
                      >
                        {["#6366f1", "#06b6d4", "#10b981", "#f59e0b", "#ec4899"].map((c, i) => (
                          <Cell key={i} fill={c} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="md:col-span-6 space-y-3">
                  <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-800/40 space-y-1">
                    <p className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                      <Zap className="h-3.5 w-3.5 text-indigo-400" />
                      <span>The 3.6 Conversion Multiplier</span>
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed font-mono">
                      Percentage (%) = Central Angle (°) ÷ 3.6
                      <br />
                      Central Angle (°) = Percentage (%) × 3.6
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                      <span className="text-slate-400">90° =</span> <span className="text-emerald-400 font-bold">25.0%</span> (1/4th)
                    </div>
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                      <span className="text-slate-400">72° =</span> <span className="text-emerald-400 font-bold">20.0%</span> (1/5th)
                    </div>
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                      <span className="text-slate-400">54° =</span> <span className="text-emerald-400 font-bold">15.0%</span> (3/20th)
                    </div>
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                      <span className="text-slate-400">36° =</span> <span className="text-emerald-400 font-bold">10.0%</span> (1/10th)
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: BAR */}
            {activeSubTab === "bar" && (
              <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Production Output: Target vs Actual (in '000 Units)</span>
                  <span className="text-indigo-400 font-mono">Q1 – Q4 Benchmark</span>
                </div>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { quarter: "Q1", Target: 120, Actual: 110 },
                        { quarter: "Q2", Target: 140, Actual: 145 },
                        { quarter: "Q3", Target: 160, Actual: 172 },
                        { quarter: "Q4", Target: 180, Actual: 195 },
                      ]}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis dataKey="quarter" stroke="#64748b" fontSize={11} />
                      <YAxis stroke="#64748b" fontSize={11} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#0b0f19",
                          borderColor: "#334155",
                          borderRadius: "10px",
                          fontSize: "12px",
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: "11px" }} />
                      <Bar dataKey="Target" fill="#475569" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Actual" fill="#6366f1" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* TAB: LINE */}
            {activeSubTab === "line" && (
              <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>5-Year Multi-Country Export Comparison (in '000 MT)</span>
                  <span className="text-emerald-400 font-mono">2021 – 2025</span>
                </div>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { year: "2021", CountryX: 110, CountryY: 130, CountryZ: 95 },
                        { year: "2022", CountryX: 135, CountryY: 142, CountryZ: 108 },
                        { year: "2023", CountryX: 160, CountryY: 155, CountryZ: 125 },
                        { year: "2024", CountryX: 190, CountryY: 170, CountryZ: 140 },
                        { year: "2025", CountryX: 235, CountryY: 185, CountryZ: 160 },
                      ]}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis dataKey="year" stroke="#64748b" fontSize={11} />
                      <YAxis stroke="#64748b" fontSize={11} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#0b0f19",
                          borderColor: "#334155",
                          borderRadius: "10px",
                          fontSize: "12px",
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: "11px" }} />
                      <Line type="monotone" dataKey="CountryX" stroke="#6366f1" strokeWidth={3} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="CountryY" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
                      <Line type="monotone" dataKey="CountryZ" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* TAB: RADAR */}
            {activeSubTab === "radar" && (
              <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Radar Performance Chart across 6 Critical Evaluation Metrics</span>
                  <span className="text-purple-400 font-mono">Max: 100</span>
                </div>
                <div className="h-64 w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart
                      cx="50%"
                      cy="50%"
                      outerRadius="75%"
                      data={[
                        { subject: "Speed", A: 90, fullMark: 100 },
                        { subject: "Accuracy", A: 85, fullMark: 100 },
                        { subject: "Volume", A: 70, fullMark: 100 },
                        { subject: "Yield", A: 95, fullMark: 100 },
                        { subject: "Cost Control", A: 80, fullMark: 100 },
                        { subject: "Compliance", A: 88, fullMark: 100 },
                      ]}
                    >
                      <PolarGrid stroke="#334155" />
                      <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={11} />
                      <PolarRadiusAxis stroke="#64748b" angle={30} domain={[0, 100]} />
                      <Radar name="Dept Alpha" dataKey="A" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.4} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#0b0f19",
                          borderColor: "#334155",
                          borderRadius: "10px",
                          fontSize: "12px",
                        }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================== */}
        {/* TOPIC 2: MIXED GRAPHS SHOWCASE */}
        {/* ========================================== */}
        {slug === "mixed-graphs" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80 items-center">
            <div className="space-y-2">
              <p className="text-xs font-bold text-cyan-400 uppercase tracking-wider text-center">
                Chart A: Total Sales Distribution (₹5,000 Cr)
              </p>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Div A", val: 1000, pct: "20%" },
                        { name: "Div B", val: 1250, pct: "25%" },
                        { name: "Div C", val: 1500, pct: "30%" },
                        { name: "Div D", val: 750, pct: "15%" },
                        { name: "Div E", val: 500, pct: "10%" },
                      ]}
                      dataKey="val"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={75}
                    >
                      {["#06b6d4", "#10b981", "#6366f1", "#f59e0b", "#ec4899"].map((c, i) => (
                        <Cell key={i} fill={c} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0b0f19",
                        borderColor: "#334155",
                        borderRadius: "10px",
                        fontSize: "11px",
                      }}
                      formatter={(v: any, n: any, p: any) => [`₹${v} Cr (${p.payload.pct})`, n]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider text-center">
                Chart B: Operating Profit Margin (%)
              </p>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { div: "Div A", margin: 12 },
                      { div: "Div B", margin: 16 },
                      { div: "Div C", margin: 18 },
                      { div: "Div D", margin: 22 },
                      { div: "Div E", margin: 14 },
                    ]}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="div" stroke="#64748b" fontSize={11} />
                    <YAxis stroke="#64748b" fontSize={11} unit="%" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0b0f19",
                        borderColor: "#334155",
                        borderRadius: "10px",
                        fontSize: "11px",
                      }}
                      formatter={(v: any) => [`${v}%`, "Margin"]}
                    />
                    <Bar dataKey="margin" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TOPIC 3: TABLES & CASELETS SHOWCASE */}
        {/* ========================================== */}
        {slug === "tables-caselets" && (
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-bold text-white">Missing-Data Contingency Matrix Simulation</span>
              <span className="text-emerald-400 font-mono">Weighted Average Benchmark</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 border-b border-slate-800 text-slate-300 font-mono">
                    <th className="p-3">Department</th>
                    <th className="p-3">Headcount</th>
                    <th className="p-3">Share %</th>
                    <th className="p-3">Avg Experience (Yrs)</th>
                    <th className="p-3">Total Cumulative Years</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-slate-200 font-mono">
                  <tr>
                    <td className="p-3 font-sans font-medium text-white">Engineering</td>
                    <td className="p-3 text-cyan-400">120</td>
                    <td className="p-3">40.0%</td>
                    <td className="p-3">5.5</td>
                    <td className="p-3">660</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-sans font-medium text-white">Product Design</td>
                    <td className="p-3 text-cyan-400">60</td>
                    <td className="p-3">20.0%</td>
                    <td className="p-3">4.0</td>
                    <td className="p-3">240</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-sans font-medium text-white">Marketing &amp; Sales</td>
                    <td className="p-3 text-cyan-400">90</td>
                    <td className="p-3">30.0%</td>
                    <td className="p-3">6.0</td>
                    <td className="p-3">540</td>
                  </tr>
                  <tr className="bg-amber-950/20">
                    <td className="p-3 font-sans font-medium text-amber-200">Operations &amp; HR</td>
                    <td className="p-3 text-amber-300 font-bold">30 [Reconstructed]</td>
                    <td className="p-3 text-amber-300">10.0%</td>
                    <td className="p-3 text-amber-300 font-bold">3.5 [Solved]</td>
                    <td className="p-3 text-amber-300">105</td>
                  </tr>
                  <tr className="bg-indigo-950/50 font-bold border-t border-indigo-700/50 text-indigo-100">
                    <td className="p-3 font-sans">Total Company</td>
                    <td className="p-3">300</td>
                    <td className="p-3">100.0%</td>
                    <td className="p-3 text-emerald-400">5.15 (Weighted Avg)</td>
                    <td className="p-3">1,545</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TOPIC 4: VENN DIAGRAMS SHOWCASE */}
        {/* ========================================== */}
        {slug === "venn-diagrams" && (
          <div className="p-4 bg-slate-950/70 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-bold text-white">3-Set Principle of Inclusion-Exclusion</span>
              <span className="text-cyan-400 font-mono">Region Formula Decomposition</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
              <div className="text-indigo-400 font-bold">
                n(A ∪ B ∪ C) = Σ(Singles) - Σ(Pairwise Overlaps) + n(A ∩ B ∩ C)
              </div>
              <div className="text-emerald-400">
                Sum of Elements = Total(Exactly 1) + 2×Total(Exactly 2) + 3×Total(Exactly 3)
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
