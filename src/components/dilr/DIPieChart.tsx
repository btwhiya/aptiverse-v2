"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface SegmentConfig {
  name: string;
  value: number;
  color: string;
}

interface DIPieChartProps {
  data: Record<string, any>;
}

export const DIPieChart: React.FC<DIPieChartProps> = ({ data }) => {
  const { title, segments = [] } = data;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.55;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#ffffff"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={11}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="w-full bg-slate-900/80 border border-slate-800 rounded-xl p-4 md:p-6 shadow-xl backdrop-blur-md">
      {title && (
        <h4 className="text-sm md:text-base font-semibold text-slate-200 mb-2 tracking-wide text-center">
          {title}
        </h4>
      )}
      <div className="w-full h-[320px] md:h-[380px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={segments}
              cx="50%"
              cy="48%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={110}
              innerRadius={35}
              paddingAngle={3}
              dataKey="value"
            >
              {segments.map((entry: SegmentConfig, index: number) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="#0f172a" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: any) => [`${value}% Share`, "Market Share"]}
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
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{
                paddingTop: "15px",
                fontSize: "11px",
                color: "#cbd5e1",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
