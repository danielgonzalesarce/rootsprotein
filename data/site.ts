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
  /** Feature id de Google Maps (0x…:0x…) — usado para abrir el formulario de reseña */
  googleMapsFeatureId: "0x9105c700098f3bdd:0x175dc654809d99ae",
  googleMapsCid: "1683719901943798190",
  hours: "Lunes a domingo, 8:30 a. m. a 10:00 p. m.", // TODO(dueña): confirmar. Instagram dice 8:30–22:00 y TikTok dice 12:00–23:00
  opensAt: "08:30",
  closesAt: "22:00",
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  coordinates: { lat: -12.0497054, lng: -76.966619 },
  addressReference: "", // TODO(dueña): referencia para llegar
  payments: ["Yape", "Plin", "Efectivo"],
  /**
   * Enlace oficial para dejar reseña en Google (abre el formulario de Maps).
   * Ideal: pegar el link “Pedir reseñas” del Perfil de Empresa en NEXT_PUBLIC_GOOGLE_REVIEW_URL.
   */
  googleReviewUrl:
    process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL?.trim() ||
    "https://www.google.com/search?q=Roots+Protein+Bar+Santa+Anita&ludocid=1683719901943798190#lrd=0x9105c700098f3bdd:0x175dc654809d99ae,3",
  foundedYear: "", // TODO(dueña): año de apertura
  deliveryZones: [] as string[], // TODO(dueña): zonas de delivery
  deliveryNote: "", // TODO(dueña): nota extra de delivery, si hace falta
};

export const fullAddress = `${site.streetAddress}, ${site.district}, ${site.city}`;
