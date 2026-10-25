import type { Metadata } from "next";
import Link from "next/link";
import { ArchFrame } from "@/components/ArchFrame";
import { Frappe } from "@/components/illustrations/Frappe";

export const metadata: Metadata = {
  title: "Página no encontrada | Roots Protein Bar",
  description: "Esa página no existe. Vuelve al inicio o mira la carta de Roots Protein Bar en Santa Anita.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main id="contenido" className="bg-avena px-5 pb-24 pt-[calc(var(--header-h)+2.5rem)] text-tinta" data-surface="light">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-[16rem_minmax(0,1fr)]">
        <ArchFrame className="flex h-64 w-48 items-center justify-center">
          <Frappe className="h-52 w-32" />
        </ArchFrame>
        <div>
          <h1 className="chapter-title text-savia">Esta página no está en la carta</h1>
          <p className="mt-4 max-w-[62ch]">El enlace no coincide con ninguna parte del sitio.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/" className="inline-flex min-h-11 items-center justify-center rounded-full bg-savia px-5 text-avena">
              Ir al inicio
            </Link>
            <Link href="/carta" className="inline-flex min-h-11 items-center justify-center rounded-full border border-hoja px-5 text-savia">
              Ver nuestra carta
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
