import type { Metadata } from "next";
import { site } from "@/data/site";

/** Frases que clientes buscan en Google (Perú / Lima Este). */
export const searchKeywords = [
  "protein bar Santa Anita",
  "protein bar Lima",
  "waffles proteicos Lima",
  "waffles proteicos Santa Anita",
  "frappé proteico Lima",
  "frappé proteico Santa Anita",
  "cafetería saludable Santa Anita",
  "cafetería fitness Lima",
  "batido proteico Lima",
  "post entreno Santa Anita",
  "pre entreno Lima",
  "comida sin gluten Santa Anita",
  "sin lactosa Santa Anita",
  "sin azúcar Lima",
  "waffles salados proteicos",
  "Roots Protein Bar",
  "delivery saludable Santa Anita",
  "protein bar cerca de mí",
] as const;

const HOME_TITLE = "Roots Protein Bar | Waffles y Frappés Proteicos en Santa Anita, Lima";
const HOME_DESCRIPTION =
  "Protein bar en Santa Anita, Lima: waffles dulces y salados, frappés y bebidas altas en proteína, sin gluten, lactosa ni azúcar. Mira la carta, pide por WhatsApp o visita Calle Las Avutardas 194.";

export function pageMetadata({
  title,
  description,
  path,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: readonly string[];
}): Metadata {
  const url = path === "/" ? site.siteUrl : `${site.siteUrl}${path}`;
  const keywordList = [...(keywords ?? searchKeywords)];

  return {
    title,
    description,
    keywords: keywordList,
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
  keywords: searchKeywords,
});
