"use client";

import React from "react";

interface DIDataTableProps {
  data: Record<string, any>;
}

export const DIDataTable: React.FC<DIDataTableProps> = ({ data }) => {
  const { title, headers = [], rows = [], hasMissingValues = false } = data;

  return (
    <div className="w-full bg-slate-900/80 border border-slate-800 rounded-xl p-4 md:p-6 shadow-xl backdrop-blur-md">
      {title && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
          <h4 className="text-sm md:text-base font-semibold text-slate-200 tracking-wide">
            {title}
          </h4>
          {hasMissingValues && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-1.5 animate-pulse" />
              Cells marked with ? must be deduced
            </span>
          )}
        </div>
      )}

      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-700">
        <table className="w-full text-left border-collapse text-xs md:text-sm">
          <thead>
            <tr className="border-b border-slate-700 bg-slate-800/60">
              {headers.map((h: string, idx: number) => (
                <th
                  key={idx}
                  className={`px-3 md:px-4 py-3 font-semibold text-slate-300 ${
                    idx === 0 ? "text-left" : "text-right"
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {rows.map((row: string[], rIdx: number) => {
              const isLastRow = rIdx === rows.length - 1 && (row[0]?.toLowerCase().includes("total") || row[0]?.toLowerCase().includes("grand"));
              return (
                <tr
                  key={rIdx}
                  className={`transition-colors hover:bg-slate-800/40 ${
                    isLastRow ? "bg-slate-800/70 font-semibold text-slate-100" : "text-slate-300"
                  }`}
                >
                  {row.map((cell: string, cIdx: number) => {
                    const isMissing = cell.trim() === "?";
                    return (
                      <td
                        key={cIdx}
                        className={`px-3 md:px-4 py-2.5 ${
                          cIdx === 0 ? "font-medium text-left" : "text-right font-mono"
                        }`}
                      >
                        {isMissing ? (
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                            ?
                          </span>
                        ) : (
                          cell
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
