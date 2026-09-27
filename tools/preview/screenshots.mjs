// Capture full-page screenshots of every public page (desktop + mobile).
// Usage: node tools/preview/screenshots.mjs [outDir] [--only=/,/tarifs] [--dark]
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

// Logo CDNs (svgl.app, simpleicons) may be unreachable from sandboxes:
// serve equivalent brand marks from the `simple-icons` package instead.
const require = createRequire(import.meta.url);
let icons = {};
try {
  icons = require("simple-icons");
} catch {}
const slugAlias = { drive: "googledrive", "google-calendar": "googlecalendar", "google-meet": "googlemeet",
  "google-sheets": "googlesheets", "whatsapp-icon": "whatsapp", "instagram-icon": "instagram",
  "asana-logo": "asana", "mistral-ai_logo": "mistralai", hugging_face: "huggingface",
  "nvidia-icon-light": "nvidia", "langchain-logo": "langchain", anthropic_black: "anthropic", gemini: "googlegemini" };
function logoSvg(url) {
  const last = decodeURIComponent(url.split("/").slice(-2).join("/"));
  let slug = url.includes("simpleicons") ? last.split("/")[0] : last.split("/").pop().replace(/\.svg$/, "");
  slug = slugAlias[slug] ?? slug;
  const key = "si" + slug.charAt(0).toUpperCase() + slug.slice(1).replace(/[^a-z0-9]/gi, "");
  const icon = icons[key];
  if (!icon) return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#15151e"/></svg>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#${icon.hex}" d="${icon.path}"/></svg>`;
}

const args = process.argv.slice(2);
const outDir = path.resolve(args.find((a) => !a.startsWith("--")) ?? "screenshots/current");
const only = args.find((a) => a.startsWith("--only="))?.slice(7).split(",");
const base = process.env.PREVIEW_URL ?? "http://127.0.0.1:4173";
const pages = only ?? [
  "/", "/services", "/tarifs", "/equipe", "/gabin", "/faq", "/contact",
  "/automatisation-workflow", "/mentions-legales", "/connexion", "/page-inexistante",
];
const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 },
];

fs.mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch({
  // Use a system Chromium when available (cloud sandboxes), else Playwright's own.
  executablePath: process.env.CHROMIUM_PATH ?? (fs.existsSync("/opt/pw-browsers/chromium") ? "/opt/pw-browsers/chromium" : undefined),
});
for (const vp of viewports) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    isMobile: vp.isMobile,
    deviceScaleFactor: vp.deviceScaleFactor ?? 1,
    reducedMotion: "no-preference",
  });
  // Hide the cookie banner so it doesn't cover content.
  await ctx.addInitScript(() => {
    try {
      localStorage.setItem(
        "lexnotis_cookie_consent",
        JSON.stringify({ necessary: true, preferences: false, analytics: false, marketing: false, timestamp: new Date().toISOString() }),
      );
    } catch {}
  });
  await ctx.route(/svgl\.app|cdn\.simpleicons\.org/, (route) =>
    route.fulfill({ contentType: "image/svg+xml", body: logoSvg(route.request().url()) }),
  );
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const p of pages) {
    await page.goto(base + p, { waitUntil: "networkidle" }).catch(() => {});
    // Scroll through the page so IntersectionObserver reveals fire.
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.5;
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
        window.scrollTo({ top: y, behavior: "instant" });
        await new Promise((r) => setTimeout(r, 90));
      }
      window.scrollTo({ top: 0, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 400));
    });
    await page.waitForTimeout(1200);
    // Above-the-fold capture too (what visitors see first).
    const first = (p === "/" ? "home" : p.slice(1).replace(/\//g, "_")) + `-${vp.name}-fold.png`;
    await page.screenshot({ path: path.join(outDir, first) });
    const name = (p === "/" ? "home" : p.slice(1).replace(/\//g, "_")) + `-${vp.name}.png`;
    await page.screenshot({ path: path.join(outDir, name), fullPage: true });
    console.log("saved", name);
  }
  if (errors.length) console.log(`[${vp.name}] page errors:`, [...new Set(errors)]);
  await ctx.close();
}
await browser.close();
