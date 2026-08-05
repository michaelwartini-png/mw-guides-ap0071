import { chromium } from "playwright";
import { writeFileSync } from "fs";
import { join } from "path";

const base = "c:\\Users\\Michael\\Desktop\\MW Guides\\mw-guides-master-ap0071\\mw-guides";
const url = "http://localhost:3000/explore-trips/mailand-unlimited#konzept";
const screenshotPath = join(base, "tmp-konzept-fixed-screenshot.png");

const conceptRequests = [];

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

page.on("response", (r) => {
  if (r.url().includes("mailand-concept-illustration")) {
    conceptRequests.push({ url: r.url(), status: r.status() });
  }
});

const responsePromise = page.waitForResponse(
  (r) => r.url().includes("mailand-concept-illustration"),
  { timeout: 15000 }
).catch(() => null);

await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
const conceptResponse = await responsePromise;

await page.waitForTimeout(2000);

// Try decode() if still not loaded
await page.evaluate(async () => {
  const img = document.querySelector("#konzept img");
  if (img && img.naturalWidth === 0) {
    try {
      await img.decode();
    } catch {
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        const src = img.getAttribute("src");
        if (src) img.src = src;
      }).catch(() => null);
    }
  }
});

await page.waitForTimeout(1000);

const imgState = await page.evaluate(() => {
  const img = document.querySelector("#konzept img");
  if (!img) return { found: false };
  return {
    found: true,
    loadingAttr: img.getAttribute("loading"),
    fetchPriorityAttr: img.getAttribute("fetchpriority"),
    naturalWidth: img.naturalWidth,
    naturalHeight: img.naturalHeight,
    complete: img.complete,
    currentSrc: img.currentSrc,
  };
});

await page.locator("#konzept").screenshot({ path: screenshotPath });

const notLazy =
  imgState.loadingAttr !== "lazy" &&
  (imgState.loadingAttr === "eager" || imgState.fetchPriorityAttr === "high" || imgState.loadingAttr === null);

console.log(
  JSON.stringify(
    {
      screenshotPath,
      imgState,
      conceptResponse: conceptResponse
        ? { url: conceptResponse.url(), status: conceptResponse.status() }
        : null,
      conceptNetworkRequests: conceptRequests,
      fixWorked: imgState.found && imgState.naturalWidth > 0,
      illustrationVisible: imgState.found && imgState.naturalWidth > 0,
      naturalWidthGtZero: imgState.naturalWidth > 0,
      notLazy,
    },
    null,
    2
  )
);

await browser.close();
