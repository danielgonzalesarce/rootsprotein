import type { Metadata } from "next";
import { connection } from "next/server";
import { AuthForm } from "@/components/loyalty/AuthForm";
import { AccountPanel } from "@/components/loyalty/AccountPanel";
import { SellosHeader } from "@/components/loyalty/SellosHeader";
import { StampMark } from "@/components/loyalty/StampMark";
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
      <SellosHeader greeting={account?.name} />

      <section className="mx-auto w-full max-w-[1400px] px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12 lg:px-10">
        {account ? (
          <AccountPanel account={account} />
        ) : (
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,26rem)] lg:gap-10">
            <div className="rounded-[1.5rem] bg-white px-5 py-7 ring-1 ring-savia/8 sm:rounded-[1.75rem] sm:px-8 sm:py-9">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-hoja">Tu tarjeta</p>
                  <p className="mt-2 font-display text-[1.65rem] leading-tight tracking-[-0.03em] text-savia sm:text-[1.9rem]">
                    Empieza en cero
                  </p>
                </div>
                <p className="nums font-display text-[2.5rem] leading-none tracking-[-0.05em] text-savia sm:text-[3rem]">
                  0
                  <span className="text-[1.35rem] text-savia/30 sm:text-[1.6rem]">/{loyalty.stampsNeeded}</span>
                </p>
              </div>

              <ul
                className="mt-8 grid grid-cols-4 gap-3 sm:gap-5"
                aria-hidden="true"
              >
                {Array.from({ length: loyalty.stampsNeeded }, (_, index) => (
                  <li key={index} className="grid place-items-center">
                    <StampMark filled={false} interactive className="max-w-[6.5rem] sm:max-w-[7.5rem]" />
                  </li>
                ))}
              </ul>

              <p className="mt-7 max-w-[36ch] text-sm leading-relaxed text-tinta/55">
                Cada visita en el local suma un sello. Al llegar a {loyalty.stampsNeeded}, canjeas{" "}
                {loyalty.prizeLabel}.
              </p>
            </div>

            <div className="rounded-[1.5rem] bg-white p-5 ring-1 ring-savia/8 sm:rounded-[1.75rem] sm:p-7 lg:sticky lg:top-[calc(var(--header-h)+1rem)]">
              <AuthForm initialMode="login" />
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
