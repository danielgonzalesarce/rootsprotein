import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Badge({
  children,
  surface = "light",
}: {
  children: ReactNode;
  surface?: "light" | "dark";
}) {
  return (
    <span
      className={cn(
        "inline-flex min-h-7 items-center rounded-full px-2.5 text-sm",
        surface === "dark" ? "bg-avena/15 text-avena" : "bg-white/70 text-tinta",
      )}
    >
      {children}
    </span>
  );
}
