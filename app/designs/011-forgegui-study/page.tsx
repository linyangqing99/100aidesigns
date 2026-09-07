import type { Metadata } from "next";
import { EvidenceSection, ProductModelSection, SourcePromptSection, UseCaseSection } from "../../../components/CaseStudySections";
import { DetailFooter, DetailHeader, SectionLabel, SiteFooter, SiteHeader } from "../../../components/SiteChrome";

const SOURCE_URL = "https://forgegui.com/";
const REPLICA_PATH = "/studies/011-forgegui-homepage?lang=en";
export const metadata: Metadata = {
  title: "011 ForgeGUI Homepage Study | 100 AI Designs",
  description: "An attributed ForgeGUI homepage reproduction exploring cinematic video, glass surfaces, type hierarchy, and tactile blue actions.",
  alternates: { canonical: "/designs/011-forgegui-study" },
  openGraph: { title: "ForgeGUI Homepage Study | 100 AI Designs", description: "Cinematic scenes. Quiet glass. Tactile actions.", url: "/designs/011-forgegui-study", images: [{ url: "/previews/forgegui-study.webp", width: 1440, height: 1000, alt: "ForgeGUI homepage study screenshot" }] },
  twitter: { card: "summary_large_image", images: ["/previews/forgegui-study.webp"] },
};

const prompt = "Build a cinematic homepage for a game-creation product with an original brand, original copy, and your own assets.\n\nProduct goal: let a game creator recognize the creative world immediately, discover the tool range, and find a clear next action.\nComposition: use a full-width looping game scene behind a centered promise. Follow with three large tool cards, a denser suite grid, a horizontal stock catalog, a creator statement, two plan cards, a closing video action, and seven FAQ rows.\nTypography: assign expressive serif type to promises, a tight sans to navigation and explanations, and a heavier rounded sans to one emphasized word. Keep the roles consistent across sections.\nMaterial: darken the video behind copy. Make secondary glass surfaces neutral and low contrast. Reserve blue gradients, inner highlights, a dark lower edge, and a soft outer shadow for primary actions. Reuse the same material variables in buttons, cards, navigation, and dialogs.\nInteraction: implement mutually exclusive desktop menus, outside-click and Escape dismissal, a compact mobile accordion menu, signup/login/reset-password dialog states, password visibility, local validation, focus trapping and restoration, smooth section links, and native FAQ disclosure. Keep demo submissions local.\nMotion: loop the background scene and logo strip. Load lower videos near the viewport, pause them offscreen, and respect reduced motion. Keep animated screenshots distinct from static layout comparisons.\nResponsive behavior: test 320, 390, 768, 1024, and 1440px widths. Stack tool and pricing cards, retain tap targets, let long dialogs scroll, and prevent horizontal document overflow.\nDelivery: self-host fonts and media; separate the specimen from the collection shell so typography and global CSS cannot leak. Provide a source note, asset provenance, measurements, and explicit limitations.\nAvoid: indistinguishable bright surfaces, illegible text over video, decorative blur on every element, fake social proof, source branding in an original product, and performance claims without matched measurements.";
const sourceInput = `OWNER REQUEST — 2026-09-07
Reproduce https://forgegui.com/ as closely as possible for learning: page effects, loading behavior, fonts, assets, copy, frontend interactions, and mobile adaptation. Backend product functions are out of scope. Explain one useful design lesson.

SOURCE OBSERVED
- Full-width looping game scene, dark readability overlay
- Instrument Serif promises, Inter Tight interface, Cal Sans emphasis
- Neutral glass cards and blue dimensional actions
- Three core tools, suite grid, stock catalog, plans, closing video, FAQ
- Desktop dropdowns, mobile accordion navigation, account dialogs

REPRODUCTION BOUNDARY
Keep public source copy, media, fonts, styles, SVGs, and breakpoints.
Rebuild homepage interactions with local JavaScript.
Do not connect account, payment, generation, or source analytics APIs.
Preserved source claims are page copy, not independently verified facts.`;

