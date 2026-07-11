# 100 AI Designs UI System

Status: normative for the collection shell, homepage, and every design detail page.

The collection is an editorial research archive, not a neutral marketplace. Its paper-and-ink shell must remain recognisable while each design study is free to demonstrate a different visual language inside a clearly bounded showcase.

The words **must**, **should**, and **may** are deliberate:

- **Must** is required for every shipped page.
- **Should** is the default and needs a documented reason to change.
- **May** is optional.

## 1. System boundary

The product has two visual layers:

1. **Collection shell** — header, section furniture, editorial copy, metadata, controls, source note, and footer. This layer must use the rules in this document.
2. **Design specimen** — the preview tile or live showcase that demonstrates one design language. It may use its own colors, type, radii, motion, and density, but those decisions must stop at the specimen border.

A design detail page must not inherit the specimen's theme for its outer page. For example, Lumen stays dark inside its showcase; the surrounding title, prompt, use cases, source note, header, and footer stay paper and ink.

## 2. Design principles

1. **Structure before decoration.** Hierarchy comes from grid, scale, rules, and whitespace.
2. **One loud decision at a time.** Blue carries editorial emphasis; lime carries live/action state. Do not use both decoratively in the same small component.
3. **Metadata is quiet but exact.** IDs, statuses, labels, and progress use mono type, uppercase copy, and restrained scale.
4. **Show the system, not UI fashion.** The shell uses square geometry and visible construction lines; it avoids generic glass cards, pills, gradients, and soft shadows.
5. **Every effect earns a role.** Animation and visual novelty must communicate state, establish hierarchy, or explain the featured design.

## 3. Tokens

All shell styles must use semantic CSS custom properties. Raw color values should only appear in the root token declaration or inside a bounded design specimen.

```css
:root {
  --color-paper: #f3f0e8;
  --color-ink: #10100f;
  --color-line: #cbc8bd;
  --color-muted: #77766f;
  --color-blue: #2448ff;
  --color-lime: #d8ff00;

  --surface-page: var(--color-paper);
  --surface-action: var(--color-lime);
  --text-primary: var(--color-ink);
  --text-secondary: var(--color-muted);
  --border-subtle: var(--color-line);
  --border-strong: var(--color-ink);
  --accent-editorial: var(--color-blue);
  --accent-live: var(--color-lime);

  --gutter-page: 3vw;
  --header-height: 72px;
  --rule: 1px;
  --focus-width: 2px;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 18px;
  --space-5: 24px;
  --space-6: 34px;
  --space-7: 48px;
  --space-8: 70px;
  --space-9: 100px;

  --motion-fast: 160ms;
  --motion-standard: 240ms;
}
```

The legacy aliases `--paper`, `--ink`, `--line`, `--muted`, `--blue`, and `--lime` may remain during migration, but new styles should use semantic tokens.

### Color rules

- Page background and shell cards must use `--surface-page`.
- Primary copy and strong rules must use `--text-primary`.
- Secondary copy must use `--text-secondary`; it must still meet WCAG AA contrast at body-copy sizes.
- Blue is for editorial thesis, selected navigation, links on hover, and focus.
- Lime is for live status and primary action. It is not a general background color.
- Black, blue, and lime blocks may appear in method/DNA diagrams when they communicate categories rather than decorate empty space.

## 4. Typography

The shell uses three explicit roles. A component must not introduce a fourth shell typeface.

| Role | Typeface | Use |
| --- | --- | --- |
| Structural sans | Geist Sans, Arial fallback | headlines, body, navigation, card titles, controls |
| Editorial serif | Georgia, Times New Roman fallback | thesis phrases and emotional emphasis, normally italic |
| System mono | Geist Mono, monospace fallback | IDs, labels, status, coordinates, progress, tags |

Rules:

- Display sans should use tight tracking (`-0.04em` to `-0.10em`) and compact line height (`0.82` to `1.0`).
- Serif is an accent, not a body face. Use it for one phrase within a heading, never for long paragraphs.
- Mono labels must be 7–10px on desktop, uppercase where meaningful, with `0.08em`–`0.15em` tracking.
- Body copy should be 10–12px in dense editorial modules and at least 14px for longer reading passages.
- Headings and labels must retain the same role across home and detail pages.
- All shipped interface copy is English until localization is intentionally introduced site-wide.

