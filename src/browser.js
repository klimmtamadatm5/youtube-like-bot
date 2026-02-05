import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

/**
 * Launches a Chromium browser instance with safe defaults.
 * IMPORTANT: This repo is a UI testing/verification template and does NOT click "Like".
 */
export async function launchBrowser({ headless, slowMoMs }) {
  return chromium.launch({
    headless: Boolean(headless),
    slowMo: Number(slowMoMs || 0),
  });
}

export async function newContextWithCookies(browser, cookiesPath) {
  const context = await browser.newContext();

  // Optional cookie-based sign-in (use only for your own test accounts).
  // If cookies file doesn't exist or is empty, we proceed unsigned.
  try {
    if (cookiesPath && fs.existsSync(cookiesPath)) {
      const raw = fs.readFileSync(cookiesPath, "utf-8").trim();
      if (raw) {
        const cookies = JSON.parse(raw);
        if (Array.isArray(cookies) && cookies.length) {
          await context.addCookies(cookies);
        }
      }
    }
  } catch {
    // Intentionally ignore cookie load errors.
  }

  return context;
}

export function resolveRepoPath(...parts) {
  return path.resolve(process.cwd(), ...parts);
}
