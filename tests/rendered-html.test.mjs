import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("home and both live design details render the collection shell", async () => {
  const responses = await Promise.all([render(), render("/designs/001-lumen"), render("/designs/002-tasteprint")]);
  for (const response of responses) assert.equal(response.status, 200);
  const [home, lumen, tasteprint] = await Promise.all(responses.map((response) => response.text()));
  for (const html of [home, lumen, tasteprint]) {
    assert.match(html, /100 AI Designs home/);
    assert.match(html, /GITHUB/);
    assert.match(html, /Inspired by the discovery model/);
  }
  assert.match(home, /href="\/designs\/002-tasteprint"/);
  assert.match(home, /Tasteprint/);
  for (const detail of [lumen, tasteprint]) {
    assert.match(detail, /STYLE DNA/);
    assert.match(detail, /REUSABLE PROMPT/);
    assert.match(detail, /WHEN TO USE/);
    assert.match(detail, /OPEN LIVE EXPERIENCE/);
  }
  assert.match(tasteprint, /tasteprint\.100ai\.design/);
});

test("the legacy case2 route redirects to the canonical 002 detail", async () => {
  const response = await render("/case2");
  assert.ok([307, 308].includes(response.status));
  assert.equal(new URL(response.headers.get("location"), "http://localhost").pathname, "/designs/002-tasteprint");
});

test("002 has a complete registry, documentation, standalone site, and local assets", async () => {
  const [registry, manifestSource, prompt, readme, detail, standalone, css, sitemap] = await Promise.all([
    readFile(new URL("../data/designs.ts", import.meta.url), "utf8"),
    readFile(new URL("../designs/002-tasteprint/manifest.json", import.meta.url), "utf8"),
    readFile(new URL("../designs/002-tasteprint/prompt.md", import.meta.url), "utf8"),
    readFile(new URL("../designs/002-tasteprint/README.md", import.meta.url), "utf8"),
    readFile(new URL("../app/designs/002-tasteprint/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../designs/002-tasteprint/site/src/TasteprintApp.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/sitemap.ts", import.meta.url), "utf8"),
  ]);
  const manifest = JSON.parse(manifestSource);
  assert.deepEqual(
    { id: manifest.id, slug: manifest.slug, status: manifest.status, live_url: manifest.live_url, detail_path: manifest.detail_path },
    { id: "002", slug: "002-tasteprint", status: "live", live_url: "https://tasteprint.100ai.design", detail_path: "/designs/002-tasteprint" },
  );
  assert.match(registry, /id: "002".*status: "live".*href: "\/designs\/002-tasteprint"/);
  assert.match(prompt, /Product goal/);
  assert.match(prompt, /Use cases/);
  assert.match(prompt, /Avoid/);
  assert.match(readme, /Product loop/);
  assert.match(detail, /<SiteHeader context="detail"/);
  assert.match(detail, /<DetailHeader designId="002"/);
  assert.match(detail, /<DetailFooter designId="002"/);
  assert.match(detail, /<SiteFooter progressText="002 \/ 100/);
  assert.doesNotMatch(standalone, /images\.unsplash\.com/);
  assert.match(css, /preview-tasteprint/);
  assert.match(sitemap, /designs\/002-tasteprint/);

  const assetNames = ["quiet-voltage", "concrete-poem", "soft-rebellion", "night-signal", "after-rain", "open-structure", "useful-warmth", "human-system"];
  await Promise.all([
    access(new URL("../public/previews/tasteprint.svg", import.meta.url)),
    access(new URL("../designs/002-tasteprint/site/package.json", import.meta.url)),
    ...assetNames.map((name) => access(new URL(`../designs/002-tasteprint/site/public/art/${name}.svg`, import.meta.url))),
  ]);
});

test("analytics, canonical origin, and normative shell contract remain intact", async () => {
  const [chrome, analytics, layout, system] = await Promise.all([
    readFile(new URL("../components/SiteChrome.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/Analytics.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../docs/UI-SYSTEM.md", import.meta.url), "utf8"),
  ]);
  assert.match(chrome, /INDEX ↓/);
  assert.match(analytics, /plausible\.io\/js\/pa-UKHPOgtl5DpjdFoJV1-4s\.js/);
  assert.match(analytics, /G-J1NT8LJ9JQ/);
  assert.match(analytics, /xkt1ed2duv/);
  assert.match(layout, /https:\/\/100ai\.design/);
  assert.match(system, /Status: normative/);
});
