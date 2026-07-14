import { EvidenceSection, ProductModelSection, SourcePromptSection, UseCaseSection } from "../../../components/CaseStudySections";
import { DetailFooter, DetailHeader, SectionLabel, SiteFooter, SiteHeader } from "../../../components/SiteChrome";

const LUMEN_LIVE_URL = "https://lumen.100ai.design";

const prompt = `Design a dark, cinematic interactive micro-journey product.

Product goal: help a user reset emotionally in sixty seconds by discovering a hidden landscape.
Visual language: near-black interface, thin technical grid, warm editorial typography, one adaptive acid accent, restrained analog grain.
Layout: narrative statement on the left; a large 16:9 interactive image stage on the right; compact progress and coordinate metadata; destination card revealed only after exploration.
Interaction: a soft circular light follows the pointer with inertia, cuts through a blurred dark-glass mask, records explored regions, then unlocks destination context, postcard download, and quote copy actions.
Typography: neutral grotesk for UI, high-contrast serif italic for emotional emphasis, monospaced micro-labels for system status.
Motion: slow, weighted, atmospheric; no bouncy easing and no decorative animation without feedback value.
Use cases: travel discovery, meditation, art archive, premium editorial storytelling, immersive portfolio.
Avoid: generic dashboard chrome, neon cyberpunk overload, glass cards everywhere, oversized gradients, fake metrics, excessive copy.`;

const originalComponentExcerpt = `'use client'

const values = {
  LERP_SPEED: 0.18,
  RADIUS_LERP_SPEED: 0.13,
  MAX_RADIUS: responsiveRadius,
  SOFT_EDGE: responsiveSoftEdge,
}

// Smooth the pointer and radius with requestAnimationFrame.
setLerpedPos(previous => ({
  x: previous.x + (mousePos.x - previous.x) * values.LERP_SPEED,
  y: previous.y + (mousePos.y - previous.y) * values.LERP_SPEED,
}))

// Cut a soft circular opening through a blurred dark overlay.
const maskStyle = {
  WebkitMaskImage: radialGradientMask,
  maskImage: radialGradientMask,
}

// Touch follows the finger directly; mouse movement keeps inertia.
<div onMouseMove={handleMouseMove} onTouchMove={handleTouchMove} />`;

