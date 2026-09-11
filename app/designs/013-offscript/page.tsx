import type { Metadata } from 'next';
import { EvidenceSection, ProductModelSection, SourcePromptSection, UseCaseSection } from '../../../components/CaseStudySections';
import { DetailFooter, DetailHeader, SectionLabel, SiteFooter, SiteHeader } from '../../../components/SiteChrome';

const SOURCE_URL = 'https://www.lennysnewsletter.com/p/how-to-turn-your-ai-into-a-world';
const LIVE_PATH = '/studies/013-offscript-studio';
export const metadata: Metadata = {
  title: '013 OFFSCRIPT | 100 AI Designs',
  description: 'An original creative-studio concept exploring tactile generated imagery, an asymmetric portfolio, and a downloadable creative brief.',
  alternates: { canonical: '/designs/013-offscript' },
  openGraph: { title: 'OFFSCRIPT | 100 AI Designs', description: 'Ideas, off script. A distinct art direction made usable.', url: '/designs/013-offscript', images: [{ url: '/previews/offscript.webp', width: 1440, height: 1000, alt: 'OFFSCRIPT website with orange resin sculpture and overscale typography' }] },
  twitter: { card: 'summary_large_image', images: ['/previews/offscript.webp'] },
};

const prompt = `Build a fictional creative-studio portfolio named OFFSCRIPT for design-conscious founders and collaborators.

Product goal: visitors explore original concept artwork, inspect a project, and download a personal creative brief as Markdown.
Visual direction: use a short, overscale DM Sans headline followed by a broad photographic hero. Make translucent orange ribbed resin the signature material. Supporting work explores aluminum furniture and a glass gallery threshold. Use one orange accent against cool gray, square geometry, consistent light and dark themes, and generous space.
Layout: compose the remaining project images at unequal widths and vertical offsets. On mobile, use one column and retain a visible navigation control.
Interaction: project dialogs need previous/next actions, Escape dismissal, keyboard focus containment and restoration. Include service disclosures and a brief form asking for a name, medium, idea, and feeling. Reject empty or whitespace-only inputs. Export a real Markdown file with the supplied values.
Motion: use short entry and hover transitions with a static reduced-motion alternative. Every animated element must remain readable and usable without motion.
Assets: generate original images, save them locally, keep the prompts, reserve image dimensions and provide descriptive alt text. Package image and font paths for the actual deployed subdirectory.
Delivery: verify the built website at desktop and mobile widths. Check dialogs, form validation, downloads, image loading, and themes in a browser. Keep the specimen separate from the surrounding collection styles.
Use cases: creative portfolios, brand-direction prototypes, visual concept presentations and small studios.
Avoid: fabricated clients, testimonials or business results; decorative data; false form-submission success; treating a conceptual chair or space as manufactured or built. A local brief download is not an email submission.`;

