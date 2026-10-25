import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function ArchFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("arch relative bg-salvia", className)}>{children}</div>;
}