## 5. Layout and spacing

### Page frame

- Desktop page gutter: `3vw`.
- Mobile page gutter: `18px`.
- Major content sections: `70px 3vw 100px`; mobile: `60px 18px 80px`.
- The preferred editorial split is `40% / 60%`: narrative or explanation left, product or evidence right.
- Split columns must be separated by a 1px ink rule, not by card shadows or empty decorative gutters.
- Dense grids must share borders (top and left on the grid; right and bottom on children) so rules stay exactly 1px.

### Spacing rhythm

- Use the token scale. Avoid one-off values unless required by a visual alignment.
- Use large empty fields around display type; use compact spacing inside metadata and controls.
- A major section needs one clear top anchor: a section label, title, or full-width rule. Do not stack multiple ornamental intros.

## 6. Geometry and surface

- Collection chrome must use square corners.
- Shell borders are 1px. A 2px border is reserved for focus or a deliberately featured functional object such as the reusable prompt.
- Shell cards and controls must not use drop shadows.
- Shell backgrounds must not use decorative gradients, glassmorphism, blur cards, or noise textures.
- The sticky header may use a subtle backdrop blur only to preserve legibility over scrolling content.
- Pills are prohibited in shell chrome. A small rectangular live/status badge is allowed.
- A specimen may break these rules only within its own clipped preview or showcase boundary.

## 7. Shared chrome

All routes must render the shared primitives from `components/SiteChrome.tsx`.

### Site header

- Desktop height: 72px. Mobile height: 68px.
- Sticky at the top with a paper background, bottom subtle rule, and the highest shell z-index.
- Left: 100 AI Designs wordmark.
- Center: Designs, Method, and Reference navigation.
- Right: outlined GitHub action.
- On detail routes, home fragments must resolve through `/` (`/#explore`, `/#system`).
- At `680px` and below, the full center nav may hide, but a visible `INDEX ↓` link must remain. Never leave the mobile header with only brand and GitHub.

### Detail context bar

- Sits immediately below the site header.
- Left: return to all designs. Center: `DESIGN NNN / 100`. Right: live experience link.
- Uses mono microtype and a strong 1px bottom rule.
- On mobile, the center progress may hide; both navigation actions must remain visible.

### Site footer

- Every route ends with the shared paper footer after page-specific content.
- Three desktop columns: wordmark, source statement, progress.
- Progress text is passed by the page and follows `NNN / 100 · OPEN DESIGN LAB · 2026`.
- Mobile collapses to one column and left-aligns progress.

### Detail footer

- Appears before the shared site footer on detail pages.
- Contains library return, current ID, and next design label.
- A next label without a working destination must render as text, not a deceptive link.

### Section label

- Uses mono type and a full-width ink rule.
- Detail sections use a blue numeric index, title, and optional right metadata.
- Home sections may omit the index but must retain the same baseline, type role, and rule.

## 8. Components and states

### Links

- Default shell links inherit text color and should not use a decorative underline.
- Hover must produce a visible change: ink, blue, or an intentional background inversion.
- External links end with `↗`; intra-page progression may use `↓`; back links use `←`.
- Links must describe their destination (`OPEN LIVE EXPERIENCE`, not `CLICK HERE`).

### Buttons

- Primary action: lime background, ink text, 1px ink border.
- Secondary action: paper background, ink text, 1px ink border.
- Hover may invert to ink/paper.
- Pressed state should translate no more than 1px or use a color change; no bounce.
- Disabled state must reduce contrast and remove pointer affordance while keeping its label readable.
- Success feedback replaces or supplements the verb (`COPIED`, `DOWNLOADED`) and must not rely on color alone.

### Cards

