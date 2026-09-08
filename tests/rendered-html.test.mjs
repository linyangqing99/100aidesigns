import assert from "node:assert/strict";
import { createHash } from "node:crypto";
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

test("home and all released design details render the collection shell", async () => {
  const responses = await Promise.all([
    render(),
    render("/designs/001-lumen"),
    render("/designs/002-tasteprint"),
    render("/designs/003-granola-study"),
    render("/designs/011-forgegui-study"),
    render("/designs/012-seaart-study"),
  ]);
  for (const response of responses) assert.equal(response.status, 200);
  const [home, lumen, tasteprint, granolaStudy, forgeguiStudy, seaartStudy] = await Promise.all(responses.map((response) => response.text()));
  for (const html of [home, lumen, tasteprint, granolaStudy, forgeguiStudy, seaartStudy]) {
    assert.match(html, /100 AI Designs home/);
    assert.match(html, /GITHUB/);
    assert.match(html, /Inspired by the discovery model/);
  }
  assert.match(home, /href="\/designs\/002-tasteprint"/);
  assert.match(home, /Tasteprint/);
  assert.match(home, /href="\/designs\/003-granola-study"/);
  assert.match(home, /Granola Homepage Study/);
  for (const detail of [lumen, tasteprint, granolaStudy, forgeguiStudy, seaartStudy]) {
    assert.match(detail, /PRODUCT MODEL/);
    assert.match(detail, /STYLE DNA/);
    assert.match(detail, /SOURCE &amp; PROMPT/);
    assert.match(detail, /ORIGINAL INPUT/);
    assert.match(detail, /OPTIMIZED PROMPT/);
    assert.match(detail, /WHEN TO USE/);
    assert.match(detail, /EVIDENCE &amp; REUSE/);
    assert.match(detail, /BLIND REPRODUCTION PENDING/);
  }
  for (const liveDetail of [lumen, tasteprint]) assert.match(liveDetail, /OPEN LIVE EXPERIENCE/);
  assert.match(lumen, /ImageHover/);
  assert.match(tasteprint, /InteractiveImageGallery/);
  assert.match(tasteprint, /tasteprint\.100ai\.design/);
  assert.match(granolaStudy, /granola\.ai/);
  assert.match(granolaStudy, /INDEPENDENT REPRODUCTION STUDY/);
  assert.match(granolaStudy, /OPEN REPLICA/);
  assert.match(forgeguiStudy, /forgegui\.com/);
  assert.match(home, /href="\/designs\/011-forgegui-study"/);
  assert.match(seaartStudy, /seaart\.ai\/zhCN/);
  assert.match(home, /href="\/designs\/012-seaart-study"/);
  assert.match(home, /SeaArt Homepage Study/);
  assert.match(home, /005 \/ 100/);
});

test("012 keeps the attributed Chinese specimen separate from its English collection case", async () => {
  const [detailResponse, registry, manifestSource, sitemap, prompt] = await Promise.all([
    render("/designs/012-seaart-study"),
    readFile(new URL("../data/designs.ts", import.meta.url), "utf8"),
    readFile(new URL("../designs/012-seaart-study/manifest.json", import.meta.url), "utf8"),
    readFile(new URL("../app/sitemap.ts", import.meta.url), "utf8"),
    readFile(new URL("../designs/012-seaart-study/prompt.md", import.meta.url), "utf8"),
  ]);
  assert.equal(detailResponse.status, 200);
  const detail = await detailResponse.text();
  assert.match(detail, /Independent study\. Not affiliated with SeaArt\./);
  assert.match(detail, /href="https:\/\/www\.seaart\.ai\/zhCN"/);
  assert.match(detail, /href="\/studies\/012-seaart-homepage"/);
  assert.match(detail, /OPEN REPLICA/);
  assert.match(detail, /SeaArt account access, payment, uploads, or AI generation/);
  assert.equal((detail.match(/<h1(?:\s[^>]*)?>/g) || []).length, 1);
  const manifest = JSON.parse(manifestSource);
  assert.deepEqual(
    {
      id: manifest.id,
      slug: manifest.slug,
      status: manifest.status,
      source_url: manifest.source_url,
      replica_path: manifest.replica_path,
      detail_path: manifest.detail_path,
      specimen_language: manifest.specimen_language,
      case_language: manifest.case_language,
    },
    {
      id: "012",
      slug: "012-seaart-study",
      status: "study",
      source_url: "https://www.seaart.ai/zhCN",
      replica_path: "/studies/012-seaart-homepage",
      detail_path: "/designs/012-seaart-study",
      specimen_language: "zh-CN",
      case_language: "en",
    },
  );
  assert.match(registry, /id: "012".*status: "study".*href: "\/designs\/012-seaart-study"/);
  assert.match(sitemap, /designs\/012-seaart-study/);
  assert.doesNotMatch(sitemap, /studies\/012-seaart-homepage/);
  assert.match(prompt, /Product goal/);
  assert.match(prompt, /Use cases/);
  assert.match(prompt, /Avoid/);
  assert.match(prompt, /blind reproduction test pending/);
});

