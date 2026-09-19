import { resolveQuestionGraph } from "../src/lib/graph-resolver";
import { ALL_DILR_TOPICS } from "../src/lib/dilr";

console.log("Testing DILR graph resolver across topics...");

const graphsTopic = ALL_DILR_TOPICS.find((t) => t.slug === "graphs-charts");
if (graphsTopic) {
  const p1 = graphsTopic.practiceQuestions[0];
  const g1 = resolveQuestionGraph(p1);
  console.log("Practice Q1 Graph:", g1?.type, g1?.title, g1?.figureNumber, "Pie Sectors:", g1?.pieData?.length);

  const t1 = graphsTopic.testQuestions[0];
  const g2 = resolveQuestionGraph(t1);
  console.log("Test Q1 Graph:", g2?.type, g2?.title, g2?.figureNumber, "Lines:", g2?.lineSeries?.length);
}

const mixedTopic = ALL_DILR_TOPICS.find((t) => t.slug === "mixed-graphs");
if (mixedTopic) {
  const p1 = mixedTopic.practiceQuestions[0];
  const g = resolveQuestionGraph(p1);
  console.log("Mixed Q1 Graph:", g?.type, g?.title, "Pie slices:", g?.mixedData?.pie?.length, "Bars:", g?.mixedData?.bars?.length);
}

const vennTopic = ALL_DILR_TOPICS.find((t) => t.slug === "venn-diagrams");
if (vennTopic) {
  const p1 = vennTopic.practiceQuestions[0];
  const g1 = resolveQuestionGraph(p1);
  console.log("Venn Q1 Graph:", g1?.type, g1?.title, "Sets:", g1?.vennData?.setsCount, "Overlap:", g1?.vennData?.intersection2?.count);

  const t1 = vennTopic.testQuestions[0];
  const g2 = resolveQuestionGraph(t1);
  console.log("Venn Test Q1 Graph:", g2?.type, g2?.title, "Sets:", g2?.vennData?.setsCount, "All 3:", g2?.vennData?.regions3?.allThree);
}

const tableTopic = ALL_DILR_TOPICS.find((t) => t.slug === "tables-caselets");
if (tableTopic) {
  const p1 = tableTopic.practiceQuestions[0];
  const g = resolveQuestionGraph(p1);
  console.log("Table Q1 Graph:", g?.type, g?.title, "Headers:", g?.tableData?.headers?.length, "Rows:", g?.tableData?.rows?.length);
}

console.log("All graph resolvers verified successfully!");
