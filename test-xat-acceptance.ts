import {
  generateXATDMQuestions,
  generateXATGKQuestions,
  routeExamQuestions,
  searchExamAwareQuestions,
  XAT_DM_CASELETS,
  ALL_XAT_GK_QUESTIONS,
} from "./src/lib/xat";
import { getDynamicPracticeQuestions } from "./src/lib/question-engine";
import { EXAM_SYLLABI_DATABASE } from "./src/lib/syllabus-data";

function assert(condition: boolean, msg: string) {
  if (!condition) {
    console.error(`❌ FAILED: ${msg}`);
    process.exit(1);
  }
  console.log(`✅ PASSED: ${msg}`);
}

console.log("==================================================");
console.log("RUNNING COMPLETE XAT 13-POINT ACCEPTANCE TEST SUITE");
console.log("==================================================\n");

// TEST 1: Open XAT syllabus
const xatSyllabus = EXAM_SYLLABI_DATABASE["xat"];
const xatSectionNames = xatSyllabus.sections.map((s) => s.name);
assert(
  xatSectionNames.some((n) => n.toLowerCase().includes("decision")),
  "TEST 1.1: XAT contains Decision Making"
);
assert(
  xatSectionNames.some((n) => n.toLowerCase().includes("general knowledge")),
  "TEST 1.2: XAT contains General Knowledge"
);

// TEST 2: Open CAT
const catSyllabus = EXAM_SYLLABI_DATABASE["cat"];
const catSectionNames = catSyllabus.sections.map((s) => s.name);
assert(
  !catSectionNames.some((n) => n.toLowerCase().includes("decision")),
  "TEST 2.1: CAT does NOT contain Decision Making"
);
assert(
  !catSectionNames.some((n) => n.toLowerCase().includes("general knowledge") || n.toLowerCase().includes("gk")),
  "TEST 2.2: CAT does NOT contain General Knowledge"
);

// TEST 3: Open NMAT
const nmatSyllabus = EXAM_SYLLABI_DATABASE["nmat"];
const nmatSectionNames = nmatSyllabus.sections.map((s) => s.name);
assert(
  !nmatSectionNames.some((n) => n.toLowerCase().includes("decision")),
  "TEST 3.1: NMAT does NOT contain Decision Making"
);
assert(
  !nmatSectionNames.some((n) => n.toLowerCase().includes("general knowledge") || n.toLowerCase().includes("gk")),
  "TEST 3.2: NMAT does NOT contain General Knowledge"
);

// TEST 4: Open SNAP
const snapSyllabus = EXAM_SYLLABI_DATABASE["snap"];
const snapSectionNames = snapSyllabus.sections.map((s) => s.name);
assert(
  !snapSectionNames.some((n) => n.toLowerCase().includes("decision")),
  "TEST 4.1: SNAP does NOT contain Decision Making"
);
assert(
  !snapSectionNames.some((n) => n.toLowerCase().includes("general knowledge") || n.toLowerCase().includes("gk")),
  "TEST 4.2: SNAP does NOT contain General Knowledge"
);

// TEST 5: Open CET (MAH-CET)
const cetSyllabus = EXAM_SYLLABI_DATABASE["mah-cet"];
const cetSectionNames = cetSyllabus.sections.map((s) => s.name);
assert(
  !cetSectionNames.some((n) => n.toLowerCase().includes("decision")),
  "TEST 5.1: MAH-CET does NOT contain Decision Making"
);
assert(
  !cetSectionNames.some((n) => n.toLowerCase().includes("general knowledge") || n.toLowerCase().includes("gk")),
  "TEST 5.2: MAH-CET does NOT contain General Knowledge"
);

// TEST 6: Open generic Concept section
// In practice / question engine, non-XAT queries must not return DM or GK
const genericQuestions = getDynamicPracticeQuestions({ count: 20 });
const hasDMInGeneric = genericQuestions.some(
  (q) => q.topicSlug.includes("dm") || q.topicSlug.includes("decision")
);
const hasGKInGeneric = genericQuestions.some(
  (q) => q.topicSlug.includes("gk") || q.topicSlug.includes("general-knowledge")
);
assert(!hasDMInGeneric, "TEST 6.1: Generic concept questions have NO Decision Making");
assert(!hasGKInGeneric, "TEST 6.2: Generic concept questions have NO General Knowledge");

