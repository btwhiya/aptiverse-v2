"use client";

import React from "react";
import { FigureData, FigureElement, PositionType, ShapeType, FillType } from "./types";

interface FigureRendererProps {
  figure: FigureData;
  size?: number; // width & height in px, default 100
  className?: string;
  showLabel?: boolean;
}

// Convert position to relative coordinate (0-100 scale)
function getCoordinates(position: PositionType): { x: number; y: number } {
  switch (position) {
    case "center":
      return { x: 50, y: 50 };
    case "top":
      return { x: 50, y: 22 };
    case "bottom":
      return { x: 50, y: 78 };
    case "left":
      return { x: 22, y: 50 };
    case "right":
      return { x: 78, y: 50 };
    case "top-left":
      return { x: 26, y: 26 };
    case "top-right":
      return { x: 74, y: 26 };
    case "bottom-left":
      return { x: 26, y: 74 };
    case "bottom-right":
      return { x: 74, y: 74 };
    default:
      return { x: 50, y: 50 };
  }
}

// Get scale multiplier based on element size
function getSizeMultiplier(size?: "small" | "medium" | "large"): number {
  switch (size) {
    case "small":
      return 0.65;
    case "large":
      return 1.4;
    default:
      return 1.0;
  }
}

export function FigureRenderer({
  figure,
  size = 110,
  className = "",
  showLabel = true,
}: FigureRendererProps) {
  const outerFrame = figure.outerFrame ?? "square";

  return (
    <div
      className={`relative inline-flex flex-col items-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-sm transition-transform"
      >
        <defs>
          {/* Diagonal Striped Pattern */}
          <pattern
            id={`stripes-${figure.id}`}
            width="6"
            height="6"
            patternTransform="rotate(45 0 0)"
            patternUnits="userSpaceOnUse"
          >
            <line x1="0" y1="0" x2="0" y2="6" stroke="#f59e0b" strokeWidth="2" />
          </pattern>

          {/* Dotted Pattern */}
          <pattern
            id={`dots-${figure.id}`}
            width="6"
            height="6"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="3" cy="3" r="1.5" fill="#38bdf8" />
          </pattern>
        </defs>

        {/* Outer Frame */}
        {outerFrame === "square" && (
          <rect
            x="4"
            y="4"
            width="92"
            height="92"
            rx="12"
            className="fill-slate-900/90 stroke-slate-700/80 stroke-[2]"
          />
        )}
        {outerFrame === "circle" && (
          <circle
            cx="50"
            cy="50"
            r="46"
            className="fill-slate-900/90 stroke-slate-700/80 stroke-[2]"
          />
        )}
        {outerFrame === "diamond" && (
          <polygon
            points="50,4 96,50 50,96 4,50"
            className="fill-slate-900/90 stroke-slate-700/80 stroke-[2]"
          />
        )}

        {/* Optional Cross / Grid Lines */}
        {figure.gridLines && (
          <>
            <line x1="50" y1="4" x2="50" y2="96" className="stroke-slate-800 stroke-[1] stroke-dashed" />
            <line x1="4" y1="50" x2="96" y2="50" className="stroke-slate-800 stroke-[1] stroke-dashed" />
          </>
        )}
        {figure.diagonalLines && (
          <>
            <line x1="12" y1="12" x2="88" y2="88" className="stroke-slate-800 stroke-[1] stroke-dashed" />
            <line x1="88" y1="12" x2="12" y2="88" className="stroke-slate-800 stroke-[1] stroke-dashed" />
          </>
        )}

        {/* Render Each Figure Element */}
        {figure.elements.map((el) => {
          const coords = getCoordinates(el.position);
          const cx = coords.x + (el.offsetX ?? 0);
          const cy = coords.y + (el.offsetY ?? 0);
          const scale = getSizeMultiplier(el.size);
          const rotation = el.rotation ?? 0;
          const strokeColor = el.color ?? "#f8fafc";
          const strokeW = el.strokeWidth ?? 2.2;

          let fillAttr = "none";
          if (el.fill === "filled") fillAttr = el.color ?? "#f8fafc";
          else if (el.fill === "striped") fillAttr = `url(#stripes-${figure.id})`;
          else if (el.fill === "dots") fillAttr = `url(#dots-${figure.id})`;
          else if (el.fill === "half-filled") fillAttr = "#f59e0b";

          return (
            <g
              key={el.id}
              transform={`translate(${cx}, ${cy}) rotate(${rotation}) scale(${scale})`}
            >
              {renderShapePath(el.shape, fillAttr, strokeColor, strokeW)}
            </g>
          );
        })}
      </svg>

      {/* Optional Label / Step Tag */}
      {showLabel && figure.label && (
        <span className="absolute bottom-1 right-2 text-[10px] font-bold text-slate-400 font-mono">
          {figure.label}
        </span>
      )}
    </div>
  );
}

