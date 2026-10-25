"use client";

import Link from "next/link";

export default function ErrorPage({ retry }: { error: unknown; retry: () => void }) {
  return (
    <main id="contenido" className="bg-avena px-5 pb-24 pt-[calc(var(--header-h)+3rem)] text-tinta" data-surface="light">
      <h1 className="chapter-title text-savia">Algo no cargó</h1>
      <p className="mt-4 max-w-[62ch]">Puedes intentar de nuevo o volver al inicio.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-savia px-5 text-avena"
          onClick={() => retry()}
        >
          Intentar de nuevo
        </button>
        <Link href="/" className="inline-flex min-h-11 items-center justify-center rounded-full border border-hoja px-5 text-savia">
          Ir al inicio
        </Link>
      </div>
    </main>
  );
}
