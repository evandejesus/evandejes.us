import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

const url = process.argv[2] || "http://localhost:3000";
const label = process.argv[3] || "";

const outDir = "./temporary screenshots";
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// Auto-increment screenshot number
const existing = fs.readdirSync(outDir).filter((f) => f.endsWith(".png"));
const nums = existing
  .map((f) => parseInt(f.match(/^screenshot-(\d+)/)?.[1] ?? "0"))
  .filter((n) => !isNaN(n));
const next = nums.length ? Math.max(...nums) + 1 : 1;

const filename = label
  ? `screenshot-${next}-${label}.png`
  : `screenshot-${next}.png`;
const outPath = path.join(outDir, filename);

const browser = await puppeteer.launch({
  headless: true,
  executablePath:
    "/Users/evandejesus/.cache/puppeteer/chrome/mac_arm-146.0.7680.153/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing",
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: "networkidle0" });
await page.screenshot({ path: outPath, fullPage: true });
await browser.close();

console.log(`Saved: ${outPath}`);
