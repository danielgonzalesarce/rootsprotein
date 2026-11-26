"use client";

import { useState, type FormEvent } from "react";
import { Lock, User } from "lucide-react";
import { WhatsAppGlyph } from "@/components/icons/WhatsAppGlyph";
import { cn } from "@/lib/cn";

type Mode = "login" | "register";

const field =
  "h-12 w-full rounded-full border-0 bg-avena/70 pl-11 pr-4 text-[1.02rem] text-savia outline-none ring-1 ring-savia/10 transition placeholder:text-tinta/35 focus:bg-white focus:ring-hoja/40";

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
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; phone?: string; pin?: string }>({});
  const [loading, setLoading] = useState(false);

  const switchMode = (next: Mode) => {
    setMode(next);
    setError("");
    setFieldErrors({});
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    const nextErrors: { name?: string; phone?: string; pin?: string } = {};
    if (mode === "register" && name.trim().length < 2) {
      nextErrors.name = "Escribe tu nombre.";
    }
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 9) {
      nextErrors.phone = "Ingresa un WhatsApp válido.";
    }
    if (pin.length < 4) {
      nextErrors.pin = "El PIN debe tener 4 a 6 dígitos.";
    }
    setFieldErrors(nextErrors);
    if (nextErrors.name || nextErrors.phone || nextErrors.pin) return;

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
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-hoja">Tu cuenta</p>
      <h2 className="mt-2 font-display text-[clamp(1.7rem,4.5vw,2.2rem)] leading-[1.05] tracking-[-0.035em] text-savia">
        {mode === "login" ? "Entra a tus sellos" : "Crea tu cuenta"}
      </h2>
      <p className="mt-3 max-w-[32ch] text-sm leading-relaxed text-tinta/55">
        {mode === "login"
          ? "WhatsApp + PIN. Así ves cuántas raíces llevas."
          : "Regístrate una vez y junta sellos en cada visita al local."}
      </p>

      <div
        className="mt-7 grid grid-cols-2 gap-1 rounded-full bg-salvia/70 p-1 ring-1 ring-savia/8"
        role="tablist"
        aria-label="Acceso"
      >
        {(
          [
            { id: "login", label: "Entrar" },
            { id: "register", label: "Crear cuenta" },
          ] as const
        ).map((tab) => {
          const active = mode === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active}
              className={cn(
                "inline-flex min-h-11 items-center justify-center rounded-full px-3 text-sm font-medium transition",
                active ? "bg-savia text-avena shadow-sm" : "text-tinta/50 hover:text-savia",
              )}
              onClick={() => switchMode(tab.id)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <form className="mt-6 space-y-4" onSubmit={submit} noValidate>
        {mode === "register" ? (
          <label className="block">
            <span className="text-sm font-medium text-savia">Nombre</span>
            <span className="relative mt-1.5 block">
              <User
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-tinta/35"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <input
                className={field}
                value={name}
                autoComplete="name"
                placeholder="Cómo te llamas"
                onChange={(event) => setName(event.target.value)}
              />
            </span>
            {fieldErrors.name ? (
              <span className="mt-1.5 block text-sm text-hoja">{fieldErrors.name}</span>
            ) : null}
          </label>
        ) : null}

        <label className="block">
          <span className="text-sm font-medium text-savia">WhatsApp</span>
          <span className="relative mt-1.5 block">
            <WhatsAppGlyph className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#25D366]" />
            <input
              className={field}
              value={phone}
              inputMode="tel"
              autoComplete="tel"
              placeholder="924 699 821"
              onChange={(event) => setPhone(event.target.value)}
            />
          </span>
          {fieldErrors.phone ? (
            <span className="mt-1.5 block text-sm text-hoja">{fieldErrors.phone}</span>
          ) : (
            <span className="mt-1.5 block text-sm text-tinta/40">Solo números de Perú, sin +51.</span>
          )}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-savia">PIN</span>
          <span className="relative mt-1.5 block">
            <Lock
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-tinta/35"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <input
              className={cn(field, "pr-16 tracking-[0.35em]")}
              value={pin}
              type={showPin ? "text" : "password"}
              inputMode="numeric"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              maxLength={6}
              placeholder="••••"
              onChange={(event) => setPin(event.target.value.replace(/\D/g, "").slice(0, 6))}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full px-2.5 py-1 text-xs font-medium text-tinta/45 transition hover:bg-white hover:text-savia"
              onClick={() => setShowPin((value) => !value)}
            >
              {showPin ? "Ocultar" : "Ver"}
            </button>
          </span>
          {fieldErrors.pin ? (
            <span className="mt-1.5 block text-sm text-hoja">{fieldErrors.pin}</span>
          ) : (
            <span className="mt-1.5 block text-sm text-tinta/40">
              {mode === "register"
                ? "Elige 4 a 6 dígitos y guárdalos para volver."
                : "El PIN que elegiste al crear tu cuenta."}
            </span>
          )}
        </label>

        {error ? (
          <p
            className="rounded-[1rem] bg-salvia/80 px-4 py-3 text-[0.9375rem] font-medium text-savia"
            role="alert"
          >
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="mt-1 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-savia px-5 text-[1.02rem] font-medium text-avena transition hover:bg-hoja disabled:opacity-60"
        >
          {loading ? "Un momento…" : mode === "login" ? "Entrar" : "Crear cuenta"}
        </button>
      </form>
    </div>
  );
}