export default function ForgeGUIStudyDetailPage() {
  return <>
    <SiteHeader context="detail" />
    <main className="detail-page">
      <DetailHeader designId="011" liveUrl={REPLICA_PATH} liveLabel="OPEN REPLICA" />
      <section className="detail-hero">
        <div className="detail-title">
          <p><span className="status-dot" /> INDEPENDENT REPRODUCTION STUDY</p>
          <h1>ForgeGUI<br /><em>Material &amp;<br />Motion</em></h1>
          <p>A close study of cinematic game scenes, quiet glass surfaces, and tactile blue actions. Public source copy, fonts, and media are preserved; homepage interactions are rebuilt locally. Independent study. Not affiliated with ForgeGUI. <a href={SOURCE_URL} target="_blank" rel="noreferrer">View ForgeGUI source ↗</a></p>
        </div>
        <a className="forgegui-study-showcase" href={REPLICA_PATH} target="_blank" rel="noreferrer" aria-label="Open the ForgeGUI homepage replica">
          {/* The local screenshot is shared by Next and Vinext without an image optimizer. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/previews/forgegui-study.webp" alt="The reproduced ForgeGUI hero: a game scene, large serif promise, and blue Start Free Now button" width="1440" height="1000" fetchPriority="high" />
          <span><b>ACTUAL REPLICA · CASE 011</b><b>OPEN REPLICA ↗</b></span>
        </a>
      </section>
      <ProductModelSection
        problem="A polished video homepage is easy to remember as an image and harder to understand as a repeatable hierarchy of materials, type, and behavior."
        promise="Rebuild the visible homepage closely, then isolate the decisions that make one action stand out inside a rich visual scene."
        outcome="A runnable frontend specimen, preserved source assets, measured responsive layout, and an exercise for applying the same hierarchy to an original product."
        loop={[
          { label: "OBSERVE", title: "Capture the actual page", description: "Review the rendered desktop and mobile homepage, its typography, media, navigation, and dialog states." },
          { label: "REPRODUCE", title: "Keep the visual evidence", description: "Preserve public styles and assets while rebuilding menu, dialog, disclosure, and motion behavior in readable JavaScript." },
          { label: "COMPARE", title: "Measure across widths", description: "Compare section heights and heading metrics at five widths, then inspect overflow and real interaction states." },
          { label: "LEARN", title: "Extract material hierarchy", description: "Separate world-building video, quiet information surfaces, and the brighter primary action into reusable roles." },
        ]}
      />
      <section className="dna-section">
        <SectionLabel index="02" title="STYLE DNA" meta="VISUAL + BEHAVIORAL RULES" />
        <div className="dna-grid">
          <article><small>SCENE</small><h3>Show the creative world</h3><p>A looping game scene establishes the audience and mood. The dark overlay lets the central promise remain readable as the frame changes.</p></article>
          <article><small>MATERIAL</small><h3>Brightness signals priority</h3><p>Secondary glass stays neutral. Blue gradients, an inner highlight, a dark lower edge, and shadow give the main action a stronger physical presence.</p></article>
          <article><small>TYPE</small><h3>Three roles, one hierarchy</h3><p>Instrument Serif carries the promise, Inter Tight handles practical text, and Cal Sans emphasizes the audience without adding another color system.</p></article>
          <article><small>RHYTHM</small><h3>Move from scene to choice</h3><p>The page moves from an expansive hero into tool cards, a dense suite, catalog media, plans, and a final invitation.</p></article>
          <article><small>BEHAVIOR</small><h3>Carry the material into states</h3><p>Menus, dialog panels, input fields, and button feedback reuse the same glass and highlight language as the homepage.</p></article>
          <article><small>EXERCISE</small><h3>Rebuild one button first</h3><p>Disable its gradient, inner highlight, and outer shadow. Restore each layer, then apply a quieter version of the same variables to a card.</p></article>
        </div>
      </section>
      <SourcePromptSection
        title={<>Study the layers.<br /><em>Reuse the decisions.</em></>}
        description="The original input asks for a close reproduction. The reusable prompt turns the observed hierarchy into a separate exercise using an original brand and assets."
        source={{ kind: "OWNER REQUEST + PUBLIC WEBSITE", title: "ForgeGUI homepage reproduction brief", attribution: "ForgeGUI homepage, captured 2026-09-07", attributionUrl: SOURCE_URL, description: "The rendered homepage and its public visual assets form the reference. The task is frontend-only; preserved source product claims are not independent endorsements.", content: sourceInput, copyLabel: "COPY SOURCE BRIEF", facts: ["Eight main sections", "Five responsive widths", "Original public media and fonts", "Native frontend interactions", "No account or generation backend"] }}
        prompt={prompt}
        promptStatus={{ version: "DOCUMENTED V0.1", state: "BLIND REPRODUCTION PENDING", note: "The specimen and observed decisions are documented. This prompt has not generated a second implementation without access to the current study." }}
        transformations={[
          { label: "PRESERVED", title: "Copy, assets, and visual rules", description: "Original public CSS, fonts, video, images, SVGs, wording, and breakpoints preserve the source page's appearance." },
          { label: "REBUILT", title: "Local frontend behavior", description: "Readable JavaScript implements navigation, dialog transitions, local validation, focus handling, FAQ disclosure, and video lifecycle." },
          { label: "DISTILLED", title: "A transferable exercise", description: "The prompt describes material, type, motion, and responsive roles for an original product. Source identity belongs to the attributed specimen." },
        ]}
      />
      <UseCaseSection
        useCases={["Learning dimensional button and glass treatments", "Cinematic game-tool or creator-product homepages", "Studying three complementary typography roles", "Responsive reconstruction and state comparison", "Turning a visual reference into explicit design rules"]}
        avoidCases={["Dense operational dashboards", "Placing bright glass on every surface", "Treating the specimen as a working AI product", "Claiming identical production speed from local timings", "Using preserved source claims as verified evidence"]}
      />
      <EvidenceSection
        validation={[
          { label: "RESPONSIVE LAYOUT", value: "5 WIDTHS CHECKED", state: "passed" },
          { label: "SECTION HEIGHT DELTA", value: "0 CSS PX · 8 SECTIONS", state: "passed" },
          { label: "SOURCE ASSET MANIFEST", value: "25 CHECKSUMS", state: "documented" },
          { label: "PRODUCTION SPEED PARITY", value: "NOT MEASURED", state: "pending" },
          { label: "BLIND PROMPT TEST", value: "PENDING", state: "pending" },
        ]}
        sourceNote={<>Source: <a href={SOURCE_URL} target="_blank" rel="noreferrer">forgegui.com ↗</a>, captured on 2026-09-07. Independent study. Not affiliated with ForgeGUI. Source media, marks, copy, and styles are included for this attributed study. Eight section heights and primary heading metrics matched at 320, 390, 768, 1024, and 1440px; animated frames were not compared pixel by pixel. Source claims remain unverified page copy.</>}
        reuseBoundary="Reuse the material hierarchy, type roles, motion lifecycle, responsive behavior, and documented prompt in an original product. Preserve source attribution when discussing this specimen. The replica has local-only form feedback and no account, payment, or generation service."
      />
      <DetailFooter designId="011" nextLabel="BACK TO THE LIBRARY →" nextHref="/#explore" />
    </main>
    <SiteFooter progressText="011 / 100 · OPEN DESIGN LAB · 2026" />
  </>;
}
