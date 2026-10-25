import type { Metadata } from "next";
import { site } from "@/data/site";

const HOME_TITLE = "Roots Protein Bar | Waffles y Frappés en Santa Anita";
const HOME_DESCRIPTION =
  "Cafetería saludable en Santa Anita: waffles, frappés y bebidas altas en proteína, sin gluten, lactosa ni azúcar. Mira la carta y pide por WhatsApp.";

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = path === "/" ? site.siteUrl : `${site.siteUrl}${path}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: "es_PE",
      type: "website",
      images: ["/og-image.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.jpg"],
    },
  };
}

export const homeMetadata = pageMetadata({
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  path: "/",
});
