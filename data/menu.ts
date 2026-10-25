export type CategoryId =
  | "waffles-dulces" | "waffles-salados" | "frappes"
  | "bebidas-calientes" | "fitness" | "tes";

export type Variant = { id: string; label: string; price: number };
export type Macros = { protein: number; calories?: number };

export type Product = {
  id: string;
  name: string;
  category: CategoryId;
  subcategory?: string;
  description?: string;
  image?: string;
  badge?: "mas-vendido" | "destacado" | "nuevo";
  macros?: Macros; // si falta, hereda las de la categoría
  variants: Variant[];
  addon?: { id: string; label: string; options: string[]; price: number };
};

export const categories: {
  id: CategoryId;
  name: string;
  group: "comer" | "tomar";
  macros?: Macros;
}[] = [
  { id: "waffles-dulces", name: "Waffles dulces", group: "comer", macros: { protein: 34, calories: 320 } },
  { id: "waffles-salados", name: "Waffles salados", group: "comer", macros: { protein: 40, calories: 350 } },
  { id: "frappes", name: "Frappés", group: "tomar", macros: { protein: 27, calories: 210 } },
  { id: "bebidas-calientes", name: "Bebidas calientes", group: "tomar", macros: { protein: 25, calories: 190 } },
  { id: "fitness", name: "Fitness", group: "tomar" },
  { id: "tes", name: "Tés funcionales", group: "tomar" },
];

const v = (id: string, label: string, price: number): Variant => ({ id, label, price });
const one = (price: number): Variant[] => [v("unico", "Único", price)];
const BUBBLE = { id: "bubble", label: "Conviértelo en bubble tea", options: ["Lychee", "Blueberry"], price: 2 };

// TODO(dueña): preguntar cuáles son sus productos estrella. badge queda sin usar.

export const products: Product[] = [
  // WAFFLES DULCES (34 g proteína · 320 kcal)
  { id: "waffle-classic", name: "Waffle Classic", category: "waffles-dulces", subcategory: "Base manjar", variants: one(22) },
  { id: "waffle-caramel-crunch", name: "Waffle Caramel Crunch", category: "waffles-dulces", subcategory: "Base manjar",
    description: "Para amantes de las pecanas, con plátano y manjar.", variants: one(22) },
  { id: "waffle-peanut-butter-brownie", name: "Waffle Peanut Butter Brownie", category: "waffles-dulces", subcategory: "Base chocolate", variants: one(22) },
  // TODO(dueña): hay un cuarto waffle dulce de base chocolate cuyo nombre y precio no se leen en la foto de la carta. Agregarlo cuando se confirme.

  // WAFFLES SALADOS (40 g proteína · 350 kcal) — base de queso
  { id: "waffle-cheese", name: "Waffle Cheese", category: "waffles-salados", subcategory: "Base de queso",
    description: "Deliciosa combinación de queso y miel.", variants: one(24) },
  { id: "waffle-pizza", name: "Waffle Pizza", category: "waffles-salados", subcategory: "Base de queso",
    description: "Clásica, servida con salsa de pizza, queso y orégano.", variants: one(24) },
  { id: "waffle-americana", name: "Waffle Americana", category: "waffles-salados", subcategory: "Base de queso", variants: one(25) },
  { id: "waffle-peperoni", name: "Waffle Peperoni", category: "waffles-salados", subcategory: "Base de queso", variants: one(25) },
  { id: "waffle-hawaiana", name: "Waffle Hawaiana", category: "waffles-salados", subcategory: "Base de queso", variants: one(26) },

  // FRAPPÉS (27 g proteína · 210 kcal)
  { id: "frappe-sublime", name: "Frappé Sublime", category: "frappes", variants: one(19) },
  { id: "frappe-caramel", name: "Frappé Caramel", category: "frappes", variants: one(19) },
  { id: "frappe-mocaccina", name: "Frappé Mocaccina", category: "frappes", variants: one(19) },
  { id: "frappe-brownie", name: "Frappé Brownie", category: "frappes", variants: one(19) },
  { id: "frappe-oreo", name: "Frappé Oreo", category: "frappes", variants: one(19) },
  { id: "frappe-pie-limon", name: "Frappé Pie de limón", category: "frappes", variants: one(19) },
  { id: "frappe-caramel-frappuccino", name: "Frappé Caramel Frappuccino", category: "frappes", variants: one(19) },
  { id: "frappe-pie-manzana", name: "Frappé Pie de manzana", category: "frappes", variants: one(19) },
  { id: "frappe-cheesecake-fresa", name: "Frappé Cheesecake de fresa", category: "frappes", variants: one(19) },
  { id: "frappe-champ-naranja", name: "Frappé Champ de naranja", category: "frappes", variants: one(19) }, // TODO(dueña): confirmar el nombre exacto

  // BEBIDAS CALIENTES (25 g proteína · 190 kcal)
  { id: "mocca-latte", name: "Mocca Latte", category: "bebidas-calientes", variants: one(18) },
  { id: "caramel-latte", name: "Caramel Latte", category: "bebidas-calientes", variants: one(18) },
  { id: "hot-chocolate", name: "Hot Chocolate", category: "bebidas-calientes", variants: one(18) },

  // FITNESS
  { id: "pre-entreno", name: "Pre Entreno", category: "fitness",
    description: "Ideal para antes de entrenar: cafeína, taurina y electrolitos.", variants: one(15) },
  { id: "post-entreno", name: "Post Entreno", category: "fitness", macros: { protein: 25 },
    description: "Batido con 25 g de proteína y vitaminas esenciales para tomar después de entrenar.", variants: one(17) },

  // TÉS FUNCIONALES (se pueden convertir en bubble tea por +S/ 2)
  { id: "te-atomic", name: "Atomic", category: "tes", subcategory: "Energy",
    description: "Sabor naranja, con shot de energía.", variants: one(16), addon: BUBBLE },
  { id: "te-pink-protein", name: "Pink Protein", category: "tes", subcategory: "Beauty", macros: { protein: 10 },
    description: "Sabor a fresa, aporta 10 g de proteína y colágeno.", variants: one(16), addon: BUBBLE },
  // TODO(dueña): faltan los precios de los tés "Detox" (slim) e "Hydrate" (recover); se cortaron en la foto. Agregarlos con addon: BUBBLE cuando se confirmen.
  // TODO(dueña): hay un ítem cortado en el borde derecho de la pantalla de bebidas (parece un bowl o combo con 30 g de proteína). Confirmar nombre, descripción y precio.
];
