import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { galleryImages } from "@/data/images";
import { story } from "@/data/story";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Nosotros | Protein Bar sin gluten en Santa Anita | Roots",
  description:
    "Conoce Roots Protein Bar en Santa Anita: antojo con propósito, waffles y frappés altos en proteína, libres de gluten, lactosa y azúcar. Energía natural, raíces fuertes.",
  path: "/nosotros",
  keywords: [
    "quiénes somos Roots Protein Bar",
    "protein bar sin gluten Lima",
    "cafetería saludable Santa Anita",
    "historia Roots Protein Bar",
  ],
});

const values = [
  { title: "Alto en proteína", text: "Waffles, frappés y bebidas pensados para sumar macros." },
  { title: "Sin gluten", text: "Hechos para que el antojo no te complique." },
  { title: "Sin lactosa", text: "Opciones claras, sin sorpresas en el vaso." },
  { title: "Sin azúcar", text: "Dulce con propósito, no con culpa." },
];

export default function NosotrosPage() {
  return (
    <main id="contenido" className="bg-avena text-tinta" data-surface="light">
      <section className="px-3 pb-3 pt-[calc(var(--header-h)+0.75rem)] sm:px-4">
        <div className="mx-auto grid w-full max-w-[1400px] gap-2.5 lg:grid-cols-12 lg:items-stretch">
          <div className="rounded-[1.5rem] bg-white px-6 py-8 ring-1 ring-savia/8 sm:px-8 sm:py-10 lg:col-span-7 lg:px-10 lg:py-12">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-hoja">Nosotros</p>
            <h1 className="mt-3 max-w-[14ch] font-display text-[2.5rem] leading-[1.02] tracking-[-0.04em] text-savia sm:text-[3.1rem] lg:text-[3.4rem]">
              {story.title}
            </h1>
            <p className="mt-4 max-w-[42ch] text-lg leading-relaxed text-tinta/70">{story.lead}</p>

            <ol className="mt-8 grid gap-0 border-t border-savia/12">
              {story.points.map((point, index) => (
                <li
                  key={point.title}
                  className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 border-b border-savia/12 py-5 sm:gap-5"
                >
                  <span className="nums pt-1 text-sm font-medium text-hoja">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="font-display text-[1.4rem] leading-tight tracking-[-0.02em] text-savia sm:text-[1.5rem]">
                      {point.title}
                    </h2>
                    <p className="mt-1.5 max-w-[44ch] text-tinta/65">{point.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/carta">Ver la carta</Button>
              <Button href="/contacto" variant="line">
                Cómo llegar
              </Button>
            </div>
          </div>

          <figure className="relative min-h-[22rem] overflow-hidden rounded-[1.5rem] bg-salvia sm:min-h-[26rem] lg:col-span-5 lg:min-h-full">
            <Image
              src="/images/local/arco.png"
              alt="Mesa y arco iluminado de Roots Protein Bar en Santa Anita"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-[center_28%]"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-savia/90 to-transparent px-5 pb-5 pt-16 text-sm text-avena">
              {site.streetAddress}, {site.district}
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="bg-salvia">
        <div className="mx-auto w-full max-w-[1400px] px-5 py-10 sm:px-6 md:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-hoja">Lo que nos define</p>
          <h2 className="mt-2 max-w-[16ch] font-display text-[1.9rem] leading-tight tracking-[-0.03em] text-savia sm:text-[2.2rem]">
            {site.tagline}
          </h2>
          <ul className="mt-8 grid gap-6 border-t border-savia/35 pt-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {values.map((value) => (
              <li key={value.title}>
                <h3 className="font-display text-[1.3rem] leading-tight tracking-[-0.02em] text-savia">
                  {value.title}
                </h3>
                <p className="mt-2 text-tinta/65">{value.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-3 py-3 sm:px-4">
        <div className="mx-auto grid w-full max-w-[1400px] gap-2.5 sm:grid-cols-3">
          {galleryImages.map((image) => (
            <figure key={image.src} className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-salvia">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-savia/85 to-transparent px-4 pb-3.5 pt-10 text-sm text-avena">
                {image.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </main>
  );
}
