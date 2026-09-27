// Screenshot each <section> (and the footer) of one page at full resolution.
// Usage: node tools/preview/sections.mjs /route outDir [width]
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
const [route = "/", out = "screenshots/sections", w = "1440"] = process.argv.slice(2);
const base = process.env.PREVIEW_URL ?? "http://127.0.0.1:4173";
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH ?? (fs.existsSync("/opt/pw-browsers/chromium") ? "/opt/pw-browsers/chromium" : undefined),
});
const ctx = await browser.newContext({ viewport: { width: +w, height: 900 }, deviceScaleFactor: +w < 600 ? 2 : 1 });
await ctx.addInitScript(() => localStorage.setItem("lexnotis_cookie_consent", JSON.stringify({ necessary: true, timestamp: "x" })));
await ctx.route(/svgl\.app|cdn\.simpleicons\.org/, (r) => r.fulfill({ contentType: "image/svg+xml", body: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#bbb"/></svg>' }));
const page = await ctx.newPage();
page.on("pageerror", (e) => console.log("pageerror:", e.message));
await page.goto(base + route, { waitUntil: "networkidle" });
await page.evaluate(async () => {
  for (let y = 0; y < document.documentElement.scrollHeight; y += 400) {
    window.scrollTo({ top: y, behavior: "instant" });
    await new Promise((r) => setTimeout(r, 80));
  }
});
await page.waitForTimeout(1500);
const els = await page.$$("main section, footer");
let i = 0;
for (const el of els) {
  const box = await el.boundingBox();
  if (!box || box.height < 40) continue;
  // skip nested sections
  const nested = await el.evaluate((n) => !!n.parentElement?.closest("main section"));
  if (nested) continue;
  await el.screenshot({ path: path.join(out, `${String(i++).padStart(2, "0")}.png`) });
}
console.log("saved", i, "sections to", out);
await browser.close();
