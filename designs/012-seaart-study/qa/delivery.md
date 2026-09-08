# SeaArt case 012 delivery

Verified 2026-09-08. Reference: https://www.seaart.ai/zhCN, browser-visible Chinese community homepage. The original URL also exposes a different public marketing homepage; this study follows the signed-in community layout observed during the task. No account identity or session data was copied.

## Delivered

- Live replica: https://100ai.design/studies/012-seaart-homepage
- Case detail: https://100ai.design/designs/012-seaart-study
- Vercel deployment: FBfAodPPjKZ7HmDoVnjLEts5JzSa, qing99s-projects/100aidesigns.
- Existing production domain alias confirmed by Vercel CLI. No DNS changes.
- 9 featured cards, 4 event cards, 12 gallery snapshot cards, 44 local assets including source icon fonts and three compressed video clips.
- Collection registry, actual preview screenshot, English case analysis, source attribution, reusable prompt, sitemap, and rendering contracts.

## Verification

- npm test: Vinext build and 8/8 rendered HTML/contract tests passed.
- npm run lint passed.
- npm run build:vercel passed; Vercel's production build also passed.
- Real Chrome browser: 320, 390, 680, 768, 980, 1024, 1440 CSS px, zero horizontal document overflow. See responsive.json.
- All displayed image assets decoded on the specimen; no broken image observed.
- Search Qwen returns one matching card. Clearing via actual keyboard restores all 12 gallery cards. The automation locator's empty-string fill did not clear the input, so keyboard select-all/backspace was used to verify the actual behavior.
- Media-type filters and their empty state work together with search. Popular sorting places the 193.4K-view entry first. Latest explicitly labels the result as reverse snapshot order, not live chronology.
- Local favorite toggles from 98 to 99 and appears in the local collection tab; undone after QA.
- Detail modal, use-same action, creation mode, prompt save confirmation, and Escape/focus restoration verified. Actual generation is external to the specimen.
- Mobile search toggles into view and closes after submit. Closed mobile navigation is inert; selecting the event anchor closes the navigation and stays on the specimen URL.
- Local case page at 390px: preview loaded, visible INDEX link, no horizontal overflow.
- Production replica: search, 390px navigation dismissal/inert, image decode, and overflow checked. Production case preview loaded and replica link points to the correct canonical domain.
- Production URL and asset HTTP checks: see production-http.json.

## Explicit limits

The home feed is a bounded snapshot, not a live recommendation system. Card metadata and source claims are source observations, not independent verification. Account, payment, remote uploads, and AI generation are not connected. Forms store prompts locally only. Source viewport measurements informed the reconstruction, but no pixel-diff equality or performance equivalence is claimed. The narrower layouts are adaptations of the desktop community page. Only two ambient videos play simultaneously, paused offscreen and under reduced motion; source animation timing is not synchronized.

Chrome console included extension-origin noise (a chrome-extension module load failure and closed extension message channels). No error attributable to the specimen JavaScript was observed; this is not a claim that the entire browser console was empty.

The reusable prompt has not passed a blind reproduction test. Source branding and artwork remain attributable to their owners.
