import type { Metadata } from "next";

import { EvidenceSection, ProductModelSection, SourcePromptSection, UseCaseSection } from "../../../components/CaseStudySections";
import { DetailFooter, DetailHeader, SectionLabel, SiteFooter, SiteHeader } from "../../../components/SiteChrome";

const TASTEPRINT_LIVE_URL = "https://tasteprint.100ai.design";

export const metadata: Metadata = {
  title: "002 Tasteprint | 100 AI Designs",
  description: "An editorial visual-direction product that turns three instinctive image choices into a reusable creative brief.",
  alternates: { canonical: "/designs/002-tasteprint" },
};

const prompt = `Design an editorial visual-direction product that turns instinctive image choices into a usable creative brief.

Product goal: help a founder, designer, or creator articulate visual taste without needing design vocabulary.
User loop: scan a deliberately varied image deck, focus one card at a time, keep exactly three instinctive choices, generate a deterministic tasteprint, then copy the resulting AI creative prompt.
Result: combine the selected cards into a direction name, five traits, a five-color palette, typography, composition, and motion rules, plus a reusable AI prompt.
Visual language: warm mineral paper, fine construction grid, ink-black typography, one safety-orange signal color, slightly rotated image cards, crisp rules, and restrained analog softness.
Layout: a centered editorial thesis above an asymmetric field of floating square cards; two instruction cards interrupt the composition; a persistent three-slot dock makes progress and the next action unmissable.
Interaction: hovering or focusing a card sharpens and enlarges it while other cards blur; clicking or pressing Space keeps it; selection order is numbered; shuffle changes every card position; the result opens as a large art-direction sheet.
Typography: an expressive old-style serif for thesis and direction names, disciplined sans for navigation, and compact monospaced labels for system state.
Motion: weighted focus transitions around 400ms, subtle image scale, and one modal entrance; no spring physics, bounce, or continuous decorative motion.
Accessibility: use native buttons, visible focus, an aria-live selection status, a focus-contained dialog with Escape support, touch-safe targets, and reduced-motion behavior.
Use cases: early brand discovery, campaign mood alignment, portfolio art direction, creative-team kickoff, and AI image or site prompting.
Avoid: production asset hotlinks, generic dashboard cards, purple gradients, opaque taste scores, faux AI analysis, tiny touch targets, motion-only state, and results without an actionable takeaway.`;

