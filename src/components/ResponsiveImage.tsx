import { img, srcSet } from "../lib/images";

interface ResponsiveImageProps {
  id: string;
  alt: string;
  widths: number[];
  sizes: string;
  className?: string;
  priority?: boolean;
  aspect?: string;
  quality?: number;
}

export default function ResponsiveImage({
  id,
  alt,
  widths,
  sizes,
  className = "",
  priority = false,
  aspect,
  quality = 80,
}: ResponsiveImageProps) {
  const fallbackWidth = widths[Math.floor(widths.length / 2)];
  return (
    <img
      src={img(id, fallbackWidth, quality)}
      srcSet={srcSet(id, widths, quality)}
      sizes={sizes}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      style={aspect ? { aspectRatio: aspect } : undefined}
      className={`bg-neutral-900 ${className}`}
    />
  );
}
