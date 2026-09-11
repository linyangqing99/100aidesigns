# OFFSCRIPT

Original fictional creative-studio website. The public design process in [Anshu Chimala's article](https://www.lennysnewsletter.com/p/how-to-turn-your-ai-into-a-world) informed the workflow, not a visual reproduction of the article or its examples.

## Run

```sh
cd designs/013-offscript/site
npm ci
npm run dev -- --port 4193 --strictPort
npm run build
```

The study is an independent Vite application, packaged by the collection build. From the repository root, `npm run build:offscript` creates `public/studies/013-offscript/`. Both `npm run build` and `npm run build:vercel` run this automatically. Generated assets use the absolute `/studies/013-offscript/` base, so the friendly rewrite can load images and fonts correctly.

- Collection case: https://100ai.design/designs/013-offscript
- Live specimen: https://100ai.design/studies/013-offscript-studio
- Rebuild before running the root development server if the generated static folder is absent.
- Production verification is recorded separately in [QA.md](QA.md).

## Product loop

View the visual work, open a project, browse the other concepts, then create and download a Markdown brief. The brief is generated in the browser; there is no account system, email submission, backend service, or real studio commission.

## Reuse

- Global skill: `/Users/clean./.codex/skills/ai-design-direction/SKILL.md`.
- Implementation prompt: [prompt.md](prompt.md), documented against this implementation, not validated by an independent reproduction.
- Decisions and provenance: [design-decisions.zh.md](design-decisions.zh.md).
- Full image-generation prompts: [asset-prompts.json](asset-prompts.json).
- Checks: [QA.md](QA.md).

All three concept images were created with the built-in image generation tool. Source PNG files remain in the generator output folder; optimized WebP copies are included in `site/public/art/`. This website is a fictional portfolio; it does not claim the objects were manufactured, the interior was built, or these studies were commissioned by clients.
