import { DILR_TOPICS, generateDILRSet } from "./registry";
import { validateDILRSet } from "./solver";

console.log("=== Running DILR Generators Diagnostic Suite ===");

let totalTested = 0;
let totalPassed = 0;
const failures: string[] = [];

for (const topic of DILR_TOPICS) {
  for (const diff of ["MODERATE", "CAT", "CAT_HARD"] as const) {
    totalTested++;
    try {
      const set = generateDILRSet(topic.id, diff);
      const val = validateDILRSet(set);
      if (val.valid) {
        totalPassed++;
      } else {
        failures.push(`[${topic.id} - ${diff}] Errors: ${val.errors.join(", ")}`);
      }
    } catch (err: any) {
      failures.push(`[${topic.id} - ${diff}] Exception: ${err.message}`);
    }
  }
}

console.log(`Diagnostic Complete: ${totalPassed}/${totalTested} Passed.`);
if (failures.length > 0) {
  console.error("Failures detected:", failures);
  process.exit(1);
} else {
  console.log("ALL 13 DILR GENERATORS VALIDATED WITH 100% INTEGRITY!");
  process.exit(0);
}
