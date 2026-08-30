# 003 Granola Homepage Study

This study rebuilds the structure and visual rhythm of the [Granola homepage](https://www.granola.ai/) as reviewed on 2026-08-27, then transfers those decisions into an original fictional product called Afterword.

Independent study. Not affiliated with Granola.

Live replica: [100ai.design/studies/003-granola-homepage](https://100ai.design/studies/003-granola-homepage)

## Scope

The study preserves the source page's broad composition: a serif-led split hero, generous quiet space, alternating light and dark proof fields, a before-during-after product narrative, one restrained green signal, and a large editorial close. The replica itself stays free of audit notices; attribution remains on the 100 AI Designs detail page and in this documentation.

It does not copy Granola's logo, product name, copy, customers, people, screenshots, illustrations, video, or downloadable assets. The public replica uses original Afterword copy, a small interactive meeting-memory demo, and three original generated visuals stored locally.

## Fidelity matrix

| Layer | Treatment |
| --- | --- |
| Page rhythm | Preserved and simplified |
| Hero composition | Preserved as a two-stage scroll story where the pinned note, call rail, paper, and material layers move at different speeds |
| Typography roles | Source uses Quadrant and Melange; the implementation uses licensed-open Newsreader and DM Sans substitutes |
| Color behavior | Transferred into original neutral and forest-green tokens |
| Source copy | Rewritten |
| Product interaction | Reimagined as stage tabs and an in-view typewriter chat with a working question flow |
| Brand and assets | Original |

## Visual decisions learned

1. Large type becomes credible when surrounded by enough unclaimed space.
2. A quiet neutral page can use one dark field to reset attention without adding decorative color.
3. Product evidence works best when it arrives beside a concrete workflow stage.
4. Repeated serif promises and compact sans controls create an editorial product voice.
5. One restrained accent can organize actions, active state, and memory without becoming a theme effect.

## Files

- `manifest.json`: source date, route identity, study boundary, and asset provenance.
- `prompt.md`: reusable design rules and limits.
- `site/`: an independent Vite and React implementation.
- `site/public/assets/`: original generated Afterword product visuals.
- root study route: `app/studies/003-granola-homepage/page.tsx`.
- root audit route: `app/designs/003-granola-study/page.tsx`.

## Run the standalone study

```bash
cd designs/003-granola-study/site
npm install
npm run dev
```

Validation:

```bash
npm run lint
npm test
npm run build
```

## Reuse boundary

Reuse the composition logic, hierarchy, pacing, workflow storytelling, and documented design rules. Do not reuse Granola's identity or assets, and do not present Afterword as an endorsed Granola product.
