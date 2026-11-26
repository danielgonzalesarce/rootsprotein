import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function StatusPage({
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <main
      id="contenido"
      className={cn(
        "relative overflow-hidden bg-avena px-5 pb-24 pt-[calc(var(--header-h)+3rem)] text-tinta sm:px-6 md:px-8",
        className,
      )}
      data-surface="light"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-24 h-72 w-72 rounded-full bg-salvia/70 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 bottom-10 h-56 w-56 rounded-full bg-hoja/15 blur-3xl"
      />

      <div className="relative mx-auto grid w-full max-w-[1400px] gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(16rem,0.7fr)] lg:items-end lg:gap-16">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-hoja">{eyebrow}</p>
          <h1 className="chapter-title mt-3 max-w-[14ch] text-savia">{title}</h1>
          <p className="mt-5 max-w-[38ch] text-lg leading-relaxed text-tinta/65">{description}</p>
          <div className="mt-9 flex flex-wrap gap-3">{children}</div>
        </div>

        <aside className="rounded-[1.5rem] border border-savia/10 bg-white/70 p-6 sm:p-7">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-hoja">Atajos</p>
          <ul className="mt-4 space-y-3 text-[1.02rem] text-savia">
            <li>
              <a href="/" className="transition-colors hover:text-hoja">
                Inicio
              </a>
            </li>
            <li>
              <a href="/carta" className="transition-colors hover:text-hoja">
                Nuestra carta
              </a>
            </li>
            <li>
              <a href="/contacto" className="transition-colors hover:text-hoja">
                Contacto / Cómo llegar
              </a>
            </li>
            <li>
              <a href="/cuenta" className="transition-colors hover:text-hoja">
                Mis sellos
              </a>
            </li>
          </ul>
        </aside>
      </div>
    </main>
  );
}
