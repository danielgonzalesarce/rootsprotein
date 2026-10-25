import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

export function Logo({
  tone = "savia",
  className,
  onClick,
}: {
  tone?: "savia" | "avena";
  compact?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link href="/" onClick={onClick} className={cn("inline-flex min-h-11 items-center", className)}>
      <Image
        src="/images/logo/Roots_Protein_Bar_logo.png"
        alt="Roots Protein Bar"
        width={735}
        height={339}
        priority={tone === "savia"}
        className={cn("h-11 w-auto sm:h-12 lg:h-14", tone === "avena" && "brightness-0 invert")}
      />
    </Link>
  );
}
