"use client";

import React from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface DIMixedChartProps {
  data: Record<string, any>;
}

export const DIMixedChart: React.FC<DIMixedChartProps> = ({ data }) => {
  const {
    title,
    xAxisKey = "period",
    barKey = "revenue",
    barName = "Revenue (₹ Cr)",
    barColor = "#6366f1",
    lineKey = "marginPct",
    lineName = "Margin (%)",
    lineColor = "#10b981",
    data: chartData = [],
  } = data;

  return (
    <div className="w-full bg-slate-900/80 border border-slate-800 rounded-xl p-4 md:p-6 shadow-xl backdrop-blur-md">
      {title && (
        <h4 className="text-sm md:text-base font-semibold text-slate-200 mb-4 tracking-wide text-center">
          {title}
        </h4>
      )}
      <div className="w-full h-[320px] md:h-[380px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 15, right: 25, left: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
            <XAxis
              dataKey={xAxisKey}
              stroke="#94a3b8"
              fontSize={12}
              tickLine={{ stroke: "#475569" }}
            />
            {/* Primary Left YAxis for Revenue / Volume (Bar) */}
            <YAxis
              yAxisId="left"
              stroke="#94a3b8"
              fontSize={12}
              tickLine={{ stroke: "#475569" }}
              label={{
                value: barName,
                angle: -90,
                position: "insideLeft",
                fill: "#94a3b8",
                fontSize: 11,
              }}
            />
            {/* Secondary Right YAxis for Percentage Margin (Line) */}
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#10b981"
              fontSize={12}
              tickLine={{ stroke: "#10b981" }}
              unit="%"
              label={{
                value: lineName,
                angle: 90,
                position: "insideRight",
                fill: "#10b981",
                fontSize: 11,
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderColor: "#334155",
                borderRadius: "0.5rem",
                color: "#f8fafc",
                fontSize: "12px",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.5)",
              }}
            />
            <Legend
              wrapperStyle={{
                paddingTop: "12px",
                fontSize: "12px",
                color: "#cbd5e1",
              }}
            />
            <Bar
              yAxisId="left"
              dataKey={barKey}
              name={barName}
              fill={barColor}
              radius={[4, 4, 0, 0]}
              barSize={36}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey={lineKey}
              name={lineName}
              stroke={lineColor}
              strokeWidth={3}
              dot={{ r: 5, fill: lineColor, stroke: "#0f172a", strokeWidth: 2 }}
              activeDot={{ r: 7 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