const originalComponentExcerpt = `export function InteractiveImageGallery({ items, className }) {
  const [hoveredId, setHoveredId] = React.useState<string | null>(null)

  return (
    <div className={cn(
      "relative min-h-screen flex flex-wrap justify-center items-center gap-8 p-10",
      className
    )}>
      {items.map((item) => item.type === "image" ? (
        <div
          key={item.id}
          className={cn(
            "relative transition-all duration-300 rounded-xl overflow-hidden",
            "hover:scale-105",
            hoveredId && hoveredId !== item.id
              ? "blur-sm opacity-50"
              : "opacity-100"
          )}
          onMouseEnter={() => setHoveredId(item.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <Image src={item.src} alt="gallery item" width={200} height={200} />
        </div>
      ) : (
        <Card key={item.id}>{item.text}</Card>
      ))}
    </div>
  )
}`;

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

        <ProductModelSection
          problem="A striking focus effect showed attention, but did not turn attention into a decision."
          promise="Let people express visual taste through instinctive choices first, then translate the overlap into language a creative team or AI can act on."
          outcome="The user leaves with a named direction, five traits, a palette, design rules, and a copyable creative prompt."
          loop={[
            { label: "BROWSE", title: "Read with the eye", description: "A deliberately varied field of visual studies invites recognition before explanation." },
            { label: "FOCUS", title: "Isolate one signal", description: "The active image sharpens and enlarges while the rest of the field recedes." },
            { label: "SELECT", title: "Commit to three", description: "A fixed three-slot constraint forces a useful pattern instead of an endless moodboard." },
            { label: "TRANSLATE", title: "Make taste reusable", description: "The chosen set becomes a direction sheet and prompt that can move into another workflow." },
          ]}
        />

        <section className="dna-section">
          <SectionLabel index="02" title="STYLE DNA" meta="VISUAL + BEHAVIORAL RULES" />
          <div className="dna-grid tasteprint-dna">
            <article><small>FOCUS</small><h3>Attention becomes the interface</h3><p>One image sharpens while the surrounding field blurs. The effect explains the choice instead of merely decorating the card.</p></article>
            <article><small>COLOR</small><h3>Mineral paper with one signal orange</h3><p>Ink and paper hold the workspace together. Orange appears only when instinct becomes an explicit selection or result.</p></article>
            <article><small>TYPE</small><h3>Editorial emotion, systematic evidence</h3><p>Old-style serif carries intuition. Sans and monospaced microtype keep steps, counts, and generated rules exact.</p></article>
            <article><small>SPACE</small><h3>A working table, not a component grid</h3><p>Cards rotate and overlap around a calm thesis, recreating the useful mess of an art director&apos;s selection surface.</p></article>
            <article><small>MOTION</small><h3>Weighted focus without performance</h3><p>Slow sharpening and scale establish hierarchy; touch and reduced-motion modes preserve the same product state without relying on animation.</p></article>
            <article><small>LOOP</small><h3>Choose, translate, reuse</h3><p>Three selections become a direction sheet and a copyable prompt, giving the visual exploration a concrete downstream action.</p></article>
          </div>
        </section>

        <SourcePromptSection
          title={<>Turn focus into<br /><em>callable direction.</em></>}
          description="The original component defines a visual focus state. The optimized prompt preserves that behavior, then adds a selection constraint, a deterministic result, accessibility rules, and a downstream creative action."
          source={{
            kind: "OWNER-SUPPLIED COMPONENT",
            title: "InteractiveImageGallery",
            attribution: "21st.dev reference supplied by the project owner",
            attributionUrl: "https://21st.dev",
            description: "A 245-line integration brief with a React, shadcn, and Tailwind gallery component. It enlarges the hovered image and blurs every non-active card.",
            content: originalComponentExcerpt,
            copyLabel: "COPY SOURCE EXCERPT",
            facts: ["Mixed image and text cards", "Hovered card scales to 105%", "Non-active cards blur and fade", "300ms focus transition", "Responsive flex-wrap composition"],
          }}
          prompt={prompt}
          promptStatus={{ version: "DRAFT V0.1", state: "BLIND REPRODUCTION PENDING", note: "The live product, build, selection loop, result sheet, and copy action are verified. The prompt has not yet generated a fresh project without the reference implementation." }}
          transformations={[
            { label: "PRESERVED", title: "The attention hierarchy", description: "One focused card stays sharp and slightly larger while the surrounding deck becomes secondary." },
            { label: "ADDED", title: "A decision and an output", description: "Exactly three selections unlock a direction name, traits, palette, design rules, and a prompt with a clear next action." },
            { label: "REBUILT", title: "The production interface", description: "The generic flex gallery became an art-director table with local artwork, selection state, shuffle, keyboard support, and a focus-contained result sheet." },
          ]}
        />

        <UseCaseSection
          useCases={["Early brand and visual identity discovery", "Campaign or launch mood alignment", "Creative-team kickoff workshops", "Portfolio and editorial art direction", "AI image, site, and campaign prompting"]}
          avoidCases={["Formal brand approval without a human designer", "Accessibility, compliance, or UX scoring", "High-volume asset tagging and DAM workflows", "Decisions that require audience research evidence", "Projects without distinct visual source material"]}
        />

        <EvidenceSection
          validation={[
            { label: "LIVE PRODUCT", value: "VERIFIED", state: "passed" },
            { label: "RESPONSIVE BUILD", value: "PASSED", state: "passed" },
            { label: "SELECTION + RESULT", value: "IMPLEMENTED", state: "documented" },
            { label: "KEYBOARD + TOUCH", value: "VERIFIED", state: "passed" },
            { label: "BLIND PROMPT TEST", value: "PENDING", state: "pending" },
          ]}
          sourceNote={<>The original interactive gallery component was supplied by the project owner and attributed to <a href="https://21st.dev" target="_blank" rel="noreferrer">21st.dev ↗</a>. The exact component page should be added when available. Its focus behavior was the starting point; the product loop, local artwork, result model, and final interface were created for this study.</>}
          reuseBoundary="Reuse the focus hierarchy, three-choice constraint, translation model, and documented style rules. Do not treat the Tasteprint name, local artwork, generated direction labels, or finished interface as assets to duplicate verbatim."
        />
        <DetailFooter designId="002" nextLabel="NEXT: QUIET SAAS →" />
      </main>
      <SiteFooter progressText="002 / 100 · OPEN DESIGN LAB · 2026" />
    </>
  );
}
