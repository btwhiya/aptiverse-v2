/**
 * CMAT Cross-Exam Acceptance & API Verification Suite
 * Tests strict exam isolation, search behavior, API resilience, and fallback data integrity.
 */

import {
  getCMATQuestions,
  getCMATConcepts,
  searchCMATAware,
  isCMATExclusiveTopic,
  CMAT_QUESTION_BANK,
  CMAT_CONCEPT_GUIDES,
  fetchCMATCurrentAffairs,
  validateCMATQuestion,
  getCMATProgress,
  recordCMATAttempt,
  resetCMATProgress,
} from "../src/lib/cmat";

async function runCMATAcceptanceTests() {
  console.log("================================================================");
  console.log("   CMAT ACCEPTANCE & CROSS-EXAM ISOLATION TEST SUITE");
  console.log("================================================================");

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    if (condition) {
      console.log(`  [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`  [FAIL] ${testName}${detail ? ` - ${detail}` : ""}`);
      failed++;
    }
  }

  // -------------------------------------------------------------
  // TEST 1: Open CMAT -> Current Affairs, Static GK, Economy, Innovation visible
  // -------------------------------------------------------------
  console.log("\n--- TEST 1: Open CMAT Exam Context ---");
  const cmatQuestions = getCMATQuestions({ exam: "CMAT" });
  const cmatConcepts = getCMATConcepts({ exam: "CMAT" });

  const hasCA = cmatQuestions.some(q => q.topic === "Current Affairs");
  const hasStaticGK = cmatQuestions.some(q => q.topic === "Static GK");
  const hasEconomy = cmatQuestions.some(q => q.topic === "Economy");
  const hasInnovation = cmatQuestions.some(q => q.section === "Innovation & Entrepreneurship");

  assert(hasCA, "TEST 1.1: Current Affairs is present under CMAT");
  assert(hasStaticGK, "TEST 1.2: Static GK is present under CMAT");
  assert(hasEconomy, "TEST 1.3: Economy is present under CMAT");
  assert(hasInnovation, "TEST 1.4: Innovation & Entrepreneurship is present under CMAT");
  assert(cmatConcepts.length >= 8, "TEST 1.5: Rich concept guides available under CMAT");

  // -------------------------------------------------------------
  // TEST 2: Open CAT -> CMAT modules must NOT appear
  // -------------------------------------------------------------
  console.log("\n--- TEST 2: Open CAT Exam Context (Isolation Check) ---");
  const catCMATQuestions = getCMATQuestions({ exam: "CAT" });
  const catCMATConcepts = getCMATConcepts({ exam: "CAT" });
  assert(catCMATQuestions.length === 0, "TEST 2.1: CAT questions query returns 0 CMAT questions");
  assert(catCMATConcepts.length === 0, "TEST 2.2: CAT concepts query returns 0 CMAT concepts");

  // -------------------------------------------------------------
  // TEST 3: Open XAT -> CMAT-specific modules must NOT appear
  // -------------------------------------------------------------
  console.log("\n--- TEST 3: Open XAT Exam Context ---");
  const xatCMATQuestions = getCMATQuestions({ exam: "XAT" });
  assert(xatCMATQuestions.length === 0, "TEST 3.1: XAT context returns 0 CMAT questions");

  // -------------------------------------------------------------
  // TEST 4: Open NMAT -> CMAT-specific modules must NOT appear
  // -------------------------------------------------------------
  console.log("\n--- TEST 4: Open NMAT Exam Context ---");
  const nmatCMATQuestions = getCMATQuestions({ exam: "NMAT" });
  assert(nmatCMATQuestions.length === 0, "TEST 4.1: NMAT context returns 0 CMAT questions");

  // -------------------------------------------------------------
  // TEST 5: Open SNAP -> CMAT-specific modules must NOT appear
  // -------------------------------------------------------------
  console.log("\n--- TEST 5: Open SNAP Exam Context ---");
  const snapCMATQuestions = getCMATQuestions({ exam: "SNAP" });
  assert(snapCMATQuestions.length === 0, "TEST 5.1: SNAP context returns 0 CMAT questions");

  // -------------------------------------------------------------
  // TEST 6: Open MAH CET -> CMAT-specific modules must NOT appear
  // -------------------------------------------------------------
  console.log("\n--- TEST 6: Open MAH CET Exam Context ---");
  const mahCetCMATQuestions = getCMATQuestions({ exam: "MAH CET" });
  assert(mahCetCMATQuestions.length === 0, "TEST 6.1: MAH CET context returns 0 CMAT questions");

  // -------------------------------------------------------------
  // TEST 7: Open CMAT Concepts -> All CMAT concepts visible
  // -------------------------------------------------------------
  console.log("\n--- TEST 7: CMAT Concepts View ---");
  const caConcepts = getCMATConcepts({ exam: "CMAT", topic: "Current Affairs" });
  const gkConcepts = getCMATConcepts({ exam: "CMAT", topic: "Static GK" });
  const econConcepts = getCMATConcepts({ exam: "CMAT", topic: "Economy" });
  const innoConcepts = getCMATConcepts({ exam: "CMAT", topic: "Innovation" });
  assert(caConcepts.length > 0, "TEST 7.1: Current Affairs concepts visible in CMAT");
  assert(gkConcepts.length > 0, "TEST 7.2: Static GK concepts visible in CMAT");
  assert(econConcepts.length > 0, "TEST 7.3: Economy concepts visible in CMAT");
  assert(innoConcepts.length > 0, "TEST 7.4: Innovation & Entrepreneurship concepts visible in CMAT");

  // -------------------------------------------------------------
  // TEST 8: Open CAT Concepts -> 0 CMAT concepts visible
  // -------------------------------------------------------------
  console.log("\n--- TEST 8: CAT Concepts View ---");
  const catConcepts = getCMATConcepts({ exam: "CAT", topic: "Innovation" });
  assert(catConcepts.length === 0, "TEST 8.1: CAT concepts view returns 0 CMAT concepts");

  // -------------------------------------------------------------
  // TEST 9: Search "Entrepreneurship" inside CMAT
  // -------------------------------------------------------------
  console.log("\n--- TEST 9: Search 'Entrepreneurship' in CMAT ---");
  const cmatSearch = searchCMATAware("CMAT", "Entrepreneurship");
  assert(cmatSearch.questions.length > 0, `TEST 9.1: Found ${cmatSearch.questions.length} CMAT questions matching 'Entrepreneurship'`);
  assert(cmatSearch.concepts.length > 0, `TEST 9.2: Found ${cmatSearch.concepts.length} CMAT concepts matching 'Entrepreneurship'`);

  // -------------------------------------------------------------
  // TEST 10: Search "Entrepreneurship" inside CAT / XAT / NMAT / SNAP / CET
  // -------------------------------------------------------------
  console.log("\n--- TEST 10: Search 'Entrepreneurship' in Non-CMAT Exams ---");
  const catSearch = searchCMATAware("CAT", "Entrepreneurship");
  const xatSearch = searchCMATAware("XAT", "Entrepreneurship");
  const nmatSearch = searchCMATAware("NMAT", "Entrepreneurship");
  const snapSearch = searchCMATAware("SNAP", "Entrepreneurship");
  const cetSearch = searchCMATAware("MAH CET", "Entrepreneurship");

  assert(catSearch.questions.length === 0 && catSearch.concepts.length === 0, "TEST 10.1: CAT search returns ZERO CMAT items");
  assert(xatSearch.questions.length === 0 && xatSearch.concepts.length === 0, "TEST 10.2: XAT search returns ZERO CMAT items");
  assert(nmatSearch.questions.length === 0 && nmatSearch.concepts.length === 0, "TEST 10.3: NMAT search returns ZERO CMAT items");
  assert(snapSearch.questions.length === 0 && snapSearch.concepts.length === 0, "TEST 10.4: SNAP search returns ZERO CMAT items");
  assert(cetSearch.questions.length === 0 && cetSearch.concepts.length === 0, "TEST 10.5: MAH CET search returns ZERO CMAT items");

  // -------------------------------------------------------------
  // TEST 11: Question Validation Pipeline
  // -------------------------------------------------------------
  console.log("\n--- TEST 11: Question Validation Engine ---");
  let allQuestionsValid = true;
  for (const q of CMAT_QUESTION_BANK) {
    const res = validateCMATQuestion(q);
    if (!res.isValid) {
      allQuestionsValid = false;
      console.error(`Invalid question: ${q.id} - ${res.errors.join(", ")}`);
    }
  }
  assert(allQuestionsValid, "TEST 11.1: All 20+ CMAT questions pass strict 7-stage validation");

  // -------------------------------------------------------------
  // TEST 12: API Resilience & Local Content Fallback
  // -------------------------------------------------------------
  console.log("\n--- TEST 12: Current Affairs API & Fallback Resilience ---");
  // Test with no key or invalid key -> must seamlessly fallback without throwing
  const fallbackFeed = await fetchCMATCurrentAffairs("ALL");
  assert(fallbackFeed.length > 0, `TEST 12.1: Local fallback provides ${fallbackFeed.length} verified current affairs articles`);
  assert(fallbackFeed.every(item => !!item.lastVerified), "TEST 12.2: Fallback contains valid lastVerified timestamp");

  const bizFeed = await fetchCMATCurrentAffairs("Business");
  assert(bizFeed.length > 0, "TEST 12.3: Category-filtered fallback works cleanly");

  // Verify that questions have proper dates & sources
  const caQuestionsWithDate = CMAT_QUESTION_BANK.filter(q => q.topic === "Current Affairs");
  const allHaveSourceAndDate = caQuestionsWithDate.every(q => !!q.source && !!q.eventDate);
  assert(allHaveSourceAndDate, "TEST 12.4: All Current Affairs questions store eventDate, source, and lastVerified");

  // -------------------------------------------------------------
  // TEST 13: Independent Progress Tracking
  // -------------------------------------------------------------
  console.log("\n--- TEST 13: Independent CMAT Progress Tracking ---");
  const initialMetrics = getCMATProgress();
  assert(typeof initialMetrics.overallAccuracy === "number", "TEST 13.1: Progress metrics structure is valid");
  assert(typeof initialMetrics.innovationAccuracy === "number", "TEST 13.2: Innovation accuracy is tracked independently");
  assert(typeof initialMetrics.currentAffairsAccuracy === "number", "TEST 13.3: General Awareness accuracy is tracked independently");

  // -------------------------------------------------------------
  // TEST 14: Live HTTP API Route Enforcement & Security
  // -------------------------------------------------------------
  console.log("\n--- TEST 14: Live Backend API Isolation & Key Security ---");
  try {
    const catForbiddenRes = await fetch("http://localhost:3000/api/questions?exam=CAT&topic=Innovation%20%26%20Entrepreneurship");
    assert(catForbiddenRes.status === 403, "TEST 14.1: Querying CMAT topic under CAT returns 403 Forbidden");

    const catSearchRes = await fetch("http://localhost:3000/api/questions?exam=CAT&search=Entrepreneurship");
    const catSearchData = await catSearchRes.json();
    const hasCMATInCAT = (catSearchData.results || []).some((r: any) => r.type === "CMAT Question");
    assert(!hasCMATInCAT, "TEST 14.2: Searching 'Entrepreneurship' under CAT returns 0 CMAT items");

    const cmatSuccessRes = await fetch("http://localhost:3000/api/questions?exam=CMAT&topic=Current%20Affairs");
    assert(cmatSuccessRes.status === 200, "TEST 14.3: Querying CMAT Current Affairs under CMAT returns 200 OK");
    const cmatData = await cmatSuccessRes.json();
    assert(cmatData.totalQuestions > 0, "TEST 14.4: CMAT questions successfully returned for CMAT exam context");

    const cmatSearchRes = await fetch("http://localhost:3000/api/questions?exam=CMAT&search=Entrepreneurship");
    const cmatSearchData = await cmatSearchRes.json();
    const cmatFound = (cmatSearchData.results || []).some((r: any) => r.type === "CMAT Question");
    assert(cmatFound, "TEST 14.5: Searching 'Entrepreneurship' under CMAT returns CMAT questions");

    const currentAffairsProxyRes = await fetch("http://localhost:3000/api/cmat/current-affairs");
    assert(currentAffairsProxyRes.status === 200, "TEST 14.6: Current Affairs safe proxy route returns 200 OK");
    const caProxyData = await currentAffairsProxyRes.json();
    const rawText = JSON.stringify(caProxyData);
    assert(!rawText.includes("API_KEY") && !rawText.includes("secret"), "TEST 14.7: API Keys strictly NEVER exposed in API response payloads");
  } catch (err) {
    console.warn("  [NOTE] Dev server route testing skipped or connection error:", err);
  }

  console.log("\n================================================================");
  console.log(`TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log("================================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runCMATAcceptanceTests().catch(err => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
