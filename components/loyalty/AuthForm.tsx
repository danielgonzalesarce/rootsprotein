"use client";

import { useState, type FormEvent } from "react";

type Mode = "login" | "register";

export function AuthForm({
  initialMode = "login",
  nextPath,
}: {
  initialMode?: Mode;
  nextPath?: string;
}) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const endpoint = mode === "login" ? "/api/loyalty/login" : "/api/loyalty/register";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, pin }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(data.error ?? "No se pudo continuar.");
        return;
      }
      window.location.assign(nextPath || "/cuenta");
      return;
    } catch {
      setError("Revisa tu conexión e inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-hoja">Tu cuenta</p>
      <h2 className="mt-2 font-display text-[1.85rem] tracking-[-0.03em] text-savia">
        {mode === "login" ? "Entra a tus sellos" : "Crea tu cuenta"}
      </h2>

      <div className="mt-6 flex gap-6 border-b border-savia/10">
        <button
          type="button"
          className={`relative min-h-12 pb-3 text-sm font-medium transition-colors ${mode === "login" ? "text-savia" : "text-tinta/40"}`}
          onClick={() => setMode("login")}
        >
          Entrar
          {mode === "login" ? <span className="absolute inset-x-0 -bottom-px h-0.5 bg-hoja" aria-hidden="true" /> : null}
        </button>
        <button
          type="button"
          className={`relative min-h-12 pb-3 text-sm font-medium transition-colors ${mode === "register" ? "text-savia" : "text-tinta/40"}`}
          onClick={() => setMode("register")}
        >
          Crear cuenta
          {mode === "register" ? <span className="absolute inset-x-0 -bottom-px h-0.5 bg-hoja" aria-hidden="true" /> : null}
        </button>
      </div>

      <form className="mt-2 space-y-5" onSubmit={submit} noValidate>
        {mode === "register" ? (
          <label className="block">
            <span className="text-sm text-tinta/55">Nombre</span>
            <input
              className="mt-2 h-12 w-full border-0 border-b border-savia/20 bg-transparent px-0 text-[1.05rem] outline-none transition focus:border-hoja"
              value={name}
              autoComplete="name"
              onChange={(event) => setName(event.target.value)}
            />
          </label>
        ) : null}

        <label className="block">
          <span className="text-sm text-tinta/55">WhatsApp</span>
          <input
            className="mt-2 h-12 w-full border-0 border-b border-savia/20 bg-transparent px-0 text-[1.05rem] outline-none transition focus:border-hoja"
            value={phone}
            inputMode="tel"
            autoComplete="tel"
            placeholder="924699821"
            onChange={(event) => setPhone(event.target.value)}
          />
        </label>

        <label className="block">
          <span className="text-sm text-tinta/55">PIN</span>
          <input
            className="mt-2 h-12 w-full border-0 border-b border-savia/20 bg-transparent px-0 text-[1.05rem] tracking-[0.4em] outline-none transition focus:border-hoja"
            value={pin}
            inputMode="numeric"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            maxLength={6}
            placeholder="••••"
            onChange={(event) => setPin(event.target.value.replace(/\D/g, "").slice(0, 6))}
          />
          {mode === "register" ? (
            <span className="mt-2 block text-sm text-tinta/45">4 a 6 dígitos. Guárdalo para volver a entrar.</span>
          ) : null}
        </label>

        {error ? (
          <p className="text-[0.9375rem] font-medium text-savia" role="alert">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-savia px-5 font-medium text-avena transition hover:bg-hoja disabled:opacity-60"
        >
          {loading ? "Un momento…" : mode === "login" ? "Entrar" : "Crear cuenta"}
        </button>
      </form>
    </div>
  );
}
