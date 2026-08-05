import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const errors = [];
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });

await page.goto("http://localhost:3000/explore-trips/mailand-unlimited#konzept", {
  waitUntil: "domcontentloaded",
  timeout: 60000,
});
await page.waitForTimeout(2000);

const debug = await page.evaluate(() => {
  const imgs = document.querySelectorAll("#konzept img");
  const section = document.getElementById("konzept");
  return {
    imgCount: imgs.length,
    imgs: Array.from(imgs).map((img) => ({
      alt: img.alt,
      naturalWidth: img.naturalWidth,
      currentSrc: img.currentSrc,
      parentOpacity: getComputedStyle(img.closest("[style*='opacity']") || img).opacity,
    })),
    sectionHTML: section?.innerHTML.slice(0, 300),
  };
});

// Try manually triggering srcset selection
const afterManual = await page.evaluate(() => {
  const img = document.querySelector("#konzept img");
  if (!img) return null;
  const srcset = img.getAttribute("srcset");
  const firstSrc = srcset?.split(",")[0]?.trim().split(" ")[0];
  if (firstSrc) img.src = firstSrc;
  return { assignedSrc: firstSrc, naturalWidth: img.naturalWidth };
});

await page.waitForTimeout(1500);

const afterWait = await page.evaluate(() => {
  const img = document.querySelector("#konzept img");
  return img ? { naturalWidth: img.naturalWidth, currentSrc: img.currentSrc, complete: img.complete } : null;
});

console.log(JSON.stringify({ debug, afterManual, afterWait, errors }, null, 2));
await browser.close();
