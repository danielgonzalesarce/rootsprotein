import Image from "next/image";
import { ArchFrame } from "@/components/ArchFrame";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { productImage } from "@/data/images";
import type { Product } from "@/data/menu";
import { cn } from "@/lib/cn";

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
  const image = product.image ? { src: product.image, alt: `${product.name} de Roots Protein Bar` } : productImage(product.id);
  if (!image) {
    return (
      <ImagePlaceholder label={label ? product.name : undefined} className={className} />
    );
  }

  return (
    <ArchFrame className={cn("relative", className)}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />
    </ArchFrame>
  );
}
