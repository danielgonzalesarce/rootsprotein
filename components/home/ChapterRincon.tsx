import Image from "next/image";
import { Chapter } from "@/components/home/Chapter";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { ProductCardGrid } from "@/components/menu/ProductCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { galleryImages } from "@/data/images";

const slots = [
  { caption: "Fachada", file: "fachada.jpg" },
  { caption: "La barra", file: "barra.jpg" },
  { caption: "Juegos y libros", file: "rincon.jpg" },
];

export function ChapterRincon() {
  const photos = galleryImages.length > 0;

  return (
    <Chapter surface="salvia" tone="light" curve="e">
      <SectionTitle>Un rincón para quedarte</SectionTitle>
      <p className="mt-4 max-w-[42ch]">Un local pequeño y acogedor, con juegos de mesa y libros para compartir.</p>
      <div className="mt-8">
        <ProductCardGrid ids={["mocca-latte", "caramel-latte", "hot-chocolate"]} />
      </div>
      <ul className="mt-10 grid gap-4 md:grid-cols-3">
        {photos
          ? galleryImages.slice(0, 3).map((photo) => (
              <li key={photo.src}>
                <figure>
                  <div className="arch relative aspect-[4/5] bg-avena">
                    <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 768px) 100vw, 30vw" className="object-cover" />
                  </div>
                  <figcaption className="mt-2 text-sm">{photo.caption}</figcaption>
                </figure>
              </li>
            ))
          : slots.map((slot) => (
              <li key={slot.file}>
                <figure>
                  <ImagePlaceholder label={slot.file} className="aspect-[4/3] w-full" />
                  <figcaption className="mt-2 text-sm">{slot.caption}</figcaption>
                </figure>
              </li>
            ))}
      </ul>
    </Chapter>
  );
}
