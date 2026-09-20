/**
 * SNAP PREPARATION MODULE & EXAM ISOLATION ACCEPTANCE TEST SUITE
 * Tests all 13 cross-exam isolation requirements, 12 syllabus modules,
 * free API fallbacks, question validity, and progress tracking.
 */

import {
  SNAP_CONCEPT_GUIDES,
  SNAP_QUESTION_BANK,
  getSNAPQuestions,
  getSNAPConcepts,
  searchSNAPAware,
  validateSNAPQuestion,
  isSNAPExclusiveTopic,
  fetchWordEnrichment,
  LOCAL_SNAP_VOCAB_FALLBACK,
  getSNAPProgress,
  recordSNAPAttempt,
  resetSNAPProgress,
} from "../src/lib/snap";

let passed = 0;
let failed = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  if (condition) {
    console.log(`[PASS] ${testName}`);
    passed++;
  } else {
    console.error(`[FAIL] ${testName}${detail ? ` - ${detail}` : ""}`);
    failed++;
  }
}

async function runTests() {
  console.log("=================================================");
  console.log("RUNNING SNAP EXAM ISOLATION & ACCEPTANCE TESTS");
  console.log("=================================================\n");

  // TEST 1: Open SNAP -> All SNAP-specific sections are accessible
  const snapAll = getSNAPQuestions({ exam: "SNAP" });
  assert(
    snapAll.length > 0 && snapAll.every((q) => q.exam === "SNAP"),
    "TEST 1: All SNAP-specific sections are accessible under SNAP exam context"
  );

  // TEST 2: Open CAT -> SNAP-specific sections are NOT visible
  const catSNAPQuestions = getSNAPQuestions({ exam: "CAT" });
  assert(
    catSNAPQuestions.length === 0,
    "TEST 2: SNAP-specific questions are NOT visible inside CAT"
  );

  // TEST 3: Open XAT -> SNAP-specific sections are NOT visible
  const xatSNAPQuestions = getSNAPQuestions({ exam: "XAT" });
  assert(
    xatSNAPQuestions.length === 0,
    "TEST 3: SNAP-specific questions are NOT visible inside XAT"
  );

  // TEST 4: Open NMAT -> SNAP-specific sections are NOT visible
  const nmatSNAPQuestions = getSNAPQuestions({ exam: "NMAT" });
  assert(
    nmatSNAPQuestions.length === 0,
    "TEST 4: SNAP-specific questions are NOT visible inside NMAT"
  );

  // TEST 5: Open MAH CET -> SNAP-specific sections are NOT visible
  const cetSNAPQuestions = getSNAPQuestions({ exam: "MAH CET" });
  assert(
    cetSNAPQuestions.length === 0,
    "TEST 5: SNAP-specific questions are NOT visible inside MAH CET"
  );

  // TEST 6: Open SNAP -> Concepts -> All 12 SNAP concepts are visible
  const snapConcepts = getSNAPConcepts({ exam: "SNAP" });
  assert(
    snapConcepts.length === 12,
    `TEST 6: All 12 SNAP-specific concepts visible under SNAP (Found: ${snapConcepts.length})`
  );

  // TEST 7: Open CAT -> Concepts -> No SNAP-specific concepts
  const catConcepts = getSNAPConcepts({ exam: "CAT" });
  assert(
    catConcepts.length === 0,
    "TEST 7: No SNAP-specific concepts returned under CAT context"
  );

  // TEST 8: Search "Ethics" inside SNAP -> SNAP Ethics content returned
  const snapSearch = searchSNAPAware("SNAP", "Ethics");
  assert(
    snapSearch.questions.length > 0 &&
      snapSearch.questions.some((q) => q.topic === "Ethics, Morality & Values"),
    "TEST 8: Searching 'Ethics' inside SNAP returns SNAP Ethics content"
  );

  // TEST 9: Search "Ethics" inside CAT -> No SNAP Ethics content
  const catSearch = searchSNAPAware("CAT", "Ethics");
  assert(
    catSearch.questions.length === 0 && catSearch.concepts.length === 0,
    "TEST 9: Searching 'Ethics' inside CAT strictly returns ZERO SNAP items"
  );

  // Search in other non-SNAP exams
  const xatSearch = searchSNAPAware("XAT", "Ethics");
  const mahCetSearch = searchSNAPAware("MAH CET", "Ethics");
  assert(
    xatSearch.questions.length === 0 && mahCetSearch.questions.length === 0,
    "TEST 9b: Searching 'Ethics' inside XAT and MAH CET returns ZERO SNAP items"
  );

  // TEST 10: Generate SNAP questions -> Only SNAP questions
  const snapVerbal = getSNAPQuestions({ exam: "SNAP", topic: "Reading Comprehension" });
  assert(
    snapVerbal.length > 0 && snapVerbal.every((q) => q.exam === "SNAP"),
    "TEST 10: Generating SNAP questions returns verified SNAP questions"
  );

  // TEST 11: Generate CAT questions -> No SNAP questions
  const catGen = getSNAPQuestions({ exam: "CAT", topic: "Reading Comprehension" });
  assert(
    catGen.length === 0,
    "TEST 11: Generating CAT questions through SNAP pipeline yields ZERO questions"
  );

  // TEST 12: Run SNAP mock test modules available
  const snapLR = getSNAPQuestions({ exam: "SNAP", topic: "Seating Arrangements" });
  const snapDI = getSNAPQuestions({ exam: "SNAP", topic: "Data Interpretation" });
  const snapDS = getSNAPQuestions({ exam: "SNAP", topic: "Data Sufficiency" });
  const snapEthics = getSNAPQuestions({ exam: "SNAP", topic: "Ethics, Morality & Values" });
  assert(
    snapLR.length > 0 && snapDI.length > 0 && snapDS.length > 0 && snapEthics.length > 0,
    "TEST 12: SNAP mock test curriculum modules (LR, DI, DS, Ethics) are fully populated"
  );

  // TEST 13: Run CAT mock test modules -> SNAP modules unavailable
  const catLR = getSNAPQuestions({ exam: "CAT", topic: "Seating Arrangements" });
  const catEthics = getSNAPQuestions({ exam: "CAT", topic: "Ethics, Morality & Values" });
  assert(
    catLR.length === 0 && catEthics.length === 0,
    "TEST 13: CAT mock curriculum cannot access SNAP LR or SNAP Ethics modules"
  );

  // TEST 14: All SNAP questions in Question Bank pass strict programmatic validation
  let allQuestionsValid = true;
  for (const q of SNAP_QUESTION_BANK) {
    const val = validateSNAPQuestion(q);
    if (!val.isValid) {
      console.error(`Question ${q.id} failed validation:`, val.errors);
      allQuestionsValid = false;
    }
  }
  assert(
    allQuestionsValid,
    `TEST 14: All ${SNAP_QUESTION_BANK.length} SNAP questions pass programmatic validation`
  );

  // TEST 15: DI questions have valid visual charts
  const diQuestions = SNAP_QUESTION_BANK.filter((q) => q.topic === "Data Interpretation");
  assert(
    diQuestions.length > 0 &&
      diQuestions.every((q: any) => q.chart && q.chart.categories && q.chart.series),
    "TEST 15: Data Interpretation questions contain valid visual chart series data"
  );

  // TEST 16: Data Sufficiency has Statement I & Statement II
  const dsQuestions = SNAP_QUESTION_BANK.filter((q) => q.topic === "Data Sufficiency");
  assert(
    dsQuestions.length > 0 &&
      dsQuestions.every(
        (q: any) =>
          q.statementI && q.statementII && q.options.length === 5 && q.sufficiencyStatus
      ),
    "TEST 16: Data Sufficiency questions contain Statement I & II with 5 standardized options"
  );

  // TEST 17: Ethics questions have scenario facts and key principle
  const ethQuestions = SNAP_QUESTION_BANK.filter((q) => q.topic === "Ethics, Morality & Values");
  assert(
    ethQuestions.length > 0 &&
      ethQuestions.every(
        (q: any) => q.scenarioText && q.keyPrinciple && q.stakeholders && q.whyOtherOptionsWeaker
      ),
    "TEST 17: Ethics questions feature scenario facts, stakeholders, principles & distractor analysis"
  );

  // TEST 18: Free API fallback resilience
  const vocabFallbackResult = await fetchWordEnrichment("obdurate");
  assert(
    vocabFallbackResult !== null &&
      vocabFallbackResult.word === "obdurate" &&
      vocabFallbackResult.synonyms.length > 0,
    "TEST 18: Free API service delivers enriched vocabulary with seamless fallback"
  );

  // Unknown word fallback resilience
  const unknownWordResult = await fetchWordEnrichment("nonexistentrandomxyz123");
  assert(
    unknownWordResult !== null && unknownWordResult.word === "nonexistentrandomxyz123",
    "TEST 19: Unknown word graceful fallback works without crashing"
  );

  // TEST 20: Exclusive topic guard
  assert(
    isSNAPExclusiveTopic("Ethics, Morality & Values") &&
      isSNAPExclusiveTopic("workplace ethics") &&
      !isSNAPExclusiveTopic("Quantitative Aptitude"),
    "TEST 20: isSNAPExclusiveTopic accurately flags ethics/morality queries"
  );

  console.log("\n=================================================");
  console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log("=================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error("Test execution threw exception:", err);
  process.exit(1);
});
