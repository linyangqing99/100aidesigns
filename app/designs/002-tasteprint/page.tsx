import type { Metadata } from "next";

import { CopyPrompt } from "../../../components/CopyPrompt";
import { DetailFooter, DetailHeader, SectionLabel, SiteFooter, SiteHeader } from "../../../components/SiteChrome";

const TASTEPRINT_LIVE_URL = "https://tasteprint.100ai.design";

export const metadata: Metadata = {
  title: "002 Tasteprint — 100 AI Designs",
  description: "An editorial visual-direction product that turns three instinctive image choices into a reusable creative brief.",
  alternates: { canonical: "/designs/002-tasteprint" },
};

const prompt = `Design an editorial visual-direction product that turns instinctive image choices into a usable creative brief.

Product goal: help a founder, designer, or creator articulate visual taste without needing design vocabulary.
User loop: scan a deliberately varied image deck, focus one card at a time, keep exactly three instinctive choices, generate a deterministic tasteprint, then copy the resulting AI creative prompt.
Visual language: warm mineral paper, fine construction grid, ink-black typography, one safety-orange signal color, slightly rotated image cards, crisp rules, and restrained analog softness.
Layout: a centered editorial thesis above an asymmetric field of floating square cards; two instruction cards interrupt the composition; a persistent three-slot dock makes progress and the next action unmissable.
Interaction: hovering or focusing a card sharpens and enlarges it while other cards blur; clicking or pressing Space keeps it; selection order is numbered; shuffle changes every card position; the result opens as a large art-direction sheet.
Typography: an expressive old-style serif for thesis and direction names, disciplined sans for navigation, and compact monospaced labels for system state.
Motion: weighted focus transitions around 400ms, subtle image scale, and one modal entrance; no spring physics, bounce, or continuous decorative motion.
Accessibility: use native buttons, visible focus, an aria-live selection status, a focus-contained dialog with Escape support, touch-safe targets, and reduced-motion behavior.
Avoid: production asset hotlinks, generic dashboard cards, purple gradients, opaque taste scores, faux AI analysis, tiny touch targets, motion-only state, and results without an actionable takeaway.`;

export default function TasteprintDesignPage() {
  return (
    <>
      <SiteHeader context="detail" />
      <main className="detail-page">
        <DetailHeader designId="002" liveUrl={TASTEPRINT_LIVE_URL} />
        <section className="detail-hero">
          <div className="detail-title">
            <p><span className="status-dot" /> LIVE · IMMERSIVE &amp; EXPERIMENTAL</p>
            <h1>Tasteprint<br /><em>Visual Direction Lab</em></h1>
            <p>Choose three images before you can explain why. Tasteprint turns the pattern between them into traits, a palette, composition rules, motion guidance, and a prompt another AI can use.</p>
          </div>
          <a className="tasteprint-showcase" href={TASTEPRINT_LIVE_URL} target="_blank" rel="noreferrer" aria-label="Open the live Tasteprint product">
            <div className="tasteprint-mini-card tasteprint-card-a"><span>01</span><b>Quiet Voltage</b></div>
            <div className="tasteprint-mini-card tasteprint-card-b"><span>03</span><b>Soft Rebellion</b></div>
            <div className="tasteprint-mini-card tasteprint-card-c"><span>04</span><b>Night Signal</b></div>
            <div className="tasteprint-result-card"><small>YOUR SIGNAL</small><strong>3<em>/3</em></strong><p>Make instinct legible.</p></div>
            <div className="tasteprint-showcase-copy"><span>TASTEPRINT · CASE 002</span><h2>Your eye already knows.<br /><em>Make it legible.</em></h2><b>OPEN LIVE PRODUCT ↗</b></div>
          </a>
        </section>

        <section className="dna-section">
          <SectionLabel index="01" title="STYLE DNA" />
          <div className="dna-grid tasteprint-dna">
            <article><small>FOCUS</small><h3>Attention becomes the interface</h3><p>One image sharpens while the surrounding field blurs. The effect explains the choice instead of merely decorating the card.</p></article>
            <article><small>COLOR</small><h3>Mineral paper with one signal orange</h3><p>Ink and paper hold the workspace together. Orange appears only when instinct becomes an explicit selection or result.</p></article>
            <article><small>TYPE</small><h3>Editorial emotion, systematic evidence</h3><p>Old-style serif carries intuition. Sans and monospaced microtype keep steps, counts, and generated rules exact.</p></article>
            <article><small>SPACE</small><h3>A working table, not a component grid</h3><p>Cards rotate and overlap around a calm thesis, recreating the useful mess of an art director’s selection surface.</p></article>
            <article><small>MOTION</small><h3>Weighted focus without performance</h3><p>Slow sharpening and scale establish hierarchy; touch and reduced-motion modes preserve the same product state without relying on animation.</p></article>
            <article><small>LOOP</small><h3>Choose, translate, reuse</h3><p>Three selections become a direction sheet and a copyable prompt, giving the visual exploration a concrete downstream action.</p></article>
          </div>
        </section>

        <section className="prompt-section">
          <SectionLabel index="02" title="REUSABLE PROMPT" />
          <div className="prompt-layout">
            <div><h2>Turn instinct into<br /><em>callable direction.</em></h2><p>The prompt defines the audience, selection constraint, output structure, motion, accessibility, and anti-patterns needed to reproduce the product rather than just its floating-card effect.</p><CopyPrompt prompt={prompt} /></div>
            <pre>{prompt}</pre>
          </div>
        </section>

        <section className="usage-section">
          <SectionLabel index="03" title="WHEN TO USE" />
          <div className="usage-columns">
            <div><h3>Use it for</h3><ul><li>Early brand and visual identity discovery</li><li>Campaign or launch mood alignment</li><li>Creative-team kickoff workshops</li><li>Portfolio and editorial art direction</li><li>AI image, site, and campaign prompting</li></ul></div>
            <div><h3>Avoid it for</h3><ul><li>Formal brand approval without a human designer</li><li>Accessibility, compliance, or UX scoring</li><li>High-volume asset tagging and DAM workflows</li><li>Decisions that require audience research evidence</li><li>Projects without distinct visual source material</li></ul></div>
          </div>
        </section>

        <section className="source-note"><span>REFERENCE NOTE</span><p>The collection and distribution model references <a href="https://21st.dev" target="_blank" rel="noreferrer">21st.dev ↗</a>. Tasteprint’s product loop, local artwork, interface, and reusable prompt were created independently by 100 AI Designs.</p></section>
        <DetailFooter designId="002" nextLabel="NEXT: QUIET SAAS →" />
      </main>
      <SiteFooter progressText="002 / 100 · OPEN DESIGN LAB · 2026" />
    </>
  );
}
