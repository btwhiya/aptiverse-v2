"use client";

import React from "react";

interface Slot {
  position: number;
  label: string;
  revealedName?: string;
  revealedDivision?: string;
}

interface DIArrangementDiagramProps {
  data: Record<string, any>;
}

export const DIArrangementDiagram: React.FC<DIArrangementDiagramProps> = ({ data }) => {
  const { layoutType = "linear", facing = "North", slots = [] } = data;

  return (
    <div className="w-full bg-slate-900/80 border border-slate-800 rounded-xl p-4 md:p-6 shadow-xl backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
        <h4 className="text-sm md:text-base font-semibold text-slate-200 tracking-wide">
          Seating Alignment Diagram ({layoutType === "linear" ? "Linear Row" : "Circular Table"})
        </h4>
        <div className="flex items-center gap-2 text-xs text-indigo-400 bg-indigo-950/60 px-2.5 py-1 rounded-md border border-indigo-500/30">
          <span>Direction: Facing {facing}</span>
          <span className="text-indigo-300 font-bold">↑</span>
        </div>
      </div>

      {/* Direction Compass Indicator */}
      <div className="text-center mb-3">
        <span className="text-xs text-slate-400 font-medium tracking-wider uppercase">
          ← Left End &nbsp;&nbsp;&nbsp; [ Facing North ↑ ] &nbsp;&nbsp;&nbsp; Right End →
        </span>
      </div>

      {/* Linear Slots Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {slots.map((s: Slot) => (
          <div
            key={s.position}
            className="flex flex-col items-center justify-center p-3 rounded-lg bg-slate-800/80 border border-slate-700/60 shadow-inner hover:border-indigo-500/40 transition-all text-center group"
          >
            {/* Position badge */}
            <span className="text-[11px] font-bold text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded-full border border-indigo-800/40 mb-2">
              Pos {s.position}
            </span>

            {/* Person Name */}
            <div className="h-6 flex items-center justify-center">
              {s.revealedName ? (
                <span className="text-xs font-semibold text-slate-100">{s.revealedName}</span>
              ) : (
                <span className="text-xs text-slate-500 font-mono italic">Director ?</span>
              )}
            </div>

            {/* Division */}
            <div className="mt-1 h-5 flex items-center justify-center">
              {s.revealedDivision ? (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/30">
                  {s.revealedDivision}
                </span>
              ) : (
                <span className="text-[10px] text-slate-600 font-mono">Division ?</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
