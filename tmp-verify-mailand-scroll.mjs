import { chromium } from "playwright";
import { join } from "path";

const base = "c:\\Users\\Michael\\Desktop\\MW Guides\\mw-guides-master-ap0071\\mw-guides";

async function verifyMailand(page) {
  const conceptRequests = [];
  page.on("response", (r) => {
    if (r.url().includes("mailand-concept-illustration")) {
      conceptRequests.push({ url: r.url(), status: r.status() });
    }
  });

  // Load without hash first, then scroll
  await page.goto("http://localhost:3000/explore-trips/mailand-unlimited", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await page.locator("#konzept").scrollIntoViewIfNeeded();
  await page.waitForTimeout(2000);

  await page
    .waitForFunction(() => {
      const img = document.querySelector("#konzept img");
      return img && img.naturalWidth > 0;
    }, { timeout: 8000 })
    .catch(() => null);

  const imgState = await page.evaluate(() => {
    const img = document.querySelector("#konzept img");
    return img
      ? {
          naturalWidth: img.naturalWidth,
          complete: img.complete,
          currentSrc: img.currentSrc,
          clientWidth: img.clientWidth,
        }
      : null;
  });

  await page.locator("#konzept").screenshot({ path: join(base, "tmp-konzept-final-screenshot.png") });

  const visible = imgState && imgState.naturalWidth > 0;
  return {
    imgState,
    conceptNetworkRequests: conceptRequests,
    checks: {
      illustrationVisible: visible,
      naturalWidthGtZero: imgState?.naturalWidth > 0,
      networkRequested: conceptRequests.length > 0,
    },
    pass: visible && conceptRequests.length > 0,
  };
}

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const result = await verifyMailand(page);
console.log(JSON.stringify({ ...result, verdict: result.pass ? "PASS" : "FAIL" }, null, 2));
await browser.close();
