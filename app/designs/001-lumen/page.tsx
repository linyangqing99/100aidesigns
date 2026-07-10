import { CopyPrompt } from "../../../components/CopyPrompt";

const prompt = `Design a dark, cinematic interactive micro-journey product.

Product goal: help a user reset emotionally in sixty seconds by discovering a hidden landscape.
Visual language: near-black interface, thin technical grid, warm editorial typography, one adaptive acid accent, restrained analog grain.
Layout: narrative statement on the left; a large 16:9 interactive image stage on the right; compact progress and coordinate metadata; destination card revealed only after exploration.
Interaction: a soft circular light follows the pointer with inertia, cuts through a blurred dark-glass mask, records explored regions, then unlocks destination context and a save action.
Typography: neutral grotesk for UI, high-contrast serif italic for emotional emphasis, monospaced micro-labels for system status.
Motion: slow, weighted, atmospheric; no bouncy easing and no decorative animation without feedback value.
Use cases: travel discovery, meditation, art archive, premium editorial storytelling, immersive portfolio.
Avoid: generic dashboard chrome, neon cyberpunk overload, glass cards everywhere, oversized gradients, fake metrics, excessive copy.`;

export default function LumenDesignPage() {
  return (
    <main className="detail-page">
      <header className="detail-header"><a href="/">← 返回所有设计</a><span>DESIGN 001 / 100</span><a href="https://lumen-image-reveal.sssansui66.chatgpt.site" target="_blank" rel="noreferrer">打开互动站 ↗</a></header>
      <section className="detail-hero">
        <div className="detail-title"><p><span className="status-dot" /> LIVE · IMMERSIVE EXPERIENCE</p><h1>Lumen<br /><em>Micro Journey</em></h1><p>一个用光探索未知风景的 60 秒情绪切换产品。效果不是装饰，而是完成“探索—解锁—收藏”闭环的核心交互。</p></div>
        <a className="lumen-showcase" href="https://lumen-image-reveal.sssansui66.chatgpt.site" target="_blank" rel="noreferrer">
          <div className="lumen-grid" /><div className="lumen-light" /><span>LUMEN</span><h2>这一分钟，<br />去<em>远方。</em></h2><b>ENTER EXPERIENCE ↗</b>
        </a>
      </section>

      <section className="dna-section">
        <div className="section-label"><span>01</span><p>STYLE DNA</p></div>
        <div className="dna-grid">
          <article><small>COLOR</small><h3>近黑 + 单点酸性色</h3><p>90% 低饱和暗色建立沉浸感，只用一个随场景变化的强调色表达状态。</p></article>
          <article><small>TYPE</small><h3>理性系统字 × 感性衬线体</h3><p>无衬线体负责功能，斜体衬线体只出现在情绪关键词上。</p></article>
          <article><small>SPACE</small><h3>叙事区与体验区分离</h3><p>左侧解释“为什么”，右侧让用户直接完成“怎么做”。</p></article>
          <article><small>MOTION</small><h3>有重量的缓慢运动</h3><p>指针跟随带惯性，遮罩展开和收拢都比普通 hover 更慢。</p></article>
          <article><small>DETAIL</small><h3>技术元数据制造真实感</h3><p>坐标、进度、序号与网格让体验像一个真实探索工具。</p></article>
          <article><small>LOOP</small><h3>探索—解锁—收藏</h3><p>必须有完成条件和结果反馈，否则它仍然只是视觉特效。</p></article>
        </div>
      </section>

      <section className="prompt-section">
        <div className="section-label"><span>02</span><p>REUSABLE PROMPT</p></div>
        <div className="prompt-layout"><div><h2>把风格变成<br /><em>可调用的规则。</em></h2><p>提示词描述产品目标、视觉语法、交互闭环和反例边界，而不是只堆“高级感”等形容词。</p><CopyPrompt prompt={prompt} /></div><pre>{prompt}</pre></div>
      </section>

      <section className="usage-section">
        <div className="section-label"><span>03</span><p>WHEN TO USE</p></div>
        <div className="usage-columns"><div><h3>适合</h3><ul><li>目的地与旅行发现</li><li>冥想、呼吸与情绪产品</li><li>艺术馆、摄影集与作品集</li><li>高端品牌的沉浸式叙事</li><li>需要“探索感”的新品发布</li></ul></div><div><h3>不适合</h3><ul><li>高频表格和后台管理</li><li>要求快速扫描的工具产品</li><li>低价促销与强销售落地页</li><li>弱性能设备上的重内容页面</li><li>无法提供高质量视觉素材的项目</li></ul></div></div>
      </section>

      <section className="source-note"><span>REFERENCE NOTE</span><p>分发与发现机制参考 <a href="https://21st.dev" target="_blank" rel="noreferrer">21st.dev ↗</a>；Lumen 的产品概念、界面与提示词由 100 AI Designs 独立完成。</p></section>
      <footer className="detail-footer"><a href="/">← 设计目录</a><span>001 / 100</span><span>NEXT: EDITORIAL GRID →</span></footer>
    </main>
  );
}
