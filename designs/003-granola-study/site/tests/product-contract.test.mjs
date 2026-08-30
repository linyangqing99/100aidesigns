import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("the standalone study builds with canonical metadata", async () => {
  const [html, config] = await Promise.all([
    readFile(new URL("dist/index.html", root), "utf8"),
    readFile(new URL("vercel.json", root), "utf8"),
  ]);
  assert.match(html, /Granola Homepage Study/);
  assert.match(html, /canonical/);
  assert.match(config, /"framework": "vite"/);
});

test("the study boundary and responsive modes are part of the rendered product", async () => {
  const [source, css] = await Promise.all([
    readFile(new URL("src/GranolaStudyApp.tsx", root), "utf8"),
    readFile(new URL("src/GranolaStudy.module.css", root), "utf8"),
  ]);
  assert.doesNotMatch(source, /Independent study\. Not affiliated with Granola\./);
  assert.doesNotMatch(source, /View source|Source website/);
  assert.match(source, /Afterword/);
  assert.match(source, /aria-label="Primary navigation"/);
  assert.match(source, /aria-expanded=/);
  assert.match(source, /IntersectionObserver/);
  assert.match(source, /@phosphor-icons\/react/);
  assert.match(source, /Team stand-ups/);
  assert.match(source, /Ask your meetings/);
  assert.match(source, /Waveform/);
  assert.match(source, /Transcribing/);
  assert.match(source, /heroTypedLine/);
  assert.doesNotMatch(source, /enhancedNotes/);
  assert.doesNotMatch(source, /addEventListener\(["']scroll/);
  assert.match(css, /@media \(max-width: 760px\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /@media \(prefers-color-scheme: dark\)/);
  assert.match(css, /min-height: 100dvh/);
  assert.match(css, /animation-timeline:\s*scroll/);
  assert.match(css, /headerPillIn/);
  assert.match(css, /sceneBackdropScroll/);
  assert.match(css, /animation-range:\s*42dvh 126dvh/);
  assert.match(css, /Newsreader Variable/);
  assert.match(css, /DM Sans Variable/);
  assert.doesNotMatch(source, /—|–/);
});

test("all public visuals are original local assets", async () => {
  await Promise.all([
    access(new URL("public/assets/hero-notes.png", root)),
    access(new URL("public/assets/before-call.png", root)),
    access(new URL("public/assets/after-call.png", root)),
  ]);
  const source = await readFile(new URL("src/GranolaStudyApp.tsx", root), "utf8");
  assert.doesNotMatch(source, /granola\.ai\/_next\/image/);
  assert.doesNotMatch(source, /images\.unsplash\.com/);
});
