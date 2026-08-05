import { chromium } from "playwright";
import { writeFileSync } from "fs";
import { join } from "path";

const url = "http://localhost:3000/explore-trips/mailand-unlimited#konzept";
const screenshotPath = join(process.cwd(), "tmp-konzept-screenshot.png");

const consoleMessages = [];
const conceptRequests = [];

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

page.on("console", (msg) => consoleMessages.push({ type: msg.type(), text: msg.text() }));
page.on("response", (r) => {
  if (r.url().includes("mailand-concept-illustration")) {
    conceptRequests.push({ url: r.url(), status: r.status() });
  }
});

await page.goto(url, { waitUntil: "load", timeout: 60000 });
await page.waitForTimeout(2000);

const imgStateBefore = await page.evaluate(() => {
  const img = document.querySelector("#konzept img");
  return img ? { naturalWidth: img.naturalWidth, complete: img.complete, loading: img.loading } : null;
});

// Wait up to 3s for lazy image to load naturally
await page
  .waitForFunction(
    () => {
      const img = document.querySelector("#konzept img");
      return img && img.naturalWidth > 0;
    },
    { timeout: 3000 }
  )
  .catch(() => null);

const imgStateAfter = await page.evaluate(() => {
  const img = document.querySelector("#konzept img");
  return img
    ? {
        src: img.getAttribute("src"),
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        complete: img.complete,
        loading: img.loading,
      }
    : null;
});

await page.locator("#konzept").screenshot({ path: screenshotPath });

const result = {
  screenshotPath,
  imgStateBefore,
  imgStateAfter,
  conceptNetworkRequests: conceptRequests,
  conceptImageStatus: conceptRequests[0]?.status ?? "NOT_REQUESTED",
  consoleErrors: consoleMessages.filter((m) => m.type === "error"),
  nextImageErrors: consoleMessages.filter(
    (m) => m.type === "error" && /next\/image|mailand-concept/i.test(m.text)
  ),
  illustrationVisible: !!(imgStateAfter && imgStateAfter.naturalWidth > 0),
  illustrationEmpty: !imgStateAfter || imgStateAfter.naturalWidth === 0,
};

writeFileSync(join(process.cwd(), "tmp-konzept-result.json"), JSON.stringify(result, null, 2));
console.log(JSON.stringify(result, null, 2));

await browser.close();
