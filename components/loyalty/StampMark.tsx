"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";

export const STAMP_IMAGE = "/images/logo/sello.png";

export function StampMark({
  filled = false,
  pop = false,
  interactive = true,
  className,
}: {
  filled?: boolean;
  pop?: boolean;
  interactive?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "stamp-mark relative inline-flex aspect-square w-full items-center justify-center bg-transparent",
        filled ? "stamp-mark--filled" : "stamp-mark--empty",
        pop && filled && "stamp-root-pop",
        interactive && "stamp-mark--interactive",
        className,
      )}
    >
      <Image
        src={STAMP_IMAGE}
        alt="Sello Roots"
        width={200}
        height={200}
        className="pointer-events-none h-full w-full select-none bg-transparent object-contain"
        draggable={false}
        unoptimized
      />
    </span>
  );
}
