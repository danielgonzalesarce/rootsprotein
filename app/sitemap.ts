import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/carta", "/contacto"].map((path) => ({
    url: path === "/" ? site.siteUrl : `${site.siteUrl}${path}`,
  }));
}
