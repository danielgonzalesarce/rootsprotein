import { PaymentGlyph } from "@/components/icons/PaymentGlyphs";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";

export function PaymentMethods({
  className,
  chipClassName,
}: {
  className?: string;
  chipClassName?: string;
}) {
  if (site.payments.length === 0) return null;

  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {site.payments.map((method) => (
        <li
          key={method}
          className={cn(
            "inline-flex items-center gap-2 rounded-full border border-savia/10 bg-white py-1 pl-1 pr-2.5 text-sm text-savia sm:pr-3",
            chipClassName,
          )}
        >
          <PaymentGlyph method={method} className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
          {method}
        </li>
      ))}
    </ul>
  );
}