// TEST 7: Generate XAT DM questions
const xatDM = generateXATDMQuestions({ exam: "XAT" });
assert(xatDM.length > 0, "TEST 7.1: XAT DM generator returns caselets");
assert(
  xatDM.every((c) => c.exam === "XAT" && c.section === "Decision Making"),
  "TEST 7.2: All returned caselets have exam='XAT' and section='Decision Making'"
);

// TEST 8: Generate XAT GK questions
const xatGK = generateXATGKQuestions({ exam: "XAT" });
assert(xatGK.length > 0, "TEST 8.1: XAT GK generator returns questions");
assert(
  xatGK.every((q) => q.exam === "XAT" && q.section === "General Knowledge"),
  "TEST 8.2: All returned GK questions have exam='XAT' and section='General Knowledge'"
);

// TEST 9: Generate CAT questions - No XAT DM, No XAT GK
const catDMAttempt = generateXATDMQuestions({ exam: "CAT" });
assert(catDMAttempt.length === 0, "TEST 9.1: DM generator strictly returns 0 for exam='CAT'");

const catGKAttempt = generateXATGKQuestions({ exam: "CAT" });
assert(catGKAttempt.length === 0, "TEST 9.2: GK generator strictly returns 0 for exam='CAT'");

const catRouteAttempt = routeExamQuestions({ exam: "CAT", section: "Decision Making" });
assert(
  !catRouteAttempt.success && catRouteAttempt.data.length === 0,
  "TEST 9.3: routeExamQuestions denies DM query under CAT"
);

const catGKRouteAttempt = routeExamQuestions({ exam: "CAT", section: "General Knowledge" });
assert(
  !catGKRouteAttempt.success && catGKRouteAttempt.data.length === 0,
  "TEST 9.4: routeExamQuestions denies GK query under CAT"
);

// TEST 10: Run XAT mock
// XAT Mock simulation can contain DM and GK
assert(XAT_DM_CASELETS.length > 0, "TEST 10.1: XAT Mock has access to authentic DM Caselets");
assert(ALL_XAT_GK_QUESTIONS.length > 0, "TEST 10.2: XAT Mock has access to authentic GK Questions");

// TEST 11: Run CAT mock
// In question-engine with exam: "cat", DM and GK questions are stripped
const catMockPool = getDynamicPracticeQuestions({ exam: "cat", count: 20 });
const hasXATInCatMock = catMockPool.some(
  (q) =>
    q.id.startsWith("xat-") ||
    q.topicSlug.includes("decision") ||
    q.topicSlug.includes("dm") ||
    q.topicSlug.includes("general-knowledge") ||
    q.topicSlug.includes("gk")
);
assert(!hasXATInCatMock, "TEST 11: CAT mock strictly contains 0 DM and 0 GK questions");

// TEST 12: Search for "Decision Making" while inside CAT
const catDMSearchResults = searchExamAwareQuestions({
  examContext: "CAT",
  query: "Decision Making",
});
assert(
  catDMSearchResults.length === 0,
  "TEST 12: Searching for 'Decision Making' inside CAT returns ZERO results"
);

// TEST 13: Search for "General Knowledge" while inside CAT
const catGKSearchResults = searchExamAwareQuestions({
  examContext: "CAT",
  query: "General Knowledge",
});
assert(
  catGKSearchResults.length === 0,
  "TEST 13: Searching for 'General Knowledge' inside CAT returns ZERO results"
);

// BONUS: Search inside XAT
const xatDMSearchResults = searchExamAwareQuestions({
  examContext: "XAT",
  query: "Decision Making",
});
assert(xatDMSearchResults.length > 0, "BONUS: Searching for 'Decision Making' inside XAT returns DM results");

const xatGKSearchResults = searchExamAwareQuestions({
  examContext: "XAT",
  query: "General Knowledge",
});
assert(xatGKSearchResults.length > 0, "BONUS: Searching for 'General Knowledge' inside XAT returns GK results");

console.log("\n==================================================");
console.log("🎉 ALL 13 ACCEPTANCE TESTS PASSED WITH 100% SUCCESS!");
console.log("==================================================");
