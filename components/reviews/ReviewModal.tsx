"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { Star, X } from "lucide-react";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { site } from "@/data/site";

const ReviewContext = createContext<() => void>(() => {});

export function useWriteReview() {
  return useContext(ReviewContext);
}

export function ReviewProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openReview = useCallback(() => {
    track("click_google_review");
    setOpen(true);
  }, []);

  return (
    <ReviewContext.Provider value={openReview}>
      {children}
      {open ? <ReviewDialog onClose={() => setOpen(false)} /> : null}
    </ReviewContext.Provider>
  );
}

function ReviewDialog({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [website, setWebsite] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  useFocusTrap(true, dialogRef, onClose);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, text, rating, website }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(data.error ?? "No se pudo enviar.");
        return;
      }
      setDone(true);
    } catch {
      setError("Revisa tu conexión e inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[85] flex items-end justify-center md:items-center md:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-savia/60 backdrop-blur-[2px]"
        aria-label="Cerrar reseña"
        onClick={onClose}
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-title"
        className="relative z-10 flex max-h-[92svh] w-full max-w-lg flex-col overflow-hidden rounded-t-[1.6rem] bg-avena text-tinta shadow-[0_30px_80px_-28px_rgba(26,42,22,0.55)] md:rounded-[1.6rem]"
      >
        <div className="flex items-start justify-between gap-4 border-b border-savia/10 px-5 py-4 sm:px-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-hoja">Tu opinión</p>
            <h2 id="review-title" className="mt-1 font-display text-[1.65rem] leading-tight tracking-[-0.03em] text-savia">
              {done ? "¡Gracias!" : "Escribe tu reseña"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-full text-savia transition hover:bg-salvia"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
          {done ? (
            <div>
              <p className="max-w-[34ch] text-[1.05rem] leading-relaxed text-tinta/70">
                Tu reseña ya quedó en nuestra web. Ayuda a más gente a conocer Roots.
              </p>
              {site.googleReviewUrl ? (
                <p className="mt-5 max-w-[36ch] text-sm text-tinta/50">
                  Si también quieres publicarla en Google Maps, puedes hacerlo desde tu cuenta de Google cuando
                  quieras — no es obligatorio.
                </p>
              ) : null}
              <button
                type="button"
                onClick={onClose}
                className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-savia px-5 font-medium text-avena transition hover:bg-hoja"
              >
                Listo
              </button>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={submit} noValidate>
              <div>
                <p className="text-sm font-medium text-savia">¿Cómo estuvo?</p>
                <div className="mt-2 flex gap-1.5" role="radiogroup" aria-label="Calificación">
                  {Array.from({ length: 5 }, (_, index) => {
                    const value = index + 1;
                    const active = (hover || rating) >= value;
                    return (
                      <button
                        key={value}
                        type="button"
                        role="radio"
                        aria-checked={rating === value}
                        aria-label={`${value} estrellas`}
                        className="grid h-11 w-11 place-items-center rounded-full transition hover:bg-salvia/70"
                        onMouseEnter={() => setHover(value)}
                        onMouseLeave={() => setHover(0)}
                        onClick={() => setRating(value)}
                      >
                        <Star
                          className={cn(
                            "h-7 w-7 transition",
                            active ? "fill-[#FABB05] text-[#FABB05]" : "text-savia/25",
                          )}
                          strokeWidth={1.5}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              <label className="block">
                <span className="text-sm font-medium text-savia">Nombre</span>
                <input
                  className="mt-1.5 h-12 w-full rounded-full border-0 bg-white px-4 text-[1.02rem] outline-none ring-1 ring-savia/10 transition placeholder:text-tinta/35 focus:ring-hoja/40"
                  value={name}
                  autoComplete="name"
                  placeholder="Cómo te llamas"
                  maxLength={60}
                  onChange={(event) => setName(event.target.value)}
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-savia">Tu reseña</span>
                <textarea
                  className="mt-1.5 min-h-28 w-full resize-none rounded-[1.2rem] border-0 bg-white px-4 py-3 text-[1.02rem] outline-none ring-1 ring-savia/10 transition placeholder:text-tinta/35 focus:ring-hoja/40"
                  value={text}
                  placeholder="¿Qué pediste? ¿Cómo estuvo el sabor y la atención?"
                  maxLength={480}
                  onChange={(event) => setText(event.target.value)}
                />
                <span className="mt-1.5 block text-right text-xs text-tinta/40">{text.length}/480</span>
              </label>

              {/* honeypot */}
              <input
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
                aria-hidden="true"
              />

              {error ? (
                <p className="rounded-[1rem] bg-salvia/80 px-4 py-3 text-sm font-medium text-savia" role="alert">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-savia px-5 font-medium text-avena transition hover:bg-hoja disabled:opacity-60"
              >
                {loading ? "Enviando…" : "Publicar reseña"}
              </button>
              <p className="text-center text-sm text-tinta/45">Se publica aquí, en la web de Roots. Sin salir de la página.</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

type TriggerProps = {
  children: ReactNode;
  variant?: "solid" | "line";
  surface?: "light" | "dark";
  className?: string;
};

export function WriteReviewButton({
  children,
  variant = "solid",
  surface = "light",
  className,
}: TriggerProps) {
  const open = useWriteReview();
  return (
    <button
      type="button"
      onClick={open}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-base font-medium",
        variant === "solid" && "bg-hoja text-white",
        variant === "line" && surface === "light" && "border border-hoja text-savia",
        variant === "line" && surface === "dark" && "border border-avena text-avena",
        className,
      )}
    >
      {children}
    </button>
  );
}
