import { Catalog } from "../components/Catalog";
import { designs, families } from "../data/designs";

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="100 AI Designs home"><b>100</b><span>AI<br />DESIGNS</span></a>
        <nav aria-label="Primary navigation"><a href="#explore">Designs</a><a href="#system">Method</a><a href="https://21st.dev" target="_blank" rel="noreferrer">Reference ↗</a></nav>
        <a className="github-pill" href="https://github.com/linyangqing99/100aidesigns" target="_blank" rel="noreferrer">GITHUB ↗</a>
      </header>

      <section className="poster-hero" id="top">
        <div className="poster-copy">
          <div className="poster-lockup"><strong>100</strong><b>AI DESIGNS</b></div>
          <div className="poster-rule" />
          <h1>100 RUNNABLE<br />DESIGN LANGUAGES</h1>
          <div className="poster-note"><span>OPEN DESIGN LAB · 2026</span><p>We turn distinct visual languages into runnable products, then distill each one into prompts, use cases, and reusable design rules.</p></div>
        </div>
        <div className="poster-mosaic" aria-label="Ten design language previews">
          {designs.slice(0, 10).map((design) => (
            <div className={`mosaic-tile mosaic-${design.preview}`} key={design.id}>
              <div className="mosaic-chrome"><span /><span /><i>{design.id}</i></div>
              <div className="mosaic-art"><i /><i /><i /></div>
              <div className="mosaic-caption"><small>{design.family}</small><strong>{design.title}</strong></div>
            </div>
          ))}
        </div>
      </section>

      <Catalog designs={designs} families={families} />

      <section className="system-section" id="system">
        <div className="section-label"><p>FROM STYLE TO SYSTEM</p><b>04 MOVES</b></div>
        <div className="method-layout">
          <div className="method-lead"><strong>METHOD</strong><h2>Do not collect screenshots.<br /><em>Collect reusable decisions.</em></h2><p>Every study is shipped as a product before it becomes a prompt, a system, or a tool.</p></div>
          <div className="system-grid">
            <article><b>01</b><h3>Ship</h3><p>Build a responsive product that can be used, tested, and published on its own.</p></article>
            <article><b>02</b><h3>Decode</h3><p>Extract the composition, type, color, motion, density, and interaction rules.</p></article>
            <article><b>03</b><h3>Prompt</h3><p>Turn those decisions into a structured prompt with use cases and explicit limits.</p></article>
            <article><b>04</b><h3>Package</h3><p>Publish the result as a Design Skill or MCP that another AI can call directly.</p></article>
          </div>
        </div>
      </section>

      <section className="manifesto"><p>THE GOAL IS NOT ONE HUNDRED PRETTY PAGES.</p><h2>A living library of design languages<br /><em>AI can call directly.</em></h2><a href="#explore">EXPLORE THE LIBRARY ↓</a></section>

      <footer className="site-footer">
        <div className="wordmark footer-mark"><b>100</b><span>AI<br />DESIGNS</span></div>
        <p>Inspired by the discovery model of <a href="https://21st.dev" target="_blank" rel="noreferrer">21st.dev</a>. Built independently as an AI design research archive.</p>
        <span>001 / 100 · OPEN DESIGN LAB · 2026</span>
      </footer>
    </main>
  );
}
