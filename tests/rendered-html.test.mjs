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

test("home and design detail render the shared collection shell", async () => {
  const [homeResponse, detailResponse] = await Promise.all([render(), render("/designs/001-lumen")]);
  assert.equal(homeResponse.status, 200);
  assert.equal(detailResponse.status, 200);
  const [home, detail] = await Promise.all([homeResponse.text(), detailResponse.text()]);
  for (const html of [home, detail]) {
    assert.match(html, /100 AI Designs home/);
    assert.match(html, /GITHUB/);
    assert.match(html, /Inspired by the discovery model/);
  }
  assert.match(detail, /STYLE DNA/);
  assert.match(detail, /REUSABLE PROMPT/);
  assert.match(detail, /OPEN LIVE EXPERIENCE/);
});

test("the collection contract and local preview assets are present", async () => {
  const [home, detail, chrome, css, system] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/designs/001-lumen/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/SiteChrome.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../docs/UI-SYSTEM.md", import.meta.url), "utf8"),
  ]);
  assert.match(home, /<SiteHeader/);
  assert.match(home, /<SiteFooter/);
  assert.match(detail, /<SiteHeader context="detail"/);
  assert.match(detail, /<DetailHeader/);
  assert.match(detail, /<DetailFooter/);
  assert.match(chrome, /INDEX ↓/);
  assert.match(system, /Status: normative/);
  assert.doesNotMatch(css, /https:\/\/images\.unsplash\.com/);
  await Promise.all([
    access(new URL("../public/previews/lumen.webp", import.meta.url)),
    access(new URL("../public/previews/editorial-mountain.webp", import.meta.url)),
  ]);
});
