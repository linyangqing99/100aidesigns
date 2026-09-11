import type { MetadataRoute } from "next";

const origin = "https://100ai.design";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: origin, changeFrequency: "weekly", priority: 1 },
    { url: `${origin}/designs/001-lumen`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${origin}/designs/002-tasteprint`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${origin}/designs/003-granola-study`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${origin}/designs/011-forgegui-study`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${origin}/designs/013-offscript`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${origin}/designs/012-seaart-study`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${origin}/studies/003-granola-homepage`, changeFrequency: "monthly", priority: 0.7 },
  ];
}
