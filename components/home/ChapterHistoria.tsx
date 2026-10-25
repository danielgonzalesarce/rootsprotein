import Image from "next/image";
import { Chapter } from "@/components/home/Chapter";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { story } from "@/data/story";

export function ChapterHistoria() {
  return (
    <Chapter id="nosotros" surface="avena" tone="light" curve="b">
      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,24rem)] lg:gap-16">
        <figure className="lg:order-2">
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-salvia sm:aspect-[4/3] lg:aspect-[3/4]">
            <Image
              src="/images/local/arco.png"
              alt="Mesa y arco iluminado de Roots Protein Bar en Santa Anita"
              fill
              sizes="(max-width: 1024px) 100vw, 384px"
              className="object-cover object-[center_30%]"
            />
          </div>
          <figcaption className="mt-3 text-sm text-tinta/80">Calle Las Avutardas 194, Santa Anita</figcaption>
        </figure>
        <div className="lg:order-1">
          <SectionTitle>{story.title}</SectionTitle>
          <p className="mt-5 max-w-[36ch] text-lg">{story.lead}</p>
          <ol className="mt-8 grid gap-6">
            {story.points.map((point, index) => (
              <li key={point.title} className="grid grid-cols-[auto_minmax(0,1fr)] gap-4">
                <span className="nums pt-1 text-sm text-hoja">{index + 1}</span>
                <div>
                  <h3 className="font-display text-[1.45rem] leading-tight tracking-[-0.02em] text-savia">{point.title}</h3>
                  <p className="mt-1 max-w-[42ch]">{point.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Chapter>
  );
}