export default function OffscriptDetailPage() {
  return <>
    <SiteHeader context="detail" />
    <main className="detail-page">
      <DetailHeader designId="013" liveUrl={LIVE_PATH} />
      <section className="detail-hero">
        <div className="detail-title">
          <p>ORIGINAL DESIGN CONCEPT</p>
          <h1>OFFSCRIPT<br /><em>Ideas with<br />a point of view.</em></h1>
          <p>A fictional creative studio built around tactile orange material, expressive type, and a portfolio you can explore. Choose a medium, describe an idea, and take away an editable creative brief.</p>
        </div>
        <a className="offscript-showcase" href={LIVE_PATH} target="_blank" rel="noreferrer" aria-label="Open the OFFSCRIPT live experience">
          {/* Local, dimensioned screenshot works in both collection build targets. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/previews/offscript.webp" alt="The OFFSCRIPT homepage: Ideas, off script above an orange resin sculpture" width="1440" height="1000" fetchPriority="high" />
          <span><b>ACTUAL WEBSITE · CASE 013</b><b>OPEN LIVE EXPERIENCE ↗</b></span>
        </a>
      </section>
      <ProductModelSection
        problem="A distinctive portfolio can attract attention while leaving visitors with no useful way to begin their own project."
        promise="Give the studio one recognizable visual language, then connect browsing to a small practical action."
        outcome="Three original concept studies, accessible project browsing, and a Markdown brief containing the visitor's own idea."
        loop={[
          { label: 'DISCOVER', title: 'Recognize the direction', description: 'A short headline and one orange material establish the studio before any detailed explanation.' },
          { label: 'EXPLORE', title: 'Inspect the work', description: 'Open the sculpture, chair or gallery study and move between the three project stories.' },
          { label: 'DESCRIBE', title: 'Give the idea a shape', description: 'Name a project, choose its medium, describe the idea and select the feeling it should carry.' },
          { label: 'TAKE AWAY', title: 'Download a real brief', description: 'Save the supplied information in an editable Markdown file. Nothing is submitted to a studio or backend.' },
        ]}
      />
      <section className="dna-section">
        <SectionLabel index="02" title="STYLE DNA" meta="VISUAL + BEHAVIORAL RULES" />
        <div className="dna-grid">
          <article><small>MATERIAL</small><h3>One recognizable thread</h3><p>Orange ribbed resin becomes an identity, a reflection on aluminum, and a translucent doorway. The material changes scale without losing its identity.</p></article>
          <article><small>COMPOSITION</small><h3>Give the image the room</h3><p>A broad hero follows the headline. Two lower images use unequal widths and vertical offsets, then stack naturally on a phone.</p></article>
          <article><small>TYPE</small><h3>Let scale create hierarchy</h3><p>DM Sans handles both display and practical text. Tight display tracking and quiet descriptions keep the three artwork images in charge.</p></article>
          <article><small>COLOR</small><h3>Keep the accent consistent</h3><p>Cool gray provides a neutral field. Orange marks the primary action in both light and dark modes; every specimen control uses square geometry.</p></article>
          <article><small>BEHAVIOR</small><h3>Finish the small promises</h3><p>Images open real detail views. Forms validate meaningful input, and downloading produces the requested brief instead of simulated success.</p></article>
          <article><small>RESTRAINT</small><h3>Remove the invented proof</h3><p>No fictional clients, conversion statistics, awards or testimonials. The work is explicitly conceptual and the generated images are identified.</p></article>
        </div>
      </section>
      <SourcePromptSection
        title={<>From a method<br /><em>to a working specimen.</em></>}
        description="The article informed the creative process. The studio, images, implementation, and reusable build instructions are original to this study."
        source={{
          kind: 'OWNER REQUEST + DESIGN ARTICLE', title: 'Learn the method, make it reusable, build a website', attribution: 'Anshu Chimala, Lenny’s Newsletter, 2026-09-01', attributionUrl: SOURCE_URL,
          description: 'Public article content was read on 2026-09-11 through technique 6. Technique 7 had only a visible heading before the subscription boundary.',
          content: 'OWNER REQUEST\nStudy the linked article, distill a reusable skill, and demonstrate it with a working website. Then publish the website as a 100 AI Designs case.\n\nIMPLEMENTATION CHOICE\nA fictional creative studio with original generated imagery, project details, theme switching, and a downloadable creative brief.\n\nSOURCE BOUNDARY\nThis is an original application of a design workflow, not a reproduction of the article’s demonstrations. Unavailable paid content was not inferred or reproduced.',
          facts: ['Original studio concept', 'Three generated visual assets', 'Locally packaged fonts and images', 'Editable Markdown download', 'No account or commission backend'], copyLabel: 'COPY SOURCE BRIEF',
        }}
        prompt={prompt}
        promptStatus={{ version: 'DOCUMENTED V1.0', state: 'BLIND REPRODUCTION PENDING', note: 'The prompt matches the shipped concept. It has not generated an independent second implementation without access to this specimen.' }}
        transformations={[
          { label: 'SELECTED', title: 'An explicit material direction', description: 'Compared three concepts and chose a folded-material identity that could connect artwork, furniture and space.' },
          { label: 'CREATED', title: 'Original visual assets', description: 'Generated the sculpture, chair and gallery images, then packaged compressed copies and local fonts for the website.' },
          { label: 'MADE USABLE', title: 'A complete visitor journey', description: 'Connected the artwork to inspectable stories and a real file download, with keyboard, theme and narrow-screen checks.' },
        ]}
      />
      <UseCaseSection useCases={['Creative-studio and designer portfolios', 'Exploring an original brand direction', 'Presenting a small set of visual concepts', 'Connecting inspiration to a downloadable brief', 'Practicing material and layout consistency']} avoidCases={['Dense operational dashboards', 'Showing generated images as manufactured products', 'Inventing clients or performance results', 'Treating the download as a submitted commission', 'Claiming the prompt passed a blind reproduction test']} />
      <EvidenceSection
        validation={[
          { label: 'RESPONSIVE LAYOUT', value: '5 WIDTHS CHECKED', state: 'passed' },
          { label: 'VISUAL ASSETS', value: '3 ORIGINAL IMAGES', state: 'documented' },
          { label: 'BRIEF DOWNLOAD', value: 'FILE CONTENT VERIFIED', state: 'passed' },
          { label: 'THEME + REDUCED MOTION', value: 'BROWSER CHECKED', state: 'passed' },
          { label: 'BLIND PROMPT TEST', value: 'PENDING', state: 'pending' },
        ]}
        sourceNote={<>Method reference: <a href={SOURCE_URL} target="_blank" rel="noreferrer">How to turn your AI into a world-class designer ↗</a>. The public portion was read through technique 6. OFFSCRIPT is fictional; its AI-generated images are conceptual, not evidence of manufactured objects, built architecture or client commissions. The initial visual review was performed by the implementer.</>}
        reuseBoundary="Reuse the original art-direction brief, composition rules, accessible interaction patterns and local export flow. Keep conceptual imagery honestly labeled. There is no account system, payment, email submission or commissioned studio service."
      />
      <DetailFooter designId="013" nextLabel="BACK TO THE LIBRARY →" nextHref="/#explore" />
    </main>
    <SiteFooter progressText="013 / 100 · OPEN DESIGN LAB · 2026" />
  </>;
}
