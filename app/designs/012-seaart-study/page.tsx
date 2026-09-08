import type { Metadata } from "next";
import { EvidenceSection, ProductModelSection, SourcePromptSection, UseCaseSection } from "../../../components/CaseStudySections";
import { DetailFooter, DetailHeader, SectionLabel, SiteFooter, SiteHeader } from "../../../components/SiteChrome";

const SOURCE_URL = "https://www.seaart.ai/zhCN";
const REPLICA_PATH = "/studies/012-seaart-homepage";

export const metadata: Metadata = {
  title: "012 SeaArt Homepage Study | 100 AI Designs",
  description: "An attributed study of SeaArt's Chinese creator-community homepage, exploring persistent navigation, visual discovery, recommendation rows, and creation entry points.",
  alternates: { canonical: "/designs/012-seaart-study" },
  openGraph: {
    title: "SeaArt Homepage Study | 100 AI Designs",
    description: "A dark creator workspace connecting visual discovery with creation.",
    url: "/designs/012-seaart-study",
    images: [{ url: "/previews/seaart-study.webp", width: 1440, height: 1000, alt: "SeaArt Chinese community homepage reproduction" }],
  },
  twitter: { card: "summary_large_image", images: ["/previews/seaart-study.webp"] },
};

const prompt = `Build a responsive creator-community homepage for an original AI creative product, using your own brand, copy, and licensed assets.

Product goal: help a creator choose a creation mode, discover useful models, explore community work, and return to creation without losing their place.
Composition: anchor the desktop page with a persistent left navigation rail. Place a compact header above the main content. Begin with three creation entry points, then horizontal recommendation cards, a competition or event area, and a visual community feed. Keep a creation action available during browsing.
Visual language: use near-black page and navigation surfaces, a small number of slightly lighter panels, restrained borders, clear white headings, and quieter gray metadata. Let images carry most of the color. Reserve the brightest accent for selection and creation actions.
Typography and density: use a readable interface sans with a complete Chinese character fallback. Separate section headings, card titles, and metadata through size, weight, and spacing. Keep navigation labels stable and text on imagery legible.
Media: preserve the intended crop and aspect ratio for each card family. Use portrait cards for model recommendations, landscape cards for events, and portrait imagery in the community feed. Serve assets locally, give images meaningful alternatives, and defer below-fold loading.
Interaction: implement navigation selection, horizontal card browsing, feed categories, search, and a persistent creation entry. Give each visible action a real destination or clear local feedback. Demonstration flows must explain their frontend scope before asking for input; do not collect account credentials or pretend to generate content.
Responsive behavior: adapt the navigation rail and card density as space narrows. Keep key actions reachable, allow only deliberate row scrolling, and avoid horizontal page overflow. Test desktop, tablet, and narrow mobile layouts against the chosen reference state.
Accessibility and motion: preserve heading order, keyboard operation, visible focus, meaningful control labels, and reduced-motion behavior. Do not use autoplaying movement to hide loading or inactive controls.
Use cases: visual creation tools, model discovery, creative communities, and image-led libraries with frequent browsing.
Delivery: isolate the specimen from the collection shell; document source state, asset provenance, working interactions, and actual verification results. Keep visual fidelity, backend capability, and deployment status separate.
Avoid: bright decoration on every panel, identical card proportions for every content type, unreadable text over artwork, navigation that scrolls away unexpectedly, fake generation results, copied product claims presented as verified facts, and claims of pixel equality without measurements.`;

const sourceInput = `OWNER REQUEST — 2026-09-08
Reproduce the homepage at https://www.seaart.ai/zhCN as closely as possible and deploy it as a new case in the project.

REFERENCE STATE
Chinese creator-community homepage observed in the browser.
- Dark persistent navigation and compact page header
- Three creation entry points
- Horizontal model recommendations
- Competitions and community artwork
- A creation action available while browsing

STUDY BOUNDARY
Reproduce the visible homepage and its local frontend interactions.
The specimen uses Chinese interface copy; the collection analysis uses English.
Keep source attribution on the case page and record localized asset provenance.
Do not connect SeaArt account, payment, upload, or generation services.
Source product statements are preserved reference copy, not independently verified claims.`;

