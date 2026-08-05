import { chromium } from "playwright";
import { writeFileSync } from "fs";
import { join } from "path";

const base = "c:\\Users\\Michael\\Desktop\\MW Guides\\mw-guides-master-ap0071\\mw-guides";

async function verifyTrip(page, slug, imageSlug, screenshotPath) {
  const conceptRequests = [];
  const handler = (r) => {
    if (r.url().includes(imageSlug)) {
      conceptRequests.push({ url: r.url(), status: r.status() });
    }
  };
  page.on("response", handler);

  await page.goto(`http://localhost:3000/explore-trips/${slug}#konzept`, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await page.waitForSelector("#konzept img", { timeout: 15000 });
  await page.waitForTimeout(2000);

  await page
    .waitForFunction(
      () => {
        const img = document.querySelector("#konzept img");
        return img && img.naturalWidth > 0;
      },
      { timeout: 5000 }
    )
    .catch(() => null);

  const imgState = await page.evaluate(() => {
    const img = document.querySelector("#konzept img");
    if (!img) return { found: false };
    return {
      found: true,
      alt: img.alt,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      complete: img.complete,
      currentSrc: img.currentSrc,
      clientWidth: img.clientWidth,
      clientHeight: img.clientHeight,
    };
  });

  await page.locator("#konzept").screenshot({ path: screenshotPath });
  page.off("response", handler);

  const visible = imgState.found && imgState.naturalWidth > 0;
  return {
    slug,
    screenshotPath,
    imgState,
    conceptNetworkRequests: conceptRequests,
    checks: {
      illustrationVisible: visible,
      naturalWidthGtZero: imgState.naturalWidth > 0,
      networkRequested: conceptRequests.length > 0,
    },
    pass: visible && imgState.naturalWidth > 0,
  };
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  extraHTTPHeaders: { "Cache-Control": "no-cache", Pragma: "no-cache" },
});
const page = await context.newPage();

const mailand = await verifyTrip(
  page,
  "mailand-unlimited",
  "mailand-concept-illustration",
  join(base, "tmp-konzept-final-screenshot.png")
);
const bodensee = await verifyTrip(
  page,
  "bodensee",
  "bodensee-concept-illustration",
  join(base, "tmp-bodensee-konzept-screenshot.png")
);

const result = {
  mailand: { ...mailand, verdict: mailand.pass ? "PASS" : "FAIL" },
  bodensee: { ...bodensee, verdict: bodensee.pass ? "PASS" : "FAIL" },
};

writeFileSync(join(base, "tmp-konzept-final-result.json"), JSON.stringify(result, null, 2));
console.log(JSON.stringify(result, null, 2));
await browser.close();
