"use client";

import React from "react";

interface DIVennDiagramProps {
  data: Record<string, any>;
}

export const DIVennDiagram: React.FC<DIVennDiagramProps> = ({ data }) => {
  const {
    title = "3-Set Venn Diagram",
    setA = { name: "Set A", total: 0, color: "#6366f1" },
    setB = { name: "Set B", total: 0, color: "#10b981" },
    setC = { name: "Set C", total: 0, color: "#f59e0b" },
    regions = {},
    totalUniverse = 0,
  } = data;

  const {
    onlyA = 0,
    onlyB = 0,
    onlyC = 0,
    onlyAB = 0,
    onlyBC = 0,
    onlyAC = 0,
    allThree = 0,
    none = 0,
  } = regions;

  return (
    <div className="w-full bg-slate-900/80 border border-slate-800 rounded-xl p-4 md:p-6 shadow-xl backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
        <h4 className="text-sm md:text-base font-semibold text-slate-200 tracking-wide">
          {title}
        </h4>
        <div className="text-xs text-slate-400 font-mono">
          Universe (N) = <span className="text-slate-100 font-bold">{totalUniverse}</span>
        </div>
      </div>

      {/* Legend Badges */}
      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-indigo-950/60 text-indigo-300 border border-indigo-500/30">
          <span className="w-2 h-2 rounded-full bg-indigo-500 mr-1.5" />
          {setA.name} ({setA.total})
        </span>
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
          <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5" />
          {setB.name} ({setB.total})
        </span>
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-amber-950/60 text-amber-300 border border-amber-500/30">
          <span className="w-2 h-2 rounded-full bg-amber-500 mr-1.5" />
          {setC.name} ({setC.total})
        </span>
      </div>

      {/* SVG Canvas for 3-Set Venn */}
      <div className="relative w-full max-w-[460px] mx-auto aspect-[4/3] flex items-center justify-center">
        <svg
          viewBox="0 0 500 400"
          className="w-full h-full drop-shadow-md select-none"
        >
          {/* Outer Universe Box */}
          <rect
            x="10"
            y="10"
            width="480"
            height="380"
            rx="16"
            fill="none"
            stroke="#334155"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* None Region (Outside circles) */}
          <text
            x="35"
            y="45"
            fill="#94a3b8"
            fontSize="12"
            fontWeight="bold"
            fontFamily="monospace"
          >
            None = {none}
          </text>

          {/* Circle A (Top Left) */}
          <circle
            cx="190"
            cy="160"
            r="120"
            fill="#6366f1"
            fillOpacity="0.18"
            stroke="#6366f1"
            strokeWidth="2.5"
          />

          {/* Circle B (Top Right) */}
          <circle
            cx="310"
            cy="160"
            r="120"
            fill="#10b981"
            fillOpacity="0.18"
            stroke="#10b981"
            strokeWidth="2.5"
          />

          {/* Circle C (Bottom Center) */}
          <circle
            cx="250"
            cy="245"
            r="120"
            fill="#f59e0b"
            fillOpacity="0.18"
            stroke="#f59e0b"
            strokeWidth="2.5"
          />

          {/* Set Labels */}
          <text x="140" y="80" fill="#a5b4fc" fontSize="13" fontWeight="bold" textAnchor="middle">
            {setA.name}
          </text>
          <text x="360" y="80" fill="#6ee7b7" fontSize="13" fontWeight="bold" textAnchor="middle">
            {setB.name}
          </text>
          <text x="250" y="380" fill="#fcd34d" fontSize="13" fontWeight="bold" textAnchor="middle">
            {setC.name}
          </text>

          {/* Values in Regions */}
          {/* Only A */}
          <text x="140" y="150" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">
            {onlyA}
          </text>

          {/* Only B */}
          <text x="360" y="150" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">
            {onlyB}
          </text>

          {/* Only C */}
          <text x="250" y="320" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">
            {onlyC}
          </text>

          {/* Only AB (Overlap of A and B, above C) */}
          <text x="250" y="125" fill="#f8fafc" fontSize="13" fontWeight="bold" textAnchor="middle">
            {onlyAB}
          </text>

          {/* Only AC (Overlap of A and C, left of center) */}
          <text x="195" y="230" fill="#f8fafc" fontSize="13" fontWeight="bold" textAnchor="middle">
            {onlyAC}
          </text>

          {/* Only BC (Overlap of B and C, right of center) */}
          <text x="305" y="230" fill="#f8fafc" fontSize="13" fontWeight="bold" textAnchor="middle">
            {onlyBC}
          </text>

          {/* All Three (Intersection in center) */}
          <g transform="translate(250, 195)">
            <circle cx="0" cy="0" r="15" fill="#0f172a" fillOpacity="0.8" stroke="#cbd5e1" strokeWidth="1" />
            <text x="0" y="4" fill="#38bdf8" fontSize="13" fontWeight="900" textAnchor="middle">
              {allThree}
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
};
