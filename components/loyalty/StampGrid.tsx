"use client";

import { StampMark } from "@/components/loyalty/StampMark";
import { loyalty } from "@/data/loyalty";

export function StampGrid({
  stamps,
  needed = loyalty.stampsNeeded,
  interactive = true,
}: {
  stamps: number;
  needed?: number;
  interactive?: boolean;
}) {
  return (
    <ul className="grid grid-cols-4 gap-4 sm:gap-6" aria-label={`${stamps} de ${needed} sellos`}>
      {Array.from({ length: needed }, (_, index) => {
        const filled = index < stamps;
        return (
          <li key={index} className="grid place-items-center bg-transparent">
            <StampMark filled={filled} pop={filled} interactive={interactive} className="max-w-[7.5rem]" />
          </li>
        );
      })}
    </ul>
  );
}
