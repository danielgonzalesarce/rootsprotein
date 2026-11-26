import Image from "next/image";
import { cn } from "@/lib/cn";

const icons: Record<string, { src: string; alt: string }> = {
  yape: { src: "/images/payments/yape.jpg", alt: "Yape" },
  plin: { src: "/images/payments/plin.jpg", alt: "Plin" },
  efectivo: { src: "/images/payments/efectivo.svg", alt: "Efectivo" },
};

export function PaymentGlyph({
  method,
  className,
}: {
  method: string;
  className?: string;
}) {
  const key = method.trim().toLowerCase();
  const icon = icons[key];
  if (!icon) return null;

  return (
    <span
      className={cn(
        "relative inline-block overflow-hidden rounded-[5px] bg-white",
        key === "yape" && "bg-[#9117A0]",
        key === "efectivo" && "bg-[#2F6B3A]",
        className,
      )}
    >
      <Image
        src={icon.src}
        alt=""
        aria-hidden="true"
        fill
        sizes="28px"
        className={key === "plin" ? "object-contain p-0.5" : "object-cover"}
      />
      <span className="sr-only">{icon.alt}</span>
    </span>
  );
}
