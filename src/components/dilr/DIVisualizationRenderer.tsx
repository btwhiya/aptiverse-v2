"use client";

import React from "react";
import { VisualizationType } from "@/lib/dilr/types";
import { DIBarChart } from "./DIBarChart";
import { DILineChart } from "./DILineChart";
import { DIPieChart } from "./DIPieChart";
import { DIMixedChart } from "./DIMixedChart";
import { DIDataTable } from "./DIDataTable";
import { DIVennDiagram } from "./DIVennDiagram";
import { DINetworkGraph } from "./DINetworkGraph";
import { DIArrangementDiagram } from "./DIArrangementDiagram";

interface DIVisualizationRendererProps {
  type: VisualizationType;
  data: Record<string, any>;
}

export const DIVisualizationRenderer: React.FC<DIVisualizationRendererProps> = ({
  type,
  data,
}) => {
  if (!data || Object.keys(data).length === 0 || type === "none") {
    return null;
  }

  switch (type) {
    case "bar":
      return <DIBarChart data={data} />;
    case "line":
      return <DILineChart data={data} />;
    case "pie":
      return <DIPieChart data={data} />;
    case "mixed":
      return <DIMixedChart data={data} />;
    case "table":
      return <DIDataTable data={data} />;
    case "venn":
      return <DIVennDiagram data={data} />;
    case "network":
      return <DINetworkGraph data={data} />;
    case "arrangement":
      return <DIArrangementDiagram data={data} />;
    case "caselet":
      return null; // Caselet text is rendered in the passage card
    default:
      return null;
  }
};
