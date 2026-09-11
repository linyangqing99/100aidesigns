# OFFSCRIPT verification

Checked locally on 2026-09-11. Final preview serves the Vite production build at http://127.0.0.1:4193/ . This is local acceptance, not a public deployment or independent design review.

## Verified

- `npm ci` completed from the standalone lockfile. `npm run build` passed TypeScript and Vite production bundling.
- Skill `quick_validate.py` passed. Instructions, metadata and source-reference link are present. Independent skill reproduction testing was not performed.
- Widths 1440, 980, 680, 390 and 320 px showed no horizontal document overflow. See `evidence/responsive.json`.
- Inspected full desktop composition, phone layout, desktop/phone dark theme, and the phone brief dialog. See `evidence/desktop-full.webp`, `desktop-final.webp`, `mobile-final.webp`, `desktop-dark.webp`, `mobile-dark.webp`, `mobile-brief.webp`.
- The configured Latin DM Sans font loaded in the production preview. The unused Latin Extended font range is not requested for this English page. All three local images loaded. No captured runtime errors or HTTP failures remained in the final reload. See `evidence/final-browser-state.json`.
- Opened Soft Signal, navigated to The Fold and Somewhere Else, returned to a previous project, and closed with Escape. Focus returned to the originating project button.
- Tab / Shift+Tab stayed in the native modal. Mobile menu closed with Escape. Closing a brief opened from the mobile menu returned focus to the menu button.
- Service disclosures updated `aria-expanded` and hid the inactive content.
- Empty form submission was rejected. Whitespace-only name and idea were rejected after the validation fix. Editing the fields cleared custom validity and allowed a valid form.
- Downloaded a real Markdown brief and read it back; name, medium, idea and selected feeling matched the form. See `evidence/downloaded-brief.md`.
- Emulated reduced motion before reload: no active animations and no concealed reveal sections. System dark preference initialized dark theme; manual theme switching worked.

## Corrections during verification

1. The browser's background task surface initially timed out while capturing screenshots. Making this same task space visible resolved capture; no new task space was created.
2. Whitespace-only values passed native `required` checks. Added trimmed validation with useful native validation messages.
3. Closing the brief from the mobile menu could attempt to restore focus to a hidden link. Added a visible menu-button fallback and an Escape handler for the navigation disclosure.
4. The initial development preview resolved font files outside Vite's serving directory. Installed the standalone dependency set and verified the production bundle's local font assets. Final screenshots reflect the intended typeface.
5. Separated the React root entry from the App module so future component edits can use a clean Fast Refresh boundary.

## Scope and limits

- Visual inspection is by the implementer. No independent screenshot critic or studio-quality score is claimed.
- Lighthouse was not run; no Lighthouse score or production Core Web Vitals result is claimed. Asset/bundle size checks are not substitutes for field performance measurement.
- This is a fictional studio with original generated images, not a portfolio of manufactured objects, built spaces or real client work.
- No generated video, backend, account, email submission, analytics or payment was included in the standalone specimen. Collection integration and deployment are tracked separately below.
- The source article was accessible through technique 6; technique 7's body was unavailable behind a subscription boundary.
