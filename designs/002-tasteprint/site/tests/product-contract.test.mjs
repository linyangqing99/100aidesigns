import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("the production build and canonical metadata exist", async () => {
  const [html, config] = await Promise.all([
    readFile(new URL("dist/index.html", root), "utf8"),
    readFile(new URL("vercel.json", root), "utf8"),
  ]);
  assert.match(html, /Tasteprint/);
  assert.match(html, /canonical/);
  assert.match(config, /"framework": "vite"/);
});

test("the product keeps a closed loop and accessible dialog behavior", async () => {
  const source = await readFile(new URL("src/TasteprintApp.tsx", root), "utf8");
  assert.match(source, /Choose three visual studies/);
  assert.match(source, /READ MY TASTEPRINT/);
  assert.match(source, /COPY PROMPT/);
  assert.match(source, /role="dialog"/);
  assert.match(source, /event\.key === "Escape"/);
  assert.match(source, /triggerRef\.current\?\.focus/);
  assert.match(source, /aria-live="polite"/);
  assert.doesNotMatch(source, /images\.unsplash\.com/);
});

test("all eight visual studies are local assets and responsive motion rules exist", async () => {
  const names = ["quiet-voltage", "concrete-poem", "soft-rebellion", "night-signal", "after-rain", "open-structure", "useful-warmth", "human-system"];
  await Promise.all(names.map((name) => access(new URL(`public/art/${name}.svg`, root))));
  const css = await readFile(new URL("src/styles.css", root), "utf8");
  assert.match(css, /max-width: 980px/);
  assert.match(css, /max-width: 680px/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /min-width: 320px/);
});
