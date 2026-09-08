# SeaArt Homepage Study — reusable prompt

Version: 0.1.0  
Status: documented; blind reproduction test pending.

This prompt transfers interface decisions from the attributed study to an original creative product. It does not authorize reuse of SeaArt's identity, product claims, or community artwork.

## Product goal

Build a responsive creator-community homepage that helps a creator choose a creation mode, discover useful models, explore community work, and return to creation without losing their place. Use an original brand, original copy, and licensed media.

## Composition

Anchor the desktop page with a persistent left navigation rail. Keep the main header compact. Begin with three creation entry points, then horizontal recommendation cards, a competition or event area, and a visual community feed. Keep a creation action available during browsing.

Give each section a distinct job and card rhythm. Navigation should remain a stable frame as the feed becomes more visually varied.

## Visual language

Use near-black page and navigation surfaces, a small number of slightly lighter panels, restrained borders, clear white headings, and quieter gray metadata. Let images carry most of the color. Reserve the brightest accent for selection and creation actions.

Use a readable interface sans with complete Chinese character fallbacks where required. Separate section headings, card titles, and metadata through size, weight, and spacing. Keep navigation labels stable and all text over imagery legible.

## Media

Preserve the intended crop and aspect ratio for each card family. Use portrait cards for model recommendations, landscape cards for events, and portrait imagery in the community feed. Serve assets locally, provide meaningful image alternatives, defer below-fold loading, and document their provenance.

## Interaction

Implement navigation selection, horizontal card browsing, feed categories, search, and a persistent creation entry. Give each visible action a real destination or clear local feedback. Demonstration flows must explain their frontend scope before asking for input. Do not collect account credentials or pretend to generate content.

## Responsive behavior and accessibility

Adapt navigation and card density as space narrows. Keep key actions reachable, allow only deliberate row scrolling, and avoid horizontal page overflow. Compare desktop, tablet, and narrow mobile layouts with the chosen reference state.

Preserve heading order, keyboard operation, visible focus, meaningful control labels, and reduced-motion behavior. Never use motion to conceal inactive controls or loading failures.

## Use cases

- Visual creation tools with multiple modes
- AI model and workflow discovery
- Creative communities and portfolios
- Image-led libraries with frequent browsing

## Delivery and validation

Isolate the specimen from the collection shell. Provide a source-state note, local media, asset provenance, a current implementation screenshot, and a list of working frontend interactions. Record actual browser widths, interaction checks, and deployment evidence. Keep visual fidelity, backend capability, and deployment status separate.

The prompt remains unvalidated until a new implementation is generated without access to this reference implementation and checked against the documented product contract.

## Avoid

- Bright decoration on every panel
- Identical card proportions for every kind of content
- Unreadable text over artwork
- Navigation that disappears unexpectedly during browsing
- Fake generation results or unsupported product claims
- Copied source branding in an original product
- Pixel-equality or speed-equivalence claims without matched measurements
