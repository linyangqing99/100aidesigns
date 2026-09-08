# 012 SeaArt Homepage Study

An attributed reproduction study of the [SeaArt Chinese homepage](https://www.seaart.ai/zhCN), observed on 2026-09-08. Independent study. Not affiliated with SeaArt.

- Case route: `/designs/012-seaart-study`
- Replica route: `/studies/012-seaart-homepage`
- Production target: `https://100ai.design/studies/012-seaart-homepage`
- Responsive and interaction browser checks completed; see `qa/` and `manifest.json`.
- Production release evidence is recorded in the delivery report.

## Reference and scope

The reference is the browser-visible Chinese creator-community homepage: dark persistent navigation, three creation entry points, horizontal model recommendations, competitions, community artwork, and an accessible creation action while browsing. Homepage state and recommendations can vary by session or account; this study targets the observed state.

The specimen uses Chinese interface copy. The collection case uses the existing English paper-and-ink shell. SeaArt's account, payment, upload, and generation services are outside the frontend scope. Preserved source copy is reference material, not an independently verified product claim.

## Product loop

1. Choose a creation direction at the top of the page.
2. Discover recommended models and community activities.
3. Browse artwork without losing the navigation frame.
4. Return to creation through a persistent entry point.

## Implementation

- `public/studies/012-seaart/`: isolated specimen runtime and local assets.
- `next.config.ts`: clean replica URL rewrites to the static document.
- `app/designs/012-seaart-study/page.tsx`: attributed case using the shared collection components.
- `public/previews/seaart-study.webp`: screenshot used by the catalog and case.
- `data/designs.ts`: study identity and catalog registration.

The case is included in the sitemap. The reproduction document should carry `noindex`; it exists as a bounded learning specimen.

## Verification boundary

Seven viewport widths passed document-overflow checks: 320, 390, 680, 768, 980, 1024, and 1440 CSS pixels. All 44 assets are local and checksummed. Browser checks covered search, empty results, media filters, popular sorting, local favorites, mobile navigation, detail dialogs, local creation feedback, and Escape dismissal. The case does not claim pixel equality or production performance equivalence. Update `manifest.json` and the evidence ledger only with results actually obtained.

The collection checks are `npm run lint`, `npm test`, and `npm run build:vercel`. A production-mode local run uses `npx next start`. Browser verification must cover the replica and case at desktop, tablet, and narrow mobile widths, including focus, navigation, image loading, and horizontal overflow.

## One useful lesson

**A dense creative feed needs a stable frame.** The sidebar and section hierarchy explain where the user is, imagery supplies the visual variety, and creation entries connect browsing with making. Temporarily hide the artwork to check whether the page still explains its structure and next actions.

## Reuse boundary

Reuse the navigation frame, card rhythm, image hierarchy, and action placement with an original brand, copy, and appropriately licensed assets. This study does not grant rights to SeaArt's branding or community artwork. The documented prompt is version 0.1.0 and has not passed a blind reproduction test.
