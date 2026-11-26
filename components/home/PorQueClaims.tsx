"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type Claim = {
  title: string;
  text: string;
};

export function PorQueClaims({ points }: { points: Claim[] }) {
  const ref = useRef<HTMLOListElement>(null);
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
      { threshold: 0.25 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <ol ref={ref} className="mt-9 border-t border-savia/20">
      {points.map((point, index) => (
        <li
          key={point.title}
          className={cn(
            "porque-claim group grid grid-cols-[minmax(2.5rem,auto)_minmax(0,1fr)] gap-4 border-b border-savia/20 py-6 sm:gap-6 sm:py-7",
            visible && "porque-claim--in",
          )}
          style={{ ["--claim-i" as string]: index }}
        >
          <span className="nums pt-1 text-sm font-medium tracking-wide text-hoja transition-colors group-hover:text-savia">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="relative min-w-0">
            <span
              aria-hidden="true"
              className="absolute -left-4 top-2 h-0 w-0.5 rounded-full bg-hoja transition-all duration-300 group-hover:h-[calc(100%-0.5rem)] sm:-left-5"
            />
            <h3 className="font-display text-[1.65rem] leading-tight tracking-[-0.035em] text-savia transition-transform duration-300 group-hover:translate-x-0.5 sm:text-[1.9rem]">
              {point.title}
            </h3>
            <p className="mt-2 max-w-[36ch] text-[1.05rem] leading-relaxed text-tinta/60">{point.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
