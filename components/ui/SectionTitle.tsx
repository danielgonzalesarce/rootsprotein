import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function SectionTitle({
  children,
  id,
  className,
}: {
  children: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <h2 id={id} className={cn("chapter-title text-balance", className)}>
      {children}
    </h2>
  );
}
