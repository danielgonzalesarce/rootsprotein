"use client";

import { useEffect, useState } from "react";
import type { QrKind } from "@/lib/loyalty/tokens";

type QrPayload = {
  kind: QrKind;
  url: string;
  expiresAt: string | null;
  forever?: boolean;
  qrDataUrl: string;
};

export function LocalQrConsole() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [kind, setKind] = useState<QrKind>("stamp");
  const [qr, setQr] = useState<QrPayload | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loadQr = async (nextKind: QrKind, pass = password, forever = false) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/loyalty/local-qr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pass, kind: nextKind, forever }),
      });
      const data = (await response.json()) as QrPayload & { error?: string };
      if (!response.ok) {
        setError(data.error ?? "No se pudo generar el QR.");
        setUnlocked(false);
        return;
      }
      setUnlocked(true);
      setKind(nextKind);
      setQr({
        kind: data.kind,
        url: data.url,
        expiresAt: data.expiresAt,
        forever: data.forever,
        qrDataUrl: data.qrDataUrl,
      });
    } catch {
      setError("Revisa tu conexión e inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!unlocked || !qr || qr.forever || !qr.expiresAt) return;
    const expires = new Date(qr.expiresAt).getTime();
    const wait = Math.max(5_000, expires - Date.now() - 5_000);
    const timer = window.setTimeout(() => {
      void loadQr(kind);
    }, wait);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unlocked, qr?.expiresAt, qr?.forever, kind]);

  if (!unlocked) {
    return (
      <form
        className="mx-auto w-full max-w-sm"
        onSubmit={(event) => {
          event.preventDefault();
          void loadQr("stamp");
        }}
      >
        <label className="block">
          <span className="text-sm text-tinta/55">Clave del local</span>
          <input
            type="password"
            className="mt-2 h-12 w-full border-0 border-b border-savia/20 bg-transparent px-0 outline-none transition focus:border-hoja"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
          />
        </label>
        {error ? (
          <p className="mt-3 text-[0.9375rem] font-medium text-savia" role="alert">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={loading}
          className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-savia px-5 font-medium text-avena disabled:opacity-60"
        >
          {loading ? "Entrando…" : "Mostrar QR"}
        </button>
      </form>
    );
  }

  return (
    <div className="mx-auto w-full max-w-lg text-center">
      <div className="inline-flex gap-6 border-b border-savia/15">
        <button
          type="button"
          className={`relative min-h-12 pb-3 text-sm font-medium ${kind === "stamp" ? "text-savia" : "text-tinta/40"}`}
          onClick={() => void loadQr("stamp")}
        >
          Sello
          {kind === "stamp" ? <span className="absolute inset-x-0 -bottom-px h-0.5 bg-hoja" aria-hidden="true" /> : null}
        </button>
        <button
          type="button"
          className={`relative min-h-12 pb-3 text-sm font-medium ${kind === "redeem" ? "text-savia" : "text-tinta/40"}`}
          onClick={() => void loadQr("redeem")}
        >
          Canje
          {kind === "redeem" ? <span className="absolute inset-x-0 -bottom-px h-0.5 bg-hoja" aria-hidden="true" /> : null}
        </button>
      </div>

      <p className="mt-8 font-display text-4xl tracking-[-0.04em] text-savia sm:text-5xl">
        {kind === "stamp" ? "Sellar" : "Canjear"}
      </p>
      <p className="mx-auto mt-3 max-w-[30ch] text-tinta/60">
        {kind === "stamp" ? "Muéstralo al cliente después de cobrar." : "Solo al entregar el premio."}
      </p>

      {qr ? (
        <div className="mx-auto mt-8 max-w-md rounded-2xl bg-white p-6 sm:p-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={qr.qrDataUrl} alt="Código QR del local" className="mx-auto h-auto w-full max-w-[22rem]" />
          <p className="mt-5 text-sm text-tinta/45">
            {qr.forever || !qr.expiresAt
              ? "Sin caducidad · listo para imprimir"
              : `Vence ${new Date(qr.expiresAt).toLocaleTimeString("es-PE", {
                  hour: "numeric",
                  minute: "2-digit",
                })}`}
          </p>
        </div>
      ) : null}

      <div className="mt-7 flex flex-col items-center gap-3">
        {kind === "stamp" ? (
          <button
            type="button"
            onClick={() => void loadQr("stamp", password, true)}
            disabled={loading}
            className="text-sm font-medium text-hoja underline underline-offset-4 disabled:opacity-60"
          >
            {loading ? "Generando…" : "QR para imprimir (sin caducidad)"}
          </button>
        ) : null}
        <button
          type="button"
          onClick={() => void loadQr(kind, password, false)}
          disabled={loading}
          className="text-sm text-savia underline underline-offset-4 disabled:opacity-60"
        >
          {loading ? "Renovando…" : qr?.forever ? "Volver a QR con caducidad" : "Renovar ahora"}
        </button>
      </div>
      {error ? (
        <p className="mt-3 text-[0.9375rem] font-medium text-savia" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
