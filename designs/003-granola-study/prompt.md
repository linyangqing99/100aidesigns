# Granola homepage transfer prompt

Version: 0.1.0
Status: documented against the implementation; blind reproduction test pending

Design a calm public homepage for a serious AI work product. Use the structure and visual restraint of an editorial software company, while keeping all brand, copy, people, screenshots, and assets original.

- **Product goal:** make a meeting-memory tool feel useful, private, and mature before explaining every feature.
- **Hero:** use a desktop text-and-product split. Lead with one large serif promise, one compact supporting line, and one primary action. Pin a layered product scene through the opening scroll. Delay its scale change, add one live note line, and let the material, paper, note, and call layers move at different speeds as the second message enters.
- **Page rhythm:** alternate very large quiet fields with denser proof moments. Use one dark statement section to reset attention, then return to neutral paper.
- **Visual language:** warm off-white paper, charcoal ink, soft gray-green surfaces, and one forest-green signal. Avoid gradients, neon, glow, and decorative glass.
- **Typography:** expressive, narrow editorial serif for promises and outcomes; disciplined grotesk sans for navigation, descriptions, controls, and evidence. The current implementation uses Newsreader and DM Sans as open substitutes for the source page's Quadrant and Melange roles.
- **Workflow:** tell the product story through before, during, and after states. Each state needs one practical outcome and one visible piece of product evidence.
- **Interaction:** include a touch-safe stage selector and a large conversation-memory composer. Begin its typewriter cycle only when the section is in view, allow the user to interrupt and type, and show empty-error, loading, and success states.
- **Motion:** use scroll-driven opacity and transform changes for the hero product state, plus an in-view typewriter cycle for the chat composer. Do not attach a window scroll listener. Respect reduced motion.
- **Responsive behavior:** collapse the hero and workflow into one column, preserve the main action above the fold, use a compact menu, and prevent horizontal scrolling at 320px.
- **Accessibility:** provide one h1, semantic landmarks, labeled navigation and form controls, visible focus, aria-live form feedback, meaningful image alt text, and color-independent selected state.
- **Attribution:** keep source attribution on the surrounding audit page and project documentation, not inside the replica experience.
- **Use cases:** focused AI SaaS, note-taking products, knowledge tools, executive productivity products, and privacy-sensitive workflow software.
- **Avoid:** copied source copy or assets, fake customer logos, generic card grids, repeated eyebrow labels, inflated AI claims, pill-shaped containers, purple gradients, testimonial overload, and a landing page with no working product moment.
