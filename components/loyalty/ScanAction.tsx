"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AuthForm } from "@/components/loyalty/AuthForm";
import { StampGrid } from "@/components/loyalty/StampGrid";

export function ScanAction({
  kind,
  token,
}: {
  kind: "stamp" | "redeem";
  token: string;
}) {
  const router = useRouter();
  const [needsAuth, setNeedsAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [stamps, setStamps] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const tried = useRef(false);

  const endpoint = kind === "stamp" ? "/api/loyalty/stamp" : "/api/loyalty/redeem";
  const title = kind === "stamp" ? "Confirmar sello" : "Confirmar canje";
  const nextPath = kind === "stamp" ? `/sello?t=${encodeURIComponent(token)}` : `/canje?t=${encodeURIComponent(token)}`;

  const run = async () => {
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = (await response.json()) as { error?: string; needsAuth?: boolean; stamps?: number };
      if (response.status === 401 && data.needsAuth) {
        setNeedsAuth(true);
        return;
      }
      if (!response.ok) {
        setError(data.error ?? "No se pudo completar.");
        return;
      }
      if (kind === "stamp") {
        setStamps(data.stamps ?? null);
        setMessage(`Sumaste una raíz. Vas ${data.stamps}/8.`);
      } else {
        setStamps(0);
        setMessage("Canje listo. Disfruta tu premio.");
      }
      router.refresh();
    } catch {
      setError("Revisa tu conexión e inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tried.current) return;
    tried.current = true;
    void (async () => {
      const response = await fetch("/api/loyalty/me");
      if (response.ok) void run();
      else setNeedsAuth(true);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (needsAuth) {
    return (
      <div className="w-full max-w-md">
        <p className="mb-6 text-[0.975rem] text-tinta/65">Entra con tu WhatsApp para continuar.</p>
        <AuthForm nextPath={nextPath} initialMode="login" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      {message && stamps !== null ? (
        <div>
          <p className="font-display text-3xl leading-tight tracking-[-0.03em] text-savia">{message}</p>
          <div className="mt-6">
            <StampGrid stamps={stamps} />
          </div>
          <Link
            href="/cuenta"
            className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-savia px-5 font-medium text-avena"
          >
            Ver mi tarjeta
          </Link>
        </div>
      ) : (
        <div>
          <button
            type="button"
            onClick={run}
            disabled={loading}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-savia px-5 font-medium text-avena disabled:opacity-60"
          >
            {loading ? "Validando…" : title}
          </button>
          {loading ? <p className="mt-4 text-center text-sm text-tinta/45">Un segundo…</p> : null}
        </div>
      )}
      {error ? (
        <p className="mt-4 text-[0.9375rem] font-medium text-savia" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
