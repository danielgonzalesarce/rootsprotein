export type Review = {
  id: string;
  name: string;
  text: string;
  rating: 5 | 4;
};

/**
 * Reseñas destacadas en la web (copiadas de Google Maps).
 * Cuando un cliente deja una reseña nueva en Google, aparece primero en Maps;
 * súbela aquí para mostrarla también en la página del local.
 */
export const reviews: Review[] = [
  {
    id: "r1",
    name: "Pedro Corilla",
    text: "Excelente atención al cliente, un gran servicio y un ambiente más que agradable.",
    rating: 5,
  },
  {
    id: "r2",
    name: "Chcreaciones",
    text: "Me encantó, muy rico y muy considerado el personal, vine con mi pequeño y mucha paciencia.",
    rating: 5,
  },
  {
    id: "r3",
    name: "Romina Q",
    text: "Muy rico",
    rating: 5,
  },
];
