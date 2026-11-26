"use client";

import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Review } from "@/data/reviews";

function Stars({ rating, size = "md" }: { rating: number; size?: "sm" | "md" }) {
  const dim = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  return (
    <p className="flex gap-0.5" aria-label={`${rating} de 5`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className={cn(dim, index < rating ? "fill-[#FABB05] text-[#FABB05]" : "text-avena/25")}
          strokeWidth={1.5}
        />
      ))}
    </p>
  );
}

export function ResenasQuotes({ reviews }: { reviews: Review[] }) {
  const [featured, ...rest] = reviews;
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  if (!featured) return null;

  return (
    <div ref={ref} className="mt-10 sm:mt-12">
      <figure
        className={cn(
          "resena-quote relative overflow-hidden rounded-[1.5rem] bg-savia px-5 py-7 text-avena shadow-[0_28px_60px_-36px_rgba(26,42,22,0.5)] sm:rounded-[1.75rem] sm:px-8 sm:py-10 lg:px-10",
          visible && "resena-quote--in",
        )}
        style={{ ["--resena-i" as string]: 0 }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 top-0 h-56 w-56 rounded-full bg-hoja/25 blur-3xl"
        />
        <div className="relative">
          <Stars rating={featured.rating} />
          <blockquote className="mt-4 max-w-[22ch] font-display text-[clamp(1.55rem,6.5vw,2.85rem)] leading-[1.1] tracking-[-0.04em] sm:mt-5 sm:max-w-[28ch]">
            “{featured.text}”
          </blockquote>
          <figcaption className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-avena/12 pt-5">
            <span className="text-sm font-medium text-avena">{featured.name}</span>
            <span className="text-xs uppercase tracking-[0.14em] text-avena/45">Google</span>
          </figcaption>
        </div>
      </figure>

      {rest.length > 0 ? (
        <ul className="mt-2">
          {rest.map((review, index) => (
            <li
              key={review.id}
              className={cn(
                "resena-quote grid gap-3 border-b border-savia/15 py-6 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-baseline sm:gap-6",
                visible && "resena-quote--in",
              )}
              style={{ ["--resena-i" as string]: index + 1 }}
            >
              <p className="flex gap-0.5" aria-label={`${review.rating} de 5`}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-3.5 w-3.5",
                      i < review.rating ? "fill-[#FABB05] text-[#FABB05]" : "text-savia/20",
                    )}
                    strokeWidth={1.5}
                  />
                ))}
              </p>
              <p className="font-display text-[1.2rem] leading-snug tracking-[-0.02em] text-savia sm:text-[1.35rem]">
                “{review.text}”
              </p>
              <p className="text-sm text-tinta/50 sm:text-right">{review.name}</p>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
