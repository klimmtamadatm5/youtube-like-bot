import fs from "node:fs";
import path from "node:path";
import { launchBrowser, newContextWithCookies, resolveRepoPath } from "./browser.js";
import { assertDryRun, humanDelay, withRetries } from "./safeguards.js";

const CONFIG_PATH = resolveRepoPath("config", "runtime.config.json");
const LOG_PATH = resolveRepoPath("logs", "execution.log");
const COOKIES_PATH = resolveRepoPath("sessions", "cookies.store.json");

function log(line) {
  const stamp = new Date().toISOString();
  const out = `[${stamp}] ${line}`;
  console.log(out);
  fs.mkdirSync(path.dirname(LOG_PATH), { recursive: true });
  fs.appendFileSync(LOG_PATH, out + "\n", "utf-8");
}

async function verifyLikeButtonState(page) {
  // We only verify that the Like button exists and is reachable.
  // We do NOT click it.
  const likeButton = page.locator("button[aria-label*='like' i], #segmented-like-button button");
  const count = await likeButton.count();
  if (count === 0) {
    throw new Error("Could not find a Like button on the page (DOM may have changed).");
  }
  // Read a stable attribute for debugging.
  const first = likeButton.first();
  const aria = await first.getAttribute("aria-label");
  return { found: true, ariaLabel: aria || "" };
}

async function run() {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8"));
  assertDryRun(config.mode);

  const browser = await launchBrowser(config);
  const context = await newContextWithCookies(browser, COOKIES_PATH);
  const page = await context.newPage();
  page.setDefaultTimeout(Number(config.timeoutMs || 45000));

  try {
    for (const url of config.videos || []) {
      await withRetries(async (attempt) => {
        log(`Open video: ${url} (attempt ${attempt + 1})`);
        await page.goto(url, { waitUntil: "domcontentloaded" });

        // Light wait for UI hydration
        await humanDelay(config.minDelayMs, config.maxDelayMs);

        const state = await verifyLikeButtonState(page);
        log(`Verified Like button presence. aria-label="${state.ariaLabel}"`);

        // Additional safe checks
        const title = await page.title();
        log(`Page title: ${title}`);

        // Throttle between videos
        await humanDelay(config.minDelayMs, config.maxDelayMs);
      }, { retries: Number(config.maxRetries || 2) });
    }

    log("Completed dry-run verification.");
  } finally {
    await context.close().catch(() => {});
    await browser.close().catch(() => {});
  }
}

run().catch((err) => {
  log(`ERROR: ${err?.message || String(err)}`);
  process.exitCode = 1;
});
