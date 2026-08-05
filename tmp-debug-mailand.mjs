import { chromium } from "playwright";
import { writeFileSync } from "fs";
import { join } from "path";

const base = "c:\\Users\\Michael\\Desktop\\MW Guides\\mw-guides-master-ap0071\\mw-guides";
const url = "http://localhost:3000/explore-trips/mailand-unlimited#konzept";

const allRequests = [];
const allFailed = [];

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

page.on("request", (r) => {
  if (r.url().includes("concept-illustration") || r.url().includes("konzept")) {
    allRequests.push({ url: r.url(), method: r.method(), resourceType: r.resourceType() });
  }
});
page.on("requestfailed", (r) => {
  if (r.url().includes("concept-illustration")) {
    allFailed.push({ url: r.url(), failure: r.failure()?.errorText });
  }
});
page.on("response", (r) => {
  if (r.url().includes("concept-illustration")) {
    allRequests.push({ url: r.url(), status: r.status(), type: "response" });
  }
});

await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForSelector("#konzept img", { timeout: 15000 });

const preloads = await page.evaluate(() =>
  Array.from(document.querySelectorAll('link[rel="preload"]'))
    .filter((l) => l.href?.includes("concept") || l.getAttribute("imagesrcset")?.includes("concept"))
    .map((l) => ({ href: l.href, imagesrcset: l.getAttribute("imagesrcset")?.slice(0, 120) }))
);

const imgBefore = await page.evaluate(() => {
  const img = document.querySelector("#konzept img");
  return img ? { src: img.src, naturalWidth: img.naturalWidth, complete: img.complete } : null;
});

await page.waitForTimeout(2000);

// Force fetch the image src directly
const forceLoad = await page.evaluate(async () => {
  const img = document.querySelector("#konzept img");
  if (!img) return { error: "no img" };
  const src = img.getAttribute("src");
  try {
    const res = await fetch(src);
    const blob = await res.blob();
    const objectUrl = URL.createObjectURL(blob);
    return new Promise((resolve) => {
      const testImg = new Image();
      testImg.onload = () =>
        resolve({
          fetchStatus: res.status,
          blobSize: blob.size,
          testNaturalWidth: testImg.naturalWidth,
          testNaturalHeight: testImg.naturalHeight,
        });
      testImg.onerror = () => resolve({ fetchStatus: res.status, blobSize: blob.size, testError: true });
      testImg.src = objectUrl;
    });
  } catch (e) {
    return { error: String(e) };
  }
});

const imgAfter = await page.evaluate(() => {
  const img = document.querySelector("#konzept img");
  return img ? { naturalWidth: img.naturalWidth, complete: img.complete, currentSrc: img.currentSrc } : null;
});

await page.locator("#konzept").screenshot({ path: join(base, "tmp-konzept-final-screenshot.png") });

console.log(JSON.stringify({ preloads, imgBefore, forceLoad, imgAfter, allRequests, allFailed }, null, 2));
await browser.close();