// Render individual SVG path for a given geometric shape
function renderShapePath(
  shape: ShapeType,
  fill: string,
  stroke: string,
  strokeWidth: number
) {
  switch (shape) {
    case "circle":
      return <circle cx="0" cy="0" r="14" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />;

    case "square":
      return (
        <rect
          x="-12"
          y="-12"
          width="24"
          height="24"
          rx="3"
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      );

    case "triangle":
      return (
        <polygon
          points="0,-15 14,13 -14,13"
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />
      );

    case "diamond":
      return (
        <polygon
          points="0,-15 15,0 0,15 -15,0"
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />
      );

    case "pentagon":
      return (
        <polygon
          points="0,-15 14,-5 9,13 -9,13 -14,-5"
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />
      );

    case "hexagon":
      return (
        <polygon
          points="0,-14 12,-7 12,7 0,14 -12,7 -12,-7"
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />
      );

    case "star":
      return (
        <polygon
          points="0,-15 4,-5 15,-4 7,4 10,14 0,9 -10,14 -7,4 -15,-4 -4,-5"
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />
      );

    case "cross":
      return (
        <path
          d="M -12,-12 L 12,12 M -12,12 L 12,-12"
          stroke={stroke}
          strokeWidth={strokeWidth + 1}
          strokeLinecap="round"
        />
      );

    case "plus":
      return (
        <path
          d="M 0,-14 L 0,14 M -14,0 L 14,0"
          stroke={stroke}
          strokeWidth={strokeWidth + 1}
          strokeLinecap="round"
        />
      );

    case "arrow":
      return (
        <path
          d="M 0,-16 L 8,-6 L 3,-6 L 3,14 L -3,14 L -3,-6 L -8,-6 Z"
          fill={fill === "none" ? stroke : fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />
      );

    case "line":
      return (
        <line
          x1="0"
          y1="-16"
          x2="0"
          y2="16"
          stroke={stroke}
          strokeWidth={strokeWidth + 1}
          strokeLinecap="round"
        />
      );

    case "dot":
      return <circle cx="0" cy="0" r="5" fill={stroke} />;

    case "crescent":
      return (
        <path
          d="M 0,-13 A 13,13 0 1 0 13,0 A 9,9 0 0 1 0,-13 Z"
          fill={fill === "none" ? stroke : fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      );

    case "heart":
      return (
        <path
          d="M 0,-5 C -4,-12 -14,-10 -14,-2 C -14,5 0,14 0,14 C 0,14 14,5 14,-2 C 14,-10 4,-12 0,-5 Z"
          fill={fill === "none" ? stroke : fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      );

    case "l-shape":
      return (
        <path
          d="M -8,-14 L 0,-14 L 0,8 L 10,8 L 10,14 L -8,14 Z"
          fill={fill === "none" ? stroke : fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />
      );

    case "t-shape":
      return (
        <path
          d="M -12,-12 L 12,-12 L 12,-6 L 4,-6 L 4,14 L -4,14 L -4,-6 L -12,-6 Z"
          fill={fill === "none" ? stroke : fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />
      );

    default:
      return <circle cx="0" cy="0" r="10" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />;
  }
}

// ==========================================
// HIGH-LEVEL VISUAL REASONING LAYOUTS
// ==========================================

/**
 * 1. FIGURE SEQUENCE: Renders Figure 1 -> 2 -> 3 -> 4 -> ?
 */
export function FigureSequence({
  figures,
  figureSize = 100,
}: {
  figures: FigureData[];
  figureSize?: number;
}) {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80">
      {figures.map((fig, idx) => (
        <React.Fragment key={fig.id || idx}>
          <div className="flex flex-col items-center gap-1.5">
            <span className="text-[11px] font-bold text-amber-400 font-mono">
              Fig {idx + 1}
            </span>
            <div className="p-1 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
              <FigureRenderer figure={fig} size={figureSize} />
            </div>
          </div>

          {idx < figures.length - 1 && (
            <div className="text-slate-600 font-extrabold text-base sm:text-xl shrink-0 self-center mt-4">
              →
            </div>
          )}
        </React.Fragment>
      ))}

      {/* Target Mystery Figure '?' */}
      <div className="text-slate-600 font-extrabold text-base sm:text-xl shrink-0 self-center mt-4">
        →
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <span className="text-[11px] font-bold text-indigo-400 font-mono">
          Fig ?
        </span>
        <div
          className="p-1 rounded-2xl bg-indigo-950/40 border-2 border-dashed border-indigo-500/60 flex items-center justify-center shadow-md"
          style={{ width: figureSize, height: figureSize }}
        >
          <span className="text-2xl sm:text-3xl font-extrabold text-indigo-400 animate-pulse">
            ?
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * 2. FIGURE ANALOGY: Renders A : B :: C : ?
 */
export function FigureAnalogy({
  pairA,
  figureC,
  figureSize = 100,
}: {
  pairA: [FigureData, FigureData];
  figureC: FigureData;
  figureSize?: number;
}) {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80">
      {/* Figure A */}
      <div className="flex flex-col items-center gap-1.5">
        <span className="text-[11px] font-bold text-amber-400 font-mono">Fig A</span>
        <div className="p-1 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
          <FigureRenderer figure={pairA[0]} size={figureSize} />
        </div>
      </div>

      <span className="text-xl font-bold text-slate-500 self-center mt-4">:</span>

      {/* Figure B */}
      <div className="flex flex-col items-center gap-1.5">
        <span className="text-[11px] font-bold text-amber-400 font-mono">Fig B</span>
        <div className="p-1 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
          <FigureRenderer figure={pairA[1]} size={figureSize} />
        </div>
      </div>

      <span className="text-xl font-extrabold text-indigo-400 self-center px-1 mt-4">::</span>

      {/* Figure C */}
      <div className="flex flex-col items-center gap-1.5">
        <span className="text-[11px] font-bold text-purple-400 font-mono">Fig C</span>
        <div className="p-1 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
          <FigureRenderer figure={figureC} size={figureSize} />
        </div>
      </div>

      <span className="text-xl font-bold text-slate-500 self-center mt-4">:</span>

      {/* Figure ? */}
      <div className="flex flex-col items-center gap-1.5">
        <span className="text-[11px] font-bold text-indigo-400 font-mono">Fig ?</span>
        <div
          className="p-1 rounded-2xl bg-indigo-950/40 border-2 border-dashed border-indigo-500/60 flex items-center justify-center shadow-md"
          style={{ width: figureSize, height: figureSize }}
        >
          <span className="text-2xl sm:text-3xl font-extrabold text-indigo-400 animate-pulse">
            ?
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * 3. 3x3 MATRIX (MISSING FIGURE): Renders 3x3 visual grid with missing tile '?'
 */
export function FigureMatrix({
  matrix,
  figureSize = 90,
}: {
  matrix: (FigureData | null)[][];
  figureSize?: number;
}) {
  return (
    <div className="inline-block p-4 rounded-3xl bg-slate-950 border border-slate-800 shadow-xl mx-auto">
      <div className="grid grid-cols-3 gap-2.5">
        {matrix.map((row, rIdx) =>
          row.map((cell, cIdx) => (
            <div
              key={`${rIdx}-${cIdx}`}
              className="p-1 rounded-2xl bg-slate-900 border border-slate-800/90 flex items-center justify-center"
              style={{ width: figureSize, height: figureSize }}
            >
              {cell ? (
                <FigureRenderer figure={cell} size={figureSize - 12} />
              ) : (
                <div className="w-full h-full rounded-xl bg-indigo-950/40 border-2 border-dashed border-indigo-500/60 flex items-center justify-center">
                  <span className="text-2xl sm:text-3xl font-extrabold text-indigo-400 animate-pulse">
                    ?
                  </span>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/**
 * 4. OPTION FIGURE BUTTON: Renders clickable Option A-E with visual SVG
 */
export function OptionFigure({
  label,
  figure,
  figurePair,
  isSelected,
  isRevealed,
  isCorrect,
  onClick,
  figureSize = 85,
}: {
  label: "A" | "B" | "C" | "D" | "E";
  figure: FigureData;
  figurePair?: [FigureData, FigureData];
  isSelected: boolean;
  isRevealed: boolean;
  isCorrect: boolean;
  onClick: () => void;
  figureSize?: number;
}) {
  let borderClasses = "border-slate-800 bg-slate-900/60 hover:border-slate-700 text-slate-200";
  if (isSelected) {
    borderClasses = "border-indigo-500 bg-indigo-950/50 shadow-md shadow-indigo-500/10";
  }
  if (isRevealed) {
    if (isCorrect) {
      borderClasses = "border-emerald-500 bg-emerald-950/60 text-emerald-200 shadow-md shadow-emerald-500/20";
    } else if (isSelected && !isCorrect) {
      borderClasses = "border-rose-500 bg-rose-950/60 text-rose-200 shadow-md shadow-rose-500/20";
    }
  }

  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col items-center gap-2 ${borderClasses}`}
    >
      <div className="flex items-center justify-between w-full px-1">
        <span
          className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center ${
            isSelected
              ? "bg-amber-500 text-slate-950"
              : isRevealed && isCorrect
              ? "bg-emerald-500 text-white"
              : "bg-slate-800 text-slate-300"
          }`}
        >
          {label}
        </span>
        {isRevealed && isCorrect && (
          <span className="text-[10px] font-bold text-emerald-400 uppercase">Correct</span>
        )}
      </div>

      {figurePair ? (
        <div className="flex items-center gap-1.5">
          <FigureRenderer figure={figurePair[0]} size={figureSize * 0.8} />
          <span className="text-xs text-slate-500">→</span>
          <FigureRenderer figure={figurePair[1]} size={figureSize * 0.8} />
        </div>
      ) : (
        <FigureRenderer figure={figure} size={figureSize} />
      )}
    </button>
  );
}
