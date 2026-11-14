import type { MetadataRoute } from "next";
import { pages, siteUrl } from "./site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return pages.map((p) => ({
    url: `${siteUrl}${p.path === "/" ? "/" : p.path}`,
    lastModified: now,
    changeFrequency: p.priority >= 0.8 ? "monthly" : "yearly",
    priority: p.priority,
  }));
}
