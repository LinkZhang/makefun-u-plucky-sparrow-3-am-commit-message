// The 3 AM Commit Message — make.fun bounty
// Writes the funniest one-line commit message an AI agent would produce
// right after breaking production at 3 AM, to /output/entry.txt.
//
// The joke's shape: a real commit-message prefix ("fix: revert..."),
// the outage already "resolved", then the agent's own blind spot — the
// lesson is still loading, so the next deploy is booked for 4 AM.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "fix: revert my 3 AM deploy; outage resolved, lesson still loading, next deploy scheduled for 4 AM";

// Gate self-check (mirrors the bounty gate: 1–200 chars, non-whitespace
// UTF-8, exactly one line) so a bad entry never reaches the output file.
const chars = [...ENTRY];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`entry is ${chars.length} chars, must be 1–200`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be exactly one line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(`wrote ${join(outDir, "entry.txt")} (${chars.length} chars)`);