test("003 exposes a runnable replica with attribution kept on the audit page", async () => {
  const [detailResponse, replicaResponse, registry, manifestSource, sitemap, appSource, studyCss] = await Promise.all([
    render("/designs/003-granola-study"),
    render("/studies/003-granola-homepage"),
    readFile(new URL("../data/designs.ts", import.meta.url), "utf8"),
    readFile(new URL("../designs/003-granola-study/manifest.json", import.meta.url), "utf8"),
    readFile(new URL("../app/sitemap.ts", import.meta.url), "utf8"),
    readFile(new URL("../designs/003-granola-study/site/src/GranolaStudyApp.tsx", import.meta.url), "utf8"),
    readFile(new URL("../designs/003-granola-study/site/src/GranolaStudy.module.css", import.meta.url), "utf8"),
  ]);

  assert.equal(detailResponse.status, 200);
  assert.equal(replicaResponse.status, 200);

  const [detail, replica] = await Promise.all([detailResponse.text(), replicaResponse.text()]);
  assert.match(detail, /Independent study\. Not affiliated with Granola\./);
  assert.match(detail, /https:\/\/www\.granola\.ai/);
  assert.doesNotMatch(replica, /Independent study\. Not affiliated with Granola\./);
  assert.doesNotMatch(replica, /View source|Source website/);
  assert.match(replica, /Afterword/);
  assert.match(replica, /The meeting memory for work that moves/);
  assert.match(replica, /Before the call/);
  assert.match(replica, /During the call/);
  assert.match(replica, /After the call/);
  assert.match(replica, /Perfect meeting memory/);
  assert.match(replica, /Team stand-ups/);
  assert.match(replica, /Ask your meetings/);
  assert.match(appSource, /IntersectionObserver/);
  assert.match(appSource, /@phosphor-icons\/react/);
  assert.doesNotMatch(appSource, /addEventListener\(["']scroll/);
  assert.match(studyCss, /animation-timeline:\s*scroll/);
  assert.match(studyCss, /Newsreader Variable/);
  assert.match(studyCss, /DM Sans Variable/);

  const manifest = JSON.parse(manifestSource);
  assert.deepEqual(
    {
      id: manifest.id,
      slug: manifest.slug,
      status: manifest.status,
      source_url: manifest.source_url,
      replica_path: manifest.replica_path,
      detail_path: manifest.detail_path,
    },
    {
      id: "003",
      slug: "003-granola-study",
      status: "study",
      source_url: "https://www.granola.ai/",
      replica_path: "/studies/003-granola-homepage",
      detail_path: "/designs/003-granola-study",
    },
  );
  assert.equal(manifest.source_snapshot_date, "2026-08-27");
  assert.equal(manifest.deployment_url, "https://100ai.design/studies/003-granola-homepage");
  assert.equal(manifest.deployment_date, "2026-08-30");
  assert.equal(manifest.replica_boundary, "structure-and-visual-rhythm-with-original-brand-and-assets");
  assert.match(registry, /id: "003".*status: "study".*href: "\/designs\/003-granola-study"/);
  assert.match(sitemap, /designs\/003-granola-study/);
  assert.match(sitemap, /studies\/003-granola-homepage/);
  assert.doesNotMatch(appSource, /granola\.ai\/_next\/image/);
  assert.doesNotMatch(appSource, /images\.unsplash\.com/);

  await Promise.all([
    access(new URL("../designs/003-granola-study/site/public/assets/hero-notes.png", import.meta.url)),
    access(new URL("../designs/003-granola-study/site/public/assets/before-call.png", import.meta.url)),
    access(new URL("../designs/003-granola-study/site/public/assets/after-call.png", import.meta.url)),
    access(new URL("../public/previews/granola-study.png", import.meta.url)),
  ]);
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
  assert.equal(manifest.source_type, "owner-supplied-component");
  assert.equal(manifest.source_attribution, "21st.dev");
  assert.equal(manifest.source_url_status, "exact-component-url-pending");
  assert.equal(manifest.prompt_status, "draft-blind-test-pending");
  assert.match(registry, /id: "002".*status: "live".*href: "\/designs\/002-tasteprint"/);
  assert.match(prompt, /Product goal/);
  assert.match(prompt, /Use cases/);
  assert.match(prompt, /Avoid/);
  assert.match(readme, /Product loop/);
  assert.match(detail, /<SiteHeader context="detail"/);
  assert.match(detail, /<DetailHeader designId="002"/);
  assert.match(detail, /<DetailFooter designId="002"/);
  assert.match(detail, /<SiteFooter progressText="002 \/ 100/);
  assert.match(detail, /OWNER-SUPPLIED COMPONENT/);
  assert.match(detail, /InteractiveImageGallery/);
  assert.match(detail, /Result: combine the selected cards/);
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

test("001 records the external source, optimized prompt state, and verified take-away actions", async () => {
  const [manifestSource, prompt, detail] = await Promise.all([
    readFile(new URL("../designs/001-lumen/manifest.json", import.meta.url), "utf8"),
    readFile(new URL("../designs/001-lumen/prompt.md", import.meta.url), "utf8"),
    readFile(new URL("../app/designs/001-lumen/page.tsx", import.meta.url), "utf8"),
  ]);
  const manifest = JSON.parse(manifestSource);
  assert.equal(manifest.source_type, "owner-supplied-component");
  assert.equal(manifest.source_attribution, "21st.dev");
  assert.equal(manifest.prompt_status, "draft-blind-test-pending");
  assert.match(prompt, /blind reproduction test pending/i);
  assert.match(prompt, /postcard download/);
  assert.match(prompt, /quote copy/);
  assert.match(detail, /ImageHover/);
  assert.match(detail, /OWNER-SUPPLIED COMPONENT/);
  assert.match(detail, /postcard download/);
  assert.match(detail, /quote copy/);
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
  assert.match(system, /Product Model/);
  assert.match(system, /Source & Prompt/);
  assert.match(system, /blind reproduction/i);
});


test("011 packages every source asset intact and isolates the static replica", async () => {
  const root = new URL("../public/studies/011-forgegui/", import.meta.url);
  const [manifestSource, document, script, detailResponse] = await Promise.all([
    readFile(new URL("../designs/011-forgegui-study/asset-manifest.json", import.meta.url), "utf8"),
    readFile(new URL("index.html", root), "utf8"),
    readFile(new URL("app.js", root), "utf8"),
    render("/designs/011-forgegui-study"),
  ]);
  assert.equal(detailResponse.status, 200);
  const detail = await detailResponse.text();
  assert.match(detail, /Independent study\. Not affiliated with ForgeGUI\./);
  assert.match(detail, /href="\/studies\/011-forgegui-homepage\?lang=en"/);
  assert.match(document, /<base href="\/studies\/011-forgegui\/">/);
  assert.match(document, /name="robots" content="noindex/);
  assert.doesNotMatch(document, /_next\/|<iframe|googletagmanager/);
  assert.doesNotMatch(script, /fetch\(|XMLHttpRequest|sendBeacon|localStorage|sessionStorage/);
  const assets = JSON.parse(manifestSource);
  assert.equal(assets.length, 25);
  for (const asset of assets) {
    const bytes = await readFile(new URL(asset.url.slice(1), root));
    assert.equal(bytes.length, asset.bytes, asset.url);
    assert.equal(createHash("sha256").update(bytes).digest("hex"), asset.sha256, asset.url);
  }
  await access(new URL("../public/previews/forgegui-study.webp", import.meta.url));
});
