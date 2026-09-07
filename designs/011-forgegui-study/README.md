# 011 ForgeGUI Homepage Study

An attributed homepage reproduction of [ForgeGUI](https://forgegui.com/), captured on 2026-09-07. Independent study. Not affiliated with ForgeGUI.

- [Case and learning notes](https://100ai.design/designs/011-forgegui-study)
- [Runnable replica](https://100ai.design/studies/011-forgegui-homepage)

## Scope and provenance

The specimen preserves the public page's copy, SVG markup, CSS, fonts, images, videos, breakpoints, and material effects. Its interaction JavaScript was written for this study. Account, generation, payment, and source analytics services are not connected. Demo forms validate locally and never send or retain inputs. The collection's existing analytics remain on collection pages only.

`asset-manifest.json` records 25 source asset URLs relative to https://forgegui.com/, response status, byte counts, and SHA-256 hashes. Two Instrument Serif font files were additionally localized from Google Fonts. `replica-notes.zh.md` preserves the original Chinese implementation and verification notes.

## Implementation

- `public/studies/011-forgegui/`: complete static runtime, with relative fonts and media.
- `next.config.ts`: clean study URL rewrites directly to its static document.
- The document base points at its asset directory. This preserves deep-path loading without a React wrapper or iframe, and isolates the specimen CSS from the collection shell.
- `app/designs/011-forgegui-study/page.tsx`: collection case with shared shell components.
- `public/previews/forgegui-study.webp`: compressed screenshot of the actual English replica. This small preview is loaded by the collection; the full media set is only loaded when opening the specimen.
- The replica has `noindex`; the attributed analysis page is included in the sitemap.

Run the collection with `npm run dev`, or validate its Vercel build with `npm run build:vercel` and `npx next start`. Open `/studies/011-forgegui-homepage?lang=en` or `?lang=zh`. The standalone runtime can also be served by any static server that mounts the public directory.

## Verification boundary

Before integration, the eight main section heights and primary heading metrics matched the source at 320, 390, 768, 1024, and 1440px, with no document horizontal overflow. Desktop menus, mobile navigation, dialog switching, focus handling, local form validation, FAQs, and reduced motion were checked in a real browser. This is measured layout parity, not a full pixel-by-pixel animation comparison.

Original media bytes are preserved, totaling roughly 24 MB with the page runtime. Below-fold video loading is deferred. The original local timing sample does not establish production speed or equivalence to the source; no public performance score is claimed.

## One useful lesson

**Material hierarchy can tell a user where to click.** Video establishes the world; a dark overlay makes the promise readable; neutral glass carries secondary information; blue, inner highlights, a dark lower edge, and shadow make the primary action feel tangible.

Practice by disabling the gradient, inner highlight, and outer shadow on `.fg-button`, then restoring them one at a time. Apply the same variables to a secondary card at a lower intensity. Study `.fg-button`, `--fg-gradient`, `--fg-shadow`, and `.fg-card-top-glow` in `styles.css`.

## Reuse boundary

The documented prompt is a design exercise for original brands and assets. It is version 0.1.0 and has not passed a blind reproduction test. Source customer counts, pricing, and product claims are preserved page copy, not independently verified claims by 100 AI Designs.
