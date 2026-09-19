"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface BarConfig {
  key: string;
  name: string;
  color: string;
}

interface DIBarChartProps {
  data: Record<string, any>;
}

export const DIBarChart: React.FC<DIBarChartProps> = ({ data }) => {
  const { title, xAxisKey = "period", bars = [], data: chartData = [] } = data;

  return (
    <div className="w-full bg-slate-900/80 border border-slate-800 rounded-xl p-4 md:p-6 shadow-xl backdrop-blur-md">
      {title && (
        <h4 className="text-sm md:text-base font-semibold text-slate-200 mb-4 tracking-wide text-center">
          {title}
        </h4>
      )}
      <div className="w-full h-[320px] md:h-[380px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 15, right: 25, left: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
            <XAxis
              dataKey={xAxisKey}
              stroke="#94a3b8"
              fontSize={12}
              tickLine={{ stroke: "#475569" }}
            />
            <YAxis stroke="#94a3b8" fontSize={12} tickLine={{ stroke: "#475569" }} />
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
            {bars.map((b: BarConfig) => (
              <Bar
                key={b.key}
                dataKey={b.key}
                name={b.name}
                fill={b.color}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
