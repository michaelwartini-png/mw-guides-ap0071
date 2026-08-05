import { chromium } from "playwright";
import { writeFileSync } from "fs";
import { join } from "path";

const base = "c:\\Users\\Michael\\Desktop\\MW Guides\\mw-guides-master-ap0071\\mw-guides";

async function verifyTrip(page, slug, expectedSrcPart, screenshotName) {
  const conceptRequests = [];
  const handler = (r) => {
    if (r.url().includes("concept-illustration")) {
      conceptRequests.push({ url: r.url(), status: r.status() });
    }
  };
  page.on("response", handler);

  const url = `http://localhost:3000/explore-trips/${slug}#konzept`;
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.evaluate(() => location.reload());
  await page.waitForLoadState("domcontentloaded");
  await page.waitForSelector("#konzept img", { timeout: 15000 });
  await page.waitForTimeout(2000);

  await page
    .waitForFunction(
      () => {
        const img = document.querySelector("#konzept img");
        return img && img.naturalWidth > 0;
      },
      { timeout: 8000 }
    )
    .catch(() => null);

  const imgState = await page.evaluate((expected) => {
    const img = document.querySelector("#konzept img");
    if (!img) return { found: false };
    const src = img.getAttribute("src") || "";
    return {
      found: true,
      alt: img.alt,
      src,
      isDirectPath: src.includes(expected) && !src.includes("_next/image"),
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      complete: img.complete,
      currentSrc: img.currentSrc,
      clientWidth: img.clientWidth,
      clientHeight: img.clientHeight,
    };
  }, expectedSrcPart);

  const screenshotPath = join(base, screenshotName);
  await page.locator("#konzept").screenshot({ path: screenshotPath });
  page.off("response", handler);

  const visible = imgState.found && imgState.naturalWidth > 0 && imgState.clientWidth > 0;
  const pass =
    slug === "mailand-unlimited"
      ? visible && imgState.naturalWidth > 0 && imgState.isDirectPath
      : visible && imgState.naturalWidth > 0;

  return {
    slug,
    screenshotPath,
    imgState,
    conceptNetworkRequests: conceptRequests,
    naturalWidth: imgState.naturalWidth ?? 0,
    pass,
    verdict: pass ? "PASS" : "FAIL",
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
  "/images/explore-trips/mailand-concept-illustration.png",
  "tmp-konzept-verified.png"
);
const bodensee = await verifyTrip(
  page,
  "bodensee",
  "/images/explore-trips/bodensee-concept-illustration.png",
  "tmp-bodensee-verified.png"
);

const result = { mailand, bodensee };
writeFileSync(join(base, "tmp-verified-result.json"), JSON.stringify(result, null, 2));
console.log(JSON.stringify(result, null, 2));
await browser.close();
