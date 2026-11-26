import Image from "next/image";
import { STAMP_IMAGE } from "@/components/loyalty/StampMark";
import { loyalty } from "@/data/loyalty";

const steps = [
  { n: "01", label: "Crea tu cuenta con WhatsApp" },
  { n: "02", label: "Escanea el QR del local" },
  { n: "03", label: `Llega a ${loyalty.stampsNeeded} y canjea` },
];

type Props = {
  greeting?: string | null;
};

export function SellosHeader({ greeting }: Props) {
  return (
    <header className="px-3 pt-[calc(var(--header-h)+0.75rem)] sm:px-4 md:px-6">
      <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[1.5rem] bg-savia text-avena sm:rounded-[1.75rem]">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -right-10 top-1/2 h-56 w-56 -translate-y-1/2 opacity-[0.18] sm:-right-6 sm:h-72 sm:w-72 md:right-8 md:h-80 md:w-80 md:opacity-[0.22]">
            <Image
              src={STAMP_IMAGE}
              alt=""
              fill
              priority
              sizes="320px"
              className="object-contain"
              unoptimized
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-savia via-savia/92 to-savia/70" />
          <div className="absolute -left-20 top-0 h-56 w-56 rounded-full bg-hoja/25 blur-3xl" />
        </div>

        <div className="relative grid gap-6 px-4 py-7 sm:gap-8 sm:px-7 sm:py-10 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:items-end md:gap-12 md:px-10 md:py-12 lg:px-12">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-salvia/85">{loyalty.name}</p>
            <h1 className="mt-2 max-w-[12ch] font-display text-[clamp(2.4rem,8vw,4.5rem)] leading-[0.92] tracking-[-0.045em] sm:mt-3">
              {greeting ? `Hola, ${greeting.split(" ")[0]}` : "Junta raíces"}
            </h1>
            <p className="mt-3 max-w-[34ch] text-[0.98rem] leading-relaxed text-avena/72 sm:mt-4 sm:text-[1.05rem]">
              {greeting
                ? `Tu tarjeta de sellos. Con ${loyalty.stampsNeeded} ganas ${loyalty.prizeLabel}.`
                : `${loyalty.stampsNeeded} sellos = ${loyalty.prizeLabel}. Entra o crea tu cuenta para empezar.`}
            </p>
          </div>

          <ol className="border-t border-avena/15 md:border-t-0 md:border-l md:pl-10">
            {steps.map((step, index) => (
              <li
                key={step.n}
                className={`grid grid-cols-[auto_1fr] items-baseline gap-3 py-2.5 sm:gap-4 sm:py-3.5 ${
                  index < steps.length - 1 ? "border-b border-avena/12" : ""
                }`}
              >
                <span className="nums text-sm tracking-wide text-hoja">{step.n}</span>
                <span className="text-[0.98rem] text-avena/90 sm:text-[1.05rem]">{step.label}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </header>
  );
}
