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
    <div className="w-full">
      <div className="text-center">
        <p className="text-sm text-tinta/50">Hola</p>
        <p className="mt-1 font-display text-[2rem] leading-tight tracking-[-0.03em] text-savia sm:text-[2.35rem]">
          {account.name}
        </p>
        <p className="mt-1 text-sm text-tinta/40">{formatPhoneDisplay(account.phone)}</p>
        <p className="mt-5 nums font-display text-[3.25rem] leading-none tracking-[-0.05em] text-savia">
          {account.stamps}
          <span className="text-2xl text-savia/30">/{account.needed}</span>
        </p>
      </div>

      <div className="mt-10">
        <StampGrid stamps={account.stamps} needed={account.needed} />
      </div>

      <p className="mt-8 text-center text-[1.05rem] leading-relaxed text-tinta/65">
        {account.readyToRedeem
          ? `Ya puedes canjear ${account.prizeLabel}. Pide el QR de canje en el local.`
          : remaining === 1
            ? `Te falta 1 visita para ganar ${account.prizeLabel}.`
            : `Te faltan ${remaining} visitas para ganar ${account.prizeLabel}.`}
      </p>

      {account.readyToRedeem ? (
        <div className="mt-5 rounded-full bg-hoja px-4 py-3.5 text-center text-[0.9375rem] font-medium text-white">
          Listo para canjear en el local
        </div>
      ) : null}

      {account.history.length > 0 ? (
        <div className="mt-10 border-t border-savia/10 pt-5">
          <h2 className="text-center text-xs font-medium uppercase tracking-[0.14em] text-savia/45">Reciente</h2>
          <ul className="mt-2">
            {account.history.slice(0, 4).map((item) => (
              <li key={item.id} className="flex items-center justify-between gap-4 py-2 text-[0.9375rem]">
                <span className="text-savia">{item.label}</span>
                <span className="text-tinta/35">{formatLimaDateTime(item.createdAt)}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <button
        type="button"
        onClick={logout}
        disabled={loggingOut}
        className="mt-8 w-full text-center text-sm text-tinta/40 underline underline-offset-4 transition hover:text-savia disabled:opacity-60"
      >
        Cerrar sesión
      </button>
    </div>
  );
}
