/**
 * Master Graph & Visual Data Resolver for AptiVerse CAT DILR
 * Extracts, synthesizes, and standardizes high-fidelity chart data
 * for interactive Recharts, SVG visual figures, and tabular contingency caselets.
 */

export type GraphType =
  | "pie"
  | "bar"
  | "line"
  | "mixed"
  | "radar"
  | "table"
  | "venn"
  | "tournament"
  | "arrangement"
  | "timeline"
  | "image";

export interface PieSector {
  name: string;
  value: number;
  angle?: number;
  percentage?: number;
  color?: string;
  highlight?: boolean;
}

export interface BarDataPoint {
  label: string;
  [key: string]: string | number | boolean | undefined;
}

export interface LineDataPoint {
  label: string;
  [key: string]: string | number | boolean | undefined;
}

export interface VennData {
  setsCount: 2 | 3;
  universeTotal: number;
  sets: { label: string; count: number; color?: string }[];
  intersection2?: { label: string; count: number };
  regions3?: {
    onlyA: number;
    onlyB: number;
    onlyC: number;
    aAndB: number;
    bAndC: number;
    cAndA: number;
    allThree: number;
    none: number;
  };
}

export interface TournamentMatch {
  id: string;
  p1: string;
  p2: string;
  winner?: string;
  upset?: boolean;
}

export interface TournamentData {
  rounds: {
    title: string;
    matches: TournamentMatch[];
  }[];
}

export interface ArrangementSeat {
  seatIndex: number;
  occupant?: string;
  label: string;
  facing?: "North" | "South" | "Inward" | "Outward";
  highlight?: boolean;
}

export interface GraphPayload {
  type: GraphType;
  title: string;
  subtitle?: string;
  figureNumber?: string;
  sourceNotice?: string;
  unit?: string;
  pieData?: PieSector[];
  barData?: BarDataPoint[];
  barSeries?: { key: string; name: string; color: string }[];
  lineData?: LineDataPoint[];
  lineSeries?: { key: string; name: string; color: string }[];
  mixedData?: {
    pie?: PieSector[];
    bars?: BarDataPoint[];
    barSeries?: { key: string; name: string; color: string }[];
    totalSalesCr?: number;
  };
  radarData?: { subject: string; value: number; fullMark: number }[];
  tableData?: {
    headers: string[];
    rows: (string | number)[][];
    footers?: (string | number)[];
    notes?: string;
  };
  vennData?: VennData;
  tournamentData?: TournamentData;
  arrangementData?: {
    type: "linear" | "circular";
    seats: ArrangementSeat[];
  };
  timelineData?: {
    slots: { day: string; event: string; status?: string }[];
  };
  imageUrl?: string;
}

// Color palettes for sleek CAT exam dark mode charts
export const CHART_PALETTES = {
  vibrant: ["#6366f1", "#06b6d4", "#10b981", "#f59e0b", "#ec4899", "#8b5cf6"],
  emerald: ["#10b981", "#059669", "#34d399", "#6ee7b7", "#047857"],
  indigoCyan: ["#6366f1", "#38bdf8", "#818cf8", "#0ea5e9", "#c084fc"],
};

/**
 * Universal resolver that returns graph payload for any question item
 */