export default function LumenDesignPage() {
  return (
    <>
      <SiteHeader context="detail" />
      <main className="detail-page">
        <DetailHeader designId="001" liveUrl={LUMEN_LIVE_URL} />
        <section className="detail-hero">
          <div className="detail-title"><p><span className="status-dot" /> LIVE · IMMERSIVE EXPERIENCE</p><h1>Lumen<br /><em>Micro Journey</em></h1><p>A sixty-second emotional reset built around discovering an unknown landscape with light. The reveal does more than decorate: it powers the explore, unlock, and take-away loop.</p></div>
          <a className="lumen-showcase" href={LUMEN_LIVE_URL} target="_blank" rel="noreferrer">
            <div className="lumen-grid" /><div className="lumen-light" /><span>LUMEN</span><h2>Take one minute.<br />Go <em>somewhere else.</em></h2><b>ENTER EXPERIENCE ↗</b>
          </a>
        </section>

        <ProductModelSection
          problem="A beautiful reveal effect had no reason to continue."
          promise="Turn one minute of attention into a small emotional reset by letting the user discover an unknown landscape rather than passively view it."
          outcome="The user leaves with a downloadable postcard, a copied quote, and a next destination."
          loop={[
            { label: "CHOOSE", title: "Name the need", description: "Escape, reset, or recharge gives the interaction an emotional entry point." },
            { label: "EXPLORE", title: "Move with light", description: "A weighted beam reveals the landscape while a spatial grid records meaningful movement." },
            { label: "UNLOCK", title: "Earn the context", description: "Destination, coordinates, and editorial copy appear only after exploration is complete." },
            { label: "TAKE AWAY", title: "Keep something useful", description: "Download a designed postcard, copy the quote, or continue to another place." },
          ]}
        />

        <section className="dna-section">
          <SectionLabel index="02" title="STYLE DNA" meta="VISUAL + BEHAVIORAL RULES" />
          <div className="dna-grid">
            <article><small>COLOR</small><h3>Near-black with one acid accent</h3><p>Low-saturation darkness creates immersion; a single scene-aware accent communicates state.</p></article>
            <article><small>TYPE</small><h3>System sans meets emotional serif</h3><p>Neutral sans-serif handles function. High-contrast italic serif appears only on emotional language.</p></article>
            <article><small>SPACE</small><h3>Narrative and experience stay separate</h3><p>The left side explains why. The right side lets the user immediately discover how.</p></article>
            <article><small>MOTION</small><h3>Slow movement with physical weight</h3><p>Pointer tracking carries inertia; the mask opens and closes more slowly than a typical hover state.</p></article>
            <article><small>DETAIL</small><h3>Metadata creates credibility</h3><p>Coordinates, progress, indexing, and grids make the experience feel like a real exploration tool.</p></article>
            <article><small>LOOP</small><h3>Explore, unlock, take away</h3><p>A completion condition and a useful result turn the visual effect into a product loop.</p></article>
          </div>
        </section>

        <SourcePromptSection
          title={<>Turn an effect into<br /><em>callable product rules.</em></>}
          description="The original component explains how the light behaves. The optimized prompt explains why the interaction exists, what the user completes, and which design decisions another AI should preserve."
          source={{
            kind: "OWNER-SUPPLIED COMPONENT",
            title: "ImageHover",
            attribution: "21st.dev reference supplied by the project owner",
            attributionUrl: "https://21st.dev",
            description: "A 208-line React and Tailwind component used as the initial technical reference for the responsive pointer-following image mask.",
            content: originalComponentExcerpt,
            copyLabel: "COPY SOURCE EXCERPT",
            facts: ["Responsive 70px to 140px reveal radius", "Pointer interpolation at 0.18", "Radius interpolation at 0.13", "Direct touch tracking", "Multi-stop mask and screen-blended glow"],
          }}
          prompt={prompt}
          promptStatus={{ version: "DRAFT V0.1", state: "BLIND REPRODUCTION PENDING", note: "The product, build, copy, and download loop are verified. The prompt has not yet generated a fresh project without access to the reference implementation." }}
          transformations={[
            { label: "PRESERVED", title: "The physical behavior", description: "Responsive radius, weighted pointer movement, direct touch input, the feathered mask, and the soft glow remain the interaction signature." },
            { label: "ADDED", title: "A reason to interact", description: "Mood choice, nine destinations, exploration progress, earned context, postcard download, quote copy, and continuation turn the effect into a product." },
            { label: "ABSTRACTED", title: "Rules beyond one stack", description: "The optimized prompt separates product goal, visual grammar, layout, motion, and limits from the original React and Tailwind implementation." },
          ]}
        />

        <UseCaseSection
          useCases={["Destination and travel discovery", "Meditation, breathing, and emotional reset tools", "Galleries, photography archives, and portfolios", "Immersive storytelling for premium brands", "Product launches that benefit from discovery"]}
          avoidCases={["High-frequency tables and admin systems", "Utilities designed for rapid scanning", "Promotion-heavy or discount-led landing pages", "Content-heavy experiences on weak devices", "Projects without high-quality visual material"]}
        />

        <EvidenceSection
          validation={[
            { label: "LIVE PRODUCT", value: "VERIFIED", state: "passed" },
            { label: "RESPONSIVE BUILD", value: "PASSED", state: "passed" },
            { label: "DOWNLOAD + COPY", value: "IMPLEMENTED", state: "documented" },
            { label: "PROMPT STRUCTURE", value: "DOCUMENTED", state: "documented" },
            { label: "BLIND PROMPT TEST", value: "PENDING", state: "pending" },
          ]}
          sourceNote={<>The original image-reveal component was supplied by the project owner and attributed to <a href="https://21st.dev" target="_blank" rel="noreferrer">21st.dev ↗</a>. The exact component page should be added when available. The collection and distribution model also references 21st.dev.</>}
          reuseBoundary="Reuse the interaction physics, product loop, layout logic, and documented style rules. Do not treat the Lumen name, destination copy, or finished interface as a template to duplicate verbatim."
        />
        <DetailFooter designId="001" />
      </main>
      <SiteFooter progressText="001 / 100 · OPEN DESIGN LAB · 2026" />
    </>
  );
}
