import { CopyPrompt } from "../../../components/CopyPrompt";
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

        <section className="dna-section">
          <SectionLabel index="01" title="STYLE DNA" />
          <div className="dna-grid">
            <article><small>COLOR</small><h3>Near-black with one acid accent</h3><p>Low-saturation darkness creates immersion; a single scene-aware accent communicates state.</p></article>
            <article><small>TYPE</small><h3>System sans meets emotional serif</h3><p>Neutral sans-serif handles function. High-contrast italic serif appears only on emotional language.</p></article>
            <article><small>SPACE</small><h3>Narrative and experience stay separate</h3><p>The left side explains why. The right side lets the user immediately discover how.</p></article>
            <article><small>MOTION</small><h3>Slow movement with physical weight</h3><p>Pointer tracking carries inertia; the mask opens and closes more slowly than a typical hover state.</p></article>
            <article><small>DETAIL</small><h3>Metadata creates credibility</h3><p>Coordinates, progress, indexing, and grids make the experience feel like a real exploration tool.</p></article>
            <article><small>LOOP</small><h3>Explore, unlock, take away</h3><p>A completion condition and a useful result turn the visual effect into a product loop.</p></article>
          </div>
        </section>

        <section className="prompt-section">
          <SectionLabel index="02" title="REUSABLE PROMPT" />
          <div className="prompt-layout"><div><h2>Turn a style into<br /><em>callable rules.</em></h2><p>The prompt captures the product goal, visual grammar, interaction loop, and anti-patterns: not a pile of vague adjectives.</p><CopyPrompt prompt={prompt} /></div><pre>{prompt}</pre></div>
        </section>

        <section className="usage-section">
          <SectionLabel index="03" title="WHEN TO USE" />
          <div className="usage-columns"><div><h3>Use it for</h3><ul><li>Destination and travel discovery</li><li>Meditation, breathing, and emotional reset tools</li><li>Galleries, photography archives, and portfolios</li><li>Immersive storytelling for premium brands</li><li>Product launches that benefit from discovery</li></ul></div><div><h3>Avoid it for</h3><ul><li>High-frequency tables and admin systems</li><li>Utilities designed for rapid scanning</li><li>Promotion-heavy or discount-led landing pages</li><li>Content-heavy experiences on weak devices</li><li>Projects without high-quality visual material</li></ul></div></div>
        </section>

        <section className="source-note"><span>REFERENCE NOTE</span><p>The distribution and discovery model references <a href="https://21st.dev" target="_blank" rel="noreferrer">21st.dev ↗</a>. Lumen’s product concept, interface, and reusable prompt were created independently by 100 AI Designs.</p></section>
        <DetailFooter designId="001" />
      </main>
      <SiteFooter progressText="001 / 100 · OPEN DESIGN LAB · 2026" />
    </>
  );
}
