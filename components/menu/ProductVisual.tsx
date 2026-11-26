import Image from "next/image";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import type { Product } from "@/data/menu";
import { cn } from "@/lib/cn";
import { resolveProductMedia } from "@/lib/product-media";

export function ProductVisual({
  product,
  className,
  sizes,
  priority = false,
  label = true,
}: {
  product: Product;
  className?: string;
  sizes: string;
  priority?: boolean;
  label?: boolean;
}) {
  const image = resolveProductMedia(product);

  if (!image) {
    return <ImagePlaceholder label={label ? product.name : undefined} className={className} />;
  }

  return (
    <div className={cn("relative overflow-hidden bg-savia", className)}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn("object-cover", !image.isProductPhoto && "opacity-85 saturate-[0.92]")}
      />
    </div>
  );
}