- Collection cards use a preview region, an information row, and a tag row separated by rules.
- Live cards use the lime badge; queued cards use a quiet outlined badge.
- Card hover may adjust contrast/saturation slightly but must not lift, scale, tilt, or add a shadow.
- The entire card is one clear target. Avoid nested controls unless the card is no longer a link.

### Forms

- Inputs use square 1px ink frames and paper backgrounds.
- Native font inheritance is required.
- Placeholder and entered text must meet contrast requirements.
- Labels remain visible; placeholder text is not a replacement for a label.

## 9. Motion

- Shell transition duration is 160–240ms.
- Use direct easing for controls; avoid spring and bounce animation.
- Do not animate layout on initial load.
- Respect `prefers-reduced-motion: reduce` by removing nonessential transitions and smooth scrolling.
- A design specimen may use richer motion only when motion is part of the documented style DNA and when reduced-motion behavior exists.

## 10. Responsive behavior

The standard breakpoints are `980px` and `680px`.

### At 980px and below

- 40/60 narratives become one column.
- The separating vertical rule becomes a horizontal rule.
- Five-column grids reduce to two columns.
- Detail hero, prompt layout, and other paired evidence modules stack.

### At 680px and below

- Use the 18px page gutter and 68px header.
- Main navigation hides; `INDEX ↓` remains visible.
- Library and content grids become one column.
- Footer becomes one column.
- Section labels and context bars may hide nonessential center metadata, never primary navigation.
- Showcases may change from landscape to portrait aspect ratio when interaction remains usable.
- No horizontal page scroll is acceptable at 320px viewport width.

## 11. Imagery and media

- Production assets must be local or served from an owned, stable origin. Do not hotlink remote editorial images.
- Every `<img>` needs meaningful alt text; purely decorative images use an empty alt.
- Preview and showcase media use `object-fit: cover` with an explicit aspect ratio to prevent layout shift.
- Image failure must not expose filename or raw alt text over an otherwise finished composition; provide a designed fallback surface where media is essential.
- Compress raster assets to an appropriate display size and verify all nine Lumen destinations before deployment.

## 12. Accessibility and semantics

- Use one `<main>` landmark per page, with shared header and footer outside or semantically adjacent as the framework requires.
- Navigation groups require an accessible label.
- The page must retain a logical heading order and exactly one `<h1>`.
- Every interactive element must be reachable and operable by keyboard.
- All links and buttons use a 2px blue focus outline with 3px offset.
- Focus must never be removed unless replaced by a stronger visible treatment.
- Do not communicate live/queued, selected, success, or error states with color alone.
- Touch targets should be at least 44px in either height or combined hit area on mobile.

## 13. Content contract

Every design detail page must include:

1. Shared site header.
2. Detail context bar with design ID and live URL.
3. Product thesis and bounded live showcase.
4. Style DNA.
5. Reusable prompt with a working copy action.
6. Recommended and unsuitable use cases.
7. Source/reference note, including 21st.dev when its distribution model is referenced.
8. Detail footer and shared site footer.

Copy should be concrete and testable. Replace vague adjectives with composition, type, color, motion, density, interaction, and anti-pattern decisions.

## 14. Definition of done

Before a page is shipped, verify all of the following:

- [ ] Shared header, section labels, detail context (if applicable), and shared footer are used.
- [ ] Home and detail navigation resolve to the correct paths.
- [ ] Mobile retains a visible Index link.
- [ ] Paper/ink shell is consistent; specimen styling does not leak into page chrome.
- [ ] Typography follows the sans/serif/mono role lock.
- [ ] Only token values are used for shell colors and spacing.
- [ ] Borders remain 1px and square; no shell shadows, pills, or decorative gradients were added.
- [ ] All page copy is English.
- [ ] Hover, focus, disabled, loading, success, and error states are designed where relevant.
- [ ] Keyboard flow and visible focus are verified.
- [ ] Images are local, load successfully, have correct alt text, and do not shift layout.
- [ ] Layout is checked at desktop, 980px, 680px, and 320px widths.
- [ ] No console errors, failed requests, clipped copy, or horizontal scroll remain.
- [ ] Production build passes and the deployed URLs are smoke-tested.
