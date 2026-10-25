import { Badge } from "@/components/ui/Badge";
import type { Macros } from "@/data/menu";

export function MacroChip({ macros, surface = "light" }: { macros: Macros; surface?: "light" | "dark" }) {
  return (
    <span className="inline-flex flex-wrap gap-1.5">
      <Badge surface={surface}>
        <span className="nums">{macros.protein} g proteína</span>
      </Badge>
      {macros.calories != null ? (
        <Badge surface={surface}>
          <span className="nums">{macros.calories} kcal</span>
        </Badge>
      ) : null}
    </span>
  );
}
