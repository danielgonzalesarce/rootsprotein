"use client";

import { useEffect } from "react";
import "./globals.css";

export default function GlobalError({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="es">
      <body className="min-h-svh bg-avena font-sans text-tinta antialiased">
        <main className="relative mx-auto flex min-h-svh w-full max-w-3xl flex-col justify-center overflow-hidden px-5 py-16 sm:px-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 top-20 h-64 w-64 rounded-full bg-salvia blur-3xl"
          />
          <p className="relative text-xs font-medium uppercase tracking-[0.18em] text-hoja">Error</p>
          <h1 className="relative mt-3 max-w-[14ch] font-display text-4xl leading-tight tracking-[-0.03em] text-savia sm:text-5xl">
            Algo salió mal
          </h1>
          <p className="relative mt-5 max-w-[40ch] text-lg leading-relaxed text-tinta/65">
            No pudimos cargar Roots Protein Bar. Prueba otra vez o vuelve al inicio.
          </p>
          <div className="relative mt-9 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => retry()}
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-hoja px-5 text-base font-medium text-white"
            >
              Intentar de nuevo
            </button>
            <a
              href="/"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-hoja px-5 text-base font-medium text-savia"
            >
              Ir al inicio
            </a>
            <a
              href="/carta"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-hoja px-5 text-base font-medium text-savia"
            >
              Ver la carta
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
