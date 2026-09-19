"use client";

import React from "react";

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
}

interface Edge {
  from: string;
  to: string;
  cost: number;
  label: string;
}

interface DINetworkGraphProps {
  data: Record<string, any>;
}

export const DINetworkGraph: React.FC<DINetworkGraphProps> = ({ data }) => {
  const { title = "Directed Flow & Routing Network", nodes = [], edges = [], sourceNode, targetNode } = data;

  const nodeMap = new Map<string, Node>();
  nodes.forEach((n: Node) => nodeMap.set(n.id, n));

  return (
    <div className="w-full bg-slate-900/80 border border-slate-800 rounded-xl p-4 md:p-6 shadow-xl backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
        <h4 className="text-sm md:text-base font-semibold text-slate-200 tracking-wide">
          {title}
        </h4>
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Source ({sourceNode})
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Destination ({targetNode})
          </span>
        </div>
      </div>

      <div className="relative w-full max-w-[560px] mx-auto aspect-[16/10] flex items-center justify-center">
        <svg viewBox="0 0 520 320" className="w-full h-full select-none">
          <defs>
            <marker
              id="arrowhead"
              markerWidth="8"
              markerHeight="6"
              refX="18"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 8 3, 0 6" fill="#64748b" />
            </marker>
          </defs>

          {/* Edges */}
          {edges.map((e: Edge, idx: number) => {
            const u = nodeMap.get(e.from);
            const v = nodeMap.get(e.to);
            if (!u || !v) return null;

            const midX = (u.x + v.x) / 2;
            const midY = (u.y + v.y) / 2;

            return (
              <g key={idx}>
                {/* Connection line */}
                <line
                  x1={u.x}
                  y1={u.y}
                  x2={v.x}
                  y2={v.y}
                  stroke="#475569"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                />
                {/* Cost badge in middle */}
                <rect
                  x={midX - 16}
                  y={midY - 10}
                  width="32"
                  height="18"
                  rx="4"
                  fill="#0f172a"
                  stroke="#334155"
                  strokeWidth="1"
                />
                <text
                  x={midX}
                  y={midY + 3}
                  fill="#38bdf8"
                  fontSize="10"
                  fontWeight="bold"
                  fontFamily="monospace"
                  textAnchor="middle"
                >
                  {e.cost}k
                </text>
              </g>
            );
          })}

          {/* Nodes */}
          {nodes.map((n: Node) => {
            const isSource = n.id === sourceNode;
            const isTarget = n.id === targetNode;

            let fillColor = "#1e293b";
            let strokeColor = "#6366f1";
            let textColor = "#ffffff";

            if (isSource) {
              fillColor = "#064e3b";
              strokeColor = "#10b981";
            } else if (isTarget) {
              fillColor = "#78350f";
              strokeColor = "#f59e0b";
            }

            return (
              <g key={n.id} className="cursor-pointer">
                {/* Node Circle */}
                <circle
                  cx={n.x}
                  cy={n.y}
                  r="20"
                  fill={fillColor}
                  stroke={strokeColor}
                  strokeWidth="2.5"
                  className="transition-all hover:scale-110"
                />
                <text
                  x={n.x}
                  y={n.y + 4}
                  fill={textColor}
                  fontSize="12"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {n.id}
                </text>
                {/* Label below node */}
                <text
                  x={n.x}
                  y={n.y + 34}
                  fill="#94a3b8"
                  fontSize="9.5"
                  fontWeight="500"
                  textAnchor="middle"
                >
                  {n.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
