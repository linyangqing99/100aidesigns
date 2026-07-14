# Tasteprint style prompt

Version: 0.1.0
Status: documented against the shipped product; blind reproduction test pending

Design an editorial visual-direction product that turns instinctive image choices into a usable creative brief.

- **Product goal:** help a founder, designer, or creator articulate visual taste without needing design vocabulary.
- **User loop:** scan a deliberately varied image deck, focus one card at a time, keep exactly three instinctive choices, generate a deterministic tasteprint, then copy the resulting AI creative prompt.
- **Visual language:** warm mineral paper, fine construction grid, ink-black typography, one safety-orange signal color, slightly rotated image cards, crisp rules, and restrained analog softness.
- **Layout:** a centered editorial thesis above an asymmetric field of floating square cards; two instruction cards interrupt the composition; a persistent three-slot dock makes progress and the next action unmissable.
- **Interaction:** hovering or focusing a card sharpens and enlarges it while other cards blur; clicking or pressing Space keeps it; selection order is numbered; shuffle changes every card position; the result opens as a large art-direction sheet.
- **Result:** combine the selected cards into a direction name, five traits, a five-color palette, typography/composition/motion rules, and a reusable AI prompt.
- **Typography:** an expressive old-style serif for thesis and direction names, disciplined sans for navigation, and compact monospaced labels for system state.
- **Motion:** weighted focus transitions around 400ms, subtle image scale, and one modal entrance; no spring physics, bounce, or continuous decorative motion.
- **Accessibility:** use native buttons, visible focus, an aria-live selection status, a focus-contained dialog with Escape support, touch-safe targets, and reduced-motion behavior.
- **Use cases:** early brand discovery, campaign mood alignment, portfolio art direction, creative-team kickoff, and AI image or site prompting.
- **Avoid:** production asset hotlinks, generic dashboard cards, purple gradients, opaque taste scores, faux AI analysis, tiny touch targets, motion-only state, and results without an actionable takeaway.
