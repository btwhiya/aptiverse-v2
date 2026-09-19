"use client";

import React, { useState, useEffect, useId } from "react";
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
} from "recharts";
import {
  resolveQuestionGraph,
  GraphPayload,
  PieSector,
  BarDataPoint,
  LineDataPoint,
} from "@/lib/graph-resolver";
import {
  PieChart as PieIcon,
  BarChart2,
  TrendingUp,
  Table as TableIcon,
  Maximize2,
  Minimize2,
  Eye,
  Layers,
  Sparkles,
  Info,
  CheckCircle2,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface QuestionGraphViewerProps {
  question: {
    id?: string;
    topicSlug?: string;
    subtopicSlug?: string;
    questionText?: string;
    passageText?: string;
    graphData?: any;
    imageUrl?: string;
    [key: string]: any;
  };
  className?: string;
  defaultExpanded?: boolean;
}

export function QuestionGraphViewer({
  question,
  className = "",
  defaultExpanded = false,
}: QuestionGraphViewerProps) {
  const [mounted, setMounted] = useState(false);
  const [viewMode, setViewMode] = useState<"CHART" | "EXAM_FIGURE" | "TABLE">("CHART");
  const [isFullscreen, setIsFullscreen] = useState(defaultExpanded);
  const [activeTooltipItem, setActiveTooltipItem] = useState<string | null>(null);
  const uniqueId = useId().replace(/:/g, "");

  useEffect(() => {
    setMounted(true);
  }, []);

  const graph: GraphPayload | null = resolveQuestionGraph(question);

  if (!graph) {
    return null;
  }

  // Fallback while mounting for Next.js SSR to avoid Recharts hydration issues
  if (!mounted) {
    return (
      <div className={`p-6 rounded-2xl bg-[#090d16] border border-slate-800/80 animate-pulse ${className}`}>
        <div className="h-6 w-48 bg-slate-800 rounded-md mb-4" />
        <div className="h-56 w-full bg-slate-900/60 rounded-xl" />
      </div>
    );
  }

  const getGraphIcon = () => {
    switch (graph.type) {
      case "pie":
        return <PieIcon className="h-4 w-4 text-cyan-400" />;
      case "bar":
        return <BarChart2 className="h-4 w-4 text-indigo-400" />;
      case "line":
        return <TrendingUp className="h-4 w-4 text-emerald-400" />;
      case "mixed":
        return <Layers className="h-4 w-4 text-purple-400" />;
      case "table":
        return <TableIcon className="h-4 w-4 text-amber-400" />;
      default:
        return <Sparkles className="h-4 w-4 text-indigo-400" />;
    }
  };

  return (
    <div
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        isFullscreen
          ? "fixed inset-4 z-50 bg-[#070b14]/95 backdrop-blur-xl border-indigo-500/50 shadow-2xl flex flex-col p-6 overflow-y-auto"
          : `bg-[#080d1a] border-slate-800/90 shadow-xl shadow-black/40 ${className}`
      }`}
    >
      {/* Figure Header Bar */}
      <div className="px-4 py-3 bg-gradient-to-r from-slate-900/90 via-[#0d1424] to-slate-900/90 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-lg bg-slate-800/90 border border-slate-700/60 flex items-center justify-center shrink-0">
            {getGraphIcon()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold tracking-wider text-cyan-400 uppercase bg-cyan-950/60 px-2 py-0.5 rounded-md border border-cyan-800/40">
                {graph.figureNumber || "FIGURE 1.0"}
              </span>
              <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight">
                {graph.title}
              </h4>
            </div>
            {graph.subtitle && (
              <p className="text-[11px] text-slate-400 mt-0.5 hidden sm:block">
                {graph.subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Action Controls & View Mode Toggles */}
        <div className="flex items-center gap-1.5 ml-auto">
          <div className="flex items-center bg-slate-950/80 p-0.5 rounded-lg border border-slate-800">
            <button
              onClick={() => setViewMode("CHART")}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                viewMode === "CHART"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Interactive
            </button>
            <button
              onClick={() => setViewMode("EXAM_FIGURE")}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                viewMode === "EXAM_FIGURE"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Figure Image
            </button>
            {(graph.tableData || graph.type === "table" || graph.pieData || graph.barData) && (
              <button
                onClick={() => setViewMode("TABLE")}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                  viewMode === "TABLE"
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Data Table
              </button>
            )}
          </div>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? "Exit Fullscreen" : "Expand Graph"}
            className="h-7 w-7 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            {isFullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Visual Display Area */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-center">
        {/* VIEW 1: INTERACTIVE CHART */}
        {viewMode === "CHART" && (
          <div className="space-y-4">
            {/* Direct Image URL */}
            {graph.type === "image" && graph.imageUrl && (
              <div className="flex flex-col items-center justify-center rounded-xl bg-slate-950 p-3 border border-slate-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={graph.imageUrl}
                  alt={graph.title}
                  className="max-h-80 object-contain rounded-lg shadow-lg"
                />
              </div>
            )}

            {/* Pie Chart Renderer */}
            {graph.type === "pie" && graph.pieData && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-7 h-64 sm:h-72 w-full flex items-center justify-center relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#0b0f19",
                          borderColor: "#334155",
                          borderRadius: "12px",
                          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)",
                          fontSize: "12px",
                          color: "#f8fafc",
                        }}
                        formatter={(value: any, name: any, item: any) => [
                          `${value} Lakhs (${item.payload.percentage}% / ${item.payload.angle}°)`,
                          name,
                        ]}
                      />
                      <Pie
                        data={graph.pieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={95}
                        paddingAngle={3}
                        stroke="#080d1a"
                        strokeWidth={2}
                      >
                        {graph.pieData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.color || "#6366f1"}
                            stroke={entry.highlight ? "#ffffff" : "#080d1a"}
                            strokeWidth={entry.highlight ? 2 : 1}
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  {/* Center donut callout */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400">Total Angle</span>
                    <span className="text-base font-extrabold text-white font-mono">360°</span>
                  </div>
                </div>

                {/* Legend & Sector Metrics */}
                <div className="md:col-span-5 space-y-2">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Sectoral Breakdown ({graph.unit || "Value"})
                  </div>
                  <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
                    {graph.pieData.map((sec, idx) => (
                      <div
                        key={idx}
                        className={`p-2 rounded-xl border flex items-center justify-between text-xs transition-colors ${
                          sec.highlight
                            ? "bg-indigo-950/40 border-indigo-500/50 ring-1 ring-indigo-500/30"
                            : "bg-slate-900/60 border-slate-800/80"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="h-3 w-3 rounded-md shrink-0"
                            style={{ backgroundColor: sec.color }}
                          />
                          <span className="text-slate-200 font-medium truncate max-w-[140px] sm:max-w-[180px]">
                            {sec.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 font-mono text-[11px]">
                          <span className="text-amber-400 font-bold">{sec.angle}°</span>
                          <span className="text-white font-semibold">{sec.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Bar Chart Renderer */}
            {graph.type === "bar" && graph.barData && (
              <div className="h-64 sm:h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={graph.barData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="label" stroke="#64748b" fontSize={11} tickLine={false} />
                    <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0b0f19",
                        borderColor: "#334155",
                        borderRadius: "12px",
                        fontSize: "12px",
                        color: "#f8fafc",
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "6px" }} />
                    {graph.barSeries ? (
                      graph.barSeries.map((s) => (
                        <Bar key={s.key} dataKey={s.key} name={s.name} fill={s.color} radius={[6, 6, 0, 0]} />
                      ))
                    ) : (
                      <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} />
                    )}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Line Chart Renderer */}
            {graph.type === "line" && graph.lineData && (
              <div className="h-64 sm:h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={graph.lineData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="label" stroke="#64748b" fontSize={11} tickLine={false} />
                    <YAxis stroke="#64748b" fontSize={11} tickLine={false} unit={graph.unit ? ` ${graph.unit}` : ""} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0b0f19",
                        borderColor: "#334155",
                        borderRadius: "12px",
                        fontSize: "12px",
                        color: "#f8fafc",
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "6px" }} />
                    {graph.lineSeries &&
                      graph.lineSeries.map((s) => (
                        <Line
                          key={s.key}
                          type="monotone"
                          dataKey={s.key}
                          name={s.name}
                          stroke={s.color}
                          strokeWidth={2.5}
                          dot={{ r: 4, fill: s.color }}
                          activeDot={{ r: 6 }}
                        />
                      ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Mixed Graphs Renderer (Dual: Pie Sales + Bar Margin) */}
            {graph.type === "mixed" && graph.mixedData && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* Sales Pie */}
                <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-2">
                  <p className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider text-center">
                    Graph A: Sales Share (% of ₹{graph.mixedData.totalSalesCr} Cr)
                  </p>
                  <div className="h-52 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#0b0f19",
                            borderColor: "#334155",
                            borderRadius: "10px",
                            fontSize: "11px",
                            color: "#fff",
                          }}
                        />
                        <Pie
                          data={graph.mixedData.pie}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={70}
                          paddingAngle={2}
                        >
                          {graph.mixedData.pie?.map((entry, idx) => (
                            <Cell key={idx} fill={entry.color || "#6366f1"} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Margin Bar */}
                <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-2">
                  <p className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider text-center">
                    Graph B: Operating Profit Margin (%)
                  </p>
                  <div className="h-52 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={graph.mixedData.bars} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="label" stroke="#64748b" fontSize={10} />
                        <YAxis stroke="#64748b" fontSize={10} unit="%" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#0b0f19",
                            borderColor: "#334155",
                            borderRadius: "10px",
                            fontSize: "11px",
                            color: "#fff",
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

            {/* Venn Diagram Visualizer */}
            {graph.type === "venn" && graph.vennData && (
              <div className="flex flex-col items-center justify-center py-2 space-y-4">
                {graph.vennData.setsCount === 2 && (
                  <div className="w-full max-w-md relative flex items-center justify-center p-4 bg-slate-950/60 rounded-2xl border border-slate-800">
                    <svg viewBox="0 0 400 220" className="w-full h-auto max-h-56">
                      <defs>
                        <radialGradient id={`vennA-${uniqueId}`} cx="40%" cy="50%" r="60%">
                          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.1" />
                        </radialGradient>
                        <radialGradient id={`vennB-${uniqueId}`} cx="60%" cy="50%" r="60%">
                          <stop offset="0%" stopColor="#ec4899" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#ec4899" stopOpacity="0.1" />
                        </radialGradient>
                      </defs>

                      {/* Circle A */}
                      <circle cx="150" cy="110" r="85" fill={`url(#vennA-${uniqueId})`} stroke="#818cf8" strokeWidth="2.5" />
                      {/* Circle B */}
                      <circle cx="250" cy="110" r="85" fill={`url(#vennB-${uniqueId})`} stroke="#f472b6" strokeWidth="2.5" />

                      {/* Region Labels */}
                      <text x="100" y="105" textAnchor="middle" fill="#c7d2fe" fontSize="13" fontWeight="bold">
                        {graph.vennData.sets[0]?.label.split(" ")[0]}
                      </text>
                      <text x="100" y="125" textAnchor="middle" fill="#818cf8" fontSize="15" fontWeight="bold">
                        {graph.vennData.sets[0]?.count - (graph.vennData.intersection2?.count || 0)}
                      </text>

                      {/* Intersection Both */}
                      <text x="200" y="100" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="600">
                        Both (A ∩ B)
                      </text>
                      <text x="200" y="125" textAnchor="middle" fill="#38bdf8" fontSize="18" fontWeight="extrabold">
                        {graph.vennData.intersection2?.count}
                      </text>

                      {/* Set B Only */}
                      <text x="300" y="105" textAnchor="middle" fill="#fbcfe8" fontSize="13" fontWeight="bold">
                        {graph.vennData.sets[1]?.label.split(" ")[0]}
                      </text>
                      <text x="300" y="125" textAnchor="middle" fill="#f472b6" fontSize="15" fontWeight="bold">
                        {graph.vennData.sets[1]?.count - (graph.vennData.intersection2?.count || 0)}
                      </text>

                      {/* Total Universal Frame */}
                      <rect x="10" y="10" width="380" height="200" fill="none" stroke="#334155" strokeWidth="1" rx="12" strokeDasharray="4 4" />
                      <text x="30" y="32" fill="#94a3b8" fontSize="11" fontWeight="bold">
                        Universe n(U) = {graph.vennData.universeTotal}
                      </text>
                    </svg>
                  </div>
                )}

                {graph.vennData.setsCount === 3 && graph.vennData.regions3 && (
                  <div className="w-full max-w-lg relative flex flex-col items-center justify-center p-4 bg-slate-950/60 rounded-2xl border border-slate-800">
                    <svg viewBox="0 0 440 320" className="w-full h-auto max-h-72">
                      <defs>
                        <radialGradient id={`v3A-${uniqueId}`}>
                          <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
                        </radialGradient>
                        <radialGradient id={`v3B-${uniqueId}`}>
                          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.1" />
                        </radialGradient>
                        <radialGradient id={`v3C-${uniqueId}`}>
                          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.1" />
                        </radialGradient>
                      </defs>

                      {/* 3 Intersecting Circles */}
                      <circle cx="160" cy="130" r="90" fill={`url(#v3A-${uniqueId})`} stroke="#34d399" strokeWidth="2" />
                      <circle cx="280" cy="130" r="90" fill={`url(#v3B-${uniqueId})`} stroke="#818cf8" strokeWidth="2" />
                      <circle cx="220" cy="210" r="90" fill={`url(#v3C-${uniqueId})`} stroke="#fbbf24" strokeWidth="2" />

                      {/* Center Triple Intersection */}
                      <circle cx="220" cy="155" r="18" fill="#38bdf8" fillOpacity="0.3" stroke="#38bdf8" strokeWidth="1.5" />
                      <text x="220" y="160" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">
                        {graph.vennData.regions3.allThree}
                      </text>

                      {/* Region counts */}
                      <text x="120" y="115" textAnchor="middle" fill="#6ee7b7" fontSize="13" fontWeight="bold">
                        {graph.vennData.regions3.onlyA}
                      </text>
                      <text x="320" y="115" textAnchor="middle" fill="#c7d2fe" fontSize="13" fontWeight="bold">
                        {graph.vennData.regions3.onlyB}
                      </text>
                      <text x="220" y="265" textAnchor="middle" fill="#fde68a" fontSize="13" fontWeight="bold">
                        {graph.vennData.regions3.onlyC}
                      </text>

                      {/* Set Headers */}
                      <text x="100" y="55" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">
                        ChatGPT (120)
                      </text>
                      <text x="340" y="55" textAnchor="middle" fill="#818cf8" fontSize="12" fontWeight="bold">
                        Claude (100)
                      </text>
                      <text x="220" y="305" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">
                        Gemini (80)
                      </text>

                      {/* Outer boundary */}
                      <rect x="10" y="10" width="420" height="300" fill="none" stroke="#334155" strokeWidth="1" rx="12" strokeDasharray="3 3" />
                      <text x="24" y="30" fill="#94a3b8" fontSize="11" fontWeight="bold">
                        Universe n(U) = {graph.vennData.universeTotal} • None = {graph.vennData.regions3.none}
                      </text>
                    </svg>
                  </div>
                )}
              </div>
            )}

            {/* Tournament Bracket Renderer */}
            {graph.type === "tournament" && graph.tournamentData && (
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4 overflow-x-auto">
                <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
                  <span>Single-Elimination Knockout Tree</span>
                  <span className="text-amber-400 font-mono">Seeds 1–16</span>
                </div>
                <div className="grid grid-cols-4 gap-3 min-w-[560px]">
                  {graph.tournamentData.rounds.map((round, rIdx) => (
                    <div key={rIdx} className="space-y-2.5">
                      <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider text-center py-1 bg-slate-900 rounded-md border border-slate-800">
                        {round.title.split("(")[0]}
                      </div>
                      <div className="space-y-2">
                        {round.matches.map((m) => (
                          <div
                            key={m.id}
                            className={`p-2 rounded-lg border text-[11px] font-mono space-y-1 ${
                              m.upset
                                ? "bg-rose-950/40 border-rose-500/40 ring-1 ring-rose-500/20"
                                : "bg-slate-900/70 border-slate-800"
                            }`}
                          >
                            <div className="flex items-center justify-between text-slate-300">
                              <span>{m.p1}</span>
                              {m.winner === m.p1 && <span className="text-emerald-400 font-bold">✓</span>}
                            </div>
                            <div className="flex items-center justify-between text-slate-400 border-t border-slate-800/60 pt-1">
                              <span>{m.p2}</span>
                              {m.winner === m.p2 && <span className="text-emerald-400 font-bold">✓</span>}
                            </div>
                            {m.upset && (
                              <div className="text-[9px] text-rose-300 font-bold uppercase tracking-wider">
                                Upset Victory!
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Arrangement Layout Visualizer */}
            {graph.type === "arrangement" && graph.arrangementData && (
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Linear Row Facing North (Left to Right)</span>
                  <span className="text-indigo-400 font-mono">6 Executive Desks</span>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {graph.arrangementData.seats.map((seat) => (
                    <div
                      key={seat.seatIndex}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                        seat.highlight
                          ? "bg-indigo-950/60 border-indigo-500 ring-2 ring-indigo-500/40 text-white"
                          : "bg-slate-900/80 border-slate-800 text-slate-300"
                      }`}
                    >
                      <span className="text-[10px] text-slate-500 font-mono">Seat {seat.seatIndex}</span>
                      <div className="h-8 w-8 rounded-full bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center text-sm font-bold text-white">
                        {seat.occupant || "?"}
                      </div>
                      <span className="text-[10px] text-emerald-400">▲ North</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Timeline Schedule Visualizer */}
            {graph.type === "timeline" && graph.timelineData && (
              <div className="grid grid-cols-5 gap-2">
                {graph.timelineData.slots.map((slot, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col items-center text-center gap-1"
                  >
                    <span className="text-[10px] uppercase font-mono text-cyan-400 font-bold">{slot.day}</span>
                    <span className="text-xs font-bold text-white">{slot.event}</span>
                    <span className="text-[10px] text-slate-500">{slot.status}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: OFFICIAL EXAM FIGURE IMAGE VIEW */}
        {viewMode === "EXAM_FIGURE" && (
          <div className="p-5 rounded-xl bg-[#070a12] border-2 border-dashed border-slate-700/80 space-y-4 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300 text-xs font-mono">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>OFFICIAL BENCHMARK FIGURE • SIMULATED CAT QUESTION SHEET</span>
            </div>

            {/* Simulated Scanned / High-Res Chart Frame */}
            <div className="p-4 sm:p-6 rounded-xl bg-[#0c101c] border border-slate-700/90 shadow-2xl relative">
              <div className="absolute top-3 left-3 text-[10px] font-mono text-slate-500 uppercase">
                {graph.figureNumber || "FIG. 1"}
              </div>
              <div className="absolute top-3 right-3 text-[10px] font-mono text-indigo-400 font-bold">
                AptiVerse CAT 2026
              </div>

              <div className="pt-4 pb-2">
                <h3 className="text-sm sm:text-base font-extrabold text-white">
                  {graph.title}
                </h3>
                {graph.subtitle && (
                  <p className="text-xs text-slate-400 mt-0.5">{graph.subtitle}</p>
                )}
              </div>

              {/* Graphical Content in High-Contrast Exam Rendering */}
              {graph.type === "pie" && graph.pieData && (
                <div className="h-60 w-full flex items-center justify-center my-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={graph.pieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        label={(entry: any) =>
                          `${(entry.name || "").split(" ")[0]}: ${entry.payload?.angle ?? ""}° (${entry.payload?.percentage ?? ""}%)`
                        }
                        stroke="#ffffff"
                        strokeWidth={1.5}
                      >
                        {graph.pieData.map((e, idx) => (
                          <Cell key={idx} fill={e.color || "#4f46e5"} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}

              {graph.type === "line" && graph.lineData && (
                <div className="h-56 w-full my-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={graph.lineData} margin={{ top: 10, right: 15, left: -10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="label" stroke="#94a3b8" fontSize={11} />
                      <YAxis stroke="#94a3b8" fontSize={11} />
                      <Legend wrapperStyle={{ fontSize: "11px" }} />
                      {graph.lineSeries?.map((s) => (
                        <Line key={s.key} type="monotone" dataKey={s.key} name={s.name} stroke={s.color} strokeWidth={3} />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}

              {graph.type === "bar" && graph.barData && (
                <div className="h-56 w-full my-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={graph.barData} margin={{ top: 10, right: 15, left: -10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="label" stroke="#94a3b8" fontSize={11} />
                      <YAxis stroke="#94a3b8" fontSize={11} />
                      <Legend wrapperStyle={{ fontSize: "11px" }} />
                      {graph.barSeries?.map((s) => (
                        <Bar key={s.key} dataKey={s.key} name={s.name} fill={s.color} />
                      ))}
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Watermark and Note Footer */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <span>Ref: Standard DI/LR Set</span>
                <span>{graph.sourceNotice || "SimCAT Examination Standards"}</span>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: STRUCTURED DATA TABLE VIEW */}
        {viewMode === "TABLE" && (
          <div className="rounded-xl border border-slate-800 overflow-x-auto bg-slate-950/60">
            {graph.tableData ? (
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-900/90 border-b border-slate-800 text-slate-300 font-mono text-[11px]">
                    {graph.tableData.headers.map((h, hIdx) => (
                      <th key={hIdx} className="p-3 font-semibold whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-200">
                  {graph.tableData.rows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-900/40 transition-colors">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="p-3 whitespace-nowrap font-medium">
                          {typeof cell === "string" && cell.includes("[ ? ]") ? (
                            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono font-bold">
                              {cell}
                            </span>
                          ) : (
                            cell
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {graph.tableData.footers && (
                    <tr className="bg-indigo-950/40 font-bold border-t border-indigo-800/40 text-indigo-200 font-mono">
                      {graph.tableData.footers.map((f, fIdx) => (
                        <td key={fIdx} className="p-3 whitespace-nowrap">
                          {f}
                        </td>
                      ))}
                    </tr>
                  )}
                </tbody>
              </table>
            ) : graph.pieData ? (
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                    <th className="p-3">Sector / Department</th>
                    <th className="p-3">Central Angle (°)</th>
                    <th className="p-3">Share Percentage (%)</th>
                    <th className="p-3">Allocated Amount ({graph.unit || "Units"})</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200 font-mono">
                  {graph.pieData.map((sec, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/30">
                      <td className="p-3 font-sans font-medium text-white">{sec.name}</td>
                      <td className="p-3 text-amber-400 font-bold">{sec.angle}°</td>
                      <td className="p-3 text-cyan-400">{sec.percentage}%</td>
                      <td className="p-3 text-emerald-400 font-semibold">{sec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : null}

            {graph.tableData?.notes && (
              <div className="p-2.5 bg-slate-900/50 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-1.5">
                <Info className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
                <span>{graph.tableData.notes}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Audit Line */}
      <div className="px-4 py-2 bg-slate-950/80 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-500 font-mono">
        <span className="flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3 text-emerald-500" />
          <span>Verified CAT Format Graph Asset</span>
        </span>
        <span className="text-slate-400 truncate max-w-[200px] sm:max-w-none">
          {graph.sourceNotice || "CAT DILR Benchmark"}
        </span>
      </div>
    </div>
  );
}
