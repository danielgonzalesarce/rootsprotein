import Image from "next/image";
import { menuBoardImage } from "@/data/images";

const claims = [
  { n: "01", label: "Alto en proteína" },
  { n: "02", label: "Sin gluten" },
  { n: "03", label: "Sin lactosa" },
  { n: "04", label: "Sin azúcar" },
];

export function CartaHeader() {
  return (
    <header className="px-3 pt-[calc(var(--header-h)+0.75rem)] sm:px-4 md:px-6">
      <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[1.5rem] bg-savia text-avena sm:rounded-[1.75rem]">
        <div className="absolute inset-0">
          <Image
            src={menuBoardImage.src}
            alt={menuBoardImage.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-savia via-savia/80 to-savia/45 md:bg-gradient-to-r md:from-savia md:via-savia/88 md:to-savia/55" />
        </div>

        <div className="relative grid gap-6 px-4 py-7 sm:gap-8 sm:px-7 sm:py-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-end md:gap-12 md:px-10 md:py-12 lg:px-12">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-salvia/85">Menú</p>
            <h1 className="mt-2 max-w-[10ch] font-display text-[clamp(2.4rem,8vw,4.5rem)] leading-[0.92] tracking-[-0.045em] sm:mt-3">
              Nuestra carta
            </h1>
            <p className="mt-3 max-w-[32ch] text-[0.98rem] leading-relaxed text-avena/72 sm:mt-4 sm:text-[1.05rem]">
              Waffles, frappés y bebidas para pedir ahora. Elige categoría y agrega al pedido.
            </p>
          </div>

          <ol className="border-t border-avena/15 md:border-t-0 md:border-l md:pl-10">
            {claims.map((claim, index) => (
              <li
                key={claim.n}
                className={`grid grid-cols-[auto_1fr] items-baseline gap-3 py-2.5 sm:gap-4 sm:py-3.5 ${
                  index < claims.length - 1 ? "border-b border-avena/12" : ""
                }`}
              >
                <span className="nums text-sm tracking-wide text-hoja">{claim.n}</span>
                <span className="text-[0.98rem] text-avena/90 sm:text-[1.05rem]">{claim.label}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </header>
  );
}
