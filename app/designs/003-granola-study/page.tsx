import type { Metadata } from "next";

import { EvidenceSection, ProductModelSection, SourcePromptSection, UseCaseSection } from "../../../components/CaseStudySections";
import { DetailFooter, DetailHeader, SectionLabel, SiteFooter, SiteHeader } from "../../../components/SiteChrome";

const SOURCE_URL = "https://www.granola.ai/";
const REPLICA_PATH = "/studies/003-granola-homepage";

export const metadata: Metadata = {
  title: "003 Granola Homepage Study | 100 AI Designs",
  description: "An attributed reproduction study of Granola's homepage structure, transferred into an original meeting-memory product.",
  alternates: { canonical: "/designs/003-granola-study" },
};

const prompt = `Design a calm public homepage for a serious AI work product. Use an editorial software structure while keeping every brand, line of copy, person, screenshot, and product asset original.

Product goal: make a meeting-memory tool feel useful, private, and mature before explaining every feature.
Hero: create a desktop text-and-product split with one large serif promise, a compact supporting line, one primary action, and a layered product scene that stays pinned. Delay its scale change, add one live note line, and move its material, paper, note, and call layers at different speeds through the opening scroll.
Rhythm: alternate very large quiet fields with dense proof moments. Use one dark statement section as an attention reset before returning to neutral paper.
Color: use warm off-white paper, charcoal ink, soft gray-green surfaces, and one restrained forest-green signal. Avoid gradients, neon, glow, and decorative glass.
Typography: use an expressive, narrow editorial serif for promises and outcomes, and disciplined sans for navigation, descriptions, controls, and evidence. Use Newsreader and DM Sans as open substitutes for the source roles.
Workflow: explain before, during, and after states. Give every stage one practical outcome and one visible piece of product evidence.
Interaction: include touch-safe stage tabs and a large conversation-memory composer with in-view typewriter motion, manual editing, context switching, empty-error, loading, and success states.
Motion: use scroll-driven opacity and transform changes for the hero product state. Do not attach a window scroll listener. Respect reduced motion.
Responsive behavior: collapse the hero and workflow to one column, preserve the primary action above the fold, use a compact menu, and prevent horizontal scrolling at 320px.
Accessibility: provide one h1, semantic landmarks, labeled controls, visible focus, aria-live feedback, meaningful alt text, and color-independent selected state.
Attribution: keep the independent-study notice and direct source link on the audit page, not inside the replica experience.
Avoid: copied source copy or assets, fake customer logos, generic card grids, repeated eyebrow labels, inflated AI claims, testimonial overload, and a landing page with no working product moment.`;

const sourceAudit = `SOURCE SNAPSHOT: Granola homepage
DATE REVIEWED: 2026-08-27
DESKTOP: 1440 x 1000
MOBILE: 390 x 844

OBSERVED COMPOSITION
- Quadrant display type paired with Melange interface type
- Editorial serif promise paired with pinned product evidence
- Rough notes transition into enhanced notes through the opening scroll
- Long neutral fields separated by dark trust and proof moments
- Vertical before, during, and after product narrative
- Restrained olive action color
- Typewriter chat composer inside a lime memory section
- Large closing wordmark and spacious footer

TRANSFER BOUNDARY
- Preserve composition, pacing, type roles, and attention hierarchy
- Rewrite product, brand, content, and interaction
- Use no Granola screenshots, customer marks, people, or downloadable assets`;

