import { Star } from "lucide-react";

export default function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Рейтинг ${rating} из 5`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i + 1 <= Math.round(rating);
        return (
          <Star
            key={i}
            size={size}
            className={filled ? "fill-fg-dim text-fg-dim" : "fill-transparent text-line"}
            strokeWidth={1.5}
          />
        );
      })}
    </div>
  );
}
