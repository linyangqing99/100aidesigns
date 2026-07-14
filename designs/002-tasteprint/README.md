# 002 — Tasteprint Visual Direction Lab

Tasteprint helps people who can recognize a visual direction but cannot yet name it. The user chooses three images by instinct; the product translates their overlap into traits, a palette, composition rules, motion guidance, and a reusable AI creative prompt.

## Product loop

1. Browse or shuffle eight local visual studies.
2. Focus and keep exactly three images.
3. Read the generated Tasteprint direction sheet.
4. Copy the prompt into an image, site, or campaign workflow.
5. Close the sheet, revise the selection, and compare another direction.

## Files

- `manifest.json`: machine-readable registry and deployment identity.
- `prompt.md`: reusable generation rules, use cases, constraints, and avoid list.
- `site/`: independent Vite + React product deployed to Vercel.
- `site/public/art/`: original local SVG studies used by the image deck.
- catalog detail: `app/designs/002-tasteprint/page.tsx` in the repository root.
- catalog preview: `public/previews/tasteprint.svg` in the repository root.

## Run the standalone product

```bash
cd designs/002-tasteprint/site
npm install
npm run dev
```

Validation:

```bash
npm run lint
npm test
npm run build
```

## Accessibility and responsive behavior

The core selection loop works with pointer, touch, and keyboard. The result sheet moves focus into a contained dialog, closes with Escape, restores focus to its trigger, and respects reduced motion. The layout is checked at 980px, 680px, and 320px without horizontal scrolling.

## Reuse boundary

Reuse the visual-taste loop, focus hierarchy, and result-sheet structure. Do not reuse the Tasteprint name, exact copy, local artwork, or the final palette as an unmodified brand identity.
