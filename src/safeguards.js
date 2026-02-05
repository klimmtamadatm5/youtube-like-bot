/**
 * Guardrails to keep this repository compliant and safe.
 * - Default behaviour is DRY-RUN (verification only).
 * - Any "like" action is blocked at runtime by design.
 */

export function assertDryRun(mode) {
  const normalized = String(mode || "").toLowerCase();
  if (normalized !== "dry-run") {
    throw new Error(
      "Safety block: This template only supports 'dry-run' verification mode. " +
      "It will not perform engagement actions like likes or comment likes."
    );
  }
}

export function randInt(min, max) {
  const a = Math.ceil(min);
  const b = Math.floor(max);
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

export async function humanDelay(minDelayMs, maxDelayMs) {
  const ms = randInt(Number(minDelayMs || 800), Number(maxDelayMs || 2000));
  await new Promise((r) => setTimeout(r, ms));
}

export async function withRetries(fn, { retries = 2 } = {}) {
  let lastErr;
  for (let i = 0; i <= retries; i++) {
    try {
      return await fn(i);
    } catch (err) {
      lastErr = err;
      if (i === retries) break;
    }
  }
  throw lastErr;
}
