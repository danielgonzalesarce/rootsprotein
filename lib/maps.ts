import { site } from "@/data/site";

const query = `${site.streetAddress}, ${site.district}, ${site.city}, Peru`;

export function mapEmbedUrl(): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=17&output=embed`;
}

export function directionsUrl(): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;
}
