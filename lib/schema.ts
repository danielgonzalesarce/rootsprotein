import { site } from "@/data/site";

type CafeSchema = {
  "@context": "https://schema.org";
  "@type": "CafeOrCoffeeShop";
  name: string;
  url: string;
  telephone: string;
  priceRange: string;
  servesCuisine: string[];
  hasMenu: string;
  address: {
    "@type": "PostalAddress";
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  geo?: {
    "@type": "GeoCoordinates";
    latitude: number;
    longitude: number;
  };
  paymentAccepted?: string;
  sameAs?: string[];
};

export function cafeSchema(): CafeSchema {
  const sameAs = [site.instagramUrl, site.tiktokUrl].filter((url) => url.length > 0);
  const data: CafeSchema = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: site.name,
    url: site.siteUrl,
    telephone: `+${site.whatsappNumber}`,
    priceRange: "S/ 15 - S/ 26",
    servesCuisine: ["Café", "Waffles", "Bebidas proteicas", "Saludable"],
    hasMenu: `${site.siteUrl}/carta`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.streetAddress,
      addressLocality: site.district,
      addressRegion: site.city,
      addressCountry: "PE",
    },
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
