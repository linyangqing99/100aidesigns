# 100 AI Designs architecture

## Why every design gets its own folder

Each design is an independently versioned research unit with a stable contract:

```text
designs/NNN-slug/
  manifest.json   machine-readable identity and routing
  prompt.md       reusable generation instructions
  README.md       design reasoning and reuse boundary
  site/           optional standalone implementation when migrated into the monorepo
  assets/         optional local preview assets
```

The catalog application lives at the repository root. A design can initially link to an independently deployed site, then move into `site/` without changing its registry identity.

## Future Skill/MCP boundary

The future tool should read `manifest.json` and `prompt.md`, filter by product type, visual family, density, tone, and interaction pattern, and return:

1. the recommended style;
2. the full prompt;
3. suitable and unsuitable use cases;
4. reference implementation URL;
5. implementation constraints.

This keeps the web catalog, a Codex skill, and an MCP server on the same source of truth.
