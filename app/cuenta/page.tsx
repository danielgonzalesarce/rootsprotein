import type { Metadata } from "next";
import Image from "next/image";
import { connection } from "next/server";
import { AuthForm } from "@/components/loyalty/AuthForm";
import { AccountPanel } from "@/components/loyalty/AccountPanel";
import { StampMark, STAMP_IMAGE } from "@/components/loyalty/StampMark";
import { loyalty } from "@/data/loyalty";
import { buildAccountView } from "@/lib/loyalty/actions";
import { getSession } from "@/lib/loyalty/session";

export const instant = false;

export const metadata: Metadata = {
  title: `${loyalty.name} | Programa de sellos Roots Protein Bar Santa Anita`,
  description: `Junta ${loyalty.stampsNeeded} sellos en Roots Protein Bar (Santa Anita) y gana ${loyalty.prizeLabel}. Programa de fidelidad del protein bar.`,
  keywords: [
    "Raíces Roots",
    "sellos Roots Protein Bar",
    "fidelidad protein bar Santa Anita",
    "premio frappé Roots",
  ],
};

export default async function CuentaPage() {
  await connection();
  const session = await getSession();
  const account = session
    ? await buildAccountView(session.customerId, session.name, session.phone)
    : null;

  return (
    <main id="contenido" className="bg-avena text-tinta" data-surface="light">
      <section className="mx-auto w-full max-w-xl px-5 pb-16 pt-[calc(var(--header-h)+1.5rem)] md:px-8">
        {account ? (
          <AccountPanel account={account} />
        ) : (
          <div className="text-center">
            <Image
              src={STAMP_IMAGE}
              alt="Sello Raíces Roots"
              width={112}
              height={112}
              className="mx-auto h-24 w-24 object-contain sm:h-28 sm:w-28"
              priority
              unoptimized
            />
            <p className="mt-6 text-xs font-medium uppercase tracking-[0.18em] text-hoja">{loyalty.name}</p>
            <h1 className="mt-3 font-display text-[2.5rem] leading-[1.05] tracking-[-0.04em] text-savia sm:text-5xl">
              Junta raíces
            </h1>
            <p className="mx-auto mt-4 max-w-[34ch] text-tinta/65">
              {loyalty.stampsNeeded} sellos = {loyalty.prizeLabel}
            </p>

            <ul className="mx-auto mt-8 grid max-w-sm grid-cols-4 gap-3" aria-hidden="true">
              {Array.from({ length: loyalty.stampsNeeded }, (_, index) => (
                <li key={index}>
                  <StampMark filled={false} interactive />
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-[1.5rem] bg-white p-6 text-left ring-1 ring-savia/8 sm:p-8">
              <AuthForm initialMode="login" />
            </div>

            <ol className="mx-auto mt-10 max-w-sm space-y-3 text-left text-sm text-tinta/60">
              <li>
                <span className="font-medium text-savia">1.</span> Crea tu cuenta con WhatsApp
              </li>
              <li>
                <span className="font-medium text-savia">2.</span> Escanea el QR del local
              </li>
              <li>
                <span className="font-medium text-savia">3.</span> Llega a {loyalty.stampsNeeded} y canjea
              </li>
            </ol>
          </div>
        )}
      </section>
    </main>
  );
}
