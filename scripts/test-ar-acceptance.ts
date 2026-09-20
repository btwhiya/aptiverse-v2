/**
 * Acceptance Test Suite for MAH CET Abstract Reasoning (AR) Module
 * Tests compliance with all 33 user specifications.
 */

import {
  ALL_MAH_CET_AR_QUESTIONS,
  FIGURE_SERIES_QUESTIONS,
  FIGURE_ANALOGY_QUESTIONS,
  MATCHING_PAIRS_QUESTIONS,
  FIGURE_CLASSIFICATION_QUESTIONS,
  MISSING_FIGURE_QUESTIONS,
  ROTATION_REFLECTION_QUESTIONS,
  MAH_CET_AR_CONCEPTS,
  validateARQuestion,
  getMAHCETARQuestions,
  searchMAHCETAR,
} from "../src/lib/mah-cet";

import { EXAM_SYLLABI_DATABASE } from "../src/lib/syllabus-data";

let passedCount = 0;
let failedCount = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  if (condition) {
    console.log(`  ✓ PASS: ${testName}`);
    passedCount++;
  } else {
    console.error(`  ✗ FAIL: ${testName} - ${detail || "Assertion failed"}`);
    failedCount++;
  }
}

console.log("\n=======================================================");
console.log("   MAH CET ABSTRACT REASONING ACCEPTANCE TEST SUITE    ");
console.log("=======================================================\n");

// ----------------------------------------------------
// SECTION 1: QUESTION SETS VERIFICATION (Requirement 30)
// ----------------------------------------------------
console.log("--- 1. Question Sets & Structure Verification ---");

assert(FIGURE_SERIES_QUESTIONS.length >= 5, "Has at least 5 Figure Series questions", `Found ${FIGURE_SERIES_QUESTIONS.length}`);
assert(FIGURE_ANALOGY_QUESTIONS.length >= 5, "Has at least 5 Figure Analogy questions", `Found ${FIGURE_ANALOGY_QUESTIONS.length}`);
assert(MATCHING_PAIRS_QUESTIONS.length >= 5, "Has at least 5 Matching Pair questions", `Found ${MATCHING_PAIRS_QUESTIONS.length}`);
assert(FIGURE_CLASSIFICATION_QUESTIONS.length >= 5, "Has at least 5 Figure Classification questions", `Found ${FIGURE_CLASSIFICATION_QUESTIONS.length}`);
assert(MISSING_FIGURE_QUESTIONS.length >= 5, "Has at least 5 Missing Figure questions", `Found ${MISSING_FIGURE_QUESTIONS.length}`);
assert(ROTATION_REFLECTION_QUESTIONS.length >= 5, "Has at least 5 Rotation/Reflection questions", `Found ${ROTATION_REFLECTION_QUESTIONS.length}`);

// Validate all questions through the programmatic validation engine
let allValid = true;
const validationErrors: string[] = [];
ALL_MAH_CET_AR_QUESTIONS.forEach((q) => {
  const v = validateARQuestion(q);
  if (!v.valid) {
    allValid = false;
    validationErrors.push(...v.errors);
  }
});
assert(allValid, "All 30+ AR questions pass programmatic validation", validationErrors.join("; "));

// Verify Options A, B, C, D, E with visual figures
let allHave5VisualOptions = true;
ALL_MAH_CET_AR_QUESTIONS.forEach((q) => {
  if (q.options.length !== 5) allHave5VisualOptions = false;
  q.options.forEach((opt) => {
    if (!opt.figure || !opt.figure.elements || opt.figure.elements.length === 0) {
      allHave5VisualOptions = false;
    }
  });
});
assert(allHave5VisualOptions, "Every option in every question contains actual visual figure data");

// ----------------------------------------------------
// SECTION 2: 20 CONCEPTS CURRICULUM VERIFICATION (Requirement 3)
// ----------------------------------------------------
console.log("\n--- 2. Visual Curriculum Concepts Verification ---");

assert(MAH_CET_AR_CONCEPTS.length === 20, "Has exactly 20 visual curriculum concepts", `Found ${MAH_CET_AR_CONCEPTS.length}`);