export function resolveQuestionGraph(question: {
  id?: string;
  topicSlug?: string;
  subtopicSlug?: string;
  questionText?: string;
  passageText?: string;
  graphData?: any;
  imageUrl?: string;
}): GraphPayload | null {
  if (!question) return null;

  // 1. Direct image override
  if (question.imageUrl) {
    return {
      type: "image",
      title: "Exam Benchmark Figure",
      imageUrl: question.imageUrl,
      figureNumber: "FIG 1.1",
      sourceNotice: "CAT Official Benchmark Visual",
    };
  }

  // 2. Direct graphData payload
  if (question.graphData && question.graphData.type) {
    return question.graphData as GraphPayload;
  }

  const text = `${question.passageText || ""} ${question.questionText || ""}`.trim();
  const slug = (question.topicSlug || "").toLowerCase();
  const qId = (question.id || "").toLowerCase();
  // ==========================================
  // TOPIC 2: MIXED GRAPHS (mixed-graphs)
  // Must be checked BEFORE graphs-charts because mixed-graph questions
  // contain "pie chart" AND "bar chart" which would match the graphs-charts guard.
  // ==========================================
  if (slug === "mixed-graphs" || (text.includes("pie chart") && text.includes("bar chart"))) {
    // Practice questions (Sales Pie + Profit Margin Bar)
    const salesMatch = text.match(/₹\s*(\d+)\s*Cr/i);
    const totalSales = salesMatch ? parseInt(salesMatch[1], 10) : 6000;

    const shareMatch = text.match(/Division D accounts for\s*(\d+)%/i);
    const sharePct = shareMatch ? parseInt(shareMatch[1], 10) : 25;

    const marginMatch = text.match(/(\d+)%\s*operating margin/i);
    const marginPct = marginMatch ? parseInt(marginMatch[1], 10) : 16;

    const remainingShare = Math.max(10, 100 - sharePct - 18 - 22 - 20);

    return {
      type: "mixed",
      figureNumber: "FIGURE 2.1 & 2.2",
      title: "Conglomerate Division Performance: Sales Share vs Operating Margin",
      subtitle: `Total Corporate Sales = ₹${totalSales} Cr across 5 Global Divisions`,
      sourceNotice: "Annual Integrated Financial Statement • CAT DILR Mixed Set",
      mixedData: {
        totalSalesCr: totalSales,
        pie: [
          { name: "Division A", value: Math.round(totalSales * 0.18), percentage: 18, color: "#06b6d4" },
          { name: "Division B", value: Math.round(totalSales * 0.22), percentage: 22, color: "#10b981" },
          { name: "Division C", value: Math.round(totalSales * 0.20), percentage: 20, color: "#f59e0b" },
          { name: "Division D (Target)", value: Math.round(totalSales * (sharePct / 100)), percentage: sharePct, color: "#6366f1", highlight: true },
          { name: "Division E", value: Math.round(totalSales * (remainingShare / 100)), percentage: remainingShare, color: "#ec4899" },
        ],
        bars: [
          { label: "Div A", margin: 14, color: "#06b6d4" },
          { label: "Div B", margin: 12, color: "#10b981" },
          { label: "Div C", margin: 18, color: "#f59e0b" },
          { label: "Div D", margin: marginPct, color: "#6366f1" },
          { label: "Div E", margin: 15, color: "#ec4899" },
        ],
        barSeries: [
          { key: "margin", name: "Operating Profit Margin (%)", color: "#6366f1" },
        ],
      },
    };
  }

  // ==========================================
  // TOPIC 1: GRAPHS & CHARTS (graphs-charts)
  // ==========================================
  if (slug === "graphs-charts" || text.includes("pie chart") || text.includes("multi-line export graph")) {
    // Check if it's a Pie Chart question
    if (text.includes("pie chart") || text.includes("central angle") || text.includes("expenditure of a university") || qId.startsWith("di-gc-p")) {
      const angleMatch = text.match(/(\d+)\s*°/);
      const angle = angleMatch ? parseInt(angleMatch[1], 10) : 60;

      const totalMatch = text.match(/₹\s*(\d+)\s*Lakhs/i);
      const totalVal = totalMatch ? parseInt(totalMatch[1], 10) : 2400;

      const rdVal = Math.round(totalVal * (angle / 360));
      const salariesAngle = 105;
      const infraAngle = 85;
      const techAngle = 55;
      const adminAngle = Math.max(10, 360 - angle - salariesAngle - infraAngle - techAngle);

      return {
        type: "pie",
        figureNumber: "FIGURE 1.1",
        title: "University Annual Budget Allocation",
        subtitle: `Total Expenditure = ₹${totalVal} Lakhs • Full Circle = 360°`,
        sourceNotice: "Official University Finance Audit & CAT DI Benchmark",
        unit: "₹ Lakhs",
        pieData: [
          {
            name: "Research & Dev (R&D)",
            value: rdVal,
            angle: angle,
            percentage: Number(((angle / 360) * 100).toFixed(1)),
            color: "#6366f1",
            highlight: true,
          },
          {
            name: "Faculty & Staff Salaries",
            value: Math.round(totalVal * (salariesAngle / 360)),
            angle: salariesAngle,
            percentage: Number(((salariesAngle / 360) * 100).toFixed(1)),
            color: "#06b6d4",
          },
          {
            name: "Campus Infrastructure & Labs",
            value: Math.round(totalVal * (infraAngle / 360)),
            angle: infraAngle,
            percentage: Number(((infraAngle / 360) * 100).toFixed(1)),
            color: "#10b981",
          },
          {
            name: "Digital Systems & Library",
            value: Math.round(totalVal * (techAngle / 360)),
            angle: techAngle,
            percentage: Number(((techAngle / 360) * 100).toFixed(1)),
            color: "#f59e0b",
          },
          {
            name: "Administration & Contingency",
            value: Math.round(totalVal * (adminAngle / 360)),
            angle: adminAngle,
            percentage: Number(((adminAngle / 360) * 100).toFixed(1)),
            color: "#ec4899",
          },
        ],
      };
    }

    // Line Chart Question (e.g. multi-line export graph)
    if (text.includes("multi-line export") || text.includes("exported") || text.includes("metric tonnes") || qId.startsWith("di-gc-t")) {
      const val1Match = text.match(/(\d+)\s*thousand metric tonnes in 2024/i);
      const val2Match = text.match(/(\d+)\s*thousand metric tonnes in 2025/i);
      const val1 = val1Match ? parseInt(val1Match[1], 10) : 150;
      const val2 = val2Match ? parseInt(val2Match[1], 10) : 210;

      return {
        type: "line",
        figureNumber: "FIGURE 1.2",
        title: "Multi-Country Agricultural Exports (2021 – 2025)",
        subtitle: "Annual Volume in '000 Metric Tonnes",
        sourceNotice: "Directorate General of Foreign Trade (DGFT) Standard Benchmarks",
        unit: "'000 MT",
        lineSeries: [
          { key: "countryX", name: "Country X (Focus)", color: "#6366f1" },
          { key: "countryY", name: "Country Y", color: "#10b981" },
          { key: "countryZ", name: "Country Z", color: "#f59e0b" },
        ],
        lineData: [
          { label: "2021", countryX: Math.round(val1 * 0.72), countryY: Math.round(val1 * 0.8), countryZ: Math.round(val1 * 0.65) },
          { label: "2022", countryX: Math.round(val1 * 0.82), countryY: Math.round(val1 * 0.86), countryZ: Math.round(val1 * 0.73) },
          { label: "2023", countryX: Math.round(val1 * 0.91), countryY: Math.round(val1 * 0.92), countryZ: Math.round(val1 * 0.84) },
          { label: "2024", countryX: val1, countryY: Math.round(val1 * 0.98), countryZ: Math.round(val1 * 0.89) },
          { label: "2025", countryX: val2, countryY: Math.round(val2 * 0.94), countryZ: Math.round(val2 * 0.91) },
        ],
      };
    }
  }


  // ==========================================
  // TOPIC 3: TABLES & CASELETS (tables-caselets)
  // ==========================================
  if (slug === "tables-caselets" || text.includes("production lines A, B, and C") || text.includes("fulfillment centers")) {
    if (text.includes("production lines A, B, and C") || qId.startsWith("di-tc-p")) {
      const itemsMatch = text.match(/producing\s*(\d+)\s*units/i);
      const totalItems = itemsMatch ? parseInt(itemsMatch[1], 10) : 1500;

      const lineAUnits = Math.round(totalItems * (3 / 12));
      const lineBUnits = Math.round(totalItems * (4 / 12));
      const lineCUnits = totalItems - lineAUnits - lineBUnits;

      return {
        type: "table",
        figureNumber: "TABLE 1.1",
        title: "Quality Audit Matrix: Line-Wise Production & Yield Analysis",
        subtitle: `Total Production Batch: ${totalItems} Units • Ratio 3 : 4 : 5`,
        sourceNotice: "Operations Engineering Quality Telemetry Data",
        tableData: {
          headers: ["Production Line", "Ratio Share", "Volume (Units)", "Defect Rate (%)", "Defective Units", "Net Non-Defective Yield"],
          rows: [
            ["Line A", "3 / 12 (25.0%)", lineAUnits, "2.0%", Math.round(lineAUnits * 0.02), Math.round(lineAUnits * 0.98)],
            ["Line B", "4 / 12 (33.3%)", lineBUnits, "4.0%", Math.round(lineBUnits * 0.04), Math.round(lineBUnits * 0.96)],
            ["Line C", "5 / 12 (41.7%)", lineCUnits, "5.0%", Math.round(lineCUnits * 0.05), Math.round(lineCUnits * 0.95)],
          ],
          footers: ["Total / Average", "12 / 12 (100%)", totalItems, "3.92%", Math.round(totalItems * 0.0392), Math.round(totalItems * 0.9608)],
          notes: "Yield formula: Net Non-Defective Units = Total Volume × [1 - (Defect Rate / 100)].",
        },
      };
    }

    if (text.includes("annual performance table across 4 quarters") || text.includes("Q1 to Q2") || qId.startsWith("di-tc-t")) {
      const q1RevMatch = text.match(/Q1 revenue was ₹\s*(\d+)\s*Cr/i);
      const q1Rev = q1RevMatch ? parseInt(q1RevMatch[1], 10) : 550;

      return {
        type: "table",
        figureNumber: "TABLE 1.2",
        title: "Quarterly Financial Performance & Growth Matrix (Q1–Q4)",
        subtitle: "Values in ₹ Crores (Cr) with QoQ Compounded Trajectory",
        sourceNotice: "Statutory Auditor Quarterly Performance Report",
        tableData: {
          headers: ["Quarter", "Base Revenue (₹ Cr)", "QoQ Trend", "Operating Cost (₹ Cr)", "EBITDA Margin (%)"],
          rows: [
            ["Q1 (Base)", q1Rev, "Baseline", Math.round(q1Rev * 0.68), "32.0%"],
            ["Q2", Math.round(q1Rev * 1.18), "+18.0%", Math.round(q1Rev * 1.18 * 0.65), "35.0%"],
            ["Q3", Math.round(q1Rev * 1.18 * 0.92), "-8.0%", Math.round(q1Rev * 1.18 * 0.92 * 0.70), "30.0%"],
            ["Q4 (Proj)", Math.round(q1Rev * 1.25), "+14.0%", Math.round(q1Rev * 1.25 * 0.66), "34.0%"],
          ],
          footers: ["FY Total", Math.round(q1Rev * 4.45), "+12.4% YoY", Math.round(q1Rev * 4.45 * 0.67), "33.0%"],
          notes: "Net Growth from Q1 to Q3 is governed by compounding multiplier (1 + a/100)(1 - b/100).",
        },
      };
    }

    // IMS SimCAT Missing Table question (ims-dilr-001)
    if (qId === "ims-dilr-001" || text.includes("fulfillment center")) {
      return {
        type: "table",
        figureNumber: "TABLE 2.1",
        title: "E-Commerce Fulfillment Centers Dispatch Performance Audit",
        subtitle: "Total Shipments = 20,000 • Overall Benchmark On-Time Rate = 91.5%",
        sourceNotice: "IMS SimCAT DILR Benchmark Audit Dataset",
        tableData: {
          headers: ["Fulfillment Center", "Share of Total (%)", "Shipments Volume", "On-Time Dispatch Rate (%)", "Delayed Shipments"],
          rows: [
            ["Center F1", "30.0%", "6,000", "95.0%", "300"],
            ["Center F2", "25.0%", "5,000", "88.0%", "600"],
            ["Center F3", "15.0%", "3,000", "90.0%", "300"],
            ["Center F4", "30.0% [Reconstructed]", "6,000", "[ ? ] (To Calculate)", "750"],
          ],
          footers: ["Combined Network", "100.0%", "20,000", "91.5%", "1,950"],
          notes: "Use weighted average deviation formula: Σ (Volume × On-Time Rate) = Total Volume × 91.5%.",
        },
      };
    }
  }

  // ==========================================
  // TOPIC 4: VENN DIAGRAMS (venn-diagrams)
  // ==========================================
  if (slug === "venn-diagrams" || text.includes("Venn") || text.includes("In a cohort of") || text.includes("survey of 200")) {
    if (text.includes("ChatGPT") || text.includes("three tools") || text.includes("Claude") || qId.startsWith("lr-venn-t")) {
      return {
        type: "venn",
        figureNumber: "VENN FIGURE 3.1",
        title: "3-Set Overlap: Generative AI Tool Adoption in Tech Cohort",
        subtitle: "Total Survey Sample: 200 Professionals • ChatGPT (A), Claude (B), Gemini (C)",
        sourceNotice: "Enterprise Technology Adoption Survey & CAT LR Venn Set",
        vennData: {
          setsCount: 3,
          universeTotal: 200,
          sets: [
            { label: "ChatGPT (A)", count: 120, color: "#10b981" },
            { label: "Claude (B)", count: 100, color: "#6366f1" },
            { label: "Gemini (C)", count: 80, color: "#f59e0b" },
          ],
          regions3: {
            onlyA: 55,
            onlyB: 45,
            onlyC: 40,
            aAndB: 18,
            bAndC: 17,
            cAndA: 15,
            allThree: 20,
            none: 20,
          },
        },
      };
    }

    // 2-Set Venn
    const totalMatch = text.match(/cohort of\s*(\d+)\s*students/i);
    const total = totalMatch ? parseInt(totalMatch[1], 10) : 120;
    const setAMatch = text.match(/(\d+)\s*study Analytics/i);
    const setBMatch = text.match(/(\d+)\s*study Marketing/i);
    const setA = setAMatch ? parseInt(setAMatch[1], 10) : 70;
    const setB = setBMatch ? parseInt(setBMatch[1], 10) : 65;
    const both = setA + setB - total;

    return {
      type: "venn",
      figureNumber: "VENN FIGURE 2.1",
      title: "2-Set Inclusion-Exclusion Overlap: Subject Enrollment",
      subtitle: `Total Cohort = ${total} Students • All study at least one subject`,
      sourceNotice: "Academic Registrar Database • CAT LR Standard Set",
      vennData: {
        setsCount: 2,
        universeTotal: total,
        sets: [
          { label: "Analytics (Set A)", count: setA, color: "#6366f1" },
          { label: "Marketing (Set B)", count: setB, color: "#ec4899" },
        ],
        intersection2: {
          label: "Both (A ∩ B)",
          count: both,
        },
      },
    };
  }

  // ==========================================
  // TOPIC 5: CALCULATION BASICS (calculation-basics)
  // ==========================================
  if (slug === "calculation-basics" || text.includes("percentage changes, ratios, averages")) {
    return {
      type: "bar",
      figureNumber: "FIGURE 4.1",
      title: "Compounded Growth Trajectory & Incremental Base Delta",
      subtitle: "Indexed Revenue Growth Across Consecutive Reporting Periods",
      sourceNotice: "AptiVerse Quantitative Foundation Telemetry",
      barSeries: [
        { key: "base", name: "Base Volume", color: "#6366f1" },
        { key: "incremental", name: "Incremental Compounded Gain", color: "#10b981" },
      ],
      barData: [
        { label: "Year 1", base: 100, incremental: 0 },
        { label: "Year 2 (+15%)", base: 100, incremental: 15 },
        { label: "Year 3 (+20%)", base: 115, incremental: 23 },
        { label: "Year 4 (-10%)", base: 138, incremental: -13.8 },
        { label: "Year 5 (+25%)", base: 124.2, incremental: 31.05 },
      ],
    };
  }

  // ==========================================
  // TOPIC 6: TOURNAMENTS (tournaments / games-tournaments)
  // ==========================================
  if (slug === "tournaments" || slug === "games-tournaments" || text.includes("tennis tournament seeded") || qId === "ims-dilr-002") {
    return {
      type: "tournament",
      figureNumber: "BRACKET 1.1",
      title: "16-Player Seeded Knockout Tournament Architecture",
      subtitle: "Seeded 1 to 16 Single-Elimination Path with Key Recorded Upsets",
      sourceNotice: "IMS SimCAT Benchmark Tournament Bracket",
      tournamentData: {
        rounds: [
          {
            title: "Round 1 (Round of 16)",
            matches: [
              { id: "m1", p1: "Seed 1", p2: "Seed 16", winner: "Seed 1" },
              { id: "m2", p1: "Seed 8", p2: "Seed 9", winner: "Seed 8" },
              { id: "m3", p1: "Seed 4", p2: "Seed 13", winner: "Seed 4" },
              { id: "m4", p1: "Seed 5", p2: "Seed 12", winner: "Seed 5" },
              { id: "m5", p1: "Seed 2", p2: "Seed 15", winner: "Seed 2" },
              { id: "m6", p1: "Seed 7", p2: "Seed 10", winner: "Seed 10", upset: true },
              { id: "m7", p1: "Seed 3", p2: "Seed 14", winner: "Seed 3" },
              { id: "m8", p1: "Seed 6", p2: "Seed 11", winner: "Seed 6" },
            ],
          },
          {
            title: "Quarter-Finals (Round of 8)",
            matches: [
              { id: "qf1", p1: "Seed 1", p2: "Seed 8", winner: "Seed 1" },
              { id: "qf2", p1: "Seed 4", p2: "Seed 5", winner: "Seed 4" },
              { id: "qf3", p1: "Seed 2", p2: "Seed 10", winner: "Seed 10", upset: true },
              { id: "qf4", p1: "Seed 3", p2: "Seed 6", winner: "Seed 3" },
            ],
          },
          {
            title: "Semi-Finals",
            matches: [
              { id: "sf1", p1: "Seed 1", p2: "Seed 4", winner: "Seed 4", upset: true },
              { id: "sf2", p1: "Seed 10", p2: "Seed 3", winner: "Seed 3" },
            ],
          },
          {
            title: "Grand Final",
            matches: [
              { id: "f1", p1: "Seed 4 (Top Half)", p2: "Seed 3 (Bottom Half)", winner: "Championship" },
            ],
          },
        ],
      },
    };
  }

  // ==========================================
  // TOPIC 7: ARRANGEMENTS (arrangements)
  // ==========================================
  if (slug === "arrangements" || text.includes("seated in a row") || text.includes("circular table")) {
    return {
      type: "arrangement",
      figureNumber: "LAYOUT 1.1",
      title: "Boardroom Linear Seating Arrangement Schematic",
      subtitle: "6 Executives (A, B, C, D, E, F) Facing North in a Row",
      sourceNotice: "Executive Boardroom Spatial Grid • CAT LR Setup",
      arrangementData: {
        type: "linear",
        seats: [
          { seatIndex: 1, label: "Seat 1 (Extreme Left)", occupant: "A", facing: "North" },
          { seatIndex: 2, label: "Seat 2", occupant: "C", facing: "North" },
          { seatIndex: 3, label: "Seat 3", occupant: "E", facing: "North" },
          { seatIndex: 4, label: "Seat 4", occupant: "D", facing: "North" },
          { seatIndex: 5, label: "Seat 5", occupant: "B", facing: "North", highlight: true },
          { seatIndex: 6, label: "Seat 6 (Extreme Right)", occupant: "F", facing: "North" },
        ],
      },
    };
  }

  // ==========================================
  // TOPIC 8: SCHEDULING & DISTRIBUTION (scheduling-distribution)
  // ==========================================
  if (slug === "scheduling-distribution" || text.includes("workshops (W1 to W5)") || text.includes("Monday to Friday")) {
    return {
      type: "timeline",
      figureNumber: "SCHEDULE 1.1",
      title: "Weekly Workshop Schedule Matrix (Monday – Friday)",
      subtitle: "Constrained Sequential Slot Allocation • Exactly One Session Daily",
      sourceNotice: "Operational Scheduling Protocol • CAT LR Benchmark",
      timelineData: {
        slots: [
          { day: "Monday", event: "Workshop W4", status: "Anchor Left" },
          { day: "Tuesday", event: "Workshop W2", status: "Pre-requisite" },
          { day: "Wednesday", event: "Workshop W1 (Fixed)", status: "Midweek Anchor" },
          { day: "Thursday", event: "Workshop W3", status: "Block Day 1" },
          { day: "Friday", event: "Workshop W5", status: "Block Day 2 (Final)" },
        ],
      },
    };
  }

  return null;
}
