import type { Metadata } from "next";
import { LocalQrConsole } from "@/components/loyalty/LocalQrConsole";
import { loyalty } from "@/data/loyalty";

export const instant = false;

export const metadata: Metadata = {
  title: `QR del local | ${loyalty.name}`,
  robots: { index: false, follow: false },
};

export default function LocalQrPage() {
  return (
    <main id="contenido" className="bg-avena pt-[calc(var(--header-h)+1.25rem)] text-tinta" data-surface="light">
      <section className="mx-auto w-full max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-hoja">Solo personal</p>
        <h1 className="mt-3 font-display text-4xl tracking-[-0.04em] text-savia sm:text-5xl">QR del local</h1>
        <p className="mt-4 max-w-[36ch] text-tinta/60">
          Se renueva solo cada {loyalty.qrTtlMinutes} minutos.
        </p>
        <div className="mt-12">
          <LocalQrConsole />
        </div>
      </section>
    </main>
  );
}