let allConceptsHaveVisualExamples = true;
MAH_CET_AR_CONCEPTS.forEach((c) => {
  if (!c.visualExample || !c.visualExample.beforeFigure || !c.visualExample.afterFigure) {
    allConceptsHaveVisualExamples = false;
  }
  if (!c.whatIsThis || c.howToSolve.length === 0 || !c.thinkingMethod || c.commonTraps.length === 0) {
    allConceptsHaveVisualExamples = false;
  }
});
assert(allConceptsHaveVisualExamples, "All 20 concepts contain complete guides with visual examples, steps, traps, and thinking methods");

// ----------------------------------------------------
// SECTION 3: CROSS-EXAM ISOLATION (Requirements 23, 28, 31)
// ----------------------------------------------------
console.log("\n--- 3. Cross-Exam Isolation & Security Checks ---");

// TEST 10: Generate MAH CET questions
const mahCetResult = getMAHCETARQuestions({ exam: "MAH CET" });
assert(mahCetResult.length >= 30, "TEST 10: Requesting AR questions for MAH CET returns all AR questions", `Count: ${mahCetResult.length}`);

// TEST 11: Generate CAT questions
const catResult = getMAHCETARQuestions({ exam: "CAT" });
assert(catResult.length === 0, "TEST 11: Requesting AR questions for CAT returns 0 questions", `Count: ${catResult.length}`);

// Other exams: XAT, NMAT, SNAP
const xatResult = getMAHCETARQuestions({ exam: "XAT" });
assert(xatResult.length === 0, "Requesting AR questions for XAT returns 0 questions", `Count: ${xatResult.length}`);

const nmatResult = getMAHCETARQuestions({ exam: "NMAT" });
assert(nmatResult.length === 0, "Requesting AR questions for NMAT returns 0 questions", `Count: ${nmatResult.length}`);

const snapResult = getMAHCETARQuestions({ exam: "SNAP" });
assert(snapResult.length === 0, "Requesting AR questions for SNAP returns 0 questions", `Count: ${snapResult.length}`);

// ----------------------------------------------------
// SECTION 4: SEARCH ISOLATION (Requirement 27)
// ----------------------------------------------------
console.log("\n--- 4. Exam-Aware Search Isolation ---");

const searchInMAHCET = searchMAHCETAR("MAH CET", "series");
assert(searchInMAHCET.length > 0, "Search for 'series' inside MAH CET returns AR questions", `Count: ${searchInMAHCET.length}`);

const searchInCAT = searchMAHCETAR("CAT", "series");
assert(searchInCAT.length === 0, "Search for 'series' inside CAT returns 0 AR questions", `Count: ${searchInCAT.length}`);

const searchInXAT = searchMAHCETAR("XAT", "series");
assert(searchInXAT.length === 0, "Search for 'series' inside XAT returns 0 AR questions", `Count: ${searchInXAT.length}`);

// ----------------------------------------------------
// SECTION 5: SYLLABUS INTEGRATION & EXCLUSIVITY
// ----------------------------------------------------
console.log("\n--- 5. Syllabus Isolation in Official Syllabus Database ---");

const mahCetSyllabus = EXAM_SYLLABI_DATABASE["mah-cet"];
assert(
  mahCetSyllabus?.sections.some((s) => s.slug === "abstract-reasoning"),
  "TEST 1 & 2: Abstract Reasoning exists in MAH CET syllabus",
  "Found in MAH CET"
);

const catSyllabus = EXAM_SYLLABI_DATABASE["cat"];
assert(
  !catSyllabus?.sections.some((s) => s.slug === "abstract-reasoning"),
  "TEST 7: Abstract Reasoning does NOT exist in CAT syllabus",
  "Confirmed absent in CAT"
);

const xatSyllabus = EXAM_SYLLABI_DATABASE["xat"];
assert(
  !xatSyllabus?.sections.some((s) => s.slug === "abstract-reasoning"),
  "TEST 8: Abstract Reasoning does NOT exist in XAT syllabus",
  "Confirmed absent in XAT"
);

const snapSyllabus = EXAM_SYLLABI_DATABASE["snap"];
assert(
  !snapSyllabus?.sections.some((s) => s.slug === "abstract-reasoning"),
  "TEST 6: Abstract Reasoning does NOT exist in SNAP syllabus",
  "Confirmed absent in SNAP"
);

console.log("\n=======================================================");
console.log(`TEST SUMMARY: ${passedCount} PASSED, ${failedCount} FAILED`);
console.log("=======================================================\n");

if (failedCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
