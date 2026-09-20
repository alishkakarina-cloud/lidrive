import { ImageIcon } from "lucide-react";
import ResponsiveImage from "./ResponsiveImage";
import { usePhotoList } from "../lib/photos";
import type { Product } from "../lib/types";

interface ProductPhotoProps {
  product: Product;
  index?: number;
  widths: number[];
  sizes: string;
  aspect?: string;
  className?: string;
  priority?: boolean;
  decorative?: boolean;
}

export default function ProductPhoto({
  product,
  index = 0,
  widths,
  sizes,
  aspect,
  className = "",
  priority = false,
  decorative = false,
}: ProductPhotoProps) {
  const list = usePhotoList(product);
  const src = list[index];
  const alt = decorative ? "" : (product.alt ?? product.name);

  if (!src) {
    return (
      <div
        role={decorative ? undefined : "img"}
        aria-label={decorative ? undefined : alt}
        style={aspect ? { aspectRatio: aspect } : undefined}
        className={`flex items-center justify-center bg-gradient-to-br from-panel to-panel-2 ${className}`}
      >
        <ImageIcon className="h-1/4 w-1/4 max-h-16 max-w-16 text-fg-mute/50" strokeWidth={1.2} />
      </div>
    );
  }

  if (src.kind === "id") {
    return <ResponsiveImage id={src.id} alt={alt} widths={widths} sizes={sizes} aspect={aspect} priority={priority} className={className} />;
  }

  return (
    <img
      src={src.url}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      style={aspect ? { aspectRatio: aspect } : undefined}
      className={`bg-panel ${className}`}
    />
  );
}
