import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { ScanAction } from "@/components/loyalty/ScanAction";
import { loyalty } from "@/data/loyalty";
import { verifyQrToken } from "@/lib/loyalty/tokens";

export const instant = false;

export const metadata: Metadata = {
  title: `Sumar sello | ${loyalty.name}`,
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<{ t?: string }>;
};

export default async function SelloPage({ searchParams }: Props) {
  await connection();
  const { t: token } = await searchParams;
  const check = token
    ? verifyQrToken(token, "stamp", Date.now())
    : { ok: false as const, error: "Falta el código QR del local." };

  return (
    <main id="contenido" className="bg-avena pt-[calc(var(--header-h)+1.25rem)] text-tinta" data-surface="light">
      <section className="mx-auto flex min-h-[70svh] w-full max-w-6xl flex-col justify-center px-5 py-16 md:px-8">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-hoja">{loyalty.name}</p>
        <h1 className="mt-3 font-display text-4xl tracking-[-0.04em] text-savia sm:text-5xl">Nueva raíz</h1>
        <p className="mt-4 max-w-[32ch] text-tinta/65">Confirmamos tu visita y actualizamos tu tarjeta.</p>
        <div className="mt-10">
          {check.ok && token ? (
            <ScanAction kind="stamp" token={token} />
          ) : (
            <div className="max-w-md">
              <p className="text-[0.9375rem] font-medium text-savia" role="alert">
                {"error" in check ? check.error : "Código inválido."}
              </p>
              <Link href="/cuenta" className="mt-5 inline-flex min-h-11 items-center underline underline-offset-4">
                Ir a mis sellos
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
