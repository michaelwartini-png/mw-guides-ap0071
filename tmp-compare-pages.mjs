import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

for (const slug of ["mailand-unlimited", "bodensee"]) {
  const requests = [];
  page.on("response", (r) => {
    if (r.url().includes("concept-illustration")) requests.push(r.url());
  });

  await page.goto(`http://localhost:3000/explore-trips/${slug}#konzept`, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await page.waitForTimeout(2500);

  const data = await page.evaluate(() => {
    const img = document.querySelector("#konzept img");
    const preloads = document.querySelectorAll('link[rel="preload"][as="image"]').length;
    return {
      img: img
        ? {
            src: img.getAttribute("src"),
            srcset: img.getAttribute("srcset")?.slice(0, 80),
            sizes: img.getAttribute("sizes"),
            naturalWidth: img.naturalWidth,
            complete: img.complete,
            currentSrc: img.currentSrc,
            outerHTML: img.outerHTML.slice(0, 400),
          }
        : null,
      preloadCount: preloads,
    };
  });

  console.log(`\n=== ${slug} ===`);
  console.log(JSON.stringify({ ...data, conceptRequests: requests.length }, null, 2));
  page.removeAllListeners("response");
}

await browser.close();