export default function GranolaStudyDetailPage() {
  return (
    <>
      <SiteHeader context="detail" />
      <main className="detail-page">
        <DetailHeader designId="003" liveUrl={REPLICA_PATH} liveLabel="OPEN REPLICA" />
        <section className="detail-hero">
          <div className="detail-title">
            <p><span className="status-dot" /> INDEPENDENT REPRODUCTION STUDY</p>
            <h1>Granola Homepage<br /><em>Structure Transfer</em></h1>
            <p>Independent study. Not affiliated with Granola. This rebuild keeps the source page&apos;s visual rhythm, then replaces its brand, product copy, people, screenshots, and interactions with the original Afterword concept. <a href={SOURCE_URL} target="_blank" rel="noreferrer">View Granola source ↗</a></p>
          </div>
          <a className="granola-study-showcase" href={REPLICA_PATH} target="_blank" rel="noreferrer" aria-label="Open the independent Granola homepage reproduction study">
            {/* vinext does not yet provide the next/image optimizer in local and Workers runtimes. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/previews/granola-study.png" alt="Original Afterword meeting note and video-call product visual" width="1448" height="1086" loading="eager" fetchPriority="high" />
            <div className="granola-study-showcase-copy"><span>AFTERWORD · CASE 003</span><h2>The meeting memory<br /><em>for work that moves.</em></h2><b>OPEN REPLICA ↗</b></div>
          </a>
        </section>

        <ProductModelSection
          problem="A reference can look calm without teaching us why it feels calm or how to carry that quality into another product."
          promise="Rebuild the source composition closely enough to study its decisions, then transfer those decisions into an original product with a visible provenance boundary."
          outcome="The user gets a runnable Afterword homepage, a source audit, a reusable prompt, and a precise account of what was preserved, rewritten, or invented."
          loop={[
            { label: "OBSERVE", title: "Freeze the source", description: "Review the current desktop and mobile page before interpreting its layout, type, rhythm, and accent behavior." },
            { label: "REBUILD", title: "Match the hierarchy", description: "Recreate the split hero, long quiet fields, dark reset, workflow narrative, and editorial close." },
            { label: "TRANSFER", title: "Change the product", description: "Replace Granola identity and assets with Afterword copy, local visuals, and a functional meeting-memory flow." },
            { label: "DISTILL", title: "Name the decisions", description: "Record the visual rules, product uses, limits, and prompt needed for another independent implementation." },
          ]}
        />

        <section className="dna-section">
          <SectionLabel index="02" title="STYLE DNA" meta="VISUAL + BEHAVIORAL RULES" />
          <div className="dna-grid granola-study-dna">
            <article><small>HERO</small><h3>Promise left, proof right</h3><p>The opening does not explain a feature matrix. It establishes one large emotional promise and makes the product visual the counterweight.</p></article>
            <article><small>RHYTHM</small><h3>Quiet fields need interruption</h3><p>Long pale sections create confidence only because dense product scenes and one dark statement periodically reset attention.</p></article>
            <article><small>TYPE</small><h3>Serif outcome, sans operation</h3><p>Serif headings describe what work feels like. Sans text handles navigation, evidence, state, and practical detail.</p></article>
            <article><small>COLOR</small><h3>One restrained signal</h3><p>Forest green marks action and active memory. Neutral paper and charcoal carry almost everything else.</p></article>
            <article><small>STORY</small><h3>Time becomes navigation</h3><p>Before, during, and after turns a broad AI promise into a sequence a meeting-heavy user immediately recognizes.</p></article>
            <article><small>TRANSFER</small><h3>Structure can travel</h3><p>The composition survives a new brand, new copy, new assets, and a small functional demo without pretending to be the source.</p></article>
          </div>
        </section>

        <SourcePromptSection
          title={<>Reproduce the decisions,<br /><em>not the identity.</em></>}
          description="The source audit records observable structure instead of copying production code or page copy. The optimized prompt turns those observations into an original, testable implementation contract."
          source={{
            kind: "PUBLIC WEBSITE SNAPSHOT",
            title: "Granola homepage audit",
            attribution: "Granola homepage, reviewed 2026-08-27",
            attributionUrl: SOURCE_URL,
            description: "A desktop and mobile review of the public homepage, focused on composition, visual rhythm, typography roles, product storytelling, and responsive behavior.",
            content: sourceAudit,
            copyLabel: "COPY SOURCE AUDIT",
            facts: ["1440 x 1000 desktop review", "390 x 844 mobile review", "Split editorial hero", "Alternating light and dark fields", "Before, during, and after product story"],
          }}
          prompt={prompt}
          promptStatus={{ version: "DOCUMENTED V0.1", state: "BLIND REPRODUCTION PENDING", note: "The source audit, Afterword implementation, local visual assets, and responsive contract are documented. The prompt has not yet generated a new project without the current implementation." }}
          transformations={[
            { label: "PRESERVED", title: "Hierarchy and page rhythm", description: "The study keeps the text-and-product hero, large quiet fields, dark attention reset, workflow staging, and restrained accent system." },
            { label: "REWRITTEN", title: "Brand, message, and product", description: "Afterword has original naming, copy, meeting-memory interaction, evidence, navigation, and calls to action." },
            { label: "GENERATED", title: "Three local product visuals", description: "Original meeting-note scenes were generated for this study and stored locally. No Granola images are hotlinked or bundled." },
          ]}
        />

        <UseCaseSection
          useCases={["Serious AI SaaS and productivity homepages", "Privacy-sensitive knowledge and note products", "Design-study exercises focused on composition", "Founder-led products that need calm credibility", "Visual-language transfer without brand imitation"]}
          avoidCases={["Publishing an unlabelled clone", "Copying source customers, people, or screenshots", "Dense dashboards and operational control panels", "Products that need comparison tables above the fold", "Claims that require unverified social proof"]}
        />

        <EvidenceSection
          validation={[
            { label: "SOURCE SNAPSHOT", value: "DESKTOP + MOBILE", state: "passed" },
            { label: "ROOT REPLICA ROUTE", value: "IMPLEMENTED", state: "passed" },
            { label: "ORIGINAL LOCAL ASSETS", value: "3 VERIFIED", state: "passed" },
            { label: "PRODUCTION DEPLOYMENT", value: "LIVE", state: "passed" },
            { label: "BLIND PROMPT TEST", value: "PENDING", state: "pending" },
          ]}
          sourceNote={<>The public source was reviewed at <a href={SOURCE_URL} target="_blank" rel="noreferrer">granola.ai ↗</a> on 2026-08-27. Independent study. Not affiliated with Granola. The audit records visible decisions only; no source code, customer media, product screenshots, or Granola assets are included.</>}
          reuseBoundary="Reuse the split hero, space-to-proof rhythm, restrained color system, workflow storytelling, and documented prompt. Do not reuse the Granola or Afterword names, page copy, people, screenshots, generated visuals, or final interface as an unmodified commercial identity."
        />
        <DetailFooter designId="003" nextLabel="NEXT: ORBIT CONSOLE →" />
      </main>
      <SiteFooter progressText="003 / 100 · OPEN DESIGN LAB · 2026" />
    </>
  );
}
