import type { MetadataRoute } from "next";

const origin = "https://100ai.design";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: origin, changeFrequency: "weekly", priority: 1 },
    { url: `${origin}/designs/001-lumen`, changeFrequency: "monthly", priority: 0.8 },
  ];
}
