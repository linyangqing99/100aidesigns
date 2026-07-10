import { Catalog } from "../components/Catalog";
import { designs, families } from "../data/designs";

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="100 AI Designs 首页"><b>100</b><span>AI<br />DESIGNS</span></a>
        <nav aria-label="主导航"><a href="#explore">探索</a><a href="#system">方法</a><a href="https://21st.dev" target="_blank" rel="noreferrer">参考来源 ↗</a></nav>
        <a className="github-pill" href="https://github.com/linyangqing99/100aidesigns" target="_blank" rel="noreferrer">GITHUB ↗</a>
      </header>

      <section className="catalog-hero" id="top">
        <div className="hero-kicker"><span>OPEN DESIGN LAB</span><span>EST. 2026</span></div>
        <h1><span>100 种设计语言，</span><span>100 个<em>可运行产品。</em></span></h1>
        <div className="hero-bottom">
          <p>用 AI 把不同设计风格真正做成产品，再把视觉规律、提示词与适用场景沉淀成可复用的设计系统。</p>
          <div className="hero-stats"><div><strong>01</strong><span>LIVE</span></div><div><strong>99</strong><span>IN QUEUE</span></div><div><strong>10</strong><span>FAMILIES</span></div></div>
        </div>
      </section>

      <Catalog designs={designs} families={families} />

      <section className="system-section" id="system">
        <div className="section-label"><span>02</span><p>THE SYSTEM</p></div>
        <div className="system-heading"><p>不收藏截图，<br />收藏可复用的方法。</p><h2>每个作品都要经过<br /><em>四次转换。</em></h2></div>
        <div className="system-grid">
          <article><b>01</b><h3>Ship</h3><p>先做成能点击、能使用、能独立发布的真实产品。</p></article>
          <article><b>02</b><h3>Decode</h3><p>拆出构图、字体、色彩、动效、密度与交互规律。</p></article>
          <article><b>03</b><h3>Prompt</h3><p>整理成结构化提示词、适用场景与反例边界。</p></article>
          <article><b>04</b><h3>Package</h3><p>最终发布为 Design Skill 或 MCP，供其他 AI 直接调用。</p></article>
        </div>
      </section>

      <section className="manifesto">
        <p>THE GOAL IS NOT<br />ONE HUNDRED PRETTY PAGES.</p>
        <h2>目标是建立一套<br /><em>AI 可以调用的设计语言。</em></h2>
      </section>

      <footer className="site-footer">
        <div className="wordmark footer-mark"><b>100</b><span>AI<br />DESIGNS</span></div>
        <p>Inspired by the discovery model of <a href="https://21st.dev" target="_blank" rel="noreferrer">21st.dev</a>. Built independently as an AI design research archive.</p>
        <span>001 / 100 · SHANGHAI · 2026</span>
      </footer>
    </main>
  );
}
