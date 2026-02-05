/**
 * SAFE PLACEHOLDER SCRIPT
 * This repository intentionally does not implement "liking" actions.
 * Use this file as a starting point for compliant UI testing workflows
 * such as verifying UI elements on your own content.
 */
import { assertDryRun } from "../src/safeguards.js";

const mode = process.env.MODE || "dry-run";
assertDryRun(mode);

console.log("Dry-run only: likeVideo.js verifies structure but does not click Like.");
