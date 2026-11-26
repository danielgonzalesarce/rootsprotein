"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { StampGrid } from "@/components/loyalty/StampGrid";
import type { AccountView } from "@/lib/loyalty/actions";
import { formatLimaDateTime } from "@/lib/loyalty/hours";
import { formatPhoneDisplay } from "@/lib/loyalty/phone";

export function AccountPanel({ account }: { account: AccountView }) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const remaining = Math.max(0, account.needed - account.stamps);

  const logout = async () => {
    setLoggingOut(true);
    await fetch("/api/loyalty/logout", { method: "POST" });
    router.refresh();
    setLoggingOut(false);
  };

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(16rem,22rem)] lg:gap-10">
      <div className="rounded-[1.5rem] bg-white px-5 py-7 ring-1 ring-savia/8 sm:rounded-[1.75rem] sm:px-8 sm:py-9">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-hoja">Tu progreso</p>
            <p className="mt-2 font-display text-[1.65rem] leading-tight tracking-[-0.03em] text-savia sm:text-[1.9rem]">
              {account.readyToRedeem ? "Listo para canjear" : "Sigue juntando"}
            </p>
          </div>
          <p className="nums font-display text-[2.75rem] leading-none tracking-[-0.05em] text-savia sm:text-[3.25rem]">
            {account.stamps}
            <span className="text-[1.35rem] text-savia/30 sm:text-[1.6rem]">/{account.needed}</span>
          </p>
        </div>

        <div className="mt-8">
          <StampGrid stamps={account.stamps} needed={account.needed} />
        </div>

        <p className="mt-8 max-w-[40ch] text-[1.02rem] leading-relaxed text-tinta/65">
          {account.readyToRedeem
            ? `Ya puedes canjear ${account.prizeLabel}. Pide el QR de canje en el local.`
            : remaining === 1
              ? `Te falta 1 visita para ganar ${account.prizeLabel}.`
              : `Te faltan ${remaining} visitas para ganar ${account.prizeLabel}.`}
        </p>

        {account.readyToRedeem ? (
          <div className="mt-6 rounded-full bg-hoja px-5 py-3.5 text-center text-sm font-medium text-white">
            Listo para canjear en el local
          </div>
        ) : null}
      </div>

      <aside className="rounded-[1.5rem] bg-savia px-5 py-7 text-avena sm:rounded-[1.75rem] sm:px-7 sm:py-8">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-salvia/75">Cuenta</p>
        <p className="mt-3 font-display text-[1.75rem] leading-[1.1] tracking-[-0.03em]">{account.name}</p>
        <p className="mt-2 text-sm text-avena/55">{formatPhoneDisplay(account.phone)}</p>

        {account.history.length > 0 ? (
          <div className="mt-8 border-t border-avena/12 pt-6">
            <h2 className="text-xs font-medium uppercase tracking-[0.16em] text-salvia/70">Reciente</h2>
            <ul className="mt-3">
              {account.history.slice(0, 5).map((item, index) => (
                <li
                  key={item.id}
                  className={`flex items-baseline justify-between gap-4 py-3 text-sm ${
                    index < Math.min(account.history.length, 5) - 1 ? "border-b border-avena/10" : ""
                  }`}
                >
                  <span className="text-avena/90">{item.label}</span>
                  <span className="shrink-0 text-avena/40">{formatLimaDateTime(item.createdAt)}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="mt-8 border-t border-avena/12 pt-6 text-sm text-avena/55">
            Aún no hay movimientos. Escanea el QR del local en tu próxima visita.
          </p>
        )}

        <button
          type="button"
          onClick={logout}
          disabled={loggingOut}
          className="mt-8 text-sm text-avena/45 underline underline-offset-4 transition hover:text-avena disabled:opacity-60"
        >
          Cerrar sesión
        </button>
      </aside>
    </div>
  );
}
