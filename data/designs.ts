export type DesignEntry = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  family: string;
  status: "live" | "queued";
  tags: string[];
  preview: string;
  href?: string;
};

export const families = ["All", "Immersive", "Editorial", "Minimal Product", "Future Interface", "Brand Story", "Data Dense", "Retro Digital", "Organic", "Conversion", "Playful"];

export const designs: DesignEntry[] = [
  { id: "001", slug: "001-lumen", title: "Lumen Micro Journey", subtitle: "Discover a distant place with one minute of light", family: "Immersive", status: "live", tags: ["dark", "exploration", "emotional"], preview: "lumen", href: "/designs/001-lumen" },
  { id: "002", slug: "002-tasteprint", title: "Tasteprint", subtitle: "Turn three instinctive image choices into a usable creative direction", family: "Immersive", status: "live", tags: ["visual taste", "selection", "editorial"], preview: "tasteprint", href: "/designs/002-tasteprint" },
  { id: "003", slug: "003-quiet-saas", title: "Quiet SaaS", subtitle: "A calm, credible homepage for focused tools", family: "Minimal Product", status: "queued", tags: ["SaaS", "restraint", "trust"], preview: "quiet" },
  { id: "004", slug: "004-orbit-console", title: "Orbit Console", subtitle: "A spatial control room for future-facing products", family: "Future Interface", status: "queued", tags: ["HUD", "spatial", "motion"], preview: "orbit" },
  { id: "005", slug: "005-founders-note", title: "Founder’s Note", subtitle: "Brand storytelling led by a human voice", family: "Brand Story", status: "queued", tags: ["story", "portrait", "longform"], preview: "founder" },
  { id: "006", slug: "006-signal-room", title: "Signal Room", subtitle: "A dense intelligence and trends workspace", family: "Data Dense", status: "queued", tags: ["dashboard", "signals", "utility"], preview: "signal" },
  { id: "007", slug: "007-pixel-office", title: "Pixel Office", subtitle: "A 1990s desktop reimagined for collaboration", family: "Retro Digital", status: "queued", tags: ["pixel", "desktop", "nostalgia"], preview: "pixel" },
  { id: "008", slug: "008-moss-library", title: "Moss Library", subtitle: "A tactile knowledge archive shaped by nature", family: "Organic", status: "queued", tags: ["paper", "nature", "archive"], preview: "moss" },
  { id: "009", slug: "009-proof-first", title: "Proof First", subtitle: "An evidence-led service page built to convert", family: "Conversion", status: "queued", tags: ["conversion", "proof", "trust"], preview: "proof" },
  { id: "010", slug: "010-tiny-planet", title: "Tiny Planet", subtitle: "A playful interactive tool with toy-like controls", family: "Playful", status: "queued", tags: ["gamefeel", "3D", "lightweight"], preview: "planet" },
];