export default function SeaArtStudyDetailPage() {
  return <>
    <SiteHeader context="detail" />
    <main className="detail-page">
      <DetailHeader designId="012" liveUrl={REPLICA_PATH} liveLabel="OPEN REPLICA" />
      <section className="detail-hero">
        <div className="detail-title">
          <p><span className="status-dot" /> INDEPENDENT REPRODUCTION STUDY</p>
          <h1>SeaArt<br /><em>Discover.<br />Create.</em></h1>
          <p>A study of SeaArt&apos;s Chinese creator-community homepage: persistent navigation, three creation entry points, model recommendations, events, and community artwork. Independent study. Not affiliated with SeaArt. <a href={SOURCE_URL} target="_blank" rel="noreferrer">View SeaArt source ↗</a></p>
        </div>
        <a className="seaart-study-showcase" href={REPLICA_PATH} target="_blank" rel="noreferrer" aria-label="Open the SeaArt Chinese homepage replica">
          {/* The screenshot stays local and is shared by the Next and Vinext builds. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/previews/seaart-study.webp" alt="SeaArt homepage reproduction with a dark sidebar, creation choices, and visual recommendation cards" width="1440" height="1000" fetchPriority="high" />
          <span><b>CHINESE HOMEPAGE · CASE 012</b><b>OPEN REPLICA ↗</b></span>
        </a>
      </section>
      <ProductModelSection
        problem="A busy creative community must show enough work to invite exploration while keeping the next creation action easy to find."
        promise="Reconstruct the homepage's navigation, content density, media hierarchy, and creation entry points as a focused interface study."
        outcome="A Chinese frontend specimen and an English case that explain how discovery and creation share one workspace."
        loop={[
          { label: "ENTER", title: "Choose a creative direction", description: "Place the main creation modes near the top so a visitor can act before browsing the community." },
          { label: "DISCOVER", title: "Scan models and events", description: "Use distinct horizontal rows to introduce tools, visual styles, and timely community activities." },
          { label: "EXPLORE", title: "Browse the visual feed", description: "Let artwork lead while keeping categories, titles, and navigation readable at a higher content density." },
          { label: "RETURN", title: "Keep creation within reach", description: "Provide a consistent creation entry so browsing does not require navigating back to the top." },
        ]}
      />
      <section className="dna-section">
        <SectionLabel index="02" title="STYLE DNA" meta="VISUAL + BEHAVIORAL RULES" />
        <div className="dna-grid">
          <article><small>FRAME</small><h3>Navigation is a stable anchor</h3><p>The dark sidebar gives a changing visual feed a consistent frame. Grouping and selection make the dense interface easier to scan.</p></article>
          <article><small>COLOR</small><h3>Let the artwork carry color</h3><p>Near-black surfaces recede behind vivid imagery. White headings and quieter metadata preserve a readable hierarchy around the work.</p></article>
          <article><small>DENSITY</small><h3>Give each row a clear job</h3><p>Creation choices, recommended models, events, and artwork use different card rhythms, so the page remains navigable as content grows.</p></article>
          <article><small>MEDIA</small><h3>Crop for the content type</h3><p>Model recommendations use tall portrait cards; events use landscape artwork; the community feed returns to portrait cards. One universal crop would erase that distinction.</p></article>
          <article><small>ACTION</small><h3>Connect browsing with making</h3><p>The first creation choices and the persistent creation entry serve the same action at two different moments in the browsing session.</p></article>
          <article><small>EXERCISE</small><h3>Read the page without images</h3><p>Temporarily hide the artwork. Check whether navigation, section labels, card spacing, and primary actions still explain where to go.</p></article>
        </div>
      </section>
      <SourcePromptSection
        title={<>Study the workspace.<br /><em>Reuse the hierarchy.</em></>}
        description="The source brief asks for a close SeaArt reproduction. The reusable prompt describes the interface decisions for a separate creative product with an original identity."
        source={{
          kind: "OWNER REQUEST + PUBLIC WEBSITE",
          title: "SeaArt Chinese homepage reproduction brief",
          attribution: "SeaArt Chinese homepage, observed 2026-09-08",
          attributionUrl: SOURCE_URL,
          description: "The browser-visible Chinese creator-community homepage is the reference state. Its visual structure and local frontend behavior define the study's scope.",
          content: sourceInput,
          copyLabel: "COPY SOURCE BRIEF",
          facts: ["Chinese creator-community interface", "Persistent navigation", "Three creation entry points", "Model, event, and artwork discovery", "No SeaArt account or generation service"],
        }}
        prompt={prompt}
        promptStatus={{ version: "DOCUMENTED V0.1", state: "BLIND REPRODUCTION PENDING", note: "The prompt records the study's intended interface rules. It has not been validated by generating a separate implementation without access to this specimen." }}
        transformations={[
          { label: "REFERENCED", title: "One visible homepage state", description: "The Chinese community layout, imagery, content grouping, and action placement guide the specimen. Other account or regional states may differ." },
          { label: "REBUILT", title: "A bounded frontend", description: "The specimen is packaged separately from the collection, with local interaction behavior and no connection to SeaArt's account or generation services." },
          { label: "DISTILLED", title: "A reusable discovery pattern", description: "The prompt carries navigation, card rhythm, media hierarchy, and persistent actions into an exercise for an original product." },
        ]}
      />
      <UseCaseSection
        useCases={["Image-led creative communities", "AI model and workflow discovery", "Creator tools with several creation modes", "Dense visual libraries with persistent navigation", "Studying the transition from inspiration to action"]}
        avoidCases={["Text-heavy reading experiences", "Simple pages with a single task", "Using artwork to conceal unclear navigation", "Treating a frontend replica as an AI generation service", "Claiming universal fidelity across personalized homepage states"]}
      />
      <EvidenceSection
        validation={[
          { label: "REFERENCE STATE", value: "CHINESE COMMUNITY HOME", state: "documented" },
          { label: "RESPONSIVE + INTERACTION QA", value: "7 WIDTHS CHECKED", state: "passed" },
          { label: "LOCAL SOURCE ASSETS", value: "44 VERIFIED FILES", state: "passed" },
          { label: "PIXEL + SPEED EQUALITY", value: "NOT MEASURED", state: "pending" },
          { label: "BLIND PROMPT TEST", value: "PENDING", state: "pending" },
        ]}
        sourceNote={<>Source: <a href={SOURCE_URL} target="_blank" rel="noreferrer">seaart.ai/zhCN ↗</a>, observed on 2026-09-08. Independent study. Not affiliated with SeaArt. The reference is one browser-visible Chinese homepage state; its recommendations and community content may change. Source artwork, marks, and product statements remain attributable to their respective owners. Pixel equality and production speed equivalence have not been measured.</>}
        reuseBoundary="Reuse the navigation structure, content rhythm, media hierarchy, and creation-entry pattern in an original product. Preserve attribution when discussing this specimen. The replica does not provide SeaArt account access, payment, uploads, or AI generation."
      />
      <DetailFooter designId="012" nextLabel="BACK TO THE LIBRARY →" nextHref="/#explore" />
    </main>
    <SiteFooter progressText="012 / 100 · OPEN DESIGN LAB · 2026" />
  </>;
}
