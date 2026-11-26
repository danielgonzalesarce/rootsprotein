export const site = {
  name: "Roots Protein Bar",
  tagline: "Energía natural, raíces fuertes.",
  supportLine: "Alto en proteínas, libre de gluten, lactosa y azúcar.",
  hashtag: "#BeRoots",
  whatsappNumber: "51924699821",
  whatsappDisplay: "924 699 821", // TODO(dueña): confirmar número oficial
  district: "Santa Anita",
  streetAddress: "Calle Las Avutardas 194",
  city: "Lima",
  instagramUrl: "https://www.instagram.com/rootsprotein/",
  tiktokUrl: "https://www.tiktok.com/@rootsprotein", // TODO(dueña): confirmar la URL de TikTok
  mapsUrl: "https://maps.app.goo.gl/G9ErwzXqhfJd8sqC7",
  hours: "Lunes a domingo, 8:30 a. m. a 10:00 p. m.", // TODO(dueña): confirmar. Instagram dice 8:30–22:00 y TikTok dice 12:00–23:00
  opensAt: "08:30",
  closesAt: "22:00",
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  coordinates: null as { lat: number; lng: number } | null, // TODO(dueña): confirmar coordenadas
  addressReference: "", // TODO(dueña): referencia para llegar
  payments: ["Yape", "Plin", "Efectivo"],
  googleReviewUrl: "", // TODO(dueña): enlace para dejar reseña en Google
  foundedYear: "", // TODO(dueña): año de apertura
  deliveryZones: [] as string[], // TODO(dueña): zonas de delivery
  deliveryNote: "", // TODO(dueña): nota extra de delivery, si hace falta
};

export const fullAddress = `${site.streetAddress}, ${site.district}, ${site.city}`;
