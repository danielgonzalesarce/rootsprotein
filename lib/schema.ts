import { loyalty } from "@/data/loyalty";
import { site } from "@/data/site";
import { searchKeywords } from "@/lib/seo";

type CafeSchema = {
  "@context": "https://schema.org";
  "@type": string[];
  name: string;
  alternateName?: string[];
  description: string;
  url: string;
  telephone: string;
  priceRange: string;
  servesCuisine: string[];
  keywords: string;
  hasMenu: string;
  menu: string;
  image?: string[];
  address: {
    "@type": "PostalAddress";
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode?: string;
    addressCountry: string;
  };
  areaServed?: {
    "@type": "City" | "AdministrativeArea";
    name: string;
  }[];
  openingHoursSpecification?: {
    "@type": "OpeningHoursSpecification";
    dayOfWeek: string[];
    opens: string;
    closes: string;
  }[];
  geo?: {
    "@type": "GeoCoordinates";
    latitude: number;
    longitude: number;
  };
  paymentAccepted?: string;
  sameAs?: string[];
  makesOffer?: {
    "@type": "Offer";
    itemOffered: {
      "@type": "Service" | "Product";
      name: string;
      description?: string;
    };
  }[];
};

export function cafeSchema(): CafeSchema {
  const sameAs = [site.instagramUrl, site.tiktokUrl, site.mapsUrl].filter((url) => url.length > 0);
  const data: CafeSchema = {
    "@context": "https://schema.org",
    "@type": ["CafeOrCoffeeShop", "Restaurant", "LocalBusiness"],
    name: site.name,
    alternateName: ["Roots", "Roots Protein Bar Santa Anita", loyalty.name],
    description:
      "Protein bar en Santa Anita, Lima. Waffles dulces y salados, frappés y bebidas altas en proteína, sin gluten, lactosa ni azúcar. Pedidos por WhatsApp y recojo en local.",
    url: site.siteUrl,
    telephone: `+${site.whatsappNumber}`,
    priceRange: "S/ 15 - S/ 26",
    servesCuisine: [
      "Protein bar",
      "Waffles proteicos",
      "Frappés proteicos",
      "Bebidas fitness",
      "Comida saludable",
      "Sin gluten",
    ],
    keywords: searchKeywords.join(", "),
    hasMenu: `${site.siteUrl}/carta`,
    menu: `${site.siteUrl}/carta`,
    image: [`${site.siteUrl}/og-image.jpg`, `${site.siteUrl}/images/logo/Roots_Protein_Bar_logo.png`],
    address: {
      "@type": "PostalAddress",
      streetAddress: site.streetAddress,
      addressLocality: site.district,
      addressRegion: site.city,
      addressCountry: "PE",
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Santa Anita" },
      { "@type": "City", name: "Lima" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: site.opensAt,
        closes: site.closesAt,
      },
    ],
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Delivery por WhatsApp",
          description: `Pedidos al ${site.whatsappDisplay}. Cobertura confirmada por chat.`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: loyalty.name,
          description: `${loyalty.stampsNeeded} sellos = ${loyalty.prizeLabel}.`,
        },
      },
    ],
  };

  if (sameAs.length > 0) data.sameAs = sameAs;
  if (site.coordinates) {
    data.geo = {
      "@type": "GeoCoordinates",
      latitude: site.coordinates.lat,
      longitude: site.coordinates.lng,
    };
  }
  if (site.payments.length > 0) data.paymentAccepted = site.payments.join(", ");
  return data;
}

export function faqSchema(
  items: { q: string; a: string }[],
): {
  "@context": "https://schema.org";
  "@type": "FAQPage";
  mainEntity: {
    "@type": "Question";
    name: string;
    acceptedAnswer: { "@type": "Answer"; text: string };
  }[];
} {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}
