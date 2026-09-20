import { runFullVARCValidation } from "../src/lib/varc/validator";

console.log("Starting full VARC validation run...");
const report = runFullVARCValidation();
console.log("Validation Result:", {
  isValid: report.isValid,
  totalPassages: report.totalPassages,
  totalRCQuestions: report.totalRCQuestions,
  totalVAQuestions: report.totalVAQuestions,
  totalConcepts: report.totalConcepts,
  errorCount: report.errors.length,
  warningCount: report.warnings.length,
});

if (report.errors.length > 0) {
  console.error("ERRORS DETECTED:");
  report.errors.forEach((e) => console.error(" - " + e));
  process.exit(1);
} else {
  console.log("ALL VARC CONTENT VALIDATED SUCCESSFULLY!");
}
