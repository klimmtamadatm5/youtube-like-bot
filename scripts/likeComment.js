/**
 * SAFE PLACEHOLDER SCRIPT
 * This repository intentionally does not implement comment-like actions.
 * It can be used to verify comments UI is present for testing purposes.
 */
import fs from "node:fs";
import { launchBrowser, newContextWithCookies, resolveRepoPath } from "../src/browser.js";
import { assertDryRun, humanDelay } from "../src/safeguards.js";

const CONFIG_PATH = resolveRepoPath("config", "runtime.config.json");
const COOKIES_PATH = resolveRepoPath("sessions", "cookies.store.json");

async function run() {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8"));
  assertDryRun(config.mode);

  const browser = await launchBrowser(config);
  const context = await newContextWithCookies(browser, COOKIES_PATH);
  const page = await context.newPage();
  page.setDefaultTimeout(Number(config.timeoutMs || 45000));

  try {
    const url = (config.videos || [])[0];
    if (!url) throw new Error("No video URL configured.");

    await page.goto(url, { waitUntil: "domcontentloaded" });
    await humanDelay(config.minDelayMs, config.maxDelayMs);

    // Verify that comments are reachable (no engagement actions).
    const commentsHeader = page.locator("ytd-comments-header-renderer");
    await commentsHeader.first().waitFor({ state: "visible", timeout: 20000 });

    const likeBtn = page.locator(config.commentSelectors?.firstCommentLikeButton || "ytd-comment-action-buttons-renderer #like-button");
    const count = await likeBtn.count();
    console.log(`Dry-run verification: found ${count} comment-like button element(s).`);
  } finally {
    await context.close().catch(() => {});
    await browser.close().catch(() => {});
  }
}

run().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
