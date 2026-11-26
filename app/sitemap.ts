import type { MetadataRoute } from "next";
import { site } from "@/data/site";

const pages: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/carta", changeFrequency: "weekly", priority: 0.9 },
  { path: "/nosotros", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contacto", changeFrequency: "monthly", priority: 0.8 },
  { path: "/cuenta", changeFrequency: "monthly", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return pages.map(({ path, changeFrequency, priority }) => ({
    url: path === "/" ? site.siteUrl : `${site.siteUrl}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
